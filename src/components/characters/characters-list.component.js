import React, { Component } from "react";
import CharacterDataService from "../../services/character.service";
import { Link } from "react-router-dom";

export default class CharactersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchPlayerName = this.onChangeSearchPlayerName.bind(this);
    this.retrieveCharacters = this.retrieveCharacters.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCharacter = this.setActiveCharacter.bind(this);
    this.searchPlayerName = this.searchPlayerName.bind(this);

    this.state = {
      characters: [],
      currentCharacterl: null,
      currentIndex: -1,
      searchPlayerName: null
    };
  }

  componentDidMount() {
    this.retrieveCharacters();
  }

  onChangeSearchPlayerName(e) {
    const searchPlayerName = e.target.value;

    this.setState({
      searchPlayerName: searchPlayerName
    });
  }

  retrieveCharacters() {
    CharacterDataService.getAll()
      .then(response => {
        this.setState({
          characters: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveCharacters();
    this.setState({
      currentCharacter: null,
      currentIndex: -1
    });
  }

  setActiveCharacter(character, index) {
    this.setState({
      currentCharacter: character,
      currentIndex: index
    });
  }

  searchPlayerName() {
    CharacterDataService.findByPlayerName(this.state.searchPlayerName)
      .then(response => {
        this.setState({
          characters: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchPlayerName, characters, currentCharacter, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by PlayerName"
              value={searchPlayerName}
              onChange={this.onChangeSearchPlayerName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchPlayerName}
              >
                Search by Player
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Characters List</h4>

          <ul className="list-group">
            {characters &&
              characters.map((character, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCharacter(character, index)}
                  key={index}
                >
                  {character.character_name}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentCharacter ? (
            <div>
              <h4>Character</h4>
              <div>
                <label>
                  <strong>Character Name:</strong>
                </label>{" "}
                {currentCharacter.character_name}
              </div>

              <div>
                <label>
                  <strong>Player Name:</strong>
                </label>{" "}
                {currentCharacter.player_id}
              </div>

              <div>
                <label>
                  <strong>Character Class:</strong>
                </label>{" "}
                {currentCharacter.character_class}
              </div>

              <div>
                <label>
                  <strong>Level:</strong>
                </label>{" "}
                {currentCharacter.level}
              </div>

              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentCharacter.status}
              </div>

              <div>
                <label>
                  <strong>Stat Array:</strong>
                </label>{" "}
                {currentCharacter.stat_array}
              </div>

              <div>
                <label>
                  <strong>Location:</strong>
                </label>{" "}
                {currentCharacter.location_id}
              </div>

              <Link
                to={"/characters/" + currentCharacter.character_id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Character...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}