import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {DayAbbrevToValue, timeslotToString} from "../../../constants";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import ArrowRight from "@material-ui/icons/ArrowRight";
import DeleteIcon from "@material-ui/icons/Delete";
import RemoveIcon from '@material-ui/icons/Remove';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import APIService from "../../../APIService";
import {URL_CLASSES, URL_TIMESLOT} from "../../../urls";


const SectionForm = (props) => {
  const { row, classes, setClasses } = props;
  const [selectedSection, setSelectedSection] = useState(-1);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(-1);
  const [newTimeSlot, setNewTimeSlot] = useState({meetingDays: 'Sun.', begin_time: '', end_time: ''});

  const selectSection = (id) => setSelectedSection(id);
  const isNewTimeSlotInvalid = () => {
    return !(Object.keys(DayAbbrevToValue).includes(newTimeSlot.meetingDays)) ||
      (newTimeSlot.begin_time.length < 5) || (newTimeSlot.end_time.length < 5);
  };

  const createSection = (timeSlot) => {
    APIService.post(URL_CLASSES, {course: row.id, meetingTimes: [timeSlot]})
      .then(data => {
        console.log(data);
        console.log(classes);
        setClasses(clss => clss.concat([data]));
      }, error => console.error(error));
  };

  const deleteSection = (section_id) => {
    APIService.delete(URL_CLASSES, section_id).then(data => {
      if (section_id === selectedSection) {
        setSelectedSection(-1);
      }
      setClasses(classes.filter(c => c.id !== section_id));
    }, error => console.error(error));
  };

  const updateSection = (section) => {
    const request = {id: section.id, course: section.course.id, meetingTimes: section.meetingTimes};
    APIService.put(URL_CLASSES, request).then((data) => {
      setClasses((clss) => {
        const rowIndex = clss.findIndex(cls => cls.id === section.id);
        const classesCopy = clss.slice(0);
        classesCopy[rowIndex] = data;
        return classesCopy;
      });
    }, (error) => console.error(error));
  };

  const addTimeSlotToSection = (timeSlot, section) => {
    let updatedSection = Object.assign({}, section);
    updatedSection.meetingTimes.push(timeSlot);
    updateSection(updatedSection);
  };

  const removeTimeSlotFromSection = (timeSlot_id, section) => {
    let updatedSection = Object.assign({}, section);
    updatedSection.meetingTimes = updatedSection.meetingTimes.filter(ts => ts.id !== timeSlot_id);
    updateSection(updatedSection);
  };

  const updateTimeSlot = (timeSlot) => {
    APIService.put(URL_TIMESLOT, timeSlot).then(data => {
      setClasses((clss) => {
        const rowIndex = clss.findIndex(cls => cls.id === selectedSection);
        const classesCopy = clss.slice(0);
        const oldTimeSlot = classesCopy[rowIndex].meetingTimes.findIndex(mt => mt.id === timeSlot.id);
        classesCopy[rowIndex].meetingTimes[oldTimeSlot] = data;
        classesCopy[rowIndex].meetingTimeString = timeslotToString(data);
        return classesCopy;
      });
    }, (error) => console.error(error));
  }

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
        <FormControlLabel key={time.id} value={time.id} label={label} control={<Radio />} />
      ));
    }
    return rows;
  };

  const getSectionList = () => {
    let list = [];
    if (classes) {
      list = classes.filter(cls => cls.course.id === row.id).map((cls) => (
        <div key={cls.id}>
          <ListItem button onClick={() => selectSection(cls.id)}>
            {getIcon(cls.id)}
            <ListItemText primary={`Section ${cls.id}`} secondary={`${cls.meetingTimes.length} time slot(s)`} />
            <ListItemSecondaryAction>
              <IconButton onClick={() => removeTimeSlotFromSection(selectedTimeSlot, cls)}
                          disabled={selectedTimeSlot < 0}>
                <RemoveIcon />
              </IconButton>
              <IconButton onClick={() => deleteSection(cls.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <FormGroup>
            <RadioGroup value={selectedTimeSlot}
                        onChange={event => setSelectedTimeSlot(parseInt(event.target.value))}>
              {getTimeSlotRows(cls)}
            </RadioGroup>
          </FormGroup>
        </div>
      ))
    }
    return list;
  };

  return (
    <Grid container alignItems={"center"} justifyContent={"center"} spacing={2}>
      <Grid item xs={2}>
        <TextField select label={"Day"} style={{minWidth: 60}} value={newTimeSlot.meetingDays}
                   onChange={event => setNewTimeSlot({...newTimeSlot, meetingDays: event.target.value})}>
          {Object.keys(DayAbbrevToValue).map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={4}>
        <TextField label={"Begin Time"} type={"time"} value={newTimeSlot.begin_time}
                   onChange={event => setNewTimeSlot({...newTimeSlot, begin_time: event.target.value})}
                   InputLabelProps={{shrink: true}} inputProps={{step: 60}} fullWidth />
      </Grid>
      <Grid item xs={4}>
        <TextField label={"End Time"} type={"time"} value={newTimeSlot.end_time}
                   onChange={event => setNewTimeSlot({...newTimeSlot, end_time: event.target.value})}
                   InputLabelProps={{shrink: true}} inputProps={{step: 60}} fullWidth />
      </Grid>
      {classes.filter(c => c.course.id === row.id).length > 0 &&
      <Grid item>
        <Button variant={"contained"} color={"default"}
                disabled={selectedTimeSlot < 0 || isNewTimeSlotInvalid()}
                onClick={() => updateTimeSlot({...newTimeSlot, id: selectedTimeSlot})}>
          Change Selected Time
        </Button>
        <Button variant={"contained"} color={"default"}
                disabled={selectedSection < 0 || isNewTimeSlotInvalid()}
                onClick={() => addTimeSlotToSection(newTimeSlot, classes.find(c => c.id === selectedSection))}>
          Add to Selected Section
        </Button>
      </Grid>
      }
      <Grid item>
        <Button variant={"contained"} color={"primary"} disabled={isNewTimeSlotInvalid()}
                onClick={() => createSection(newTimeSlot)}>Add to New Section</Button>
      </Grid>
      <Grid item xs={12}>
        {getSectionList()}
      </Grid>
    </Grid>
  );
};

export default SectionForm;
