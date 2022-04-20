import React, {useEffect, useState} from 'react';
import useTheme from "@material-ui/core/styles/useTheme";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import {PageHeading} from "../Utility/text-styles";

const LoginForm = () => {
  return (
    <>
      <Grid container alignItems={"center"} justifyContent={"center"} spacing={2}>
        <Grid item xs={12}>
          <TextField required label={"Email"} type={"text"} />
        </Grid>
        <Grid item xs={12}>
          <TextField required label={"Password"} type={"password"} />
        </Grid>
      </Grid>
    </>
  );
};

const RegisterForm = (accessLevels) => {
  return (
    <>
      <Grid container alignItems={"center"} justifyContent={"center"} spacing={2}>
        <Grid item xs={12}>
          <TextField required label={"Email"} type={"text"} />
        </Grid>
        <Grid item xs={12}>
          <TextField select label={"Requested Access Level"} style={{minWidth: 200}}>
            {accessLevels.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField required label={"Requested Password"} type={"password"} />
        </Grid>
      </Grid>
    </>
  );
};

const LoginPage = () => {
  const theme = useTheme();

  const [isLoginForm, setIsLoginForm] = useState(true);
  const accessLevels = ['root', 'admin', 'assistant'];

  const onSubmit = () => {

  };

  return (
    <div data-testid="LoginPage">
      {PageHeading((isLoginForm) ? 'Login' : 'Submit Registration Request')}
      {(isLoginForm) ? LoginForm() : RegisterForm(accessLevels)}
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
