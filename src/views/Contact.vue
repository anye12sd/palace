<template>
    <div>
        <header-nav istrue="6"></header-nav>
        <banner v-if="imgFlag" :bannerImg="bannerImg"></banner>
        <div class="category-box" :class="{ptFlag: !imgFlag}">
            <p v-if="!isMobile" class="category-bread-crumb">
                位置：
                <router-link tag="span" :to="{path: '/'}">文化馆首页</router-link>
                -
                <router-link tag="span" :to="{path: 'contact'}">联系我们</router-link>
            </p>
            <p class="category-title">联系我们</p>
            <div class="contact-box " :class="{'flex flexWrap': !isMobile}">
                <div class="contact-box-left" ref="toScrollRef">
                    <div class="contact-box-left-text" :class="{active: trend == 1}" @click="toScroll(1)">地理位置</div>
                    <div class="contact-box-left-text" :class="{active: trend == 2}" @click="toScroll(2)">交通指南</div>
                    <div class="contact-box-left-text" :class="{active: trend == 3}" @click="toScroll(3)">开馆时间</div>
                    <div class="contact-box-left-text" :class="{active: trend == 4}" @click="toScroll(4)">联系方式</div>
                    <div class="contact-box-left-text" :class="{active: trend == 5}" @click="toScroll(5)">场地预约</div>
                    <div class="contact-box-left-text" :class="{active: trend == 6}" @click="toScroll(6)">意见建议</div>
                    <div class="contact-box-left-text" :class="{active: trend == 7}" @click="toScroll(7)">咨询指导</div>
                </div>
                <div class="contact-box-right flex-1" ref="scrollBox">
                    <div class="contact-box-right-title scroll1" ref="scroll1">地理位置</div>
                    <div class="contact-box-right-content">
                        <div id="all-map" class="map"></div>
                        <p class="contact-box-right-content-text">地址：{{foot.address}}</p>
                    </div>
                    <div class="contact-box-right-title scroll2" ref="scroll2">交通指南</div>
                    <div class="contact-box-right-content">
                        <p class="contact-box-right-content-text">{{foot.guide}}</p>
                    </div>
                    <div class="contact-box-right-title scroll3" ref="scroll3">开馆时间</div>
                    <div class="contact-box-right-content">
                        <p class="contact-box-right-content-text">{{foot.open_time}}</p>
                    </div>
                    <div class="contact-box-right-title scroll4" ref="scroll4">联系方式</div>
                    <div class="contact-box-right-content flex">
                        <div class="qrcode">
                            <img v-if="foot.qr_code && img_path" :src="img_path + foot.qr_code" alt="">
                            <p>微信公众号</p>
                        </div>
                        <div class="contact-way">
                            <p>电话：{{foot.telephone}}</p>
                            <p>邮箱：{{foot.email}}</p>
                        </div>
                    </div>
                    <div class="contact-box-right-title scroll5" ref="scroll5">场地预约</div>
                    <div class="contact-box-right-content">
                        <div v-if="isMobile && order.classroom_id" class="checkImg" @click="showImg">查看图片</div>
                        <div class="img-mask" @click="hideMask"></div>
                        <div v-if="order.classroom_id && showClassRoom" class="classroom-photo">
                            <img :src="img_path + classroomIndex[0].image[0]" alt="" @error="showErrImg">
                        </div>
                        <form @submit.prevent="submitOrder" class="contact-form">
                            <a-select class="content-input form-select" placeholder="请选择教室"
                                      v-model="order.classroom_id" @change="handleChange">
                                <template v-for="(item, index) in classroomList">
                                    <a-select-option :value="item.id" :key="index" :data-index="index">
                                        {{item.classroom}}
                                    </a-select-option>
                                </template>
                            </a-select>
                            <a-range-picker :placeholder="['开始时间', '结束时间']" v-model="order.time"
                                            show-time></a-range-picker>
                            <a-input type="text" class="content-input form-input" v-model="order.booking_person"
                                     placeholder="请输入预约人"/>
                            <a-input type="text" class="content-input form-input" v-model="order.person_id"
                                     placeholder="请输入身份证号"/>
                            <a-input type="text" class="content-input form-input" v-model="order.company"
                                     placeholder="请输入单位"/>
                            <a-input type="text" class="content-input form-input" v-model="order.telephone"
                                     placeholder="请输入联系方式"/>
                            <a-textarea class="content-textarea" v-model="order.content"
                                        placeholder="请输入活动内容"></a-textarea>
                            <input type="submit" class="submit-btn" value="场地预约">
                        </form>
                    </div>
                    <div class="contact-box-right-title scroll6" ref="scroll6">意见建议</div>
                    <div class="contact-box-right-content">
                        <form @submit.prevent="submitAdvice" class="contact-form">
                            <a-input type="text" class="content-input form-input" v-model="advice.person_name"
                                     placeholder="请输入您的姓名"/>
                            <a-input type="text" class="content-input form-input" v-model="advice.telephone"
                                     placeholder="请输入您的联系方式"/>
                            <a-textarea class="content-textarea" v-model="advice.content"
                                        placeholder="请输入您的内容"></a-textarea>
                            <input type="submit" class="submit-btn" value="提交建议">
                        </form>
                    </div>
                    <div class="contact-box-right-title scroll7" ref="scroll7">咨询指导</div>
                    <div class="contact-box-right-content">
                        <form @submit.prevent="submitGuide" class="contact-form">
                            <a-input type="text" class="content-input form-input" v-model="guide.person_name"
                                     placeholder="请输入您的姓名"/>
                            <a-input type="text" class="content-input form-input" v-model="guide.telephone"
                                     placeholder="请输入您的联系方式"/>
                            <a-textarea class="content-textarea" v-model="guide.content"
                                        placeholder="请输入您的内容"></a-textarea>
                            <input type="submit" class="submit-btn" value="提交">
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <Footer :is-mobile="isMobile"></Footer>
    </div>
</template>

<script>
    import AMap from 'AMap'
    // import $ from 'jquery'

    export default {
        name: "Contact",
        data() {
            return {
                order: {
                    classroom_id: undefined,
                    time: undefined,
                    booking_person: "",
                    person_id: "",
                    company: "",
                    telephone: "",
                    content: ""
                },
                advice: {
                    person_name: "", telephone: "", content: ""
                },
                guide: {
                    person_name: "", telephone: "", content: ""
                },
                activeArr: [],
                rightLiTops: [],
                showClassRoom: true,
                originWidth: 1,
                foot: "",
                classroomIndex: [],
                trend: 1,
                classroomList: [],
                img_path: "",
                bannerImg: "",
                timer: false,
                imgFlag: false,
                isMobile: false
            }
        },
        mounted() {
            this.getBanner() // 获取banner图
            this.fetch()
            this.GaodeMap()
            this.initRightHeight()
            this.init()
            this.scroll()
            if(document.body.clientWidth <= 768){
                this.isMobile = true
                this.showClassRoom = false
            }
            this.originWidth = document.body.clientWidth
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
            getBanner: function () {
                let news_id = this.$route.query.news_id
                let imgPath = JSON.parse(sessionStorage.getItem("imgPath"))
                let menu = JSON.parse(sessionStorage.getItem("menu"))
                if (menu) {
                    menu = menu.slice(1)
                }
                for (let i = 0; i < menu.length; i++) {
                    if (news_id == menu[i].news_cate_id) {
                        if (menu[i].image) {
                            this.bannerImg = imgPath + menu[i].image
                            this.imgFlag = true
                            return false
                        } else {
                            return false
                        }
                    }
                    if (menu[i].children.length) {
                        let children = menu[i].children
                        for (let j = 0; j < children.length; j++) {
                            if (news_id == children[j].id) {
                                if (children[j].image) {
                                    this.bannerImg = imgPath + children[j].image
                                    this.imgFlag = true
                                    return false
                                } else {
                                    return false
                                }
                            }
                        }
                    }
                }
                // let params = {cate_id: 17}
                // this.$api.getNewsList(params)
                //     .then((data) => {
                //         if (data.data.code == 0 && data.data.msg == "success") {
                //             this.bannerImg = 'http://175.24.135.230:5007/admin/upload/20201022160240332.jpg'
                //         } else {
                //             this.$message.error(data.data.msg)
                //         }
                //     })
                //     .catch((err) => {
                //         console.log(err)
                //     })
            },
            fetch() {
                if (sessionStorage.getItem("foot") == null || sessionStorage.getItem("imgPath") == null) {
                    this.$api.getNewsBase()
                        .then((data) => {
                            if (data.data.code == 0 && data.data.msg == "success") {
                                this.foot = data.data.data.foot
                                this.img_path = data.data.data.img_path
                                this.getBanner() // 获取banner图
                                this.GaodeMap()
                            } else {
                                this.$message.error(data.data.msg)
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                } else {
                    this.foot = JSON.parse(sessionStorage.getItem("foot"))
                    this.img_path = JSON.parse(sessionStorage.getItem("imgPath"))
                }
                this.$api.getClassroom()
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.classroomList = data.data.data.classroom
                        } else {
                            this.$message.error(data.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            initRightHeight(){
                let itemArray=[]; //定义一个伪数组
                let top = 0;
                itemArray.push(top)
                //获取右边所有li的礼
                let allList = this.$refs.scrollBox.getElementsByClassName('contact-box-right-title');
                //allList伪数组转化成真数组
                Array.prototype.slice.call(allList).forEach(div => {
                    top = div.offsetTop; //获取所有div的绝对高度
                    itemArray.push(top)
                });
                this.rightLiTops = itemArray;
                // console.log(this.rightLiTops)
            },
            scroll() {
                let index = this.$route.query.index
                if (index) {
                    setTimeout(function () {
                        $(".contact-box-left .contact-box-left-text").eq(index - 1).click()
                    }, 800)
                }
            },
            init: function () {
                let top = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
                let diff = -165
                if (this.imgFlag) {
                    diff = 95
                }
                let boxTop = $(".contact-box").offset().top + top + diff
                if (top > boxTop) {
                    $(".contact-box-left").css({"position": "fixed", "top": "165px"})
                }
                let that = this
                $(window).scroll(function () {
                    top = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
                    if (top > boxTop) {
                        $(".contact-box-left").css({"position": "fixed", "top": "165px"})
                    } else {
                        $(".contact-box-left").css({"position": "absolute", "top": "inherit"})
                    }
                    for(let i = 1; i <= that.rightLiTops.length; i++){
                        if(that.rightLiTops[i]  <= (top-80) && (top - 80) <= that.rightLiTops[i+1]){
                            that.trend = i
                            break;
                        }else if(top > that.rightLiTops[i + 1]){
                            that.trend = i + 1
                        }
                    }
                })
            },
            submitOrder: function () {
                if (!this.order.time) {
                    this.$message.error("请选择预约时间")
                    return false
                }
                if (!this.order.classroom_id) {
                    this.$message.error("请选择教室")
                    return false
                }
                if (!this.order.booking_person) {
                    this.$message.error("请填写预约人")
                    return false
                }
                if (!this.order.company) {
                    this.$message.error("请填写单位")
                    return false
                }
                if (!this.order.content) {
                    this.$message.error("请填写活动内容")
                    return false
                }
                if (!this.order.person_id) {
                    this.$message.error("请填写身份证号")
                    return false
                }
                if (!this.order.telephone) {
                    this.$message.error("请填写联系方式")
                    return false
                }
                let params = {...this.order}
                params.start_time = this.order.time && this.order.time[0].format("YYYY-MM-DD HH:mm:ss")
                params.end_time = this.order.time && this.order.time[1].format("YYYY-MM-DD HH:mm:ss")
                this.$api.postBookClassroom(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success(data.data.data)
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
                    this.showClassRoom = true
                })
            },
            hideMask(){
                $(".img-mask").fadeToggle()
                this.$nextTick(function(){
                    this.showClassRoom = false
                })
            },
            submitAdvice: function () {
                if (!this.advice.person_name) {
                    this.$message.error("请填写姓名")
                    return false
                }
                if (!this.advice.telephone) {
                    this.$message.error("请填写联系方式")
                    return false
                }
                if (!this.advice.content) {
                    this.$message.error("请填写内容")
                    return false
                }
                let params = this.advice
                params.type = 1
                this.$api.postFeedback(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success(data.data.data)
                        } else {
                            this.$message.error(data.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            handleChange(value) {
                this.order.classroom_id = value
                this.classroomIndex = this.classroomList.filter(item => item.id == value)
            },
            submitGuide: function () {
                if (!this.guide.person_name) {
                    this.$message.error("请填写姓名")
                    return false
                }
                if (!this.guide.telephone) {
                    this.$message.error("请填写联系方式")
                    return false
                }
                if (!this.guide.content) {
                    this.$message.error("请填写内容")
                    return false
                }
                let params = this.guide
                params.type = 2
                this.$api.postFeedback(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success(data.data.data)
                        } else {
                            this.$message.error(data.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            GaodeMap() {
                if (!this.foot.coordinate) {
                    return false
                }
                var map = new AMap.Map('all-map', {
                    center: this.foot.coordinate.split(","), // [纬度，经度]
                    resizeEnable: true,
                    mapStyle: 'amap://styles/whitesmoke', //设置地图的显示样式
                    zoom: 19
                });
                var temp = new AMap.Marker({
                    position: this.foot.coordinate.split(","), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                    map: map,
                    icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
                    clickable: false
                })
                AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
                    map.addControl(new AMap.ToolBar())
                    map.addControl(new AMap.Scale())
                })
            },
            toScroll(index) {
                let height
                // 移动端只要自动滚130就够了
                this.isMobile ? height = 80 : height = 150
                this.trend = index
                let top = this.$refs['scroll' + index].offsetTop - height + "px"
                $("html,body").animate({scrollTop: top}, 500)
            },
            showErrImg(e){
                e.target.src = require('@/assets/img/default.jpg')
            }
        }
    }
</script>

<style scoped>

</style>