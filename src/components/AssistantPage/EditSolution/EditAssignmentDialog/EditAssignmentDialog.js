import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";


const EditAssignmentDialog = (props) => {
  const { open, setOpen, row, schedule, setSchedule, instructors, sectionOverlapMap, disciplineMap } = props;
  const [selectedInstructor, setSelectedInstructor] = useState();

  const close = () => setOpen(false);

  const onInstructorSelect = (e) => {
    setSelectedInstructor(e.target.value);
  };

  const onSubmit = () => {
    let newScheduleAssignments = schedule.assignments;
    const replaceIndex = newScheduleAssignments.findIndex(as => as.id === row.id);
    newScheduleAssignments[replaceIndex].instructor = selectedInstructor;

    const newSchedule = schedule;
    schedule.assignments = newScheduleAssignments
    setSchedule(newSchedule);
    close();
  };

  useEffect(() => {
    if (row != null) {
      setSelectedInstructor(row.instructor);
    }
  }, [row]);


  return (
    <div data-testid="EditAssignmentDialog">
      <Dialog open={open} onClose={close}
              fullWidth maxWidth={"sm"}>
        <DialogTitle>Edit Assignment</DialogTitle>
        <DialogContent>
          {row != null &&
            <>
              <Typography style={{textAlign: "center", fontWeight: 'bold'}}>
                {row.course_number} {row.course_title}</Typography>
              <Typography style={{textAlign: "center"}}>
                {row.meetingTimeString}</Typography>
            </>
          }
          {instructors.size != null &&
            <TextField select label={"Instructor"} style={{minWidth: 160}}
                       value={selectedInstructor} onChange={onInstructorSelect}>
              {Array.from(instructors.values()).map((instructor) => (
                <MenuItem key={instructor.id} value={instructor.id}>
                  {instructor.lastName}
                </MenuItem>
              ))}
            </TextField>
          }
        </DialogContent>
        <DialogActions>
          <Button variant={"contained"} onClick={close}>Cancel</Button>
          <Button variant={"contained"} color={"primary"}
                  onClick={onSubmit} disabled={!selectedInstructor}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

EditAssignmentDialog.propTypes = {};

EditAssignmentDialog.defaultProps = {};

export default EditAssignmentDialog;
