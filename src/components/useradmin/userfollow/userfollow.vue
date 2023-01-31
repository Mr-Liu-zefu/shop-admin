<template>
  <div class="uf" style="overflow:auto">
    <el-card shadow="hover" class="ip2" style="overflow:auto">
      <div class="clearfix" style="margin-bottom:1%">
        <span style="font-size:15px;">
          <b>
            <i class="el-icon-tickets"></i> 数据列表
          </b>
        </span>
      </div>
      <el-table
        :data="tableData"
        v-loading="loading"
        element-loading-text="努力加载中"
        element-loading-spinner="el-icon-loading"
        style="width: 100%"
        border
      >
        <el-table-column prop="car_id" label="商品ID" align="center" width="90"></el-table-column>
        <el-table-column prop="good_type" label="商品类型" align="center"></el-table-column>
        <el-table-column prop="image_url" label="商品图片" align="center">
          <template slot-scope="scope">
            <el-avatar :size="80" src="https://empty" :fit="fit" shape="square">
              <img :src="baseURL + scope.row.image_url" />
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="good_name" label="关注的商品" align="center"></el-table-column>
        <el-table-column
          prop="create_time"
          sortable
          column-key="create_time"
          label="关注时间"
          align="center"
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { userCar } from "../../../api/view";

export default {
  data() {
    return {
      baseURL: "http://yxmzq.top",
      input_txt: {
        name: "",
        goods_name: "",
        id: ""
      },
      tableData: [],
      loading: true,
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    //搜索时触发的函数
    seach() {
      console.log("seach");
      if (
        this.input_txt.name == "" &&
        this.input_txt.id == "" &&
        this.input_txt.goods_name == ""
      ) {
        this.$message({
          type: "warning",
          message: "至少输入一个信息哦"
        });
      } else {
        this.$message({
          type: "warning",
          message: "暂时没有对接口"
        });
      }
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
    //重置输入框的函数
    space() {
      let i = this.input_txt;
      this.clearValue(i);
      console.log(this.input_txt);
    },
    getdata() {
      const par = {
        page: 1,
        psize: 100
      };
      userCar(par)
        .then(res => {
          // console.log(res.data.data)
          const obj = res.data.data;
          obj.forEach(item => {
            // if(item.car.length = 0){
            //   console.log(hh)
            // } else {
            //   this.tableData.push(item)
            // }
            // console.log(item.car)
            if (item.car[0] == undefined) {
              console.log("hahah");
            } else {
              item.car.forEach(item2 => {
                this.tableData.push(item2);
              });
            }
          });
          console.log(this.tableData);
          this.$message.success("加载成功");
          this.loading = false;
        })
        .catch(() => {
          this.$message.error("加载失败，请检检查网络设置");
        });
    }
  }
};
</script>

<style scoped>
.uf {
  max-height: 100%;
  width: 100%;
}

.el-input {
  margin-right: 6%;
  width: 110%;
  /* margin-bottom: 2%; */
  height: 30px;
}

.r {
  float: right;
  display: flex;
}

.ip {
  width: 96%;
  /* background-color: antiquewhite; */
  margin-left: 2%;
  margin-top: 1%;
}

.b-input {
  width: 100%;
  margin-right: 10%;
  flex-direction: column;
}

.b {
  margin-bottom: -2%;
}

.el-button--primary {
  color: #fff;
  background-color: rgb(85, 193, 212);
  border-color: rgb(85, 193, 212);
}

.cz {
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
}

.ip2 {
  width: 96%;
  /* background-color: antiquewhite; */
  margin-left: 2%;
  margin-top: 1%;
  height: auto;
  margin-bottom: 1%;
}
.box {
  display: flex;
  margin-top: 1%;
  margin-right: 2%;
  float: right;
  margin-bottom: 1%;
}
</style>