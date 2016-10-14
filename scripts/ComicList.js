import React from 'react';
import MarbelApi from './marvel_api';
import SearchBar from './SearchBar';
import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';

let ComicList = React.createClass({
    getInitialState: function(){
        return({ comics: [],
               filterText: ""});
    },
    handleSearchBar: function(text) {
        this.setState({filterText: text});
        this.apiCall(text, function(coms){
            let comsArray = coms["data"]["results"];
            this.setState({ comics: comsArray });
        }.bind(this))
    },
    render: function() {
        let comicRows = this.state.comics.map((comic) => {
            return (
                <div><Col xs={6} md={4}>
                <Thumbnail src={ comic.thumbnail.path+".jpg" } alt="242x200">
                <h3>{ comic.title }</h3>
                <p>{ comic.description }</p>
                <p>
                <Button bsStyle="primary">View</Button>
                <Button bsStyle="default">Add to cart</Button>
                </p>
                </Thumbnail>
                </Col></div>)});
            //<li><ComicRow key={ comic.id } name={ comic.title } description={ comic.description } picture={ comic.thumbnail.path }/></li>)
            return(
                <div>
                <Grid>
                <Row>
                { comicRows }
                </Row>
                </Grid>
                <p>Look for a comic: <SearchBar onUserInput={this.handleSearchBar} filterText={this.state.filterText}/></p>
                </div>
            )
    },
    apiCall: function(query, fn) {
        let xhr = new XMLHttpRequest();
        console.log(query);
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var chars = JSON.parse(this.responseText);
                return fn(chars)
            }
        };
        xhr.open("GET", "http://gateway.marvel.com:80/v1/public/comics?ts=1&titleStartsWith=" + query + "&limit=100&apikey=039eb48267ed197802f5e77e78d0f3f5&hash=e90ab34566660a82686c9d188a356fbd");
        xhr.send();
    }
});

let ComicRow = React.createClass({
    render: function(){
        return( <div>
               <p>Comic: { this.props.name }</p>
               <img src={ this.props.picture+".jpg"} width="300" height="300"/>
               <p>{ this.props.description }</p>
               </div>)
    }
});

export default ComicList;
