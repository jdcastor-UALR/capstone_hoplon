import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import useTheme from "@material-ui/core/styles/useTheme";
import Typography from "@material-ui/core/Typography";
import InstructorList from "./InstructorList/InstructorList";
import ClassList from "./ClassList/ClassList";

const SetupPage = () => {
  const theme = useTheme();

  const [disciplines, setDisciplines] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [classes, setClasses] = useState([]);

  // const dummyInstructors = [
  //   {lastName: 'Smith', maxSections: 5, qualifications: [{name: 'Programming'}, {name: 'Data Structures'}]},
  //   {lastName: 'Smith', maxSections: 5, qualifications: [{name: 'Programming'}, {name: 'Data Structures'}]},
  //   {lastName: 'Smith', maxSections: 5, qualifications: [{name: 'Programming'}, {name: 'Data Structures'}]},
  // ];

  const dummyClasses = [
    {courseTitle: 'Programming 1', courseNumber: 1135, subjectDisciplines: ['Programming', 'Algorithms'],
      meetingTimes: 'MW 9:25 AM'},
    {courseTitle: 'Programming 1', courseNumber: 1135, subjectDisciplines: ['Programming', 'Algorithms'],
      meetingTimes: 'TR 9:25 AM'},
  ];

  useEffect(() => {
    const getDisciplines = async () => {
      const response = await fetch('/api/discipline/');
      const data = await response.json();
      setDisciplines(data);
    }

    const getInstructors = async () => {
      const response = await fetch('/api/instructor/');
      const data = await response.json();
      setInstructors(data);
    }

    const getClasses = async () => {
      const response = await fetch('/api/section/');
      const data = await response.json();
      setClasses(data);
    }

    getDisciplines().catch(console.error);
    getInstructors().catch(console.error);
    getClasses().catch(console.error);
  }, []);

  return (
    <div data-testid="SetupPage">
      <Grid container spacing={2} justifyContent={"center"}>
        <Grid container item xs={5} direction={"column"}>
          <Typography variant={"h4"} style={{color: theme.palette.primary, fontWeight: "bold"}}>
            Teaching Staff
          </Typography>
          <div style={{padding: '1rem 5rem'}}>
            <InstructorList instructors={instructors} disciplines={disciplines} />
          </div>
        </Grid>
        <Divider orientation={"vertical"} flexItem />
        <Grid container item xs={5} direction={"column"}>
          <Typography variant={"h4"} style={{color: theme.palette.primary, fontWeight: "bold"}}>
            Class Roster
          </Typography>
          <div style={{padding: '1rem 5rem'}}>
            <ClassList classes={dummyClasses} disciplines={disciplines} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SetupPage.propTypes = {};

SetupPage.defaultProps = {};

export default SetupPage;
