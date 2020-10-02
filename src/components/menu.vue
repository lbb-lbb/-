<template>
  <div>
    <el-row id="item-show">
      <h3>博客文章列表</h3>
      <el-menu background-color="#2C3E50 ">
        <el-menu-item
          @click="
            get_Id(item._id)
            goShow(item._id)
          "
          v-for="{item,index} in list"
          :key="item._id"
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
import { mapState,mapActions } from "vuex";
export default {
  data() {
    return {
      //选中title时候传递_id值
      id: ""
    };
  },
  computed: {
    ...mapState(["list"])
  },
  methods: {
    ...mapActions(['getList','startDelete','goShow']),
    get_Id(val,index) {
      this.id = val;
      
    },
    goCreate(){
      this.$router.push({path:'/create'})
    },
    open() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
            this.startDelete(this.id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
  mounted() {
     if(this.$store.state.user.name){
         this.getList()
     }
  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  text-align: center;
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
  .el-menu{
    height: 530px;
    overflow-y: scroll;
  }
  h3{
    height: 30px;
    text-align: left;
  }
  .el-button{
    height: 30px;
    width:80px;
    margin: 2px  auto;
  }
</style>
