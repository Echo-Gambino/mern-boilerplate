import React, { Component } from "react";
import { Link } from "react-router-dom";

import RegisterForm from "./register.form";

class Register extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div className="container" style={{marginTop: "2em", marginBottom: "2em"}}>

            <div style={{marginBottom: "2em"}}>
                <h2 className="font-weight-bold">BOILERPLATE</h2>
                <h4>Welcome to the party!</h4>
            </div>

            <div className="col-6 mx-auto border" style={{padding: "1em"}}>
                <RegisterForm />
                <span>Already have an account? <b>Log in</b></span>
            </div>

        </div>
        );
    }
}

export default Register;