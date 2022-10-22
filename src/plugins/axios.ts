import axios from "axios";


// console.log(API_URL)
// const API = axios.create({
//     baseURL: API_URL
// })

export default {
    install: (Vue: any) => {
        Vue.prototype.$axios = axios.create({
            baseURL: process.env.VUE_APP_BACKEND_URL,
            headers: { 'Content-Type': 'application/json' },
            // this.axios.interceptors.request.use(req => {
            //     req.headers['Authorization'] = `Bearer ${accessToken}`
            //     return req;
            // });
        })
    }
}