<template>
    <div class="alert"
    >
       <p class="seller-name">{{seller.name}}</p>
       <!--综合评分-->
       <div class="score">
           <star :score='seller.score' size='20'></star>
       </div>
       <!-- 优惠信息 -->
       <div class="discount-title">
           <div class="info-line"></div>
           <div class="info-text">优惠信息</div>
           <div class="info-line"></div>
       </div>
       <ul class="discount-info">
           <li v-for="(p,i) in seller.supports" :key="i">
               <img :src="pics[i].src"   alt=" ">
               {{p.description}}
           </li>
       </ul>
       <!-- 商家公告 -->
       <div class="discount-title">
           <div class="info-line"></div>
           <div class="info-text">商家公告</div>
           <div class="info-line"></div>
       </div>
       <p class="bulletin">{{seller.bulletin}}</p>
       <!-- 按钮 -->
      
       
    </div>
</template>
<script>
    import star  from '../star/star.vue'
    export default {
        data(){
            return {
                pics:[
                    {
                        src:require('./decrease_1@2x.png')
                    },
                    {
                        src:require('./discount_1@2x.png')
                    },
                    {
                        src:require('./discount_1@2x.png')
                    },
                   {
                        src:require('./special_1@2x.png')
                    },
                    {
                        src:require('./special_1@2x.png')
                    }
                  
                    
                ]
            }
        },
        props: ['seller'],
        components:{
            star
        },
        mounted(){
            console.log(this.seller)
        }
    }

</script>
<style lang='less' scoped>
    @import './alert.less';
</style>