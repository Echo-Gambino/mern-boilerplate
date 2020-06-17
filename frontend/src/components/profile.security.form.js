import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

class ProfileSecurity extends Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.renderChangePassword = this.renderChangePassword.bind(this);
        this.renderChangePasswordForm = this.renderChangePasswordForm.bind(this);

        this.state = {
            oldPassword: "",
            newPassword: "",
            newPassword2: "",
            errors: {}
        };
    }

    onChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const updatedPassword = {
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword,
            newPassword2: this.state.newPassword2
        };

        console.log("Submitting:");
        console.log(updatedPassword);

    }

    renderChangePasswordForm() {
        const { errors } = this.state;

        return (
        <form noValidate onSubmit={ this.onSubmit } style={{textAlign: "left"}}>

            <div className="form-group">
                <label htmlFor="oldPassword">Old Password</label>
                <input
                    className={classnames(
                        "form-control",
                        { invalid: errors.oldPassword }
                    )}
                    onChange = { this.onChange }
                    value={ this.state.oldPassword }
                    error={ errors.oldPassword }
                    id="oldPassword"
                    type="password"
                />
            </div>

            <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                    className={classnames(
                        "form-control",
                        { invalid: errors.newPassword }
                    )}
                    onChange = { this.onChange }
                    value={ this.state.newPassword }
                    error={ errors.newPassword }
                    id="newPassword"
                    type="password"
                />
            </div>

            <div className="form-group">
                <label htmlFor="newPassword2">Confirm New Password</label>
                <input
                    className={classnames(
                        "form-control",
                        { invalid: errors.newPassword2 }
                    )}
                    onChange = { this.onChange }
                    value={ this.state.newPassword2 }
                    error={ errors.newPassword2 }
                    id="newPassword2"
                    type="password"
                />
            </div>

            <div className="form-group">
                <button type="submit" className="btn btn-outline-primary">
                    Change Password
                </button>
            </div>

        </form>
        );
    }

    renderChangePassword() {
        return (
        <div>
            <h3 style={{ textAlign: "left" }}>Change Password</h3>
            <hr style={{ marginTop: "0em" }} />
            { this.renderChangePasswordForm() }
        </div>
        );
    }

    render() {
        return (
        <div className="container" style={{paddingTop: "1em", paddingBottom: "1em"}}>
            { this.renderChangePassword() }
        </div>
        );
    }

}

ProfileSecurity.propTypes = {
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors
});

const routeProfileSecurity = withRouter(ProfileSecurity);

export default connect(
    mapStateToProps,
    {  }
)(routeProfileSecurity);