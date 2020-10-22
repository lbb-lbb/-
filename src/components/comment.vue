<template>
  <div class="main">
      <div class="like" v-if="!this.$store.state.user.name">
          <svg @click="setLike" v-show="!state" t="1603088850698" class="icon" viewBox="0 0 1110 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3189" data-darkreader-inline-fill="" width="32" height="32"><path d="M1006.933333 341.333333l-341.333333 0 46.933333-93.866667c25.6-59.733333 25.6-132.266667-4.266667-187.733333C691.2 17.066667 652.8 0 618.666667 0c-34.133333 0-68.266667 17.066667-89.6 51.2l-162.133333 256C349.866667 328.533333 324.266667 341.333333 298.666667 341.333333l0 0L213.333333 341.333333 85.333333 341.333333c-46.933333 0-85.333333 38.4-85.333333 85.333333l0 512c0 46.933333 38.4 85.333333 85.333333 85.333333l128 0 85.333333 0 593.066667 0c38.4 0 72.533333-29.866667 85.333333-68.266667l115.2-512C1100.8 392.533333 1062.4 341.333333 1006.933333 341.333333zM213.333333 938.666667 85.333333 938.666667 85.333333 426.666667l128 0L213.333333 938.666667zM891.733333 938.666667 298.666667 938.666667 298.666667 426.666667l0 0c55.466667 0 106.666667-25.6 136.533333-72.533333l162.133333-256c0 0 0-4.266667 4.266667-4.266667C605.866667 89.6 610.133333 85.333333 618.666667 85.333333c4.266667 0 12.8 0 17.066667 8.533333 17.066667 38.4 21.333333 76.8 4.266667 115.2l-46.933333 93.866667c-12.8 25.6-12.8 55.466667 4.266667 81.066667 17.066667 25.6 42.666667 38.4 72.533333 38.4l341.333333 0L891.733333 938.666667z" p-id="3190" fill="#d81e06" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#6a4034;"></path></svg>
          <svg @click="setLike" v-show="state" t="1603088890759" class="icon" viewBox="0 0 1110 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3706" data-darkreader-inline-fill="" width="32" height="32"><path d="M298.666667 341.333333 300.202667 341.333333C325.845333 341.333333 349.738667 328.277333 363.605333 306.730667L527.445333 51.968C546.944 17.194667 581.76 0 616.533333 0 652.842667 0 689.066667 18.773333 707.797333 55.936 737.749333 115.413333 739.2 185.045333 711.722667 245.674667L665.813333 341.333333 1007.658667 341.333333C1062.314667 341.333333 1102.848 391.936 1090.944 445.269333L976.554667 957.269333C967.850667 996.266667 933.248 1024 893.269333 1024L298.666667 1024 298.666667 341.333333 298.666667 341.333333 298.666667 341.333333ZM213.333333 341.333333 85.333333 341.333333C38.229333 341.333333 0 379.52 0 426.666667L0 938.666667C0 985.813333 38.229333 1024 85.333333 1024L213.333333 1024 213.333333 341.333333 213.333333 341.333333 213.333333 341.333333Z" p-id="3707" fill="#d81e06" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#6a4034;"></path></svg>
          <span> | ({{like}})</span>
      </div>
      <div v-if="!this.$store.state.user.name">
          <el-input type="text" v-model="comment.name"
                    placeholder="请输入留言昵称"
                    maxlength="7" show-word-limit/>
          <el-input
                  type="textarea"
                  autosize
                  placeholder="请输入内容"
                  v-model="comment.main">
          </el-input>
          <el-button @click="submit(comment)">Biu~发布</el-button>
      </div>
      <div class="comment">
          <div>Comment | 评论({{this.detail.length}})</div>
          <div class="content" v-for="item in detail" :key="item._id">
              <div class="user">
                  <el-avatar class="face" shape="circle" :size="40" ></el-avatar>
                  <div class="name">{{item.name}}</div>
                  <div class="time">{{item.time}}</div>
              </div>
              <div class="main">{{item.main}}</div>
          </div>
      </div>
  </div>
</template>
<script>
import http from "../methods/http";
import {mapState}from 'vuex'
//import {throttle} from "../common";
export default {
      data(){
          return{
              //填入评论的信息存放
              comment:{
                  name:'',
                  main:'',
              },
              //评论的数组
              detail:'',
              //点赞图标的切换
              state:false,
              //点赞数
              like:0
          }
      },
    //使用props传入要评论的文章主键，这样可以使得该评论多用，在用户模式和游客模式都可以用
    props:['_id','name'],
    computed:{
          ...mapState(['bingo'])
    },
    methods:{
          //提交评论
         submit(val){
             val.id=this._id
             val.name=this.comment.name
             val.user=this.name
             if(val.name===''){
                 this.$message({
                     message:'昵称不能为空',
                     type:"error"
                 })
                 return;
             }
             if(val.main===''){
                 this.$message({
                     message:'评论不能为空',
                     type:"error"
                 })
                 return;
             }
             if(val.id===''){
                 this.$message({
                     message:'该评论文章不存在',
                     type:"error"
                 })
                 return;
             }
             http.post('/commentLike/comment',val).then(res =>{
                 this.$message({
                     message:res.data.message,
                     type:res.data.type
                 })
                 if(res.data.code===1){
                     this.comment.name=''
                     this.comment.main=''
                     this.getComment()
                 }
             })
         },
        //获取评论
        getComment(){
             http.post('/commentLike/getComment',{id:this._id}).then(res=>{
                 if(res.data.code===1){
                     res.data.data.sort(function (a,b) {
                         //将评论的时间排序，最新排在前面
                         return Date.parse(b.time.replace(/-/g,"/"))-Date.parse(a.time.replace(/-/g,"/"))
                     })
                     this.detail=res.data.data
                 }
             })
        },
        //点赞的获取与取消点赞
        setLike(){
             //传入state状态，让后台判断点赞是加一个还是减少一个
             this.state=!this.state
             let message={}
             message._id=this._id
             message.state=this.state
             http.get('/commentLike/setLike',message).then(res=>{
                 if(res.data.code===1){
                     this.like=res.data.like
                 }
             })
        },
        getLike(){
             http.get('/commentLike/getLike',{_id:this._id}).then(res=>{
                 if(res.data.code===1){
                     this.like=res.data.like
                 }
             })
        }
    },
    watch:{
      bingo:function () {
            this.getComment()
      }
    },
    mounted() {
        setTimeout(()=>{
            this.getComment()
            this.getLike()
        },1000)
    }

}
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .like{
        height: 10px;
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
    .like .icon{
        position: relative;
        bottom: 10px;
    }
    .comment div{
        margin-top: 20px;
    }
    .user{
        display: flex;
        position: relative;
    }
    .user .name{
       position: absolute;
        bottom: 20px;
        left: 60px;
    }
    .user .time{
        position: absolute;
        left: 60px;
        font-size: 12px;
    }
    .content{
        margin: 20px 0;
        border-bottom: 1px dotted #000;
        padding-bottom: 20px;
    }
    .el-button{
        margin-top: 20px;
    }
</style>