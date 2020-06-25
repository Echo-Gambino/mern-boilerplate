import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Collapse } from "react-bootstrap";

import { performSearch } from "../actions/search.action";

import {
    PROFILE_PAGE_ENDPOINT
} from "../constants";

class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);

        this.onSuggestionClick = this.onSuggestionClick.bind(this);

        this.search = this.search.bind(this);

        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.renderSuggestionList = this.renderSuggestionList.bind(this);
        this.renderSearchSuggestions = this.renderSearchSuggestions.bind(this);

        this.timerSearch = null;

        this.state = {
            searchTerm: "",
            searchResults: [],
            focused: false
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps) {
            this.setState({ searchResults: newProps.search.result });
        }
    }

    onFocus() {
        this.setState({ focused: true });
    }

    onBlur() {
        this.setState({ focused: false });
    }

    onChange(e) {
        this.setState({ [e.target.id]: e.target.value });

        if (!this.timerSearch) {
            clearTimeout(this.timerSearch);
        }

        this.timerSearch = setTimeout(this.search, 1000);
    }

    onSubmit(e) {
        e.preventDefault();
    
        if (!this.timerSearch) {
            clearTimeout(this.timerSearch);
        }

        this.search();
    }

    onSuggestionClick() {
        this.setState({ searchTerm: "" });
    }

    search() {
        const query = {
            searchTerm: this.state.searchTerm,
        };

        if (JSON.stringify(query) === JSON.stringify(this.props.search.query)) {
            return;
        }

        this.props.performSearch(
            query,
            ((args) => {console.log("search successful");})
        );

        this.timerSearch = null;
    }

    renderSuggestion(obj, i) {
        return (
        <Link 
            to={ PROFILE_PAGE_ENDPOINT + obj._id }
            onClick={ this.onSuggestionClick }
            className="list-group-item btn btn-outline-light text-body" 
            style={{ textAlign: "left" }}
        >
            <h5><b>{obj.name}</b></h5>
            { (obj.bio.trim()) ?
                <span style={{textOverflow: "ellipsis"}}>{obj.bio}</span> :
                <span><i>biography not available</i></span>
            }
        </Link>
        );
    }

    renderSuggestionList() {
        return (
        <>
        {
            this.state.searchResults.map((object, i) =>
                this.renderSuggestion(object, i)
            )
        }
        </>
        );
    }

    renderSearchSuggestions() {
        const enabled = (this.state.searchTerm !== "") && (this.state.searchResults.length !== 0) && this.state.focused;

        return (
        <Collapse in={enabled}
                style={{
                    marginTop: "0.5em", 
                    position: "absolute", 
                    zIndex: "1" 
                }}
        >
            <div 
                className="col-sm-4 list-group btn-group-vertical" 
                style={{ padding: "0.5em" }}
            >
                { this.renderSuggestionList() }
            </div>
        </Collapse>
        );
    }

    render() {
        return (
        <form noValidate onSubmit={ this.onSubmit }>
            <div>
                <input 
                    className="form-control"
                    placeholder="Search"
                    onChange={ this.onChange }
                    onFocus={ this.onFocus }
                    onBlur={ this.onBlur }
                    value={ this.state.searchTerm }
                    id="searchTerm"
                    type="text"
                />
                { this.renderSearchSuggestions() }
            </div>
        </form>
        );
    }

}

SearchBar.propTypes = {
    performSearch: PropTypes.func.isRequired,
    search: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    search: state.search
});

export default connect(
    mapStateToProps,
    { performSearch }
)(SearchBar);