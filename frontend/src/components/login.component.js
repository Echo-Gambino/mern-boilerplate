import React, { Component } from "react";
import { Link } from "react-router-dom";

import LoginForm from "./login.form";

import {
    REGISTER_PAGE_ENDPOINT
} from "../constants";

class Login extends Component {

    render() {
        return (
        <div className="container" style={{marginTop: "2em", marginBottom: "2em"}}>

            <div style={{marginBottom: "2em"}}>
                <h2 className="font-weight-bold">BOILERPLATE</h2>
                <h4>Log in to get the full experience!</h4>
            </div>

            <div className="col-6 mx-auto border" style={{padding: "1em"}}>
                <LoginForm />
                <span>New to Boilerplate? <Link to={REGISTER_PAGE_ENDPOINT}>Register now</Link></span>
            </div>

        </div>
        );
    }
}

export default Login;