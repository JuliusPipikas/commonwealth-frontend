import React, { Component } from "react";
import PlayerDataService from "../../services/player.service";

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.onChangePlayerName = this.onChangePlayerName.bind(this);
    this.onChangePlayerRank = this.onChangePlayerRank.bind(this);
    this.onChangeDiscordId = this.onChangeDiscordId.bind(this);
    this.onChangeUserId = this.onChangeUserId.bind(this);
    this.getPlayer = this.getPlayer.bind(this);
    this.updatePlayer = this.updatePlayer.bind(this);
    this.deletePlayer = this.deletePlayer.bind(this);

    this.state = {
      currentPlayer: {
      player_id: null,
      player_rank: "",
      player_name: "",
      discord_id: "",
      user_id: null,

      submitted: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getPlayer(this.props.match.params.player_id);
  }

  onChangePlayerName(e) {
    const player_name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentPlayer: {
          ...prevState.currentPlayer,
          player_name: player_name
        }
      };
    });
  }

  onChangePlayerRank(e) {
    const player_rank = e.target.value;

    this.setState(function(prevState) {
      return {
        currentPlayer: {
          ...prevState.currentPlayer,
          player_rank: player_rank
        }
      };
    });
  }

  onChangeDiscordId(e) {
    const discord_id = e.target.value;

    this.setState(function(prevState) {
      return {
        currentPlayer: {
          ...prevState.currentPlayer,
          discord_id: discord_id
        }
      };
    });
  }

  onChangeUserId(e) {
    const user_id = e.target.value;

    this.setState(function(prevState) {
      return {
        currentPlayer: {
          ...prevState.currentPlayer,
          user_id: user_id
        }
      };
    });
  }

  getPlayer(player_id) {
    PlayerDataService.get(player_id)
      .then(response => {
        this.setState({
          currentPlayer: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePlayer() {
    PlayerDataService.update(
      this.state.currentPlayer.player_id,
      this.state.currentPlayer
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Player was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deletePlayer() {    
    PlayerDataService.delete(this.state.currentPlayer.player_id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/Players')
      })
      .catch(e => {
        console.log(e);

      });
  }

  render() {
    const { currentPlayer } = this.state;

    return (
      <div>
        {currentPlayer ? (
          <div className="edit-form">
            <h4>Player</h4>
            <form>
              <div className="form-group">
                <label htmlFor="player_name">Player Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="player_name"
                  value={currentPlayer.player_name}
                  onChange={this.onChangePlayerName}
                />
              </div>

              <div className="form-group">
                <label htmlFor="player_rank">Player Rank</label>
                <input
                  type="text"
                  className="form-control"
                  id="player_rank"
                  value={currentPlayer.player_rank}
                  onChange={this.onChangePlayerRank}
                />
              </div>

              <div className="form-group">
                <label htmlFor="discord_id">Discord ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="discord_id"
                  value={currentPlayer.discord_id}
                  onChange={this.onChangeDiscordId}
                />
              </div>

              <div className="form-group">
                <label htmlFor="user_id">User</label>
                <input
                  type="text"
                  className="form-control"
                  id="user_id"
                  value={currentPlayer.user_id}
                  onChange={this.onChangeUserId}
                />
              </div>

            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deletePlayer}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updatePlayer}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Player...</p>
          </div>
        )}
      </div>
    );
  }
}