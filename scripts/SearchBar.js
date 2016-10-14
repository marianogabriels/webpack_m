import React from 'react';

var SearchBar = React.createClass({
    getInitialState: function() {
        return({ content: "" });
    },
    handleInput: function(e){
        this.props.onUserInput(e.target.value);
    },
    render: function() {
        return(<div><input type="text" value={this.props.filterText} onChange={this.handleInput} /></div>)
    }
});
export default SearchBar;
