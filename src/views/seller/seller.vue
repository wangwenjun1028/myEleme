<template>
  <div class="wrapper" ref="wrapper">
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
            <p class="price">
              {{ seller.minPrice }}<span class="unit">元</span>
            </p>
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
      <p class="seller-title">顾客留照</p>
      <div class="swiper-imgs">
        <div
          :style="{ width: imgs.length * 120 + (imgs.length - 1) * 12 + 'px' }"
          class="swiper-container"
        >
          <div v-for="p of imgs" :key="p.name" class="swiper">
            <img :src="p.src" :alt="p.name" />
          </div>
        </div>
      </div>
      <div class="split"></div>
      <!-- <p class="seller-title">商家信息</p> -->
      <ul class="seller-infos">
        <li class="info-item" v-for="p of infos" :key="p.description">
          <img :src="p.pic" :alt="p.description" />
          <span>{{ p.description }}</span>
        </li>
      </ul>
      <div class="split"></div>
      <p class="seller-title">商家信息</p>
      <ul class="seller-infos">
        <li class="info-item" v-for="p of otherInfos" :key="p">
          <span>{{ p }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { sellerData } from "../../services/fatchData";
import star from "../../components/star/star";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      isLike: false,
      seller: {},
      infos: [
        {
          type: 0,
          description: "在线支付满28减5",
          pic: require("./decrease_1@2x.png"),
        },
        {
          type: 1,
          description: "VC无限橙果汁全场8折",
          pic: require("./discount_1@2x.png"),
        },
        {
          type: 2,
          description: "单人精彩套餐",
          pic: require("./special_1@2x.png"),
        },
        {
          type: 3,
          description: "该商家支持发票,请下单写好发票抬头",
          pic: require("./invoice_1@2x.png"),
        },
        {
          type: 4,
          description: "已加入“外卖保”计划,食品安全保障",
          pic: require("./guarantee_1@2x.png"),
        },
      ],
      otherInfos: [
        "该商家支持发票,请下单写好发票抬头",
        "品类:其他菜系,包子粥店",
        "深圳市龙岗区坂田街道杨马小区28栋",
        "营业时间:10:00-20:30",
      ],
      imgs: [
        {
          name: "图一",
          src: require("./png1.jpg"),
        },
        {
          name: "图二",
          src: require("./png2.jpg"),
        },
        {
          name: "图三",
          src: require("./png3.jpg"),
        },
        {
          name: "图四",
          src: require("./png4.jpg"),
        },
      ],
    };
  },
  mounted() {
    this.seller = { ...sellerData() }; //模拟获取后台数据
    this.$nextTick(() => {
      new BScroll(this.$refs.wrapper, { click: true });
    });
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
.wrapper {
  height: 100%;
  overflow: hidden;
}
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
.seller-title {
  padding: 18px 18px 12px;
  font-size: 14px;
}
.seller-infos {
  padding: 0 18px 18px;
  li {
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    padding: 12px 12px;
    img {
      vertical-align: middle;
      margin-right: 16px;
    }
  }
}
.swiper-imgs {
  // padding: 18px;
  margin: 0 18px;
  overflow: hidden;
  overflow-x: auto;
  .swiper-container {
  }
  .swiper-container::after {
    display: block;
    content: "";
    clear: both;
  }

  .swiper {
    height: 120px;
    width: 120px;
    float: left;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .swiper:not(:last-child) {
    margin-right: 12px;
  }
}
</style>