import React, { Component } from "react";
import LocationDataService from "../../services/location.service";

export default class Location extends Component {
  constructor(props) {
    super(props);
    this.onChangeLocationName = this.onChangeLocationName.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.deleteLocation = this.deleteLocation.bind(this);

    this.state = {
      currentLocation: {
        location_id: null,
        location_name: "",

        submitted: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getLocation(this.props.match.params.location_id);
  }

  onChangeLocationName(e) {
    const location_name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentLocation: {
          ...prevState.currentLocation,
          location_name: location_name
        }
      };
    });
  }

  getLocation(location_id) {
    LocationDataService.get(location_id)
      .then(response => {
        this.setState({
          currentLocation: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateLocation() {
    LocationDataService.update(
      this.state.currentLocation.location_id,
      this.state.currentLocation
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Location was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteLocation() {    
    LocationDataService.delete(this.state.currentLocation.location_id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/Locations')
      })
      .catch(e => {
        console.log(e);

      });
  }

  render() {
    const { currentLocation } = this.state;

    return (
      <div>
        {currentLocation ? (
          <div className="edit-form">
            <h4>Location</h4>
            <form>
              <div className="form-group">
                <label htmlFor="location_name">Location Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="location_name"
                  value={currentLocation.location_name}
                  onChange={this.onChangeLocationName}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteLocation}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateLocation}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Location...</p>
          </div>
        )}
      </div>
    );
  }
}