<template>
  <div>
    <el-row id="item-show">
      <el-autocomplete v-if="!this.$store.state.search" class="search" v-model="data"
                       :fetch-suggestions="search"
                       @select="handleSelect"
                       placeholder="请输入搜索标题"
                       prefix-icon="el-icon-search"/>
      <userDetail/>
      <h3>博客文章列表</h3>
      <el-menu background-color="#2C3E50 ">
        <el-menu-item
          @click="
            get_Id(item._id)
            goShow(item._id)
          "
          v-for="item in list"
          :key="item._id"
          :title="item.title "
          >{{ item.title }}</el-menu-item>
       <el-menu-item v-if="!list">你还没有创作哦</el-menu-item>
      </el-menu>
    </el-row>
    <el-row >
      <el-col>
        <el-button class="el-icon-delete" type="primary" @click="open">删除</el-button>
        <el-button  @click="goCreate" type="primary" class="el-icon-edit"
          >创作
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import http from "../../../methods/http";
    import userDetail from "./userDetail";
    import { mapState,mapActions } from "vuex";
export default {
    components:{
      //挂载用户详情的组件
        userDetail
    },
  data() {
    return {
      //选中title时候传递_id值
      id: "",
      data:''
    };
  },
  computed: {
    ...mapState(["list"])
  },
  methods: {
    ...mapActions(['getList','startDelete','goShow']),
    //该钩子函数是在列表中点击篇文章，就把该id值传递过来，好让识别是那篇文章需要预览、删除
    get_Id(val) {
      this.id = val
    },
    //跳往创作路由的钩子函数
    goCreate(){
      this.$router.push({path:'/home/create'})
    },
    //element ui钩子，在删除时候再次确认是否删除
    open() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center:true
      }).then(() => {
        //确认删除后调用该钩子函数删除该文章
            this.startDelete(this.id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
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
  },
  //如果验证用户已经登陆，那么就调用该钩子函数获取文章列表排列出来
  mounted() {
     if(this.$store.state.user.name){
         this.getList()
     }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  text-align: center;
  background-color: white;
  width: 200px;
}
  .el-menu{
    height: 360px;
    width: 200px;
    background-color: white !important;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  h3{
    height: 30px;
    text-align: left;
  }
  .el-button{
    height: 30px;
    width: 80px;
    margin: 2px  auto;
  }
.el-menu-item {
  background-color: white !important
}
.el-menu-item.is-active:hover {
  background-color: red !important;
}
::-webkit-scrollbar {
  width:1px;
}
::-webkit-scrollbar-thumb {
  background-color:#606d71;
  background-clip:padding-box;
  height: 20px;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius:2em;
}
::-webkit-scrollbar-thumb:hover {
  background-color:crimson;
}
</style>
