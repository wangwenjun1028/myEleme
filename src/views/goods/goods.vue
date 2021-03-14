<template>
  <div class="goods">
    <ul class="goods-tab">
      <li
        v-for="(p, i) of dataList"
        :key="i"
        :class="{ active: tabSelectIndex === i }"
        @click="handleTabClick(i, $event)"
      >
        <img v-if="p.type != -1" :src="require('../../' + p.pic)" alt="#" />
        <span>{{ p.name }}</span>
      </li>
    </ul>
    <ul class="goods-list" @scroll="handleScroll">
      <li class="goods-type" v-for="(p, i) of dataList" :key="i">
        <h1 class="type-title">{{ p.name }}</h1>
        <ul>
          <li
            v-for="(item, index) of p.foods"
            @click="toggleFoodDetailShow(item)"
            :key="index"
          >
            <food-product
              :foodInfo="item"
              @addCount="handleAddCount"
            ></food-product>
          </li>
        </ul>
      </li>
    </ul>
    <!-- 购物车 -->
    <div class="shoppingCart">
      <shopping
        :dataList="dataList"
        @changeCount="handleChangeCount"
        @clearAllCount="handleClearAllCount"
      ></shopping>
    </div>

    <!-- 食物详情 -->
    <transition name="foodDetail">
      <div class="food-details" v-if="isFoodDetailsShow">
        <food-detail
          @hideFoodDetail="handleHideFoodDetail"
          :foodDetailData="foodDetailData"
          @foodDetail="handleChangeCount"
        ></food-detail>
      </div>
    </transition>
  </div>
</template>
<script>
import FoodProduct from "../../components/FoodProduct/FoodProduct";
import Shopping from "../../components/Shopping/Shopping"; //购物车组件
import FoodDetail from "../../components/FoodDetail/FoodDetail"; //食物详情组件
import dataSource from "../../assets/json/data.json";
import fetchData, { fatchData } from "../../services/fatchData";
export default {
  data() {
    return {
      img: "assets/image/goods/discount_3@2x.png",
      dataList: [],
      tabSelectIndex: 0, //左侧tab选中的下标
      isFoodDetailsShow: false, //食物详情
      foodDetailData: {}, //食物详情数据
    };
  },
  components: {
    FoodProduct,
    Shopping,
    FoodDetail,
  },
  mounted() {
    //  let dataList = dataSource.goods;

    this.dataList = fatchData(); //获取数据

    let lous = document.getElementsByClassName("goods-list")[0].children;
    lous.forEach((element) => {});
  },
  watch: {
    tabSelectIndex() {},
  },
  methods: {
    handleTabClick(i, event) {
      // if (!event._constructed) {
      //   // 去掉自带click事件的点击
      //   return;
      // }
      this.tabSelectIndex = i;
      let lous = document.getElementsByClassName("goods-list")[0].children;
      lous.forEach((elem, index) => {
        if (i == index) {
          let sHeight = elem.offsetTop;
          elem.parentElement.scrollTo(0, sHeight);
        }
      });
    },
    // 滚动
    handleScroll(e) {
      let target = e.target;
      let scrollHeight = target.scrollTop;
      let lous = document.getElementsByClassName("goods-list")[0].children;
      lous.forEach((element, i) => {
        /**
         * element.offsetTop  表示相对父元素的高度，父元素要定位
         * **/
        if (scrollHeight >= element.offsetTop) {
          if (this.tabSelectIndex != i) {
            this.tabSelectIndex = i;
          }
        }
      });
    },
    // 添加购买数量
    handleAddCount(sid, count) {
      let dataList = [...this.dataList];
      dataList.map((p, i) => {
        p.foods.map((key, index) => {
          // let foodItem = { ...key };
          if (key.sid === sid) {
            // foodItem.count = count;
            dataList[i].foods[index].count = count;
          }
        });
      });
      this.dataList = [...dataList];
    },
    // getShoppingCartData(data) {
    //   let newData = [];
    //   data.map((item) => {
    //     item.foods.map((p) => {
    //       for (var key of p) {
    //         if (key.count) {
    //           newData.push(...key);
    //         }
    //       }
    //     });
    //   });
    //   return newData;
    // },

    // 处理购物车的数量加减
    handleChangeCount(sid, type) {
      let dataList = [...this.dataList];
      dataList.map((p, i) => {
        p.foods.map((key, index) => {
          // let foodItem = { ...key };
          if (key.sid === sid) {
            // foodItem.count = count;
            if (type === "add") {
              dataList[i].foods[index].count += 1;
            }
            if (type === "reduce") {
              dataList[i].foods[index].count -= 1;
            }
            this.foodDetailData = dataList[i].foods[index];
          }
        });
      });
      this.dataList = [...dataList];
    },
    //清空购物车数量
    handleClearAllCount() {
      let dataList = [...this.dataList];
      dataList.map((p, i) => {
        p.foods.map((key, index) => {
          if (key.count) {
            dataList[i].foods[index].count = 0;
          }
        });
      });
      this.dataList = [...dataList];
    },

    // 是否显示食物详情
    toggleFoodDetailShow(item) {
      console.log(item);
      this.isFoodDetailsShow = !this.isFoodDetailsShow;
      this.foodDetailData = { ...item };
    },

    // 食物详情页，点击返回
    handleHideFoodDetail() {
      this.isFoodDetailsShow = false;
    },
  },
};
</script>
<style lang="less" scoped>
@import "./goods.less";
</style>