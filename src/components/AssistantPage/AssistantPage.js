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
import {URL_CHANGES, URL_CLASSES, URL_INSTRUCTORS, URL_SOLUTIONS} from "../../urls";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {PageHeading, UnauthorizedMessage} from "../Utility/text-styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const runSchedulerSection = (schedule, instructors, sections, runScheduler) => {
  let result = (<br />);

  if ((instructors.size === 0 || instructors.size == null) || (sections.size === 0 || sections.size == null)) {
    result = (
      <>
        <Typography>Welcome to ADTAA! To get started, classes and instructors must be defined to generate schedules
          from. Please use the button below to go to the setup page.</Typography>
        <br />
        <Button color={"primary"} variant={"contained"} component={Link} to={'/setup'}>Go to Setup</Button>
      </>
    );
  } else if (schedule.length === 0) {
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

const generateCards = (schedule) => {
  let cards = [];
  let count = 1;

  for (let option of schedule) {
    cards.push(
      <Card variant={"outlined"} key={option.id} style={{width: '20%', margin: '1em'}}>
        <CardContent>
          <Typography>Option {count}</Typography>
          <Typography>Covered Classes: {option.assignment_count}/{option.assignments.length}</Typography>
          {/*TODO: Dynamically detect issues*/}
          <Typography>Issues: None</Typography>
        </CardContent>
        <CardActions>
          <IconButton style={{marginLeft: "auto"}} component={Link} to={`/edit/${option.id}`}>
            <EditIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
    count += 1;
  }

  return cards;
}

const AssistantPage = () => {
  const [unauthorized, setUnauthorized] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [changes, setChanges] = useState(false);
  const [runningScheduler, setRunningScheduler] = useState(false);

  const [solutions, setSolutions] = useState([]);
  const [instructors, setInstructors] = useState({});
  const [sections, setSections] = useState({});

  const runScheduler = () => {
    setLoaded(false);
    setRunningScheduler(true);
    setSolutions([]);
    APIService.post(URL_SOLUTIONS).then((data) => {
      if (data) {
        setSolutions(data);
      }
    }, (error) => console.error(error)).finally(() => {
      setLoaded(true);
      setRunningScheduler(false);
      setChanges(false);
    });
  };

  const handleError = (error) => {
    if (error.message === '403') {
      setUnauthorized(true);
    } else {
      console.error(error);
    }
  };

  useEffect(() => {
    const allPromise = Promise.all([
      APIService.get(URL_SOLUTIONS), APIService.get(URL_INSTRUCTORS),
      APIService.get(URL_CLASSES), APIService.get(URL_CHANGES)
    ]);

    allPromise.then(data => {
      setSolutions(data[0]);
      setInstructors(new Map(data[1].map(obj => [obj.id, obj])));
      setSections(new Map(data[2].map(obj => [obj.id, obj])));
      setChanges(data[3].data_changed);
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
        <CircularProgress /> :
        runSchedulerSection(solutions, instructors, sections, runScheduler)
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
      <Grid container alignItems={"center"} justifyContent={"center"}>
        {generateCards(solutions.slice(0, 12))}
      </Grid>
    </div>
  );
}

AssistantPage.propTypes = {};

AssistantPage.defaultProps = {};

export default AssistantPage;
