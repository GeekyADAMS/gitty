import axios from "./service";

// Add a request interceptor
// axios.interceptors.request.use(
//   // function(config) {
//   //   // Do something before request is sent
//   //   // config.headers.Authorization = `Bearer ${getToken()}`;
//   //   return config;
//   // },
//   function(error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

const Request = {
  postRequest(endpoint, data) {
    return axios.post(endpoint, data);
  },
  getRequest(endpoint) {
    return axios.get(endpoint);
  },
  
};

export default Request;
