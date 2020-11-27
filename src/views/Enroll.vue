<template>
    <div class="enroll-outbox">
        <template v-if="!isMobile">
            <div class="enroll-box">
                <div class="enroll-banner">
                    <div class="enroll-banner-box flex flexWrap">
                        <div class="enroll-box-title">（报名须知：一个年度每人限报两个项目）</div>
                        <div v-if="loginFlag" class="enroll-banner-btn-check" @click="toLogin">我已经报名，查看报名记录</div>
                        <div v-else>
                            <template v-if="loginInputFlag">
                                <form class="enroll-login flex flexWrap">
                                    <div class="enroll-login-phone enroll-login-input-box">
                                        <input type="text" v-model="login.mobile" placeholder="报名时填写的手机号">
                                    </div>
                                    <div class="enroll-login-id enroll-login-input-box">
                                        <input type="text" v-model="login.id_card" placeholder="报名时填写的身份证号">
                                    </div>
                                    <div class="login-btn logined-btn enroll-login-input-box" @click="enrollLogin">登录
                                    </div>
                                </form>
                            </template>
                            <template v-else>
                                <div class="logined-status flex flexWrap">
                                    <div class="login-btn enroll-login-input-box"
                                         :class="{'logined-btn': loginActive == 1}" @click="reEnroll">课程报名
                                    </div>
                                    <div class="login-btn enroll-login-input-box"
                                         :class="{'logined-btn': loginActive == 2}" @click="getEnrolledCourse">报名记录
                                    </div>
                                    <div class="login-btn enroll-login-input-box"
                                         :class="{'logined-btn': loginActive == 3}" @click="quit">退出登录
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
                <div v-if="changeCourse" class="course-category flex">
                    <div :class="{'active': 0 == courseActiveId}" @click="fetch('')">全部</div>
                    <template v-for="(item, index) in allCourse">
                        <div :key="index" :class="{'active': item.id == courseActiveId}" @click="fetch(item.id)">{{item.category_name}}</div>
                    </template>
                </div>
                <div class="enroll-list flex flexWrap">
                    <template v-for="(item, index) in courseList">
                        <div :key="index" class="culture-content-left enroll-list-table flex-1">
                            <img :src="img_path + item.image[0] + '!/both/450x340'" alt="" @error="showErrImg">
<!--                            <img src="x" alt="" @error="showErrImg">-->
                            <p class="culture-content-left-time">{{item.time}}</p>
                            <p class="culture-content-left-text">
                                <span class="culture-content-left-text-title">{{item.category_name}}</span>
                                <span class="culture-content-left-text-content">{{item.title}}</span>
                            </p>
                            <p class="culture-content-left-teacher">
                                老师：{{item.teacher}}
                            </p>
                            <p v-if="item.age" class="culture-content-left-teacher">
                                年龄要求：{{item.age.split(",")[0] +'-'+ item.age.split(",")[1]}}岁；课时{{item.times}}次
                            </p>
                            <p class="culture-content-left-teacher">
                                上课教室：{{item.classroom}}
                            </p>
                            <template v-if="changeCourse">
                                <div class="enroll-btn" @click="toEnroll(item.category_id,item.id,item.title)">
                                    立即报名
                                </div>
                            </template>
                            <template v-else>
                                <div class="enroll-btn-box flex">
                                    <div class="enroll-btn" @click="reEnrollCourseModal(item.id)">
                                        修改报名课程
                                    </div>
                                    <div class="enroll-btn-danger" @click="cancelCourse(item.id,index)">
                                        取消报名
                                    </div>
                                </div>
                            </template>
                        </div>
                    </template>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="enroll-box">
                <div class="enroll-banner">
                    <div class="enroll-banner-box flex flexWrap">
                        <div v-if="loginFlag" class="enroll-banner-btn-check" @click="toLogin">我已经报名，查看报名记录</div>
                        <div v-else>
                            <template v-if="loginInputFlag">
                                <div class="enroll-form-mask"></div>
                                <form class="enroll-login">
                                    <div class="enroll-login-title">请登录</div>
                                    <div class="enroll-login-phone enroll-login-input-box flex">
                                        <span class="form-label form-must">手机号</span>
                                        <input class="flex-1" type="text" v-model="login.mobile" placeholder="报名时填写的手机号">
                                    </div>
                                    <div class="enroll-login-id enroll-login-input-box flex">
                                        <span class="form-label form-must">身份证</span>
                                        <input class="flex-1" type="text" v-model="login.id_card" placeholder="报名时填写的身份证号">
                                    </div>
                                    <div class="login-btn logined-btn enroll-login-input-box" @click="enrollLogin">登录
                                    </div>
                                    <div class="login-btn canceled-btn enroll-login-input-box" @click="cancelEnrollLogin">取消
                                    </div>
                                </form>
                            </template>
                            <template v-else>
                                <div class="logined-status flex flexWrap">
                                    <div class="login-btn enroll-login-input-box"
                                         :class="{'logined-btn': loginActive == 1}" @click="reEnroll">课程报名
                                    </div>
                                    <div class="login-btn enroll-login-input-box"
                                         :class="{'logined-btn': loginActive == 2}" @click="getEnrolledCourse">报名记录
                                    </div>
                                    <div class="login-btn enroll-login-input-box"
                                         :class="{'logined-btn': loginActive == 3}" @click="quit">退出登录
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
                <div v-if="!changeCourse" class="enroll-box-title">（报名须知：一个年度每人限报两个项目）</div>
                <div v-if="changeCourse" class="course-category flex flexWrap">
                    <div :class="{'active': 0 == courseActiveId}" @click="fetch('')">全部</div>
                    <template v-for="(item, index) in allCourse">
                        <div :key="index" :class="{'active': item.id == courseActiveId}" @click="fetch(item.id)">{{item.category_name}}</div>
                    </template>
                </div>
                <div class="enroll-list">
                    <div class="enroll-table">
                        <div class="enroll-mobile-list-box">
<!--                            <template v-for="(item, index) in courseList">-->
<!--                                <div :key="index" class="enroll-mobile-list-out">-->
<!--                                    <div class="enroll-mobile-list-show flex flexWrap">-->
<!--                                        <div class="class-info" @click="showClassDetail">-->
<!--                                            <div class="class-info-name">{{item.title}}</div>-->
<!--                                            <div class="class-info-teacher-name">{{item.teacher}}</div>-->
<!--                                        </div>-->
<!--                                        <div v-if="changeCourse" class="class-enroll-btn flex flexWrap">-->
<!--                                            <div class="class-enroll" @click="toEnroll(item.category_id,item.id,item.title)">立即报名</div>-->
<!--                                            <div class="class-showDetail" @click="showClassDetail"></div>-->
<!--                                        </div>-->
<!--                                        <template v-else>-->
<!--                                            <button v-if="item.status == 2" class="enroll-btn"-->
<!--                                                    @click="reEnrollCourseModal(item.id)">-->
<!--                                                修改报名课程-->
<!--                                            </button>-->
<!--                                            <button class="enroll-btn enroll-btn-danger"-->
<!--                                                    @click="cancelCourse(item.id,index)">-->
<!--                                                取消报名-->
<!--                                            </button>-->
<!--                                        </template>-->
<!--                                    </div>-->
<!--                                    <div class="enroll-mobile-list-hide" :key="index">-->
<!--                                        <div class="flex flexWrap">-->
<!--                                            <div class="enroll-mobile-list-detail">-->
<!--                                                <span class="enroll-mobile-list-detail-name">课程分类</span>-->
<!--                                                <span class="enroll-mobile-list-detail-content">{{item.category_name}}</span>-->
<!--                                            </div>-->
<!--                                            <div class="enroll-mobile-list-detail">-->
<!--                                                <span class="enroll-mobile-list-detail-name">上课时间</span>-->
<!--                                                <span class="enroll-mobile-list-detail-content">{{item.time}}</span>-->
<!--                                            </div>-->
<!--                                            <div v-if="enrolled && item.age" class="enroll-mobile-list-detail">-->
<!--                                                <span class="enroll-mobile-list-detail-name">年龄要求</span>-->
<!--                                                <span class="enroll-mobile-list-detail-content">{{item.age.split(",")[0] + '-' + item.age.split(",")[1] + '岁'}}</span>-->
<!--                                            </div>-->
<!--                                            <div class="enroll-mobile-list-detail">-->
<!--                                                <span class="enroll-mobile-list-detail-name">课时</span>-->
<!--                                                <span class="enroll-mobile-list-detail-content">{{item.times}}</span>-->
<!--                                            </div>-->
<!--                                            <div class="enroll-mobile-list-detail">-->
<!--                                                <span class="enroll-mobile-list-detail-name">上课教室</span>-->
<!--                                                <span class="enroll-mobile-list-detail-content">{{item.classroom}}</span>-->
<!--                                            </div>-->
<!--                                        </div>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                            </template>-->
                            <template v-for="(item, index) in courseList">
                                <div :key="index" class="culture-content-left enroll-list-table flex-1">
                                    <img :src="img_path + item.image[0] + '!/both/450x340'" alt="" @error="showErrImg">
                                    <p class="culture-content-left-time">{{item.time}}</p>
                                    <p class="culture-content-left-text flex">
                                        <span class="culture-content-left-text-title">{{item.category_name}}</span>
                                        <span class="culture-content-left-text-content">{{item.title}}</span>
                                    </p>
                                    <p class="culture-content-left-teacher">
                                        老师：{{item.teacher}}
                                    </p>
                                    <p v-if="item.age" class="culture-content-left-teacher">
                                        年龄要求：{{item.age.split(",")[0] +'-'+ item.age.split(",")[1]}}岁；课时{{item.times}}次
                                    </p>
                                    <p class="culture-content-left-teacher">
                                        上课教室：{{item.classroom}}
                                    </p>
                                    <template v-if="changeCourse">
                                        <div class="enroll-btn" @click="toEnroll(item.category_id,item.id,item.title)">
                                            立即报名
                                        </div>
                                    </template>
                                    <template v-else>
                                        <div class="enroll-btn-box flex">
                                            <div class="enroll-btn" @click="reEnrollCourseModal(item.id)">
                                                修改报名课程
                                            </div>
                                            <div class="enroll-btn-danger" @click="cancelCourse(item.id,index)">
                                                取消报名
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <div class="enroll-form-box">
            <div class="enroll-form-mask"></div>
            <div class="enroll-form">
                <div class="form-title">
                    <span class="form-title1">填写报名表</span>
                    <span class="form-title2">一个年度每人限报两个项目</span>
                    <div class="form-title-close">
                        <i class="form-title-close-icon" @click="cancelEnroll"></i>
                    </div>
                </div>
                <form>
                    <div style="display: none">{{setTimer}}</div>
                    <div class="enroll-form-input-box flexWrap flex">
                        <span class="form-label">课程名称</span>
                        <input type="text"
                               class="enroll-form-input enroll-form-input-disabled flex-1"
                               v-model="enroll.title" readonly/>
                    </div>
                    <div class="enroll-form-input-box flexWrap flex">
                        <span class="form-label form-must">报名人姓名</span>
                        <input type="text" @blur="showErr('nameErr')"
                               class="enroll-form-input flex-1"
                               v-model="enroll.full_name"
                               placeholder="请填写全名"/>
                        <div class="enroll-form-input-error" ref="nameErr">请填写姓名</div>
                    </div>
                    <div class="enroll-form-input-box flexWrap flex">
                        <span class="form-label form-must">报名人身份证</span>
                        <input type="text" @blur="showErr('idErr')"
                               class="enroll-form-input flex-1"
                               v-model="enroll.id_card" placeholder=""/>
                        <div class="enroll-form-input-error" ref="idErr">请填写正确的身份证号码</div>
                    </div>
                    <div class="enroll-form-input-box flexWrap flex">
                        <span class="form-label form-must">报名人手机</span>
                        <input type="text" @blur="showErr('phoneErr')"
                               class="enroll-form-input flex-1"
                               v-model="enroll.mobile"
                               placeholder="请填写手机长号"/>
                        <div class="enroll-form-input-error" ref="phoneErr">请填写正确的手机号</div>
                    </div>
                    <div class="enroll-form-input-box flexWrap flex">
                        <span class="form-label">报名人短号</span>
                        <input type="text" class="enroll-form-input flex-1"
                               v-model="enroll.short_code" placeholder="6位市府网短号"/>
                    </div>
                    <div class="enroll-form-input-box flexWrap flex">
                        <span class="form-label">报名人学历</span>
                        <input type="text" class="enroll-form-input flex-1"
                               v-model="enroll.education"
                               placeholder="如：高中，大专，本科"/>
                    </div>
                    <div class="enroll-form-input-box flexWrap flex">
                        <span class="form-label">报名人地址</span>
                        <input type="text" class="enroll-form-input flex-1"
                               v-model="enroll.address" placeholder=""/>
                    </div>
                </form>
                <div class="enroll-form-btn-box">
                    <div class="submit-btn-cancel" @click="cancelEnroll">取消</div>
                    <div class="submit-btn-complete" @click="sureEnroll">完成</div>
                </div>
            </div>
            <div>
                <a-modal v-model="visible" title="报名成功" on-ok="handleOk">
                    <template slot="footer">
                        <a-button class="button-primary" type="primary" @click="handleOk">
                            好的
                        </a-button>
                    </template>
                    <p>请耐心等待文化馆通知</p>
                </a-modal>
            </div>
            <div>
                <a-modal v-model="changeCourseVisible" title="修改报名课程" @ok="reEnrollCourse" okText="确定" cancelText="取消">
                    <a-select class="enroll-select" v-model="newCourse" placeholder="请选择课程">
                        <template v-for="(item, index) in allCourse">
                            <a-select-opt-group :key="index" :label="item.category_name">
                                <template v-for="(items, indexes) in item.children">
                                    <a-select-option :value="items.id+','+items.category_id" :key="indexes">
                                        {{items.title}}
                                    </a-select-option>
                                </template>
                            </a-select-opt-group>
                        </template>
                    </a-select>
                </a-modal>
            </div>
        </div>
    </div>
</template>

<script>
    // import $ from 'jquery'

    export default {
        name: "Enroll",
        data() {
            return {
                enroll: {
                    flag: false,
                    category_id: "",
                    course_id: "",
                    title: "",
                    full_name: "东方五金网测试",
                    mobile: "13758283376",
                    id_card: "330722199403254018",
                    short_code: "",
                    education: "",
                    address: "",
                },
                login: {
                    mobile: "13758283376",
                    id_card: "330722199403254018"
                },
                courseList: [],
                img_path: "",
                originWidth: 1,
                allCourse: [],
                enrollId: "",
                loginActive: 2,
                loginFlag: true,
                newCourse: undefined,
                loginInputFlag: true,
                enrolled: true, // 已登录状态
                changeCourse: true,
                visible: false,
                changeCourseVisible: false,
                setTimer: "",
                timer: false,
                isMobile: false,
                courseActiveId: 0
            }
        },
        mounted() {
            this.fetch()
            if (document.body.clientWidth <= 768) {
                this.isMobile = true
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
            fetch(id) {
                this.courseActiveId = 0
                let params = {is_close_page: 1}
                if(id){
                    params.category_id = id;
                    this.courseActiveId = id
                }
                this.$api.getCourse(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            console.log(data)
                            this.img_path = data.data.data.img_path
                            this.courseList = data.data.data.list
                            this.getAllCourse()
                        } else {
                            this.$message.error(data.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            toEnroll(category_id, id, title) {
                this.enroll.category_id = category_id
                this.enroll.course_id = id
                this.enroll.title = title
                this.setTimer = new Date().getTime()
                $(".enroll-form-box").fadeIn()
            },
            cancelEnroll() {
                $(".enroll-form-box").fadeOut()
            },
            sureEnroll() {
                if (!this.enroll.flag) {
                    this.$message.error("请先完善表单")
                    return false
                } else {
                    let params = {...this.enroll}
                    console.log(params)
                    this.$api.postCourse(params)
                        .then((data) => {
                            if (data.data.code == 0 && data.data.msg == "success") {
                                console.log(data)
                                sessionStorage.setItem("token", data.data.data.token)
                                $(".enroll-form-box").fadeOut()
                                this.visible = true
                            } else {
                                this.$message.error(data.data.msg)
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
            },
            reEnrollCourseModal(id) {
                this.enrollId = id
                this.changeCourseVisible = true
            },
            reEnrollCourse() {
                console.log(this.newCourse)
                if (!this.newCourse) {
                    this.$message.error("请先选择课程")
                }
                let newCourse = this.newCourse.split(",")
                let params = {course_id: newCourse[0], category_id: newCourse[1], status: "2"}
                this.$api.putCourse(this.enrollId, params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            console.log(data)
                            this.$message.success("更改成功，等待排课")
                            this.getEnrolledCourse()
                            this.changeCourseVisible = false
                        } else {
                            this.$message.error(data.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            getAllCourse() {
                if (this.allCourse.length) {
                    return false
                }
                this.$api.getCourseTree()
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            console.log(data)
                            this.allCourse = data.data.data.list
                        } else {
                            this.$message.error(data.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            cancelEnrollLogin(){
                this.loginFlag = true
            },
            enrollLogin() {
                if (!this.login.mobile || !this.login.id_card) {
                    this.$message.error("请先填写手机号和身份证")
                    return false
                }
                let params = {...this.login}
                this.$api.postLogin(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            console.log(data)
                            this.$message.success("登录成功")
                            sessionStorage.setItem("token", data.data.data.token)
                            sessionStorage.setItem("userStatus", JSON.stringify(data.data.data.user))
                            this.loginInputFlag = false
                            this.loginActive = 2
                            this.getEnrolledCourse()
                            this.getAllCourse()
                        } else {
                            this.$message.error(data.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            cancelCourse(id, index) {
                this.$api.delCourse(id)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success("课程取消成功")
                            this.courseList.splice(index, 1)
                        } else {
                            this.$message.error(data.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            toLogin() {
                this.loginFlag = false
            },
            getEnrolledCourse() {
                this.loginActive = 2
                this.$api.getSign()
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            console.log(data)
                            this.changeCourse = false
                            this.enrolled = false
                            this.courseList = data.data.data.list
                        } else {
                            this.$message.error(data.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            quit() {
                sessionStorage.removeItem("token")
                history.go(0)
            },
            reEnroll() {
                this.fetch()
                this.loginActive = 1
                this.changeCourse = true
                this.enrolled = true
                let user = sessionStorage.getItem("userStatus")
                user = JSON.parse(user)
                this.enroll = {...user}
            },
            showErr: function (val) {
                let idRegexp = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
                let mobileRegexp = /^1[3456789]\d{9}$/
                if (val == 'nameErr') {
                    if (!this.enroll.full_name) {
                        this.$refs[val].style.opacity = '100%';
                        return false
                    } else {
                        this.$refs[val].style.opacity = '0';
                    }
                }
                if (val == 'idErr') {
                    if (!idRegexp.test(this.enroll.id_card)) {
                        this.$refs[val].style.opacity = '100%';
                        return false
                    } else {
                        this.$refs[val].style.opacity = '0';
                    }
                }
                if (val == 'phoneErr') {
                    if (!mobileRegexp.test(this.enroll.mobile)) {
                        this.$refs[val].style.opacity = '100%';
                        return false
                    } else {
                        this.$refs[val].style.opacity = '0';
                    }
                }
                this.enroll.flag = true
            },
            handleOk() {
                this.visible = false
            },
            showClassDetail(e) {
                $(e.target).parents(".enroll-mobile-list-out").children(".enroll-mobile-list-hide").slideToggle()
                $(e.target).parents(".enroll-mobile-list-out").find(".class-showDetail").toggleClass("class-hideDetail")
            },
            showErrImg(e){
                e.target.src = require('@/assets/img/default.jpg')
            }
        }
    }
</script>

<style scoped>

</style>