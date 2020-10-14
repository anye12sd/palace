<template>
    <div class="out">
        <div class="header-nav-box flex flexWrap">
            <div class="header-nav-logo">
                <img src="../assets/img/logo.png" alt="">
            </div>
            <div class="header-nav-ul">
                <ul class="nav-ul flex">
                    <router-link tag="li" :to="{ path: '/' }" :class="{active: istrue == 0}">
                        <span>文化馆首页</span>
                    </router-link>
                    <router-link tag="li" :to="{ path: 'trends' }" :class="{active: istrue == 1}">
                        <span>文化动态</span>
                        <div class="list-select">
                            <div>文化馆公告</div>
                            <div>本地新闻</div>
                        </div>
                    </router-link>
                    <router-link tag="li" :to="{ path: 'activity' }" :class="{active: istrue == 2}">
                        <span>文化活动</span>
                        <div class="list-select">
                            <div>活动视频</div>
                        </div>
                    </router-link>
                    <router-link tag="li" :to="{ path: 'grid' }" :class="{active: istrue == 3}">
                        <span>文化网格</span>
                        <div class="list-select">
                            <div>线上培训</div>
                            <div>线下培训</div>
                        </div>
                    </router-link>
                    <router-link tag="li" :to="{ path: 'live' }" :class="{active: istrue == 4}">
                        <span>文化直播</span>
                    </router-link>
                    <router-link tag="li" :to="{ path: 'showroom' }" :class="{active: istrue == 5}">
                        <span>数字展厅</span>
                        <div class="list-select">
                            <div>场馆展示</div>
                        </div>
                    </router-link>
                    <router-link tag="li" :to="{ path: 'contact' }" :class="{active: istrue == 6}">
                        <span>联系我们</span>
                    </router-link>
                </ul>
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
            return {}
        },
    }
    $('.nav-ul').delegate('li', 'click', function (e) {
        console.log(e)
    })
</script>

<style scoped>
    @import "../assets/css/swiper.css";

    .out{
        position: fixed;
        z-index: 255;
        left: 0;
        right: 0;
        background: #fff;
    }
    .header-nav-box {
        height: 125px;
        width: 1400px;
        margin: 0 auto;
        background: #fff;
    }

    .header-nav-logo {
        margin-top: 32px;
    }

    .header-nav-ul {
        font-size: 14px;
        line-height: 125px;
        font-weight: bold;
    }

    .header-nav-ul li {
        font-weight: bold;
        cursor: pointer;
        text-align: center;
    }

    .header-nav-ul li span {
        padding: 10px 0;
        margin: 0 15px
    }

    .header-nav-ul li.active span {
        border-bottom: 2px solid #88df00;
    }

    .header-nav-ul li span:hover {
        border-bottom: 2px solid #88df00;
    }
    .list-select{
        line-height: 40px;
        background: #fff;
        text-align: center;
        margin-top: -40px;
        opacity: 0;
    }
    .list-select div{
        padding: 0 10px;
    }
    .list-select div:hover{
        background: #00843e;
        color: #fff;
        transition: ease .5s;
        -moz-transition: ease .5s; /* Firefox 4 */
        -webkit-transition: ease .5s; /* Safari and Chrome */
        -o-transition: ease .5s; /* Opera */
    }
    .nav-ul li:nth-child(n):hover .list-select{
        opacity: 100%;
        animation:mymove .5s ease;
        -moz-animation:mymove .5s ease; /* Firefox 4 */
        -webkit-animation:mymove .5s ease; /* Safari and Chrome */
        -o-animation:mymove .5s ease; /* Opera */
    }
    @keyframes mymove
    {
        from {margin-top: -30px; opacity: 0; }
        to {margin-top: -40px; opacity: 100%; }
    }

    @-moz-keyframes mymove /* Firefox */
    {
        from {margin-top: -30px; opacity: 0}
        to {margin-top: -40px; opacity: 100%}
    }

    @-webkit-keyframes mymove /* Safari 和 Chrome */
    {
        from {margin-top: -30px; opacity: 0}
        to {margin-top: -40px; opacity: 100%}
    }

    @-o-keyframes mymove /* Opera */
    {
        from {margin-top: -30px; opacity: 0}
        to {margin-top: -40px; opacity: 100%}
    }
</style>