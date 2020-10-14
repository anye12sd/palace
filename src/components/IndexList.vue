<template>
    <div class="list-box flex flexWrap">
        <div class="culture-content-left flex-1">
            <img src="../assets/img/img-01.png" alt="">
            <p class="culture-content-left-time">2020.09.07</p>
            <p class="culture-content-left-text">
                <span class="culture-content-left-text-title">本地新闻</span>
                <span class="culture-content-left-text-content">“2020第六届视觉艺术联展”书法展在永康市市文化馆开展</span>
            </p>
        </div>
        <div class="culture-content-left flex-1">
            <img src="../assets/img/img-01.png" alt="">
            <p class="culture-content-left-time">2020.09.07</p>
            <p class="culture-content-left-text">
                <span class="culture-content-left-text-title">本地新闻</span>
                <span class="culture-content-left-text-content">“2020第六届视觉艺术联展”书法展在永康市市文化馆开展</span>
            </p>
        </div>
        <div class="culture-content-left flex-1">
            <img src="../assets/img/img-01.png" alt="">
            <p class="culture-content-left-time">2020.09.07</p>
            <p class="culture-content-left-text">
                <span class="culture-content-left-text-title">本地新闻</span>
                <span class="culture-content-left-text-content">“2020第六届视觉艺术联展”书法展在永康市市文化馆开展</span>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "IndexList"
    }
</script>

<style scoped>
    .list-box{
        margin-top: 30px;
    }
    .culture-content-left{
        margin-right: 15px;
    }
    .culture-content-left:nth-last-child(1){
        margin-right: 0;
    }
    .culture-content-left-time{
        font-size: 12px;
        margin-top: 15px;
        color: #9a9a9a;
    }
    .culture-content-left-text-title{
        color: #74bd00;
        font-size: 16px;
        padding-right: 12px;
        border-right: 1px solid #ccc;
    }
    .culture-content-left-text-content{
        font-size: 16px;
        color: #191919;
        padding-left: 12px;
    }
    .culture-content-left-text{
        margin-top: 15px;
        width: 95%;
    }
    .culture-content-left img {
        width: 100%;
        height: 340px;
    }
</style>