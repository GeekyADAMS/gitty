import axios from "./service";

const Request = {
  postRequest(endpoint, data) {
    return axios.post(endpoint, data);
  },
  getRequest(endpoint) {
    return axios.get(endpoint);
  },
  
};

export default Request;
