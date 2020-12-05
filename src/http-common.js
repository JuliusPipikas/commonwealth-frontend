import axios from "axios";

export default axios.create({
  //baseURL: "http://localhost:8080/api",
  baseURL: "https://the-drumian-commonwealth.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});