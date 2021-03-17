<template>
  <div class="rating">
    <div class="overview">
      <div class="overview-left">
        <p class="score">{{ seller.score }}</p>
        <p class="title">综合评分</p>
        <p class="rank">高于周边商家{{ seller.rankRate }}</p>
      </div>
      <div class="overview-right">
        <div class="score-item">
          <div>服务态度</div>
          <star :score="seller.serviceScore" :size="12"></star>
          <div class="score">{{ seller.serviceScore }}</div>
        </div>
        <div class="score-item">
          <div>商品评分</div>
          <star :score="seller.foodScore" :size="12"></star>
          <div class="score">{{ seller.foodScore }}</div>
        </div>
        <div class="score-item">
          <div>送达时间</div>
          <div class="time">{{ seller.deliveryTime }}分钟</div>
        </div>
      </div>
    </div>
    <div class="split"></div>
    <div class="product-ratings">
      <el-tag
        v-for="p of tabs"
        :key="p.type"
        :class="p.slected ? 'active' : ''"
        :color="p.slected ? p.seclectColor : p.color"
        @click="handleTabClick(p.type)"
        >{{ p.type }} {{ p.ratings.length }}</el-tag
      >
    </div>
    <div class="rating-tip">
      <i class="el-icon-circle-check"></i>
      只看有内容的评价
    </div>
    <ul class="rating-lists">
      <li v-for="p of tabs" :key="p.name">
        <ul v-if="p.slected">
          <li v-for="item of p.ratings" :key="item.rateTime" class="rating-li">
            <div>
              <div class="avatar">
                <img :src="item.avatar" :alt="item.username" />
              </div>
              <div class="rating-details">
                <div class="name">
                  <div>{{ item.username }}</div>
                  <div class="time">{{ formateTime(item.rateTime) }}</div>
                </div>
                <div class="star-component">
                  <star :score="item.score" :size="10"></star>
                  <span class="deliveryTime">{{ item.deliveryTime }}</span>
                </div>
                <div class="support">
                  <span v-for="name of item.recommend" :key="name">{{
                    name
                  }}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
import { sellerData, ratingsData } from "../../services/fatchData";
import Star from "../../components/star/star.vue";

export default {
  data() {
    return {
      seller: null,
      ratings: null,
      tabs: [
        {
          color: "rgba(0,160,220,.2)",
          slected: true,
          seclectColor: "#00a0dc",
          type: "全部",
          ratings: [],
        },
        {
          color: "rgba(0,160,220,.2)",
          slected: false,
          seclectColor: "#00a0dc",
          type: "推荐",
          ratings: [],
        },
        {
          color: "rgba(0,160,220,.2)",
          slected: false,
          seclectColor: "#00a0dc",
          type: "吐槽",
          ratings: [],
        },
      ],
    };
  },
  components: {
    Star,
  },
  mounted() {
    this.seller = { ...sellerData() };
    this.ratings = [...ratingsData()];
    console.log(this.ratings);
    console.log(Array.isArray(this.ratings));
    this.ratings.map((p) => {
      if (p.rateType === 0) {
        this.tabs[1].ratings.push({ ...p });
      } else if (p.rateType === 1) {
        this.tabs[2].ratings.push({ ...p });
      }
      this.tabs[0].ratings.push({ ...p });
    });
  },
  methods: {
    handleTabClick(type) {
      this.tabs.forEach((item) => {
        if (item.type === type) {
          item.slected = true;
        } else {
          item.slected = false;
        }
      });
    },
    /**
     * 时间转换
     */
    formateTime(time) {
      let year = new Date(time).getFullYear();
      let month = new Date(time).getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      let data = new Date(time).getDate() + 1;
      let hour = new Date(time).getHours();
      let min = new Date(time).getMinutes();
      let sec = new Date().getSeconds();
      return `${year}-${month}-${data} ${hour}-${min}`;
    },
  },
};
</script>
<style lang="less" scoped>
.rating {
  overflow-y: auto;
}
.overview {
  padding: 18px 0 18px 18px;
  display: flex;
}
.overview-left {
  width: 136px;
  text-align: center;
  .score {
    font-size: 24px;
    color: #f90;
    margin-bottom: 8px;
  }
  .rank {
    font-size: 10px;
    color: #93999f;
  }
  .title {
    color: #07111b;
    font-size: 12px;
    margin-bottom: 4px;
  }
}
.overview-right {
  padding-left: 18px;
  flex: 1;
  border-left: 1px solid rgba(7, 17, 27, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .star {
    span {
      width: 15px;
      height: 15px;
      margin-right: 4px;
    }
  }
}

.score-item {
  display: flex;
  > div:first-child {
    margin-right: 12px;
  }
  .score {
    color: #f90;
    margin-left: 6px;
  }
  .time {
    color: #93999f;
  }
}
.split {
  height: 16px;
  border-top: 1px solid rgba(1, 17, 27, 0.1);
  background: #f3f5f7;
}
.product-ratings {
  padding: 18px;
  .el-tag {
    margin-right: 8px;
    color: #4d555d;
  }
  .active.el-tag {
    color: #fff;
  }
}
.rating-tip {
  padding: 18px;
  color: #93999f;
  border-top: 1px solid rgba(1, 17, 27, 0.1);
  border-bottom: 1px solid rgba(1, 17, 27, 0.1);
  .el-icon-circle-check {
    color: #00c850;
    font-size: 24px;
    vertical-align: middle;
  }
}
.rating-li {
  padding: 18px;

  padding-bottom: 0;
  > div {
    border-bottom: 1px solid rgba(1, 17, 27, 0.1);
    padding-bottom: 18px;
    display: flex;
  }
  .avatar {
    margin-right: 12px;
    img {
      width: 28px;
      height: 28px;
      border-radius: 50%;
    }
  }
  .rating-details {
    flex: 1;
  }
}
.name {
  display: flex;
  justify-content: space-between;
  .time {
    color: #93999f;
  }
}
.star-component {
  margin: 4px 0;
  overflow: hidden;
}
.star-component .star {
  float: left;
}
.star-component .star span {
  width: 10px;
  height: 10px;
}
.deliveryTime {
  float: left;
  margin-top: -2px;
  margin-left: 4px;
}
.support {
  span {
    padding: 0 6px;
    border: 1px solid rgba(7, 17, 27, 0.1);
    border-radius: 1px;
    color: #93999f;
    margin: 0 8px 4px 0;
    display: inline-block;
  }
}
</style>