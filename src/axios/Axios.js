import axios from 'axios'
var Axios = axios.create({
  baseURL: 'http://localhost:8081/'
})

Axios.interceptors.request.use(request => {
  if (localStorage.getItem('accessToken')) {
    Axios.defaults.headers.common['authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
  }
  return request
})
// Axios.defaults.headers.common['authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
Axios.interceptors.response.use((response) => {
  return response
}, async (error) => {
  const orginalRequest = error.config
  if (error.response.status === 401 && !orginalRequest._retry) {
    orginalRequest._retry = true
    if (localStorage.getItem('refreshToken') && localStorage.getItem('refreshToken') !== '') {
      Axios.defaults.headers.common['authorization'] = `Bearer ${localStorage.getItem('refreshToken')}`
      const accessToken = await Axios.post('/refreshToken')
      localStorage.setItem('accessToken', accessToken.data.accessToken)
      Axios.defaults.headers.common['authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
    }
    return Promise.reject(error)
  }
})

export default Axios
