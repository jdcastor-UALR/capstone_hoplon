import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddIcon from "@material-ui/icons/Add";
import List from "@material-ui/core/List";
import ClassDialog from "../ClassDialog/ClassDialog";

const ClassListItems = (classes, openEditDialog) => {
  let listItems = [];

  for (let cls of classes) {
    listItems.push(
      <ListItem>
        <ListItemText primary={cls.courseTitle} secondary={'CPSC ' + cls.courseNumber + ' - ' + cls.meetingTimes} />
        <ListItemSecondaryAction>
          <IconButton edge={"end"} aria-label={"edit-class"} onClick={openEditDialog}>
            <EditIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
    listItems.push(<Divider />);
  }

  return listItems;
};

const ClassList = (props) => {
  const [addOpen, setAddOpen] = useState(false);
  const openAddDialog = () => setAddOpen(true);
  const [editOpen, setEditOpen] = useState(false);
  const openEditDialog = () => setEditOpen(true);

  return (
    <div data-testid="ClassList">
      <List style={{border: `1px #0000001f solid`}}>
        {ClassListItems(props.classes, openEditDialog)}
        <ListItem button onClick={openAddDialog}>
          <ListItemIcon><AddIcon /></ListItemIcon>
          <ListItemText primary={'Add New'} />
        </ListItem>
      </List>
      <ClassDialog create={true} open={addOpen} setOpen={setAddOpen} />
      <ClassDialog open={editOpen} setOpen={setEditOpen} />
    </div>
  );
};

ClassList.propTypes = {};

ClassList.defaultProps = {};

export default ClassList;
