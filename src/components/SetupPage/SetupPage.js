import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import InstructorList from "./InstructorList/InstructorList";
import ClassList from "./ClassList/ClassList";
import APIService from "../../APIService";
import {URL_CLASSES, URL_COURSES, URL_DISCIPLINES, URL_INSTRUCTORS, URL_WRITE_ACCESS} from "../../urls";
import {PageHeading, UnauthorizedMessage} from "../Utility/text-styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import ErrorDialog from "../Utility/ErrorDialog/ErrorDialog";

const SetupPage = () => {
  const [unauthorized, setUnauthorized] = useState(false);
  const [writeAuthorized, setWriteAuthorized] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const [disciplines, setDisciplines] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [classes, setClasses] = useState([]);
  const [courses, setCourses] = useState([]);

  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const openErrorDialog = (message) => {
    setErrorMessage(message);
    setErrorOpen(true);
  };

  const handleError = (error) => {
    if (error.message.slice(0, 3) === '403') {
      setUnauthorized(true);
    } else {
      openErrorDialog(error.message);
    }
  };

  useEffect(() => {
    const allPromise = Promise.all([APIService.get(URL_DISCIPLINES), APIService.get(URL_INSTRUCTORS),
      APIService.get(URL_CLASSES), APIService.get(URL_COURSES)]);

    allPromise.then(data => {
      setDisciplines(data[0]);
      setInstructors(data[1]);
      setClasses(data[2]);
      setCourses(data[3]);
      setLoaded(true);
    }, handleError);

    APIService.get(URL_WRITE_ACCESS).then(() => {}, (error) => {
      if (error.message.slice(0, 3) === '403') setWriteAuthorized(false);
    });
  }, []);

  if (unauthorized) {
    return (
      <div data-testid="SetupPage">
        {PageHeading('Setup Page')}
        {UnauthorizedMessage('setup')}
      </div>
    );
  }

  return (
    <div data-testid="SetupPage">
      <Grid container spacing={2} justifyContent={"center"}>
        <Grid container item xs={5} direction={"column"}>
          {PageHeading('Teaching Staff', 'h4')}
          <div style={{padding: '1rem 5rem'}}>
            {(!loaded) ?
              <CircularProgress /> :
              <InstructorList instructors={instructors} setInstructors={setInstructors} disciplines={disciplines}
                              writeAuthorized={writeAuthorized} errorDialog={openErrorDialog} />}
          </div>
        </Grid>
        <Divider orientation={"vertical"} flexItem />
        <Grid container item xs={5} direction={"column"}>
          {PageHeading('Class Roster', 'h4')}
          <div style={{padding: '1rem 5rem'}}>
            {(!loaded) ?
              <CircularProgress /> :
              <ClassList classes={classes} setClasses={setClasses} courses={courses} setCourses={setCourses}
                         disciplines={disciplines} writeAuthorized={writeAuthorized} errorDialog={openErrorDialog} />}
          </div>
        </Grid>
      </Grid>
      <ErrorDialog open={errorOpen} setOpen={setErrorOpen} message={errorMessage} />
    </div>
  );
};

SetupPage.propTypes = {};

SetupPage.defaultProps = {};

export default SetupPage;
