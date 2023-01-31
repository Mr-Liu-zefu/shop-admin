<template>
  <div class="money" style="overflow:auto">
    <el-card shadow="hover" class="card" style="margin-top:2%">
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
                  prefix-icon="el-icon-search"
                  size="small"
                  v-model="seachData.name"
                ></el-input>
              </el-form-item>
            </b>
            <b>
              <el-form-item label="付款人">
                <el-input
                  placeholder="用户名"
                  prefix-icon="el-icon-search"
                  size="small"
                  v-model="seachData.buy_human"
                ></el-input>
              </el-form-item>
            </b>
            <b>
              <el-form-item label="交易地点: ">
                <el-input
                  placeholder="交易地点"
                  prefix-icon="el-icon-search"
                  size="small"
                  v-model="seachData.order_address"
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
            @click="getdata"
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
        <el-table-column prop="create_time" label="交易时间" width="180" align="center"></el-table-column>
        <el-table-column prop="name" label="交易商品" width="180" align="center"></el-table-column>
        <el-table-column prop="order_address" label="交易地点" align="center"></el-table-column>
        <el-table-column prop="name" label="付款人" align="center"></el-table-column>
        <el-table-column label="收入金额" align="center" color="rgb(85, 193, 212)">
          <template slot-scope="scope">
            <pre>{{ scope.row.money }}  RMB</pre>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { share_fetchData } from "../../api/view";

export default {
  data() {
    return {
      tableData: [],
      loading: true,
      seachData: {
        buy_human: "",
        name: "",
        order_address: ""
      }
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    //获取数据
    getdata() {
      const par = {
        page: 1,
        psize: 100,
        order_status: "已送达"
      };
      share_fetchData(par)
        .then(res => {
          console.log(res.data.data.data);
          this.$message.success("加载成功");
          this.tableData = res.data.data.data;
          this.loading = false;
        })
        .catch(() => {
          this.$message.error("请求失败，请检查网络设置");
        });
    },
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
    //搜索函数
    seach() {
      if (
        this.seachData.buy_human == "" &&
        this.seachData.order_address == "" &&
        this.seachData.name == ""
      ) {
        this.$message({
          message: "至少要输入一个信息哦",
          type: "warning"
        });
      } else {
        this.tableData = [];
        this.loading = true;
        const obj = this.seachData;

        let seachobj = { page: 1, psize: 10 };
        //遍历输入框绑定的数组
        for (let key in obj) {
          //如果该数组中的属性的属性值不为空，则将该属性与其属性值复制到seachobj中
          if (obj[key] != "") {
            seachobj[key] = obj[key];
          } else {
            //如果该数组中的属性的属性值为空，则删除该属性
            delete obj.key;
          }
        }
        share_fetchData(seachobj)
          .then(res => {
            this.$message.success("查找结果如下");
            this.tableData = res.data.data.data;
            this.loading = false;
          })
          .catch(() => {
            this.$message({
              type: "error",
              message: "请求失败，请检查网络设置"
            });
          });
      }
    }
  }
};
</script>

<style scoped>
.money {
  width: 100%;
  max-height: 100%;
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