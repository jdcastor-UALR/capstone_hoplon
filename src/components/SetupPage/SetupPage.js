import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import useTheme from "@material-ui/core/styles/useTheme";
import Typography from "@material-ui/core/Typography";
import InstructorList from "./InstructorList/InstructorList";
import ClassList from "./ClassList/ClassList";
import APIService from "../../APIService";
import {URL_CLASSES, URL_COURSES, URL_DISCIPLINES, URL_INSTRUCTORS} from "../../urls";

const SetupPage = () => {
  const theme = useTheme();

  const [disciplines, setDisciplines] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [classes, setClasses] = useState([]);
  const [courses, setCourses] = useState([]);

  const dummyCourses = [
    {id: 1, course_title: 'Programming 1', course_number: '1134',
      subject_disciplines: [{ id: 1, name: "C++ Programming" }, { id: 7, name: "Programming Languages" }]},
    {id: 2, course_title: 'Programming 2', course_number: '2110',
      subject_disciplines: [{ id: 1, name: "C++ Programming" }, { id: 7, name: "Programming Languages" }]},
    {id: 3, course_title: 'Data Structures and Algorithms', course_number: '2350',
      subject_disciplines: [{ id: 1, name: "C++ Programming" }, { id: 12, name: "Theory of Computation" },
        { id: 4, name: "Data Structures and Algorithms" }]},
    {id: 4, course_title: 'Artificial Intelligence', course_number: '4210',
      subject_disciplines: [{ id: 2, name: "Python Programming" }, { id: 10, name: "Artificial Intelligence" }]},
  ];

  const dummyClasses = [
    {id: 1, course_id: 1, course: {id: 1, course_title: 'Programming 1', course_number: '1134',
        subject_disciplines: [{ id: 1, name: "C++ Programming" }, { id: 7, name: "Programming Languages" }]},
      meetingTimeString: 'MW 9:25 AM - 10:50 AM', meetingTimes: [
        {meetingDays: 'monday', begin_time: '9:25 AM', end_time: '10:50 AM'},
        {meetingDays: 'wednesday', begin_time: '9:25 AM', end_time: '10:50 AM'}]},
    {id: 2, course_id: 1, course: {id: 1, course_title: 'Programming 1', course_number: '1134',
        subject_disciplines: [{ id: 1, name: "C++ Programming" }, { id: 7, name: "Programming Languages" }]},
      meetingTimeString: 'TR 9:25 AM - 10:50 AM', meetingTimes: [
      {meetingDays: 'tuesday', begin_time: '9:25 AM', end_time: '10:50 AM'},
      {meetingDays: 'thursday', begin_time: '9:25 AM', end_time: '10:50 AM'}]},
    {id: 3, course_id: 3, course: {id: 3, course_title: 'Data Structures and Algorithms', course_number: '2350',
        subject_disciplines: [{ id: 1, name: "C++ Programming" }, { id: 12, name: "Theory of Computation" },
          { id: 4, name: "Data Structures and Algorithms" }]},
      meetingTimeString: 'TR 4:30 PM - 5:45 PM', meetingTimes: [
        {meetingDays: 'tuesday', begin_time: '4:30 PM', end_time: '5:45 PM'},
        {meetingDays: 'thursday', begin_time: '4:30 PM', end_time: '5:45 PM'}]},
  ];

  useEffect(() => {
    APIService.get(URL_DISCIPLINES).then((data) => {
      setDisciplines(data);
    }, (error) => {
      console.error(error);
    });

    APIService.get(URL_INSTRUCTORS).then((data) => {
      setInstructors(data);
    }, (error) => {
      console.error(error);
    });

    APIService.get(URL_CLASSES).then((data) => {
      setClasses(data);
    }, (error) => {
      console.error(error);
    });

    APIService.get(URL_COURSES).then((data) => {
      setCourses(data);
    }, (error) => console.error(error));
  }, []);

  return (
    <div data-testid="SetupPage">
      <Grid container spacing={2} justifyContent={"center"}>
        <Grid container item xs={5} direction={"column"}>
          <Typography variant={"h4"} style={{color: theme.palette.primary, fontWeight: "bold"}}>
            Teaching Staff
          </Typography>
          <div style={{padding: '1rem 5rem'}}>
            <InstructorList instructors={instructors} setInstructors={setInstructors} disciplines={disciplines} />
          </div>
        </Grid>
        <Divider orientation={"vertical"} flexItem />
        <Grid container item xs={5} direction={"column"}>
          <Typography variant={"h4"} style={{color: theme.palette.primary, fontWeight: "bold"}}>
            Class Roster
          </Typography>
          <div style={{padding: '1rem 5rem'}}>
            <ClassList classes={classes} courses={courses} disciplines={disciplines} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SetupPage.propTypes = {};

SetupPage.defaultProps = {};

export default SetupPage;
