import React, { Component } from "react";
import { Link } from "react-router-dom";

import RegisterForm from "./register.form";

import {
    LOGIN_PAGE_ENDPOINT
} from "../constants";

class Register extends Component {
    
    render() {
        return (
        <div className="container" style={{marginTop: "2em", marginBottom: "2em"}}>

            <div style={{marginBottom: "2em"}}>
                <h2 className="font-weight-bold">BOILERPLATE</h2>
                <h4>Welcome to the party!</h4>
            </div>

            <div className="col-6 mx-auto border" style={{padding: "1em"}}>
                <RegisterForm />
                <span>Already have an account? <Link to={LOGIN_PAGE_ENDPOINT}>Log in</Link></span>
            </div>

        </div>
        );
    }
    
}

export default Register;