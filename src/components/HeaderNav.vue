<template>
    <div class="out">
        <div class="header-nav-mask" @click="hideMenu"></div>
        <div class="header-nav-box flex flexWrap" @click="hideMenu">
            <router-link tag="div" :to="{ path: '/' }" class="header-nav-logo">
                <img :src="img_path + foot.head_logo">
            </router-link>
<!--            手机端导航条控制按钮-->
            <div v-if="isMobile" class="header-nav-menu-box flex-1">
                <template v-if="showSearchIcon">
                    <div @click.stop="showSearchBar">
                        <a-icon v-if="showBar" type="search" class="header-nav-menu-icon" />
                        <a-icon v-else type="close" class="header-nav-menu-icon" />
                    </div>
                </template>
                <div class="header-nav-menu-icon-box" v-if="showBar">
                    <a-icon v-if="showSearchIcon" type="menu" class="header-nav-menu-icon" @click.stop="showMobileNav"/>
                    <a-icon v-else type="close" class="header-nav-menu-icon" @click.stop="hideMobileNav"/>
                </div>
            </div>
<!--            <div class="header-nav-ul" @click="getNewsId">-->
<!--            导航条手机端移动端通用-->
            <div class="header-nav-ul" @click="getNewsId">
                <ul class="nav-ul" :class="{'flex': !isMobile, 'nav-ul-position': isMobile}">
                    <router-link tag="li" :to="{ path: '/' }" :class="{active: istrue == 0}">
                        <span>文化馆首页</span>
                    </router-link>
                    <router-link tag="li" :to="{ path: 'trends', query: {news_id: 17} }" :class="{active: istrue == 17}">
                        <span>文化动态</span>
                        <div v-if="isMobile" class="header-nav-ul-li-menu" @click.stop="showMenu"></div>
                        <div :class="{'list-select': !isMobile, 'list-select-mobile': isMobile}">
                            <router-link tag="div" :to="{ path: 'trends', query: {news_id: 22} }">文化馆公告</router-link>
                            <router-link tag="div" :to="{ path: 'trends', query: {news_id: 23} }">本地新闻</router-link>
                        </div>
                    </router-link>
                    <router-link tag="li" :to="{ path: 'activity', query: {news_id: 18} }"
                                 :class="{active: istrue == 18}">
                        <span>文化活动</span>
                        <div v-if="isMobile" class="header-nav-ul-li-menu" @click.stop="showMenu"></div>
                        <div :class="{'list-select': !isMobile, 'list-select-mobile': isMobile}">
                            <router-link tag="div" :to="{ path: 'activity', query: {news_id: 24} }">活动视频</router-link>
                        </div>
                    </router-link>
                    <router-link tag="li" :to="{ path: 'grid', query: {news_id: 19} }" :class="{active: istrue == 19}">
                        <span>文化网格</span>
                        <div v-if="isMobile" class="header-nav-ul-li-menu" @click.stop="showMenu"></div>
                        <div :class="{'list-select': !isMobile, 'list-select-mobile': isMobile}">
                            <router-link tag="div" :to="{ path: 'grid', query: {news_id: 25} }">线上培训</router-link>
                            <router-link tag="div" :to="{ path: 'grid', query: {news_id: 26} }">线下培训</router-link>
                        </div>
                    </router-link>
                    <router-link tag="li" :to="{ path: 'live', query: {news_id: 20} }" :class="{active: istrue == 20}">
                        <span>文化直播</span>
<!--                        <div v-if="isMobile" class="header-nav-ul-li-menu"></div>-->
<!--                        <div class="list-select">-->
<!--                        </div>-->
                    </router-link>
                    <router-link tag="li" :to="{ path: 'showroom', query: {news_id: 21} }"
                                 :class="{active: istrue == 21}">
                        <span>数字展厅</span>
<!--                        <div v-if="isMobile" class="header-nav-ul-li-menu" @click.stop="showMenu"></div>-->
<!--                        <div class="list-select">-->
<!--                            <router-link tag="div" :to="{ path: 'showroom', query: {news_id: 27} }">场馆展示</router-link>-->
<!--                        </div>-->
                    </router-link>
                    <router-link tag="li" :to="{ path: 'contact', query: {news_id: 0} }" :class="{active: istrue == 6}">
                        <span>联系我们</span>
<!--                        <div v-if="isMobile" class="header-nav-ul-li-menu"></div>-->
<!--                        <div class="list-select">-->
<!--                        </div>-->
                    </router-link>
                    <li v-if="!isMobile" class="search-icon" @click.stop="showSearchBar">
                        <a-icon v-if="showBar" type="search"/>
                        <a-icon v-else type="close"/>
                    </li>
                </ul>
                <div v-if="!isMobile" class="search-bar" @click.stop="a" >
<!--                    <div class="search-text">搜索</div>-->
                    <a-input placeholder="请输入搜索内容" v-model="search" @pressEnter="searchContent"/>
                    <div class="search-bar-search-btn" @click="searchContent">搜索</div>
                </div>
            </div>
            <div v-if="isMobile" class="search-bar" @click.stop="a">
                <a-input placeholder="请输入搜索内容" v-model="search" @pressEnter="searchContent"/>
                <div class="search-bar-search-btn" @click="searchContent">搜索</div>
            </div>
        </div>
    </div>
</template>

<script>
    // import $ from 'jquery'

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
                foot: "",
                showSearchIcon: true,
                isMobile: false
            }
        },
        mounted() {
            this.fetch()
            if(document.body.clientWidth <= 768){
                this.isMobile = true
            }
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
                $(".header-nav-mask").slideToggle()
            },
            searchContent(){
                this.showBar = !this.showBar
                $(".search-bar").fadeToggle()
                this.$router.push({ path: "searchList" , query:{text: this.search}})
                this.search = ""
            },
            showMobileNav(){
                this.showSearchIcon = false
                $(".nav-ul-position").slideToggle()
                $(".header-nav-mask").fadeToggle()
            },
            hideMobileNav(){
                this.showSearchIcon = true
                $(".nav-ul-position").slideToggle()
                $(".header-nav-mask").fadeToggle()
            },
            showMenu(e){
                // this.showSearchIcon = true
                $(e.target).toggleClass("header-nav-ul-li-select")
                $(e.target).next().slideToggle()
                // if($(e.target).hasClass("header-nav-ul-li-select")){
                //     $(e.target).removeClass("header-nav-ul-li-select")
                //     $(e.target).next().slideUp()
                // }else{
                //     $(e.target).addClass("header-nav-ul-li-select")
                //     $(e.target).next().slideDown()
                // }
            },
            hideMenu(){
                this.showSearchIcon = true
                this.showBar = true
                $(".nav-ul-position").slideUp()
                $(".header-nav-mask").fadeOut()
                $(".search-bar").fadeOut()
            },
            a(){
                // 空方法只为了阻止冒泡
            }
        }
    }
</script>

<style scoped>
    @import "../assets/css/swiper.css";
</style>