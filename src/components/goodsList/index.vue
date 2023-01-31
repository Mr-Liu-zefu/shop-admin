<template>
  <div class="goods" style="overflow:auto">
    <el-card class="haha" shadow="hover">
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
          <!-- {{$config.apiURL}} -->
        </div>
      </div>
      <div class="box">
        <div class="box_input">
          <el-input
            placeholder="商品名称"
            prefix-icon="el-icon-search"
            v-model="seachData.store_name"
            size="small"
          ></el-input>
          <el-input
            placeholder="商品编号"
            prefix-icon="el-icon-search"
            v-model="seachData.product_id"
            size="small"
          ></el-input>
          <el-input
            placeholder="商品价格"
            prefix-icon="el-icon-search"
            v-model="seachData.price"
            size="small"
          ></el-input>
          <el-input
            placeholder="商品分类"
            prefix-icon="el-icon-search"
            v-model="seachData.product_types"
            size="small"
          ></el-input>
        </div>
      </div>
    </el-card>
    <el-card class="goods_one" shadow="hover" style="overflow:auto;margin-bottom:1%">
      <el-button
        type="success"
        style="float: left; margin-bottom: 1%;"
        @click="addgoods"
        size="small"
      >添加商品</el-button>
      <el-button
        class="pl"
        size="small"
        @click="delAllgoods"
        :disabled="this.selectionList.length === 0"
        style="float: right"
      >批量删除</el-button>
      <el-button style="float: right" @click="getdata" size="small" class="cz">
        <i class="el-icon-refresh-left"></i>重置
      </el-button>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="loading"
        element-loading-text="努力加载中"
        element-loading-spinner="el-icon-loading"
      >
        <el-table-column type="selection" width="80" align="center"></el-table-column>
        <el-table-column fixed prop="product_id" label="编号" align="center" width="55"></el-table-column>
        <el-table-column prop="store_name" label="商品名称" align="center"></el-table-column>
        <el-table-column prop="product_picture" label="图品预览" align="center">
          <template slot-scope="scope">
            <!-- {{baseURL+scope.row.product_picture}} -->
            <el-avatar :size="80" src="https://empty">
              <img :src="baseURL+scope.row.product_picture" />
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格(RMB)" align="center"></el-table-column>
        <el-table-column prop="product_types" label="商品分类" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center" width="80">
          <template slot-scope="scope">
            <div v-if="scope.row.status == 0">
              <el-tooltip :content="'该商品状态为: 上架'" placement="top">
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
              <el-tooltip :content="'该商品状态为: 下架'" placement="top">
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
            <el-tooltip class="item" effect="dark" content="删除该商品" placement="top">
              <el-button
                @click="delData(scope.row.product_id)"
                icon="el-icon-delete"
                size="small"
                class="cz"
                circle
              ></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="查看商品详情" placement="top">
              <el-button
                @click="check(scope.row)"
                icon="el-icon-view"
                class="eb"
                size="small"
                circle
              ></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="修改商品信息" placement="top">
              <el-button
                @click="edigoods(scope.row)"
                type="success"
                icon="el-icon-edit"
                size="small"
                circle
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="详细信息" :visible.sync="dialogVisible" width="30%">
        <el-form :model="checkData">
          <div class="info_1">上传时间： {{checkData.create_time}}</div>
          <div class="info_1">名称： {{checkData.store_name}}</div>
          <div class="info_1">
            图片：
            <img :src="baseURL+checkData.product_picture" width="100%" height="100%" />
          </div>
          <div class="info_1" style="display:flex">
            价格：
            <div style="color:red">¥ {{checkData.price}}</div>
          </div>
          <div class="info_1">分类： {{checkData.product_types}}</div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="concel">取 消</el-button>
          <el-button type="primary" @click="concel">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="添加商品" :visible.sync="dialogFormVisible" class="add">
        <el-form :model="addData">
          <el-form-item label="商品名称">
            <el-input v-model="addData.store_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="上传图片">
            <el-upload
              class="upload-demo"
              action="http://yxmzq.top/admin/v1/product/addpicture"
              list-type="picture"
              :on-success="add_success"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="价格(RMB)">
            <el-input v-model="addData.price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-input v-model="addData.product_types" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addData_two">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="编辑商品" :visible.sync="dialogformVisible" class="add">
        <el-form :model="ediData">
          <el-form-item label="商品名称">
            <el-input v-model="ediData.store_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="上传图片">
            <el-upload
              class="upload-demo"
              :on-success="getdata2"
              action="http://yxmzq.top/admin/v1/product/uploadsproduct"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="价格(RMB)">
            <el-input v-model="ediData.price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-input v-model="ediData.product_types" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogformVisible = false">取 消</el-button>
          <el-button type="primary" @click="edidata_two">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import {
  goodslist,
  goodseach,
  goods_add,
  goods_del,
  get_goods
} from "../../api/view";

export default {
  data() {
    return {
      tableData: [],
      baseURL: "http://yxmzq.top/",
      goods_name: "",
      goods_id: "",
      seachData: {
        product_id: "",
        price: "",
        store_name: "",
        product_types: ""
      },
      dialogVisible: 0,
      dialogFormVisible: 0,
      dialogformVisible: 0,
      checkData: {},
      addData: {
        price: "",
        store_name: "",
        product_types: "",
        product_picture: ""
      },
      ediData: {},
      selectionList: [],
      fileData: {
        product_picture: "商品"
      },
      addData2: {},
      loading: true
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    //添加商品的函数
    addgoods() {
      console.log("添加商品");
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    //添加商品提交
    addData_two() {
      const par = this.addData;
      goods_add(par)
        .then(res => {
          this.$message({
            type: "success",
            message: "添加成功"
          });
          this.getdata();
          this.addData = {
            product_id: "",
            price: "",
            store_name: "",
            product_types: ""
          };
          this.dialogFormVisible = !this.dialogFormVisible;
        })
        .catch(res => {
          this.$message({
            type: "error",
            message: "请求失败，请检查网路设置"
          });
          this.dialogFormVisible = !this.dialogFormVisible;
        });
    },
    //添加数据时图片上传成功时所使用的函数
    add_success(response) {
      this.addData.product_picture = response.data;
    },
    //删除数据的函数
    delData(id) {
      this.$confirm("此操作将永久删除此商品, 是否继续?", "警告", {
        confirmButtonText: "继续",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const par = {
            product_id: [id]
          };
          goods_del(par)
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.getdata();
            })
            .catch(() => {
              this.$message({
                type: "success",
                message: "删除失败，请检查网络设置"
              });
            });
        })
        .catch(() => {
          this.$message({
            message: "已取消删除"
          });
        });
      this.selectionList = [];
    },
    //编辑数据的函数
    edigoods(data) {
      this.dialogformVisible = !this.dialogformVisible;
      this.ediData = data;
    },
    //编辑后提交编辑的函数
    edidata_two() {
      const par = this.ediData;
      goodslist(par)
        .then(() => {
          this.$message({
            type: "success",
            message: "编辑成功"
          });
          this.dialogformVisible = !this.dialogformVisible;
          this.getdata();
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "请求失败，请检查网络设置"
          });
          this.dialogformVisible = !this.dialogformVisible;
        });
    },
    //编辑数据时修改图片文件上传成功后调用
    getdata2(response) {
      console.log(this.ediData.product_picture);
      this.ediData.product_picture = response.data;
      console.log(response);
      console.log(this.ediData.product_picture);
    },
    //修改商品状态
    change_state(data) {
      this.ediData = data;
      const par = this.ediData;
      goodslist(par)
        .then(() => {
          this.$message({
            type: "success",
            message: "状态修改成功"
          });
          this.getdata();
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "请求失败，请检查网络设置"
          });
        });
    },
    //查看数据的函数
    check(data) {
      console.log(data);
      this.dialogVisible = !this.dialogVisible;
      this.checkData = data;
    },
    //选中某行数据的函数
    handleSelectionChange(val) {
      console.log(val);
      val.forEach(item => {
        this.selectionList.push(item.product_id);
      });
      console.log(this.selectionList);
    },
    //取消函数
    concel() {
      this.dialogVisible = !this.dialogVisible;
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
    //搜索时触发的函数
    seach() {
      if (this.seachData.product_id == "" && this.seachData.store_name == "" && this.seachData.price == "" && this.seachData.product_types == "" ) {
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
        goodseach(seachobj)
          .then(res => {
            this.tableData = res.data.data.data;
            this.$message.success("搜索结果如下");
          })
          .catch(() => {
            this.$message({
              type: "error",
              message: "请求失败，请检查网络设置"
            });
          });
      }
    },
    //批量删除时触发的函数
    delAllgoods() {
      this.$confirm("此操作将永久删除此商品, 是否继续?", "警告", {
        confirmButtonText: "继续",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let list = this.selectionList;
          const par = {
            product_id: list
          };
          // console.log(par)
          goods_del(par)
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.getdata();
            })
            .catch(() => {
              this.$message({
                type: "success",
                message: "删除失败，请检查网络设置"
              });
            });
        })
        .catch(() => {
          this.$message({
            message: "已取消删除"
          });
        });
      this.selectionList = [];
    },
    //获取数据的函数
    getdata() {
      const params = {
        page: 1,
        psize: 100
      };
      console.log(params);
      get_goods(params)
        .then(res => {
          console.log(res.data.data.data[0].product_picture);
          this.tableData = res.data.data.data;
          this.loading = false;
          this.$message.success("刷新成功");
        })
        .catch(res => {
          this.$message({
            type: "error",
            message: "请求失败，请检查网络设置"
          });
        });
    }
  }
};
</script>

<style scoped>
.goods {
  height: 100%;
  flex-direction: row-reverse;
}

.haha {
  width: 96%;
  margin-left: 2%;
  margin-bottom: 2%;
  margin-top: 2%;
}

.info_1 {
  margin-bottom: 10px;
}

.goods_one {
  width: 96%;
  margin-left: 2%;
}

.box {
  /* display: flex; */
  margin-top: 2%;
}

.box_input {
  width: 100%;
  display: flex;
  margin-right: 10%;
  margin-bottom: 2%;
}

.box_button {
  width: 100%;
  float: left;
  margin-bottom: 2%;
}

.box_buttom_input {
  width: 100%;
  display: flex;
}

.el-input {
  margin-right: 4%;
}

.box2 {
  display: flex;
  margin-top: 1%;
  margin-right: 2%;
  float: right;
  margin-bottom: 1%;
}

.add {
  width: 60%;
  margin-left: 20%;
  height: 90%;
}

.add .el-input {
  width: 70%;
}

.clearfix {
  margin-bottom: 1%;
}

.bb {
  display: flex;
  width: 100%;
}
.el-button--primary {
  background-color: rgb(85, 193, 212);
  color: white;
  border-color: rgb(85, 193, 212);
}

.el-button--success {
  background-color: rgb(85, 193, 212);
  color: white;
  border-color: rgb(85, 193, 212);
}

.eb {
  background-color: rgb(221, 243, 247);
  color: rgb(85, 193, 212);
  border-color: rgb(85, 193, 212);
}

.pl {
  background-color: rgb(85, 193, 212);
  color: white;
  border-color: rgb(85, 193, 212);
}

.cz {
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
}

.r {
  float: right;
  display: flex;
  margin-top: -0.4%;
}
</style>