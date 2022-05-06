import React from 'react';
import PropTypes from 'prop-types';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";


const ErrorDialog = (props) => {
  const { open, setOpen, message } = props;

  const close = () => setOpen(false);

  return (
    <div data-testid="ErrorDialog">
      <Dialog open={open} onClose={close}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          {message}
        </DialogContent>
        <DialogActions>
          <Button variant={"contained"} color={"primary"} onClick={close}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ErrorDialog.propTypes = {};

ErrorDialog.defaultProps = {};

export default ErrorDialog;
