import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ProfileInfo from "./profile.info.form";
import ProfileSecurity from "./profile.security.form";

import icon from "../icon.png";

class ProfileSettings extends Component {

    constructor(props) {
        super(props);

        this.renderSideBar = this.renderSideBar.bind(this);
        this.renderMainForm = this.renderMainForm.bind(this);

        this.constants = {
            PROFILEINFO_VIEW: "profileInfo",
            PROFILESECURITY_VIEW: "profileSecurity"
        };
        Object.freeze(this.constants);

        this.state = {
            renderView: this.constants.PROFILEINFO_VIEW
        };
    }

    renderSideBar() {
        const {
            PROFILEINFO_VIEW,
            PROFILESECURITY_VIEW
        } = this.constants;

        const { renderView } = this.state;

        return (
        <div className="card">
            <img className="card-img-top" src={icon} alt="Card image cap" />
            <div className="card-body">
                <div className="list-group list-group-flush">
                    <button 
                        href="#Profile" 
                        className={
                            "list-group-item list-group-item-action" + 
                                ((renderView === PROFILEINFO_VIEW) ? " active" : " ")
                        }
                        onClick={() => {this.setState({renderView: PROFILEINFO_VIEW})}}
                    >
                        Profile
                    </button>
                    <button 
                        href="#Security" 
                        className={
                            "list-group-item list-group-item-action" + 
                                ((renderView === PROFILESECURITY_VIEW) ? " active" : " ")
                        }
                        onClick={() => {this.setState({renderView: PROFILESECURITY_VIEW})}}
                    >
                        Security
                    </button>
                </div>
            </div>
        </div>
        );
    }

    renderMainForm() {
        switch (this.state.renderView) {
            case this.constants.PROFILEINFO_VIEW:
                return <ProfileInfo />;
            case this.constants.PROFILESECURITY_VIEW:
                return <ProfileSecurity />;
            default:
                return <></>;
        }
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