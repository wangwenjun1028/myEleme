<template>
  <div>
    <div class="food-detail">
      <i @click="$emit('hideFoodDetail')" class="el-icon-arrow-left"></i>
      <img :src="foodDetailData.image" :alt="foodDetailData.name" />
    </div>
    <div class="food-item">
      <p class="item-name">{{ foodDetailData.name }}</p>
      <div class="item-container">
        <div class="item-info">
          <p class="infos">
            <span>月售{{ foodDetailData.sellCount }}份</span>
            <span class="rating">好评率{{ foodDetailData.rating }}</span>
          </p>
          <p class="price">
            <span class="now">￥{{ foodDetailData.price }}</span>
            <span class="old">￥{{ foodDetailData.oldPrice }}</span>
          </p>
        </div>
        <div class="item-count">
          <div v-if="!count" class="btn-text">
            <el-button type="primary" round>加入购物车</el-button>
          </div>
          <div v-if="count" class="btn-box">
            <i class="el-icon-remove-outline"></i>
            <span class="procuct-count">{{ count }}</span>
            <i class="el-icon-circle-plus-outline"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="split-line"></div>
    <div class="product-info">
      <p class="title">商品信息</p>
      <p class="describtion">{{ foodDetailData.info }}</p>
    </div>
    <div class="split-line"></div>
  </div>
</template>
<script>
export default {
  props: ["foodDetailData"],
  data() {
    return {
      count: this.foodDetailData.count,
    };
  },
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
.food-item {
  padding: 18px;
}
.item-name {
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 700;
  color: #07111b;
}
.item-container {
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.rating {
  margin-left: 8px;
}
.infos {
  color: #93999f;
  font-size: 12px;
}
.price {
  color: #f01414;
  font-size: 14px;
  .old {
    color: #93999f;
    text-decoration: line-through;
    margin-left: 6px;
  }
  .btn-box {
    display: none;
  }
}
.el-button.is-round {
  padding: 4px 8px;
  background: #00a0dc;
}
.btn-box i {
  color: #00a0dc;
  font-size: 24px;
  padding: 6px;
  vertical-align: middle;
}
.split-line {
  height: 16px;
  border-top: 1px solid rgba(1, 17, 27, 0.1);
  background: #f3f5f7;
}
.product-info {
  padding: 18px;
  .title {
    color: #07111b;
    font-size: 14px;
    margin-bottom: 6px;
  }
  .describtion {
    font-size: 12px;
    line-height: 24px;
    padding: 0 8px;
    color: #4d555d;
    text-indent: 2em;
  }
}
</style>

