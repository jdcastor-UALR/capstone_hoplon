import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";


const ConfirmationDialog = (props) => {
  const { title, message, open, setOpen, onConfirm } = props;

  const cancel = () => setOpen(false);
  const confirm = () => {
    setOpen(false);
    onConfirm();
  };

  return (
    <div data-testid="ConfirmationDialog">
      <Dialog open={open} onClose={cancel}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{message}</DialogContent>
        <DialogActions>
          <Button variant={"contained"} onClick={cancel} color={"primary"}>No</Button>
          <Button variant={"contained"} onClick={confirm} color={"default"}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmationDialog;
