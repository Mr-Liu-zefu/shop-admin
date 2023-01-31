import axios from "axios";
import { login } from '../../api/view'

export default {
  data() {
    return {
      form: {
        name: "账号",
        password: "密码"
      },
    };
  },
  methods: {
    onSubmit() {
      const par = {
        username: this.form.name,
        password: this.form.password
      }
      login(par)
        .then(res => {
          // console.log(res.data.data.access_token)
          if (res.data.code == 0 ) {
            this.$router.push("/homepage")
            this.$store.commit('setToken', res.data.data.access_token)
            this.$message({
              message: '登陆成功',
              type: 'success'
            })
          } else {
            this.$message({
              message:'用户名或密码错误',
              type:'error'
            })
          }
        })
        .catch(() => {
          this.$message({
            message: '请求失败，请检查网络',
            type: 'error'
          })
        })
      // axios
      //   .post('url',data)
      //   .then( () => {
      //     if(this.form.name == "admin" && this.form.password == "admin"){
      //       this.$router.push('/homepage')

      //       this.$message({
      //       message: '登陆成功',
      //       type: 'success'
      //     });
      //     }
      //     else{
      //       this.$message({
      //         message:'登陆失败',
      //         type:'error'
      //       })
      //     }
      //   })
      // if (this.form.name == "admin" && this.form.password == "admin") {
      //   this.$router.push("/homepage");
      //   this.$message({
      //     message: "登陆成功",
      //     type: "success"
      //   });
      // } else {
      //   this.$message({
      //     message: "登陆失败",
      //     type: "error"
      //   });
      // }
    },
    regist() {
      console.log("code!");
      this.$router.push("regist");
    },
    forgetPassword() {
      this.$router.push('/forget')
    }
  }
};