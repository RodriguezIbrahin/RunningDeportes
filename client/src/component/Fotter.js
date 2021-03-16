import React from 'react';
import Divider from "@material-ui/core/Divider"
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    position: 'fixed',
    bottom: theme.spacing(2),
  },
 
}));



export default function Fotter() {

  const classes = useStyles();

  
  return (
    <div className={classes.footer}>
       <Divider />
          <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://api.whatsapp.com/send/?phone=%2B5491162067821&text&app_absent=0">
            Running Deportes
          </Link>{' '}
           {new Date().getFullYear()}
            {'.'}
        </Typography>
    </div>
    
  );
}