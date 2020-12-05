import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddLocation from "./components/locations/add-location.component";
import Location from "./components/locations/location.component";
import LocationsList from "./components/locations/locations-list.component";
import AddPlayer from "./components/players/add-player.component";
import Player from "./components/players/player.component";
import PlayersList from "./components/players/players-list.component";
import AddCharacter from "./components/characters/add-character.component";
import Character from "./components/characters/character.component";
import CharactersList from "./components/characters/characters-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/characters" className="navbar-brand">
            The Commonwealth
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/locations"} className="nav-link">
                Locations
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/addLocation"} className="nav-link">
                Add Location
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/characters"} className="nav-link">
                Characters
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/addCharacter"} className="nav-link">
                Add Character
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/players"} className="nav-link">
                Players
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/addPlayer"} className="nav-link">
                Add Player
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/characters"]} component={CharactersList} />
            <Route exact path="/addLocation" component={AddLocation} />
            <Route path="/locations/:location_id" component={Location} />
            <Route exact path={["/", "/locations"]} component={LocationsList} />
            <Route exact path="/addCharacter" component={AddCharacter} />
            <Route path="/characters/:character_id" component={Character} />
            <Route exact path={["/", "/players"]} component={PlayersList} />
            <Route exact path="/addPlayer" component={AddPlayer} />
            <Route path="/players/:player_id" component={Player} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;