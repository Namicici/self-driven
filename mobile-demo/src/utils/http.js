import Axios from 'axios'
// import { MessageBox } from 'mint-ui'

Axios.defaults.baseURL = process.env.BASE_URL
// Add a request interceptor
Axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers = {token: '1234567890'}
    return config
}, function (error) {
    // Do something with request error
    return Promise.reject(error)
})

// Add a response interceptor
Axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response.data
}, function (error) {
    // Do something with response error
    // MessageBox({title: '错误提示', message: error.response.data.message})
    return Promise.reject(error)
})

export default Axios
