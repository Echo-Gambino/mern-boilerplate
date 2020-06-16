import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import icon from "../icon.png";

class Profile extends Component {

    constructor(props) {
        super(props);

        this.renderProfileCard = this.renderProfileCard.bind(this);
        this.renderHighlightSection = this.renderHighlightSection.bind(this);
        this.renderPostsSection = this.renderPostsSection.bind(this);
    }

    renderProfileCard() {
        return (
        <div class="card" style={{width: "22em"}}>
            <img class="card-img-top" src={icon} alt="Card image cap" />
            <div class="card-body">
                <h3 class="card-title" style={{margin: "0"}}>Username</h3>
                <h6 class="card-title" style={{margin: "0"}}>test@email.com</h6>
                <br/>
                <p class="card-text">This is sample text, nothing to see here.</p>
                <a href="#" class="btn btn-primary">Dummy Follow</a>
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
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">Highlight</h3>
                    <p class="card-text">This is sample text, nothing to see here.</p>
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
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">Post</h3>
                    <p class="card-text">This is sample text, nothing to see here.</p>
                </div>
            </div>
        </div>
        );
    }

    render() {
        return (
        <div>
            <br/>

            <div class="row">
                <div class="col">
                    { this.renderProfileCard() }
                </div>
                <div class="col-8">
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
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

const routerProfile = withRouter(Profile);

export default connect(
    mapStateToProps,
    { }
)(routerProfile);