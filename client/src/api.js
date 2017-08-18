import axios from "axios";
const server = axios.create({
  baseURL: "http://localhost:3000/api/"
});

const auth = {
  signup: credentials =>
    server.post("/signup", credentials).then(res => res.data),

  login: credentials => server.post("/login", credentials).then(res => res.data)
};

const users = {
  getAll: () => server.get("/users").then(res => res.data),
  getOne: id => server.get(`/users/${id}`).then(res => res.data),
  editOne: (id, changes) =>
    server.put(`/users/${id}`, changes).then(res => res.data)
};

const items = {
  getAll: () => server.get("/items").then(res => res.data),
  getOne: id => server.get(`/items/${id}`).then(res => res.data),
  editOne: (id, changes) =>
    server.put(`/items/${id}`, changes).then(res => res.data),
  postOne: info => server.post("/items", info).then(res => res.data),
  deleteOne: id => server.delete(`/items/${id}`).then(res => res.data)
};

const comments = {
  getAll: () => server.get("/comments").then(res => res.data),
  getOne: id => server.get(`/comments/${id}`).then(res => res.data),
  postOne: info => server.post("/comments", info).then(res => res.data),
  editOne: (id, changes) =>
    server.put(`/comments/${id}`, changes).then(res => res.data),
  deleteOne: id => server.delete(`/comments/${id}`).then(res => res.data)
};

export default { auth, users, items, comments };
