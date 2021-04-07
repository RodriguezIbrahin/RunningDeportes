import React from 'react';
import { connect } from "react-redux";
import SingIn from "../component/sign/SignIn";
import SignUp from "../component/sign/SignUp";
import Panel from "./Panel";

function Sign({ signup, singin }) {

  
  return (
    <div>
        {!signup && !singin ? <SingIn/> : signup && !singin ? <SignUp/>: singin ? <Panel/> : <Panel/>}
    </div>
    
  );
}

function mapStateToProps(state) {

    return {
      signup: state.signup,
      singin: state.singin
    }
}
  
export default connect(mapStateToProps, null)(Sign);