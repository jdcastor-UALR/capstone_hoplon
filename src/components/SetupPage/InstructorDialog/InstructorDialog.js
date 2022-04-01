import React from 'react';
import PropTypes from 'prop-types';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";


const InstructorDialog = (props) => {
  const { create, open, setOpen } = props;
  const title = (create) ? 'Create Instructor' : 'Edit Instructor';

  const close = () => setOpen(false);

  return (
    <div data-testid="InstructorDialog">
      <Dialog open={open}
              onClose={close}
              aria-labelledby="instructor-dialog"
              fullWidth maxWidth={"sm"}>
        <DialogTitle id="instructor-dialog">{title}</DialogTitle>
        <DialogContent>
          Lorem ipsum....
        </DialogContent>
        <DialogActions>
          <Button variant={"contained"} onClick={close} color={"default"}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

InstructorDialog.propTypes = {};

InstructorDialog.defaultProps = {};

export default InstructorDialog;
