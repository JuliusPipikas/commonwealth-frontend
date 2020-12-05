import React, { Component } from "react";
import LocationDataService from "../../services/location.service";

export default class AddLocation extends Component {
  constructor(props) {
    super(props);
    this.onChangeLocationName = this.onChangeLocationName.bind(this);
    this.saveLocation = this.saveLocation.bind(this);
    this.newLocation = this.newLocation.bind(this);

    this.state = {
      location_id: null,
      location_name: "",

      submitted: false
    };
  }

  onChangeLocationName(e) {
    this.setState({
      location_name: e.target.value
    });
  }

  saveLocation() {
    var data = {
      location_name: this.state.location_name
    };

    LocationDataService.create(data)
      .then(response => {
        this.setState({
          location_id: response.data.location_id,
          location_name: response.data.location_name,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newLocation() {
    this.setState({
      location_id: null,
      location_name: "",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newLocation}>
              Add
            </button>
          </div>
        ) : (
        <div>
            <div className="form-group">
              <label htmlFor="location_name">Name</label>
              <input
                type="text"
                className="form-control"
                id="location_name"
                required
                value={this.state.location_name}
                onChange={this.onChangeLocationName}
                name="location_name"
              />
            </div>

            <button onClick={this.saveLocation} className="btn btn-success">
              Submit
            </button>
          </div>)}
      </div>
    );
  }
}