import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

class ProfileInfo extends Component {
    
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.renderProfileForm = this.renderProfileForm.bind(this);

        this.state = {
            name: "",
            bio: "",
            errors: {}
        }
    }

    onChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const updatedUserInfo = {
            name: this.state.name,
            bio: this.state.bio
        };

        console.log("Submitting:");
        console.log(updatedUserInfo);

        /*
        this.props.updateUser(
            updatedUserInfo,
            this.onSuccess
        );
        */

    }

    renderProfileForm() {
        const { errors } = this.state;

        return (
        <form noValidate onSubmit={ this.onSubmit } style={{textAlign: "left"}}>

            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    className={classnames(
                        "form-control",
                        { invalid: errors.name }
                    )}
                    onChange = { this.onChange }
                    value={ this.state.name }
                    error={ errors.name }
                    id="name"
                    type="text"
                />
            </div>

            <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                    className={classnames(
                        "form-control",
                        { invalid: errors.bio }
                    )}
                    style={{minHeight: "12em"}}
                    onChange = { this.onChange }
                    value={ this.state.bio }
                    error={ errors.bio }
                    id="bio"
                    type="text"
                />
            </div>

            <div className="form-group">
                <button type="submit" className="btn btn-outline-primary">
                    Update
                </button>
            </div>

        </form>
        );
    }

    render() {
        return (
        <div className="container" style={{paddingTop: "1em", paddingBottom: "1em"}}>
            <h3 style={{ textAlign: "left" }}>Public Profile</h3>
            <hr style={{ marginTop: "0em" }} />
            { this.renderProfileForm() }
        </div>
        );
    }

}

ProfileInfo.propTypes = {
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors
});

const routeProfileInfo = withRouter(ProfileInfo);

export default connect(
    mapStateToProps,
    { }
)(routeProfileInfo);