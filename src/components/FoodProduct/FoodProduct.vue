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
          v-if="foodInfo.count > 0"
          @click.stop="handleDecreace"
          class="iconfont decreace-icon icon"
        ></span>
      </transition>
      <span v-if="foodInfo.count > 0" class="count">{{ foodInfo.count }}</span>
      <span @click.stop="handleAdd" class="iconfont add-icon icon"></span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      img: require("./img/food1.jpeg"),
      count: this.foodInfo.count,
    };
  },
  mounted() {},
  watch: {
    foodInfo: {
      handler(newVal) {
        this.count = newVal.count;
      },
      deep: true,
    },
  },
  props: ["foodInfo"],
  methods: {
    handleAdd() {
      //点击添加console.log(this.count)
      this.count++;
      // this.props.count = count;
      this.$emit("addCount", this.foodInfo.sid, this.count);
    },
    handleDecreace() {
      //点击减少
      this.count--;
      if (this.count <= 0) {
        this.count = 0;
      }
      // this.props.count = count;
      this.$emit("addCount", this.foodInfo.sid, this.count);
    },
  },
};
</script>

<style lang="less" scoped>
@import "./FoodProduct.less";
</style>