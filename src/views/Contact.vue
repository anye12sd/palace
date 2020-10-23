<template>
    <div>
        <header-nav istrue="6"></header-nav>
        <banner></banner>
        <div class="category-box">
            <p class="category-bread-crumb">位置：<router-link tag="span" :to="{path: '/'}">文化馆首页</router-link>-<router-link tag="span" :to="{path: 'contact'}">联系我们</router-link></p>
            <p class="category-title">联系我们</p>
            <div class="contact-box flex flexWrap">
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
                    <div class="contact-box-right-title" ref="scroll1">地理位置</div>
                    <div class="contact-box-right-content">
                        <div id="all-map" class="map"></div>
                        <p class="contact-box-right-content-text">地址：{{foot.address}}</p>
                    </div>
                    <div class="contact-box-right-title" ref="scroll2">交通指南</div>
                    <div class="contact-box-right-content">
                        <p class="contact-box-right-content-text">{{foot.guide}}</p>
                    </div>
                    <div class="contact-box-right-title" ref="scroll3">开馆时间</div>
                    <div class="contact-box-right-content">
                        <p class="contact-box-right-content-text">{{foot.open_time}}</p>
                    </div>
                    <div class="contact-box-right-title" ref="scroll4">联系方式</div>
                    <div class="contact-box-right-content flex">
                        <div class="qrcode">
                            <img v-if="foot.qr_code && img_path" :src="img_path + foot.qr_code" alt="">
                            <p>微信公众号</p>
                        </div>
                        <div class="contact-way">
                            <p>电话：{{foot.telephone}}</p>
                            <p>手机：{{foot.mobile}}</p>
                            <p>邮箱：{{foot.email}}</p>
                        </div>
                    </div>
                    <div class="contact-box-right-title" ref="scroll5">场地预约</div>
                    <div class="contact-box-right-content">
                        <form @submit.prevent="submitOrder" class="contact-form">
                            <a-select class="content-input form-select" placeholder="请选择教室" v-model="order.classroom_id">
                                <template v-for="(item, index) in classroomList">
                                    <a-select-option :value="item.id" :key="index">
                                        {{item.classroom}}
                                    </a-select-option>
                                </template>
                            </a-select>
                            <a-range-picker :placeholder="['开始时间', '结束时间']" v-model="order.time" show-time></a-range-picker>
                            <a-input type="text" class="content-input form-input" v-model="order.booking_person" placeholder="请输入预约人"/>
                            <a-input type="text" class="content-input form-input" v-model="order.person_id" placeholder="请输入身份证号"/>
                            <a-input type="text" class="content-input form-input" v-model="order.company" placeholder="请输入单位"/>
                            <a-input type="text" class="content-input form-input" v-model="order.telephone" placeholder="请输入联系方式"/>
                            <a-textarea class="content-textarea" v-model="order.content" placeholder="请输入活动内容"></a-textarea>
                            <input type="submit" class="submit-btn" value="场地预约">
                        </form>
                    </div>
                    <div class="contact-box-right-title" ref="scroll6">意见建议</div>
                    <div class="contact-box-right-content">
                        <form @submit.prevent="submitAdvice" class="contact-form">
                            <a-input type="text" class="content-input form-input" v-model="advice.person_name" placeholder="请输入您的姓名"/>
                            <a-input type="text" class="content-input form-input" v-model="advice.telephone" placeholder="请输入您的联系方式"/>
                            <a-textarea class="content-textarea" v-model="advice.content"
                                      placeholder="请输入您的内容"></a-textarea>
                            <input type="submit" class="submit-btn" value="提交建议">
                        </form>
                    </div>
                    <div class="contact-box-right-title" ref="scroll7">咨询指导</div>
                    <div class="contact-box-right-content">
                        <form @submit.prevent="submitGuide" class="contact-form">
                            <a-input type="text" class="content-input form-input" v-model="guide.person_name" placeholder="请输入您的姓名"/>
                            <a-input type="text" class="content-input form-input" v-model="guide.telephone" placeholder="请输入您的联系方式"/>
                            <a-textarea class="content-textarea" v-model="guide.content" placeholder="请输入您的内容"></a-textarea>
                            <input type="submit" class="submit-btn" value="提交">
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import AMap from 'AMap'
    import $ from 'jquery'
    export default {
        name: "Contact",
        data() {
            return {
                order: {
                    classroom_id: undefined, time: undefined, booking_person: "", person_id: "", company: "", telephone: "", content: ""
                },
                advice: {
                    person_name: "", telephone: "", content: ""
                },
                guide: {
                    person_name: "", telephone: "", content: ""
                },
                activeArr: [],
                foot: "",
                trend: 1,
                classroomList: [],
                img_path: ""
            }
        },
        mounted() {
            this.fetch()
            this.GaodeMap()
            this.init()
            this.scroll()
        },
        methods: {
            fetch() {
                if (sessionStorage.getItem("foot") == null || sessionStorage.getItem("imgPath") == null) {
                    this.$api.getNewsBase()
                        .then((data) => {
                            if (data.data.code == 0 && data.data.msg == "success") {
                                console.log(data)
                                this.foot = data.data.data.foot
                                this.img_path = data.data.data.img_path
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
                            console.log(data)
                            this.classroomList = data.data.data.classroom
                        } else {
                            this.$message.error(data.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            scroll(){
                let index = this.$route.query.index
                if(index){
                    setTimeout(function(){
                        $(".contact-box-left .contact-box-left-text").eq(index - 1).click()
                    },800)
                }
            },
            init: function () {
                let top = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
                let boxTop = $(".contact-box").offset().top + top - 165
                if (top > boxTop) {
                    $(".contact-box-left").css({"position": "fixed", "top": "165px"})
                }
                $(window).scroll(function () {
                    top = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
                    if (top > boxTop) {
                        $(".contact-box-left").css({"position": "fixed", "top": "165px"})
                    } else {
                        $(".contact-box-left").css({"position": "absolute", "top": "inherit"})
                    }
                })
            },
            submitOrder: function () {
                if(!this.order.time ){
                    this.$message.error("请选择预约时间")
                    return false
                }
                if(!this.order.classroom_id){
                    this.$message.error("请选择教室")
                    return false
                }
                if(!this.order.booking_person){
                    this.$message.error("请填写预约人")
                    return false
                }
                if(!this.order.company){
                    this.$message.error("请填写单位")
                    return false
                }
                if(!this.order.content){
                    this.$message.error("请填写活动内容")
                    return false
                }
                if(!this.order.person_id ){
                    this.$message.error("请填写身份证号")
                    return false
                }
                if(!this.order.telephone ){
                    this.$message.error("请填写联系方式")
                    return false
                }
                let params = {...this.order}
                params.start_time = this.order.time && this.order.time[0].format("YYYY-MM-DD HH:mm:ss")
                params.end_time = this.order.time && this.order.time[1].format("YYYY-MM-DD HH:mm:ss")
                console.log(params)
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
            submitAdvice: function () {
                if(!this.advice.person_name ){
                    this.$message.error("请填写姓名")
                    return false
                }
                if(!this.advice.telephone ){
                    this.$message.error("请填写联系方式")
                    return false
                }
                if(!this.advice.content ){
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
            submitGuide: function () {
                if(!this.guide.person_name ){
                    this.$message.error("请填写姓名")
                    return false
                }
                if(!this.guide.telephone ){
                    this.$message.error("请填写联系方式")
                    return false
                }
                if(!this.guide.content ){
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
                if(!this.foot.coordinate){
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
                this.trend = index
                let top = this.$refs['scroll' + index].offsetTop - 150 + "px"
                console.log(top)
                $("html,body").animate({scrollTop: top}, 500)
            },
        }
    }
</script>

<style scoped>

</style>