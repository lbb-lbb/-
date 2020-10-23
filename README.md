# 技术栈
## 前端
前端主要使用vue全家桶加element ui和flex布局移动端适配，配合axios与后台沟通
## 后端
后端主要使用koa2框架结合mongodb数据库，使用nginx反向代理与前端沟通
# 博客前台展示
博客阅读  
![前台pc端.png](http://47.97.60.54:3000/paper/前台pc端.png)
博客列表  
![前台pc端2.png](http://47.97.60.54:3000/paper/前台pc端2.png)
# 博客后台展示
后台pc端  
![后台pc端.png](http://47.97.60.54:3000/paper/后台pc端.png)
后台移动端  
![后台移动端.png](http://47.97.60.54:3000/paper/后台移动端.png)
# 项目地址
博客线上地址（域名审核没下来）：[博客线上地址](http://47.97.60.54:3000)  
github:[github传送门](https://github.com/lbb-lbb/bulid-bingo)  
# 项目起源
由于我是非科班，属于在校自学前端，断断续续学了差不多一年，临找工作前苦于找不到项目。一方面为了加强自己对前端的理解，知识的掌握程度，另外一方面是为了有点属于自己的dome，故此选择做这个属于我自己的博客。整个博客搭建的前后台以及与数据库的使用，阿里云服务器的上线部署都是自己慢慢搭建起来的。
# 博客技术分享
## 博客构建的路由构思
### 前台路由
![博客前端路由.png](http://47.97.60.54:3000/paper/博客前端路由.png)
### 后台路由
![koa2路由 2.png](http://47.97.60.54:3000/paper/koa2路由(2).png)
后台路由中小红旗标记的路由是不需要token令牌验证的
## 前台目录
        |---src
            |---methods                     //封装一些常用的方法，以及封装axios
                |---common.js                   //封装了sessionStorage,localStorage的存取，以及防抖节流函数
                |---http.js                     //封装了axios的请求方式（get请求和post请求）
                |---request.js                  //封装了axios请求和响应拦截器，全局使用element ui的Message模块进行提醒
            |---components                  //存放前端组件
                |---serve                   //后台vue组件
                    |---main
                        |---create.vue          //创建新文章的组件
                        |---detail.vue          //展示博客文章的组件
                        |---edit.vue            //编辑博客文章的组件
                        |---editUser.vue        //修改个人信息，头像，密码的组件
                        |---leaveMessage        //评论管理的组件            
                    |---menu
                        |---menu.vue            //侧栏菜单的组件
                        |---userDetail          //个人信息展示组件
                    |---top
                        |---header.vue      //头部展示组件
                |---tourist                 //前台vue组件
                    |---visitList.vue           //前台博客列表展示组件
                    |---visitRead.vue           //前台博客文章展示组件
                |---comment.vue             //评论组件
            |---plugins                     //element ui 插件的引入
            |---router                      //路由
                |---index.js
            |---store                       //vuex数据 
                |---index.js
            |---views                       //视图模块 
                |---home.vue                //后台视图组件，一级路由渲染
                |---Login.vue               //登陆注册视图组件，一级路由渲染
                |---visit.vue               //前台视图组件
            |---App.vue                     //路由根渲染组件 
            |---element-variables.scss      //element ui的原始样式 
            |---github-markdown.css         //这是markdown语法的css文件
            |---main.js                     //创建vue实例的js文件  
## 后台目录

# 项目中踩的一些坑
# 项目待上线|改进功能
