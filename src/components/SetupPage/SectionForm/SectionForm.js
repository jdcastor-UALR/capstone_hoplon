import React, {useState, useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import {timeslotToString} from "../../../constants";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import ArrowRight from "@material-ui/icons/ArrowRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import {withStyles} from "@material-ui/core";


const SectionForm = (props) => {
  const { row, classes } = props;
  const [selectedSection, setSelectedSection] = useState(-1);

  useEffect(() => {
    const classesOnCourse = classes.filter(cls => cls.course.id === row.id);
    if (classesOnCourse.length > 0) {
      setSelectedSection(classesOnCourse[0].id);
    }
  }, []);

  const CenteredListItem = withStyles({
    root: {textAlign: 'center'}
  })(ListItemText);

  const getIcon = (id) => {
    if (selectedSection === id) {
      return (<ListItemIcon><ArrowRight/></ListItemIcon>);
    } else {
      return (<ListItemIcon><ArrowDropDown/></ListItemIcon>);
    }
  };

  const getTimeSlotRows = (cls) => {
    if (cls.id !== selectedSection) return [];
    let rows = [];
    for (let time of cls.meetingTimes) {
      const label = timeslotToString(time);
      rows.push((
        <ListItem key={time.id}>
          <CenteredListItem primary={label} />
        </ListItem>
      ));
    }
    return rows;
  };

  const getSectionList = () => {
    let list = [];
    if (classes) {
      list = classes.filter(cls => cls.course.id === row.id).map((cls) => (
        <div key={cls.id}>
          <ListItem button onClick={() => setSelectedSection(cls.id)}>
            {getIcon(cls.id)}
            <ListItemText primary={`Section ${cls.id}`} secondary={`${cls.meetingTimes.length} time slot(s)`} />
          </ListItem>
          <List>
            {getTimeSlotRows(cls)}
          </List>
        </div>
      ))
    }
    return list;
  };

  return (
    <Grid container alignItems={"center"} justifyContent={"center"} spacing={2}>
      <Grid item xs={12}>
        {getSectionList()}
      </Grid>
    </Grid>
  );
};

export default SectionForm;
