<template>
    <div class="main">
        <el-tabs value="1">
            <el-tab-pane label="未查看留言" name="1" :key="1">
                <div :key="item._id" class="message" v-for="item in selectComment.newComment">
                    <h3 @click="goShow(item._id)" class="title" title="前往文章">{{item.title}}
                        <span>
                            <el-badge class="bubble" :max="99" :value="item.count2" >
                                <div></div>
                            </el-badge>
                        </span>
                    </h3>
                    <div :key="item2._id" class="content" v-for="item2 in item.comments2">
                        <div class="user">
                            <el-avatar :size="40" class="face" shape="circle"></el-avatar>
                            <div class="name">{{item2.name}}</div>
                            <div class="time">{{item2.time}}</div>
                        </div>
                        <div class="main">{{item2.main}}</div>
                        <div class="btn">
                            <el-button size="mini">回复</el-button>
                            <el-button @click="setComment(item2._id)" size="mini">设为已读</el-button>
                            <el-button @click="deleteComment(item2._id)" size="mini">删除</el-button>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="全部留言" name="2" :key="2">
                <div class="message" :key="item._id" v-for="item in selectComment.allComment">
                    <h3 @click="goShow(item._id)" class="title" title="前往文章">{{item.title}}
                        <span>
                            <el-badge class="bubble" :max="99" :value="item.count" >
                                <div></div>
                            </el-badge>
                        </span>
                    </h3>
                    <div :key="item2._id" class="content" v-for="item2 in item.comments">
                        <div class="user">
                            <el-avatar :size="40" class="face" shape="circle"></el-avatar>
                            <div class="name">{{item2.name}}</div>
                            <div class="time">{{item2.time}}</div>
                        </div>
                        <div class="main">{{item2.main}}</div>
                        <div class="btn">
                            <el-button size="mini">回复</el-button>
                            <el-button @click="deleteComment(item2._id)" size="mini">删除</el-button>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {mapState,mapActions} from 'vuex'
    import http from '../../../methods/http'
    export default {
        data(){
            return{
                comment:'',
            }
        },
        computed:{
            ...mapState(['list']),
            selectComment:function () {
               // console.time('start')
                let message={}
                let count=0
                let count2=0
                let arr=this.list.slice()
                for (let i in arr){
                    arr[i].comments=[]
                    arr[i].comments2=[]
                    for (let j in this.comment){
                        if(this.comment[j].id===arr[i]._id){
                            count+=1
                            arr[i].comments.push(this.comment[j])
                        }
                        if(this.comment[j].id===arr[i]._id&&!this.comment[j].read){
                            count2+=1
                            arr[i].comments2.push(this.comment[j])
                        }
                    }
                    arr[i].count2=count2
                    arr[i].count=count
                    count=0
                    count2=0
                }
               // console.timeEnd('start')
                message.allComment=  arr.filter((item)=>{
                    return  item.count>0
                })
                message.newComment=  arr.filter((item)=>{
                    return  item.count2>0
                })
                return message
            },

        },
        methods:{
            ...mapActions(['goShow']),
            //向后台获取该用户的所以评论
            getAllComment(){
                http.get('/commentLike/allComment').then(res=>{
                    if(res.data.code===1){
                        this.comment=res.data.comment
                    }
                })
            },
            //删除评论的方法
            deleteComment(val){
                http.post('/commentLike/deleteComment', {_id:val}).then(res=>{
                    if(res.data.code===1){
                        this.getAllComment()
                    }else {
                        this.Message({
                            message:res.data.message,
                            type:res.data.type
                        })
                    }
                })
            },
            //设评论已读的方法
            setComment(val){
                http.post('/commentLike/setComment', {_id:val}).then(res=>{
                    if(res.data.code===1){
                        this.getAllComment()
                    }else {
                        this.Message({
                            message:res.data.message,
                            type:res.data.type
                        })
                    }
                })
            }
        },
        mounted() {
            setTimeout(()=>{
                this.getAllComment()
            },1000)
        }
    }
</script>

<style scoped>
    *{
        padding: 0;
        margin: 0;
    }
    .main{
        display: flex;
    }
    .el-tabs{
        margin-left: 10px;
        box-sizing: border-box;
        flex: 1 1 1000px;
    }
    .message{
        margin-top: 11px;
    }
    h3{
        cursor:pointer;
    }
    /**************************评论样式**************************/
    .content div{
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
        padding-left: 20px;
    }
    .bubble{
        margin-left: 10px;
        margin-bottom: 3px;
    }
    .btn{
        display: flex;
        justify-content: flex-end;
        margin-right: 15px;
    }
</style>