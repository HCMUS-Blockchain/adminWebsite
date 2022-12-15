import axios from 'axios'

const axiosClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

// axios.interceptors.response.use(
//   function (response) {
//     return response.data
//   },
//   function (error) {
//     return Promise.reject(error)
//   }
// )
export default axiosClient
