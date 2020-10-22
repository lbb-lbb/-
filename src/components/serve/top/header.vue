<template>
    <div>
        <div id="main">
            <slot/>
            <el-autocomplete v-if="this.$store.state.search" class="search" v-model="data"
                             :fetch-suggestions="search"
                             @select="handleSelect"
                             placeholder="请输入搜索标题"
            prefix-icon="el-icon-search"/>
            <div id="user-show">
                <el-avatar v-if="this.$store.state.detail" shape="circle" :size="40" :src="this.$store.state.detail.location"></el-avatar>
                <p v-if="this.user.name">{{user.name}}</p>
                <router-link v-else class="to" to="/login" >登陆/注册</router-link>
                <el-dropdown trigger="click" @command="handleCommand"><span class="el-dropdown-link">更多
                    <i class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-s-tools" command="1">设置</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-switch-button" command="2">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../../../methods/http";
    import {mapState,mapMutations,mapActions} from 'vuex'
    export default {
        data(){
            return{
                data:''
            }
        },
        computed:{
            ...mapState(['user'])
        },
        methods:{
            //点击注销时调用的钩子函数，清楚vuex所有的用户数据，以及清空token令牌
            ...mapMutations(['clearUser']),
            //导入去浏览文章的函数
            ...mapActions(['goShow']),
            //导航栏搜索的函数使用element ui中的钩子
            search(data,callback){
                if(data){
                    http.get('/blog/search',{title:data}).then(res =>{
                        //因为element ui搜索框中只能把数字中的对象属性value预览出来，所以都加上了value属性
                        for (let i of res.data.data){
                            i.value=i.title
                        }
                        callback(res.data.data)
                    })
                }
            },
            //导航栏点击后出现的数据转动相应的显示
            handleSelect(item){
                this.goShow(item._id)
            },
            //下拉菜单点击后触发的方法 element ui下拉框的钩子 这里的1记得要判断下拉框中设置的是数字类型还是字符串类型
            handleCommand(command){
                if(command==='1'){
                    this.$router.push('/home/editUser')
                }
                if(command==='2'){
                    this.clearUser()
                }
            }
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
        align-items: center;
    }
    #user-show{
        flex: 1 1 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content:flex-end;
        align-items: center;
    }
    .el-dropdown{
        cursor:pointer;
    }
    .search{
        flex: 0 1 200px;
        align-self: center;
    }
    p,.to,.el-dropdown{
        margin-left: 20px;
    }
</style>