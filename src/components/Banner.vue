<template>
    <div class="banner-box">
        <div class="page-top-banner">
            <span class="banner-pic" :style="'background-image: url('+bannerImg+')'"></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Banner",
        props: ['bannerImg']
    }
</script>

<style scoped>

</style>