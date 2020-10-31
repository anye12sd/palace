<template>
    <div class="enroll-outbox">
        <header-nav istrue="2"></header-nav>
        <div class="enroll-box">
            <div class="enroll-banner">
                <div class="enroll-banner-box flex flexWrap">
                    <div class="enroll-bread">位置：<router-link tag="span" :to="{path: '/'}">文化馆首页</router-link>-课程报名</div>
                    <div v-if="loginFlag" class="enroll-banner-btn-check" @click="toLogin">我已经报名，查看报名记录</div>
                    <template v-else>
                        <template v-if="loginInputFlag">
                            <form class="enroll-login flex flexWrap">
                                <div class="enroll-login-phone enroll-login-input-box">
                                    <input type="text" v-model="login.mobile" placeholder="报名时填写的手机号">
                                </div>
                                <div class="enroll-login-id enroll-login-input-box">
                                    <input type="text" v-model="login.id_card" placeholder="报名时填写的身份证号">
                                </div>
                                <div class="login-btn logined-btn enroll-login-input-box" @click="enrollLogin">登录</div>
                            </form>
                        </template>
                        <template v-else>
                            <div class="logined-status flex flexWrap">
                                <div class="login-btn enroll-login-input-box" :class="{'logined-btn': loginActive == 1}" @click="reEnroll">课程报名</div>
                                <div class="login-btn enroll-login-input-box" :class="{'logined-btn': loginActive == 2}" @click="getEnrolledCourse">报名记录</div>
                                <div class="login-btn enroll-login-input-box" :class="{'logined-btn': loginActive == 3}" @click="quit">退出登录</div>
                            </div>
                        </template>
                    </template>
                </div>
            </div>
            <div class="enroll-list">
                <div class="enroll-list-header" v-if="enrolled">
                    <div class="enroll-list-title1">
                        报名须知
                    </div>
                    <div class="enroll-list-title2">
                        一个年度每人限报两个项目
                    </div>
                </div>
                <div class="enroll-table">
                    <table cellspacing="0" cellpadding="0" border="0">
                        <thead>
                        <tr class="enroll-table-header">
                            <td v-if="enrolled">
                                <div class="enroll-table-th-cell">
                                    序号
                                </div>
                            </td>
                            <td v-if="enrolled">
                                <div class="enroll-table-th-cell">
                                    课程分类
                                </div>
                            </td>
                            <td>
                                <div class="enroll-table-th-cell">
                                    课程名称
                                </div>
                            </td>
                            <td>
                                <div class="enroll-table-th-cell">
                                    老师
                                </div>
                            </td>
                            <td>
                                <div class="enroll-table-th-cell">
                                    上课时间
                                </div>
                            </td>
                            <td v-if="enrolled">
                                <div class="enroll-table-th-cell">
                                    年龄要求
                                </div>
                            </td>
                            <td>
                                <div class="enroll-table-th-cell">
                                    课时
                                </div>
                            </td>
                            <td>
                                <div class="enroll-table-th-cell">
                                    上课教室
                                </div>
                            </td>
                            <td></td>
                        </tr>
                        <tr class="enroll-table-content" v-for="(item, index) in courseList" :key="index">
                            <td v-if="enrolled">
                                <div class="enroll-table-th-cell">
                                    {{index + 1}}
                                </div>
                            </td>
                            <td v-if="enrolled">
                                <div class="enroll-table-th-cell">
                                    {{item.category_name}}
                                </div>
                            </td>
                            <td>
                                <div class="enroll-table-th-cell">
                                    {{item.title}}
                                </div>
                            </td>
                            <td>
                                <div class="enroll-table-th-cell">
                                    {{item.teacher}}
                                </div>
                            </td>
                            <td>
                                <div class="enroll-table-th-cell">
                                    {{item.time}}
                                </div>
                            </td>
                            <td v-if="enrolled && item.age">
                                <div class="enroll-table-th-cell">
                                    {{item.age.split(",")[0] + '-' + item.age.split(",")[1] + '岁'}}
                                </div>
                            </td>
                            <td>
                                <div class="enroll-table-th-cell">
                                    {{item.times + '次'}}
                                </div>
                            </td>
                            <td>
                                <div class="enroll-table-th-cell">
                                    {{item.classroom}}
                                </div>
                            </td>
                            <td class="width20">
                                <div class="enroll-table-th-cell">
                                    <button v-if="changeCourse" class="enroll-btn" @click="toEnroll(item.category_id,item.id,item.title)">
                                        立即报名
                                    </button>
                                    <template v-else>
                                        <button v-if="item.status == 2" class="enroll-btn" @click="reEnrollCourseModal(item.id)">
                                            修改报名课程
                                        </button>
                                        <button class="enroll-btn enroll-btn-danger" @click="cancelCourse(item.id,index)">
                                            取消报名
                                        </button>
                                    </template>
                                </div>
                            </td>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
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
                    <div style="display: none">{{timer}}</div>
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
                               placeholder="请填写全名，用于签到确认"/>
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
                               placeholder="请填写手机长号，用于发送短信通知"/>
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
        <Footer></Footer>
    </div>
</template>

<script>
    import $ from 'jquery'

    export default {
        name: "Enroll",
        data() {
            return {
                enroll: {
                    flag: false,
                    category_id: "",
                    course_id: "",
                    title: "",
                    full_name: "",
                    mobile: "",
                    id_card: "",
                    short_code: "",
                    education: "",
                    address: "",
                },
                login: {
                    mobile: "13758283376",
                    id_card: "330722199403254018"
                },
                courseList: [],
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
                timer: ""
            }
        },
        mounted() {
            this.fetch()
        },
        methods: {
            fetch() {
                let params = {is_close_page: 1}
                this.$api.getCourse(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            console.log(data)
                            this.courseList = data.data.data.list
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
                this.timer = new Date().getTime()
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
            reEnrollCourseModal(id){
                this.enrollId = id
                this.changeCourseVisible = true
            },
            reEnrollCourse(){
                console.log(this.newCourse)
                if(!this.newCourse){
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
            getAllCourse(){
                if(this.allCourse.length){
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
            enrollLogin(){
                if(!this.login.mobile || !this.login.id_card){
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
            cancelCourse(id,index){
                this.$api.delCourse(id)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success("课程取消成功")
                            this.courseList.splice(index,1)
                        } else {
                            this.$message.error(data.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            toLogin(){
                this.loginFlag = false
            },
            getEnrolledCourse(){
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
            quit(){
                sessionStorage.removeItem("token")
                history.go(0)
            },
            reEnroll(){
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
            handleOk(){
                this.visible = false
            }
        }
    }
</script>

<style scoped>

</style>