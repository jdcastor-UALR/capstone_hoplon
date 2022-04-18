import React, {useEffect, useState} from 'react';
import useTheme from "@material-ui/core/styles/useTheme";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const LoginPage = () => {
  const theme = useTheme();


  return (
    <div data-testid="LoginPage">
      <Typography variant="h3" style={{color: theme.palette.primary, fontWeight: "bold", marginBottom: "0.5em"}}>
        Login
      </Typography>
      <Grid container alignItems={"center"} justifyContent={"center"} spacing={2}>
        <Grid item xs={12}>
          <TextField required label={"Email"} type={"text"} />
        </Grid>
        <Grid item xs={12}>
          <TextField required label={"Password"} type={"password"} />
        </Grid>
      </Grid>
      <Button color={"primary"} variant={"contained"} style={{marginTop: '2em'}}>Submit</Button>
    </div>
  );
};
LoginPage.propTypes = {};

LoginPage.defaultProps = {};

export default LoginPage;
