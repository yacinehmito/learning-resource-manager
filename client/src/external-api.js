import axios from "axios";
const call = axios.create({
  baseURL: "http://"
});

const getHeadline = url => call.get(`/${url}`).then(res => res.data);

export default { getHeadline };
