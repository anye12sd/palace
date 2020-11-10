<template>
    <div class="list-box" :class="{'flex': !isMobile}">
<!--        判断是否移动端-->
        <template v-if="!isMobile">
            <template v-for="(item, index) in data">
                <router-link tag="div" :to="{path: 'newsDetail', query:{id:item.id}}" class="culture-content-left flex-1" :key="index">
                    <div class="culture-content-box-mask" v-if="item.status != 1">
                        <img src="../assets/img/video.png" alt="" class="culture-content-box-img">
                    </div>
                    <template v-if="item.cate_id == 25 || item.cate_id == 26">
                        <img :src="imgUrl + item.image + '?imageView2/5/w/450/h/250'" alt="" @error="showErrImg">
                    </template>
                    <template v-else>
                        <img :src="imgUrl + item.image + contentImg" alt="" @error="showErrImg">
                    </template>
                    <p class="culture-content-left-time">{{item.create_time}}</p>
                    <p class="culture-content-left-text">
                        <span class="culture-content-left-text-title">{{item.cate_name}}</span>
                        <span class="culture-content-left-text-content">{{item.title}}</span>
                    </p>
                </router-link>
            </template>
        </template>
        <template v-else>
<!--            判断是否为视频，视频需轮播图展示-->
            <template v-if="type == 'list'">
<!--                是列表-->
                <template v-for="(item, index) in data.slice(0,3)">
                    <router-link tag="div" :to="{path: 'newsDetail', query:{id:item.id}}" class="culture-content-left" :key="index">
                        <img :src="imgUrl + item.image + contentImg" alt="" @error="showErrImg">
                        <p class="culture-content-left-time">{{item.create_time}}</p>
                        <p class="culture-content-left-text flex">
                            <span class="culture-content-left-text-title">{{item.cate_name}}</span>
                            <span class="culture-content-left-text-content flex-1">{{item.title}}</span>
                        </p>
                    </router-link>
                </template>
            </template>
            <template v-else>
                <div class="swiper-container swiper-container-content-all" :class="className">
                    <div class="swiper-wrapper">
                        <template v-for="(item,index) in data.slice(0,3)">
                            <div class="swiper-slide" :key="index">
                                <router-link tag="div" :to="{path: 'newsDetail', query:{id:item.id}}" class="culture-content-left" :key="index">
                                    <img :src="imgUrl + item.image + contentImg" alt="" @error="showErrImg">
                                    <p class="culture-content-left-time">{{item.create_time}}</p>
                                    <p class="culture-content-left-text flex">
                                        <span class="culture-content-left-text-title">{{item.cate_name}}</span>
                                        <span class="culture-content-left-text-content flex-1">{{item.title}}</span>
                                    </p>
                                </router-link>
                            </div>
                        </template>
                    </div>
                </div>
            </template>
        </template>
<!--        <div class="culture-content-left flex-1">-->
<!--            <img src="../assets/img/img-01.png" alt="">-->
<!--            <p class="culture-content-left-time">2020.09.07</p>-->
<!--            <p class="culture-content-left-text">-->
<!--                <span class="culture-content-left-text-title">本地新闻</span>-->
<!--                <span class="culture-content-left-text-content">“2020第六届视觉艺术联展”书法展在永康市市文化馆开展</span>-->
<!--            </p>-->
<!--        </div>-->
    </div>
</template>

<script>
    export default {
        name: "IndexList",
        props: {
            "data": [Array, String],
            "imgUrl": String,
            "isMobile": Boolean,
            "type": String,
            "className": String,
            "contentImg": String,
        },
        methods: {
            showErrImg(e){
                e.target.src = require('@/assets/img/default.jpg')
            }
        }
    }
</script>

<style scoped>

</style>