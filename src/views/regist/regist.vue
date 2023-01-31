<template>
  <div>
    <el-card always class="code">
      <div class="back">
        <el-page-header @back="goBack" title="Back" />
      </div>
      <el-form ref="form" :model="form" label-width="8px" size="mini">
        <el-form-item>
          <input v-model="form.email" />
        </el-form-item>
        <el-form-item>
          <input v-model="form.email_password" />
        </el-form-item>
        <el-form-item class="cd">
          <input v-model="form.code" placeholder="验证码" />
          <el-button icon="el-icon-message" type="primary" circle @click="getCode"></el-button>
        </el-form-item>
      </el-form>
      <div class="res">
        <el-button round @click="submit" class="resi" type="primary" plain>RESGIST</el-button>
      </div>
      <div class="word">
        <h>SIGN UP</h>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        email: "邮箱",
        code: "验证码",
        email_password: "密码"
      }
    };
  },
  mounted() {},
  methods: {
    getCode() {
      console.log(this.form.email);
      axios
        .get("http://192.168.1.126:8082/admin/v1/user/email", {
          params: {
            email: this.form.email
          }
        })
        .then(() => {
          this.$message({
            message: "已发送验证码",
            type: "success"
          });
        })
        .catch(() => {
          this.$message({
            message: "请求超时，请检查网络连接",
            type: "error"
          });
        });
    },
    submit() {
      this.$router.push({ path: "/regist" });
      // const data = {
      //   code: this.from.code,
      //   email_password: this.from.email_password
      // };
      const data = {
        email: this.form.email,
        code: this.form.code,
        email_password: this.form.email_password
      };
      axios
        .post("http://192.168.1.126:8082/admin/v1/user/email", data)
        .then(res => {
          console.log(res.data);
          if (res.data.code == 0) {
            this.$router.push({ path: "/" });
            this.$message({
              message: "注册成功",
              type: "success"
            });
          } else {
            this.$message({
              message: "验证码错误",
              type: "error"
            });
            return;
          }
        })
        .catch(res => {
          this.$message({
            message: "请求超时，请检查网络连接",
            type: "error"
          });
        });
    },
    goBack() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style scoped>
.code {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25%;
  height: 65%;
  border: none;
  background-image: url("../../assets/regist.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  padding-top: 30px;
}

input {
  background-image: none;
  border-radius: 20px;
  border: 0.1px solid white;
  box-sizing: border-box;
  color: white;
  display: inline-block;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 90%;
  margin-left: 3.5%;
  background-color: transparent;
}

.res {
  width: 85%;
  margin-left: 7.5%;
}

.resi {
  width: 100%;
}

.el-button--text {
  color: aliceblue;
}

.back {
  position: absolute;
  top: 0px;
  left: 0px;
  color: white;
}

.cd input {
  width: 75%;
}

.cd .el-button--mini,
.el-button--small {
  font-size: 22px;
  position: absolute;
  top: 2px;
}

.word {
  width: 85%;
  margin-left: 7.5%;
  margin-top: 50%;
  font-size: 30px;
  text-align: center;
  /* background: linear-gradient(to right, rgb(191, 233, 255),rgb(255, 110, 127));
  -webkit-background-clip: text;
  color: transparent; */
  color: white;
}
</style>