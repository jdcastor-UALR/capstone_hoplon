import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useParams} from "react-router-dom";
import {PageHeading} from "../../Utility/text-styles";
import Typography from "@material-ui/core/Typography";
import APIService from "../../../APIService";
import {URL_CLASSES, URL_COURSES} from "../../../urls";
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


const EditSection = () => {
  const [course, setCourse] = useState();
  const [sections, setSections] = useState([]);
  const [unauthorized, setUnauthorized] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [selectedSection, setSelectedSection] = useState();

  const { course_id } = useParams();

  const getSectionForm = () => {
    return (
      <div style={{marginBottom: '2rem'}}>
        <Tooltip title={'Add New Section'} placement={'left'}>
          <IconButton>
            <AddIcon />
          </IconButton>
        </Tooltip>
        <TextField select label={"Sections"} style={{minWidth: 240, margin: 'auto 1rem'}}
                   value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
          {sections.map((option) => (
            <MenuItem key={option.id} value={option}>
              {`Section ${option.id}`}
            </MenuItem>
          ))}
        </TextField>
        <Tooltip title={'Remove Section from Course'} placement={'right'}>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>
    );
  };

  const getTimeSlotListItems = () => {
    let items = [];

    if (selectedSection.meetingTimes.length > 0) {
      selectedSection.meetingTimes.forEach(time => {
        items.push(
          <ListItem key={time.id}>
            <ListItemText primary={`${time.meetingDays} ${time.begin_time} ${time.end_time}`} />
            <ListItemSecondaryAction>
              <Tooltip title={'Edit Timeslot'} placement={'left'}>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={'Remove Timeslot'} placement={'right'}>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        );
      });
    }

    return items;
  };

  useEffect(() => {
    const allPromise = Promise.all([APIService.get(`${URL_COURSES}${course_id}`), APIService.get(URL_CLASSES)]);

    allPromise.then(data => {
      setCourse(data[0]);
      setSections(data[1].filter(section => section.course.id === data[0].id));
      setLoaded(true)
    }, error => console.error(error));
  }, []);

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
              <IconButton>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </List>
          }
          <div style={{marginTop: '2.5rem'}}>
            <Button variant={"contained"} color={"primary"}>Back to Setup</Button>
          </div>
        </>
      }
    </div>
  );
}

EditSection.propTypes = {};

EditSection.defaultProps = {};

export default EditSection;
