<template>
    <div class="pager-wrapper" ref="pager">
        <div class="pager-box">
            <a class="pager-prev" :class="{'pager-disabled':prevDisable}" href="javascript:;" @click="jumpPrev()">上一页</a>
            <template v-for="(i,index) in pageSize">
                <span v-if="i==pageNo" class="pager-curr" :key="index">
                    <em class="pager-em"></em><em>{{i}}</em>
                </span>
                <a v-else-if="pageNo<5&&(i)<6" href="javascript:;" @click="jump(i)" :key="index">
                    {{i}}
                </a>
                <a :key="index" v-else-if="pageSize<7||i==1||i==pageSize||(pageNo-2<=i&&i<=pageNo+2)" href="javascript:;" @click="jump(i)">
                    {{i}}
                </a>
                <template v-else>
                    <span v-if="pageNo<5&&i==6" class="pager-spr" :key="index">…</span>
                    <span v-if="pageNo==4&&i==7" class="pager-spr" :key="index">…</span>
                    <span v-if="pageNo>4&&i==pageNo-3" class="pager-spr" :key="index">…</span>
                    <span v-if="pageNo>4&&i==pageNo+3" class="pager-spr" :key="index">…</span>
                </template>
            </template>
            <a class="pager-next" :class="{'pager-disabled':nextDisable}" href="javascript:;" @click="jumpNext()">下一页</a>
            <span class="pager-total">
            （共{{pageSize}}页，共{{total}}篇）
            </span>
        </div>
<!--        <div class="pager-input">-->
<!--            <input type="text" v-model="jumpPage">-->
<!--            <a class="pager-btn-go" href="javascript:;" @click="Go()">GO</a>-->
<!--        </div>-->
    </div>
</template>

<script>
    export default {
        name: 'Pagers',
        model:{ //通过v-model传过来的参数
            prop: 'pageNo',
            event: 'jumpPage'
        },
        props:{
            pageSize:{
                type: Number,
                default: 1
            },
            pageNo:{ //通过v-model传过来的参数
                type: Number,
                default: 1
            },
            total: [Number, String]
        },
        data(){
            return {
                jumpPage:'' //避免操作props参数
            }
        },
        computed: {
            prevDisable: function(){ //“上一页”按钮是否可点
                if(this.pageNo > 1){
                    return false;
                }else{
                    return true
                }
            },
            nextDisable: function(){ //“下一页”按钮是否可点
                if(this.pageNo < this.pageSize && this.pageSize > 1){
                    return false;
                }else{
                    return true;
                }
            },
        },
        methods: {
            jumpPrev: function(){ //点击上一页
                if(this.pageNo == 1){
                    return ;
                }else{
                    this.$emit('jumpPage',this.pageNo-1);
                    // this.$emit('on-jump',this.pageNo-1);
                }
            },
            jumpNext: function(){ //点击下一页
                if(this.pageNo == this.pageSize){
                    return ;
                }else{
                    this.$emit('jumpPage',this.pageNo+1); //修改当前页码
                    // this.$emit('on-jump',this.pageNo+1); //跳转
                }
            },
            jump: function(id){ //直接跳转
                if(id>this.pageSize){
                    id=this.pageSize;
                }
                this.jumpPage = '';
                this.$emit('jumpPage',id); //修改当前页码
                // this.$emit('on-jump',id); //跳转
            },
            Go: function(){
                if(this.jumpPage==''){ //判空处理
                    return ;
                }else if(/^\d*$/.test(parseInt(this.jumpPage))){ //填写数字才能跳转
                    this.jump(parseInt(this.jumpPage));
                    this.jumpPage = '';
                }else{
                    this.jumpPage = '';
                    return ;
                }
            }
        }
    }
</script>

<style scoped>

</style>