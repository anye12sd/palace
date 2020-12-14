<template>
    <div v-if="menu.length">
        <header-nav istrue="0"></header-nav>
        <div class="content-padding">
            <div class="swiper-container swiper-container-home">
                <div class="swiper-wrapper">
                    <template v-for="(item,index) in banner.banner">
                        <div class="swiper-slide" :key="index">
                            <router-link tag="a" :to="{path: item.link}">
                                <img v-if="!isMobile" :src="banner.img_path + item.image + imgWidth.swiperImg"/>
                                <img v-else :src="banner.img_path + item.image_sj + imgWidth.swiperImg"/>
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
                <router-link tag="div" :to="{path: 'grid?news_id=26'}" class="enroll-bar flex flexWrap">
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
                        <router-link v-if="!isMobile" tag="div" :to="{path: 'trends?news_id=' + trendId}"
                                     :class="{active: trend == menu[1].children.length + 1}"><span>更多</span></router-link>
                    </div>
                </div>
                <template v-if="!isMobile">
                    <div class="culture-content-box flex flexWrap" v-if="trendList.length">
                        <router-link tag="div" :to="{path: 'newsDetail', query:{id:trendList[0].id}}"
                                     class="culture-content-left">
                            <img :src="banner.img_path + trendList[0].image + imgWidth.contentImg" alt="">
                            <div v-if="trendList.length" class="transition">
                                <p class="culture-content-left-time">{{trendList[0].create_time}}</p>
                                <p class="culture-content-left-text">
                                    <span class="culture-content-left-text-title">{{trendList[0].cate_name}}</span>
                                    <span class="culture-content-left-text-content culture-content-left-text-content_ transition-content">{{trendList[0].title}}</span>
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
                </template>
                <template v-else>
                    <div class="culture-content-box" v-if="trendList.length">
                        <router-link tag="div" :to="{path: 'newsDetail', query:{id:trendList[0].id}}"
                                     class="culture-content-left">
                            <img :src="banner.img_path + trendList[0].image + imgWidth.contentImg" alt="">
                            <div v-if="trendList.length" class="transition">
                                <p class="culture-content-left-time">{{trendList[0].create_time}}</p>
                                <p class="culture-content-left-text flex">
                                    <span class="culture-content-left-text-title">{{trendList[0].cate_name}}</span>
                                    <span class="culture-content-left-text-content transition-content flex-1">{{trendList[0].title}}</span>
                                </p>
                            </div>
                        </router-link>
                        <div class="culture-content-right flex-1">
                            <template v-for="(item, index) in trendList.slice(1,5)">
                                <router-link tag="div" :to="{path: 'newsDetail', query:{id:item.id}}" :key="index"
                                             class="culture-content-right-box transition flex flexWrap">
                                    <p class="culture-content-right-content flex-1 transition-content">{{item.title}}</p>
                                    <p class="culture-content-right-time">{{item.create_time}}</p>
                                </router-link>
                            </template>
                            <router-link tag="div" :to="{path: 'trends?news_id=' + trendId}" class="culture-content-right-more"><span>查看更多</span></router-link>
                        </div>
                    </div>
                </template>
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
                        <router-link v-if="!isMobile" tag="div" :to="{path: 'activity?news_id=' + activityId}"
                                     :class="{active: activity == menu[2].children.length + 1}"><span>更多</span></router-link>
                    </div>
                </div>
                <div>
                    <index-list :contentImg="imgWidth.contentImg" :className="'swiper-container-activity'" :isMobile="isMobile" :type="'video'" :data="activityList" :imgUrl="banner.img_path"></index-list>
                </div>
                <router-link v-if="isMobile" tag="div" :to="{path: 'activity?news_id=' + activityId}" class="culture-content-right-more"><span>查看更多</span></router-link>
            </div>
            <div class="backf9f9f9">
                <div class="culture-box grid-culture-box">
                    <div class="culture-nav flex flexWrap">
                        <div class="culture-nav-title">{{menu[3].title}}</div>
                        <div class="culture-nav-content flex flexWrap">
                            <div :class="{active: grid == 0}" @click="searchGrid(0,menu[3].news_cate_id)">
                                <span>全部</span></div>
                            <template v-for="(item, index) in menu[3].children">
                                <router-link tag="div" :key="index" v-if="item.id == 26" :class="{active: grid == index + 1}"
                                             :to="{path: 'grid?news_id=' + item.id}"><span>{{item.title}}</span></router-link>
                                <div :key="index" v-else :class="{active: grid == index + 1}"
                                     @click="searchGrid(index + 1, item.id)"><span>{{item.title}}</span></div>
                            </template>
                            <!--                            <div :class="{active: grid == 1}" @click="searchGrid(1)"><span>线上培训</span></div>-->
                            <!--                            <div :class="{active: grid == 2}" @click="searchGrid(2)"><span>线下培训</span></div>-->
                            <router-link v-if="!isMobile" tag="div" :to="{path: 'grid?news_id=' + gridId}"
                                         :class="{active: grid == menu[3].children.length + 1}"><span>更多</span></router-link>
                        </div>
                    </div>
                    <div>
                        <index-list :contentImg="imgWidth.contentImg" :className="'swiper-container-grid'" :isMobile="isMobile" :type="'video'" :data="gridList" :imgUrl="banner.img_path"></index-list>
                    </div>
                    <router-link v-if="isMobile" tag="div" :to="{path: 'grid?news_id=' + gridId}" class="culture-content-right-more"><span>查看更多</span></router-link>
                </div>
            </div>
            <div>
                <div class="culture-box">
                    <div class="culture-nav flex flexWrap">
                        <div class="culture-nav-title">{{menu[4].title}}</div>
                        <div class="culture-nav-content flex flexWrap">
                            <div class="active"><span>全部</span></div>
                            <router-link v-if="!isMobile" tag="div" :to="{path: 'live?news_id=' + liveId}"><span>更多</span></router-link>
                        </div>
                    </div>
                    <div>
                        <index-list :contentImg="imgWidth.contentImg" :class-name="'swiper-container-live'" :isMobile="isMobile" :type="'video'" :data="liveList" :imgUrl="banner.img_path"></index-list>
                    </div>
                    <router-link v-if="isMobile" tag="div" :to="{path: 'live?news_id=' + liveId}" class="culture-content-right-more"><span>查看更多</span></router-link>
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
                            <router-link v-if="!isMobile" tag="div" :to="{path: 'showroom?news_id=' + roomId}"
                                         :class="{active: room == menu[5].children.length + 1}"><span>更多</span></router-link>
                        </div>
                    </div>
                    <div>
                        <index-list :contentImg="imgWidth.contentImg" :isMobile="isMobile" :type="'list'" :data="roomList" :imgUrl="banner.img_path"></index-list>
                    </div>
                    <router-link v-if="isMobile" tag="div" :to="{path: 'showroom?news_id=' + roomId}" class="culture-content-right-more"><span>查看更多</span></router-link>
                </div>
            </div>
            <template v-if="!isMobile">
                <div class="contact">
                    <div class="culture-box">
                        <div class="culture-nav flex flexWrap">
                            <div class="culture-nav-title">联系我们</div>
                            <div class="culture-nav-content flex flexWrap">
                                <router-link tag="div" :to="{path: 'contact'}" class="active"><span>更多</span></router-link>
                            </div>
                        </div>
                        <div class="contact-home-box flex flexWrap">
                            <router-link tag="div" :to="{path: 'contact', query:{index: 5}}" class="flex-1 hoverDiv">
                                <img src="../assets/img/img-02.png" alt="" class="contact-home-box-img">
                            </router-link>
                            <router-link tag="div" :to="{path: 'enroll'}" class="flex-1 hoverDiv" style="text-align: center">
                                <img src="../assets/img/img-03.png" alt="" class="contact-home-box-img">
                            </router-link>
                            <div class="flex-1 hoverDiv qrcode-img" style="text-align: right">
                                <img src="../assets/img/img-04.png" alt="" class="contact-home-box-img">
                                <img :src="img_path" alt="" class="contact-home-box-qrcode-img">
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="contact">
                    <div class="culture-box">
                        <div class="culture-nav flex flexWrap">
                            <div class="culture-nav-title">联系我们</div>
                            <div class="culture-nav-content flex flexWrap">
                                <router-link v-if="!isMobile" tag="div" :to="{path: 'contact?news_id=0'}" class="active"><span>更多</span></router-link>
                            </div>
                        </div>
                        <div class="contact-home-box flex flexWrap">
                            <router-link tag="div" :to="{path: 'contact', query:{index: 5}}" class="flex-1 hoverDiv">
                                <img src="../assets/img/img-02.png" alt="" class="contact-home-box-img">
                            </router-link>
                            <router-link tag="div" :to="{path: 'enroll'}" class="flex-1 hoverDiv" style="text-align: center">
                                <img src="../assets/img/img-03.png" alt="" class="contact-home-box-img">
                            </router-link>
                            <div class="img-mask" @click="hideMask"></div>
                            <div v-if="showQrCode" class="img-mask-qrcode">
                                <img :src="img_path" alt="">
                            </div>
                            <div class="flex-1 hoverDiv qrcode-img" style="text-align: right" @click="showImg">
                                <img src="../assets/img/img-04.png" alt="" class="contact-home-box-img">
                                <img :src="img_path" alt="" class="contact-home-box-qrcode-img">
                            </div>
                        </div>
                        <router-link v-if="isMobile" tag="div" :to="{path: 'contact?news_id=0'}" class="culture-content-right-more"><span>查看更多</span></router-link>
                    </div>
                </div>
            </template>
        </div>
        <Footer :isMobile="isMobile"></Footer>
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
                imgWidth:{
                    swiperImg: "",
                    contentImg: ""
                },
                swiper: "",
                swiper1: "",
                swiper2: "",
                swiper3: "",
                trend: 0,
                originWidth: 1,
                activity: 0,
                grid: 0,
                room: 0,
                banner: "",
                img_path: "",
                recommend: [],
                menu: [],
                trendList: [],
                trendId: "",
                activityList: [],
                activityId: "",
                gridList: [],
                gridId: "",
                roomList: [],
                roomId: "",
                liveList: [],
                liveId: "",
                timer: false,
                showQrCode: false,
                isMobile: false
            }
        },
        created() {
            this.fetch()
        },
        mounted() {
            if(document.body.clientWidth <= 768){
                this.isMobile = true
            }
            this.originWidth = document.body.clientWidth
            this.getImgWidth()
            let that = this
            window.onresize = function(){ // 定义窗口大小变更通知事件
                if(!that.timer) {
                    that.timer = true
                    setTimeout(function () {
                        that.timer = false
                        if(document.body.clientWidth <= 768){
                            that.originWidth <= 768 ? console.log("不要随便resize哦~") : location.reload()
                        }else{
                            that.originWidth > 768 ? console.log("不要随便resize哦~") : location.reload()
                        }
                    }, 1000)
                }
            };
        },
        methods: {
            getImgWidth(){
                this.imgWidth.swiperImg = '!/both/1400x620'
                this.imgWidth.contentImg = '!/both/450x340'
            },
            fetch: function () {
                this.$api.getBanner()
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.banner = data.data.data
                            setTimeout(function () {
                                this.swiper = new Swiper('.swiper-container-home', {
                                    autoplay: 3000,
                                    loop: true,
                                    loopedSlides: 3,
                                    paginationClickable :true,
                                    centeredSlides: true,
                                    slidesPerView: 'auto',
                                    pagination: '.swiper-pagination',
                                    nextButton: '.swiper-button-next',
                                    prevButton: '.swiper-button-prev',
                                });
                            }, 300)
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
                            this.recommend = data.data.data.recommend
                            sessionStorage.setItem("menu", JSON.stringify(data.data.data.menu))
                            this.menu = data.data.data.menu
                            this.img_path = data.data.data.img_path + data.data.data.foot.qr_code
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
                this.trendId = id ? id : this.menu[1].news_cate_id
                this.trend = index || 0
                let params = {cate_id: id ? id : this.menu[1].news_cate_id, status: true}
                this.$api.getNewsList(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
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
                this.activityId = id ? id : this.menu[2].news_cate_id
                this.activity = index || 0
                let params = {cate_id: id ? id : this.menu[2].news_cate_id, status: true}
                this.$api.getNewsList(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.activityList = data.data.data.list.slice(0,3)
                            // 将轮播图片宽度设置为屏幕70%
                            let imgWidth = document.body.clientWidth *0.7
                            if(this.isMobile){
                                this.$nextTick(function () {
                                    if (this.swiper2) {
                                        this.swiper2.slideTo(0)
                                        this.swiper2.destroy(); //销毁循环分页
                                        this.swiper2 = new Swiper('.swiper-container-activity', {
                                            spaceBetween: 24,
                                            width: imgWidth,
                                            loop: false,
                                        });
                                    } else{
                                        this.swiper2 = new Swiper('.swiper-container-activity', {
                                            spaceBetween: 24,
                                            width: imgWidth,
                                            loop: false,
                                        });
                                    }
                                })
                            }
                        } else {
                            this.$message.error(data.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            searchGrid(index, id) {
                this.gridId = id ? id : this.menu[3].news_cate_id
                this.grid = index || 0
                let params = {cate_id: id ? id : this.menu[3].news_cate_id, status: true}
                this.$api.getNewsList(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.gridList = data.data.data.list.slice(0,2)
                            // 将轮播图片宽度设置为屏幕70%
                            if(this.isMobile){
                                let imgWidth = document.body.clientWidth *0.7
                                this.$nextTick(function () {
                                    if (this.swiper1) {
                                        this.swiper1.slideTo(0)
                                        this.swiper1.destroy(); //销毁循环分页
                                        this.swiper1 = new Swiper('.swiper-container-grid', {
                                            spaceBetween: 24,
                                            width: imgWidth,
                                            loop: false,
                                        });
                                    }else{
                                        this.swiper1 = new Swiper('.swiper-container-grid', {
                                            spaceBetween: 24,
                                            width: imgWidth,
                                            loop: false,
                                        });
                                    }
                                })
                            }
                        } else {
                            this.$message.error(data.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            searchLive(index, id) {
                this.liveId = id ? id : this.menu[4].news_cate_id
                let params = {cate_id: id ? id : this.menu[4].news_cate_id, status: true}
                this.$api.getNewsList(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.liveList = data.data.data.list.slice(0,3)
                            // 将轮播图片宽度设置为屏幕70%
                            let imgWidth = document.body.clientWidth *0.7
                            if(this.isMobile){
                                this.$nextTick(function () {
                                    if (this.swiper3) {
                                        this.swiper3.slideTo(0)
                                        this.swiper3.destroy(); //销毁循环分页
                                        this.swiper3 = new Swiper('.swiper-container-live', {
                                            spaceBetween: 24,
                                            width: imgWidth,
                                            loop: false,
                                        });
                                    }else{
                                        this.swiper3 = new Swiper('.swiper-container-live', {
                                            spaceBetween: 24,
                                            width: imgWidth,
                                            loop: false,
                                        });
                                    }
                                })
                            }
                        } else {
                            this.$message.error(data.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            searchRoom(index, id) {
                this.roomId = id ? id : this.menu[5].news_cate_id
                this.room = index || 0
                let params = {cate_id: id ? id : this.menu[5].news_cate_id, status: true}
                this.$api.getNewsList(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.roomList = data.data.data.list.slice(0,3)
                        } else {
                            this.$message.error(data.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            showImg(){
                $(".img-mask").fadeToggle()
                this.$nextTick(function(){
                    this.showQrCode = true
                })
            },
            hideMask(){
                $(".img-mask").fadeToggle()
                this.$nextTick(function(){
                    this.showQrCode = false
                })
            },
        }
    }
</script>

<style scoped>
    @import "../assets/css/swiper.css";
</style>