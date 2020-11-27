import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Home = () => import(/* webpackChunkName: "Home" */ '@/views/Home.vue')
const Trends = () => import(/* webpackChunkName: "Trends" */ '@/views/Trends.vue')
const Activity = () => import(/* webpackChunkName: "Activity" */ '@/views/Activity.vue')
const Grid = () => import(/* webpackChunkName: "Grid" */ '@/views/Grid.vue')
const Live = () => import(/* webpackChunkName: "Live" */ '@/views/Live.vue')
const ShowRoom = () => import(/* webpackChunkName: "ShowRoom" */ '@/views/ShowRoom.vue')
const Contact = () => import(/* webpackChunkName: "Contact" */ '@/views/Contact.vue')
const NewsDetail = () => import(/* webpackChunkName: "NewsDetail" */ '@/views/NewsDetail.vue')
const Enroll = () => import(/* webpackChunkName: "Enroll" */ '@/views/Enroll.vue')
const SearchList = () => import(/* webpackChunkName: "Contact" */ '@/views/SearchList.vue')

export default new Router({
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home,
            meta: {
                title: "永康市文化馆"
            }
        },
        {
            path: "/trends",
            name: "Trends",
            component: Trends,
            meta: {
                title: "文化动态"
            }
        },
        {
            path: "/activity",
            name: "Activity",
            component: Activity,
            meta: {
                title: "文化活动"
            }
        },
        {
            path: "/grid",
            name: "Grid",
            component: Grid,
            meta: {
                title: "文化普及"
            }
        },
        {
            path: "/live",
            name: "Live",
            component: Live,
            meta: {
                title: "文化直播"
            }
        },
        {
            path: "/showroom",
            name: "ShowRoom",
            component: ShowRoom,
            meta: {
                title: "数字展厅"
            }
        },
        {
            path: "/contact",
            name: "Contact",
            component: Contact,
            meta: {
                title: "联系我们"
            }
        },
        {
            path: "/newsDetail",
            name: "NewsDetail",
            component: NewsDetail,
            meta: {
                title: "详情"
            }
        },
        {
            path: "/enroll",
            name: "Enroll",
            component: Enroll,
            meta: {
                title: "报名"
            }
        },
        {
            path: "/searchList",
            name: "SearchList",
            component: SearchList,
            meta: {
                title: "搜索列表"
            }
        },
    ]
})