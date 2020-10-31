<template>
    <div class="out">
        <div class="header-nav-box flex flexWrap">
            <router-link tag="div" :to="{ path: '/' }" class="header-nav-logo">
                <img :src="img_path + foot.head_logo" alt="">
                <div ></div>
            </router-link>
<!--            <div class="header-nav-ul" @click="getNewsId">-->
            <div class="header-nav-ul" @click="getNewsId">
                <ul class="nav-ul flex">
                    <router-link tag="li" :to="{ path: '/' }" :class="{active: istrue == 0}">
                        <span>文化馆首页</span>
                    </router-link>
                    <router-link tag="li" :to="{ path: 'trends', query: {news_id: 17} }" :class="{active: istrue == 1}">
                        <span>文化动态</span>
                        <div class="list-select">
                            <router-link tag="div" :to="{ path: 'trends', query: {news_id: 22} }">文化馆公告</router-link>
                            <router-link tag="div" :to="{ path: 'trends', query: {news_id: 23} }">本地新闻</router-link>
                        </div>
                    </router-link>
                    <router-link tag="li" :to="{ path: 'activity', query: {news_id: 18} }"
                                 :class="{active: istrue == 2}">
                        <span>文化活动</span>
                        <div class="list-select">
                            <router-link tag="div" :to="{ path: 'activity', query: {news_id: 24} }">活动视频</router-link>
                        </div>
                    </router-link>
                    <router-link tag="li" :to="{ path: 'grid', query: {news_id: 19} }" :class="{active: istrue == 3}">
                        <span>文化网格</span>
                        <div class="list-select">
                            <router-link tag="div" :to="{ path: 'grid', query: {news_id: 25} }">线上培训</router-link>
                            <router-link tag="div" :to="{ path: 'grid', query: {news_id: 26} }">线下培训</router-link>
                        </div>
                    </router-link>
                    <router-link tag="li" :to="{ path: 'live', query: {news_id: 20} }" :class="{active: istrue == 4}">
                        <span>文化直播</span>
                        <div class="list-select">
                        </div>
                    </router-link>
                    <router-link tag="li" :to="{ path: 'showroom', query: {news_id: 21} }"
                                 :class="{active: istrue == 5}">
                        <span>数字展厅</span>
                        <div class="list-select">
                            <router-link tag="div" :to="{ path: 'showroom', query: {news_id: 27} }">场馆展示</router-link>
                        </div>
                    </router-link>
                    <router-link tag="li" :to="{ path: 'contact', query: {news_id: 0} }" :class="{active: istrue == 6}">
                        <span>联系我们</span>
                    </router-link>
                    <li class="search-icon" @click="showSearchBar">
                        <a-icon v-if="showBar" type="search"/>
                        <a-icon v-else type="close"/>
                    </li>
                </ul>
                <div class="search-bar">
                    <a-input placeholder="请输入搜索内容" v-model="search" @pressEnter="searchContent"/>
                    <div class="search-bar-search-btn" @click="searchContent">搜索</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'

    export default {
        name: "HeaderNav",
        props: {
            'istrue': {
                type: String,
                default: "0"
            }
        },
        data() {
            return {
                menu: "",
                search: "",
                showBar: true,
                img_path: "",
                foot: ""
            }
        },
        mounted() {
            this.fetch()
        },
        methods: {
            fetch() {
                if (sessionStorage.getItem("menu") == null || sessionStorage.getItem("imgPath") == null || sessionStorage.getItem("foot") == null) {
                    this.$api.getNewsBase()
                        .then((data) => {
                            if (data.data.code == 0 && data.data.msg == "success") {
                                console.log(data)
                                sessionStorage.setItem("menu", JSON.stringify(data.data.data.menu))
                                sessionStorage.setItem("imgPath", JSON.stringify(data.data.data.img_path))
                                this.menu = data.data.data.menu
                                this.img_path = data.data.data.img_path
                                this.foot = data.data.data.foot
                                sessionStorage.setItem("foot", JSON.stringify(data.data.data.foot))
                                sessionStorage.setItem("imgPath", JSON.stringify(data.data.data.img_path))
                            } else {
                                this.$message.error(data.data.msg)
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                } else {
                    this.foot = JSON.parse(sessionStorage.getItem("foot"))
                    this.menu = JSON.parse(sessionStorage.getItem("menu"))
                    this.img_path = JSON.parse(sessionStorage.getItem("imgPath"))
                }
            },
            getNewsId: function () {
                this.$emit("newsId", this.$route.query.news_id)
            },
            showSearchBar(){
                this.showBar = !this.showBar
                $(".search-bar").fadeToggle()
            },
            searchContent(){
                this.$router.push({ path: "searchList" , query:{text: this.search}})
            }
        }
    }
</script>

<style scoped>
    @import "../assets/css/swiper.css";
</style>