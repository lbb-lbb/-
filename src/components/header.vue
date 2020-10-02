<template>
    <div>
        <div id="main">
            <h2>{{user.name}}的博客</h2>
            <el-autocomplete class="search" type="text"
                             placeholder="请输入标题关键字"
            prefix-icon="el-icon-search"/>
            <div id="user-show">
                <el-avatar icon="el-icon-user-solid"></el-avatar>
                <p v-if="this.user.name">{{user.name}}</p>
                <router-link v-else class="to" to="/login" >登陆/注册</router-link>
                <el-button @click="clearUser" icon="el-icon-switch-button" circle></el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'
    export default {
        data(){
            return{}
        },
        computed:{
            ...mapState(['user'])
        },
        methods:{
            ...mapMutations(['clearUser'])
        }
    }
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    #main{
        margin: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: baseline;
        min-width: 700px;
    }
    h2{
        width: 400px;
        flex: 0 0 auto;
        text-align: left;
        padding-left: 20px;
    }
    #user-show{
        flex: 1 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content:flex-end;
        align-items: baseline;
    }
    .search{
        flex: 0 0 auto;
        margin-left: 100px;
        align-self: flex-end;
    }
    p,.el-avatar ,.to{
        margin-left: 40px;
        margin-right: 20px;
    }
    .el-button{

    }
</style>