import React from "react";
import SignOut from "../component/sign/SignOut";
import Grid from '@material-ui/core/Grid'
import UserPanel from "../component/UsersPanel"
import AdminPanel from "../component/AdminPanel"

export default class Panel extends React.Component {

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

                <Grid container direction="row" justify="space-around" alignItems="center">

                    

                 { this.state.rol === "admin" ? <AdminPanel/> : <UserPanel/> }

                    

                </Grid>

                <SignOut/>
                
            </div>
        
        )
    }
}; 
