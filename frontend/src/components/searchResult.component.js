import React, { Component, Profiler } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { performSearch } from '../actions/search.action';

import Result from './result.card';

import {
    PROFILE_PAGE_ENDPOINT
} from "../constants";

class SearchResult extends Component {

    constructor(props) {
        super(props);

        this.search = this.search.bind(this);

        this.state = {
            searchResults: []
        };
    }

    componentDidMount() {
        this.search();
    }

    componentWillReceiveProps(newProps) {
        if (!newProps) { return; }

        if (JSON.stringify(newProps.search.result) !== JSON.stringify(this.state.searchResults)) {
            this.setState({ searchResults: newProps.search.result });
        }
    }

    search() {
        const searchTerm = this.props.match.params.searchTerm;

        const query = {
            searchTerm: searchTerm
        };

        if (JSON.stringify(query) === JSON.stringify(this.props.search.query)) {
            if (JSON.stringify(this.state.searchResults) !== JSON.stringify(this.props.search.result)) {
                this.setState({ searchResults: this.props.search.result });
            }

            return;
        }

        try {
            this.props.performSearch(
                query,
                ((args) => {})
            );
        } catch (e) {
            console.log('Error occurred on search');
        }
    }

    render() {
        const searchTerm = this.props.match.params.searchTerm;
        const searchResults = this.state.searchResults;

        return (
        <div>
            <h1 style={{textAlign: "left"}}>Results for <b>'{searchTerm}'</b></h1>
            
            <hr />

            <div className="container">
                {searchResults.map((object, i) => { 
                    return (
                        <Result 
                            to={PROFILE_PAGE_ENDPOINT + object._id} 
                            icon={object.icon} 
                            title={object.name} 
                            body={object.bio} 
                        />
                    ); 
                })}
            </div>

        </div>
        );
    }

}

SearchResult.propTypes = {
    performSearch: PropTypes.func.isRequired,
    search: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    search: state.search
});

export default connect(
    mapStateToProps,
    { performSearch }
)(SearchResult);