import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.github.com', // can we load this from an env variable?
})

export default instance
