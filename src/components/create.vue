<template>
   <div>
       <el-row>
           <el-input type="textarea" placeholder="请输入标题"
                     show-word-limit maxlength="50" v-model="bingo.title" ></el-input>
       </el-row>
          <mavon-editor id="show" v-model="bingo.main" />
          <el-row>
              <el-col>
                  <el-button type="primary" class="el-icon-edit"
                  >清空</el-button>
                  <el-button type="primary" @click="use"
                             class="el-icon-edit">提交</el-button>
              </el-col>
          </el-row>
   </div>
</template>

<script>
   import {throttle} from "../common";
   import {mapActions} from 'vuex'
    export default {
        components: {
           // VueSimplemde
        },
        data(){
            return{
                bingo:{
                    name:'',
                    title:"",
                    main:""
                },
            }
        },
        computed:{

        },
        methods:{
            ...mapActions(['submit']),
            //使用节流函数去提交数据，防止请求频繁
            use:throttle(function(){
                this.submit(this.bingo)
            },300)
        }
    }
</script>

<style>
    *{
        margin: 0;
        padding: 0;
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
    #show{
         box-sizing: border-box;
         height: 500px;
     }
    .el-button{

    }


</style>