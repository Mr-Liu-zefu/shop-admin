<template>
  <div class="order">
    <div class="top">
      <el-menu
      router
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="/home/orderclass/share">资源共享</el-menu-item>
        <el-menu-item index="/home/orderclass/old">二手交易</el-menu-item>
        <el-menu-item index="/home/orderclass/takeaways">外卖跑腿</el-menu-item>
        <!-- <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">取消的订单</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">交易成功</template>
            <el-menu-item index="2-4-1">已送达</el-menu-item>
            <el-menu-item index="2-4-2">派送中</el-menu-item>
          </el-submenu>
        </el-submenu> -->
      </el-menu>
    </div>
    <div class="bottom">
        <router-view />
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            activeIndex: '1',
        activeIndex2: '1'
        }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style scoped>
.order {
  width: 100%;
  height: 100%;
}
.top {
  width: 100%;
}
.bottom{
    width: 100%;
    height: 90%;
}
.el-menu--horizontal>.el-menu-item.is-active {
    border-bottom: 2px solid rgb(85, 193, 212);
    color: #303133;
}
</style>