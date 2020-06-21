import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Collapse } from "react-bootstrap";

import { performSearch } from "../actions/search.action";

class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);

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

    search() {
        const query = {
            searchTerm: this.state.searchTerm,
        };

        if (JSON.stringify(query) == JSON.stringify(this.props.search.query)) {
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
        <div className="list-group-item" style={{ textAlign: "left" }}>
            <h5>{obj.name}</h5>
            <span style={{textOverflow: "ellipsis"}}>{obj.bio}</span>
        </div>
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
                className="col-sm-4 list-group" 
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