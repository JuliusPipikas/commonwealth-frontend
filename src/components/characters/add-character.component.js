import React, { Component } from "react";
import CharacterDataService from "../../services/character.service";

export default class AddCharacter extends Component {
  constructor(props) {
    super(props);
    this.onChangeCharacterName = this.onChangeCharacterName.bind(this);
    this.onChangeCharacterClass = this.onChangeCharacterClass.bind(this);
    this.onChangeLevel = this.onChangeLevel.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeStatArray = this.onChangeStatArray.bind(this);
    this.onChangeLocationId = this.onChangeLocationId.bind(this);
    this.onChangePlayerId = this.onChangePlayerId.bind(this);
    this.saveCharacter = this.saveCharacter.bind(this);
    this.newCharacter = this.newCharacter.bind(this);

    this.state = {
      character_id: null,
      character_name: "",
      character_class: "",
      level: null,
      status: "",
      stat_array: "",
      player_id: null,
      location_id: null,

      submitted: false
    };
  }

  onChangeCharacterName(e) {
    this.setState({
      character_name: e.target.value
    });
  }

  onChangeCharacterClass(e) {
    this.setState({
      character_class: e.target.value
    });
  }

  onChangeLevel(e) {
    this.setState({
      level: e.target.value
    });
  }

  onChangeStatus(e) {
    this.setState({
      status: e.target.value
    });
  }

  onChangeStatArray(e) {
    this.setState({
      stat_array: e.target.value
    });
  }

  onChangeLocationId(e) {
    this.setState({
      location_id: e.target.value
    });
  }

  onChangePlayerId(e) {
    this.setState({
      player_id: e.target.value
    });
  }

  saveCharacter() {
    var data = {
      character_name: this.state.character_name,
      character_class: this.state.character_class,
      level: this.state.level,
      status: this.state.status,
      stat_array: this.state.stat_array,
      location_id: this.state.location_id,
      player_id: this.state.player_id
    };

    CharacterDataService.create(data)
      .then(response => {
        this.setState({
          character_id: response.data.character_id,
          character_name: response.data.character_name,
          character_class: response.data.character_class,
          level: response.data.level,
          status: response.data.status,
          stat_array: response.data.stat_array,
          location_id: response.data.location_id,
          player_id: response.data.player_id,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newCharacter() {
    this.setState({
      character_id: null,
      character_name: "",
      character_class: "",
      level: null,
      status: "",
      stat_array: "",
      player_id: null,
      location_id: null,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newCharacter}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="character_name">Name</label>
              <input
                type="text"
                className="form-control"
                id="character_name"
                required
                value={this.state.character_name}
                onChange={this.onChangeCharacterName}
                name="character_name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="character_class">Class</label>
              <input
                type="text"
                className="form-control"
                id="character_class"
                required
                value={this.state.character_class}
                onChange={this.onChangeCharacterClass}
                name="character_class"
              />
            </div>

            <div className="form-group">
              <label htmlFor="level">Level</label>
              <input
                type="text"
                className="form-control"
                id="level"
                required
                value={this.state.level}
                onChange={this.onChangeLevel}
                name="level"
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <input
                type="text"
                className="form-control"
                id="status"
                required
                value={this.state.status}
                onChange={this.onChangeStatus}
                name="status"
              />
            </div>

            <div className="form-group">
              <label htmlFor="stat_array">Stat Array</label>
              <input
                type="text"
                className="form-control"
                id="stat_array"
                required
                value={this.state.stat_array}
                onChange={this.onChangeStatArray}
                name="stat_array"
              />
            </div>

            <div className="form-group">
              <label htmlFor="player_id">Player</label>
              <input
                type="text"
                className="form-control"
                id="player_id"
                required
                value={this.state.player_id}
                onChange={this.onChangePlayerId}
                name="player_id"
              />
            </div>

            <div className="form-group">
              <label htmlFor="location_id">Location</label>
              <input
                type="text"
                className="form-control"
                id="location_id"
                required
                value={this.state.location_id}
                onChange={this.onChangeLocationId}
                name="location_id"
              />
            </div>

            <button onClick={this.saveCharacter} className="btn btn-success">
              Submit
            </button>
          </div>)}
      </div>
    );
  }
}