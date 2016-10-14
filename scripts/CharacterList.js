import React from 'react';
import MarbelApi from './marvel_api';
import SearchBar from './SearchBar';


var CharacterList = React.createClass({
    getInitialState: function() {
        return({ characters: [],
               filterText: "",
               view: "",
               charId: ""})
    },
    handleSearchBar: function(text){
        this.setState({ filterText: text});
        MarbelApi.characters(text, function(chars){
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

export default CharacterList;
