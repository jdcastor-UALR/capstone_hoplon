import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import useTheme from "@material-ui/core/styles/useTheme";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit"
import APIService from "../../APIService";
import {URL_CLASSES, URL_INSTRUCTORS, URL_SOLUTIONS} from "../../urls";
import Button from "@material-ui/core/Button";

const runScheduler = (setSolutions) => {
  APIService.post(URL_SOLUTIONS).then((data) => {
    if (data) {
      setSolutions(data);
    }
  }, (error) => console.error(error));
};

const generateCards = (schedule, setSolutions) => {
  let cards = [];
  let count = 1;

  for (let option of schedule) {
    cards.push(
      <Card variant={"outlined"} key={option.id} style={{width: '20%', margin: '1em'}}>
        <CardContent>
          <Typography>Option {count}</Typography>
          <Typography>Covered Classes: {option.assignment_count}/{option.assignments.length}</Typography>
          {/*TODO: Dynamically detect issues*/}
          <Typography>Issues: None</Typography>
        </CardContent>
        <CardActions>
          <IconButton style={{marginLeft: "auto"}}>
            <EditIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
    count += 1;
  }

  if (cards.length === 0) {
    cards.push(<>
      <Typography>No solutions have been generated.</Typography>
      <Button variant={"contained"} color={"primary"} onClick={() => runScheduler(setSolutions)}>Run Scheduler</Button>
    </>)
  }

  return cards;
}

const AssistantPage = () => {
  const theme = useTheme();

  const [solutions, setSolutions] = useState([]);
  const [instructors, setInstructors] = useState({});
  const [sections, setSections] = useState({});

  const dummySchedule = [
    {assignment_count: 5, assignments: [
        {section: 'Section1', instructor: 'Smith'},
        {section: 'Section2', instructor: 'Jones'},
        {section: 'Section3', instructor: 'Smith'},
        {section: 'Section4', instructor: 'Levett'},
        {section: 'Section5', instructor: 'Levett'},
      ], issues: ['Teacher teaching too many classes', 'Teacher teaching outside of disciplines'], id: 1},
    {assignment_count: 4, assignments: [
        {section: 'Section1', instructor: 'Smith'},
        {section: 'Section2', instructor: 'Jones'},
        {section: 'Section3', instructor: 'Smith'},
        {section: 'Section4', instructor: 'Levett'},
        {section: 'Section5', instructor: null},
      ], issues: ['Teacher teaching too many classes'], id: 2},
    {assignment_count: 3, assignments: [
        {section: 'Section1', instructor: 'Smith'},
        {section: 'Section2', instructor: 'Jones'},
        {section: 'Section3', instructor: null},
        {section: 'Section4', instructor: 'Levett'},
        {section: 'Section5', instructor: null},
      ], issues: ['Teacher teaching too many classes'], id: 3},
    {assignment_count: 2, assignments: [
        {section: 'Section1', instructor: 'Smith'},
        {section: 'Section2', instructor: 'Jones'},
        {section: 'Section3', instructor: null},
        {section: 'Section4', instructor: null},
        {section: 'Section5', instructor: null},
      ], issues: [], id: 4},
    {assignment_count: 1, assignments: [
        {section: 'Section1', instructor: 'Smith'},
        {section: 'Section2', instructor: null},
        {section: 'Section3', instructor: null},
        {section: 'Section4', instructor: null},
        {section: 'Section5', instructor: null},
      ], issues: [], id: 5},
  ];

  useEffect(() => {
    APIService.get(URL_SOLUTIONS).then((data) => {
      setSolutions(data);
    }, (error) => {
      console.error(error);
    });

    APIService.get(URL_INSTRUCTORS).then((data) => {
      setInstructors(new Map(data.map(obj => [obj.id, obj])));
    }, (error) => {
      console.error(error);
    });

    APIService.get(URL_CLASSES).then((data) => {
      setSections(new Map(data.map(obj => [obj.id, obj])));
    }, (error) => {
      console.error(error);
    });
  }, []);

  return (
    <div data-testid="AssistantPage">
      <Typography variant="h3" style={{color: theme.palette.primary, fontWeight: "bold"}}>
        Generated Schedules
      </Typography>
      <Grid container alignItems={"center"} justifyContent={"center"}>
        {generateCards(solutions.slice(0, 12), setSolutions)}
      </Grid>
    </div>
  );
}

AssistantPage.propTypes = {};

AssistantPage.defaultProps = {};

export default AssistantPage;
