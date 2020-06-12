import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

import { registerUser } from "../actions/auth.action";

import {
    MAIN_PAGE_ENDPOINT
} from "../constants";

class RegisterForm extends Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitSuccess = this.onSubmitSuccess.bind(this);

        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        // Update the state's error list if the next prop object is valid
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onSubmitSuccess(args) {
        this.props.history.push(MAIN_PAGE_ENDPOINT);
    }

    onChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        // onSubmitSuccess is the callback function if registerUser is successful.
        this.props.registerUser(
            newUser,
            this.onSubmitSuccess
        );
    }

    render() {
        const { errors } = this.state;

        return (
        <form noValidate onSubmit={ this.onSubmit } style={{textAlign:"left"}}>

            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    className={classnames(
                        "form-control",
                        { invalid: errors.name }
                    )}
                    onChange={ this.onChange }
                    value={ this.state.name }
                    error={ errors.name }
                    id="name"
                    type="text"
                />
                <p className="text-danger">{ errors.name }</p>
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    className={classnames(
                        "form-control",
                        { invalid: errors.email }
                    )}
                    onChange={ this.onChange }
                    value={ this.state.email }
                    error={ errors.email }
                    id="email"
                    type="email"
                />
                <p className="text-danger">{ errors.email }</p>
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                    className={classnames(
                        "form-control",
                        { invalid: errors.password }
                    )}
                    onChange={ this.onChange }
                    value={ this.state.password }
                    error={ errors.password }
                    id="password"
                    type="password"
                />
                <p className="text-danger">{ errors.password }</p>
            </div>

            <div className="form-group">
                <label htmlFor="password2">Confirm Password</label>
                <input
                    className={classnames(
                        "form-control",
                        { invalid: errors.password2 }
                    )}
                    onChange={ this.onChange }
                    value={ this.state.password2 }
                    error={ errors.password2 }
                    id="password2"
                    type="password"
                />
                <p className="text-danger">{ errors.password2 }</p>
            </div>

            <div className="form-group">
                <p className="small" style={{textAlign: "center"}}>
                    {"By clicking Agree & Register, \
                    you agree to the Boilerplate User Agreement, \
                    Privacy Policy, and Cookie Policy."}
                </p>
            </div>

            <div className="form-group">
                <button type="submit" className="btn btn-block btn-primary">
                    Agree and Register
                </button>
            </div>

        </form>
        );
    }

}

RegisterForm.propTypes = {
    registerUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors
});

const routeRegisterForm = withRouter(RegisterForm);

export default connect(
    mapStateToProps,
    { registerUser }
)(routeRegisterForm);