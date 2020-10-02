import serve from "./request";

const http ={
    get(url,params){
        const config ={
            method:'get',
            url:url
        }
        if(params) config.params =params
        return serve(config)
    },
    post(url,params){
        const config ={
            method: 'post',
            url:url
        }
        if(params) config.data =params
        return serve(config)
    }
}
export default http