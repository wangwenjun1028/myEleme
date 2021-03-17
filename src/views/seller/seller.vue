<template>
  <div class="seller">
    <ul class="overview">
      <li class="seller-name">
        <div>
          <p class="title">
            {{ seller.name }}
          </p>
          <div>
            <star class="seller-star" :score="4.2" :size="14"></star>
            <span class="tip">月售{{ seller.sellCount }}单</span>
          </div>
        </div>
        <div class="like">
          <div
            @click="toggleLike"
            :class="isLike ? 'like-icon active' : 'like-icon'"
          >
            <i class="iconfont icon-aixin"></i>
          </div>
          <div>{{ isLike ? "已收藏" : "收藏" }}</div>
        </div>
      </li>
      <li class="seller-info">
        <div class="info-item">
          <p class="title">起送价</p>
          <p class="price">{{ seller.minPrice }}<span class="unit">元</span></p>
        </div>
        <div class="info-item">
          <p class="title">商家配送</p>
          <p class="price">
            {{ seller.deliveryPrice }}<span class="unit">元</span>
          </p>
        </div>
        <div class="info-item">
          <p class="title">平均配送时间</p>
          <p class="price">
            {{ seller.deliveryTime }}<span class="unit">元</span>
          </p>
        </div>
      </li>
    </ul>
    <div class="split"></div>
    <div class="infomation">
      <p class="title">公告与活动</p>
      <p class="text">{{ seller.bulletin }}</p>
      <ul>
        <li></li>
      </ul>
    </div>
  </div>
</template>
<script>
import { sellerData } from "../../services/fatchData";
import star from "../../components/star/star";
export default {
  data() {
    return {
      isLike: false,
      seller: {},
    };
  },
  mounted() {
    this.seller = { ...sellerData() }; //模拟获取后台数据
  },
  components: {
    star,
  },
  methods: {
    toggleLike() {
      this.isLike = !this.isLike;
    },
  },
};
</script>
<style lang="less" scoped>
.overview {
  padding: 18px;

  .seller-name {
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    display: flex;
    padding-bottom: 16px;
    justify-content: space-between;
    .title {
      color: #07111b;
      font-size: 14px;
      margin-bottom: 8px;
    }
    .star {
      justify-content: start;
      float: left;
    }
  }
  .seller-info {
    display: flex;
    justify-content: space-around;
  }
}
.seller-star.star span {
  width: 14px;
  height: 14px;
  margin-right: 4px;
}
.tip {
  float: left;
  display: block;
  font-size: 10px;
  color: #4d555d;
  margin-top: 2px;
  margin-left: 8px;
}
.like-icon i {
  width: 24px;
  height: 24px;
  font-size: 24px;
  margin-top: 2px;
  color: #d4d6d9;
}
.active i {
  color: #f01414;
}
.like {
  width: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.like > div:last-child {
  font-size: 14px;
}
.seller-info {
  display: flex;
  padding: 18px;
  > div {
    width: 33.3%;
    text-align: center;
  }
  .title {
    font-size: 10px;
    color: #939995;
    margin-bottom: 4px;
  }
  .price {
    font-size: 24px;
    color: #07111b;
    .unit {
      font-size: 10px;
    }
  }
}
.split {
  height: 16px;
  border-top: 1px solid rgba(1, 17, 27, 0.1);
  background: #f3f5f7;
}
.infomation {
  padding: 18px;
  font-size: 14px;
  .text {
    text-indent: 2em;
    margin-top: 4px;
    line-height: 24px;
  }
}
</style>