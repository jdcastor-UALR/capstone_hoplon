import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InstructorDialog from "../InstructorDialog/InstructorDialog";
import APIService from "../../../APIService";
import {URL_INSTRUCTORS} from "../../../urls";

const InstructorListItems = (instructors, setInstructors, openEditDialog) => {
  let listItems = [];

  for (let instructor of instructors) {
    listItems.push(
      <ListItem>
        <ListItemText primary={instructor.lastName}
                      secondary={'Assignment Limit: ' + instructor.maxSections.toString()} />
        <ListItemSecondaryAction>
          <IconButton edge={"end"} aria-label={"edit-instructor"} onClick={() => openEditDialog(instructor)}>
            <EditIcon />
          </IconButton>
          <IconButton edge={"end"} aria-label={"delete-instructor"}
                      onClick={() => {
                        APIService.delete(URL_INSTRUCTORS, instructor.id).then(() => {
                          setInstructors(instructors.filter(i => i.id !== instructor.id));
                        }, (errors) => console.error(errors));
                      }}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
    listItems.push(<Divider />);
  }

  return listItems;
};

const InstructorList = (props) => {
  const [selected, setSelected] = useState({});

  const [addOpen, setAddOpen] = useState(false);
  const openAddDialog = () => setAddOpen(true);
  const [editOpen, setEditOpen] = useState(false);
  const openEditDialog = (instructor) => {
    setSelected(instructor);
    setEditOpen(true);
  };

  return (
    <div data-testid="InstructorList">
      <List style={{border: `1px #0000001f solid`}}>
        {InstructorListItems(props.instructors, props.setInstructors, openEditDialog)}
        <ListItem button onClick={openAddDialog}>
          <ListItemIcon><AddIcon /></ListItemIcon>
          <ListItemText primary={'Add New'} />
        </ListItem>
      </List>
      <InstructorDialog create={true} open={addOpen} setOpen={setAddOpen}
                        disciplines={props.disciplines} setInstructors={props.setInstructors} />
      <InstructorDialog open={editOpen} setOpen={setEditOpen} row={selected}
                        disciplines={props.disciplines} setInstructors={props.setInstructors} />
    </div>
  );
};

InstructorList.propTypes = {};

InstructorList.defaultProps = {};

export default InstructorList;
