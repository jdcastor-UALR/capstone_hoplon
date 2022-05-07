import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {DayAbbrevToValue} from "../../../../constants";
import MenuItem from "@material-ui/core/MenuItem";


const CreateTimeSlotDialog = (props) => {
  const { open, setOpen, onSubmit } = props;
  const [timeslot, setTimeslot] = useState({meetingDays: 'Mon.', begin_time: '', end_time: ''});

  const onBeforeSubmit = () => {
    onSubmit(timeslot);
    setOpen(false);
    setTimeslot({meetingDays: 'Mon.', begin_time: '', end_time: ''});
  }

  const getTimeSlotForm = () => {
    return (
      <div>
        <Grid container alignItems={"center"} justifyContent={"center"} spacing={2}>
          <Grid item xs={4}>
            <TextField select label={"Day"} style={{minWidth: 60}} value={timeslot.meetingDays}
                       onChange={event => setTimeslot({...timeslot, meetingDays: event.target.value})}>
              {Object.keys(DayAbbrevToValue).map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={8}>
            <TextField label={"Begin Time"} type={"time"} value={timeslot.begin_time}
                       onChange={event => setTimeslot({...timeslot, begin_time: event.target.value})}
                       InputLabelProps={{shrink: true}} inputProps={{step: 60}} fullWidth />
          </Grid>
          <Grid item xs={8}>
            <TextField label={"End Time"} type={"time"} value={timeslot.end_time}
                       onChange={event => setTimeslot({...timeslot, end_time: event.target.value})}
                       InputLabelProps={{shrink: true}} inputProps={{step: 60}} fullWidth />
          </Grid>
        </Grid>
      </div>
    );
  };

  const close = () => setOpen(false);

  return (
    <div data-testid="CreateTimeSlotDialog">
      <Dialog open={open} onClose={close}>
        <DialogTitle>Create Time Slot</DialogTitle>
        <DialogContent>
          {getTimeSlotForm()}
        </DialogContent>
        <DialogActions>
          <Button variant={"contained"}  onClick={close}>Cancel</Button>
          <Button variant={"contained"} color={"primary"}
                  disabled={timeslot.begin_time === '' || timeslot.end_time === ''}
                  onClick={onBeforeSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

CreateTimeSlotDialog.propTypes = {};

CreateTimeSlotDialog.defaultProps = {};

export default CreateTimeSlotDialog;
