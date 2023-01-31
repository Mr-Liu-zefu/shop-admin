<template>
  <div class="back">
    <el-card shadow="always" class="login">
    <div class="word">
      <h1>LOGIN IN</h1>
    </div>
    <el-form ref="form" :model="form" label-width="45px" style="padding-top:15%">
      <input v-model="form.name" class="box">
      <input show-password v-model="form.password" class="box5">
      <div class="box1">
        <div class="box2">
          <el-button type="text" @click="forgetPassword">忘记密码</el-button>
        </div>
        <div class="box3">
          <el-button type="text" @click="regist" style="float:right">注册</el-button>
        </div>
      </div>
      <el-button type="primary" round @click="onSubmit" style="width:100%;" class="box4">登陆</el-button>
    </el-form>
    <el-divider></el-divider>
    <div class="image_box">
      <div class="image">
        <a>
          <img src="@/assets/qq.png" width="55px" height="55px" />
        </a>
      </div>
      <div class="image">
        <a>
          <img src="@/assets/wechat.png" width="50px" height="50px" />
        </a>
      </div>
      <div class="image">
        <a>
          <img src="@/assets/xinlan.png" width="50px" height="50px" />
        </a>
      </div>
    </div>
  </el-card>
  </div>
</template>

<script src="./login.js">
</script>

<style scoped>
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25%;
  height: 70%;
  border: none;
  background-image: url("../../assets/login.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

input {
  background-image: none;
  border-radius: 20px;
  border: 1px solid white;
  box-sizing: border-box;
  color: white;
  display: inline-block;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;

}
.word {
  width: 100%;
  height: 20%;
  color: white;
  text-align: center;
}
.box {
  margin-bottom: 10px;
  margin-top: 15px;
  background-color: transparent;
  color: #fff;
  font-size: 15px;
}

.box1 {
  width: 100%;
  display: flex;
}
.box2 {
  width: 50%;
  float: left;
  padding-left: 10px;
  /* padding-top: 10px; */
  display: flex;
  color: #409eff;
}

.box3 {
  width: 50%;
  /* float: right; */
  padding-right: 15px;
}

.box4 {
  margin-bottom: 5px;
  margin-top: 0px;
}
.box5{
  background-color: transparent;
  color: #fff;
  font-size: 15px;
}

image_box {
  width: 100%;
  height: 65px;
  padding: 2px;
  display: flex;
}
.image {
  width: 30%;
  height: 50px;
  float: right;
}

.back{
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
