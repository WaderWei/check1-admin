import axios from 'axios'
import { Toast } from 'mand-mobile'

// axios.defaults.baseURL = 'http://192.168.0.121:7777'
axios.defaults.baseURL = 'http://223.240.65.137:7777'
axios.defaults.timeout = 50000
/* axios.create({
  baseURL: 'http://192.168.0.121:8080', // api 的 base_url
  withCredentials: true, // 跨域请求时发送 cookies
  timeout: 5000 // request timeout
}) */
export default function setAxios () {
  axios.interceptors.request.use(
    request => {
      if (!(request.url === 'user/login' || request.url === 'check/editNew' || request.url === 'user/userListByLike' ||
        request.url === 'report/editAddReport' || request.url === 'report/findReportItem' || request.url === 'checkItem/examineCheckItem' ||
        request.url === 'report/queryDep' || request.url === 'file/fileList'
      )) {
        Toast.loading('加载中...')
      }
      return request
    }
  )

  axios.interceptors.response.use(
    response => {
      Toast.hide()
      if (response.status === 200) {
        return response.data
      } else {
        return Promise.reject(response)
      }
    },
    error => {
      Toast.hide()
      return Promise.reject(error.response.status)
    }
  )
}
