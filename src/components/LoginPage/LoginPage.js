import React, {useEffect, useState} from 'react';
import useTheme from "@material-ui/core/styles/useTheme";

const LoginPage = () => {
  const theme = useTheme();


  return (
    <div data-testid="LoginPage">
      Login Test Component
    </div>
  );
};
LoginPage.propTypes = {};

LoginPage.defaultProps = {};

export default LoginPage;
