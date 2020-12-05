import http from "../http-common";

class CharacterDataService {
  getAll() {
    return http.get("/characters");
  }

  get(character_id) {
    return http.get(`/characters/${character_id}`);
  }

  create(data) {
    return http.post("/characters", data);
  }

  update(character_id, data) {
    return http.put(`/characters/${character_id}`, data);
  }

  delete(character_id) {
    return http.delete(`/characters/${character_id}`);
  }

  findCharactersByPlayer(player_id) {
    return http.get(`/characters?player_id=${player_id}`);
  }
}

export default new CharacterDataService();