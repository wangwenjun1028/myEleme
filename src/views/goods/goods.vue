<template>
  <div class="goods">
    <ul class="goods-tab">
      <li
        v-for="(p,i) of dataList"
        :key="i"
        :class="tabSelectIndex==i?'active':''"
        @click="handleTabClick(i)"
      >
        <img v-if="p.type!=-1" :src="require('../../'+p.pic)" alt="#" />
        <span>{{p.name}}</span>
      </li>
    </ul>
    <ul class="goods-list" @scroll="handleScroll">
      <li class="goods-type" v-for="(p,i) of dataList" :key="i">
        <h1 class="type-title">{{p.name}}</h1>
        <ul>
          <li>
            <food-product></food-product>
          </li>
          <li v-for="(item,index) of p.foods" :key="index">{{item.name}}</li>
        </ul>
      </li>
    </ul>
    <!-- 购物车 -->
    <div class="shoppingCart"></div>
  </div>
</template>
<script>
import FoodProduct from "../../components/FoodProduct/FoodProduct";
import dataSource from "../../assets/json/data.json";
export default {
  data() {
    return {
      img: "assets/image/goods/discount_3@2x.png",
      dataList: [],
      tabSelectIndex: 0 //左侧tab选中的下标
    };
  },
  components: {
    FoodProduct
  },
  mounted() {
    this.dataList = dataSource.goods;
    let lous = document.getElementsByClassName("goods-list")[0].children;
    lous.forEach(element => {});
  },
  methods: {
    handleTabClick(i) {
      this.tabSelectIndex = i;
      let lous = document.getElementsByClassName("goods-list")[0].children;
      lous.forEach((elem, index) => {
        if (i == index) {
          let sHeight = elem.offsetTop;
          elem.parentElement.scrollTo(0, sHeight);
        }
      });
    },
    // 滚动
    handleScroll(e) {
      let target = e.target;
      let scrollHeight = target.scrollTop;
      let lous = document.getElementsByClassName("goods-list")[0].children;
      lous.forEach((element, i) => {
        /**
         * element.offsetTop  表示相对父元素的高度，父元素要定位
         * **/
        if (scrollHeight > element.offsetTop) {
          this.tabSelectIndex = i;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "./goods.less";
</style>