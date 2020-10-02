import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/home'
import create from "../components/create";
import detail from "../components/detail";
import edit from '../components/edit'



Vue.use(VueRouter);

const routes = [
    {path:'//',component:Home,
        children:[
            {path:'detail',component:detail},
            {path: 'create',component: create},
            {path: 'edit',component: edit}
        ]},
    {path:"/login",name:'login',component:Login}
];

const router = new VueRouter({
    routes,
    mode:'history'
});
//这个是解决路由重复点击时报错的设置
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}



export default router