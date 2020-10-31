<template>
    <div>
        <remote-js src="http://pv.sohu.com/cityjson?ie=utf-8"></remote-js>
        <header-nav istrue="2"></header-nav>
        <banner v-if="imgFlag" :bannerImg="bannerImg"></banner>
        <div id="qrcode" ref="qrcode" style="display: none"></div>
        <div class="category-box" :class="{ptFlag: !imgFlag}">
            <p class="category-bread-crumb">位置：
                <router-link tag="span" :to="{path: '/'}">文化馆首页</router-link>
                -
                <router-link tag="span" :to="{path: cateUrl}">{{dataDetail.cate_name}}</router-link>
                -{{dataDetail.title}}
            </p>
            <template v-if="dataDetail.status == 2 || dataDetail.status == 3">
                <div class="news-video-box">
                    <a v-if="dataDetail.status == 2" :href="dataDetail.video" target="_blank" class="news-video-box-a">
                        <div class="news-video-box-mask">
                            <img src="../assets/img/video.png" alt="">
                        </div>
                        <img :src="img_path + dataDetail.image" alt="" class="news-video-box-img">
                    </a>
                    <a v-else :href="dataDetail.live" target="_blank" class="news-video-box-a">
                        <div class="news-video-box-mask">
                            <img src="../assets/img/video.png" alt="">
                        </div>
                        <img :src="img_path + dataDetail.image" alt="" class="news-video-box-img">
                    </a>
                </div>
                <div class="news-box news-box-bottom flex flexWrap">
                    <div class="news-content">
                        <p class="news-title">{{dataDetail.title}}</p>
                        <p class="news-subtitle news-subtitle-noBottom">
                            <span>发布时间：{{dataDetail.create_time}}</span>
                            <span>图文编辑：{{dataDetail.author}}</span>
                            <span>审  核：{{dataDetail.check}}</span>
                        </p>
                    </div>
                    <div class="operate">
                        <div class="good-btn" @click="toPoint">
                            <a-icon v-if="pointed" type="heart" theme="filled" style="color: rgb(243, 63, 63)"/>
                            <a-icon v-else type="heart" style="color: #686b67"/>
                            <span>点赞</span></div>
                        <div class="share-btn" @click="openShareBox">
                            <a-icon type="share-alt" />
                            <span>分享</span>
                        </div>
                        <div v-if="shareBox" class="share-box">
                            <a-icon type="qq" class="share-total share-qq" title="分享到qq" @click="share('qq')"/>
                            <a-icon type="weibo" class="share-total share-weibo" title="分享到微博" @click="share('weibo')"/>
                            <a-icon type="wechat" theme="filled" class="share-total share-wechat" title="分享到微信" @click="share('wechat')"/>
                            <span class="scan-code">
                                <img :src="qrcodeImg" alt="Scan me!">
                            </span>
                        </div>
                    </div>
                </div>
                <div class="news-box-tab flex flexWrap" v-if="catalog.length || dataDetail.content">
                    <div class="catalog flex-1">
                        <div>
                            <a-tabs default-active-key="0">
                                <a-tab-pane v-if="dataDetail.content" key="0" tab="活动简介">
                                    <p class="tab-activity" v-html="dataDetail.content"></p>
                                </a-tab-pane>
                                <template v-for="(item, index) in catalog">
                                    <a-tab-pane v-if="catalogContent[index].content" :key="index+1" :tab="item.label">
                                        <div v-html="catalogContent[index].content"></div>
                                    </a-tab-pane>
                                </template>
                                <!--                                <a-tab-pane key="2" tab="Tab 2">-->
                                <!--                                    Content of Tab Pane 2-->
                                <!--                                </a-tab-pane>-->
                                <!--                                <a-tab-pane key="3" tab="Tab 3">-->
                                <!--                                    Content of Tab Pane 3-->
                                <!--                                </a-tab-pane>-->
                            </a-tabs>
                        </div>
                    </div>
                    <div class="recommend-content" v-if="relation">
                        <p class="recommend-content-title">推荐</p>
                        <router-link tag="div" :to="{path: '/newsDetail', query: {id: relation.id}}"
                                     class="recommend-box">
                            <img :src="img_path + relation.image" alt="">
                            <p class="recommend-content-time">{{relation.create_time}}</p>
                            <div class="recommend-content-text flex flexWrap">
                                <p class="recommend-content-text-title">{{relation.cate_name}}</p>
                                <p class="recommend-content-text-content flex-1">{{relation.title}}</p>
                            </div>
                        </router-link>
                        <div class="qrcode-img-box">
                            <img src="../assets/img/qrcode1.png" alt="">
                            <img :src="qrImg" alt="" class="qrcode-img-box-img">
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="news-box flex flexWrap">
                    <div class="news-content">
                        <p class="news-title">{{dataDetail.title}}</p>
                        <p class="news-subtitle">
                            <span>发布时间：{{dataDetail.create_time}}</span>
                            <span>图文编辑：{{dataDetail.author}}</span>
                            <span>审  核：{{dataDetail.check}}</span>
                        </p>
                        <div class="news">
                            <div class="" v-html="dataDetail.content"></div>
                        </div>
                    </div>
                    <div class="recommend-content" v-if="relation">
                        <router-link tag="div" :to="{path: '/newsDetail', query: {id: relation.id}}"
                                     class="recommend-box">
                            <img :src="img_path + relation.image" alt="">
                            <p class="recommend-content-time">{{relation.create_time}}</p>
                            <div class="recommend-content-text flex flexWrap">
                                <p class="recommend-content-text-title">{{relation.cate_name}}</p>
                                <p class="recommend-content-text-content flex-1">{{relation.title}}</p>
                            </div>
                        </router-link>
                        <div class="qrcode-img-box">
                            <img src="../assets/img/qrcode1.png" alt="">
                            <img :src="qrImg" alt="" class="qrcode-img-box-img">
                        </div>
                    </div>
                </div>
            </template>
            <div class="foot-nav">
                <template>
                    <p v-if="dataPrev == null">上一篇：没有了</p>
                    <p class="prev-paper" v-else :data-id="dataPrev.id" @click="toDetail($event)">
                        上一篇：{{dataPrev.title}}</p>
                </template>
                <template>
                    <p v-if="dataNext == null">下一篇：没有了</p>
                    <p class="next-paper" v-else :data-id="dataNext.id" @click="toDetail($event)">
                        下一篇：{{dataNext.title}}</p>
                </template>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import QRCode from 'qrcodejs2'
    export default {
        name: "NewsDetail",
        components: {
            'remote-js': {
                render(createElement){
                    return createElement('script',{ attrs: { type: 'text/javascript', src: this.src }})
                },
                props: {
                    src: { type: String, required: true},
                },
            }
        },
        data() {
            return {
                dataDetail: "",
                dataPrev: "",
                dataNext: "",
                cateUrl: "",
                catalog: [],
                catalogContent: [],
                img_path: "",
                relation: "",
                bannerImg: "",
                imgFlag: "",
                qrImg: "",
                pointed: false,
                shareBox: false,
                qrcodeImg: "",
                ip: ""
            }
        },
        mounted() {
            this.fetch()
            this.qrcodeScan();
            // this.getNewsId() // 获取banner图
        },
        watch: {
            $route() {
                this.fetch();
            }
        },
        methods: {
            getBanner: function () {
                let news_id = this.$route.query.id
                let imgPath = JSON.parse(sessionStorage.getItem("imgPath"))
                let menu = JSON.parse(sessionStorage.getItem("menu"))
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
            },
            openShareBox(){
                let qrcodeImg = document.getElementById("qrcode").lastChild.getAttribute("src")
                this.qrcodeImg = qrcodeImg
                this.shareBox = !this.shareBox
            },
            share(val){
                let href = window.location.href
                if(val == 'qq'){
                    window.open('https://connect.qq.com/widget/shareqq/index.html?title='+this.dataDetail.title+'&url='+href,"_blank")
                }else if(val == 'weibo'){
                    window.open('https://service.weibo.com/share/share.php?title='+this.dataDetail.title+'&url='+href,"_blank")
                }
            },
            toPoint: function () {
                // 点赞
                let params = {news_id: this.dataDetail.id,ip: returnCitySN["cip"]}
                this.$api.postLikes(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.pointed = true
                            this.$message.success(data.data.data)
                        } else {
                            this.$message.error(data.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            // getNewsId: function (id) {
            //     let params = {cate_id: id}
            //     // let params = {cate_id: 17}
            //     // 需要写死17因为目前拿不到cate_id
            //     this.$api.getNewsCate(params)
            //         .then((data) => {
            //             if (data.data.code == 0 && data.data.msg == "success") {
            //                 this.bannerImg = data.data.data.img_path + data.data.data.list[0].image
            //                 this.imgFlag = data.data.data.list[0].image
            //             } else {
            //                 this.$message.error(data.data.msg)
            //             }
            //         })
            //         .catch((err) => {
            //             console.log(err)
            //         })
            // },
            fetch: function (value) {
                let params = {news_id: value ? value : this.$route.query.id}
                this.$api.getNewsDetail(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            console.log(data)
                            this.dataDetail = data.data.data.detail
                            this.dataNext = data.data.data.next_list
                            this.dataPrev = data.data.data.prev_list
                            this.img_path = data.data.data.img_path
                            let foot = JSON.parse(sessionStorage.getItem("foot"))
                            this.qrImg = this.img_path + foot.qr_code
                            this.getBanner(data.data.data.detail.cate_id)
                            if (data.data.data.detail.relation) {
                                this.relation = data.data.data.detail.relation
                            } else {
                                this.getRelation(data.data.data.detail.cate_id)
                            }
                            this.getCateUrl(this.dataDetail.cate_id)
                            if (this.dataDetail.status == 2 || this.dataDetail.status == 3) {
                                this.catalog = this.dataDetail.catalog
                                this.catalogContent = this.dataDetail.catalog_content
                            }
                            // this.getNewsId(this.dataDetail.cate_id)
                            window.scrollTo(0, 0)
                        } else {
                            this.$message.error(data.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            getRelation: function (id) {
                let params = {cate_id: id}
                this.$api.getNewsList(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            console.log(data)
                            this.relation = data.data.data.list[0]
                        } else {
                            this.$message.error(data.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            toDetail: function (e) {
                this.$router.push({path: 'newsDetail', query: {id: e.target.dataset.id}})
                this.fetch(e.target.dataset.id)
            },
            getCateUrl(id) {
                switch (id) {
                    case 17:
                        this.cateUrl = 'trends?news_id=' + id
                        break
                    case 18:
                        this.cateUrl = 'activity?news_id=' + id
                        break
                    case 19:
                        this.cateUrl = 'grid?news_id=' + id
                        break
                    case 20:
                        this.cateUrl = 'live?news_id=' + id
                        break
                    case 21:
                        this.cateUrl = 'showroom?news_id=' + id
                        break
                }
            },
            qrcodeScan () {//生成二维码
                let qrcode = new QRCode('qrcode', {
                    width: 200,  // 二维码宽度
                    height: 200, // 二维码高度
                    text: 'https://mp.csdn.net',
                    correctLevel: 3
                })
            },
        }
    }
</script>

<style scoped>

</style>