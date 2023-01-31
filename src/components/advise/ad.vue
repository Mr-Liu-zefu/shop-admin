<template>
  <div class="ad" style="overflow:auto">
    <div class="tites">
      <div class="word">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <i class="el-icon-s-comment"></i>
            All Message( {{ message.discuss + message.reply }} )
            <i
              class="el-icon-caret-bottom el-icon--right"
            ></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="clearfix">
              评论
              <el-badge class="mark" :value="message.discuss" />
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
              回复
              <el-badge class="mark" :value="message.reply" />
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="inputs">
        <el-row>
          <el-input
            size="small"
            style="margin-top:3.4%"
            placeholder="请输入内容"
            suffix-icon="el-icon-search"
            v-model="input3"
          ></el-input>
        </el-row>
      </div>
    </div>
    <div class="bottom">
      <div class="left" style="overflow:auto">
        <div class="tit"></div>
        <el-card
          style="margin-top:0.8%; width:90%; margin-left:5%"
          v-for="item in items "
          v-bind:key="item"
          
        >
          <div @click="mes(item)">{{ item.name }}</div>
        </el-card>
        <div class="lb"></div>
      </div>
      <div class="right">
        <div class="right_top">
          <div class="title">{{ msg.name }}</div>
        </div>
        <div class="right_two">
          <div>{{ msg.info }}</div>
        </div>
        <div class="right_bottom">
          <div class="tit2"></div>
          <div class="input2">
            <el-input v-model="info"></el-input>
            <el-button type="success" style="margin-left:3%">发送</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: {
        discuss: 130,
        reply: 15
      },
      input3: "",
      count: 0,
      items: [
        {
          name: "机器黑人",
          info: ["你好", "我是某某", "明天是xxx", "今天是xxx"]
        },
        { name: "Mr.Wan",
          info: ["你好", "我是某某", "明天是xxx", "今天是xxx"]
        },
        { name: "Mr.Cao",
          info: ["你好", "我是某某", "明天是xxx", "今天是xxx"]
        },
        { name: "Mr.Li" },
        { name: "Mr.Lin" },
        { name: "Mr.Zhang" },
        { name: "Mr.Hu" },
        { name: "Mr.Yang" },
        { name: "Mr.Ouynag" },
        { name: "Mr.Jing" },
        { name: "Mr.Jiang" },
        { name: "Mr.Wu" },
        { name: "Mr.Tian" },
        { name: "Mr.Ma" },
        { name: "Mr.Zheng" },
        { name: "Mr.He" },
        { name: "Mr.Qian" },
        { name: "Mr.Mi" },
        { name: "Mr.Cheng" },
        { name: "Mr.Bai" },
        { name: "Mr.Huang" },
        { name: "Mr.Long" },
        { name: "Mr.Gu" },
        { name: "Mr.Zhao" },
        { name: "Mr.Sun" },
        { name: "Mr.Tom" },
        { name: "Mr.JACK" },
        { name: "Mr.Jushua" }
      ],
      info: "请输入内容",
      msg: {
        name: "",
        info: []
      }
    };
  },
  methods: {
    load() {
      this.count += 2;
    },
    mes(data) {
      this.msg.name = data.name;
      this.msg.info = data.info;
    }
  }
};
</script>

<style scoped>
.ad {
  width: 100%;
  height: 100.4%;
  background-color: rgb(243, 247, 249);
}

.tites {
  width: 100%;
  height: 7%;
  background-color: white;
  font-size: 15px;
  display: flex;
  border-bottom: 1px solid gainsboro;
}

.word {
  width: 45%;
  height: 100%;
  /* background-color: aqua; */
  font-size: 18px;
  padding-left: 3%;
  line-height: 44px;
}

.inputs {
  height: 100%;
  margin-left: 25%;
  /* background-color: aqua; */
}

/* .inputs {
  margin-left: 58%;
  display: flex;
  width: 26%;
}

.tw {
  padding-left: 2.9%;
  padding-top: 0.3%;
} */

.bottom {
  height: 93%;
  width: 100%;
  display: flex;
}

.left {
  width: 50%;
  height: 100%;
  /* padding-bottom: 3%; */
  height: 100%;
}

.lb {
  width: 100%;
  height: 5%;
}
.tit {
  width: 100%;
  height: 2%;
}

.tit2 {
  width: 100%;
  height: 25%;
}
.right {
  width: 50%;
  height: 100%;
  /* background-color: bisque; */
}

.right_top {
  width: 100%;
  height: 10%;
  background-color: white;
  font-size: 18px;
  display: flex;
}

.right_two {
  width: 100%;
  height: 78%;
  background-color: rgb(234, 238, 240);
}

.right_bottom {
  width: 100%;
  height: 12%;
  background-color: white;
}

.input2 {
  width: 90%;
  margin-left: 5%;
  display: flex;
}

.title {
  /* background-color: antiquewhite; */
  margin-left: 47%;
  margin-top: 3%;
}
</style>