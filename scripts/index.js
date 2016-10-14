import React from 'react';
import {render} from 'react-dom';
import App from './App';

function hitAPI (query,fn){
    let xhr = new XMLHttpRequest();
    console.log(query);
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var chars = JSON.parse(this.responseText);
            return fn(chars)
            //chars["data"]["results"]
        }
    };
    xhr.open("GET", "http://gateway.marvel.com:80/v1/public/characters?ts=1&nameStartsWith=" + query + "&limit=100&apikey=039eb48267ed197802f5e77e78d0f3f5&hash=e90ab34566660a82686c9d188a356fbd");
    xhr.send();
};
/////////////////////////////////////////////////
var Navbar = ReactBootstrap.Navbar,
    Nav = ReactBootstrap.Nav,
    NavItem = ReactBootstrap.NavItem,
    DropdownButton = ReactBootstrap.DropdownButton,
    MenuItem = ReactBootstrap.MenuItem,
    NavDropdown = ReactBootstrap.NavDropdown,
    Grid = ReactBootstrap.Grid,
    Row = ReactBootstrap.Row,
    Col = ReactBootstrap.Col,
    Thumbnail = ReactBootstrap.Thumbnail,
    Button = ReactBootstrap.Button;

const navbarInstance = (
    <Navbar inverse>
    <Navbar.Header>
    <Navbar.Brand>
    <a href="#">Marvel Catalogue</a>
    </Navbar.Brand>
    <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
    <Nav>
    <NavItem eventKey={1} href="#">Characters</NavItem>
    <NavItem eventKey={2} href="#">Comics</NavItem>
    <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
    <MenuItem eventKey={3.1}>Action</MenuItem>
    <MenuItem eventKey={3.2}>Another action</MenuItem>
    <MenuItem eventKey={3.3}>Something else here</MenuItem>
    <MenuItem divider />
    <MenuItem eventKey={3.3}>Separated link</MenuItem>
    </NavDropdown>
    </Nav>
    <Nav pullRight>
    <NavItem eventKey={1} href="#">Link Right</NavItem>
    <NavItem eventKey={2} href="#">Link Right</NavItem>
    </Nav>
    </Navbar.Collapse>
    </Navbar>
);

let CharacterList = React.createClass({
    getInitialState: function() {
        return({ characters: [],
               filterText: "",
               view: "",
               charId: ""})
    },
    handleSearchBar: function(text){
        this.setState({ filterText: text});
        hitAPI(text, function(chars){
            let charsArray = chars["data"]["results"];
            this.setState({ characters: charsArray });
        }.bind(this))
    },
    handleEnterDetailedView: function(e) {
        this.setState({view: "detail",
                      charId: e.target.value});
    },
    renderDetail: function() {
        let charId = this.state.charId;
        let char = this.state.characters.find(function(character) {
            return character.id == charId;
        });
        console.log(char);
        return(
            <div><CharacterDetail name={ char.name } description={ char.description } picture={ char.thumbnail.path } comics={ char.comics.items } stories={ char.stories.items } events={ char.events.items } series={ char.series.items }/></div>
        )
    },
    renderList: function(){
        let characterRows = [];
        //let searchCharacterInput = <input className='new-item' type="text" onChange={this.handleSearchBar}/>;
        this.state.characters.forEach((character, index) => {
            characterRows.push(<li><p><CharacterRow name={ character.name } picture={ character.thumbnail.path+".jpg" } key={ character.id } id={ character.id } />
                               <button className="btn" onClick={this.handleEnterDetailedView} value={ character.id }>View</button></p>
                               </li>);
        })
        return(<div>
               Look for a superhero: <SearchBar onUserInput={this.handleSearchBar} filterText={this.state.filterText}/>
               <ul className="three-columns">{ characterRows }</ul>
               </div>)
    },
    render: function(){
        if (this.state.view === "detail")
            return this.renderDetail();
        else
            return this.renderList();
    }
});

let CharacterRow = React.createClass({
    render: function() {
        return(
            <div>
            <div>Name: { this.props.name }</div>
            <div> <img src={ this.props.picture } width="300" height="300"/></div>
            </div>
        )
    }
});

let CharacterDetail = React.createClass({
    // getInitialState: function () {
    //     return()
    // },
    render: function(){
        let comics = this.props.comics.map(comic => {
            return <li>{ comic.name }</li>
        })
        return(
            <div>
            <h3>{ this.props.name }</h3>
            <img src={ this.props.picture+".jpg"} width="300" height="300"/>
            <p>{ this.props.description }</p>
            <p>{ comics }</p>
            </div>
        )
    }
});

let SearchBar = React.createClass({
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
///////////////////////////////////////// COMIC LIST
// const thumbnailInstance = (
// <Grid>
// <Row>
// <Col xs={6} md={4}>
//   <Thumbnail src="/assets/thumbnaildiv.png" alt="242x200">
//     <h3>{comicRows[key].name}</h3>
//     <p>Description</p>
//     <p>
//       <Button bsStyle="primary">Button</Button>&nbsp;
//       <Button bsStyle="default">Button</Button>
//     </p>
//   </Thumbnail>
// </Col>
// <Col xs={6} md={4}>
//   <Thumbnail src="/assets/thumbnaildiv.png" alt="242x200">
//     <h3>Thumbnail label</h3>
//     <p>Description</p>
//     <p>
//       <Button bsStyle="primary">Button</Button>&nbsp;
//       <Button bsStyle="default">Button</Button>
//     </p>
//   </Thumbnail>
// </Col>
// <Col xs={6} md={4}>
//   <Thumbnail src="/assets/thumbnaildiv.png" alt="242x200">
//     <h3>Thumbnail label</h3>
//     <p>Description</p>
//     <p>
//       <Button bsStyle="primary">Button</Button>&nbsp;
//       <Button bsStyle="default">Button</Button>
//     </p>
//   </Thumbnail>
// </Col>
// </Row>
// </Grid>
// );

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

ReactDOM.render(<CharacterList />, document.getElementById("main"));
ReactDOM.render(<ComicList />, document.getElementById("comics"));
ReactDOM.render(navbarInstance, document.getElementById("navbar"));
