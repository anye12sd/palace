<template>
    <div class="footer">
        <div class="footer-box flex flexWrap">
            <div class="footer-logo">
                <img :src="img_path + foot.foot_logo" alt="">
            </div>
            <div v-if="!isMobile" class="footer-nav-ul">
                <ul class="nav-ul flex">
                    <router-link tag="li" :to="{ path: '/' }">
                        <span>文化馆首页</span>
                    </router-link>
                    <router-link tag="li" :to="{ path: 'trends?news_id=17' }">
                        <span>文化动态</span>
                    </router-link>
                    <router-link tag="li" :to="{ path: 'activity?news_id=18' }">
                        <span>文化活动</span>
                    </router-link>
                    <router-link tag="li" :to="{ path: 'grid?news_id=19' }">
                        <span>文化普及</span>
                    </router-link>
                    <router-link tag="li" :to="{ path: 'live?news_id=20' }">
                        <span>文化直播</span>
                    </router-link>
                    <router-link tag="li" :to="{ path: 'showroom?news_id=21' }">
                        <span>数字展厅</span>
                    </router-link>
                    <router-link tag="li" :to="{ path: 'contact?news_id=0' }">
                        <span>联系我们</span>
                    </router-link>
                </ul>
            </div>
        </div>
        <template v-if="!isMobile">
            <div class="copyright">
                <span style="float: right;margin-top: -12px"><a href="http://bszs.conac.cn/sitename?method=show&id=26E63DDA065E14EEE053012819AC5150" target="_blank"><img src="../assets/img/blue.png" alt=""></a></span>
                <span>Copyright &copy;{{foot.copyright_time}} Ykol. All Rights Reserved</span>
                <span>{{foot.company_name}}版权所有</span>
                <a target="_blank" v-if="foot.foot_icp" :href="foot.foot_icp_link" style="display:inline-block;text-decoration:none;color: inherit">
                 <span>{{foot.foot_icp}}</span>
                </a>
                <span style="width: 100%">
                <a target="_blank" :href="foot.foot_wangan_link"
                   style="display:inline-block;text-decoration:none;color: inherit">
                    <img src="https://www.jihui88.com/resource_j/35bf7990-32df-4549-8389-0d6eb4ac9f36.png" style="margin-right: 8px"/>
                    <p style="display: inline-block">浙公网安备 {{foot.foot_wangan}}号</p>
                </a>
            </span>
                <div style="clear: both"></div>
            </div>
        </template>
        <template v-else>
            <div class="copyright">
<!--                <span style="float: right;margin-top: -12px"><a href="http://bszs.conac.cn/sitename?method=show&id=26E63DDA065E14EEE053012819AC5150" target="_blank"><img src="../assets/img/blue.png" alt=""></a></span>-->
                <p>Copyright &copy;{{foot.copyright_time}} Ykol. All Rights Reserved</p>
                <p>{{foot.company_name}}版权所有</p>
                <a target="_blank" v-if="foot.foot_icp" :href="foot.foot_icp_link" style="display:inline-block;text-decoration:none;color: inherit">
                    <span>{{foot.foot_icp}}</span>
                </a>
                <span style="width: 100%">
                    <a target="_blank" :href="foot.foot_wangan_link" style="display:inline-block;text-decoration:none;color: inherit">
                        <p style="display: inline-block">浙公网安备 {{foot.foot_wangan}}号</p>
                        <img src="https://www.jihui88.com/resource_j/35bf7990-32df-4549-8389-0d6eb4ac9f36.png" style="margin-left: 8px; vertical-align: sub"/>
                    </a>
                </span>
                <div style="clear: both"></div>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        name: "Footer",
        props: {
            isMobile: Boolean
        },
        data() {
            return {
                foot: "",
                img_path: "",
                timer: false
            }
        },
        mounted() {
            this.fetch()
        },
        methods: {
            fetch() {
                if (sessionStorage.getItem("foot") == null || sessionStorage.getItem("imgPath") == null) {
                    this.$api.getNewsBase()
                        .then((data) => {
                            if (data.data.code == 0 && data.data.msg == "success") {
                                sessionStorage.setItem("menu", JSON.stringify(data.data.data.menu))
                                this.foot = data.data.data.foot
                                this.img_path = data.data.data.img_path
                                sessionStorage.setItem("imgPath", JSON.stringify(data.data.data.img_path))
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
                    this.img_path = JSON.parse(sessionStorage.getItem("imgPath"))
                }
            }
        }
    }
</script>

<style scoped>

</style>