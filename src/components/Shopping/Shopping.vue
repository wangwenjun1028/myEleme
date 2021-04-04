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
      <div
        v-if="isShowShoppingList && shoppingList.length"
        class="shopping-mask"
      ></div>
    </transition>

    <!--购物车列表 -->
    <transition name="list">
      <div
        v-if="isShowShoppingList && shoppingList.length"
        class="shopping-list"
      >
        <div class="list-head">
          <div class="head-left">购物车</div>
          <div class="head-right" @click="doClear">清空</div>
        </div>
        <ul class="list-container">
          <li v-for="p of shoppingList" :key="p.sid" class="list-item">
            <div class="list-item-left">{{ p.name }}</div>
            <div class="list-item-right">
              <div class="item-price">{{ p.count * p.price }}</div>
              <div class="item-btn">
                <i
                  class="el-icon-remove-outline"
                  @click="$emit('changeCount', p.sid, 'reduce')"
                ></i>
                <span class="item-count">{{ p.count }}</span>
                <i
                  @click="$emit('changeCount', p.sid, 'add')"
                  class="el-icon-circle-plus"
                ></i>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </transition>

    <div class="ball-container">
      <div v-for="(ball, index) of balls" :key="index">
        <transition
          @before-enter="beforeEnter"
          @enter="enter"
          @after-enter="afterEnter"
        >
          <div v-show="ball.show" class="ball">
            <div class="inner-ball"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["dataList"],
  data() {
    return {
      shoppingList: [], //购物车数据
      isShowShoppingList: false, //是否显示购物车列表
      balls: [
        {
          show: false,
        },
        {
          show: false,
        },
        {
          show: false,
        },
        {
          show: false,
        },
        {
          show: false,
        },
      ],
      dropBalls: [],
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
      // console.log(this.shoppingList);
      console.log(this.isShowShoppingList);
    },
    doClear() {
      this.isShowShoppingList = !this.isShowShoppingList;
      this.$emit("clearAllCount");
    },
    drop(target) {
      for (var i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = target;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    beforeEnter(el) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);
          el.style.display = "";
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform = `translate3d(0,${y}px,0)`;
          let inner = el.getElementsByClassName("inner-ball")[0];
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
        }
      }
      // el.style.
    },
    enter(el) {
      this.$nextTick(() => {
        el.style.webkitTransform = "translate3d(0,0,0)";
        el.style.transform = "translate3d(0,0,0)";
        let inner = el.getElementsByClassName("inner-ball")[0];
        inner.style.webkitTransform = "translate3d(0,0,0)";
        inner.style.transform = "translate3d(0,0,0)";
      });
    },
    afterEnter(el) {
      let ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = "none";
      }
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
.ball-container {
  .ball {
    position: fixed;
    left: 32px;
    bottom: 22px;
    z-index: 200;
    transition: all 0.6s cubic-bezier(0.49, -0.29, 0.75, 0.41);
  }
  .inner-ball {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: rgb(0, 160, 220);
    transition: all 0.4s linear;
  }
}
</style>