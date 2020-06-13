import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
    REGISTER_PAGE_ENDPOINT,
    LOGIN_PAGE_ENDPOINT
} from "../constants";

class Main extends Component {

    constructor(props) {
        super(props);
    
        this.renderMainInteractables = this.renderMainInteractables.bind(this);
        this.renderFeatureShowcase = this.renderFeatureShowcase.bind(this);
    }

    renderMainInteractables() {
        return (
        <div
            className="container border" 
            style={{ marginTop: "2em", marginBottom: "2em", padding: "1em"}}
        >
            <h4>Hello Anonymous user!</h4>
            <Link 
                to={LOGIN_PAGE_ENDPOINT}
                className="btn btn-primary"
                style={{marginRight: "1em", marginLeft: "1em"}}
            >
                Log In
            </Link>
            <Link 
                to={REGISTER_PAGE_ENDPOINT}
                className="btn btn-primary"
                style={{marginRight: "1em", marginLeft: "1em"}}
            >
                Register
            </Link>
        </div>
        );
    }

    renderFeatureShowcase() {
        return (
        <div className="row">
            <div className="col-sm-4">
                <h3>Authentication</h3>
                <p>
                    Don't hassle yourself with the boring stuff like authentication and whatnot.
                </p>
                <p>
                    This boilerplate comes with authentication and registration implemented 
                    using <b>passport</b>, <b>jsonwebtoken</b>, <b>bcryptjs</b>, and other pieces of middleware.
                </p>
            </div>
            <div className="col-sm-4">
                <h3>Developer Friendly</h3>
                <p>
                    Frontend and Backend code is seperated into two distinct subprojects, 
                    which helps to reduce the instances of figuring out if the code is related
                    to the backend or the frontend.
                </p>
                <p>
                    The project's structure helps to promote best practices and 
                    organization, so scaling up will be easy and maintainable.
                </p>
            </div>
            <div className="col-sm-4">
                <h3>Ease of Use</h3>
                <p>
                    This boilerplate is intended to come with all the creature comforts of an 
                    industry leading project (CI/CD and Docker images, etc.).
                </p>
                <p>
                    This helps keep the boilerplate as lean as possible to allow for 
                    a squeaky clean start to a new project.
                </p>
            </div>
        </div>
        );
    }

    render () {
        return (
        <div>
            <div className="jumbotron text-center">
                <h1>Welcome to yet another MERN stack boilerplate</h1>
                <p>
                    Create new and exciting MERN stack applications 
                    using this fantastic MERN stack boilerplate!
                </p>
            </div>

            { this.renderMainInteractables() }

            { this.renderFeatureShowcase() }

        </div>
        );
    }
    
}

export default Main;