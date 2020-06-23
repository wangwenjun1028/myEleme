<template>
  <div class="goodProduct">
    <ul class="food-infos">
      <img :src="img" alt width="57" />
      <ul class="food-content">
        <li class="title">皮蛋瘦肉粥</li>
        <li class="describtion">咸粥</li>
        <li class="sell">
          <span>月售229份</span>
          <span class="good-rating">好评率100%</span>
        </li>
        <li class="price">
          <span class="now-price">￥10</span>
          <span class="old-price">￥26</span>
        </li>
      </ul>
    </ul>
    <div class="food-button">
      <span v-if="count>0" @click="handleDecreace" class="iconfont decreace-icon icon"></span>
      <span v-if="count>0" class="count">{{count}}</span>
      <span @click="handleAdd" class="iconfont add-icon icon"></span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      img: require("./img/food1.jpeg"),
      count: 0
    };
    s;
  },
  methods: {
    handleAdd() {
      //点击添加console.log(this.count)
      this.count++;
    },
    handleDecreace() {
      //点击减少
      this.count--;
      if (this.count <= 0) {
        this.count = 0;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "./FoodProduct.less";
</style>