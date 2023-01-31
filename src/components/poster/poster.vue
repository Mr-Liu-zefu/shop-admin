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
        </div>
      </div>
      <div class="box">
        <div class="box_input">
          <el-select v-model="seachData.status" placeholder="请选择广告状态" size="small">
            <el-option label="上架" value="0"></el-option>
            <el-option label="下架" value="1"></el-option>
          </el-select>
          <el-input
            placeholder="广告编号"
            prefix-icon="el-icon-search"
            v-model="seachData.ad_id"
            size="small"
          ></el-input>
          <el-input
            placeholder="广告名称"
            prefix-icon="el-icon-search"
            v-model="seachData.ad_name"
            size="small"
          ></el-input>
          <el-input
            placeholder="下架时间"
            prefix-icon="el-icon-search"
            v-model="seachData.end_time"
            size="small"
          ></el-input>
        </div>
      </div>
    </el-card>
    <el-card class="goods_one" shadow="hover" style="overflow:auto;margin-bottom:1%">
      <el-button
        type="success"
        style="float: left; margin-bottom: 1%;"
        @click="addposter"
        size="small"
      >添加广告</el-button>
      <el-button style="float: right" @click="getdata" size="small" class="cz">
        <i class="el-icon-refresh-left"></i>重置
      </el-button>
      <el-button
        class="pl"
        size="small"
        @click="delAllgoods"
        :disabled="this.selectionList.length === 0"
      >批量删除</el-button>
      <el-table
        :data="tableData"
        v-loading="loading"
        element-loading-text="努力加载中"
        element-loading-spinner="el-icon-loading"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="80" align="center"></el-table-column>
        <el-table-column fixed prop="ad_id" label="广告ID" align="center" width="80"></el-table-column>
        <el-table-column prop="ad_name" label="广告名称" align="center"></el-table-column>
        <el-table-column prop="image_src" label="图品预览" align="center">
          <template slot-scope="scope">
            <el-avatar :size="80" src="https://empty">
              <img :src="baseURL + scope.row.image_src" />
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="广告位置" align="center"></el-table-column>
        <el-table-column prop="create_time" label="上架时间" align="center"></el-table-column>
        <el-table-column prop="end_time" label="下架时间" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center" width="80">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="rgb(85, 193, 212)"
              inactive-color="#909399"
              @change="change_state(scope.row.status)"
              active-value="0"
              inactive-value="1"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope" align="center">
            <el-button
              @click="ediposter(scope.row)"
              type="success"
              icon="el-icon-edit"
              size="medium"
              circle
            ></el-button>
            <el-button
              @click="delData(scope.row.ad_id)"
              icon="el-icon-delete"
              size="medium"
              type="danger"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="编辑广告" :visible.sync="dialogformVisible" class="add">
      <el-form :model="ediData">
        <el-form-item label="广告名称">
          <el-input v-model="ediData.ad_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            class="upload-demo"
            :on-success="updata"
            action="http://yxmzq.top/admin/v1/ad/updatepicture"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="广告位置)">
          <el-input v-model="ediData.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上架时间">
          <el-input v-model="ediData.create_time" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="下架时间">
          <el-input v-model="ediData.end_time" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接地址">
          <el-input v-model="ediData.src" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogformVisible = false">取 消</el-button>
        <el-button type="primary" @click="ediposter_two">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加广告" :visible.sync="diag" class="add">
      <el-form :model="addData">
        <el-form-item label="广告名称">
          <el-input v-model="addData.ad_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            class="upload-demo"
            :on-success="add_updata"
            action="http://yxmzq.top/admin/v1/ad/updatepicture"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="广告位置)">
          <el-input v-model="addData.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上架时间">
          <el-input v-model="addData.create_time" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="下架时间">
          <el-input v-model="addData.end_time" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接地址">
          <el-input v-model="addData.src" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="diag = false">取 消</el-button>
        <el-button type="primary" @click="addposter_two">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import {
  posterfetch,
  delposindex,
  seachpos,
  ediPosterData,
  posterAdd
} from "../../api/view.js";

export default {
  data() {
    return {
      baseURL:'http://yxmzq.top',
      loading: true,
      seachData: {
        ad_id: "",
        ad_name: "",
        status: "",
        end_time: ""
      },
      par: {
        page: 1,
        psize: 10
      },
      tableData: [],
      //查看数据
      dialogVisible: 0,
      //修改数据
      dialogformVisible: 0,
      //添加数据
      diag: 0,
      checkData: {},
      addData: {
        ad_name: "",
        address: "",
        create_time: "",
        end_time: "",
        image_src: "",
        src: "",
        status: "0"
      },
      ediData: {},
      selectionList: [],
      fileList: [
        {
          name: "food.jpeg",
          url: ""
        }
      ]
    };
  },
  mounted() {
    this.getdata();
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
    //添加数据的函数
    addposter() {
      this.diag = !this.diag;
    },
    //提交添加数据
    addposter_two() {
      const par = this.addData;
      console.log(this.addData);
      posterAdd(par)
        .then(() => {
          this.$message({
            type: "success",
            message: "添加成功"
          });
          this.diag = !this.diag;
          this.getdata();
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "请求失败，请检查网络设置"
          });
          this.diag = !this.diag;
        });
    },
    //批量删除数据
    delAllgoods() {
      let list = this.selectionList;
      let ids = [];
      list.forEach(item => {
        ids.push(item.ad_id);
      });
      const par = {
        ad_id: ids
      };
      delposindex(par)
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功"
          });
          this.getdata();
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "删除失败， 请检查网络设置"
          });
        });
    },
    //删除数据的函数
    delData(id) {
      const par1 = {
        ad_id: [id]
      };
      this.$confirm("此操作将永久删除此广告, 是否继续?", "警告", {
        confirmButtonText: "继续",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delposindex(par1)
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.getdata();
            })
            .catch(() => {
              this.$message({
                type: "error",
                message: "删除失败， 请检查网络设置"
              });
            });
        })
        .catch(() => {
          this.$message({
            message: "已取消删除"
          });
        });
    },
    //编辑上传照片成功后的钩子
    updata(response) {
      this.ediData.image_src = response.data;
    },
    //添加成功后的钩子
    add_updata(response) {
      console.log(response.data);
      this.addData.image_src = response.data;
    },
    //编辑数据的函数
    ediposter(data) {
      this.dialogformVisible = !this.dialogformVisible;
      this.ediData = data;
    },
    //编辑数据后提交
    ediposter_two() {
      const par = this.ediData;
      ediPosterData(par)
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
    //查看数据的函数
    check(data) {
      console.log(data);
      this.dialogVisible = !this.dialogVisible;
      this.checkData = data;
    },
    //选中某行数据的函数
    handleSelectionChange(val) {
      this.selectionList = val;
      const ids = [];
      this.selectionList.forEach(item => {
        ids.push(item.ad_id);
      });
      console.log(ids);
    },
    //取消函数
    concel() {
      this.dialogVisible = !this.dialogVisible;
    },
    //搜索时触发的函数
    seach() {
      if (
        this.seachData.ad_id == "" &&
        this.seachData.ad_name == "" &&
        this.seachData.status == "" &&
        this.seachData.end_time == ""
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
        seachpos(seachobj)
          .then(res => {
            this.$message.success("搜索结果如下");
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
    },
    //获取数据的函数
    getdata() {
      const par = {
        page: 1,
        psize: 10
      };
      posterfetch(par)
        .then(res => {
          this.$message.success("加载成功");
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

/* .box {
  display: flex;
  margin-bottom: 2%;
} */

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
  margin-left: 6%;
  width: 20%;
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

.cz:active {
  background: #fff;
  border: 1px solid rgb(85, 193, 212);
  color: rgb(85, 193, 212);
}

.r {
  float: right;
  display: flex;
  margin-top: -0.4%;
}
</style>