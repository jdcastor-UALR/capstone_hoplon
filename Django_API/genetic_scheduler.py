from copy import deepcopy
from random import choice, sample, random, randint, randrange

from Django_API.model_functions import get_section_instructor_discipline_map, get_section_overlap_map
from Django_API.utility import do_timeslots_overlap


class GeneticScheduler:
    """ A class to represent an instance of the genetic algorithm used to schedule sections to instructors """

    instructors = []
    sections = []

    lookup_instructors = []
    lookup_sections = []

    section_discipline_map = {}
    section_overlap_map = {}

    population_size = 0
    score_max = 10
    penalty = 0.8

    def __init__(self, instructors: list, sections: list, n_pop=20):
        self.instructors += instructors
        self.lookup_instructors = {i['id']: i for i in self.instructors}
        self.sections += sections
        self.lookup_sections = {s['id']: s for s in self.sections}

        self.section_discipline_map = get_section_instructor_discipline_map()
        self.section_overlap_map = get_section_overlap_map(sections)

        self.population_size = n_pop
        if n_pop % 2 != 0:
            raise ValueError(f'Population size {n_pop} is not even!')

        population = self._generate_population(self.population_size)
        initial_scores = [self._score_schedule(schedule) for schedule in population]
        selected = [self._selection(population, initial_scores) for _ in range(self.population_size)]
        children = self._crossover(selected)
        children = [self._perform_mutation(child) for child in children]
        print([self._score_schedule(child) for child in children])
        repaired = [self._repair_schedule(child) for child in children]
        print([self._score_schedule(child) for child in repaired])

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
            # Start population by meeting discipline match constraint
            schedule = []
            for s in self.sections:
                possible_instructor_set = self.section_discipline_map[s['id']]
                if possible_instructor_set:
                    schedule.append((s['id'], choice(possible_instructor_set)))
                else:
                    schedule.append((s['id'], None))
            population.append(schedule)
        return population

    def _score_schedule(self, schedule):
        """
        Calculates the fitness score for a generated schedule

        :param schedule: list of tuples mapping sections to assigned instructors
        :return: integer fitness score
        """
        violations = 0

        assigned_instructor_ids = [i_id for i_id in list(set([y for x, y in schedule])) if i_id is not None]
        instructor_assignments = {i: [x for x, y in schedule if y == i] for i in assigned_instructor_ids}

        for i_id, sections in instructor_assignments.items():
            # Check instructor class overlap
            for section, overlapped in self.section_overlap_map.items():
                if section in sections and not set(sections).isdisjoint(set(overlapped)):
                    violations += 1
            # Check instructor assignment limit violation
            instructor = self.lookup_instructors[i_id]
            if len(sections) > instructor['maxSections']:
                violations += 1
        # Check assignment discipline match
        for section, instructor in schedule:
            # Check assignment
            if instructor is None and len(self.section_discipline_map[section]) > 0:
                violations += 0.25
            # Check discipline match constraint
            if instructor is not None:
                section_disciplines = [d['id'] for d in self.lookup_sections[section]['course']['subject_disciplines']]
                instructor_disciplines = [d['id'] for d in self.lookup_instructors[instructor]['qualifications']]
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

    def _crossover(self, selected_parents):
        children = []
        for i in range(0, len(selected_parents) - 1, 2):
            child1, child2 = self._perform_crossover(selected_parents[i], selected_parents[i+1])
            children.append(child1)
            children.append(child2)
        return children

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
                sid = child[i][0]
                instructor_possibilities = self.section_discipline_map[sid]
                instructor_choice = choice(instructor_possibilities) if instructor_possibilities else None
                child[i] = (sid, instructor_choice)
        return child

    def _repair_schedule(self, schedule):
        # Determine if schedule is invalid and get available/unavailable instructors
        assigned_instructor_ids = [i_id for i_id in list(set([y for x, y in schedule])) if i_id is not None]
        instructor_assignments = {i: [self.lookup_sections[x] for x, y in schedule if y == i]
                                  for i in assigned_instructor_ids}
        over_scheduled_instructor_ids = []
        under_scheduled_instructor_ids = \
            {iid: i['maxSections'] for iid, i in self.lookup_instructors.items() if iid not in assigned_instructor_ids}
        double_scheduled_instructor_ids = []

        for i_id, sections in instructor_assignments.items():
            # Check instructor class overlap
            timeslots = [ts for s in sections for ts in s['meetingTimes']]
            if do_timeslots_overlap(timeslots):
                double_scheduled_instructor_ids.append(i_id)
            # Check instructor assignment limit violation
            instructor = self.lookup_instructors[i_id]
            if len(sections) > instructor['maxSections']:
                over_scheduled_instructor_ids.append(i_id)
            elif len(sections) < instructor['maxSections']:
                under_scheduled_instructor_ids[i_id] = instructor['maxSections']

        if len(over_scheduled_instructor_ids) == 0 and len(double_scheduled_instructor_ids) == 0:
            return

        # Fix double assignment
        

        # Fix credit constraint
        previously_repaired = 2
        currently_repaired = 1
        while previously_repaired > currently_repaired and not currently_repaired == 0:
            previously_repaired = currently_repaired
            currently_repaired = 0

            for i_id in over_scheduled_instructor_ids:
                scheduled_sections = sum(map(lambda x: x[1] == i_id, schedule))
                section_cap = self.lookup_instructors[i_id]['maxSections']
                iterations = 0

                while scheduled_sections > section_cap and iterations < 10:
                    # Pass on fixing schedule when no instructors available
                    if not under_scheduled_instructor_ids:
                        break

                    iterations += 1

                    swap_index = choice(range(len([True for x, y in schedule if y == i_id])))
                    other_possible = [iid for iid in under_scheduled_instructor_ids
                                      if iid in self.section_discipline_map[schedule[swap_index][0]]]
                    if other_possible:
                        new_assignment = choice(other_possible)
                    else:
                        new_assignment = None
                    schedule[swap_index] = (schedule[swap_index][0], new_assignment)

                    if new_assignment:
                        under_scheduled_instructor_ids[new_assignment] += 1
                        if under_scheduled_instructor_ids[new_assignment] >= \
                                self.lookup_instructors[new_assignment]['maxSections']:
                            under_scheduled_instructor_ids.pop(new_assignment, None)
                        scheduled_sections -= 1

                if scheduled_sections <= section_cap:
                    currently_repaired += 1
                    over_scheduled_instructor_ids.remove(i_id)

                    if scheduled_sections < section_cap:
                        under_scheduled_instructor_ids[i_id] = len([True for x, y in schedule if y == i_id])

        # Fix non-assignments
        for idx, si in enumerate(schedule):
            sid, iid = si
            if iid is None:
                section_possibilities = self.section_discipline_map[sid]
                if len(section_possibilities) > 0:
                    avail_possibilties = set(section_possibilities).intersection(set(under_scheduled_instructor_ids.keys()))
                    if len(avail_possibilties) > 0:
                        chosen_instructor = choice(list(avail_possibilties))
                        schedule[idx] = (sid, chosen_instructor)
                        under_scheduled_instructor_ids[chosen_instructor] += 1

        return schedule

    def _optimize_schedule(self, schedule):
        pass
