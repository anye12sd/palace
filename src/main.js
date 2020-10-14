import Vue from 'vue'
import App from './App.vue'
import router from './router'

//引入全局css
import './assets/css/main.css'
import './assets/css/reset.css'
import 'swiper/dist/css/swiper.min.css'

Vue.config.productionTip = false

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

new Vue({
  el: '#app',
  render: h => h(App),
  router,
})