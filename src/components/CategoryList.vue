<template>
    <div>
        <template v-if="!isMobile">
            <div class="list-box">
                <template v-if="type == 'list'">
                    <div class="list" v-for="(item,index) in list.list" :key="index">
                        <router-link tag="div" class="flex flexWrap" :to="{ path: 'NewsDetail', query: {id: item.id} }">
                            <span class="list-title">{{item.cate_name}}</span>
                            <span class="list-content flex-1">{{item.title}}</span>
                            <span class="list-time">{{item.create_time}}</span>
                        </router-link>
                    </div>
                </template>
                <template v-else>
                    <div class="video-box flex flexWrap">
                        <template v-for="(item,index) in list.list">
                            <!--                在分类列表页cate_id为26的直接跳到文化普及的线下培训报名去-->
                            <router-link v-if="item.cate_id != 26" tag="div" class="culture-content-left flex-1" :to="{ path: 'NewsDetail', query: {id: item.id} }" :key="index">
                                <div class="culture-content-box-mask" v-if="item.status != 1">
                                    <img src="../assets/img/video.png" alt="" class="culture-content-box-img">
                                </div>
                                <img :src="list.img_path + item.image + imgWidth.contentImg" alt="" @error="showErrImg">
                                <p class="culture-content-left-time">{{item.create_time}}</p>
                                <p class="culture-content-left-text">
                                    <span class="culture-content-left-text-title">{{item.cate_name}}</span>
                                    <span class="culture-content-left-text-content">{{item.title}}</span>
                                </p>
                            </router-link>
                            <router-link v-else tag="div" class="culture-content-left flex-1" :to="{ path: 'grid?news_id=26'}" :key="index">
                                <img :src="list.img_path + item.image + imgWidth.contentImg" alt="" @error="showErrImg">
                                <p class="culture-content-left-time">{{item.create_time}}</p>
                                <p class="culture-content-left-text">
                                    <span class="culture-content-left-text-title">{{item.cate_name}}</span>
                                    <span class="culture-content-left-text-content">{{item.title}}</span>
                                </p>
                            </router-link>
                        </template>
                    </div>
                </template>
                <pagers :total="list.total" :pageSize="list.total_page" v-model="pageNo" @jumpPage="jump"></pagers>
            </div>
        </template>
        <template v-else>
            <div class="list-box-1">
                <template v-if="type == 'video'">
                    <div class="list" v-for="(item,index) in list.list" :key="index">
                        <!--                在分类列表页cate_id为26的直接跳到文化普及的线下培训报名去-->
                        <router-link v-if="item.cate_id != 26" tag="div" class="flex flexWrap" :to="{ path: 'NewsDetail', query: {id: item.id} }">
                            <div class="list-box-left flex-1">
                                <p class="list-content flex-1">{{item.title}}</p>
                                <span class="list-title">{{item.cate_name}}</span>
                                <span class="list-time">{{item.create_time}}</span>
                            </div>
                            <div class="list-box-right">
                                <img :src="list.img_path + item.image + imgWidth.contentImg" alt="" @error="showErrImg">
                            </div>
                        </router-link>
                        <router-link v-else tag="div" class="flex flexWrap" :to="{ path: 'grid?news_id=26' }">
                            <div class="list-box-left flex-1">
                                <p class="list-content flex-1">{{item.title}}</p>
                                <span class="list-title">{{item.cate_name}}</span>
                                <span class="list-time">{{item.create_time}}</span>
                            </div>
                            <div class="list-box-right">
                                <img :src="list.img_path + item.image + imgWidth.contentImg" alt="" @error="showErrImg">
                            </div>
                        </router-link>
                    </div>
                </template>
                <template v-else>
                    <div class="video-box">
                        <template v-for="(item,index) in list.list">
                            <router-link tag="div" class="culture-content-left" :to="{ path: 'NewsDetail', query: {id: item.id} }" :key="index">
                                <span class="culture-content-left-text-content">{{item.title}}</span>
                                <p class="culture-content-left-text">
                                    <span class="culture-content-left-text-title">{{item.cate_name}}</span>
                                    <span class="culture-content-left-time">{{item.create_time}}</span>
                                </p>
                            </router-link>
                        </template>
                    </div>
                </template>
                <template v-if="canLoad">
                    <div class="flex flexWrap">
                        <div class="loadMore flex-1" @click="loadPrev">上一页</div>
                        <div class="loadMore flex-1" @click="loadNext">下一页</div>
                    </div>
                </template>
                <div v-else class="loadMore">已加载完毕</div>
                <!--                <pagers :total="list.total" :pageSize="list.total_page" v-model="pageNo" @jumpPage="jump"></pagers>-->
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        name: "CategoryList",
        props: {
            list: [Object, String],
            type: String,
            isMobile: Boolean
        },
        data() {
            return {
                imgWidth:{
                    contentImg: "!/both/450x340"
                },
                pageSize: 10,
                pageNo: 1,
                canLoad: true,
            }
        },
        mounted() {
            this.getImgWidth()
        },
        methods: {
            getImgWidth(){
                let width = document.body.clientWidth
                if(width > 1440){
                    // 媒体查询大于1440屏幕
                    this.imgWidth.contentImg = '!/both/450x340'
                }else if(width > 768){
                    this.imgWidth.contentImg = '!/both/450x340'
                }
            },
            jump(id) {
                this.$emit('jump', id)
            },
            loadNext(){
                if(this.list.page == this.list.total_page){
                    this.$message.error("已经是最后一页了", 1)
                    return false
                }
                this.jump(this.list.page + 1)
            },
            loadPrev(){
                if(this.list.page == 1){
                    this.$message.error("已经是第一页了", 1)
                    return false
                }
                this.jump(this.list.page - 1)
            },
            showErrImg(e){
                e.target.src = require('@/assets/img/default.jpg')
            }
        }
    }
</script>

<style scoped>

</style>