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
import APIService from "../../../APIService";
import {URL_COURSES, URL_INSTRUCTORS} from "../../../urls";


const ClassForm = (props) => {
  const { row, setRow, classes, setClasses, disciplines, create } = props;
  const [newDiscipline, setNewDiscipline] = useState('');

  const onNewDisciplineChange = (e) => setNewDiscipline(e.target.value);
  const getDisciplineOptions = () => disciplines.filter(
    d => row.subject_disciplines.findIndex(q => q.id === d.id) < 0
  );
  const onAddNewDiscipline = () =>
    setRow({...row, subject_disciplines: row.subject_disciplines.concat([newDiscipline])});

  return (
    <>
      <Typography variant={'h6'} style={{textAlign: "center"}}>Course</Typography>
      <Grid container alignItems={"center"} justifyContent={"center"} spacing={2}>
        <Grid item>
          <TextField label={"Course Title"} required value={row.course_title || ''}
                     inputProps={{ maxLength: 30 }} type={"text"}
                     onChange={(e) => setRow({...row, course_title: e.target.value})} />
        </Grid>
        <Grid item>
          <TextField label={"Course Number"} required value={row.course_number || ''}
                     inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 6 }} type={"text"}
                     onChange={(e) => setRow({...row, course_number: e.target.value})}  />
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
          <Button variant={"contained"} color={"default"} onClick={onAddNewDiscipline}>Add</Button>
        </Grid>
        <Grid item xs={12}>
          {row.subject_disciplines.map((qual) => (
            <Chip label={qual.name} onDelete={() =>
              setRow({...row, subject_disciplines: row.subject_disciplines.filter(x => x.id !== qual.id)})} />
          ))}
        </Grid>
      </Grid>
      {!create &&
        <>
          <Typography variant={'h6'} style={{textAlign: "center", marginTop: "1rem"}}>Sections</Typography>
          <SectionForm row={row} classes={classes} setClasses={setClasses} />
        </>
      }
    </>

  );
};


const ClassDialog = (props) => {
  const { create, open, setOpen, row, setCourses, classes, setClasses, disciplines, setSelected, setEditOpen } = props;
  const [courseFormData, setCourseFormData] = useState(
    {course_title: '', course_number: null, subject_disciplines: []});

  const title = (create) ? 'Create Class' : 'Edit Class';

  const isCourseFormValid = () => {
    return !courseFormData.course_title || !courseFormData.course_number;
  };

  const close = () => setOpen(false);

  const onSubmit = () => {
    const data = {...courseFormData, subject_disciplines: courseFormData.subject_disciplines.map(sd => sd.id)};

    if (create) {
      APIService.post(URL_COURSES, data).then((data) => {
        setCourses(courses => courses.concat([data]));
        setSelected(data);
        setOpen(false);
        setEditOpen(true);
      }, error => console.error(error));
    } else {
      APIService.put(URL_COURSES, data).then((data) => {
        setCourses(courses => {
          const rowIndex = courses.findIndex(crs => crs.id === courseFormData.id);
          const coursesCopy = courses.slice(0);
          coursesCopy[rowIndex] = courseFormData;
          return coursesCopy;
        });
        setOpen(false);
      }, error => console.error(error));
    }
  };

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
          <ClassForm row={courseFormData} setRow={setCourseFormData} classes={classes} setClasses={setClasses}
                     disciplines={disciplines} create={create} />
        </DialogContent>
        <DialogActions>
          <Button variant={"contained"} onClick={close} color={"default"}>Cancel</Button>
          <Button variant={"contained"} onClick={onSubmit} color={"primary"}
                  disabled={isCourseFormValid()}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ClassDialog.propTypes = {};

ClassDialog.defaultProps = {};

export default ClassDialog;
