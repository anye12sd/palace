<template>
    <div>
        <header-nav istrue="2"></header-nav>
        <banner></banner>
        <div class="category-box">
            <p class="category-bread-crumb">位置：<router-link tag="span" :to="{path: '/'}">文化馆首页</router-link>-<router-link tag="span" :to="{path: cateUrl}">{{dataDetail.cate_name}}</router-link>-{{dataDetail.title}}</p>
            <template v-if="dataDetail.status == 2 || dataDetail.status == 3">
            <div class="news-video-box">
                <a v-if="dataDetail.status == 2" :href="dataDetail.video" target="_blank">
                    <img :src="img_path + dataDetail.image" alt="" class="news-video-box-img">
                </a>
                <a v-else :href="dataDetail.live" target="_blank">
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
                        <div class="good-btn">点赞</div>
                        <div class="share-btn">分享</div>
                    </div>
                </div>
                <div class="news-box-tab flex flexWrap" v-if="catalog.length">
                    <div class="catalog flex-1">
                        <div>
                            <a-tabs :default-active-key="0">
                                <template v-for="(item, index) in catalog">
                                    <a-tab-pane :key="index" :tab="item.label">
                                        {{catalogContent[index].content}}
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
                        <router-link tag="div" :to="{path: 'newsDetail', query: {id: relation.cate_id}}" class="recommend-box">
                            <img :src="img_path + relation.image" alt="">
                            <p class="recommend-content-time">{{relation.create_time}}</p>
                            <div class="recommend-content-text flex flexWrap">
                                <p class="recommend-content-text-title">{{relation.cate_name}}</p>
                                <p class="recommend-content-text-content flex-1">{{relation.title}}</p>
                            </div>
                        </router-link>
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
                        <router-link tag="div" :to="{path: 'newsDetail', query: {id: relation.cate_id}}" class="recommend-box">
                            <img :src="img_path + relation.image" alt="">
                            <p class="recommend-content-time">{{relation.create_time}}</p>
                            <div class="recommend-content-text flex flexWrap">
                                <p class="recommend-content-text-title">{{relation.cate_name}}</p>
                                <p class="recommend-content-text-content flex-1">{{relation.title}}</p>
                            </div>
                        </router-link>
                        <img src="../assets/img/qrcode1.png" alt="">
                    </div>
                </div>
            </template>
            <div class="foot-nav">
                <template>
                    <p v-if="dataPrev == null">上一篇：没有了</p>
                    <p class="prev-paper" v-else :data-id="dataPrev.id" @click="toDetail($event)">上一篇：{{dataPrev.title}}</p>
                </template>
                <template>
                    <p v-if="dataNext == null">下一篇：没有了</p>
                    <p class="next-paper" v-else :data-id="dataNext.id" @click="toDetail($event)">下一篇：{{dataNext.title}}</p>
                </template>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    export default {
        name: "NewsDetail",
        data(){
            return{
                dataDetail: "",
                dataPrev: "",
                dataNext: "",
                cateUrl: "",
                catalog: [],
                catalogContent: [],
                img_path: "",
                relation: ""
            }
        },
        mounted() {
            this.fetch()
        },
        methods: {
            fetch: function (value){
                let params = {news_id: value ? value : this.$route.query.id}
                this.$api.getNewsDetail(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            console.log(data)
                            this.dataDetail = data.data.data.detail
                            this.dataNext = data.data.data.next_list
                            this.dataPrev = data.data.data.prev_list
                            this.img_path = data.data.data.img_path
                            this.relation = this.dataDetail.relation
                            this.getCateUrl(this.dataDetail.cate_id)
                            if(this.dataDetail.status == 2 || this.dataDetail.status == 3){
                                this.catalog = this.dataDetail.catalog
                                this.catalogContent = this.dataDetail.catalog_content
                            }
                            window.scrollTo(0,0)
                        } else {
                            this.$message.error(data.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            toDetail: function (e){
                this.$router.push({ path: 'newsDetail', query: {id: e.target.dataset.id}})
                this.fetch(e.target.dataset.id)
            },
            getCateUrl(id){
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
            }
        }
    }
</script>

<style scoped>

</style>