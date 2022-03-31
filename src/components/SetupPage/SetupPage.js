import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import useTheme from "@material-ui/core/styles/useTheme";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import EditIcon from "@material-ui/icons/Edit"
import AddIcon from "@material-ui/icons/Add"
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

const InstructorList = (instructors) => {
  let listItems = [];

  for (let instructor of instructors) {
    listItems.push(
      <ListItem>
        <ListItemText primary={instructor.lastName}
                      secondary={'Assignment Limit: ' + instructor.maxSections.toString()} />
        <ListItemSecondaryAction>
          <IconButton edge={"end"} aria-label={"edit"}>
            <EditIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
    listItems.push(<Divider />);
  }

  return listItems;
};

const ClassList = (classes) => {
  let listItems = [];

  for (let cls of classes) {
    listItems.push(
      <ListItem>
        <ListItemText primary={cls.courseTitle} secondary={'CPSC ' + cls.courseNumber + ' - ' + cls.meetingTimes} />
        <ListItemSecondaryAction>
          <IconButton edge={"end"} aria-label={"edit"}>
            <EditIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
    listItems.push(<Divider />);
  }

  return listItems;
};

const SetupPage = () => {
  const theme = useTheme();

  const [disciplines, setDisciplines] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [classes, setClasses] = useState([]);

  const dummyInstructors = [
    {lastName: 'Smith', maxSections: 5, qualifications: [{name: 'Programming'}, {name: 'Data Structures'}]},
    {lastName: 'Smith', maxSections: 5, qualifications: [{name: 'Programming'}, {name: 'Data Structures'}]},
    {lastName: 'Smith', maxSections: 5, qualifications: [{name: 'Programming'}, {name: 'Data Structures'}]},
  ];

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
            <List style={{border: `1px #0000001f solid`}}>
              {InstructorList(instructors)}
              <ListItem button>
                <ListItemIcon><AddIcon /></ListItemIcon>
                <ListItemText primary={'Add New'} />
              </ListItem>
            </List>
          </div>
        </Grid>
        <Divider orientation={"vertical"} flexItem />
        <Grid container item xs={5} direction={"column"}>
          <Typography variant={"h4"} style={{color: theme.palette.primary, fontWeight: "bold"}}>
            Class Roster
          </Typography>
          <div style={{padding: '1rem 5rem'}}>
            <List style={{border: `1px #0000001f solid`}}>
              {ClassList(dummyClasses)}
              <ListItem button>
                <ListItemIcon><AddIcon /></ListItemIcon>
                <ListItemText primary={'Add New'} />
              </ListItem>
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SetupPage.propTypes = {};

SetupPage.defaultProps = {};

export default SetupPage;
