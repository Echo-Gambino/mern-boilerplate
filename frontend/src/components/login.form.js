import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

import { loginUser } from "../actions/auth.action";

class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        // console.log("Submit:");
        // console.log(userData);

        this.props.loginUser(
            userData
        );
    }

    render() {
        const { errors } = this.state;

        return (
        <form noValidate onSubmit={ this.onSubmit } style={{textAlign:"left"}}>

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
                <p className="text-danger">{ errors.password }{ errors.general }</p>
            </div>

            <div className="form-group">
                <button type="submit" className="btn btn-block btn-primary">
                    Log In
                </button>
            </div>


        </form>
        );
    }

}

LoginForm.propTypes = {
    loginUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors
});

const routerLoginForm = withRouter(LoginForm);

export default connect(
    mapStateToProps,
    { loginUser }
)(routerLoginForm);