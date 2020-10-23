<template>
    <div v-if="menu.length">
        <header-nav istrue="0"></header-nav>
        <div class="content-padding">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <template v-for="(item,index) in banner.banner">
                        <div class="swiper-slide" :key="index">
                            <router-link tag="a" :to="{path: item.link}">
                                <img :src="banner.img_path + item.image"/>
                            </router-link>
                        </div>
                    </template>
                </div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
        <div>
            <div class="nav-list-box">
                <div class="nav-list flex flexWrap">
                    <template v-for="(item, index) in recommend.slice(0,4)">
                        <router-link tag="div" :to="{path: item.link}" :key="index">
                            <img :src="banner.img_path + item.icon"/>
                            {{item.title}}
                        </router-link>
                    </template>
                </div>
                <div class="nav-list flex flexWrap">
                    <template v-for="(item, index) in recommend.slice(4)">
                        <router-link tag="div" :to="{path: item.link}" :key="index">
                            <img :src="banner.img_path + item.icon"/>
                            {{item.title}}
                        </router-link>
                    </template>
                </div>
                <router-link tag="div" :to="{path: 'enroll'}" class="enroll-bar flex flexWrap">
                    <p class="enroll-bar-name">免费培训（在线报名）</p>
                    <div class="enroll-bar-color"></div>
                </router-link>
            </div>
        </div>
        <div class="backf9f9f9">
            <div class="culture-box">
                <div class="culture-nav flex flexWrap">
                    <div class="culture-nav-title">{{menu[1].title}}</div>
                    <div class="culture-nav-content flex flexWrap">
                        <div :class="{active: trend == 0}" @click="searchTrend(0,menu[1].news_cate_id)"><span>全部</span>
                        </div>
                        <template v-for="(item, index) in menu[1].children">
                            <div :key="index" :class="{active: trend == index + 1}"
                                 @click="searchTrend(index + 1, item.id)"><span>{{item.title}}</span></div>
                        </template>
                        <!--    <div :class="{active: trend == 1}" @click="searchTrend(1)"><span>文化馆公告</span></div>-->
                        <!--    <div :class="{active: trend == 2}" @click="searchTrend(2)"><span>本地新闻</span></div>-->
                        <router-link tag="div" :to="{path: 'trends?news_id=17'}"
                                     :class="{active: trend == menu[1].children.length + 1}"
                                     @click="searchTrend(menu[1].children.length + 1)"><span>更多</span></router-link>
                    </div>
                </div>
                <div class="culture-content-box flex flexWrap" v-if="trendList.length">
                    <router-link tag="div" :to="{path: 'newsDetail', query:{id:trendList[0].id}}"
                                 class="culture-content-left">
                        <img :src="banner.img_path + trendList[0].image" alt="">
                        <div v-if="trendList.length" class="transition">
                            <p class="culture-content-left-time">{{trendList[0].create_time}}</p>
                            <p class="culture-content-left-text">
                                <span class="culture-content-left-text-title">{{trendList[0].cate_name}}</span>
                                <span class="culture-content-left-text-content transition-content">{{trendList[0].title}}</span>
                            </p>
                        </div>
                    </router-link>
                    <div class="culture-content-right flex-1">
                        <template v-for="(item, index) in trendList.slice(1,10)">
                            <router-link tag="div" :to="{path: 'newsDetail', query:{id:item.id}}" :key="index"
                                         class="culture-content-right-box transition flex flexWrap">
                                <p class="culture-content-right-title">{{item.cate_name}}</p>
                                <p class="culture-content-right-content flex-1 transition-content">{{item.title}}</p>
                                <p class="culture-content-right-time">{{item.create_time}}</p>
                            </router-link>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="culture-box">
                <div class="culture-nav flex flexWrap">
                    <div class="culture-nav-title">{{menu[2].title}}</div>
                    <div class="culture-nav-content flex flexWrap">
                        <div :class="{active: activity == 0}" @click="searchActivity(0,menu[2].news_cate_id)">
                            <span>全部</span></div>
                        <template v-for="(item, index) in menu[2].children">
                            <div :key="index" :class="{active: activity == index + 1}"
                                 @click="searchActivity(index + 1, item.id)"><span>{{item.title}}</span></div>
                        </template>
                        <!--                        <div :class="{active: activity == 1}" @click="searchActivity(1)"><span>活动视频</span></div>-->
                        <router-link tag="div" :to="{path: 'activity?news_id=18'}"
                                     :class="{active: activity == menu[2].children.length + 1}"
                                     @click="searchActivity(menu[2].children.length + 1)"><span>更多</span></router-link>
                    </div>
                </div>
                <div>
                    <index-list :data="activityList" :imgUrl="banner.img_path"></index-list>
                </div>
            </div>
            <div class="backf9f9f9">
                <div class="culture-box">
                    <div class="culture-nav flex flexWrap">
                        <div class="culture-nav-title">{{menu[3].title}}</div>
                        <div class="culture-nav-content flex flexWrap">
                            <div :class="{active: grid == 0}" @click="searchGrid(0,menu[3].news_cate_id)">
                                <span>全部</span></div>
                            <template v-for="(item, index) in menu[3].children">
                                <div :key="index" :class="{active: grid == index + 1}"
                                     @click="searchGrid(index + 1, item.id)"><span>{{item.title}}</span></div>
                            </template>
                            <!--                            <div :class="{active: grid == 1}" @click="searchGrid(1)"><span>线上培训</span></div>-->
                            <!--                            <div :class="{active: grid == 2}" @click="searchGrid(2)"><span>线下培训</span></div>-->
                            <router-link tag="div" :to="{path: 'grid?news_id=19'}"
                                         :class="{active: grid == menu[3].children.length + 1}"
                                         @click="searchGrid(menu[3].children.length + 1)"><span>更多</span></router-link>
                        </div>
                    </div>
                    <div>
                        <index-list :data="gridList" :imgUrl="banner.img_path"></index-list>
                    </div>
                </div>
            </div>
            <div>
                <div class="culture-box">
                    <div class="culture-nav flex flexWrap">
                        <div class="culture-nav-title">{{menu[4].title}}</div>
                        <div class="culture-nav-content flex flexWrap">
                            <div class="active"><span>全部</span></div>
                            <router-link tag="div" :to="{path: 'live?news_id=20'}"><span>更多</span></router-link>
                        </div>
                    </div>
                    <div>
                        <index-list :data="liveList" :imgUrl="banner.img_path"></index-list>
                    </div>
                </div>
            </div>
            <div class="backf9f9f9">
                <div class="culture-box">
                    <div class="culture-nav flex flexWrap">
                        <div class="culture-nav-title">{{menu[5].title}}</div>
                        <div class="culture-nav-content flex flexWrap">
                            <div :class="{active: room == 0}" @click="searchRoom(0, menu[5].news_cate_id)">
                                <span>全部</span></div>
                            <template v-for="(item, index) in menu[5].children">
                                <div :key="index" :class="{active: room == index + 1}"
                                     @click="searchRoom(index + 1, item.id)"><span>{{item.title}}</span></div>
                            </template>
                            <!--                            <div :class="{active: room == 1}" @click="searchRoom(1)"><span>场馆展示</span></div>-->
                            <router-link tag="div" :to="{path: 'showroom?news_id=21'}"
                                         :class="{active: room == menu[5].children.length + 1}"
                                         @click="searchRoom(menu[5].children.length + 1)"><span>更多</span></router-link>
                        </div>
                    </div>
                    <div>
                        <index-list :data="roomList" :imgUrl="banner.img_path"></index-list>
                    </div>
                </div>
            </div>
            <div class="contact">
                <div class="culture-box">
                    <div class="culture-nav flex flexWrap">
                        <div class="culture-nav-title">联系我们</div>
                        <div class="culture-nav-content flex flexWrap">
                            <router-link tag="div" :to="{path: 'contact'}" class="active"><span>更多</span></router-link>
                        </div>
                    </div>
                    <div class="contact-home-box flex flexWrap">
                        <router-link tag="div" :to="{path: 'contact', query:{index: 5}}" class="flex-1">
                            <img src="../assets/img/img-02.png" alt="">
                        </router-link>
                        <router-link tag="div" :to="{path: 'enroll'}" class="flex-1" style="text-align: center">
                            <img src="../assets/img/img-03.png" alt="">
                        </router-link>
                        <div class="flex-1" style="text-align: right">
                            <img src="../assets/img/img-04.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Swiper from "swiper";
    import IndexList from "../components/IndexList";

    export default {
        name: "Home",
        components: {IndexList},
        data() {
            return {
                trend: 0,
                activity: 0,
                grid: 0,
                room: 0,
                banner: "",
                recommend: [],
                menu: [],
                trendList: [],
                activityList: [],
                gridList: [],
                roomList: [],
                liveList: [],
            }
        },
        created() {
            this.fetch()
        },
        methods: {
            fetch: function () {
                this.$api.getBanner()
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            console.log(data)
                            this.banner = data.data.data
                            setTimeout(function () {
                                var swiper = new Swiper('.swiper-container', {
                                    autoplay: 3000,
                                    loop: true,
                                    loopedSlides: 3,
                                    centeredSlides: true,
                                    slidesPerView: 'auto',
                                    pagination: '.swiper-pagination',
                                    nextButton: '.swiper-button-next',
                                    prevButton: '.swiper-button-prev',
                                });
                            }, 1000)
                        } else {
                            this.$message.error(data.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                this.$api.getNewsBase()
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            console.log(data)
                            this.recommend = data.data.data.recommend
                            sessionStorage.setItem("menu", JSON.stringify(data.data.data.menu))
                            this.menu = data.data.data.menu
                            sessionStorage.setItem("foot", JSON.stringify(data.data.data.foot))
                            sessionStorage.setItem("imgPath", JSON.stringify(data.data.data.img_path))
                            this.fetchList()
                        } else {
                            this.$message.error(data.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            fetchList() {
                this.searchTrend(0,)
                this.searchActivity(0)
                this.searchGrid(0)
                this.searchLive(0)
                this.searchRoom(0)
            },
            searchTrend(index, id) {
                this.trend = index || 0
                let params = {cate_id: id ? id : this.menu[1].news_cate_id, status: true}
                console.log(345, params)
                this.$api.getNewsList(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            console.log(data)
                            this.trendList = data.data.data.list
                        } else {
                            this.$message.error(data.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            searchActivity(index, id) {
                this.activity = index || 0
                let params = {cate_id: id ? id : this.menu[2].news_cate_id, status: true}
                console.log(params)
                this.$api.getNewsList(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            console.log(data)
                            this.activityList = data.data.data.list
                        } else {
                            this.$message.error(data.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            searchGrid(index, id) {
                this.grid = index || 0
                let params = {cate_id: id ? id : this.menu[3].news_cate_id, status: true}
                console.log(params)
                this.$api.getNewsList(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            console.log(data)
                            this.gridList = data.data.data.list
                        } else {
                            this.$message.error(data.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            searchLive(index, id) {
                let params = {cate_id: id ? id : this.menu[4].news_cate_id, status: true}
                console.log(params)
                this.$api.getNewsList(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            console.log(data)
                            this.liveList = data.data.data.list
                        } else {
                            this.$message.error(data.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            searchRoom(index, id) {
                this.room = index || 0
                let params = {cate_id: id ? id : this.menu[5].news_cate_id, status: true}
                console.log(params)
                this.$api.getNewsList(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            console.log(data)
                            this.roomList = data.data.data.list
                        } else {
                            this.$message.error(data.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }
    }
</script>

<style scoped>
    @import "../assets/css/swiper.css";
</style>