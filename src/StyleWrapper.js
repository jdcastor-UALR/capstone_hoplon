import {createTheme, responsiveFontSizes} from "@material-ui/core/styles";
import React, {Component} from "react";
import {MuiThemeProvider} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

const muiTheme = responsiveFontSizes(createTheme({
  palette: {
    primary: {
      main: '#800000'
    }
  }
}));

export const styleWrapper = Component => props => {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Component {...props} />
    </MuiThemeProvider>
  );
};
