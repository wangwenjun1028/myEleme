<template>
  <div class="shopping-container">
    <div class="shopping-left">
      <div class="shopping-icon">
        <div></div>
        <div :class="!totalCount ? 'icon-bg' : 'icon-bg icon-bg-active'">
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
  </div>
</template>
<script>
export default {
  props: ["dataList"],
  data() {
    return {
      shoppingList: [],
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
}
</style>