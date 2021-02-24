<template>
  <div class="shopping-container">
    <div class="shopping-left">
      <div class="shopping-icon">
        <div></div>
        <div
          @click="handleToggleShppingList"
          :class="!totalCount ? 'icon-bg' : 'icon-bg icon-bg-active'"
        >
          <i class="el-icon-shopping-cart-2"></i>
          <div v-if="totalCount" class="shopping-count">{{ totalCount }}</div>
        </div>
      </div>
      <div :class="!totalPrice ? 'total-price' : 'total-price active'">
        ￥{{ totalPrice }}
      </div>
      <div class="shopping-dec">另需配送费 ￥4 元</div>
    </div>
    <div :class="totalPrice < 20 ? 'shopping-right' : 'shopping-right active'">
      <span v-if="totalPrice == 0">￥20元起送</span>
      <span v-else-if="totalPrice > 0 && totalPrice < 20"
        >还差￥{{ 20 - totalPrice }}起送</span
      >
      <span v-else class="active">去结算</span>
    </div>

    <!--蒙层 -->
    <transition name="mask">
      <div v-if="isShowShoppingList" class="shopping-mask"></div>
    </transition>

    <!--购物车列表 -->
    <transition name="list">
      <div v-if="isShowShoppingList" class="shopping-list">
        <div class="list-head">
          <div class="head-left">购物车</div>
          <div class="head-right">清空</div>
        </div>
        <ul class="list-container">
          <li v-for="p of shoppingList" :key="p.sid" class="list-item">
            <div class="list-item-left">{{ p.name }}</div>
            <div class="list-item-right">
              <div class="item-price">{{ p.count * p.price }}</div>
              <div class="item-btn">
                <i class="el-icon-remove-outline"></i>
                <span class="item-count">{{ p.count }}</span>
                <i class="el-icon-circle-plus"></i>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: ["dataList"],
  data() {
    return {
      shoppingList: [], //购物车数据
      isShowShoppingList: false, //是否显示购物车列表
    };
  },
  mounted() {},
  watch: {
    dataList: {
      handler(newVal, oldVal) {
        let arr = [];
        newVal.map((item) => {
          item.foods.map((p) => {
            if (p.count) {
              let obj = { ...p };
              arr.push(obj);
            }
          });
        });
        this.shoppingList = [...arr];
      },
      deep: true,
    },
  },
  computed: {
    totalCount() {
      if (this.shoppingList && this.shoppingList.length) {
        let sum = 0;
        this.shoppingList.map((item) => {
          sum += item.count;
        });
        return sum;
      } else {
        return 0;
      }
    },
    totalPrice() {
      if (this.shoppingList && this.shoppingList.length) {
        let sum = 0;
        this.shoppingList.map((item) => {
          sum += item.count * item.price;
        });
        return sum;
      } else {
        return 0;
      }
    },
  },
  methods: {
    // 点击：购物车列表是否显示
    handleToggleShppingList() {
      this.isShowShoppingList = !this.isShowShoppingList;
      console.log(this.shoppingList);
    },
  },
};
</script>
<style scoped lang='less'>
.shopping-container {
  background: black;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1;
  width: 100%;
  height: 48px;
  color: white;
  display: flex;
  .shopping-right {
    z-index: 2;
    width: 105px;
    font-weight: bold;
    text-align: center;
    background: #2b333b;
    color: hsla(0, 0%, 100%, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
  }
  .shopping-right.active {
    background: #3392ff;
    color: #fff;
  }
  .shopping-left {
    flex: 1;
    display: flex;
    align-items: center;
    z-index: 2;
    background: black;
  }
  .shopping-icon {
    width: 64px;
    position: relative;
    > div {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      position: absolute;
      top: -33px;
      left: 50%;
      transform: translateX(-50%);
      background: black;
      z-index: -1;
    }
    > div.icon-bg {
      top: -27px;
      width: 44px;
      height: 44px;
      background: #2b343c;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #80858a;
      font-size: 30px;
      z-index: 2;
    }
    div.icon-bg-active {
      background: #3392ff;
      color: #fff;
    }
  }
  .shopping-count {
    position: absolute;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    color: #fff;
    background: #f01414;
    font-size: 12px;
    text-align: center;
    font-weight: bolder;
    line-height: 24px;
    right: 0;
    top: 0;
    transform: translate(35%, -35%);
    box-shadow: 0 4px 8px 0 rgb(0 0 0 / 40%);
  }
  .total-price {
    color: hsla(0, 0%, 100%, 0.4);
    font-size: 16px;
    font-weight: 700;
    margin: 0 16px;
    position: relative;
  }
  .total-price.active {
    color: #fff;
  }

  .total-price::after {
    content: "";
    width: 2px;
    height: 32px;
    display: block;
    position: absolute;
    right: -16px;
    top: 50%;
    transform: translateY(-50%);
    background: hsla(0, 0%, 100%, 0.1);
  }
  .shopping-dec {
    padding-left: 8px;
    color: hsla(0, 0%, 100%, 0.4);
  }

  //蒙层
  .shopping-mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 48px;
    backdrop-filter: blur(
      10px
    ); //属性可以让你为一个元素后面的区域添加图形效果（如模糊或者颜色偏移）。应为它适用于元素背后的所有元素，为了使看到效果，必须使元素或者背景至少部分透明。
    background: rgba(7, 17, 27, 0.6);
  }
  .mask-enter-active {
    animation: mask-in 0.5s;
  }
  .mask-leave-active {
    animation: mask-in 0.5s reverse;
  }
  @keyframes mask-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  // 购物车列表
  .list-enter-active {
    animation: list-in 0.5s;
  }
  .list-leave-active {
    animation: list-in 0.5s reverse;
  }
  @keyframes list-in {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
    }
  }
  .shopping-list {
    position: fixed;
    z-index: 1;
    left: 0;
    right: 0;
    bottom: 48px;
    color: #07111b;
  }
  .list-head,
  .list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .list-head {
    padding: 0 18px;
    height: 40px;
    background: #f3f5f7;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    .head-right {
      color: #00a0dc;
    }
  }
  .list-container {
    max-height: 240px;
    overflow: auto;
    padding: 0 18px;
    background: #fff;
    .list-item {
      height: 48px;
      background: #fff;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }
  }
  .list-item-right {
    display: flex;
    .el-icon-remove-outline,
    .el-icon-circle-plus {
      font-size: 24px;
      color: #00a0dc;
      vertical-align: middle;
      margin-top: -4px;
    }
    .item-count {
      margin: 0 6px;
    }
    .item-price {
      margin-right: 8px;
      color: #f01414;
      font-size: 14px;
    }
  }
  .item-btn {
    margin-right: 4px;
  }
}
</style>