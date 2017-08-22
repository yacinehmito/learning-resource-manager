import axios from "axios";
const server = axios.create({
  baseURL: "http://localhost:3000/api/"
});

const auth = {
  signup: credentials =>
    server.post("/signup", credentials).then(res => res.data),

  login: (credentials, vm) =>
    server
      .post("/login", credentials)
      .then(res => {
        const { token, id, username } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("id", id);
        localStorage.setItem("username", username);
        this.a.auth.loadUser(vm);
        return res.data;
      })
      .catch(err => {
        throw err.response.data;
      }),

  loadUser: vm => {
    const { token, username, id } = localStorage;
    if (token) {
      axios.defaults.headers.common.Authorization = "Bearer " + token;
      vm.$root.user = { token, id, username };
    }
  }
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

const subjects = {
  getAll: () => server.get("/subjects").then(res => res.data)
};

export default { auth, users, items, comments, subjects };
