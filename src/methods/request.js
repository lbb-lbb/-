import axios from 'axios'
import { Message } from "element-ui";
//引入vuex数据，每次发送把用户名当作请求头发送过去
import store from '../store'
//创建axios实例
const serve = axios.create({
    baseURL: ' http://localhost:3000', //在使用请求时候，该url将自带加在前面，这样就可以axios.get('/name)了
   // baseURL: ' http://47.97.60.54:3000/api',
    timeout: 3 * 1000 ,//设置最大等待时间，超时将报告错误信息
    //withCredentials:true //是否允许携带cookeit
})

//request拦截器
serve.interceptors.request.use(config => {
    //判断如果axios是提交表单的形式，那么不用设置请求头，只需要设置发生时是否携带token即可，请求头会自动配置
    if(config.data instanceof FormData) {
        const token = sessionStorage.getItem('token');
        if (token) {
            // config.params = {'token': token}
            config.headers.token = token
            //  config.headers.name=this.$store.state.user.name
        }
        config.headers.user=store.state.user.name
        return config
    }
    //请求前的数据处理，配置请求头，设置token\loading等
    config.data = JSON.stringify(config.data);
    //console.log(typeof config.data)
        config.headers = {
            //请求头一定要配置对！！！这里主要是使用 json数据进行前后端沟通，所以设置这个请求头
            'Content-type': 'application/json'
        };
    //console.log(config.params)
    const token = sessionStorage.getItem('token');
    if (token) {
        // config.params = {'token': token}
        config.headers.token = token
            //  config.headers.name=this.$store.state.user.name
    }
    config.headers.user=store.state.user.name
    //console.log(config.params)
    return config
}, error => {
    return new Promise.reject(error)
})

//设置响应拦截器
serve.interceptors.response.use(response => {
    //接受响应后做的一些处理
    // console.log(response)
    return response
}, error => {
    if (error && error.response) {
        error.message = error.response.status
    } else {
        //超时处理
        if (JSON.stringify(error).includes('timeout')) {
            Message.error('服务器响应超时，请刷新当前页')
        }
        error.message('连接服务器失败')
    }
    Message.error(error.message);
    return new Promise.resolve(error.response)
})

export default serve