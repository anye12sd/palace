import Vue from 'vue'
import App from './App.vue'
import router from './router'
import api from './api/index'
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

import {
    message,Modal, Button, Tabs, Icon, Input, Select, DatePicker
} from 'ant-design-vue'
Vue.use(Modal).use(Button).use(Tabs).use(Icon).use(Input).use(Select).use(DatePicker)

//引入全局css
import 'ant-design-vue/dist/antd.css'
import './assets/css/main.css'
import './assets/css/reset.css'
import 'swiper/dist/css/swiper.min.css'

Vue.config.productionTip = false
Vue.prototype.$message = message;
Vue.prototype.$api = api;

// 引入全局组件
import HeaderNav from "./components/HeaderNav";
Vue.component('HeaderNav', HeaderNav)
import Footer from "./components/Footer";
Vue.component('Footer', Footer)
import Banner from "./components/Banner";
Vue.component('Banner', Banner)
import CategoryList from "./components/CategoryList";
Vue.component('CategoryList', CategoryList)
import Pager from "./components/Pager";
Vue.component('Pager', Pager)

router.beforeEach((to, from, next) => {
  window.scrollTo(0,0)
// chrome
  document.body.scrollTop = 0
// firefox
  document.documentElement.scrollTop = 0
// safari
  window.pageYOffset = 0
  next()
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
})