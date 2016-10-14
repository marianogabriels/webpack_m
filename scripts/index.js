import React from 'react';
import {render} from 'react-dom';
import App from './App';
import CharacterList from './CharacterList';
import ComicList from './ComicList';
import MarbelApi from './marvel_api';
import SearchBar from './SearchBar';

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


ReactDOM.render(<CharacterList />, document.getElementById("main"));
ReactDOM.render(<ComicList />, document.getElementById("comics"));
ReactDOM.render(navbarInstance, document.getElementById("navbar"));
