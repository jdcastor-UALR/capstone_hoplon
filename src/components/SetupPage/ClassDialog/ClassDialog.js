import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import SectionForm from "../SectionForm/SectionForm";


const ClassForm = (props) => {
  const { row, setRow, classes, disciplines } = props;
  const [newDiscipline, setNewDiscipline] = useState('');

  const onNewDisciplineChange = (e) => setNewDiscipline(e.target.value);
  const getDisciplineOptions = () => disciplines.filter(
    d => row.subject_disciplines.findIndex(q => q.id === d.id) < 0
  );

  return (
    <>
      <Typography variant={'h6'} style={{textAlign: "center"}}>Course</Typography>
      <Grid container alignItems={"center"} justifyContent={"center"} spacing={2}>
        <Grid item>
          <TextField label={"Course Title"} required value={row.course_title || ''} />
        </Grid>
        <Grid item>
          <TextField label={"Course Number"} value={row.course_number || ''} />
        </Grid>
        <Grid item>
          <TextField select label={"Subject Disciplines"} style={{minWidth: 160}}
                     value={newDiscipline} onChange={onNewDisciplineChange}>
            {getDisciplineOptions().map((option) => (
              <MenuItem key={option.name} value={option}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item>
          <Button variant={"contained"} color={"default"}>Add</Button>
        </Grid>
        <Grid item xs={12}>
          {row.subject_disciplines.map((qual) => (
            <Chip label={qual.name} />
          ))}
        </Grid>
      </Grid>
      <Typography variant={'h6'} style={{textAlign: "center", marginTop: "1rem"}}>Sections</Typography>
      <SectionForm row={row} classes={classes} />
    </>

  );
};


const ClassDialog = (props) => {
  const { create, open, setOpen, row, classes, disciplines } = props;
  const [courseFormData, setCourseFormData] = useState(
    {course_title: '', course_number: null, subject_disciplines: []});
  const [classFormData, setClassFormData] = useState({});

  const title = (create) ? 'Create Class' : 'Edit Class';

  const close = () => setOpen(false);

  useEffect(() => {
    if (open && !create) {
      setCourseFormData(row);
    } else if (open && create) {
      setCourseFormData({course_title: '', course_number: null, subject_disciplines: []});
    }
  }, [open]);

  return (
    <div data-testid="ClassDialog">
      <Dialog open={open}
              onClose={close}
              aria-labelledby="instructor-dialog"
              fullWidth maxWidth={"sm"}>
        <DialogTitle id="instructor-dialog">{title}</DialogTitle>
        <DialogContent>
          <ClassForm row={courseFormData} classes={classes} disciplines={disciplines} />
        </DialogContent>
        <DialogActions>
          <Button variant={"contained"} onClick={close} color={"default"}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ClassDialog.propTypes = {};

ClassDialog.defaultProps = {};

export default ClassDialog;
