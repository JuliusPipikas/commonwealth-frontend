import http from "../http-common";

class LocationDataService {
  getAll() {
    return http.get("/locations");
  }

  get(location_id) {
    return http.get(`/locations/${location_id}`);
  }

  create(data) {
    return http.post("/locations", data);
  }

  update(location_id, data) {
    return http.put(`/locations/${location_id}`, data);
  }

  delete(location_id) {
    return http.delete(`/locations/${location_id}`);
  }

  findByLocationName(location_name) {
    return http.get(`/locations?location_name=${location_name}`);
  }
}

export default new LocationDataService();