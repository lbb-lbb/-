import Vue from 'vue'
import Vuex from 'vuex'
import http from "../methods/http";
import Message from "element-ui/packages/message/src/main";
import router from "../router";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //存放用户名
        user: {
            name: '',
            // token:sessionStorage.getItem('user')
        },
        //存放用户的昵称，简介，头像地址
        detail: {},
        //存放文章的列表
        list: [],
        //存放浏览的文章
        bingo: {},
        //用来全局判断搜索框是在顶部出现还是侧栏出现全局判断
        search:false,
        /*接下来是游客模式下的数据*/
        //博主文章列表存放地址
        visitList: {},
        //游客要浏览的文章
        article:{}
    },
    mutations: {
        setState(state, user) {
            Object.assign(
                state,
                user
            )
        },
        setDetail(state, detail) {
            state.detail = detail
        },
        setUser(state, user) {
            state.user.name = user
        },
        clearUser(state) {
            state.bingo = ''
            state.user.name = ''
            state.detail=''
            state.list = ''
            state.visitList=''
            state.article=''
            sessionStorage.clear()
        },
        setList(state, list) {
            state.list = list
        },
        setBingo(state, text) {
            state.bingo = text
        },
        /*****************游客模式设计***************************/
        setVisitList(state,list){
            state.visitList=list
        },
        setArticle(state,val){
            state.article=val
        },
    },
    actions: {
        //获取menu博客列表的函数
        getList({ commit }) {
            http.get("/blog/title").then(res => {
                if (res.data.type) {
                    Message({
                        message: res.data.message,
                        type: res.data.type
                    });
                } else {
                    commit('setList', res.data.data)
                }
            })
        },
        //删除博客文章的函数
        startDelete({ commit, dispatch }, val) {
            http.get("/blog/delete", { _id: val }).then(res => {
                Message({
                    message: res.data.message,
                    type: res.data.type
                })
                if (res.data.type === 'success') {
                    commit('setBingo', '')
                    dispatch('getList')
                }
            })
        },
        //在主页面显示博客详细文章内容的函数
        goShow({ commit }, val) {
            http.get("/blog/show", { _id: val }).then(res => {
                if (res.data.code === 1) {
                    commit('setBingo', res.data)
                    router.push("/home/detail")

                } else {
                    Message({
                        message: res.data.message,
                        type: res.data.type
                    })
                }
            })
        },
        //提交保存博客文章的函数
        submit({ state, dispatch }, val) {
            if (val.title !== '') {
                if (state.user.name) {
                    val.name = state.user.name
                    http.post('/blog/bingo', val).then(res => {
                        Message({
                            message: res.data.message,
                            type: res.data.type
                        })
                        dispatch('getList')
                    })
                } else {
                    Message({
                        message: '请登陆后再提交',
                        type: 'warning'
                    })
                }
            } else {
                Message({
                    message: '请输入标题后再提交',
                    type: 'warning'
                })
            }
        },
        //更新博客文章的函数
        goUpdate({ commit, dispatch }, val) {
            http.post('/blog/update', val).then(res => {
                Message({
                    message: res.data.message,
                    type: res.data.type
                })
                if (res.data.type === 'success') {
                    commit('setBingo', '')
                    dispatch('getList')
                }
            })
        },
        /*********************这是游客模式下要获取的文章方法***************************/
        //获取作者博客列表
        getVisitList({commit}){
            http.get('/show/visitList').then(res=>{
                if(res.data.code===1){
                    res.data.data.reverse()
                    commit('setVisitList',res.data)
                }else {
                    Message({
                        message:'获取服务器数据失败',
                        type:'error'
                    })
                }
            })
        },
        //获取游客想要阅读的文章
        getArticle({commit,state},val){
            for (let i in state.visitList.data){
                if(val===state.visitList.data[i]._id){
                    commit('setArticle',state.visitList.data[i])
                    router.push('/read')
                }
            }
        }
    },
    modules: {}
})