import React, {useEffect} from 'react';
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
import {URL_CLASSES, URL_COURSES, URL_DISCIPLINES, URL_INSTRUCTORS, URL_SOLUTIONS} from "../../urls";

const generateCards = (schedule) => {
  let cards = [];
  let count = 1;
  for (let option of schedule) {
    cards.push(
      <Card variant={"outlined"} key={option.id} style={{width: '20%', margin: '1em'}}>
        <CardContent>
          <Typography>Option {count}</Typography>
          <Typography>Covered Classes: {option.assignments.filter(assignment => assignment.instructor != null).length}
            /{option.assignments.length}
          </Typography>
          <Typography>Issues: {(option.issues.length > 0) ? option.issues.join(', ') : 'None'}</Typography>
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
  return cards;
}

const AssistantPage = () => {
  const theme = useTheme();

  const dummySchedule = [
    {assignments: [
        {section: 'Section1', instructor: 'Smith'},
        {section: 'Section2', instructor: 'Jones'},
        {section: 'Section3', instructor: 'Smith'},
        {section: 'Section4', instructor: 'Levett'},
        {section: 'Section5', instructor: 'Levett'},
      ], issues: ['Teacher teaching too many classes', 'Teacher teaching outside of disciplines'], id: 1},
    {assignments: [
        {section: 'Section1', instructor: 'Smith'},
        {section: 'Section2', instructor: 'Jones'},
        {section: 'Section3', instructor: 'Smith'},
        {section: 'Section4', instructor: 'Levett'},
        {section: 'Section5', instructor: null},
      ], issues: ['Teacher teaching too many classes'], id: 2},
    {assignments: [
        {section: 'Section1', instructor: 'Smith'},
        {section: 'Section2', instructor: 'Jones'},
        {section: 'Section3', instructor: null},
        {section: 'Section4', instructor: 'Levett'},
        {section: 'Section5', instructor: null},
      ], issues: ['Teacher teaching too many classes'], id: 3},
    {assignments: [
        {section: 'Section1', instructor: 'Smith'},
        {section: 'Section2', instructor: 'Jones'},
        {section: 'Section3', instructor: null},
        {section: 'Section4', instructor: null},
        {section: 'Section5', instructor: null},
      ], issues: [], id: 4},
    {assignments: [
        {section: 'Section1', instructor: 'Smith'},
        {section: 'Section2', instructor: null},
        {section: 'Section3', instructor: null},
        {section: 'Section4', instructor: null},
        {section: 'Section5', instructor: null},
      ], issues: [], id: 5},
  ];

  useEffect(() => {
    APIService.get(URL_SOLUTIONS).then((data) => {
      console.log(data);
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
        {generateCards(dummySchedule)}
      </Grid>
    </div>
  );
}

AssistantPage.propTypes = {};

AssistantPage.defaultProps = {};

export default AssistantPage;
