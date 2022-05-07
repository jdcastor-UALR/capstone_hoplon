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
import Tooltip from "@material-ui/core/Tooltip";

const InstructorList = (props) => {
  const {instructors, setInstructors, disciplines, writeAuthorized, errorDialog} = props;
  const [selected, setSelected] = useState({});

  const [addOpen, setAddOpen] = useState(false);
  const openAddDialog = () => setAddOpen(true);
  const [editOpen, setEditOpen] = useState(false);
  const openEditDialog = (instructor) => {
    setSelected(instructor);
    setEditOpen(true);
  };

  const InstructorListItems = () => {
    let listItems = [];

    for (let instructor of instructors) {
      listItems.push(
        <ListItem key={instructor.id}>
          <ListItemText primary={instructor.lastName}
                        secondary={'Assignment Limit: ' + instructor.maxSections.toString()} />
          {writeAuthorized &&
            <ListItemSecondaryAction>
              <Tooltip title={'Edit Instructor'} placement={'left'}>
                <IconButton edge={"end"} aria-label={"edit-instructor"} onClick={() => openEditDialog(instructor)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={'Delete Instructor'} placement={'right'}>
                <IconButton edge={"end"} aria-label={"delete-instructor"}
                            onClick={() => {
                              APIService.delete(URL_INSTRUCTORS, instructor.id).then(() => {
                                setInstructors(instructors.filter(i => i.id !== instructor.id));
                              }, (error) => errorDialog(error.message));
                            }}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          }
        </ListItem>
      );
      listItems.push(<Divider key={`divider-${instructor.id}`} />);
    }

    return listItems;
  };

  return (
    <div data-testid="InstructorList">
      <List style={{border: `1px #0000001f solid`}}>
        {InstructorListItems()}
        {writeAuthorized &&
          <ListItem button onClick={openAddDialog} key={'addRow'}>
            <ListItemIcon><AddIcon /></ListItemIcon>
            <ListItemText primary={'Add New'} />
          </ListItem>
        }
      </List>
      {writeAuthorized &&
      <>
        <InstructorDialog create={true} open={addOpen} setOpen={setAddOpen} errorDialog={errorDialog}
                          disciplines={disciplines} setInstructors={setInstructors} />
        <InstructorDialog open={editOpen} setOpen={setEditOpen} row={selected} errorDialog={errorDialog}
                          disciplines={disciplines} setInstructors={setInstructors} />
      </>
      }
    </div>
  );
};

InstructorList.propTypes = {};

InstructorList.defaultProps = {};

export default InstructorList;
