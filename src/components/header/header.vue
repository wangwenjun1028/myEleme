<template>
    <div class="header">
        <div class="content-wrapper">
            <!-- 图片 -->
            <div class="content-wrapper-avatar">
                <img src="../../assets/image/header/seller_avatar_256px.jpg" width="64" height="64" alt="" >
            </div>
            <!-- 内容 -->
            <div class="content-wrapper-detail">
                <p class="title">
                    <img class="band"  src="./brand@2x.png" alt="">
                    <span class="name">{{seller.name}}</span>
                </p>
                <p class="express-company">{{seller.description}}</p>
                <p class="discount">
                    <img src="./decrease_1@2x.png" alt="" width='12'>
                    <span >在线支付满28减5,满50减10</span>
                </p>
            </div>
        </div>
        <div class="supports-count"
            @click='alertShow'
        >
            {{seller.supports.length}}个
            <span class="right-icon">></span>  
        </div>
        <div class="background">
            <img width='100%' height="100%" src="../../assets/image/header/seller_avatar_256px.jpg" alt="">
        </div>
        <div class="bulletin-wrapper">
            <span class="bulletin-title">
                <img src="./bulletin@2x.png" width='22' alt="">
            </span>
            <span 
                class="bulletin-text"
                @click='alertShow'
            >{{seller.bulletin}}</span>
            <span 
                class="bulletin-icon"
                @click='alertShow'
            >></span>
        </div>
        <!-- 弹框 -->
        <transition name="bounce">
            <div 
                class="alert-container"
                @click='alertShow'
                v-if='alertIsShow'
            >
                <alert :seller='seller'></alert>
            </div>
        </transition>
    </div>
</template>
<script>
import alert from '../alert/alert'
export default {
    data:function(){
        return {
            alertIsShow:false,//商家详情弹框是否显示
        }
    },
    props:['seller'],
    created () {
        console.log(this.seller)
    },
    methods: {
        alertShow(){
            // 控制弹框显示隐藏
            this.alertIsShow=!this.alertIsShow;
        }
    },
    components: {
        alert
    }
}
</script>
<style lang="less" scoped>
    @import url("./header.less");
</style>