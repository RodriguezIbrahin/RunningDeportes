import React from 'react';
import axios from "axios";

import {URL} from "../../Api";
import { AlertError, AlertSucess } from "../Alerts";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as actionCreators from "../../redux/Actions";

import { 
    Avatar, Button, CssBaseline, TextField, Link, Grid, Typography, Container
} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';


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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp({SignUp}) {

    const classes = useStyles();

    const [error, setError] = React.useState(false);
    const [succes, setSucces] = React.useState(false);

    const handleSingUp = (event) => {

      SignUp(false);

    }

    const handleRegister = (event) => {

        event.preventDefault();

        if(!event.target.confirmPassword.value || !event.target.password.value || !event.target.firstName.value || !event.target.lastName.value || !event.target.email.value){
            
          setError(true);
          setSucces(false);

        }if(event.target.confirmPassword.value !== event.target.password.value){
           
          setError(true);
          setSucces(false);

        }
        else axios.post(`${URL}/users`,{ 

            name: event.target.firstName.value,
            last_name: event.target.lastName.value,
            email: event.target.email.value, 
            password: event.target.password.value,

        })

        .then(response => {

           setError(false);
           setSucces(true)
           setTimeout(function() {SignUp(false)}, 1500)
            
        })
        .catch(error => setError(true), setSucces(false));

    }

  return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />

        <div className={classes.paper}>

            <Avatar className={classes.avatar}>

                <LockOutlinedIcon />

            </Avatar>

            <Typography component="h1" variant="h5">

                Sign up
                
            </Typography>
            
            <form className={classes.form} noValidate onSubmit={handleRegister} >

                <Grid container spacing={2}>

                    <Grid item xs={12} sm={6}>

                        <TextField
                           autoComplete="firstName"
                           name="firstName"
                           variant="outlined"
                           required
                           fullWidth
                           id="firstName"
                           label="First Name"
                           autoFocus
                        />
                    
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="lastName"
                          autoComplete="lastName"
                        />

                    </Grid>
                    
                    <Grid item xs={12}>

                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                        />
                
                    </Grid> 

                    <Grid item xs={12}>

                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                        />

                    </Grid>

                    <Grid item xs={12}>

                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          name="confirmPassword"
                          label="confirm password"
                          type="password"
                          id="confirmPassword"
                          autoComplete="confirmPassword"
                        />

                    </Grid>


                </Grid>

                <Grid item xs={12}>

                    <AlertError props={error} onClick={setError}/>
                    <AlertSucess props={succes} onClick={setSucces}/>

                </Grid>

                <Button
                   type="submit"
                   fullWidth
                   variant="contained"
                   color="primary"
                   className={classes.submit}
                >
                    Sign Up

                </Button>

                <Grid container justify="flex-end">

                    <Grid item container direction="row" justify="center" alignItems="center">

                        <Link href="#" variant="body2"> 

                            <a onClick={handleSingUp}> {"Tienes una cuenta? Inicia Sesión"} </a>

                        </Link>

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
  
  
export default connect(null, mapDispatchToProps)(SignUp);
  