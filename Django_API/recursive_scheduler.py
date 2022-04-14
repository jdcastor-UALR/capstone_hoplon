from collections import Counter

from Django_API.model_functions import get_section_instructor_discipline_map, get_section_overlap_map


class RecursiveScheduler:
    """ A class to represent an instance of a recursive algorithm used to schedule sections to instructors """

    instructors = []
    sections = []

    lookup_instructors = {}
    lookup_sections = {}

    section_discipline_map = {}
    section_overlap_map = {}

    def __init__(self, sections: list, instructors: list):
        self.instructors += instructors
        self.lookup_instructors = {i['id']: i for i in self.instructors}
        self.sections += sections
        self.lookup_sections = {s['id']: s for s in self.sections}

        self.section_discipline_map = get_section_instructor_discipline_map()
        self.section_overlap_map = get_section_overlap_map(sections)

    def run(self):
        schedule = []
        section = self._pick_section(schedule)
        instructor = self._pick_instructor(schedule, section)
        self._generate_schedule(schedule, section, instructor)
        print(schedule)

    def _generate_schedule(self, schedule, next_section, next_instructor):
        if next_section is None or next_instructor is None:
            return schedule
        else:
            schedule.append((next_section, next_instructor))
            section = self._pick_section(schedule)
            return self._generate_schedule(schedule, section, self._pick_instructor(schedule, section))

    def _pick_section(self, schedule):
        """
        Picks section based on most conflicting classes heuristic
        :param schedule: List of (Section ID, Instructor ID) tuples generated so far
        :return: Section ID from sections_to_assign or None if there is no option
        """

        sections_to_assign = [s['id'] for s in self.sections if s['id'] not in [s for s, i in schedule]]

        if len(sections_to_assign) < 1:
            return None
        return max(sections_to_assign, key=lambda x: len(self.section_overlap_map[x]))

    def _pick_instructor(self, schedule, section_id):
        """
        Picks an instructor meeting the following constraints:
            1 - Instructor is not at assignment cap
            2 - Instructor is not assigned to overlapping class
            3 - Instructor shares one discipline in common with class
        based on the least assignment heuristic
        :param schedule:
        :param section_id:
        :return: Chosen instructor ID or None if no valid choice exists
        """

        instructor_assignment_map = {**{i['id']: 0 for i in self.instructors},
                                     **dict(Counter(elem[1] for elem in schedule))}

        available_instructors = [iid for iid, count in instructor_assignment_map.items()
                                 if count < self.lookup_instructors[iid]['maxSections']]

        valid_instructors = [iid for iid in self.section_discipline_map[section_id] if iid in available_instructors and
                             set([s for s, i in schedule if i == iid]).isdisjoint(self.section_overlap_map[section_id])]

        if len(valid_instructors) < 1:
            return None
        chosen_instructor = min(valid_instructors, key=lambda x: instructor_assignment_map[x])
        instructor_assignment_map[chosen_instructor] += 1
        if instructor_assignment_map[chosen_instructor] >= self.lookup_instructors[chosen_instructor]['maxSections']:
            available_instructors.remove(chosen_instructor)
        return chosen_instructor

