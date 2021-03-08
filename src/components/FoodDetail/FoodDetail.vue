<template>
  <div>
    <div class="food-detail">
      <i @click="$emit('hideFoodDetail')" class="el-icon-arrow-left"></i>
      <img :src="foodDetailData.image" :alt="foodDetailData.name" />
    </div>
    <div class="food-item"></div>
  </div>
</template>
<script>
export default {
  props: ["foodDetailData"],
};
</script>
<style scoped lang='less'>
.food-detail {
  img {
    width: 100%;
  }
}
.el-icon-arrow-left {
  font-size: 20px;
  position: fixed;
  left: 20px;
  top: 20px;
  color: #fff;
}
</style>

