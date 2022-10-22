import axios from "axios";

const API_URL = process.env.VUE_APP_BACKEND_URL + ':' + process.env.VUE_APP_BACKEND_PORT + '/';

// console.log(API_URL)
// const API = axios.create({
//     baseURL: API_URL
// })

export default {
    install: (Vue: any) => {
        Vue.prototype.$axios = axios.create({
            baseURL: API_URL,
            headers: { 'Content-Type': 'application/json' },
            // this.axios.interceptors.request.use(req => {
            //     req.headers['Authorization'] = `Bearer ${accessToken}`
            //     return req;
            // });
        })
    }
}