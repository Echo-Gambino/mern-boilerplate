import React, { Component } from "react";

import icon from "../icon.png";

class Profile extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div>
            <br/>
            <div class="row">
                <div class="col">
                    <div class="card" style={{width:"22em"}}>
                        <img class="card-img-top" src={icon} alt="Card image cap" />
                        <div class="card-body">
                            <h3 class="card-title" style={{margin: "0"}}>Username</h3>
                            <h6 class="card-title" style={{margin: "0"}}>test@email.com</h6>
                            <br/>
                            <p class="card-text">This is sample text, nothing to see here.</p>
                            <a href="#" class="btn btn-primary">Dummy Follow</a>
                        </div>
                    </div>
                </div>
                <div class="col-8">
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
                </div>
            </div>

            <br/>

            <div>
                <h1 className="jumbotron" 
                    style={{paddingTop: "0.5em", paddingBottom: "0.5em"}}
                >
                    Posts
                </h1>
                <div class="card">
                    <div class="card-body">
                        <h3 class="card-title">Highlight</h3>
                        <p class="card-text">This is sample text, nothing to see here.</p>
                    </div>
                </div>
            </div>

        </div>
        );
    }

}

export default Profile;