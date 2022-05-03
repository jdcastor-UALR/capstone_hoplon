import React, {useEffect, useState} from 'react';
import useTheme from "@material-ui/core/styles/useTheme";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import {PageHeading} from "../Utility/text-styles";
import APIService from "../../APIService";
import {saveToken} from "../../auth";
import {URL_CHANGE_PASSWORD, URL_CREATE_REGISTRATION_REQUEST} from "../../urls";

const LoginForm = (setUsername, setPassword) => {
  return (
    <>
      <Grid container alignItems={"center"} justifyContent={"center"} spacing={2}>
        <Grid item xs={12}>
          <TextField required label={"Email"} type={"text"} onChange={event => setUsername(event.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField required label={"Password"} type={"password"} onChange={event => setPassword(event.target.value)} />
        </Grid>
      </Grid>
    </>
  );
};

const RegisterForm = (accessLevels, setUsername, setPassword, setAccessLevel) => {
  return (
    <>
      <Grid container alignItems={"center"} justifyContent={"center"} spacing={2}>
        <Grid item xs={12}>
          <TextField required label={"Email"} type={"text"}
                     onChange={e => setUsername(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField select label={"Requested Access Level"} style={{minWidth: 200}}
                     onChange={e => setAccessLevel(e.target.value)}>
            {accessLevels.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField required label={"Requested Password"} type={"password"}
                     onChange={e => setPassword(e.target.value)} />
        </Grid>
      </Grid>
    </>
  );
};

const LoginPage = (props) => {
  const theme = useTheme();

  const [isLoginForm, setIsLoginForm] = useState(true);
  const accessLevels = ['root', 'admin', 'assistant'];

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [accessLevel, setAccessLevel] = useState();

  const onSubmit = () => {
    if (isLoginForm) {
      APIService.authenticate(username, password).then((data) => {
        saveToken(data);
        window.location.reload(false);
      }, (error) => {
        if (error.message === '404') {
          // This means that this is first user
          APIService.put(URL_CHANGE_PASSWORD,
            {username: 'root', password: 'root', new_password: password}, false).then(() => {
            APIService.authenticate('root', password).then(data => {
              saveToken(data);
              window.location.reload(false);
            }, (error) => console.error(error));
          }, error => console.error(error));
        } else {
          console.error(error);
        }
      });
    } else {
      APIService.post(URL_CREATE_REGISTRATION_REQUEST,
        {contact_email: username, requested_password: password, access_level: accessLevel}).then((data) => {
        console.log(data);
      }, (error) => console.error(error));
    }
  };

  return (
    <div data-testid="LoginPage">
      {PageHeading((isLoginForm) ? 'Login' : 'Submit Registration Request')}
      {(isLoginForm) ?
        LoginForm(setUsername, setPassword) :
        RegisterForm(accessLevels, setUsername, setPassword, setAccessLevel)
      }
      <Button color={"primary"} variant={"contained"} style={{marginTop: '2em', marginRight: '1em'}}
              onClick={onSubmit}>Submit</Button>
      <Button color={"default"} variant={"contained"}
              style={{marginTop: '2em'}}
              onClick={() => setIsLoginForm(!isLoginForm)}>
        {(isLoginForm) ? 'Register' : 'Return to Login'}
      </Button>
    </div>
  );
};
LoginPage.propTypes = {};

LoginPage.defaultProps = {};

export default LoginPage;
