import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as actionCreators from "../redux/Actions";
import {List, Typography,Divider } from '@material-ui/core';
import ButtonSize from "./ButtonSize";

export class Sizes extends React.Component {

    componentDidMount(){
        this.props.GetSizes();
    }
    
    render(){

        return(
            
            <List>
                <Typography align="center" variant="body2" style={{ fontWeight: 'bold', fontSize: '1rem'}} gutterBottom>
                    Talles
                </Typography>
                <Divider/>
                {this.props.sizes.map((size) => ( <ButtonSize props={size.ar} />))}

            </List>
        
        )
    }
}; 
  
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

function mapStateToProps(state) {
    return {
        sizes: state.sizes
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Sizes);