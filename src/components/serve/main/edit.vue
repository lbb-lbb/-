<template>
    <div id="edit">
        <el-row>
            <el-input type="textarea" placeholder="请输入标题"
              show-word-limit maxlength="50" v-model="bingo.title" ></el-input>
        </el-row>
        <el-row>
            <el-input type="textarea" placeholder="请输入摘要"
                      autosize v-model="bingo.introduce" ></el-input>
        </el-row>
        <div class="edit"><mavon-editor class="show" ref="mavonEditor" @imgAdd="imgAdd" @imgDel="imgDel"  v-model="bingo.main" /></div>
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
    import {throttle} from "../../../methods/common";
    import {mapActions} from 'vuex'
    import http from "../../../methods/http";
    export default {
        components: {
        },
        data(){
            return{
                bingo:{
                    _id:'',
                    name:'',
                    title:"",
                    introduce: '',
                    main:""
                },
            }
        },
        computed:{

        },
        methods:{
            //从vuex中导入编辑后提交的函数
          ...mapActions(['goUpdate']),
            //编辑后节流提交
            use:throttle(function () {
                this.goUpdate(this.bingo)
                new FormData()
            },300),
            //********************************
            //这里是使用插件mavon-editor的方法
            //该函数与插件上传图片钩子钩子，上传图片到服务器保存成功后返回该图片的保存路径，让其可以实时预览
            imgAdd(pos,$file){
              //上传图片需要使用表单提交的方式，这里使用FormData模拟，注意要设置请求头为表单的请求头，这里使用axios封装后不用设置请求头
              //axios会识别自动设置请求头，只用在拦截器上加上token令牌验证就好了
                const formData = new FormData()
                formData.append('image',$file)
                http.post('/blog/image',formData).then(res =>{
              //这里是在编辑器中返回图片路径实时预览的钩子函数$img2Url
                    this.$refs['mavonEditor'].$img2Url(pos,res.data.path)
                })
            },
            //该钩子函数是删除上传的图片的，但是只是在编辑器中删除该图片。服务器没有
            //我这里通过其pos实参传递给后台服务器顺便把服务器上的图片删除，可以打印pos看看需要哪些信息传递给koa后台
            imgDel(pos){
             http.post('/blog/deleteImg',{name:pos[1].name}).then(res=>{
                 this.$message({
                     message:res.data.message,
                     type:res.data.type
                 })
             })
            }
        },
        //在没有渲染dom时候就把数据更新号
        created(){
            this.bingo=this.$store.state.bingo.data
        },
    }
</script>

<style>
    *{
        margin: 0;
        padding: 0;
    }
    .edit{
        display: flex;
    }
    .edit .show{
        box-sizing: border-box;
        flex: 1 1 375px;
        width: 350px !important;
        z-index: 1;
    }

</style>