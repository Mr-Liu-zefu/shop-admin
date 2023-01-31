import store from '../store'
import axios from 'axios'


// 创建 axios 实例
const request = axios.create({
    // API 请求的默认前缀
    baseURL: 'http://yxmzq.top/admin',
    // timeout: 5000,
})

export default request



// import store from '../store'
// import axios from 'axios'

// export function request(config) {
//     // 1.创建axios的实例
//     const instance = axios.create({
//         baseURL: "http://yxm.free.idcfengye.com/admin",
//         timeout: 5000
//     })

//     // 2.axios的拦截器
//     // 2.1.请求拦截的作用
//     instance.interceptors.request.use(config => {
//         // config.headers['Access-Control-Allow-Origin'] = '*';
//         // console.log(store)
//         //请求前在请求里面添加token
//         console.log(store.state.token)
//         if (store.state.token) {
//             config.headers['Authorization'] = store.state.token
//         }
//         return config
//     }, err => {
//         console.log(err);
//     })

//     // 2.2.响应拦截
//     instance.interceptors.response.use(res => {
//         return res
//     }, err => {
//         console.log(err);
//     })

//     // 3.发送真正的网络请求
//     return instance(config)
// }

// export default request