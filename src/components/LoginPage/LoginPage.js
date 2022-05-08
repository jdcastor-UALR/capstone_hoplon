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
import Typography from "@material-ui/core/Typography";
import {LoginFormMessages} from "../../constants";

const LoginPage = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const accessLevels = ['root', 'admin', 'assistant'];

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accessLevel, setAccessLevel] = useState();

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const LoginForm = () => {
    return (
      <>
        <Grid container alignItems={"center"} justifyContent={"center"} spacing={2}>
          <Grid item xs={12}>
            <TextField required label={"Email"} type={"text"}
                       value={username || ''} onChange={event => setUsername(event.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField required label={"Password"} type={"password"}
                       value={password || ''} onChange={event => setPassword(event.target.value)} />
          </Grid>
        </Grid>
      </>
    );
  };

  const RegisterForm = () => {
    return (
      <>
        <Grid container alignItems={"center"} justifyContent={"center"} spacing={2}>
          <Grid item xs={12}>
            <TextField required label={"Email"} type={"text"} value={username || ''}
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
            <TextField required label={"Requested Password"} type={"password"} value={password || ''}
                       onChange={e => setPassword(e.target.value)} />
          </Grid>
        </Grid>
      </>
    );
  };

  const handleError = (error) => {
    setUsername('');
    setPassword('');

    let message = 'ERROR: ';
    if (error.message.slice(0, 3) === '400') {
      message += (isLoginForm) ?  LoginFormMessages.wrongCredentials : LoginFormMessages.invalidRegistration;
    }
    if (error.message.slice(0, 3) === '403' && !isLoginForm) {
      message += 'A registration request for that email is already being processed!'
    }
    setErrorMessage(message);
  };

  const onSubmit = () => {
    setErrorMessage('');
    setSuccessMessage('');
    if (isLoginForm) {
      APIService.authenticate(username, password).then((data) => {
        saveToken(data);
        window.location.reload(false);
      }, (error) => {
        if (error.message.slice(0, 3) === '404') {
          // This means that this is first user
          APIService.put(URL_CHANGE_PASSWORD,
            {username: 'root', password: 'root', new_password: password}, false).then(() => {
            APIService.authenticate('root', password).then(data => {
              saveToken(data);
              window.location.reload(false);
            }, handleError);
          }, handleError);
        } else {
          handleError(error);
        }
      });
    } else {
      APIService.post(URL_CREATE_REGISTRATION_REQUEST,
        {contact_email: username, requested_password: password, access_level: accessLevel}).then((data) => {
        setSuccessMessage(LoginFormMessages.registerSuccess);
      }, handleError);
    }
    setUsername('');
    setPassword('');
  };

  const switchForm = () => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoginForm(!isLoginForm);
    setUsername('');
    setPassword('');
  };

  return (
    <div data-testid="LoginPage">
      {PageHeading((isLoginForm) ? 'Login' : 'Submit Registration Request')}
      <div style={{margin: '1rem'}}>
        {(errorMessage !== '') &&
          <Typography color={"error"} style={{fontWeight: 'bold'}}>{errorMessage}</Typography>
        }
        {(successMessage !== '') &&
          <Typography style={{fontWeight: 'bold'}}>{successMessage}</Typography>
        }
      </div>
      {(isLoginForm) ? LoginForm() : RegisterForm()}
      <Button color={"primary"} variant={"contained"} style={{marginTop: '2em', marginRight: '1em'}}
              onClick={onSubmit} disabled={password === 'root'}>Submit</Button>
      <Button color={"default"} variant={"contained"}
              style={{marginTop: '2em'}}
              onClick={switchForm}>
        {(isLoginForm) ? 'Register' : 'Return to Login'}
      </Button>
    </div>
  );
};
LoginPage.propTypes = {};

LoginPage.defaultProps = {};

export default LoginPage;
