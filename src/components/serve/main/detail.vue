<template>
  <div id="main">
    <div id="introduction">
      <h3 v-if="bingo.data">标题：{{ bingo.data?bingo.data.title:'' }}</h3>
      <div class="user">
        <div v-if="bingo.data">发布时间:<span>{{bingo.data?bingo.data.oldTime:''}}</span></div>
        <div v-if="bingo.data">最近修改时间:<span>{{bingo.data?bingo.data.newTime:''}}</span></div>
      </div>
      <div class="edit">
        <span v-if="bingo.data" class="name">作者:{{this.$store.state.detail.user?this.$store.state.detail.user:bingo.data.name}}</span>
        <span v-if="bingo.data">查看<i class="el-icon-view el-icon--right">(  )</i></span>
        <span v-if="bingo.data">点赞<i class="el-icon-view el-icon--right">( {{bingo.data.like}} )</i></span>
        <span v-if="bingo.data" class="linkColor" @click="edit">编辑<i class="el-icon-edit el-icon--right"></i></span>
        <h2 v-else>请点击左侧菜单键选择文章浏览</h2>
      </div>
    </div>
    <div class="introduce">摘要: {{bingo.data.introduce}}</div>
    <div class="markdown-body"  v-html="main"></div>
    <comment v-if="bingo.data" :_id="bingo.data._id" :name="bingo.data.name" class="comment" />
  </div>
</template>
<script>
import comment from "../../comment"
import marked from "marked";
import { mapState } from "vuex";
export default {
  components:{
    comment
  },
  data() {
    return {
      main: ""
    };
  },
  computed: {
    ...mapState(["bingo"]),
  },
   methods:{
    //点击编辑按钮跳转到二级路由/edit编辑
     edit(){
         this.$router.push('/home/edit')
        // this.mavonEditor.markdownIt.set({fullScreen:false})
     }
   },
  //watch：如果bingo数据发生变化，那么watch里面的bingo函数就会运行，进而改变this.main
  watch: {
    bingo: function() {
      if(this.bingo.data){
        this.main = marked(this.bingo.data.main)
      }
      else {
        this.main='您还为未选择需要浏览的文章，请在左侧菜单选择'
      }
    }
  },
  //使用credted的原因是要在vue数据没渲染在dom上面时候就改变数据，这里与watch配合完成变化时候数据做到变化
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
  /************************************
  这里导入了外部css样式去排版从后台中传来的html数据*/
@import "../../../github-markdown.css";
  *{
    margin: 0;
    padding: 0;
  }
  #main{
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    padding-left: 15px;
  }
  #introduction{
    font-size: 14px;
    flex: 0 0 100%;
    height: 100px;
    text-align: center;
  }
  #introduction h3{
    box-sizing: border-box;
    flex: 0 0 100%;
    text-align: left;
    padding-top: 10px;
  }
  #introduction .user div{
    text-align: left;
  }
  #introduction .edit{
    flex: 0 0 100%;
    display: flex;
    justify-items:flex-start;
  }
  #introduction div{
    flex: 1 1 auto;
  }
  #introduction div span{
    font-size: 14px;
    margin-left: 10px;
  }
  #introduction div .name{
    margin-left: 0;
  }
  .introduce{
    flex: 1 1 1000px ;
  }
  h2{
    text-align: center;
    margin: 20px  auto;
  }
  .markdown-body{
    box-sizing: border-box;
    flex: 1 1 375px;
    width: 350px !important;
  }
  .comment{
    margin-top: 30px;
    flex: 1 1 700px ;
    box-sizing: border-box;
    border-top: 1px dotted #000;
  }
  .linkColor:hover{
    color: crimson;
    cursor:pointer;
  }
</style>
