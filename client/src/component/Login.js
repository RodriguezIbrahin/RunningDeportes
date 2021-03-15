import React from 'react';
import axios from "axios";

import {

  Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Typography, Container 

} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import {URL} from "../Api";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as actionCreators from "../redux/Actions";

import { AlertError, AlertSucess } from "./Alerts";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login(props) {
    const classes = useStyles();

    const [error, setError] = React.useState(false);

    const handleLogin = (event) => {
     
      event.preventDefault();

      axios.post(`${URL}/users/singin`,{ username: event.target.email.value, password: event.target.password.value })

      .then(response => {
        
        localStorage.setItem( "token", response.data.token );
        localStorage.setItem( "rol", response.data.rol );
        setError(false);
        props.SingUp(true);

      })
      .catch(error => setError(true));
    };

  return (
    <Container component="main" maxWidth="xs">

      <CssBaseline />

      <div className={classes.paper}>

        <Avatar className={classes.avatar}>

          <LockOutlinedIcon />

        </Avatar>

        <Typography component="h1" variant="h5">

          Sign in

        </Typography>

        <form className={classes.form} noValidate onSubmit={handleLogin}>

          <TextField

            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus

          />

          <TextField

            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"

          />

          <FormControlLabel

            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"

          />

          <Button

            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}

          >

            Sign In

          </Button>

          <Grid container>

            <Grid item xs>

              <Link href="#" variant="body2">

                Forgot password?

              </Link>

            </Grid>

            <Grid item>

              <Link href="#" variant="body2">

                {"Don't have an account? Sign Up"}

              </Link>

            </Grid>

            <Grid item xs={12}>

              <AlertError props={error} onClick={setError}/>

            </Grid>

          </Grid>

        </form>

      </div>
      
    </Container>

  );
  
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


export default connect(null, mapDispatchToProps)(Login);
