import Vue from 'vue'
import Vuex from 'vuex'
import http from "../methods/http";
import Message from "element-ui/packages/message/src/main";
import router from "../router";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{
      name:'',
     // token:sessionStorage.getItem('user')
    },
    list:{},
    bingo:{},
  },
  mutations: {
    setState(state,user){
      Object.assign(
          state,
          user
      )
    },
    setUser(state,user){
      state.user.name=user
    },
    clearUser(state){
      state.bingo=''
      state.user.name=''
      state.list=''
      sessionStorage.clear()
    },
    setList(state,list){
      state.list=list
    },
    setBingo(state,text){
      state.bingo=text
    }
  },
  actions: {
    getList({commit}) {
      http.get("/title").then(res => {
        console.log(res.data);
        if (res.data.type) {
          Message({
            message: res.data.message,
            type: res.data.type
          });
        } else {
          commit('setList',res.data.data)
        }
      })
    },
    startDelete({commit,dispatch},val) {
      http.get("/delete", { _id: val }).then(res => {
        Message({
          message: res.data.message,
          type: res.data.type
        })
        if(res.data.type==='success'){
          commit('setBingo','')
          dispatch('getList')
        }
      })
    },
    goShow({commit},val) {
      http.get("/show", { _id: val }).then(res => {
        if (res.data.code === 1) {
            commit('setBingo',res.data)
            router.push("/detail")

        } else {
          Message({
            message: res.data.message,
            type: res.data.type
          })
        }
      })
    },
    submit({state,dispatch},val){
        if(val.title!==''){
          if(state.user.name) {
            val.name=state.user.name
            http.post('/bingo', val).then(res => {
              Message({
                message:res.data.message,
                type:res.data.type
              })
              dispatch('getList')
            })
          }else{
            Message({
              message:'请登陆后再提交',
              type:'warning'
            })
          }
        }
        else {
          Message({
            message:'请输入标题后再提交',
            type:'warning'
          })
        }
    },
    goUpdate({commit,dispatch},val){
      http.post('/update',val).then(res => {
        Message({
          message: res.data.message,
          type: res.data.type
        })
        if(res.data.type==='success'){
          commit('setBingo','')
          dispatch('getList')
        }
      })
    }

  },
  modules: {
  }
})

