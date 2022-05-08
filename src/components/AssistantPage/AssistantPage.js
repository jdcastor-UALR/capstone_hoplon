import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit"
import APIService from "../../APIService";
import {URL_CHANGES, URL_CLASSES, URL_INSTRUCTORS, URL_SOLUTION_CONSTRAINT_MAP, URL_SOLUTIONS} from "../../urls";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {PageHeading, UnauthorizedMessage} from "../Utility/text-styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorDialog from "../Utility/ErrorDialog/ErrorDialog";

const AssistantPage = () => {
  const [unauthorized, setUnauthorized] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [changes, setChanges] = useState(false);
  const [runningScheduler, setRunningScheduler] = useState(false);

  const [solutions, setSolutions] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [sections, setSections] = useState([]);
  const [constraintMap, setConstraintMap] = useState({});

  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const runScheduler = () => {
    setLoaded(false);
    setRunningScheduler(true);
    setSolutions([]);
    APIService.post(URL_SOLUTIONS).then((data) => {
      if (data) {
        setSolutions(data);
      }
    }, handleError).finally(() => {
      setLoaded(true);
      setRunningScheduler(false);
      setChanges(false);
    });
  };

  const runSchedulerSection = () => {
    let result = (<br />);

    if (instructors.length === 0 || sections.length === 0) {
      result = (
        <>
          <Typography>Welcome to ADTAA! To get started, classes and instructors must be defined to generate schedules
            from. Please use the button below to go to the setup page.</Typography>
          <br />
          <Button color={"primary"} variant={"contained"} component={Link} to={'/setup'}>Go to Setup</Button>
        </>
      );
    } else if (solutions.length === 0) {
      result = (
        <>
          <Typography>No solutions have been generated.</Typography>
          <br />
          <Button variant={"contained"} color={"primary"} onClick={runScheduler}>
            Run Scheduler
          </Button>
        </>
      );
    }

    return result;
  };

  const getConstraintViolations = (schedule) => {
    let assignmentViolations = 0;
    let disciplineViolations = 0;
    let overlapViolations = 0;

    let assignmentMap = {};

    instructors.forEach(instructor => {
      const assigned = schedule.assignments.filter(a => a.instructor === instructor);
      const count = assigned.length;
      if (count > instructor.maxSections) {
        assignmentViolations += 1;
      }
      assignmentMap[instructor.id] = assigned.map(a => a.section);
    });

    schedule.assignments.forEach(assignment => {
      if (assignment.instructor != null) {
        const approved = constraintMap.discipline_overlap_map[assignment.section];
        if (!approved.includes(assignment.instructor)) {
          disciplineViolations += 1;
        }

        const overlap = constraintMap.section_overlap_map[assignment.section];
        if (assignmentMap[assignment.instructor].some(section => overlap.includes(section))) {
          overlapViolations += 1;
        }
      }
    });

    let result = '';
    if (assignmentViolations) result += `${assignmentViolations} instructors assigned over limit, `;
    if (disciplineViolations) result += `${disciplineViolations} instructors teaching outside of their expertise, `;
    if (overlapViolations) result += `${overlapViolations} instructors with schedule conflicts, `;
    return (result.length > 0) ? result.slice(0, -2) : 'None';
  }

  const generateCards = () => {
    let cards = [];
    let count = 1;

    for (let schedule of solutions.slice(0, 12)) {
      const border = (schedule.assignment_count === schedule.assignments.length) ?
        '5px #008800 solid' : '1px black solid';
      cards.push(
        <Card variant={"outlined"} key={schedule.id} style={{width: '20%', margin: '1em', border: border}}>
          <CardContent>
            <Typography>Option {count}</Typography>
            <Typography>Covered Classes: {schedule.assignment_count}/{schedule.assignments.length}</Typography>
            <Typography>Issues: {getConstraintViolations(schedule)}</Typography>
          </CardContent>
          <CardActions>
            <IconButton style={{marginLeft: "auto"}} component={Link} to={`/edit/${schedule.id}`}>
              <EditIcon />
            </IconButton>
          </CardActions>
        </Card>
      );
      count += 1;
    }

    return cards;
  }

  const handleError = (error) => {
    if (error.message.slice(0, 3) === '403') {
      setUnauthorized(true);
    } else {
      setErrorMessage(error.message);
      setErrorOpen(true);
    }
  };

  useEffect(() => {
    const allPromise = Promise.all([
      APIService.get(URL_SOLUTIONS), APIService.get(URL_INSTRUCTORS), APIService.get(URL_CLASSES),
      APIService.get(URL_SOLUTION_CONSTRAINT_MAP), APIService.get(URL_CHANGES)
    ]);

    allPromise.then(data => {
      setSolutions(data[0]);
      setInstructors(data[1]);
      setSections(data[2]);
      setConstraintMap(data[3]);
      setChanges(data[4].data_changed);
      setLoaded(true);
    }).catch(handleError);
  }, []);

  if (unauthorized) {
    return (
      <div>
        {PageHeading('Generated Schedules')}
        {UnauthorizedMessage('scheduler')}
      </div>
    );
  }

  return (
    <div data-testid="AssistantPage">
      {PageHeading('Generated Schedules')}
      {runningScheduler &&
      <Typography>Please wait for the scheduler to finish, this step can take several minutes.</Typography>
      }
      {(!loaded) ?
        <CircularProgress /> : runSchedulerSection()
      }
      {(loaded && changes && solutions.length > 0) &&
        <Card variant={"outlined"} style={{margin: 'auto auto 1rem auto', width: '60%'}}>
          <CardContent>
            <Typography>These solutions were generated with data that has been modified, and could be invalid.
              Click this button to re-run the scheduler!</Typography>
          </CardContent>
          <CardActions>
            <Button variant={"contained"} color={"primary"} style={{margin: "auto"}}
                    onClick={runScheduler}>Run Scheduler</Button>
          </CardActions>
        </Card>
      }
      {loaded &&
        <Grid container alignItems={"center"} justifyContent={"center"}>
          {generateCards()}
        </Grid>
      }
      <ErrorDialog open={errorOpen} setOpen={setErrorOpen} message={errorMessage} />
    </div>
  );
}

AssistantPage.propTypes = {};

AssistantPage.defaultProps = {};

export default AssistantPage;
