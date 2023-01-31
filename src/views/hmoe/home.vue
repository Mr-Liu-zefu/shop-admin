<template>
  <div class="home">
    <div class="left">
      <!-- <div class="logo"></div> -->
      <el-col :span="15">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          router="ture"
          background-color="rgb(85, 193, 212)"
          text-color="white"
          active-text-color="rgb(69, 166, 232)"
          :collapse="isCollapse"
        >
          <el-menu-item index="/homepage">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/home/userlist">
              <i class="el-icon-document-copy"></i>
              <span>用户列表</span>
            </el-menu-item>
            <el-menu-item index="/home/address">
              <i class="el-icon-location-information"></i>
              <span>收货地址</span>
            </el-menu-item>
            <el-menu-item index="/home/userfollow">
              <i class="el-icon-plus"></i>
              <span>用户关注</span>
            </el-menu-item>
            <!-- <el-menu-item index="/home/adminuser">
              <i class="el-icon-postcard"></i>
              <span>实名认证</span>
            </el-menu-item> -->
          </el-submenu>
          <el-submenu index="">
            <template slot="title">
              <i class="el-icon-shopping-bag-1"></i>
            <span slot="title">商品管理</span>
            </template>
            <el-menu-item index="/home/goodsList">
              <i class="el-icon-document-copy"></i>
              <span>商品列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-document-checked"></i>
              <span slot="title">订单管理</span>
            </template>
            <el-menu-item index="/home/orderclass/share">
              <i class="el-icon-document-copy"></i>
              <span>订单分类</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/home/money">
            <i class="el-icon-coin"></i>
            <span slot="title">财务管理</span>
          </el-menu-item>
          <!-- <el-menu-item index="/home/shopadmin">
            <i class="el-icon-office-building"></i>
            <span slot="title">商城管理</span>
          </el-menu-item> -->
          <!-- <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-data-line"></i>
              <span>营销管理</span>
            </template>
            <el-menu-item index="/home/poster">
              <i class="el-icon-document-copy"></i>
              <span>广告中心</span>
            </el-menu-item>
            <el-menu-item index="/home/recommend">
              <i class="el-icon-document-copy"></i>
              <span>商品推荐</span>
            </el-menu-item>
          </el-submenu> -->
          <el-menu-item index="/home/poster">
              <i class="el-icon-document-copy"></i>
              <span>广告中心</span>
            </el-menu-item>
          <!-- <el-menu-item index="/home/advise">
            <i class="el-icon-chat-line-round"></i>
            <span>投诉与建议</span>
          </el-menu-item> -->
        </el-menu>
      </el-col>
    </div>
    <div class="right">
      <div class="top">
        <div class="open">
          <div @click="open">
            <i class="el-icon-s-fold"></i>
          </div>
        </div>
        <!-- <div class="left-1">
          <el-avatar icon="el-icon-user-solid" :size="30" class="image"></el-avatar>
          <div class="name">
            <el-dropdown>
              <span class="el-dropdown-link">
                {{ user.name }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div> -->
      </div>
      <div class="bottom">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script src="./home.js">
</script>
<style scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
}

.image {
  position: absolute;
  top: 2%;
  right: 30px;
}

.top {
  width: 100%;
  display: flex;
  height: 8%;
  background-color: rgba(255, 255, 255);
  border-bottom: 1px solid rgb(241, 240, 240);
}

.right {
  width: 100%;
  height: 100%;
  display: column;
}

.left {
  /* width: 16%; */
  height: 101%;
  background-color: rgb(85, 193, 212);
}

.logo {
  height: 8%;
  background-color: antiquewhite;
}

.left-1 {
  width: 100%;
  height: auto;
}
.bottom {
  width: 100%;
  height: 92.5%;
  background-color: white;
  /* padding-top: 2%; */
}

.name {
  color: #8a8a8a;
  width: 13%;
  font-size: 20px;
  text-align: right;
  line-height: 25px;
  float: right;
  margin-right: 6%;
  margin-top: 0.7%;
}

.el-dropdown-link {
  cursor: pointer;
  color: white;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-col-15 {
  width: 100%;
}

.el-menu-vertical-demo {
  border: 0px;
}

i {
  color: white;
}

/* .left i:hover,:active{
  color: rgb(69, 166, 232);
} */

.open {
  width: 5%;
  text-align: center;
  line-height: 65px;
}

.open:hover {
  background-color: #e6e7e7;
}

.open i {
  color: rgb(69, 166, 232);
  font-size: 25px;
}

.el-menu-item-group__title {
  color: white;
}

.logo-img {
  width: 20%;
  height: 80%;
  padding-top: 2%;
  margin-right: 0px;
}

.brode{
  width: 100%;
  border-bottom: 2px solid rgb(223, 222, 222);
  height: 3%;
}
</style>