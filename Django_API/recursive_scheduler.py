import logging
from collections import Counter

from Django_API.model_functions import get_section_instructor_discipline_map, get_section_overlap_map
from Django_API.models import Solution, AssignedSection

DEFAULT_LEAF_LIMIT = 2

logger = logging.getLogger()


class RecursiveScheduler:
    """ A class to represent an instance of a recursive algorithm used to schedule sections to instructors """

    instructors = []
    sections = []

    lookup_instructors = {}

    section_discipline_map = {}
    section_overlap_map = {}

    generated_solutions = []

    # Statistics for algorithm run
    complete_solutions_found = 0
    incomplete_solutions_found = 0
    tree_distribution = {}

    def __init__(self, sections: list, instructors: list, leaf_limit=DEFAULT_LEAF_LIMIT):
        """
        :param sections: Fully serialized data of section models
        :param instructors: Fully serialized data of instructor models

        Example serialization:
            section_data = json.loads(json.dumps(SectionFullSerializer(Section.objects.all(), many=True).data))
            instructor_data = json.loads(json.dumps(InstructorSerializer(Instructor.objects.all(), many=True).data))
        """
        self.instructors += instructors
        self.lookup_instructors = {i['id']: i for i in self.instructors}
        self.sections += sections

        self.section_discipline_map = get_section_instructor_discipline_map()
        self.section_overlap_map = get_section_overlap_map(sections)

        self.leaf_limit = leaf_limit

    def run(self):
        """ Runs algorithm to generate all possible schedules and save as Solution model """
        schedule = []
        sections = self._get_remaining_sections(schedule)
        if sections:
            for section in sections:
                instructors = self._pick_instructor(schedule, section)
                if instructors:
                    for instructor in instructors:
                        self._generate_schedule(schedule, section, instructor)

        # Log statistics about algorithm run
        print(f'Found {self.complete_solutions_found} complete solutions and {self.incomplete_solutions_found} '
              f'incomplete solutions.')
        print(self.tree_distribution)

        # Save results of algorithm as model
        if len(self.generated_solutions):
            # Delete existing results
            Solution.objects.all().delete()
            AssignedSection.objects.all().delete()

            try:
                # Save solution objects
                solutions_to_save = list(sorted(self.generated_solutions, key=lambda x: len(x), reverse=True))[:1000]
                saved_solutions = Solution.objects.bulk_create(
                    map(lambda x: Solution(assignment_count=len(x)), solutions_to_save))

                # Populate unassigned sections with None for instructor id
                for solution in solutions_to_save:
                    section_ids = [s['id'] for s in self.sections]
                    for sid, iid in solution:
                        section_ids.remove(sid)
                    for sid in section_ids:
                        solution.append((sid, None))

                # Save assignment objects
                assignments = []
                for solution, assignment in zip(saved_solutions, solutions_to_save):
                    for sid, iid in assignment:
                        assignments.append(AssignedSection(solution_id=solution.id, section_id=sid, instructor_id=iid))
                AssignedSection.objects.bulk_create(assignments)

            except Exception as e:
                logger.error('Encountered exception while saving results from scheduler.')
                raise e

    def _generate_schedule(self, schedule, next_section, next_instructor):
        """
        Recursive function to generate schedule one assignment at a time
        :param schedule: Initial schedule (empty list) or schedule from parent execution
        :param next_section: Initial section ID to root tree from, or section ID from parent execution
        :param next_instructor: Initial instructor ID to root tree from, or instructor ID from parent execution
        :return: None
        """
        if next_section is None or next_instructor is None:
            pass
        else:
            schedule = schedule + [(next_section, next_instructor)]
            sections = self._get_remaining_sections(schedule)
            if not sections:
                self._add_solution(schedule)
            else:
                for section in sections[:1]:
                    instructors = self._pick_instructor(schedule, section)
                    if not instructors:
                        self._add_solution(schedule)
                    else:
                        for instructor in instructors[:self.leaf_limit]:
                            self._generate_schedule(schedule, section, instructor)

    def _get_remaining_sections(self, schedule):
        """
        Gets remaining sections sorted by most conflicting classes heuristic
        :param schedule: List of (Section ID, Instructor ID) tuples generated so far
        :return: List of Section IDs left sorted by heuristic (possibly empty)
        """

        sections_to_assign = [s['id'] for s in self.sections if s['id'] not in [s for s, i in schedule]]

        if len(sections_to_assign) < 1:
            return None
        return sorted(sections_to_assign, key=lambda x: len(self.section_overlap_map[x]), reverse=True)

    def _pick_instructor(self, schedule, section_id):
        """
        Gets instructors meeting the following constraints:
            1 - Instructor is not at assignment cap
            2 - Instructor is not assigned to overlapping class
            3 - Instructor shares one discipline in common with class
        sorted by the least assignment heuristic
        :param schedule: List of (Section ID, Instructor ID) tuples generated so far
        :param section_id: ID of section instructor is being assigned to
        :return: List of instructor IDs meeting constraints sorted by heuristic (possibly empty)
        """

        instructor_assignment_map = {**{i['id']: 0 for i in self.instructors},
                                     **dict(Counter(elem[1] for elem in schedule))}

        available_instructors = [iid for iid, count in instructor_assignment_map.items()
                                 if count < self.lookup_instructors[iid]['maxSections']]

        valid_instructors = [iid for iid in self.section_discipline_map[section_id] if iid in available_instructors and
                             set([s for s, i in schedule if i == iid]).isdisjoint(self.section_overlap_map[section_id])]

        if len(valid_instructors) < 1:
            return None
        return sorted(valid_instructors, key=lambda x: instructor_assignment_map[x])

    def _add_solution(self, schedule):
        """ Add solution to list of models to be created and collect statistics about generated solutions """

        if len(schedule) == len(self.sections):
            self.complete_solutions_found += 1
            print(schedule)
        else:
            self.incomplete_solutions_found += 1

        self.tree_distribution[len(schedule)] = self.tree_distribution.get(len(schedule), 0) + 1

        self.generated_solutions.append(schedule)

        if (self.incomplete_solutions_found + self.complete_solutions_found) % 1000 == 0:
            print(f'Explored {self.complete_solutions_found + self.incomplete_solutions_found} options', end="\r")
