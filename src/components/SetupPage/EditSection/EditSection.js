import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Link, useParams} from "react-router-dom";
import {PageHeading, UnauthorizedMessage} from "../../Utility/text-styles";
import Typography from "@material-ui/core/Typography";
import APIService from "../../../APIService";
import {URL_CLASSES, URL_COURSES, URL_TIMESLOT} from "../../../urls";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from "@material-ui/core/CircularProgress";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Button from "@material-ui/core/Button";
import CreateTimeSlotDialog from "../../AssistantPage/EditSolution/CreateTimeSlotDialog/CreateTimeSlotDialog";
import {convertTimeToNumber, DayAbbrevToValue, pairwise, timeslotToString} from "../../../constants";
import ErrorDialog from "../../Utility/ErrorDialog/ErrorDialog";


const EditSection = () => {
  const [course, setCourse] = useState();
  const [sections, setSections] = useState([]);

  const [unauthorized, setUnauthorized] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [selectedSection, setSelectedSection] = useState();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();

  const [addOpen, setAddOpen] = useState(false);
  const [action, setAction] = useState('');
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { course_id } = useParams();

  const handleError = (error) => {
    if (error.message === '403') {
      setUnauthorized(true);
    } else {
      setErrorMessage(`Encountered error: ${error.message}`);
      setErrorOpen(true);
    }
  };

  useEffect(() => {
    const allPromise = Promise.all([APIService.get(`${URL_COURSES}${course_id}`), APIService.get(URL_CLASSES)]);

    allPromise.then(data => {
      setCourse(data[0]);
      setSections(data[1].filter(section => section.course.id === data[0].id));
      setLoaded(true)
    }, handleError);
  }, []);

  const createSection = (timeSlot) => {
    APIService.post(URL_CLASSES, {course: course.id, meetingTimes: [timeSlot]})
      .then(data => {
        setSections(sections => sections.concat([data]));
        setSelectedSection(data.id);
      }, handleError);
  };

  const deleteSection = () => {
    APIService.delete(URL_CLASSES, selectedSection).then(data => {
      setSections(sections => sections.filter(s => s.id !== selectedSection));
      setSelectedSection(null);
    }, handleError);
  };

  const updateSection = (section) => {
    if (!validateSection(section)) {
      handleError({message: 'Section cannot have overlapping time slots.'});
      return;
    }
    APIService.put(URL_CLASSES, section).then((data) => {
      setSections((sections) => {
        const rowIndex = sections.findIndex(s => s.id === selectedSection);
        const sectionsCopy = sections.slice(0);
        sectionsCopy[rowIndex] = data;
        return sectionsCopy;
      });
      console.log(selectedSection);
      console.log(sections);
    }, handleError);
  };

  const validateSection = (section) => {
    let result = true;

    // Check each day to ensure no times overlap
    Object.keys(DayAbbrevToValue).forEach(day => {
      const timesOnDay = section.meetingTimes.filter(mt => mt.meetingDays === day);
      if (timesOnDay.length > 0) {
        let timeIntervals = [];

        // Convert each time into a number
        timesOnDay.forEach(meetingTime => {
          timeIntervals.push([convertTimeToNumber(meetingTime.begin_time), convertTimeToNumber(meetingTime.end_time)]);
        });

        // Sort the time intervals
        timeIntervals = timeIntervals.sort((i1, i2) => {
          if (i1[0] > i2[1]) return 1;
          if (i2[0] > i1[1]) return -1;
          return 0;
        });

        // Check if any overlap
        pairwise(timeIntervals, (curr, next) => {
          if (next[0] < curr[1] && next[1] > curr[0]) {
            result = false;
          }
        });

        if (!result) return result;
      }
    });

    return result;
  };

  const onDialogSubmit = (result) => {
    console.log(result);

    if (action === 'create') {
      createSection(result);
    } else if (action === 'add') {
      const selected = sections.find(s => selectedSection === s.id);
      if (selected != null) {
        const section = {...selected, course: selected.course.id};
        section.meetingTimes.push(result);
        updateSection(section);
      }
    } else if (action === 'edit') {
      const selected = sections.find(s => selectedSection === s.id);
      if (selected != null) {
        const section = {...selected, course: selected.course.id};
        result = {...result, id: selectedTimeSlot};
        section.meetingTimes = section.meetingTimes.map(mt => (mt.id === selectedTimeSlot) ? result : mt);
        updateSection(section);
      }
    } else {
      console.error('Time Slot Dialog submitted before action was set!');
    }
  };

  const getSectionForm = () => {
    return (
      <div style={{marginBottom: '2rem'}}>
        <Tooltip title={'Add New Section'} placement={'left'}>
          <IconButton onClick={() => {
            setAction('create');
            setAddOpen(true);
          }}>
            <AddIcon />
          </IconButton>
        </Tooltip>
        <TextField select label={"Sections"} style={{minWidth: 240, margin: 'auto 1rem'}}
                   value={selectedSection || ''} onChange={(e) => setSelectedSection(e.target.value)}>
          {sections.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {`Section ${option.id}`}
            </MenuItem>
          ))}
        </TextField>
        <Tooltip title={'Remove Section from Course'} placement={'right'}>
          <IconButton onClick={() => {
            deleteSection();
          }}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>
    );
  };

  const getTimeSlotListItems = () => {
    let items = [];

    const selected = sections.find(s => s.id === selectedSection);

    if (selected != null) {
      const times = selected.meetingTimes;
      if (times.length > 0) {
        times.forEach(time => {
          items.push(
            <ListItem key={time.id}>
              <ListItemText primary={timeslotToString(time)} />
              <ListItemSecondaryAction>
                <Tooltip title={'Edit Timeslot'} placement={'left'}>
                  <IconButton onClick={() => {
                    setAction('edit');
                    setSelectedTimeSlot(time.id);
                    setAddOpen(true);
                  }}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={'Remove Timeslot'} placement={'right'}>
                  <IconButton onClick={() => {
                    setSelectedTimeSlot(time.id);
                    const selected = sections.find(s => selectedSection === s.id);
                    if (selected != null) {
                      const section = {...selected, course: selected.course.id,
                        meetingTimes: selected.meetingTimes.filter(mt => mt.id !== time.id)};
                      if (section.meetingTimes.length === 0) {
                        deleteSection();
                      } else {
                        updateSection(section);
                      }
                    }
                  }}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          );
        });
      }
    }

    return items;
  };

  if (unauthorized) return (
    <div>
      {UnauthorizedMessage('edit section')}
    </div>
  );

  return (
    <div data-testid="EditSection">
      {(!loaded) ? <CircularProgress /> :
        <>
          {PageHeading(`Edit Sections (${course.course_number} ${course.course_title})`)}
          <Typography style={{marginBottom: '1rem'}}>Select a section to view/edit timeslots below.</Typography>
          {getSectionForm()}
          <Divider />
          {selectedSection != null &&
          <List style={{width: '25%', margin: 'auto'}}>
            {getTimeSlotListItems()}
            <Tooltip title={'Add New Timeslot'}>
              <IconButton onClick={() => {
                setAction('add');
                setAddOpen(true);
              }}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </List>
          }
          <div style={{marginTop: '2.5rem'}}>
            <Button variant={"contained"} color={"primary"} component={Link} to={'/setup/'}>Back to Setup</Button>
          </div>
          <CreateTimeSlotDialog open={addOpen} setOpen={setAddOpen} onSubmit={onDialogSubmit} />
        </>
      }
      <ErrorDialog open={errorOpen} setOpen={setErrorOpen} message={errorMessage} />
    </div>
  );
}

EditSection.propTypes = {};

EditSection.defaultProps = {};

export default EditSection;
