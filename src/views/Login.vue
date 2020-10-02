<template>
    <div>
        <el-form  v-if="state" ref="loginForm" :model="loginForm" status-icon :rules="loginRules" label-width="100px">
            <el-form-item :key="1" label="用户名" prop="name">
                <el-input clearable type="text" v-model="loginForm.name" placeholder="请输入账号"/>
            </el-form-item>
            <el-form-item :key="2" label="密码" prop="password">
                <el-input clearable  type="password" show-password
                          v-model.number="loginForm.password" placeholder="请输入密码"/>
            </el-form-item>
            <el-form-item :key="3">
                <el-button type="primary" @click="startLogin('/login',loginForm)">登陆</el-button>
                <p class="login" title="点击去注册" @click="SwitchState">没有账号？立即注册</p>
            </el-form-item>
        </el-form>
        <el-form   v-else-if="!state" ref="signForm"  :model="signForm" status-icon :rules="signRules" label-width="100px">
            <el-form-item :key="4" label="用户名" prop="name">
                <el-input clearable  type="text" v-model="signForm.name" placeholder="请输入注册账号"/>
            </el-form-item>
            <el-form-item  :key="5" label="密码"  prop="password">
                <el-input clearable show-password  type="password"  v-model.number="signForm.password" placeholder="请输入注册密码"/>
            </el-form-item>
            <el-form-item :key="6"  label="确认密码"  prop="password2">
                <el-input clearable show-password  type="password"  v-model.number="signForm.password2" placeholder="请输入注册密码"/>
            </el-form-item>
            <el-form-item :key="7" label="邮箱" prop="email">
                <el-input clearable  type="email"  v-model="signForm.email" placeholder="请输入注册邮箱"/>
            </el-form-item>
            <el-form-item :key="8">
                <el-button type="primary" @click="startSign('/sign',signForm)">注册</el-button>
                <p class="login" title="点击去登陆" @click="SwitchState">已有账号？立即登陆</p>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    import http from "../methods/http";
   export default {
        components: {},
        data() {
            //写入登陆验证表单的方法
            const checkName=(rule,value,callback)=>{
                if(!value){
                   callback(new Error('请输入登陆账号'))
                }
                else {
                    callback()
                }
            };
            const  checkPassword=(rule,value,callback)=>{
                if(!value){
                     callback(new  Error('密码未曾填写'))
                }else {
                    callback()
                }
            };
            //注册时候验证表单的方法
            const checkSignName=(rule,value,callback)=>{
                if(!value){
                    return  callback(new Error('登陆账号不能为空'))
                }
                let name=/^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/
                if(!name.test(value)){
                    callback(new Error("用户名格式错误，应为中文、英文、数字但不包括下划线等符号"))
                }
                //向服务器查询注册用户名是否已经存在
                if(value){
                    http.post('/name', {name:value}).then(res =>{
                        if(res.data.code===1){
                            callback()
                        }else {
                            callback(new Error('账号已经存在'))
                        }
                    })
                }
            };
            const checkSignPassword=(rule,value,callback)=>{
                if(!value){
                    callback(new Error('密码不能为空'))
                }
                let password = /^[A-Za-z0-9]+$/
                if(!password.test(value)){
                    callback(new Error("仅允许英文字母，数字或者英文数字组合"))
                }
                else {
                    callback()
                }
            };
            const checkSignPassword2=(rule,value,callback)=>{
                if(!value){
                    callback(new Error('请输入确认密码'))
                }
                if(value!==this.signForm.password){
                     callback(new Error('两次输入密码不一致'))
                }
                else {
                    callback()
                }
            } ;
            const checkSignEmail=(rule,value,callback)=>{
                if(!value){
                     callback(new Error('邮箱不能为空'))
                }
                let email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
                if(!email.test(value)){
                    callback(new Error("邮箱格式错误，应为合格邮箱"))
                }
                if(value){
                    http.post('/name', {email:value}).then(res =>{
                        if(res.data.code===1){
                            callback()
                        }else {
                            callback(new Error('该邮箱已经被绑定'))
                        }
                    })
                }
                else {
                    callback()
                }
            };

            return {
                //切换登陆和注册模式的判断符号
                state:true,
                loginForm:{
                    name:'',
                    password:''
                },
                signForm:{
                    name:'',
                    password:'',
                    password2:'',
                    email:'',
                },
                //验证注册表单的方法
               signRules:{
                    name:[{validator:checkSignName,trigger:'blur'}],
                    password:[{validator:checkSignPassword,trigger:'blur'}],
                    password2:[{validator:checkSignPassword2,trigger:'blur'}],
                    email:[{validator:checkSignEmail,trigger:'blur'}]
                },
                //验证登陆表单的方法
                loginRules:{
                    name:[{validator:checkName,trigger:'blur'}],
                    password:[{validator:checkPassword,trigger:'blur'}]
                }
            };
        },
        computed: {},
        methods: {
            ...mapMutations(['setUser']),
            //切换登陆注册的方法顺便切换时重置表单里面输入的信息
            SwitchState(){
              if(this.state){
                  this.$refs['loginForm'].resetFields()
                  this.state=!this.state
              }else {
                  this.$refs['signForm'].resetFields()
                  this.state=!this.state
              }
            },
            //注册方法
            startSign(url,data){
               this.$refs['signForm'].validate(valid =>{
                   if(valid){
                       http.post(url,data).then(res =>{
                           if(res.data.code===1){
                               setTimeout(()=>{
                                   this.state=!this.state
                               },1000)
                               this.$refs['signForm'].resetFields()
                               this.$message({
                                   message:res.data.message+'将为你转到登陆页面',
                                   type:'success'
                               })
                           }else{
                               this.$message({
                                   message:res.data.message,
                                   type:'error'
                               })
                           }
                       })
                   } else {
                       this.$message({
                           message:'提交注册失败',
                           type:'error'
                       })
                   }
               })
            },
            //登陆的方法
            startLogin(url,data){
               this.$refs['loginForm'].validate(valid =>{
                   if(valid){
                       http.post(url,data).then(res =>{
                           if(res.data.code===1){
                               console.log(res)
                               this.setUser(res.data.user)
                               sessionStorage.setItem('token',res.data.token)
                               console.log(sessionStorage.getItem('token'))
                               setTimeout(()=>{
                                   this.$router.push({path:'/'})
                               },1000)
                               this.$refs['loginForm'].resetFields()
                               this.$message({
                                   message:'登陆成功，将为你转到主页面',
                                   type:'success'
                               })
                           }else {
                               this.$message({
                                   message:res.data.message,
                                   type:'error'
                               })
                           }
                       })
                   }else {
                       this.$message({
                           message:'提交失败',
                           type:'error'
                       })
                   }
               })
            }
        },
        mounted() {}
    };
</script>

<style scoped>
.el-form{
    margin: 100px auto;
    width: 500px;
    height: 500px;
}
.el-button{
    width: 400px;
}
    p{
        color: dodgerblue;
    }
    p:hover{
        color: rgba(255,23,33,0.63);
    }
</style>