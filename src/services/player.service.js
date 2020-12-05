import http from "../http-common";

class PlayerDataService {
  getAll() {
    return http.get("/players");
  }

  get(player_id) {
    return http.get(`/players/${player_id}`);
  }

  create(data) {
    return http.post("/players", data);
  }

  update(player_id, data) {
    return http.put(`/players/${player_id}`, data);
  }

  delete(player_id) {
    return http.delete(`/players/${player_id}`);
  }
}

export default new PlayerDataService();