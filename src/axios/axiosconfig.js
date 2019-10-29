import axios from 'axios'
import store from '../store/index'
import router from '../router/index'

axios.defaults.baseURL = 'http://192.168.0.121:8080'
axios.defaults.timeout = 3000
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
      const res = response.data
      if (res.code !== 1) {
        if (res.code === 0) {
          store.commit('setToken', '')
          // 跳转到登录页面
          router.replace({ path: '/login' })
        } else {
          console.log(res.message)
        }
      }
      return res
    }
  )
}
