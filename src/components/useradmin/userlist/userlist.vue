<template>
  <div class="ua" style="overflow:auto">
    <el-card shadow="hover" class="ip">
      <div class="clearfix" style="margin-bottom:1%">
        <span style="font-size:15px;">
          <b>
            <i class="el-icon-search"></i> 筛选搜索
          </b>
        </span>
        <div class="r">
          <el-button
            icon="el-icon-refresh"
            @click="space"
            style="margin-left:3%"
            size="mini"
            class="cz"
          >重置</el-button>
          <el-button
            icon="el-icon-search"
            @click="seach"
            type="primary"
            style="margin-left:5%;background_color:rgb(85, 193, 212)"
            size="mini"
          >搜索</el-button>
        </div>
      </div>
      <div class="b">
        <div class="b-inpt">
          <el-form :inline="true" :model="seachData" class="demo-form-inline" label-width="100px">
            <b>
              <el-form-item label="用户名">
                <el-input
                  placeholder="用户名"
                  prefix-icon="el-icon-search"
                  v-model="seachData.username"
                  size="small"
                ></el-input>
              </el-form-item>
            </b>
            <b>
              <el-form-item label="账号状态">
                <el-select v-model="seachData.status" placeholder="请选择账号状态" size="small">
                  <el-option label="启用" value="0"></el-option>
                  <el-option label="禁用" value="1"></el-option>
                </el-select>
              </el-form-item>
            </b>
            <b>
              <el-form-item label="用户ID: ">
                <el-input
                  placeholder="用户ID"
                  prefix-icon="el-icon-search"
                  v-model="seachData.uid"
                  size="small"
                ></el-input>
              </el-form-item>
            </b>
          </el-form>
        </div>
        <el-collapse v-model="seachData">
          <el-collapse-item>
            <template slot="title">
              <div class="clearfix">
                <span style="font-size:15px;">
                  <i class="el-icon-document-copy"></i>
                  <b>更多筛选</b>
                </span>
              </div>
            </template>
            <div class="box_button">
              <div class="bb">
                <div class="box_buttom_input">
                  <el-form
                    :inline="true"
                    :model="seachData"
                    class="demo-form-inline"
                    label-width="100px"
                    size="small"
                  >
                    <b>
                      <el-form-item label="用户性别">
                        <el-select v-model="seachData.sex" placeholder="用户性别" size="small">
                          <el-option label="男" value="1"></el-option>
                          <el-option label="女" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </b>
                    <b>
                      <el-form-item label="用户身份">
                        <el-select v-model="seachData.tag" placeholder="身份" size="small">
                          <el-option label="学生" value="学生"></el-option>
                          <el-option label="老师" value="老师"></el-option>
                        </el-select>
                      </el-form-item>
                    </b>
                    <b>
                      <el-form-item label="二级学院:">
                        <el-input
                          placeholder="二级学院"
                          prefix-icon="el-icon-search"
                          v-model="seachData.college"
                          size="small"
                        ></el-input>
                      </el-form-item>
                    </b>
                    <b>
                      <el-form-item label="真实姓名:">
                        <el-input
                          placeholder="真实姓名"
                          prefix-icon="el-icon-search"
                          v-model="seachData.name"
                          size="small"
                        ></el-input>
                      </el-form-item>
                    </b>
                    <b>
                      <el-form-item label="注册时间:">
                        <el-input
                          placeholder="注册时间"
                          prefix-icon="el-icon-search"
                          v-model="seachData.create_time"
                          size="small"
                        ></el-input>
                      </el-form-item>
                    </b>
                    <b>
                      <el-form-item label="手机号码:">
                        <el-input
                          placeholder="手机号码"
                          prefix-icon="el-icon-search"
                          v-model="seachData.phone"
                          size="small"
                        ></el-input>
                      </el-form-item>
                    </b>
                  </el-form>
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>
    <el-card shadow="hover" class="ip2" style="overflow:auto">
      <div class="clearfix" style="margin-bottom:1%">
        <span style="font-size:15px;">
          <b>
            <i class="el-icon-tickets"></i> 用户列表
          </b>
        </span>
        <div class="p">
          <el-button
            icon="el-icon-refresh"
            @click="fetahData"
            style="margin-left:3%"
            size="mini"
            class="cz"
          >重置</el-button>
          <el-button
            class="pl"
            size="small"
            @click="delAllgoods"
            :disabled="this.selectionList.length === 0"
          >注销选中用户</el-button>
        </div>
      </div>

      <el-table
        ref="filterTable"
        :data="tableData"
        v-loading="loading"
        element-loading-text="努力加载中"
        element-loading-spinner="el-icon-loading"
        border
        align="center"
        @selection-change="handleSelectionChange"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="uid" label="ID" width="55" align="center"></el-table-column>
        <el-table-column prop="avatar" label="头像" align="center" width="90">
          <template slot-scope="scope">
            <el-avatar :size="60">
              <img :src="baseURL + scope.row.avatar" />
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" align="center" width="90"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center" width="80"></el-table-column>
        <!-- <el-table-column prop="birthday" label="生日" align="center" width="100"></el-table-column> -->
        <el-table-column prop="sex" label="性别" align="center" width="60">
          <template slot-scope="scope">
            <div v-if="scope.row.sex==='1'">
              <i class="el-icon-male"></i>
            </div>
            <div v-else>
              <i class="el-icon-female"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name_status" label="实名状态" width="80">
          <template slot-scope="scope">
            <el-tag :type="scope.row.name_status === '0' ? 'success' : 'danger'">
              <div v-if="scope.row.name_status === '0'">已实名</div>
              <div v-else-if="scope.row.name_status === '1'">未实名</div>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="college" label="学院" align="center"></el-table-column>

        <el-table-column
          prop="create_time"
          label="注册时间"
          sortable
          column-key="create_time"
          align="center"
          width="110"
        ></el-table-column>
        <el-table-column align="center" prop="tag" label="身份">
          <template slot-scope="scope">
            <el-tag :type="scope.row.tag === '学生' ? 'primary' : 'info'">{{scope.row.tag}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="status" label="状态" align="center" border>
          <template slot-scope="scope">
            <div v-if="scope.row.status == 0">
              <el-tooltip :content="'该账号处于“启用”状态'" placement="top">
                <el-switch
                  v-model="scope.row.status"
                  active-color="rgb(85, 193, 212)"
                  inactive-color="#909399"
                  @change="change_state(scope.row)"
                  active-value="0"
                  inactive-value="1"
                ></el-switch>
              </el-tooltip>
            </div>
            <div v-else>
              <el-tooltip :content="'该账号处于“禁用”状态'" placement="top">
                <el-switch
                  v-model="scope.row.status"
                  active-color="rgb(85, 193, 212)"
                  inactive-color="#909399"
                  @change="change_state(scope.row)"
                  active-value="0"
                  inactive-value="1"
                ></el-switch>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope" align="center">
            <el-button @click="check(scope.row)" icon="el-icon-view" type="primary" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="用户详细信息" :visible.sync="dialogVisible" width="60%" style="margin-top:-3%">
      <el-form :model="checkData">
        <div class="d1">
          <div class="db1">
            <div style="font-size:15px">
              <b>用户名：</b>
              {{ checkData.username}}
            </div>
            <div style="font-size:15px;margin-top:8%">
              <b>用户ID：</b>
              {{ checkData.uid}}
            </div>
            <div style="font-size:15px;margin-top:8%">
              <b>注册时间：</b>
              {{ checkData.create_time}}
            </div>
            <div style="font-size:15px;margin-top:8%;display:flex">
              <b>性别：</b>
              <div v-if="checkData.sex === '0'">男</div>
              <div v-else>女</div>
            </div>
            <div style="font-size:15px;margin-top:8%">
              <b>账号状态：</b>
              <el-switch
                v-model="checkData.status"
                active-color="rgb(85, 193, 212)"
                inactive-color="#909399"
                @change="change_state(checkData)"
                active-value="0"
                inactive-value="1"
              ></el-switch>
            </div>
            <div style="font-size:15px;margin-top:8%">
              <b>学院：</b>
              {{ checkData.college}}
            </div>
            <div style="font-size:15px;margin-top:8%">
              <b>邮箱：</b>
              {{ checkData.email}}
            </div>
            <div style="font-size:15px;margin-top:8%">
              <b>身份：</b>
              <el-tag :type="checkData.tag === '学生' ? 'primary' : 'info'">{{checkData.tag}}</el-tag>
            </div>
            <div style="font-size:15px;margin-top:8%">
              <b>生日：</b>
              {{ checkData.birthday}}
            </div>
            <div style="font-size:15px;margin-top:8%">
              <b>兴趣爱好：</b>
              {{ checkData.hoppy}}
            </div>
          </div>
          <div class="db2">
            <div style="font-size:15px;display:flex">
              <b style>头像：</b>
              <el-avatar :size="90">
                <img :src="baseURL + checkData.avatar" />
              </el-avatar>
            </div>
            <div style="font-size:15px;margin-top:8%">
              <b>个人简介：</b>
              {{ checkData.desc}}
            </div>
            <div style="font-size:15px;margin-top:8%">
              <b>手机号码：</b>
              {{ checkData.phone }}
            </div>
            <div style="font-size:15px;margin-top:8%">
              <b>实名状态：</b>
              <el-tag :type="checkData.name_state === '已实名' ? 'success' : 'danger'">
                <div v-if="checkData.name_status === '0'">已实名</div>
                <div v-else-if="checkData.name_status === '1'">未实名</div>
              </el-tag>
            </div>
            <div style="font-size:15px;margin-top:8%">
              <b>学号 / 工号：</b>
              {{ checkData.student_id}}
            </div>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import {
  userlistfetch,
  userlistseach,
  userlistdel,
  user_Edi
} from "../../../api/view";

export default {
  data() {
    return {
      dialogVisible: 0,
      arry_data: [],
      seachData: {
        uid: "",
        name: "",
        sex: "",
        tag: "",
        college: "",
        create_time: "",
        phone: "",
        username: "",
        status: ""
      },
      loading: true,
      checkData: {},
      tableData: [],
      tableData1: [],
      selectionList: [],
      baseURL: "http://yxmzq.top"
    };
  },
  mounted() {
    //调用获取数据的函数
    this.fetahData();
  },
  methods: {
    //清除对象中所有的属性值
    clearValue(obj) {
      Object.keys(obj).forEach(key => {
        if (typeof obj[key] == "object") {
          this.clearValue(obj[key]);
        } else {
          obj[key] = "";
        }
      });
    },
    //重置输入框函数
    space() {
      let i = this.seachData;
      this.clearValue(i);
      console.log(this.seachData);
      this.seachData = [];
      this.$message({
        type: "success",
        message: "已清除输入框内内容"
      });
    },
    //获取数据函数
    fetahData() {
      const params = {
        page: 1,
        psize: 100
      };
      userlistfetch(params).then(
        response => {
          this.$message.success("刷新成功");
          this.tableData = response.data.data.data;
          this.loading = false;
        },
        response => {
          this.$message({
            type: "error",
            message: "请求失败，请检查网络设置"
          });
        }
      );
    },
    //搜索时触发的函数
    seach() {
      if (
        this.seachData.username == "" &&
        this.seachData.uid == "" &&
        this.seachData.phone == "" &&
        this.seachData.sex == "" &&
        this.seachData.status == "" &&
        this.seachData.college == "" &&
        this.seachData.name == "" &&
        this.seachData.create_time == "" &&
        this.seachData.tag == ""
      ) {
        this.$message({
          message: "至少要输入一个信息哦",
          type: "warning"
        });
      } else {
        this.tableData = [];
        const obj = this.seachData;
        let seachobj = { page: 1, psize: 10 };
        for (let key in obj) {
          // console.log(key + ":" + obj[key]);
          if (obj[key] != "") {
            seachobj[key] = obj[key];
          } else {
            delete obj.key;
          }
        }
        console.log(seachobj);
        userlistseach(seachobj).then(res => {
          this.tableData = res.data.data.data;
        });
      }
    },
    //选中触发的函数
    handleSelectionChange(val) {
      this.selectionList = val;
      const data = [];
      this.selectionList.forEach(function(i) {
        data.push(i.uid);
      });
      this.arry_data = data;
    },
    //修改状态触发的函数
    change_state(txt) {
      const par = {
        status: txt.status,
        user_id: txt.uid
      };

      // console.log(par)
      user_Edi(par)
        .then(res => {
          this.$message.success("修改用户状态成功");
        })
        .catch(() => {
          this.$message.console.error("修改失败，请检查你的网络设置");
        });
    },
    //查看详情触发的函数
    check(data) {
      this.dialogVisible = !this.dialogVisible;
      this.checkData = data;
    },
    //批量删除触发的函数
    delAllgoods() {
      this.$confirm("此操作将永久删除此商品, 是否继续?", "警告", {
        confirmButtonText: "继续",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let ids = [];
          let List = this.arry_data;
          List.forEach(item => {
            ids.push(item);
          });
          let ui = { uid: ids };
          userlistdel(ui)
            .then(res => {
              this.fetahData();
              this.selectionList = [];
            })
            .catch(res => {
              this.$message({
                type: "error",
                message: "请求失败"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style scoped>
.el-input {
  margin-right: 6%;
  width: 110%;
  margin-bottom: 2%;
  height: 30px;
}

.r {
  float: right;
  display: flex;
}

.ua {
  width: 100%;
  height: 100%;
  flex-direction: row-reverse;
}

.ip {
  width: 96%;
  /* background-color: antiquewhite; */
  margin-left: 2%;
  margin-top: 1%;
}

.ip2 {
  width: 96%;
  /* background-color: antiquewhite; */
  margin-left: 2%;
  margin-top: 1%;
  height: auto;
  margin-bottom: 1%;
}

.b-input {
  width: 100%;
  margin-right: 10%;
  flex-direction: column;
}

.box {
  display: flex;
  margin-top: 1%;
  margin-right: 2%;
  float: right;
  margin-bottom: 1%;
}

.el-button--primary {
  color: #fff;
  background-color: rgb(85, 193, 212);
  border-color: rgb(85, 193, 212);
}

.el-button--primary:active {
  color: rgb(85, 193, 212);
  background-color: rgba(85, 193, 212, 0.103);
  border-color: rgb(85, 193, 212);
}

.cz {
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
}

.cz:active {
  background: #fff;
  border: 1px solid rgb(85, 193, 212);
  color: rgb(85, 193, 212);
}

.p {
  float: right;
  margin-right: 1%;
  display: flex;
  margin-top: -0.5%;
}

.pl {
  background-color: rgb(85, 193, 212);
  color: white;
  border-color: rgb(85, 193, 212);
}

.d1 {
  display: flex;
  width: 100%;
}

.db1 {
  width: 50%;
  padding-left: 8%;
}

.db2 {
  width: 50%;
}

.d1 {
  margin-top: -2%;
}

.el-icon-female {
  color: #ff99cc;
}

.el-icon-male {
  color: #0099cc;
}
</style>