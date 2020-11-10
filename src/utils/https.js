// import axios from 'axios'
import qs from 'qs'

axios.defaults.timeout = 10000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';        //配置请求头
// axios.defaults.baseURL = process.env.NODE_ENV == "production" ? "http://175.24.135.230/" : "/api"
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL

const consoleFlag = false
//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
    //在发送请求之前做某件事
    let token = sessionStorage.getItem("token");
    token ? config.headers["authorization"] = token : ""
    if (config.method === 'post') {
        consoleFlag && console.log(config.data)
        config.data = qs.stringify(config.data);
    }
    consoleFlag && console.log(config)
    return config;
}, (error) => {
    consoleFlag && console.log('错误的传参')
    return Promise.reject(error);
});

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
    //对响应数据做些事
    // if (res.data.msg == "请登录" || res.data.code == 5) {
    //     this.$router.push({name: 'Login', path: '/Login'})
    // }
    if (!res.data.success) {
        return Promise.resolve(res);
    }
    return res;
}, (error) => {
    console.log('网络异常')
    this.$message.error("网络异常")
    return Promise.reject(error);
});

//返回一个Promise(发送post请求)
export function fetchPost(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}

////返回一个Promise(发送get请求)
export function fetchGet(url, param) {
    return new Promise((resolve, reject) => {
        axios.get(url, {params: param})
            .then(response => {
                resolve(response)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

////返回一个Promise(发送del请求)
export function fetchDel(url, param) {
    return new Promise((resolve, reject) => {
        axios.delete(url, {params: param})
            .then(response => {
                resolve(response)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

////返回一个Promise(发送put请求)
export function fetchPut(url, param) {
    return new Promise((resolve, reject) => {
        axios.put(url, param)
            .then(response => {
                resolve(response)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export default {
    fetchPost,
    fetchGet,
    fetchDel,
    fetchPut
}