<template>
    <div class="banner-box">
        <div class="page-top-banner">
            <span class="banner-pic"></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Banner"
    }
</script>

<style scoped>
    .banner-box {
        padding-top: 125px;
        visibility: visible;
        height: 420px;
    }

    .page-top-banner{
        position: relative;
        height: 420px;
        background-color: #fff;
    }
    .page-top-banner .banner-pic {
        position: absolute;
        display: block;
        z-index: 1;
        width: 100%;
        height: 420px;
        background: no-repeat top;
        background-size: auto 100%;
    }
    .page-top-banner .banner-pic {
        background-image: url(../assets/img/banner-03.png);
    }
</style>