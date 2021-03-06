import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddIcon from "@material-ui/icons/Add";
import List from "@material-ui/core/List";
import ClassDialog from "../ClassDialog/ClassDialog";
import APIService from "../../../APIService";
import {URL_COURSES} from "../../../urls";
import Tooltip from "@material-ui/core/Tooltip";

const ClassList = (props) => {
  const {classes, setClasses, courses, setCourses, disciplines, writeAuthorized, errorDialog} = props;
  const [selected, setSelected] = useState({});

  const [addOpen, setAddOpen] = useState(false);
  const openAddDialog = () => setAddOpen(true);
  const [editOpen, setEditOpen] = useState(false);
  const openEditDialog = (course) => {
    setSelected(course)
    setEditOpen(true);
  };

  const ClassListItems = () => {
    let listItems = [];

    for (let course of courses) {
      const classesOnCourse = classes.filter(cls => cls.course.id === course.id);
      const meetingTimeStrings = classesOnCourse.map(cls => cls.meetingTimeString);
      listItems.push(
        <ListItem key={course.id}>
          <ListItemText primary={'CPSC ' + course.course_number + ' - ' + course.course_title}
                        secondary={classesOnCourse.length.toString() + ' Section(s) - ' + meetingTimeStrings.join(' | ')} />
          {writeAuthorized &&
            <ListItemSecondaryAction>
              <Tooltip title={'Edit Course'} placement={'left'}>
                <IconButton edge={"end"} onClick={() => openEditDialog(course)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={'Delete Course'} placement={'right'}>
                <IconButton edge={"end"}
                            onClick={() => {
                              APIService.delete(URL_COURSES, course.id).then(data => {
                                setCourses(courses => courses.filter(crs => crs.id !== course.id));
                              }, error => errorDialog(error.message));
                            }}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          }
        </ListItem>
      );
      listItems.push(<Divider key={`divider-${course.id}`} />);
    }

    return listItems;
  };

  return (
    <div data-testid="ClassList">
      <List style={{border: `1px #0000001f solid`}}>
        {ClassListItems()}
        {writeAuthorized &&
          <ListItem button onClick={openAddDialog} key={'addRow'}>
            <ListItemIcon><AddIcon /></ListItemIcon>
            <ListItemText primary={'Add New'} />
          </ListItem>
        }
      </List>
      {writeAuthorized &&
        <>
          <ClassDialog create={true} open={addOpen} setOpen={setAddOpen} setCourses={setCourses}
                       disciplines={disciplines} setClasses={setClasses} errorDialog={errorDialog}
                       setSelected={setSelected} setEditOpen={setEditOpen}/>
          <ClassDialog open={editOpen} setOpen={setEditOpen} row={selected} setCourses={setCourses}
                       disciplines={disciplines} classes={classes} setClasses={setClasses} errorDialog={errorDialog} />
        </>
      }

    </div>
  );
};

ClassList.propTypes = {};

ClassList.defaultProps = {};

export default ClassList;
