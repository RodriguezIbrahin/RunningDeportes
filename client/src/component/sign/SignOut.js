import React from 'react';
import { ListItem, List , ListItemIcon } from '@material-ui/core';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as actionCreators from "../../redux/Actions";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

  signout: {

    position: 'fixed',
    bottom: theme.spacing(1),
    right: theme.spacing(0),

  },

}));

function SignOut({ SingIn, SignUp}) {

  const classes = useStyles();

  const handleClick = (event) => {

    localStorage.clear();
    SingIn(false);
    SignUp(false);

  };

  return (
    
    <List className={classes.signout} >

      <ListItem button onClick={handleClick} key={"change"}>

        <ListItemIcon >

          <PowerSettingsNewIcon size="large" style={{color: "#b71c1c"}}/>

        </ListItemIcon>

      </ListItem> 

    </List>
    
  )
 
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators(actionCreators, dispatch);

}

export default connect(null, mapDispatchToProps)(SignOut);