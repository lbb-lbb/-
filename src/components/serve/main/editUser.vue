<template>
    <div>
       <el-tabs>
           <el-tab-pane  label="基础信息" >
               <el-form :model="userIntroduction" ref="userIntroduction" :rules="ruleUser" label-width="100px">
                   <el-form-item :key="114" label="头像设置">
                       <el-upload v-if="!this.state" class="upload" action="#"
                                  :before-upload="upFace"
                       >
                           <i  class="el-icon-plus"></i>
                       </el-upload>
                       <img v-else class="upload" :src="userIntroduction.location" alt="face"/>
                   </el-form-item>
                   <el-form-item :key="1" label="昵称" prop="user">
                       <el-input type="text" v-model="userIntroduction.user"
                                 autocomplete="输入昵称" maxlength="7" show-word-limit />
                   </el-form-item>
                   <el-form-item :key="2" label="个人简介">
                       <el-input  type="textarea" v-model="userIntroduction.introduction" autocomplete="你的个人简介"
                                  maxlength="50" show-word-limit/>
                   </el-form-item>
                   <el-form-item :key="6">
                       <el-button type="primary" @click="clearUser">重置</el-button>
                   </el-form-item>
                   <el-form-item :key="11">
                       <el-button type="primary" @click="updateUser">提交</el-button>
                   </el-form-item>
               </el-form>
           </el-tab-pane>
           <el-tab-pane label="高级">
              <el-form :model="pwd" ref="pwd" label-width="100px" :rules="rulePassword">
                  <el-form-item :key="3"  label="旧密码" prop="oldPassword">
                      <el-input clearable show-password  type="password" v-model.number="pwd.oldPassword" autocomplete="你的旧密码" />
                  </el-form-item>
                  <el-form-item :key="4" label="新密码" prop="newPassword">
                      <el-input clearable show-password  type="password" v-model.number="pwd.newPassword" autocomplete="你要设置的新密码" />
                  </el-form-item>
                  <el-form-item :key="5" label="确认密码" prop="checkPassword">
                      <el-input clearable show-password  type="password" v-model.number="pwd.checkPassword" autocomplete="再次输入新密码" />
                  </el-form-item>
                  <el-form-item :key="7">
                      <el-button type="primary" @click="clearPwd">重置</el-button>
                  </el-form-item>
                  <el-form-item :key="12">
                      <el-button type="primary" @click="updatePassword">提交</el-button>
                  </el-form-item>
              </el-form>
           </el-tab-pane>
       </el-tabs>
    </div>
</template>

<script>
    import http from "../../../methods/http";
    import {mapMutations} from 'vuex'
    export default {
        data(){
            //这里是引入element ui表单验证后自定义验证设置的方法，只能设置在data中
            //验证设置中文名的规则
            const checkName=(rule,value,callback)=>{
                let name=/^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/
                if(value&&!name.test(value)){
                    callback(new Error("用户名格式错误，应为中文、英文、数字但不包括下划线等符号"))
                }

                else {
                    callback()
                }
            };
            //验证设置密码的规则
            const checkOldPwd=(rule,value,callback)=>{
                if(!value){
                    callback(new Error('请输入旧密码'))
                }
                else {
                    callback()
                }
            };
            //验证设置密码的规则
            const checkNewPwd=(rule,value,callback)=>{
                if(!value){
                    callback(new Error('请输入新密码'))
                }
                let password = /^[A-Za-z0-9]+$/
                if(!password.test(value)){
                    callback(new Error("仅允许英文字母，数字或者英文数字组合"))
                }
                else {
                    callback()
                }
            };
            //再次验证两次密码是否一致的规则的规则
            const checkSecondPwd=(rule,value,callback)=>{
                if(!value){
                    callback(new Error('请输入再次输入新密码'))
                }
                if(this.pwd.newPassword&&this.pwd.newPassword!==value){
                    callback(new Error('两次输入密码不一致'))
                }
                else {
                    callback()
                }
            };
            return{
                //切换修改密码和修改用户信息的钩子数据
                state:false,
                //昵称与个人简介数据
                userIntroduction:{
                    user:'',
                    introduction:'',
                    location:'',
                },
                //更新密码的数据
                pwd:{
                    oldPassword:'',
                    newPassword:'',
                    checkPassword:''
                },
                //昵称与个人简介数据的验证规则
                ruleUser:{
                    user:[{validator:checkName,trigger:'blur'}]
                },
                //修改密码的验证规则
                rulePassword:{
                    oldPassword:[{validator:checkOldPwd,trigger: 'blur'}],
                    newPassword:[{validator:checkNewPwd,trigger: 'blur'}],
                    checkPassword:[{validator:checkSecondPwd,trigger: 'blur'}]
                }
            }
        },
        methods:{
            ...mapMutations(['setDetail']),
            //更新和编辑个人信息的函数
           updateUser(){
                //该步骤是查询提交时候所有数据是否合格的钩子，element ui中提供
               this.$refs['userIntroduction'].validate(valid =>{
                   if(valid){
                       http.post('/user/updateUser',this.userIntroduction).then(res=>{
                         if(res.data.code===1){
                             //提交后台成功直接调用该钩子函数更新个人信息，达到实时更新的目的
                             this.setDetail(res.data.detail)
                             this.$message({
                                 message:res.data.message,
                                 type:res.data.type
                             })
                         }else{
                             this.$message({
                                 message:res.data.message,
                                 type:res.data.type
                             })
                         }
                       })
                   }
                   else{
                       this.$message({
                           message:'更新个人信息失败',
                           type:'error'
                       })
                   }
               })
           },
            //修改密码的函数
            updatePassword(){
                //同上
                this.$refs['pwd'].validate(valid =>{
                    if(valid){
                        http.post('/user/updatePassword',this.pwd).then(res=>{
                            this.$message({
                                message:res.data.message,
                                type:res.data.type
                            })
            //这里是提交修改密码正确后直接把密码框里面的所有数据清空恢复初始状态，element ui中的钩子
                            if(res.data.code===1){
                                this.$refs['pwd'].resetFields()
                            }
                        })
                    }
                    else{
                        this.$message({
                            message:'更新密码失败',
                            type:'error'
                        })
                    }
                })
            },
            //重置表单
            clearPwd(){
                this.pwd.newPassword=''
                this.pwd.oldPassword=''
                this.pwd.checkPassword=''
            },
            clearUser(){
                this.state=false
               this.userIntroduction.name=''
               this.userIntroduction.introduction=''
            },
            //这是上传图片的函数，通过el-upload中的before-upload钩子，即上传图片之前的操作，我这里直接改成在这个函数上传到服务器并且
            //返回改图片路径，通过data中的state真假来回切换上传头像与实时预览头像的图片框
            upFace(file){
               let form= new FormData
               form.append('head',file)
               // form.append('token',sessionStorage.getItem('token'))
                http.post('/user/head',form).then(res=>{
                    if(res.data.code===1){
                        //实时更新头像的地址，做到实时预览
                        this.userIntroduction.location=res.data.path
                        this.state=true
                    }
                })
            }

        }
    }
</script>

<style scoped>
    .el-form{
        max-width: 350px;
        height: 500px;
    }
    .el-button{
        width: 250px;
    }
    .upload{
        margin-left: 100px;
        height: 50px;
        width: 50px;
        border-radius: 25px;
        display: block;
        border: 1px solid red;
        position: relative;
    }
    .el-icon-plus {
        font-size: 28px;
        color: #8c939d;
        width: 30px;
        height:30px;
        position: absolute;
        right: 10px;
        top:10px
    }
</style>