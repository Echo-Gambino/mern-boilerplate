import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ProfileInfo from "./profile.info.form";

import icon from "../icon.png";

class ProfileSettings extends Component {

    constructor(props) {
        super(props);

        this.renderSideBar = this.renderSideBar.bind(this);
        this.renderMainForm = this.renderMainForm.bind(this);

    }

    renderSideBar() {
        return (
        <div className="card">
            <img className="card-img-top" src={icon} alt="Card image cap" />
            <div className="card-body">
                <div className="list-group list-group-flush">
                    <a 
                        href="#Profile" 
                        className="list-group-item list-group-item-action"
                    >
                        Profile
                    </a>
                    <a 
                        href="#Security" 
                        className="list-group-item list-group-item-action"
                    >
                        Security
                    </a>
                </div>
            </div>
        </div>
        );
    }

    renderMainForm() {
        return (
        <ProfileInfo />
        );
    }

    render() {
        return (
        <div>
            <div className="row">
                <div className="col">
                    { this.renderSideBar() }
                </div>
                <div className="col-8">
                    { this.renderMainForm() }
                </div>
            </div>
        </div>
        );
    }

}

export default ProfileSettings;