
<template>
  <div class="hp" v-infinite-scroll="load" style="overflow:auto">
    <div class="null"></div>
    <div class="nav-data">
      <div class="nav-num">
        <div class="nav-image">
          <img src="../../assets/user.png" width="100%" height="100%" alt />
        </div>
        <div class="nav-word">
          <div class="nword1">用户数量</div>
          <div class="nword2">{{ user_num }}</div>
        </div>
      </div>
      <div class="nav-num">
        <div class="nav-image">
          <img src="../../assets/money.png" width="100%" height="100%" alt />
        </div>
        <div class="nav-word">
          <div class="nword1">总成交量</div>
          <div class="nword2">{{ order_suc_num }}</div>
        </div>
      </div>
      <div class="nav-num">
        <div class="nav-image">
          <img src="../../assets/deal.png" width="100%" height="100%" alt />
        </div>
        <div class="nav-word">
          <div class="nword1">总收入</div>
          <div class="nword2">{{ money_data }}</div>
        </div>
      </div>
      <div class="nav-num2">
        <div class="nav-image" style="margin-left:5%">
          <img src="../../assets/wuliu.png" width="90%" height="100%" alt />
        </div>
        <div class="nav-word" style="margin-left:6%">
          <div class="nword1">未送订单</div>
          <div class="nword2">{{ non_deli }}</div>
        </div>
      </div>
    </div>
    <div class="data-image">
      <div class="data-image-left">
        <div id="main"></div>
      </div>
      <div class="data-image-right">
        <div id="pieReport" style="width: 100%;height: 90%;"></div>
        <div class="data-image-right-two"></div>
      </div>
    </div>
    <div class="data-bottom">
      <div class="data">
        <div
          style="width:100%;height:18%;font-size:18px;margin-left:4%;margin-top:5%;margin-bottom:3%"
        >商品类型比例</div>
        <div style="width:100%;display:flex;height:17%;margin-bottom:5%">
          <div style="font-size:16px;margin-left:4%">资源共享</div>
          <div style="width:70%;height;10%;margin-left:3%">
            <el-progress
              :text-inside="true"
              :stroke-width="25"
              :color="customColors"
              :stroke-linecap="butt"
              :percentage="resdata"
            ></el-progress>
          </div>
        </div>
        <div style="width:100%;display:flex;height:17%;margin-bottom:5%">
          <div style="font-size:16px;margin-left:4%">二手交易</div>
          <div style="width:70%;height;10%;margin-left:3%">
            <el-progress
              :text-inside="true"
              :stroke-width="25"
              :color="customColors"
              :stroke-linecap="butt"
              :percentage="secdata"
            ></el-progress>
          </div>
        </div>
        <div style="width:100%;display:flex;height:17%">
          <div style="font-size:16px;margin-left:4%">外卖跑腿</div>
          <div style="width:70%;height;10%;margin-left:3%">
            <el-progress
              :text-inside="true"
              :stroke-width="25"
              :color="customColors"
              :stroke-linecap="butt"
              :percentage="rentdata"
            ></el-progress>
          </div>
        </div>
      </div>
      <div class="data" style="display:flex">
        <div style="width:40%;height:100%;flex-direction: column;">
          <div
            style="width:100%;height:18%;font-size:18px;margin-left:10%;margin-top:12%;margin-bottom:3%"
          >评论比例</div>
          <div style="width:100%;;height:17%">
            <div style="font-size:18px;margin-left:10%;">好评：87%</div>
            <div style="font-size:18px;margin-left:10%;margin-top:25%">中评：9%</div>
            <div style="font-size:18px;margin-left:10%;margin-top:25%">差评：4%</div>
          </div>
        </div>
        <div style="width:60%;height:100%;flex-direction: column;">
          <div style="width:80%;height:65%;margin-top:10%;margin-left:10%;">
            <el-progress
              color="#55c4d3"
              style="margin-left:5%"
              :stroke-width="15"
              type="circle"
              width="160"
              :percentage="87"
            ></el-progress>
          </div>
          <div
            style="width:80%;height:13%;margin-left:10%;margin-top:5%;text-align:center;font-size:18px"
          >好评率</div>
        </div>
      </div>
      <div class="data" style="display:flex">
        <div style="width:40%;height:100%;flex-direction: column;">
          <div
            style="width:100%;height:18%;font-size:18px;margin-left:20%;margin-top:20%;margin-bottom:3%"
          >配送比例</div>
          <div style="width:100%;;height:17%">
            <div style="font-size:18px;margin-left:20%;">已送达：{{option2.series[0].data[0].value}}%</div>
            <div
              style="font-size:18px;margin-left:20%;margin-top:40%"
            >配送中{{option2.series[0].data[0].v2}}%</div>
          </div>
        </div>
        <div id="main2" style="width: 110%; height: 93%;margin-top:5%;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import {
  view,
  userlistfetch,
  share_fetchData,
  vol,
  over,
  get_goods
} from "../../api/view";

export default {
  data() {
    return {
      rentdata: 0,
      secdata: 0,
      resdata: 0,
      non_deli: 0,
      money_data: 0,
      user_num: 0,
      order_suc_num: 0,
      give_suc: 0,
      turn_over: 0,
      customColors: [
        { color: "#55c4d3", percentage: 40 },
        { color: "#55c4d3", percentage: 70 },
        { color: "#55c4d3", percentage: 100 }
      ],
      charts: "",
      charts2: "",
      xdata: ["周一", "周二", "周三", "周四", "周五", "周六", "周末"],
      adata: [],
      bdata: [],
      cdata: [],
      data_sum: [],
      opinion: ["访问量", "收藏量", "成交量"],
      option2: {
        series: [
          {
            type: "gauge",
            axisLine: {
              lineStyle: {
                width: 15,
                color: [
                  [0.3, "#67e0e3"],
                  [0.7, "#37a2da"],
                  [1, "#fd666d"]
                ]
              }
            },
            pointer: {
              itemStyle: {
                color: "auto"
              }
            },
            axisTick: {
              distance: -30,
              length: 8,
              lineStyle: {
                color: "#fff",
                width: 4
              }
            },
            splitLine: {
              length: 15,
              lineStyle: {
                color: "#fff",
                width: 2
              }
            },
            axisLabel: {
              color: "auto",
              distance: 0,
              fontSize: 14
            },
            detail: {
              valueAnimation: true,
              formatter: "{value}%",
              color: "auto",
              fontSize: 16
            },
            data: [
              {
                value: 0,
                name: "完成率",
                v2: 0
              }
            ]
          }
        ]
      }
    };
  },
  //调用
  mounted() {
    this.get_vol();
    this.get_over();
    this.get_view();
    this.getusernum();
    this.get_order_suc();
    this.get_money();
    this.get_number();
    this.drawLine("main"), this.sum(), this.drawPie("pieReport");
    this.exampEcharts();
  },
  methods: {
    drawLine(id) {
      this.$nextTick(_ => {
        this.charts = echarts.init(document.getElementById(id));
        this.charts.setOption({
          title: {
            text: "上周访问数据"
          },
          color: ["#55c4d3", "#67C23A", "#E3AACB"],
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: ["访问量", "收藏量", "成交量"] //图例
          },
          grid: {
            left: "3%",
            right: "6%",
            bottom: "6%",
            containLabel: true
          },

          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            //横坐标
            name: "时间",
            type: "category",
            boundaryGap: false,
            data: this.xdata
          },
          yAxis: {
            name: "数量",
            type: "value"
          },
          //三条折线就有三种series，可以更改type以改变是否为折线
          series: [
            {
              name: "访问量",
              type: "line",
              data: this.adata
            },
            {
              name: "收藏量",
              type: "line",
              data: this.bdata
            },
            {
              name: "成交量",
              type: "line",
              data: this.cdata
            }
          ]
        });
        window.addEventListener("resize", function() {
          main.resize();
        });
      });
    },
    sum() {
      var j = 0;
      var k = 0;
      var l = 0;
      var i;
      var x = this.adata;
      var y = this.bdata;
      var z = this.cdata;
      for (i = 0; i <= 6; i++) {
        j = j + x[i];
        k = k + y[i];
        l = l + z[i];
      }
      this.data_sum[0] = j;
      this.data_sum[1] = k;
      this.data_sum[2] = l;
      console.log(this.data_sum);
    },
    drawPie(id) {
      this.$nextTick(_ => {
        this.charts2 = echarts.init(document.getElementById(id));
        this.charts2.setOption({
          title: {
            text: "上周数据分析"
          },
          tooltip: {
            trigger: "item",
            formatter: "{a}<br/>{b}:{c} ({d}%)"
          },
          legend: {
            bottom: 10,
            left: "center",
            data: this.opinion
          },
          series: [
            {
              name: "状态",
              type: "pie",
              radius: "50%",
              center: ["49.5%", "50.5%"],
              avoidLabelOverlap: false,
              itemStyle: {
                emphasis: {
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                },
                color: function(params) {
                  //自定义颜色
                  var colorList = ["#55c4d3", "#99dbe5", "#ddf3f6"];
                  return colorList[params.dataIndex];
                }
              },
              data: [
                {
                  value: this.data_sum[0],
                  name: "访问量",
                  itemStyle: "#1ab394"
                },
                {
                  value: this.data_sum[1],
                  name: "收藏量",
                  itemStyle: "#79d2c0"
                },
                {
                  value: this.data_sum[2],
                  name: "成交量",
                  itemStyle: "#c7f7ee"
                }
              ]
            }
          ]
        });
        window.addEventListener("resize", function() {
          pieReport.resize();
        });
      });
    },
    exampEcharts() {
      var myChart = echarts.init(document.getElementById("main2"));
      const par = {
        page: 1,
        psize: 100
      };
      share_fetchData(par).then(res => {
        let num = 0;
        let a = [];
        let b = [];
        res.data.data.data.forEach(item => {
          if (item.order_status == "已送达") {
            a.push(item);
          } else {
            b.push(item);
          }
        });
        let len = 0;
        if (b.length < a.length) {
          len = b.length / a.length;
        } else {
          len = a.length / b.length;
        }
        this.non_deli = b.length;
        console.log(this.option2.series[0].data[0].value);
        this.option2.series[0].data[0].v2 = 100 - Math.trunc(len * 100);
        this.option2.series[0].data[0].value = Math.trunc(len * 100);
        console.log(len);
        console.log(this.option2.series[0].data[0].value);
        myChart.setOption(this.option2);
      });
    },
    get_view() {
      view().then(res => {
        const datanum = res.data.data;
        for (let i in datanum) {
          this.adata.push(datanum[i]);
        }
        this.drawLine("main"), this.sum(), this.drawPie("pieReport");
        this.exampEcharts();
      });
    },
    getusernum() {
      const params = {
        page: 1,
        psize: 100
      };
      userlistfetch(params).then(response => {
        this.user_num = response.data.data.data.length;
      });
    },
    get_order_suc() {
      const par = {
        page: 1,
        psize: 100
      };
      share_fetchData(par).then(res => {
        this.order_suc_num = res.data.data.data.length;
      });
    },
    get_vol() {
      vol().then(res => {
        const datanum = res.data.data;
        for (let i in datanum) {
          this.bdata.push(datanum[i]);
        }
        this.drawLine("main"), this.sum(), this.drawPie("pieReport");
        this.exampEcharts();
        console.log(this.bdata);
      });
    },
    get_over() {
      over().then(res => {
        const datanum = res.data.data;
        for (let i in datanum) {
          this.cdata.push(datanum[i]);
        }
        this.drawLine("main"), this.sum(), this.drawPie("pieReport");
        this.exampEcharts();
        console.log(this.cdata);
      });
    },
    get_money() {
      const par = {
        page: 1,
        psize: 100,
        order_status: "已送达"
      };
      share_fetchData(par).then(res => {
        console.log(res.data.data.data);
        res.data.data.data.forEach(item => {
          this.money_data = this.money_data + item.money;
        });
      });
    },
    get_number() {
      const params = {
        page: 1,
        psize: 100
      };
      console.log(params);
      get_goods(params).then(res => {
        console.log(res.data.data.data[0].product_picture);
        let ret = [];
        let sec = [];
        let resd = [];
        // this.tableData = res.data.data.data;
        res.data.data.data.forEach(item => {
          if (item.product_types == "资源共享") {
            resd.push(item);
          } else if (item.product_types == "二手交易") {
            sec.push(item);
          } else {
            ret.push(item);
          }
        });
        let sum_len = ret.length+sec.length+resd.length;
        let ret_len = (ret.length/sum_len)*100
        this.rentdata = Math.trunc((ret.length/sum_len)*100)
        this.secdata =  Math.trunc((sec.length/sum_len)*100)
        this.resdata =  Math.trunc((resd.length/sum_len)*100)
        this.$message.success("刷新成功");
      });
    }
  }
};
</script>

<style scoped>
.hp {
  width: 100%;
  height: 100%;
  background-color: white;
}
.null {
  width: 100%;
  height: 3%;
}
.nav-data {
  width: 96%;
  height: 13%;
  margin-left: 2%;
  margin-bottom: 2%;
  /* background-color: antiquewhite; */
  display: flex;
}
.nav-num {
  width: 22.5%;
  height: 100%;
  border-radius: 8px;
  box-shadow: 0px 2px 30px 0px rgb(0 0 0 / 10%);
  margin-right: 3.3%;
  display: flex;
}
.nav-image {
  width: 35%;
  height: 100%;
  /* background-color: antiquewhite; */
  border-radius: 8px;
  margin-left: 2%;
}
.nav-word {
  width: 50%;
  height: 100%;
  flex-direction: column;
  /* background-color: aqua; */
  border-radius: 8px;
  margin-left: 10%;
}
.nword1 {
  width: 70%;
  height: 35%;
  /* background-color: aquamarine; */
  margin-left: 20%;
  font-size: 16px;
  margin-top: 7%;
  text-align: right;
  /* color:#8a8a8a; */
}
.nword2 {
  width: 80%;
  height: 40%;
  /* background-color: beige; */
  font-size: 22px;
  text-align: right;
  margin-left: 10%;
  /* color:#8a8a8a; */
}
.nav-num2 {
  width: 22.5%;
  height: 100%;
  border-radius: 8px;
  box-shadow: 0px 2px 30px 0px rgb(0 0 0 / 10%);
  display: flex;
}
.data-image {
  width: 96%;
  height: 40%;
  margin-left: 2%;
  margin-bottom: 2%;
  display: flex;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 2px 30px 0px rgb(0 0 0 / 10%);
}

.data {
  width: 34%;
  height: 92%;
  margin: 1%;
  margin-left: 1.5%;
  background-color: white;
  /* flex-direction: row; */
  border-radius: 8px;
  box-shadow: 0px 2px 30px 0px rgb(0 0 0 / 10%);
}

.data-bottom {
  width: 98.5%;
  height: 40%;
  margin-left: 0.5%;
  display: flex;
  margin-bottom: 1%;
}

.data-image-left {
  width: 75%;
  height: 100%;
  background-color: white;
  /* border-right: 1px solid rgb(230, 230, 230); */
  border-radius: 8px;
}

.data-image-right {
  width: 25%;
  height: 100%;
  background-color: white;
  border-radius: 8px;
}

#main {
  width: 100%;
  height: 100%;
  /* background-color: antiquewhite */
}

.data-image-right-two {
  width: 100%;
  height: 2%;
}

.el-progress {
  position: relative;
  line-height: 1;
}
</style>