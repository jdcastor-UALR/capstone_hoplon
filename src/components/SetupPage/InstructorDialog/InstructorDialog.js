import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";


const InstructorForm = (props) => {
  const { row, setRow, disciplines } = props;
  const [newQualification, setNewQualification] = useState('');

  const onLastNameChange = (e) => setRow({...row, lastName: e.target.value});
  const onMaxSectionsChange = (e) => setRow({...row, maxSections: e.target.value.replace(/[^0-9]/g, '')});
  const onNewQualificationChange = (e) => setNewQualification(e.target.value);
  const onAddNewQualification = () => setRow({...row, qualifications: row.qualifications.concat([newQualification])});

  const getDisciplineOptions = () => disciplines.filter(
    d => row.qualifications.findIndex(q => q.id === d.id) < 0
  );

  return (
    <Grid container alignItems={"center"} justifyContent={"center"} spacing={2}>
      <Grid item>
        <TextField id={"lastNameInput"} label={"Last Name"} required
                   inputProps={{ maxLength: 30 }} type={"text"}
                   value={row.lastName || ''} onChange={onLastNameChange} />
      </Grid>
      <Grid item>
        <TextField id={"maxSectionsInput"} label={"Max Sections"} required
                   inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 2 }} type={"text"}
                   value={row.maxSections || ''} onChange={onMaxSectionsChange} />
      </Grid>
      <Grid item>
        <TextField id={"qualificationsSelect"} select label={"Qualifications"} style={{minWidth: 150}}
                   value={newQualification} onChange={onNewQualificationChange}>
          {getDisciplineOptions().map((option) => (
            <MenuItem key={option.name} value={option}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item>
        <Button variant={"contained"} color={"default"} onClick={onAddNewQualification}>Add</Button>
      </Grid>
      <Grid item xs={12}>
        {row.qualifications.map((qual) => (
          <Chip label={qual.name}
                onDelete={() => setRow({...row, qualifications: row.qualifications.filter(x => x.id !== qual.id)})} />
        ))}
      </Grid>
    </Grid>
  );
}


const InstructorDialog = (props) => {
  const { create, open, setOpen, row, disciplines } = props;
  const title = (create) ? 'Create Instructor' : 'Edit Instructor';

  const close = () => setOpen(false);

  const [instructor, setInstructor] = useState({lastName: null, maxSections: null, qualifications: []});

  useEffect(() => {
    if (open && !create) {
      setInstructor(row);
    } else if (open && create) {
      setInstructor({lastName: null, maxSections: null, qualifications: []});
    }
  }, [open]);

  return (
    <div data-testid="InstructorDialog">
      <Dialog open={open}
              onClose={close}
              aria-labelledby="instructor-dialog"
              fullWidth maxWidth={"sm"}>
        <DialogTitle id="instructor-dialog">{title}</DialogTitle>
        <DialogContent>
          <InstructorForm row={instructor} setRow={setInstructor} disciplines={disciplines} />
        </DialogContent>
        <DialogActions>
          <Button variant={"contained"} onClick={close} color={"default"}>Cancel</Button>
          <Button variant={"contained"} disabled={!instructor.lastName || !instructor.maxSections}
                  onClick={() => console.log(instructor)} color={"primary"}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

InstructorDialog.propTypes = {};

InstructorDialog.defaultProps = {};

export default InstructorDialog;
