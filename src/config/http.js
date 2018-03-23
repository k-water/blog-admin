import axios from 'axios'
import '../../node_modules/nprogress/nprogress.css'
import NProgress from 'nprogress'
const API = {
  ROOT: process.env.NODE_ENV === 'development' ? '/' : 'http://119.29.151.195:7002'
}
axios.defaults.baseURL = API.ROOT
axios.interceptors.request.use(function (config) {
  NProgress.start()
  return config
})

axios.interceptors.response.use(function (config) {
  NProgress.done()
  return config
})