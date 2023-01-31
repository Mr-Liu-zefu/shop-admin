<template>
  <div class="address" style="overflow:auto" v-infinite-scroll="load">
    <el-card shadow="hover" class="seach_input">
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
            style="margin-left:5%"
            size="mini"
          >搜索</el-button>
        </div>
      </div>
      <div class="b">
        <div class="b-inpt">
          <el-form :inline="true" :model="input_txt" class="demo-form-inline" label-width="100px">
            <b>
              <el-form-item label="收货人:">
                <el-input
                  placeholder="收货人"
                  prefix-icon="el-icon-search"
                  v-model="input_txt.name"
                  size="small"
                ></el-input>
              </el-form-item>
            </b>

            <b>
              <el-form-item label="联系电话:">
                <el-input
                  placeholder="联系电话"
                  prefix-icon="el-icon-search"
                  v-model="input_txt.number"
                  size="small"
                ></el-input>
              </el-form-item>
            </b>
            <b>
              <el-form-item label="收货地址: ">
                <el-input
                  placeholder="收货地址"
                  prefix-icon="el-icon-search"
                  v-model="input_txt.address"
                  size="small"
                ></el-input>
              </el-form-item>
            </b>
          </el-form>
        </div>
        <el-collapse v-model="input_txt">
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
                    :model="input_txt"
                    class="demo-form-inline"
                    label-width="100px"
                    size="small"
                  >
                    <b>
                      <el-form-item label="收货用户ID:">
                        <el-input
                          placeholder="收货用户ID"
                          prefix-icon="el-icon-search"
                          v-model="input_txt.id"
                          size="small"
                        ></el-input>
                      </el-form-item>
                    </b>
                    <b>
                      <el-form-item label="订单类型:">
                        <el-select v-model="input_txt.type" placeholder="订单类型" size="small">
                          <el-option label="外卖跑腿" value="外卖跑腿"></el-option>
                          <el-option label="二手交易" value="二手交易"></el-option>
                          <el-option label="租借服务" value="租借服务"></el-option>
                        </el-select>
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
    <el-card shadow="hover" class="list" style="overflow:auto">
      <div class="clearfix" style="margin-bottom:1%">
        <span style="font-size:15px;">
          <b>
            <i class="el-icon-tickets"></i> 收货信息列表
          </b>
        </span>
        <div class="p">
          <el-button icon="el-icon-refresh" @click="clear" size="small" class="cz">重置</el-button>
        </div>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        v-loading="loading"
        element-loading-text="努力加载中"
        element-loading-spinner="el-icon-loading"
        v-infinite-scroll="load"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column type="expand" label="收货详情" width="55">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品图片">
                <span>
                  <img :src="props.row.order_image" width="30%" height="30%" alt />
                </span>
              </el-form-item>
              <el-form-item>
                <span></span>
              </el-form-item>
              <el-form-item label="收货人">
                <span>{{ props.row.buy_human }}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="物流状态">
                <!-- <template slot-scope="scope"> -->
                <el-tag
                  :type="props.row.order_status === '已送达' ? 'primary' : 'danger'"
                >{{props.row.order_status}}</el-tag>
                <!-- </template> -->
              </el-form-item>
              <el-form-item label="订单编号">
                <span>{{ props.row.order_id }}</span>
              </el-form-item>
              <el-form-item label="收货地址">
                <span>{{ props.row.order_address }}</span>
              </el-form-item>
              <el-form-item label="订单类型">
                <span>{{ props.row.kind }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.create_time }}</span>
              </el-form-item>
              <el-form-item label="应付金额">
                <span>{{ props.row.money }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column align="center" label="联系电话" prop="phone"></el-table-column>
        <el-table-column align="center" label="收货人" prop="buy_human" width="100"></el-table-column>
        <el-table-column align="center" label="收货地址" prop="order_address" width="400"></el-table-column>
        <el-table-column align="center" label="收货状态" prop="order_status" width="100">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.order_status === '已送达' ? 'primary' : 'danger'"
            >{{scope.row.order_status}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-edit"
              type="primary"
              size="mini"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="编辑收货地址" :visible.sync="dialogformVisible" width="30%" class="edi">
      <!-- <div class="d_input"> -->
      <div style="flex-direction:column;width:100%">
        <div style="width:100%;margin-top:5%">
          收货状态：
          <el-input v-model="ediData.order_status" />
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="subediData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { share_fetchData, order_staute_edi } from "../../../api/view";
export default {
  data() {
    return {
      input_txt: {
        name: "",
        address: "",
        type: "",
        id: "",
        number: ""
      },
      dialogformVisible: 0,
      selectionList: [],
      ediData: {order_status:'',order_id:0},
      tableData: [],
      loading: true
    };
  },
  mounted() {
    this.get_data();
  },
  methods: {
    //获取数据
    get_data() {
      const par = {
        page: 1,
        psize: 100
      };
      share_fetchData(par)
        .then(res => {
          this.$message.success("加载成功");
          console.log(res.data.data.data);
          this.tableData = res.data.data.data;
          this.loading = false;
        })
        .catch(() => {
          this.$message.error("请求失败，请检网络设置");
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
      let i = this.input_txt;
      this.clearValue(i);
      console.log(this.input_txt);
    },
    //列表的重置按钮，重新获取列表数据
    clear() {
      this.tableData = [];
      this.loading = true;
      this.get_data();
    },
    //搜索时触发的函数
    seach() {
      console.log(this.input_txt);
      if (
        this.input_txt.name == "" &&
        this.input_txt.number == "" &&
        this.input_txt.address == "" &&
        this.input_txt.id == "" &&
        this.input_txt.type == ""
      ) {
        this.$message({
          type: "warning",
          message: "至少要输入一个信息哦"
        });
      } else {
        const par = {
        page: 1,
        psize: 100
      };
      share_fetchData(par)
      .then(res => {
          this.$message.success("搜索结果如下");
          console.log(res.data.data.data);
          this.tableData = res.data.data.data;
          this.loading = false;
        })
        .catch(() => {
          this.$message.error("搜索失败，请检网络设置");
        });
      }
    },
    //编辑时触发的函数
    handleEdit(row) {
      this.dialogformVisible = !this.dialogformVisible;
      this.ediData.order_status = row.order_status;
      this.ediData.order_id = row.order_id
      console.log(this.ediData);
    },
    //修改后的提交函数
    subediData() {
      const par = {
        order_status: this.ediData.order_status,
        order_id:this.ediData.order_id
      };
      order_staute_edi(par)
        .then(res => {
          this.$message.success("提交成功");
          this.get_data();
        })
        .catch(() => {
          this.$message.error("请求失败，请检查网络设置");
        });
      this.dialogformVisible = !this.dialogformVisible;
    }
  }
};
</script>

<style scoped>
.address {
  max-height: 100%;
}

.el-input {
  margin-right: 6%;
  width: 110%;
  margin-bottom: 2%;
  height: 30px;
}

.seach_input {
  width: 96%;
  margin-left: 2%;
  margin-top: 1%;
}

.b-input {
  width: 100%;
  margin-right: 10%;
  flex-direction: column;
}

.r {
  float: right;
  display: flex;
}
.p {
  float: right;
  margin-right: 1%;
  display: flex;
  margin-top: -0.5%;
}

.list {
  width: 96%;
  /* background-color: antiquewhite; */
  margin-left: 2%;
  margin-top: 1%;
  height: auto;
  margin-bottom: 1%;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.box {
  display: flex;
  margin-top: 1%;
  margin-right: 2%;
  float: right;
  margin-bottom: 1%;
}

.el-button--primary {
  background-color: rgb(85, 193, 212);
  color: white;
  border-color: rgb(85, 193, 212);
}

.cz {
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
}
/* .el-button--danger {
    background-color: rgb(221, 243, 247);
  color: rgb(85, 193, 212);
  border-color: rgb(85, 193, 212);
}  */

/* .d_input {
  width: 70%;
  float: left;
} */

.edi .el-input {
  width: 90%;
}
</style>