<template>
  <div id="app">
    <header>
      <!-- 头部 -->
      <v-header :seller="dataSource.seller"></v-header>
    </header>
    <!-- tab -->
    <ul class="tab">
      <li 
      v-for="(p,i) of tabList" 
      :key='i'
      :class="p.currentSelect?'active':''"
      @click='handleTabClick(i)'
      >
        <span>{{p.name}}</span>
      </li>
    </ul>
    <div class="details">
      <router-view></router-view>
    </div>
    
  </div>

</template>
<script>
import Header from './components/header/header'
import   './assets/css/reset.css';

// 引入页面假数据
import data from './assets/json/data.json'
export default {
  data(){
    return{
      dataSource:{},
      tabList:[
        {
          path:'/goods',
          index:0,
          name:"商品",
          currentSelect:true
        },
        {
          path:'/ratings',
          index:1,
          name:"评论",
          currentSelect:false
        },
        {
          path:'/seller',
          index:2,
          name:'商家',
          currentSelect:false
        },
      ]
    }
  },
  methods:{
    handleTabClick(i){
      let list=this.tabList;
      list.map(elem=>{
        if(i==elem.index){
          elem.currentSelect=true
          this.$router.replace(elem.path);
        }else{
          elem.currentSelect=false;
        }
      })
      this.tabList=list;
    }
  },
  created () {
    this.dataSource=data;
  },
  components:{
    "v-header":Header
  }
}
</script>

<style lang="less" scoped>
  #app{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .tab{
    display: flex;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid rgba(7, 17, 28, 0.1);
    li{
      flex: 1;
      font-weight: 200;
      font-size: 14px;
      color:rgb(77, 85, 93);
      text-align: center
    }
    li.active{
      color:rgb(240, 20, 20)
    }
  }
  .details{
    flex:1;
    overflow: hidden;
  }
</style>
