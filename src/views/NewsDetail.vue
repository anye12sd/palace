<template>
    <div>
        <!--        <remote-js src="http://pv.sohu.com/cityjson?ie=utf-8"></remote-js>-->
        <header-nav :istrue="cate_id"></header-nav>
        <banner v-if="imgFlag" :bannerImg="bannerImg"></banner>
        <div id="qrcode" ref="qrcode" style="display: none"></div>
        <template v-if="!isMobile">
            <div class="category-box" :class="{ptFlag: !imgFlag}">
                <p class="category-bread-crumb">位置：
                    <router-link tag="span" :to="{path: '/'}">文化馆首页</router-link>
                    <router-link v-if="cateParentUrl.url" tag="span" :to="{path: cateParentUrl.url}"> -
                        {{cateParentUrl.title}}
                    </router-link>
                    <router-link v-if="cateUrl" tag="span" :to="{path: cateUrl}"> - {{dataDetail.cate_name}}
                    </router-link>
                    -
                    {{dataDetail.title}}
                </p>
                <template v-if="dataDetail.status == 2 || dataDetail.status == 3">
                    <div class="news-video-box">
                        <div v-if="dataDetail.status == 2" class="news-video-box-a">
                            <template v-if="videoType == 1">
                                <a :href="dataDetail.video" target="_blank" class="news-video-box-a">
                                    <div v-show="videoPauseBox" class="news-video-box-mask news-video-box-mask-cover-all">
                                        <img src="../assets/img/video.png" alt="">
                                    </div>
                                    <img :src="img_path + dataDetail.image + imgWidth.swiperImg" alt="" class="news-video-box-img" @error="showErrImg">
                                </a>
                            </template>
                            <template v-else>
                                <div v-show="videoPauseBox" class="news-video-box-mask" @click.stop="getVideo">
<!--                                    <img src="../assets/img/video.png" :class="{'video-pause-hide': !videoPause}" alt="">-->
                                </div>
                                <video :poster="img_path + dataDetail.image + imgWidth.swiperImg" controls class="news-video" id="video" controlslist="nodownload">
                                    <source :src="videoUrl + videoLink" type="video/mp4">
                                    <object id="flowplayer" width="400" height="300"
                                            data="flowplayer-3.2.18.swf"
                                            type="application/x-shockwave-flash">
                                        <param name="movie" value="flowplayer-3.2.18.swf">
                                        <param name="flashvars" :value="'config={clip:'+videoUrl + videoLink+'}'">
                                    </object>
                                </video>
                            </template>
                        </div>
                        <!--                        <div v-if="dataDetail.status == 2" class="news-video-box-a">-->
                        <!--                        <a v-if="dataDetail.status == 2" :href="dataDetail.video" target="_blank" class="news-video-box-a">-->
                        <!--                            <div v-if="videoPause" class="news-video-box-mask">-->
                        <!--                                <img src="../assets/img/video.png" alt="">-->
                        <!--                            </div>-->
                        <!--&lt;!&ndash;                                腾讯视频播放器&ndash;&gt;-->
                        <!--&lt;!&ndash;                            <div v-else class="videoPlay">&ndash;&gt;-->
                        <!--&lt;!&ndash;                                <div id="container" class="video-wrapper"></div>&ndash;&gt;-->
                        <!--&lt;!&ndash;                            </div>&ndash;&gt;-->
                        <!--                            <img :src="img_path + dataDetail.image + imgWidth.swiperImg" alt="" class="news-video-box-img" @error="showErrImg">-->
                        <!--                        </a>-->
                        <a v-else :href="dataDetail.live" target="_blank" class="news-video-box-a">
                            <div class="news-video-box-mask">
                                <img src="../assets/img/video.png" alt="">
                            </div>
                            <img :src="img_path + dataDetail.image + imgWidth.swiperImg" alt=""
                                 class="news-video-box-img" @error="showErrImg">
                        </a>
                    </div>
                    <div class="news-box news-box-bottom flex flexWrap">
                        <div class="news-content">
                            <p class="news-title">{{dataDetail.title}}</p>
                            <p class="news-subtitle news-subtitle-noBottom">
                                <span>{{dataDetail.visits}}次浏览</span>
                                <span>发布时间：{{dataDetail.create_time}}</span>
                                <span>来源：{{dataDetail.source}}</span>
                                <!--                                <span>图文编辑：{{dataDetail.author}}</span>-->
                                <!--                                <span>审  核：{{dataDetail.check}}</span>-->
                            </p>
                        </div>
                        <div class="operate">
                            <div class="good-btn" @click="toPoint">
                                <a-icon v-if="pointed" type="heart" theme="filled" style="color: rgb(243, 63, 63)"/>
                                <a-icon v-else type="heart" style="color: #686b67"/>
                                <span>点赞</span></div>
                            <div class="share-btn" @click="openShareBox">
                                <a-icon type="share-alt"/>
                                <span>分享</span>
                            </div>
                            <div v-if="shareBox" class="share-box">
                                <a-icon type="qq" class="share-total share-qq" title="分享到qq" @click="share('qq')"/>
                                <a-icon type="weibo" class="share-total share-weibo" title="分享到微博"
                                        @click="share('weibo')"/>
                                <a-icon type="wechat" theme="filled" class="share-total share-wechat" title="分享到微信"
                                        @click="share('wechat')"/>
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
                                    <a-tab-pane v-if="dataDetail.catalog" key="1" tab="目录">
                                        <div class="tab-activity">
                                            <template v-for="(item, index) in catalog">
                                                <p class="catalog-p" :key="index">{{item.label}}</p>
                                            </template>
                                        </div>
                                    </a-tab-pane>
                                    <template v-for="(item, index) in catalog">
                                        <a-tab-pane
                                                v-if="catalogContent[index].content && catalogContent[index].content.length != 7"
                                                :key="index+2" :tab="item.label">
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
                        <div class="recommend-content" v-if="relation.length">
                            <p class="recommend-content-title">推荐</p>
                            <template v-for="(item, index) in relation">
                                <router-link :key="index" tag="div" :to="{path: '/newsDetail', query: {id: item.id}}"
                                             class="recommend-box">
                                    <!--                                    <img :src="img_path + item.image + imgWidth.contentImg" alt="" @error="showErrImg">-->
                                    <p class="recommend-content-text-content flex-1">{{item.title}}</p>
                                    <div class="recommend-content-text flex">
                                        <p class="recommend-content-text-title">{{item.cate_name}}</p>
                                        <p class="recommend-content-time">{{item.create_time}}</p>
                                    </div>
                                </router-link>
                            </template>
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
                                <div class="ql-editor" v-html="dataDetail.content"></div>
                            </div>
                        </div>
                        <div class="recommend-content" v-if="relation.length">
                            <p class="recommend-content-title">推荐</p>
                            <template v-for="(item, index) in relation">
                                <router-link :key="index" tag="div" :to="{path: '/newsDetail', query: {id: item.id}}"
                                             class="recommend-box">
                                    <!--                                    <img :src="img_path + relation.image + imgWidth.contentImg" alt="" @error="showErrImg">-->
                                    <p class="recommend-content-text-content flex-1">{{item.title}}</p>
                                    <div class="recommend-content-text flex">
                                        <p class="recommend-content-text-title">{{item.cate_name}}</p>
                                        <p class="recommend-content-time">{{item.create_time}}</p>
                                    </div>
                                </router-link>
                            </template>
                            <div class="qrcode-img-box">
                                <img src="../assets/img/qrcode1.png" alt="">
                                <img :src="qrImg" alt="" class="qrcode-img-box-img">
                            </div>
                        </div>
                    </div>
                </template>
                <div class="foot-nav">
                    <template>
                        <p v-if="dataPrev.title == '无'">上一篇：没有了</p>
                        <p class="prev-paper" v-else :data-id="dataPrev.id" @click="toDetail($event)">
                            上一篇：{{dataPrev.title}}</p>
                    </template>
                    <template>
                        <p v-if="dataNext.title == '无'">下一篇：没有了</p>
                        <p class="next-paper" v-else :data-id="dataNext.id" @click="toDetail($event)">
                            下一篇：{{dataNext.title}}</p>
                    </template>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="category-box" :class="{ptFlag: !imgFlag}">
                <template v-if="dataDetail.status == 2 || dataDetail.status == 3">
                    <div class="news-box news-box-bottom flex flexWrap">
                        <div class="news-content">
                            <p class="news-title">{{dataDetail.title}}</p>
                            <div class="news-subtitle news-subtitle-noBottom">
                                <span>{{dataDetail.visits}}次浏览</span>
                                <p>发布时间：{{dataDetail.create_time}}</p>
                                <p>来源：{{dataDetail.source}}</p>
                                <!--                                <p>图文编辑：{{dataDetail.author}}</p>-->
                                <!--                                <p>审  核：{{dataDetail.check}}</p>-->
                            </div>
                        </div>
                        <div class="news-video-box">
                            <div v-if="dataDetail.status == 2">
                                <template v-if="videoType == 1">
                                    <a :href="dataDetail.video" target="_blank" class="news-video-box-a">
                                        <div v-show="videoPauseBox" class="news-video-box-mask news-video-box-mask-cover-all">
                                            <img src="../assets/img/video.png" alt="">
                                        </div>
                                        <img :src="img_path + dataDetail.image" alt="" class="news-video-box-img" @error="showErrImg">
                                    </a>
                                </template>
                                <template v-else>
                                    <div v-show="videoPauseBox" class="news-video-box-mask" @click.stop="getVideo">
<!--                                        <img src="../assets/img/video.png" :class="{'video-pause-hide': !videoPause}" alt="">-->
                                    </div>
                                    <video :poster="img_path + dataDetail.image" playsinline controls class="news-video" id="video1" controlslist="nodownload">
                                        <source :src="videoUrl + videoLink" type="video/mp4">
                                        <object id="flowplayer" width="400" height="300"
                                                data="flowplayer-3.2.18.swf"
                                                type="application/x-shockwave-flash">
                                            <param name="movie" value="flowplayer-3.2.18.swf">
                                            <param name="flashvars" :value="'config={clip:'+videoUrl + videoLink+'}'">
                                        </object>
                                    </video>
                                </template>
                            </div>
                            <a v-else :href="dataDetail.live" target="_blank" class="news-video-box-a">
                                <div class="news-video-box-mask">
                                    <img src="../assets/img/video.png" alt="">
                                </div>
                                <img :src="img_path + dataDetail.image" alt="" class="news-video-box-img"
                                     @error="showErrImg">
                            </a>
                        </div>
                        <div class="operate">
                            <div class="good-btn" @click="toPoint">
                                <a-icon v-if="pointed" type="heart" theme="filled" style="color: rgb(243, 63, 63)"/>
                                <a-icon v-else type="heart" style="color: #686b67"/>
                                <span>点赞</span>
                            </div>
                            <div v-if="shareBox" class="share-box">
                                <a-icon type="qq" class="share-total share-qq" title="分享到qq" @click="share('qq')"/>
                                <a-icon type="weibo" class="share-total share-weibo" title="分享到微博"
                                        @click="share('weibo')"/>
                                <a-icon type="wechat" theme="filled" class="share-total share-wechat" title="分享到微信"
                                        @click="share('wechat')"/>
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
                                    <a-tab-pane v-if="dataDetail.catalog" key="1" tab="目录">
                                        <div class="tab-activity">
                                            <template v-for="(item, index) in catalog">
                                                <p class="catalog-p" :key="index">{{item.label}}</p>
                                            </template>
                                        </div>
                                    </a-tab-pane>
                                    <template v-for="(item, index) in catalog">
                                        <a-tab-pane
                                                v-if="catalogContent[index].content && catalogContent[index].content.length != 7"
                                                :key="index+2" :tab="item.label">
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
                        <!-- h5端视频和列表推荐归一起
                        <div class="recommend-content" v-if="relation">
                            <p class="recommend-content-title">推荐</p>
                            <router-link tag="div" :to="{path: '/newsDetail', query: {id: relation.id}}"
                                         class="recommend-box">
                                <img :src="img_path + relation.image" alt="" @error="showErrImg">
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
                        -->
                    </div>
                </template>
                <template v-else>
                    <div class="news-box">
                        <div class="news-content">
                            <p class="news-title">{{dataDetail.title}}</p>
                            <div class="news-subtitle">
                                <p>发布时间：{{dataDetail.create_time}}</p>
                                <p>图文编辑：{{dataDetail.author}}</p>
                                <p>审核：{{dataDetail.check}}</p>
                            </div>
                            <div class="news">
                                <div class="ql-editor" v-html="dataDetail.content"></div>
                            </div>
                        </div>
                    </div>
                </template>
                <div class="foot-nav">
                    <template>
                        <p v-if="dataPrev.title == '无'">上一篇：没有了</p>
                        <p class="prev-paper" v-else :data-id="dataPrev.id" @click="toDetail($event)">
                            上一篇：{{dataPrev.title}}</p>
                    </template>
                    <template>
                        <p v-if="dataNext.title == '无'">下一篇：没有了</p>
                        <p class="next-paper" v-else :data-id="dataNext.id" @click="toDetail($event)">
                            下一篇：{{dataNext.title}}</p>
                    </template>
                </div>
                <div class="recommend-content" v-if="relation.length">
                    <p class="recommend-content-title">推荐</p>
                    <template v-for="(item, index) in relation">
                        <router-link :key="index" tag="div" :to="{path: '/newsDetail', query: {id: item.id}}"
                                     class="recommend-box">
                            <!--                            <img :src="img_path + relation.image + imgWidth.contentImg" alt="" @error="showErrImg">-->
                            <p class="recommend-content-text-content flex-1">{{item.title}}</p>
                            <div class="recommend-content-text flex">
                                <p class="recommend-content-text-title">{{item.cate_name}}</p>
                                <p class="recommend-content-time">{{item.create_time}}</p>
                            </div>
                        </router-link>
                    </template>
                    <div class="qrcode-img-box">
                        <img src="../assets/img/qrcode1.png" alt="">
                        <img :src="qrImg" alt="" class="qrcode-img-box-img">
                    </div>
                </div>
            </div>
        </template>
        <Footer :is-mobile="isMobile"></Footer>
    </div>
</template>

<script>
    import QRCode from 'qrcodejs2'

    export default {
        name: "NewsDetail",
        components: {
            // 'remote-js': {
            //     render(createElement){
            //         return createElement('script',{ attrs: { type: 'text/javascript', src: this.src }})
            //     },
            //     props: {
            //         src: { type: String, required: true},
            //     },
            // }
        },
        data() {
            return {
                imgWidth: {
                    swiperImg: "",
                    contentImg: "",
                },
                dataDetail: "",
                originWidth: 1,
                dataPrev: "",
                dataNext: "",
                cate_id: "",
                cateUrl: "",
                cateParentUrl: {},
                catalog: [],
                catalogContent: [],
                img_path: "",
                relation: [],
                bannerImg: "",
                imgFlag: "",
                qrImg: "",
                pointed: false,
                shareBox: false,
                qrcodeImg: "",
                ip: "",
                videoUrl: "https://ykwhg.yk.gov.cn/video_upload/",
                videoLink: "",
                videoType: "",
                videoPause: true,
                videoPauseBox: true,
                timer: false,
                isMobile: false
            }
        },
        mounted() {
            this.fetch()
            this.qrcodeScan();
            // this.getNewsId() // 获取banner图
            // this.initVideo(); // 加载视频
            if (document.body.clientWidth <= 768) {
                this.isMobile = true
            }
            this.originWidth = document.body.clientWidth
            this.getImgWidth()
            let that = this
            window.onresize = function () { // 定义窗口大小变更通知事件
                if (!that.timer) {
                    that.timer = true
                    setTimeout(function () {
                        that.timer = false
                        if (document.body.clientWidth <= 768) {
                            that.originWidth <= 768 ? console.log("不要随便resize哦~") : location.reload()
                        } else {
                            that.originWidth > 768 ? console.log("不要随便resize哦~") : location.reload()
                        }
                    }, 1000)
                }
            };
        },
        watch: {
            $route() {
                this.fetch();
            },
        },
        methods: {
            // initVideo(src){
            //     let videoSrc = src.split("vid=")[1]
            //     var player = new Txplayer({
            //         containerId: 'container',
            //         vid: videoSrc,
            //         width: '100%',
            //         height: '590px'
            //     });
            // },
            getImgWidth() {
                this.imgWidth.swiperImg = '!/both/1186x500'
                this.imgWidth.contentImg = '!/both/450x340'
            },
            getBanner: function (id) {
                // let cate_id, cate_parent_id
                let news_id = id
                let imgPath = JSON.parse(sessionStorage.getItem("imgPath"))
                let menu = JSON.parse(sessionStorage.getItem("menu"))
                for (let i = 0; i < menu.length; i++) {
                    if (news_id == menu[i].news_cate_id) {
                        this.cate_id = news_id
                        this.getCateParentUrl(news_id)
                        this.cateParentUrl.title = menu[i].title
                        if (menu[i].image && !this.isMobile) {
                            this.bannerImg = imgPath + menu[i].image
                            this.imgFlag = true
                            return false
                        } else if (menu[i].image_sj && this.isMobile) {
                            this.bannerImg = imgPath + menu[i].image_sj
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
                                this.cate_id = menu[i].news_cate_id
                                this.getCateParentUrl(children[j].parent_id, children[j].id)
                                this.cateParentUrl.title = menu[i].title
                                if (children[j].image && !this.isMobile) {
                                    this.bannerImg = imgPath + children[j].image
                                    this.imgFlag = true
                                    return false
                                } else if (children[j].image_sj && this.isMobile) {
                                    this.bannerImg = imgPath + children[j].image_sj
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
            getVideo: function(){
                let myVideo
                if(this.isMobile){
                    myVideo = document.getElementById('video1')
                }else{
                    myVideo = document.getElementById('video')
                }
                this.watchVideo(myVideo)
                myVideo.play()
            },
            watchVideo: function (ele) {
                let that = this
                ele.addEventListener('play', function () {//播放开始执行的函数
                    that.videoPause = false
                    setTimeout(function(){
                        that.videoPauseBox = false
                    }, 250)
                });
                ele.addEventListener('pause', function () {//暂停开始执行的函数
                    that.videoPauseBox = true
                    that.videoPause = true
                });
            },
            openShareBox() {
                let qrcodeImg = document.getElementById("qrcode").lastChild.getAttribute("src")
                this.qrcodeImg = qrcodeImg
                this.shareBox = !this.shareBox
            },
            share(val) {
                let href = window.location.href
                if (val == 'qq') {
                    window.open('https://connect.qq.com/widget/shareqq/index.html?title=' + this.dataDetail.title + '&url=' + href, "_blank")
                } else if (val == 'weibo') {
                    window.open('https://service.weibo.com/share/share.php?title=' + this.dataDetail.title + '&url=' + href, "_blank")
                }
            },
            toPoint: function () {
                // 点赞
                let params = {news_id: this.dataDetail.id, ip: returnCitySN["cip"]}
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
            visits() {
                let params = {news_id: this.dataDetail.id, ip: returnCitySN["cip"]}
                this.$api.postVisits(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            console.log(34)
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
                            // console.log(data)
                            this.dataDetail = data.data.data.detail
                            this.visits()
                            // 统计访问数
                            this.dataNext = data.data.data.next_list
                            this.dataPrev = data.data.data.prev_list
                            this.img_path = data.data.data.img_path
                            this.videoType = data.data.data.detail.is_video_type
                            this.videoLink = data.data.data.detail.upload_video_name
                            let foot = JSON.parse(sessionStorage.getItem("foot"))
                            this.qrImg = this.img_path + foot.qr_code
                            // 新闻详情标题和文章标题对应
                            document.title = this.dataDetail.title
                            // console.log(data.data.data.next_list_arr)
                            let that = this
                            setTimeout(function(){
                                if (data.data.data.next_list_arr.length) {
                                    that.relation = data.data.data.next_list_arr
                                } else {
                                    that.getRelation(data.data.data.detail.cate_id)
                                }
                            }, 400)
                            if (this.dataDetail.status == 2 || this.dataDetail.status == 3) {
                                // if(this.dataDetail.video){
                                //     this.initVideo(this.dataDetail.video)
                                // }
                                this.catalog = this.dataDetail.catalog
                                this.catalogContent = this.dataDetail.catalog_content
                            }
                            this.getBanner(data.data.data.detail.cate_id)
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
                            this.relation = data.data.data.list.slice(0, 1)
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
            getCateParentUrl(cate_id, id) {
                switch (cate_id) {
                    case 17:
                        this.cateParentUrl.url = 'trends?news_id=' + cate_id
                        id ? this.cateUrl = 'trends?news_id=' + id : ""
                        break
                    case 18:
                        this.cateParentUrl.url = 'activity?news_id=' + cate_id
                        id ? this.cateUrl = 'activity?news_id=' + id : ""
                        break
                    case 19:
                        this.cateParentUrl.url = 'grid?news_id=' + cate_id
                        id ? this.cateUrl = 'grid?news_id=' + id : ""
                        break
                    case 20:
                        this.cateParentUrl.url = 'live?news_id=' + cate_id
                        id ? this.cateUrl = 'live?news_id=' + id : ""
                        break
                    case 21:
                        this.cateParentUrl.url = 'showroom?news_id=' + cate_id
                        id ? this.cateUrl = 'showroom?news_id=' + id : ""
                        break
                }
            },
            qrcodeScan() {//生成二维码
                let qrcode = new QRCode('qrcode', {
                    width: 200,  // 二维码宽度
                    height: 200, // 二维码高度
                    text: 'https://mp.csdn.net',
                    correctLevel: 3
                })
            },
            showErrImg(e) {
                e.target.src = require('@/assets/img/default.jpg')
            }
        }
    }
</script>

<style scoped>

</style>