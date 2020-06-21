import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

import DeleteProfile from "./profile.delete.subform";

import {
    MAIN_PAGE_ENDPOINT
} from "../constants";

class ProfileSecurity extends Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.onDelete = this.onDelete.bind(this);

        this.renderChangePassword = this.renderChangePassword.bind(this);
        this.renderChangePasswordForm = this.renderChangePasswordForm.bind(this);

        this.renderDeleteProfile = this.renderDeleteProfile.bind(this);
        this.renderDeleteProfileForm = this.renderDeleteProfileForm.bind(this);

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

        /*
        this.props.updatePassword(
            updatedPassword
        );
        */

    }

    onDelete() {
        this.props.history.push(MAIN_PAGE_ENDPOINT);
    }

    renderDeleteProfileForm() {
        const userName = this.props.auth.user.name;

        return (
            <DeleteProfile 
                onSuccess={this.onDelete} 
                confirmText={`delete ${userName}'s account`}
            />
        );
    }

    renderDeleteProfile() {
        return (
        <div>
            <h3 className="text-danger" style={{ textAlign: "left"}}>Delete Profile</h3>
            <hr style={{ marginTop: "0em" }} />
            { this.renderDeleteProfileForm() }
        </div>
        );
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

            <br />

            { this.renderDeleteProfile() }
        </div>
        );
    }

}

ProfileSecurity.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

const routeProfileSecurity = withRouter(ProfileSecurity);

export default connect(
    mapStateToProps,
    {  }
)(routeProfileSecurity);