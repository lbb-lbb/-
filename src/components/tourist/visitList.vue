<template>
    <div id="main">
        <div class="list" v-for="item in data" :key="item._id">
            <h2 class="goRead" @click=" getArticle(item._id)">{{item.title}}</h2>
            <div class="layout">{{item.oldTime}}</div>
            <div>{{item.introduce}}</div>
            <div class="goRead" @click="getArticle(item._id)">继续阅读...</div>
        </div>
        <div class="pagination">
            <el-pagination
                    @current-change="handleCurrentChange"
                    layout="prev, pager, next"
                    :page-count="this.$store.state.visitList.pages"
                    :page-size="size"
                    :current-page=current
                    background
            >
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import {mapActions,mapState} from 'vuex'
    import {setSessionStorage,getSessionStorage} from "../../methods/common";

    export default {
        data(){
            return{
                size:5,
                current:getSessionStorage('page')?getSessionStorage('page'):1
            }
        },
        computed:{
          ...mapState(['visitList']),
            data:function () {
              //使用这个if-else逻辑可以防止刷新后vuex重新获取时候子组件中mounted无法获取到
              //数据错误，从而return的数据不是一个数组而无法使用slice报错
                if(this.visitList.data){
                    return this.visitList.data.slice((this.current-1)*this.size,this.size*this.current)
                }
                else{
                    return []
                }
            }

        },
        methods:{
            ...mapActions(['getVisitList','getArticle']),
            //当点击上下页数时候把当前页数传递出来的钩子函数，从而知道该渲染那一页数据
            handleCurrentChange(val) {
                //先把页数存在SessionState中，然后网页回退时候能保证不会返回到第一页
                setSessionStorage('page',val)
                this.current = val;
            },
        },
        created() {
            //清除掉sessionState中的page，防止重新加载时候会进入到上一次
            //浏览时的页数,设置计时器是为了防止vuex数据刷新后没来得及
            setTimeout(()=>{
                sessionStorage.removeItem('page')
                this.getVisitList()
            },100)

        }
    }
</script>

<style scoped>
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    .list{
        margin-bottom: 20px;
        margin-left: 15px;
    }
    .layout{
        margin-bottom: 15px;
    }
    .pagination{
        position: relative;
    }
    .el-pagination{
        position: absolute;
        left: 50%;
        transform: translate(-50%);
    }
    .goRead{
        cursor:pointer;
    }
    .goRead:hover{
        color: #005cc5;
    }
</style>