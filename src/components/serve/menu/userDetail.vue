<template>
    <div id="main">
        <div>
            <span>昵称:<span>{{this.detail?this.detail.user:'未设置'}}</span></span>
        </div>
        <div id="introduction">
            <p>个人简介:{{this.detail.introduction?
                this.detail.introduction:'这家伙很懒，什么介绍也没有'}}</p>
        </div>
        <div id="footer">
            <el-badge :value="this.$store.state.list.length===0?'':this.$store.state.list.length" :max="99" class="item">
                <div>文章</div>
            </el-badge>
            <el-badge :value="count" :max="99" class="item">
                <div class="message" @click="goLeaveMessage">留言</div>
            </el-badge>
            <el-badge :value="like" :max="999" class="item">
                <div>点赞</div>
            </el-badge>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import http from "../../../methods/http";
    export default {
        data(){
            return{
                count:'',
                like:''
            }
        },
        computed:{
            ...mapState(['detail'])
        },
        methods:{
            //获取未读留言和点赞总数
            getLeaveMessageLike(){
                http.get('/commentLike/leaveMessageCountLike').then(res=>{
                    if(res.data.code===1){
                        this.count=res.data.count===0?'':res.data.count
                        this.like=res.data.like===0?'':res.data.like
                    }
                })
            },
            goLeaveMessage(){
                this.$router.push('/home/leaveMessage')
            }
        },
        mounted() {
            setTimeout(()=>{
                this.getLeaveMessageLike()
            },500)
        }
    }
</script>

<style scoped>
    *{
        margin:0;
        padding: 0;
        text-align: left;
    }
    #main{
        height: 170px;
    }
    #introduction{
        height: 120px;
        margin-top: 5px;
}
    #footer{
        display: flex;
        justify-content: space-around;
    }
    .message:hover{
        color: #005cc5;
        cursor:pointer;
    }
</style>