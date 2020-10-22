import serve from "./request";

const http = {
    get(url, params) {
        const config = {
            method: 'get',
            url: url
        }
        if (params) config.params = params //params是get请求方式的query
        return serve(config)
    },
    post(url, params) {
        const config = {
            method: 'post',
            url: url
        }
        if (params) config.data = params //post的data主体设置
        return serve(config)
    }
}
export default http