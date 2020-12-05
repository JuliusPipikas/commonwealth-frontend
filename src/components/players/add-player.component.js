import React, { Component } from "react";
import PlayerDataService from "../../services/player.service";

export default class AddPlayer extends Component {
  constructor(props) {
    super(props);
    this.onChangePlayerName = this.onChangePlayerName.bind(this);
    this.onChangePlayerRank = this.onChangePlayerRank.bind(this);
    this.onChangeDiscordId = this.onChangeDiscordId.bind(this);
    this.onChangeUserId = this.onChangeUserId.bind(this);
    this.savePlayer = this.savePlayer.bind(this);
    this.newPlayer = this.newPlayer.bind(this);

    this.state = {
      player_id: null,
      player_rank: "",
      player_name: "",
      discord_id: "",
      user_id: null,

      submitted: false
    };
  }

  onChangePlayerName(e) {
    this.setState({
      player_name: e.target.value
    });
  }

  onChangePlayerRank(e) {
    this.setState({
      player_rank: e.target.value
    });
  }

  onChangeDiscordId(e) {
    this.setState({
      discord_id: e.target.value
    });
  }

  onChangeUserId(e) {
    this.setState({
      user_id: e.target.value
    });
  }

  savePlayer() {
    var data = {
      player_rank: this.state.player_rank,
      player_name: this.state.player_name,
      discord_id: this.state.discord_id,
      user_id: this.state.user_id
    };

    PlayerDataService.create(data)
      .then(response => {
        this.setState({
          player_id: response.data.player_id,
          player_rank: response.data.player_rank,
          player_name: response.data.player_name,
          discord_id: response.data.discord_id,
          user_id: response.data.user_id,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newPlayer() {
    this.setState({
      player_id: null,
      player_rank: "",
      player_name: "",
      discord_id: "",
      user_id: null,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newPlayer}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="player_name">Name</label>
              <input
                type="text"
                className="form-control"
                id="player_name"
                required
                value={this.state.player_name}
                onChange={this.onChangePlayerName}
                name="player_name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="player_rank">Rank</label>
              <input
                type="text"
                className="form-control"
                id="player_rank"
                required
                value={this.state.player_rank}
                onChange={this.onChangePlayerRank}
                name="player_rank"
              />
            </div>

            <div className="form-group">
              <label htmlFor="discord_id">Discord ID</label>
              <input
                type="text"
                className="form-control"
                id="discord_id"
                required
                value={this.state.discord_id}
                onChange={this.onChangeDiscordId}
                name="discord_id"
              />
            </div>

            <div className="form-group">
              <label htmlFor="user_id">User</label>
              <input
                type="text"
                className="form-control"
                id="user_id"
                required
                value={this.state.user_id}
                onChange={this.onChangeUserId}
                name="user_id"
              />
            </div>

            <button onClick={this.savePlayer} className="btn btn-success">
              Submit
            </button>
          </div>)}
      </div>
    );
  }
}