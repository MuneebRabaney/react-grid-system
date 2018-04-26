import axios from 'axios'

const API_BASE_URL = process.env.API_BASE_URL

var axiosInstance = axios.create({
  baseURL: API_BASE_URL,
})

export default axiosInstance
