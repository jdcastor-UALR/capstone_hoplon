from random import choice

from Django_API.utility import do_timeslots_overlap


class GeneticScheduler:
    """ A class to represent an instance of the genetic algorithm used to schedule sections to instructors """

    instructors = []
    sections = []

    lookup_instructors = []
    lookup_sections = []

    score_max = 10
    penalty = 0.8

    def __init__(self, instructors: list, sections: list):
        self.instructors += instructors
        self.lookup_instructors = {i['id']: i for i in self.instructors}
        self.sections += sections
        self.lookup_sections = {s['id']: s for s in self.sections}

        population = self._generate_population(20)
        print([self._score_schedule(schedule) for schedule in population])

    def _generate_population(self, n):
        """
        Generates initial population of size n randomly

        :param n: size of list to return
        :returns: list of n lists of section and instructor tuples mapping a one-to-many relationship
        :raises: ValueError: n is smaller than 3
        """
        if n < 3:
            raise ValueError(f'Population size {n} is not large enough')

        population = []
        for _ in range(n):
            population.append([(s, choice(self.instructors)) for s in self.sections])
        return population

    def _score_schedule(self, schedule):
        """
        Calculates the fitness score for a generated schedule

        :param schedule: list of tuples mapping sections to assigned instructors
        :return: integer fitness score
        """
        violations = 0

        assigned_instructor_ids = [i_id for i_id in list(set([y['id'] for x, y in schedule]))]
        instructor_assignments = {i: [x for x, y in schedule if y['id'] == i]
                                  for i in assigned_instructor_ids}

        for i_id, sections in instructor_assignments.items():
            # Check instructor class overlap
            timeslots = [ts for s in sections for ts in s['meetingTimes']]
            if do_timeslots_overlap(timeslots):
                violations += 1
            # Check instructor assignment limit violation
            instructor = self.lookup_instructors[i_id]
            if len(sections) > instructor['maxSections']:
                violations += 1
        # Check assignment discipline match
        for section, instructor in schedule:
            section_disciplines = [d['id'] for d in section['course']['subject_disciplines']]
            instructor_disciplines = [d['id'] for d in instructor['qualifications']]
            if set(section_disciplines).isdisjoint(instructor_disciplines):
                violations += 1

        return self.score_max - (violations * self.penalty)

    def _evaluate_population(self, pop):
        pass
