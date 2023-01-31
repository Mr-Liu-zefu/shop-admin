import axios from 'axios'
import { Forget_code } from '../../api/view'

export default {
    data() {
        return {
            form: {
                code: '验证码',
                email: '邮箱',
                email_password: '新密码'
            }
        }
    },
    methods: {
        goBack() {
            this.$router.push('/')
        },
        getCode() {
            // axios
            //  .get('http://192.168.1.126:8082/admin/v1/user/ver', {
            //         params: {
            //             email: this.form.email,
            //         }
            //     })
            // const parameter = {
            //     email: this.form.email,
            // }
            Forget_code({ email: this.form.email })
                .then(res => {
                    this.$message({
                        message: '已发送验证码',
                        type: 'success'
                    })
                })
                .catch(() => {
                    this.$message({
                        message: '请求失败请检查网络设置',
                        type: 'error'
                    })
                })
        },
        submit() {
            // const data = {
            //     email: this.form.email,
            //     code: this.form.code,
            //     email_password: this.form.email_password
            // }
            axios
                .post('http://192.168.1.126:8082/admin/v1/user/update', data = {
                    email: this.form.email,
                    code: this.form.code,
                    email_password: this.form.email_password
                })
                .then(res => {
                    if (res.data.code == 0) {
                        this.$message({
                            message: '修改成功，请重新登陆',
                            type: 'success'
                        })
                    } else {
                        this.$message({
                            message: '验证码错误，请重新输入',
                            type: 'error'
                        })
                    }
                })
                .catch(res => {
                    this.$message({
                        message: '请求超时，请检查网络连接',
                        type: 'error'
                    })
                })
        }
    }
}