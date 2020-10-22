<template>
    <div class="main">
        <div class="header">
            <i  @click="test" class="el-icon-menu"></i>
            <h2>lbb Blog</h2>
            <router-link class="router-link" to="/home">用户模式</router-link>
        </div>
        <transition name="line">
            <div v-show="state" class="aside">
                <div class="introduce">
                    <h2 class="userMessage">lbb</h2>
                    <div class="userMessage" >Love life,Love sharing</div>
                    <div class="userMessage">
                        <el-avatar src="http://47.97.60.54:3000/head/lbb.jpg" :size="50"/>
                    </div>
                </div>
                <div class="introduce tag">
                    <el-button>vue</el-button>
                    <el-button>koa</el-button>
                    <el-button>mongodb</el-button>
                    <el-button>js</el-button>
                    <el-button>随笔</el-button>
                </div>
            </div>
        </transition>
        <div class="contain">
            <transition name="fade">
                <router-view/>
            </transition>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                state:true,
            };
        },
        computed: {},
        methods: {
            test(){
                this.state=!this.state
            },
            getScreen(){
                let clientWidth = document.body.clientWidth
                if(clientWidth>768){
                    this.state=true
                }
                if(clientWidth<=768){
                    this.state=false
                }
            }
        },
        mounted() {
            addEventListener('resize',()=>{
                this.getScreen()
            })
        },
        beforeDestroy() {
            window.removeEventListener('resize',()=>{
                this.getScreen()
            })
        }
    }
</script>

<style scoped>
    /* 超小设备（手机，小于 768px） */
    @media screen and (min-width:300px){
        *{
            margin:0;
            padding:0
        }
        .main{
            display: flex;
            flex-wrap: wrap;
            margin: 0 auto;
            position: relative;
        }
        .aside{
            width: 200px;
            height: 600px;
            top:50px;
            position: absolute;
            z-index: 10;
            background-color: white;
        }
        .aside .introduce{
            text-align: center;
        }
        .aside .introduce .userMessage{
            margin-bottom: 10px;
        }
        .aside .tag{
            margin-top: 20px;
        }
        .aside .tag .el-button{
            margin-bottom: 10px;
        }
        .header{
            height: 50px;
            flex: 0 0 100%;
            text-align: center;
            position: relative;
        }
        .header i{
            position: absolute;
            top:50%;
            left: 10px;
            transform: translate(0,-50%);
        }
        .header h2{
           position: absolute;
           top:50%;
           left: 50%;
           transform: translate(-50%,-50%);
        }
        .header .router-link{
            position: absolute;
            top:50%;
            right: 0;
            transform: translate(0,-50%);
            color: dodgerblue;
        }
        .header .router-link:hover{
            color: red;
        }
        .contain{
            flex: 1 1 auto;
        }
        .line-enter-active, .line-leave-active {
            transition: all .2s linear;
            transform: translate3d(0, 0, 0);
        }
        .line-enter, .line-leave-to /* .fade-leave-active below version 2.1.8 */ {
            transform: translate3d(-200px, 0, 0);
        }
        .fade-enter-active, .fade-leave-active {
            transition: opacity .3s;
            opacity: 0;
        }
        .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
            opacity: 0;
        }
    }
    /* 小型设备（平板电脑，768px 起） */
    @media screen and (min-width:768px) {
        *{
            margin:0;
            padding:0
        }
        .main{
            display: flex;
            flex-wrap: wrap;
            width: 768px;
            margin: 0 auto;
        }
        .header{
            flex: 0 0 768px;
        }
        .header i{
            display: none;
        }
        .aside{
            position: static;
        }
        .contain{
            flex: 1 1 568px;
        }
    }
    /* 中型设备（台式电脑，992px 起） */
    @media screen and (min-width:992px){
        .main{
            display: flex;
            flex-wrap: wrap;
            width: 992px;
            margin: 0 auto;
        }
        .header{
            flex: 0 0 992px;
        }

        .contain{
            flex: 1 1 792px;
        }
    }
    /* 大型设备（大台式电脑，1200px 起） */
    @media screen and (min-width:1200px){
        *{
            margin:0;
            padding:0
        }
        .main{
            display: flex;
            flex-wrap: wrap;
            width: 1200px;
            margin: 0 auto;
        }
        .header{
            flex: 0 0 1200px;
        }

        .contain{
            height: 600px;
            flex:1 1 1000px;
        }
    }
</style>