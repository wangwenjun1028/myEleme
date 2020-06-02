<template>
    <div class="goods">
        <ul class="goods-tab">
            <li 
                v-for="(p,i) of dataList"
                :key='i'
                :class='tabSelectIndex==i?"active":""'
                @click='handleTabClick(i)'
            >
            <img v-if='p.type==2' src="" alt="#">
            <span>{{p.name}}</span>
            </li>
        </ul>
        <ul class="goods-list">
            <li>22</li>
            <li>22</li>
            <li>22</li>
            <li>22</li>
            <li>22</li>
        </ul>
        <!-- 购物车 -->
        <div class="shoppingCart"></div>
    </div>
</template>
<script>
import dataSource from '../../assets/json/data.json'
export default {
    data(){
        return {
            dataList:[],
            tabSelectIndex:0//左侧tab选中的下标
        }
    },
    mounted(){
        this.dataList=dataSource.goods;
        console.log(this.dataSource)
    },
    methods:{
        handleTabClick(i){
            this.tabSelectIndex=i;
        }
    }
}
</script>
<style lang="less" scoped>
    @import './goods.less';
</style>