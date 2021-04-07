import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as actionCreators from "../redux/Actions";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function ButtonSize({props, GetProductsSize, GetIdProduct}) {

  const handleClick = (event) => {
    
    GetProductsSize(props);

    GetIdProduct(0);   

  };

  return (

    <ListItem button onClick={handleClick} >

      <ListItemText primary={props} text />

    </ListItem>

   
  );
}


function mapDispatchToProps(dispatch) {

  return bindActionCreators(actionCreators, dispatch);
}

  
export default connect(null, mapDispatchToProps)(ButtonSize);
