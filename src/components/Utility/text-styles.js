import React from "react";
import Typography from "@material-ui/core/Typography";
import useTheme from "@material-ui/core/styles/useTheme";


const PageHeading = (text, variant='h3') => (
  <Typography variant={variant} style={{color: useTheme().palette.primary, fontWeight: "bold", marginBottom: "0.5em"}}>
    {text}
  </Typography>
);

export { PageHeading };
