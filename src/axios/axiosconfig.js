import axios from 'axios'
import store from '../store/index'

axios.defaults.baseURL = 'http://192.168.0.104:8080' // 'http://192.168.0.121:8080'
axios.defaults.timeout = 50000
/* axios.create({
  baseURL: 'http://192.168.0.121:8080', // api 的 base_url
  withCredentials: true, // 跨域请求时发送 cookies
  timeout: 5000 // request timeout
}) */
export default function setAxios () {
  axios.interceptors.request.use(
    request => {
      if (store.state.token) {
        request.headers.token = store.state.token
      }
      return request
    }
  )

  axios.interceptors.response.use(
    response => {
      if (response.status === 200) {
        const res = response.data
        return res
      }
      /* if (response.status === 404 || response.status === 500) {
        this.$router.replace({ path: '/FZF' })
      } */
      return response
    }
  )
}
