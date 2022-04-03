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

const ClassListItems = (classes, courses, openEditDialog) => {
  let listItems = [];

  for (let course of courses) {
    const classesOnCourse = classes.filter(cls => cls.course === course.id);
    const meetingTimeStrings = classesOnCourse.map(cls => cls.meetingTimeString);
    listItems.push(
      <ListItem>
        <ListItemText primary={'CPSC ' + course.course_number + ' - ' + course.course_title}
                      secondary={classesOnCourse.length.toString() + ' Section(s) - ' + meetingTimeStrings.join('; ')} />
        <ListItemSecondaryAction>
          <IconButton edge={"end"} onClick={() => openEditDialog(course)}>
            <EditIcon />
          </IconButton>
          <IconButton edge={"end"}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
    listItems.push(<Divider />);
  }

  return listItems;
};

const ClassList = (props) => {
  const [selected, setSelected] = useState({});

  const [addOpen, setAddOpen] = useState(false);
  const openAddDialog = () => setAddOpen(true);
  const [editOpen, setEditOpen] = useState(false);
  const openEditDialog = (course) => {
    setSelected(course)
    setEditOpen(true);
  };

  return (
    <div data-testid="ClassList">
      <List style={{border: `1px #0000001f solid`}}>
        {ClassListItems(props.classes, props.courses, openEditDialog)}
        <ListItem button onClick={openAddDialog}>
          <ListItemIcon><AddIcon /></ListItemIcon>
          <ListItemText primary={'Add New'} />
        </ListItem>
      </List>
      <ClassDialog create={true} open={addOpen} setOpen={setAddOpen}
                   disciplines={props.disciplines} />
      <ClassDialog open={editOpen} setOpen={setEditOpen} row={selected}
                   disciplines={props.disciplines} classes={props.classes} />
    </div>
  );
};

ClassList.propTypes = {};

ClassList.defaultProps = {};

export default ClassList;
