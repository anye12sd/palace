<template>
    <div class="footer">
        <div class="footer-box flex flexWrap">
            <div class="footer-logo">
                <img src="../assets/img/logo-white.png" alt="">
            </div>
            <div class="footer-nav-ul">
                <ul class="nav-ul flex">
                    <li class="active"><span>文化馆首页</span></li>
                    <li><span>文化动态</span></li>
                    <li><span>文化活动</span></li>
                    <li><span>文化网格</span></li>
                    <li><span>文化直播</span></li>
                    <li><span>数字展厅</span></li>
                    <li><span>联系我们</span></li>
                </ul>
            </div>
        </div>
        <div class="copyright">
            <span>Copyright &copy;1999-2013 Ykol. All Rights Reserved</span>
            <span>浙江省永康市文化馆版权所有</span>
            <span>浙公网安备 33078402100775号</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>
    .footer{
        width: 100%;
        background: #00843e;
    }
    .footer-box{
        width: 1400px;
        margin: 0 auto;
        padding: 50px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }
    .footer-nav-ul{
        font-size: 14px;
        line-height: 60px;
        font-weight: bold;
        color: #fff;
    }
    .footer-nav-ul li{
        margin: 0 10px;
        cursor: pointer;
    }
    .footer-nav-ul li:nth-last-child(1){
        margin-right: 0;
        font-weight: bold;
        cursor: pointer;
    }
    .copyright{
        padding: 25px 0;
        width: 1400px;
        margin: 0 auto;
        color: rgba(255, 255, 255, 0.5);
        letter-spacing: 2px;
    }
    .copyright span{
        margin-right: 20px;
    }
</style>