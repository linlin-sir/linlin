import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Detail from "@/views/Detail";
import Layout from "@/views/Layout";
import Like from "@/views/Like";
import Article from "@/views/Article";
import Collect from "@/views/Collect";
import User from "@/views/User";
import { getToken } from "@/utils/storage";
Vue.use(VueRouter);
const router = new VueRouter({
    routes: [
        { path: "/login", component: Login },
        { path: "/register", component: Register },
        { path: "/detail/:id", component: Detail },
        {
            path: "/",
            component: Layout,
            redirect: "/article",
            children: [
                { path: "article", component: Article },
                { path: "like", component: Like },
                { path: "collect", component: Collect },
                { path: "user", component: User },
            ],
        },
    ],
});
const whiteList = ['/login', '/register'];
router.beforeEach(
    (to, from, next) => {
        const token = getToken();
        if (token||whiteList.includes(to.path)) {
            next();
        } else {
            next('/login')
        }
    }
)
export default router;

