import axios from 'axios'
import {Message} from "element-ui";
//创建axios实例
const serve =axios.create({
    baseURL:' http://localhost:3000',
    timeout:3*1000
})

//request拦截器
serve.interceptors.request.use(config => {
    //请求前的数据处理，配置请求头，设置token\loading等
    config.data = JSON.stringify(config.data);
    //console.log(typeof config.data)
    config.headers = {
        //请求头一定要配置对！！！
        'Content-type': 'application/json'
    };
    //console.log(config.params)
    const token = sessionStorage.getItem('token');
    if (token) {
       // config.params = {'token': token};
        config.headers.token = token
      //  config.headers.name=this.$store.state.user.name
    }
    //console.log(config.params)
    return config
},error => {
   return new Promise.reject(error)
})

//设置响应拦截器
serve.interceptors.response.use(response => {
    //接受响应后做的一些处理
   // console.log(response)
    return response
},error => {
    if(error&&error.response){
        error.message = error.response.status
    }
    else {
        //超时处理
        if(JSON.stringify(error).includes('timeout')){
            Message.error('服务器响应超时，请刷新当前页')
        }
        error.message('连接服务器失败')
    }
    Message.error(error.message);
    return new Promise.resolve(error.response)
})

export default serve