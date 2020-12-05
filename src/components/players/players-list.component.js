import React, { Component } from "react";
import PlayerDataService from "../../services/player.service";
import { Link } from "react-router-dom";

export default class PlayersList extends Component {
  constructor(props) {
    super(props);
    this.retrievePlayers = this.retrievePlayers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivePlayer = this.setActivePlayer.bind(this);

    this.state = {
      players: [],
      currentPlayerl: null,
      currentIndex: -1
    };
  }

  componentDidMount() {
    this.retrievePlayers();
  }

  retrievePlayers() {
    PlayerDataService.getAll()
      .then(response => {
        this.setState({
          players: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievePlayers();
    this.setState({
      currentPlayer: null,
      currentIndex: -1
    });
  }

  setActivePlayer(player, index) {
    this.setState({
      currentPlayer: player,
      currentIndex: index
    });
  }

  render() {
    const { players, currentPlayer, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
        </div>
        <div className="col-md-6">
          <h4>Players List</h4>

          <ul className="list-group">
            {players &&
              players.map((player, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActivePlayer(player, index)}
                  key={index}
                >
                  {player.player_name}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentPlayer ? (
            <div>
              <h4>Player</h4>
              <div>
                <label>
                  <strong>Player Name:</strong>
                </label>{" "}
                {currentPlayer.player_name}
              </div>

              <div>
                <label>
                  <strong>Player Rank:</strong>
                </label>{" "}
                {currentPlayer.player_rank}
              </div>

              <div>
                <label>
                  <strong>Discord ID:</strong>
                </label>{" "}
                {currentPlayer.discord_id}
              </div>

              <Link
                to={"/players/" + currentPlayer.player_id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Player...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}