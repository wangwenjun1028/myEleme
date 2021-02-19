<template>
  <div class="goodProduct">
    <ul class="food-infos">
      <img :src="foodInfo.icon" alt width="57" />
      <ul class="food-content">
        <li class="title">{{ foodInfo.name }}</li>
        <li class="describtion">{{ foodInfo.describtion }}</li>
        <li class="sell">
          <span>月售{{ foodInfo.sellCount }}份</span>
          <span class="good-rating">好评率{{ foodInfo.rating }}%</span>
        </li>
        <li class="price">
          <span class="now-price">￥{{ foodInfo.price }}</span>
          <span v-if="foodInfo.oldPrice" class="old-price"
            >￥{{ foodInfo.oldPrice }}</span
          >
        </li>
      </ul>
    </ul>
    <div class="food-button">
      <transition name="fade">
        <span
          v-if="count > 0"
          @click="handleDecreace"
          class="iconfont decreace-icon icon"
        ></span>
      </transition>
      <span v-if="count > 0" class="count">{{ count }}</span>
      <span @click="handleAdd" class="iconfont add-icon icon"></span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      img: require("./img/food1.jpeg"),
      count: 0,
    };
  },
  mounted() {
    // console.log(this.foodInfo);
  },
  props: ["foodInfo"],
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
    },
  },
};
</script>

<style lang="less" scoped>
@import "./FoodProduct.less";
</style>