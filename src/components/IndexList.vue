<template>
    <div class="list-box flex">
        <template v-for="(item, index) in data.slice(0,3)">
            <router-link tag="div" :to="{path: 'newsDetail', query:{id:item.id}}" class="culture-content-left flex-1" :key="index">
                <div class="culture-content-box-mask" v-if="item.status != 1">
                    <img src="../assets/img/video.png" alt="" class="culture-content-box-img">
                </div>
                <img :src="imgUrl + item.image" alt="" @error="showErrImg">
                <p class="culture-content-left-time">{{item.create_time}}</p>
                <p class="culture-content-left-text">
                    <span class="culture-content-left-text-title">{{item.cate_name}}</span>
                    <span class="culture-content-left-text-content">{{item.title}}</span>
                </p>
            </router-link>
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
            "imgUrl": String
        },
        methods: {
            showErrImg(e){
                e.target.src = 'http://xybcdn.jihui88.net/ykwhg/admin/upload/20201031125004654.jpg'
            }
        }
    }
</script>

<style scoped>

</style>