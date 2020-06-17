import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getUser } from "../actions/profile.action";

import icon from "../icon.png";

import {
    PROFILESETTINGS_PAGE_ENDPOINT,
} from "../constants";

class Profile extends Component {

    constructor(props) {
        super(props);

        this.renderProfileCard = this.renderProfileCard.bind(this);
        this.renderHighlightSection = this.renderHighlightSection.bind(this);
        this.renderPostsSection = this.renderPostsSection.bind(this);

        this.testCallBack = this.testCallBack.bind(this);

        this.state = {
            name: "",
            email: "",
            bio: ""
        };
    }

    componentDidMount() {
        const auth = this.props.auth;
        this.props.getUser(auth.user.id, this.testCallBack);
    }

    testCallBack(args) {
        console.log(args);

        this.setState({
            name: (args.data.name) ? args.data.name : "Unknown",
            email: (args.data.email) ? args.data.email : "unknown@email.com",
            bio: (args.data.bio) ? args.data.bio : "Placeholder"
        });
    }

    renderProfileCard() {
        const auth = this.props.auth;
    
        const { name, email, bio } = this.state;

        return (
        <div className="card">
            <img className="card-img-top" src={icon} alt="Card image cap" />
            <div className="card-body">
                <h3 className="card-title" style={{margin: "0"}}>{name}</h3>
                <h6 className="card-title" style={{margin: "0"}}>{email}</h6>
                <br/>
                <p className="card-text" style={{textAlign: "left"}}>{bio}</p>
                <Link to={PROFILESETTINGS_PAGE_ENDPOINT + auth.user.id} className="btn btn-primary btn-block">Settings</Link>
            </div>
        </div>
        );
    }

    renderHighlightSection() {
        return (
        <div>
            <h1 className="jumbotron" 
                style={{paddingTop: "0.5em", paddingBottom: "0.5em"}}
            >
                Highlights
            </h1>
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">Highlight</h3>
                    <p className="card-text">This is sample text, nothing to see here.</p>
                </div>
            </div>
        </div>
        );
    }

    renderPostsSection() {
        return (
        <div>
            <h1 className="jumbotron" 
                style={{paddingTop: "0.5em", paddingBottom: "0.5em"}}
            >
                Posts
            </h1>
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">Post</h3>
                    <p className="card-text">This is sample text, nothing to see here.</p>
                </div>
            </div>
        </div>
        );
    }

    render() {
        return (
        <div>
            <div className="row">
                <div className="col">
                    { this.renderProfileCard() }
                </div>
                <div className="col-8">
                    { this.renderHighlightSection() }
                </div>
            </div>

            <br/>

            { this.renderPostsSection() }

        </div>
        );
    }

}

Profile.propTypes = {
    getUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

const routerProfile = withRouter(Profile);

export default connect(
    mapStateToProps,
    { getUser }
)(routerProfile);