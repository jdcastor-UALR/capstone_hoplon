import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {DayAbbrevToValue} from "../../../constants";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown"
import ArrowRight from "@material-ui/icons/ArrowRight"
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";


const SectionForm = (props) => {
  const { row, classes } = props;
  const [selectedSection, setSelectedSection] = useState();

  const selectSection = (id) => setSelectedSection(id);
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
      const label = `${time.meetingDays} ${time.begin_time}-${time.end_time}`
      rows.push((
        <FormControlLabel control={<Checkbox />} label={label} />
      ));
    }
    return rows;
  };
  const getSectionList = () => {
    let list = [];
    if (classes) {
      list = classes.map((cls) => (
        <>
          <ListItem button onClick={() => selectSection(cls.id)}>
            {getIcon(cls.id)}
            <ListItemText primary={`Section ${cls.id}`} secondary={`${cls.meetingTimes.length} time slot(s)`} />
          </ListItem>
          <FormGroup>
            {getTimeSlotRows(cls)}
          </FormGroup>
        </>
      ))
    }
    return list;
  };

  return (
    <Grid container alignItems={"center"} justifyContent={"center"} spacing={2}>
      <Grid item xs={2}>
        <TextField select label={"Day"} style={{minWidth: 60}}>
          {Object.keys(DayAbbrevToValue).map((option) => (
            <MenuItem key={option} value={DayAbbrevToValue[option]}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={4}>
        <TextField label={"Begin Time"} />
      </Grid>
      <Grid item xs={4}>
        <TextField label={"End Time"} />
      </Grid>
      <Grid item>
        <Button variant={"contained"} color={"default"}>Change Selected Time</Button>
        <Button variant={"contained"} color={"primary"}>Add to New Section</Button>
      </Grid>
      <Grid item xs={12}>
        {getSectionList()}
      </Grid>
    </Grid>
  );
};

export default SectionForm;
