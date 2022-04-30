import React from "react";
import Typography from "@material-ui/core/Typography";
import useTheme from "@material-ui/core/styles/useTheme";


const PageHeading = (text, variant='h3') => (
  <Typography variant={variant} style={{color: useTheme().palette.primary, fontWeight: "bold", marginBottom: "0.5em"}}>
    {text}
  </Typography>
);


const UnauthorizedMessage = (page='current') => (
  <Typography>
    Your account is not authorized to access the {page} page. Only administrators can make changes to this information.
    If you believe you should have access to this page, please contact an administrator or supervisor to correct this.
  </Typography>
);


export { PageHeading, UnauthorizedMessage };
