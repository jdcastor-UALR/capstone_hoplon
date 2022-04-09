from copy import deepcopy
from random import choice, sample, random, randint, randrange

from Django_API.utility import do_timeslots_overlap


class GeneticScheduler:
    """ A class to represent an instance of the genetic algorithm used to schedule sections to instructors """

    instructors = []
    sections = []

    lookup_instructors = []
    lookup_sections = []

    population_size = 20
    score_max = 10
    penalty = 0.8

    def __init__(self, instructors: list, sections: list):
        self.instructors += instructors
        self.lookup_instructors = {i['id']: i for i in self.instructors}
        self.sections += sections
        self.lookup_sections = {s['id']: s for s in self.sections}

        population = self._generate_population(self.population_size)
        initial_scores = [self._score_schedule(schedule) for schedule in population]
        selected = [self._selection(population, initial_scores) for _ in range(self.population_size)]

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
            # Start population by meeting instructor constraint
            instructors = []
            for i in self.instructors:
                instructors += i['maxSections'] * [i]

            if len(self.sections) > len(instructors):
                instructor_sample = sample(instructors, len(instructors))
                instructor_sample += [choice(self.instructors) for _ in range(len(self.sections) - len(instructors))]
            else:
                instructor_sample = sample(instructors, len(self.sections))

            population.append(list(zip([s for s in self.sections], instructor_sample)))
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

    def _selection(self, pop, scores, k=3):
        """
        Performs tournament selection to get best parent out of k random parents

        :param pop: population to select from
        :param scores: fitness scores that map to population
        :param k: amount of parents to compare
        :return: element from pop that wins tournament selection
        """

        selection_index = randrange(0, self.population_size)
        for index in [randrange(0, self.population_size) for _ in range(k-1)]:
            if scores[index] > scores[selection_index]:
                selection_index = index
        return pop[selection_index]

    @staticmethod
    def _perform_crossover(parent1, parent2, r_cross=0.9):
        child1, child2 = deepcopy(parent1), deepcopy(parent2)
        if random() < r_cross:
            crossover_point = randrange(1, len(parent1)-1)
            child1 = parent1[:crossover_point] + parent2[crossover_point:]
            child2 = parent2[:crossover_point] + parent1[crossover_point:]
        return child1, child2

    def _perform_mutation(self, child, r_mut=0.01):
        for i in range(len(child)):
            if random() < r_mut:
                child[i] = choice(self.instructors)
        return child
