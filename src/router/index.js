import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/home'
import create from "../components/serve/main/create";
import detail from "../components/serve/main/detail";
import edit from '../components/serve/main/edit'
import editUser from '../components/serve/main/editUser'
import visit from "../views/visit";
import visitList from "../components/tourist/visitList";
import visitRead from "../components/tourist/visitRead";
import leaveMessage from "../components/serve/main/leaveMessage";

Vue.use(VueRouter);

const routes = [
    {
        path: '/home/',
        component: Home,
        children: [
            { path: 'detail', component: detail },
            { path: 'create', component: create },
            { path: 'edit', component: edit },
            {path: 'editUser',component: editUser},
            {path: 'leaveMessage',component: leaveMessage}
        ]
    },
    { path: "/login/", name: 'login', component: Login },
    {path: '//',component: visit,children: [
            {path:'',component: visitList },
            {path: 'read',component: visitRead}
        ]}
];

const router = new VueRouter({
    routes,
    mode: 'history'
});
//这个是解决路由重复点击时报错的设置
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}



export default router