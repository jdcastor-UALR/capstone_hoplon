import React, {useEffect, useState} from 'react';
import useTheme from "@material-ui/core/styles/useTheme";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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

const RegisterForm = () => {
  return (
    <>
      <Grid container alignItems={"center"} justifyContent={"center"} spacing={2}>
        <Grid item xs={12}>
          <TextField required label={"Email"} type={"text"} />
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

  return (
    <div data-testid="LoginPage">
      <Typography variant="h3" style={{color: theme.palette.primary, fontWeight: "bold", marginBottom: "0.5em"}}>
        {(isLoginForm) ? 'Login' : 'Submit Registration Request'}
      </Typography>
      {(isLoginForm) ? LoginForm() : RegisterForm()}
      <Button color={"primary"} variant={"contained"} style={{marginTop: '2em', marginRight: '1em'}}>Submit</Button>
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
