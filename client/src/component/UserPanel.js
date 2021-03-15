import React from "react";
import CrudPanel from "../crud/CrudPanel";
import SignOut from "./SignOut";
import { Grid } from '@material-ui/core';

export default class UserPanel extends React.Component {

    constructor() {
        super();
        this.state = { rol: "" };
    }

    componentDidMount(){

        this.setState({ rol: localStorage.getItem("rol") });
    }
    
    render(){

        return(
            
            <div>
                { this.state.rol == "admin" ? <CrudPanel/> : <div>User Panel</div> }
                <SignOut/>
            </div>
        
        )
    }
}; 
