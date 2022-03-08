import React from 'react';
import PropTypes from 'prop-types';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";

const MainNavbar = () => (
  <div data-testid="MainNavbar">
    <AppBar color={"primary"}>
      <Toolbar style={{justifyContent: "space-evenly"}}>
        <Typography variant="h2" style={{width: '75%', fontWeight: "bolder", fontStyle: "italic"}}>
          ADTAA
        </Typography>
        <Button color={"default"} variant={"contained"} component={Link} to={'/'}>Assistant</Button>
        <Button color={"default"} variant={"contained"} component={Link} to={'/setup'}>Setup</Button>
        <Button color={"default"} variant={"contained"} component={Link} to={'/login'}>Login</Button>
      </Toolbar>
    </AppBar>
  </div>
);

MainNavbar.propTypes = {};

MainNavbar.defaultProps = {};

export default MainNavbar;
