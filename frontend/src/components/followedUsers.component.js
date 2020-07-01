import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getFollowingInfo } from '../actions/follow.action';
import { getUser } from '../actions/profile.action';

import Result from './result.card';

import {
    PROFILE_PAGE_ENDPOINT,
} from "../constants";

class FollowedUsers extends Component {

    constructor(props) {
        super(props);

        this.search = this.search.bind(this);
        this.onGetIdList = this.onGetIdList.bind(this);

        this.renderUsersList = this.renderUsersList.bind(this);
        this.renderUserItem = this.renderUserItem.bind(this);

        this.state = {
            users: []
        };
    }

    componentDidMount() {
        const userId = this.props.match.params.id;
        this.search(userId);
    }

    search(userId) {
        this.props.getFollowingInfo(userId, this.onGetIdList);
    }

    onGetIdList(data) {
        let users = (data && data.users) ? data.users : [];
        
        let pUserObjects = [];

        if (users.length !== 0) {
            for (let i = 0; i < users.length; i++) {
                let id = users[i];
                let p = new Promise((resolve) => {
                    this.props.getUser(id, (u) => {
                        resolve(u);
                    });
                });
                pUserObjects.push(p);
            }
        }

        Promise.all(pUserObjects)
            .then(results => {
                let userObjects = results.filter(function (el) {
                    return el != null;
                })
                
                this.setState({ users: userObjects });
            })
            .catch(error => {
                console.log(error);
            });
    }

    renderUserItem(userId) {
        if (!userId) {
            return (<></>);
        }



    }

    renderUsersList(users) {
        users = (users) ? users : [];

        return (
        <>{
            users.map((usr, i) => 
            <Result
                to={PROFILE_PAGE_ENDPOINT + usr._id}
                icon={usr.icon}
                title={usr.name}
                body={usr.bio}
            />)
        }</>
        );
    }

    render() {
        const searchTerm = this.props.match.params.searchTerm;
        const searchResults = this.state.searchResults;

        const users = (Array.isArray(this.state.users)) ? this.state.users : [];
        const count = users.length;

        console.log(users);

        return (
        <div>
            <h1 style={{textAlign: "left"}}>Followed Users.</h1>

            <hr />

            <div className="container">
                { 
                    (count > 0) ? 
                        this.renderUsersList(users)
                        : 
                        (<i>Hm, seems empty here. Follow other users to have them show up here!</i>) 
                }
            </div>
        </div>
        );
    }

}

FollowedUsers.propTypes = {
    getFollowingInfo: PropTypes.func.isRequired
}

const mapStateToProps = state => ({});

const routerFollowedUsers = withRouter(FollowedUsers);

export default connect(
    mapStateToProps,
    { 
        getFollowingInfo,
        getUser 
    }
)(routerFollowedUsers);