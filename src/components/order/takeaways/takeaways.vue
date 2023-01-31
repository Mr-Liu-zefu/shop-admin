<template>
  <div class="share" style="overflow:auto">
    <el-card shadow="hover" class="card" style="overflow:auto;margin-top:1%">
      <div class="clearfix" style="margin-top:-0.5%">
        <span style="font-size:15px;">
          <b>
            <i class="el-icon-search"></i>筛选搜索
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
        <div class="box_input">
          <el-form :inline="true" class="demo-form-inline" label-width="100px">
            <b>
              <el-form-item label="商品名称">
                <el-input
                  placeholder="商品名称"
                  v-model="seachData.name"
                  prefix-icon="el-icon-search"
                  size="small"
                ></el-input>
              </el-form-item>
            </b>

            <b>
              <el-form-item label="下单用户">
                <el-input
                  placeholder="用户名"
                  v-model="seachData.buy_human"
                  prefix-icon="el-icon-search"
                  size="small"
                ></el-input>
              </el-form-item>
            </b>
            <b>
              <el-form-item label="联系方式: ">
                <el-input
                  placeholder="手机号码"
                  v-model="seachData.phone"
                  prefix-icon="el-icon-search"
                  size="small"
                ></el-input>
              </el-form-item>
            </b>
          </el-form>
        </div>
      </div>
    </el-card>
    <el-card shadow="hover" class="list" style="overflow:auto">
      <div class="clearfix" style="margin-bottom:1%">
        <span style="font-size:15px;">
          <b>
            <i class="el-icon-tickets"></i> 数据列表
          </b>
        </span>
        <div class="p">
          <el-button
            icon="el-icon-refresh"
            @click="fetchdata"
            style="margin-left:3%"
            size="mini"
            class="cz"
          >重置</el-button>
        </div>
      </div>
      <el-table
        :data="tableData"
        v-loading="loading"
        element-loading-text="努力加载中"
        element-loading-spinner="el-icon-loading"
        border
        style="width: 100%"
      >
        <el-table-column align="center" prop="order_id" label="订单编号" width="80"></el-table-column>
        <el-table-column align="center" fixed prop="create_time" label="创建时间"></el-table-column>
        <el-table-column align="center" prop="name" label="商品名称"></el-table-column>
        <el-table-column align="center" prop="buy_human" label="下单用户"></el-table-column>
        <el-table-column align="center" prop="phone" label="联系方式"></el-table-column>
        <el-table-column align="center" prop="order_address" label="收货地址" width="200"></el-table-column>
        <el-table-column align="center" prop="order_status" label="订单状态" width="80">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.order_status === '已送达' ? 'success' : 'danger'"
            >{{scope.row.order_status}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="money" label="交易金额" width="80"></el-table-column>
        <el-table-column align="center" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="check(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small" @click="ediData(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog style="flex-direction: column" title="提示" :visible.sync="dialogVisible" width="30%">
      <div style="flex-direction:column;width:100%">
        <div style="width:100%;margin-top:5%">收货地址：{{ checkData.order_address }}</div>
        <div style="width:100%;margin-top:5%">创建时间：{{ checkData.create_time }}</div>
        <div style="width:100%;margin-top:5%">收货人：{{ checkData.buy_human }}</div>
        <div style="width:100%;margin-top:5%">联系电话：{{ checkData.phone }}</div>
        <div style="width:100%;margin-top:5%">商品名称： {{ checkData.name }}</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog style="flex-direction: column" title="提示" :visible.sync="dialogVisible2" width="30%">
      <div style="flex-direction:column;width:100%">
        <div style="width:100%;margin-top:5%">
          收货状态：
          <el-input v-model="edata.order_status" />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="ediData2">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { share_fetchData, order_staute_edi } from "../../../api/view.js";
export default {
  data() {
    return {
      loading:true,
      seachData: {
        name: "",
        phone: "",
        buy_human: ""
      },
      tableData: [],
      dialogVisible: false,
      dialogVisible2: false,
      checkData: {
        create_time: "",
        phone: "",
        name: "",
        buy_human: "",
        order_address: ""
      },
      edata: {
        order_status: "",
        order_id: 0
      }
    };
  },
  mounted() {
    this.fetchdata();
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
    //查看数据
    check(row) {
      this.checkData.create_time = row.create_time;
      this.checkData.phone = row.phone;
      this.checkData.name = row.name;
      this.checkData.buy_human = row.buy_human;
      this.checkData.order_address = row.order_address;
      this.dialogVisible = !this.dialogVisible;
    },
    //获取数据
    fetchdata() {
      const par = {
        page: 1,
        psize: 10,
        kind: "外卖跑腿"
      };
      share_fetchData(par).then(
        response => {
          this.tableData = response.data.data.data;
          this.$message.success("加载完成");
          this.loading = false;
        },
        response => {
          console.log("error");
          alert("请求失败");
        }
      );
    },

    //搜索数据
    seach() {
      if (
        this.seachData.name == "" &&
        this.seachData.buy_human == "" &&
        this.seachData.phone == ""
      ) {
        this.$message({
          message: "至少要输入一个信息哦",
          type: "warning"
        });
      } else {
        this.tableData = [];
        const obj = this.seachData;
        let seachobj = { page: 1, psize: 10, kind: "外卖跑腿" };
        for (let key in obj) {
          // console.log(key + ":" + obj[key]);
          if (obj[key] != "") {
            seachobj[key] = obj[key];
          } else {
            delete obj.key;
          }
        }
        console.log(seachobj);
        share_fetchData(seachobj).then(res => {
          this.tableData = res.data.data.data;
        });
      }
    },
    //编辑数据
    ediData(val) {
      const data = val;
      this.edata.order_status = data.order_status;
      this.edata.order_id = data.order_id;
      this.dialogVisible2 = !this.dialogVisible2;
    },
    ediData2() {
      const par = {
        order_status: this.edata.order_status,
        order_id: this.edata.order_id
      };
      order_staute_edi(par)
        .then(res => {
          this.$message.success("提交成功");
          this.dialogVisible2 = !this.dialogVisible2;
          this.fetchdata();
        })
        .catch(() => {
          this.$message.error("请求失败，请检查网络设置");
        });
    }
  }
};
</script>

<style scoped>
.share {
  width: 100%;
  height: 100%;
}
.r {
  float: right;
  display: flex;
  margin-top: -0.4%;
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

.el-button--primary {
  background-color: rgb(85, 193, 212);
  color: white;
  border-color: rgb(85, 193, 212);
}

.box_input {
  width: 100%;
  display: flex;
  margin-right: 10%;
  margin-top: 1%;
  margin-bottom: -1%;
}

.el-input {
  margin-right: 4%;
}

.card {
  margin-top: 1%;
  width: 96%;
  margin-left: 2%;
}

.list {
  width: 96%;
  margin-left: 2%;
  margin-top: 1%;
  height: auto;
  margin-bottom: 1%;
}

.p {
  float: right;
  margin-right: 1%;
  display: flex;
  margin-top: -0.5%;
}
</style>