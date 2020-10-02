<template>
  <div id="main">
    <div id="introduction">
      <h3 v-if="bingo.data">{{ bingo.data.title }}</h3>
      <div v-if="bingo.data">作者：{{bingo.data.name}}</div>
      <div v-if="bingo.data">发布时间</div>
      <div v-if="bingo.data">最后一次修改时间</div>
      <div v-if="bingo.data">查看<i class="el-icon-view el-icon--right"></i></div>
      <div v-if="bingo.data">点赞<i class="el-icon-view el-icon--right"></i></div>
      <el-button v-if="bingo.data" type="primary" @click="edit" class=" el-icon-user"
      >编辑
      </el-button>
      <h2 v-else>请点击左进行标题浏览</h2>
    </div>
    <div id="content" v-html="main"></div>
  </div>
</template>

<script>
import marked from "marked";
import { mapState } from "vuex";
export default {
  data() {
    return {
      main: ""
    };
  },
  computed: {
    ...mapState(["bingo"]),
  },
   methods:{
     edit(){
         this.$router.push('/edit')
     }
   },
  //watch：如果bingo数据发生变化，那么watch里面的bingo函数就会运行，进而改变this.main
  watch: {
    bingo: function() {
      if(this.bingo.data){
        this.main = marked(this.bingo.data.main)
      }
      else {
        this.main='您还为未选择需要浏览的文章，请在左侧选择'
      }
    }
  },
    created() {
         if(this.bingo.data){
           this.main = marked(this.bingo.data.main)
         }
         else {
           this.main='您还为未选择需要浏览的文章，请在左侧选择'
         }
    }
};
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  #main{
    box-sizing: border-box;
  }
  ::-webkit-scrollbar {
    width:6px;
  }
  ::-webkit-scrollbar-thumb {
    background-color:#606d71;
    background-clip:padding-box;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius:2em;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color:red;
  }
  #introduction{
    height: 100px;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
  }

  #introduction h3{
    box-sizing: border-box;
    width: 100%;
    text-align: left;
    padding-left: 20px;
    padding-top: 10px;
  }
  #introduction div{
    padding-left: 20px;
  }
  #introduction .el-button{
    height: 30px;
    width: 80px;
    margin-left: 50px;

  }
  h2{
    text-align: center;
    margin: 20px  auto;
  }
  #content{
    box-sizing: border-box;
    height: 500px;
    overflow: scroll;
    border: white solid 2px;
    padding: 10px;
  }
</style>
