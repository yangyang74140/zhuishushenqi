<template>
  <div class="text">
    <mt-header fixed :title="title" class="header">
      <div slot="left" class="left">
        <img @click="fanhui" src="../assets/images/zuo.png" alt />
      </div>
      <div slot="right" class="right">
        <!-- <van-cell is-link @click="showPopup"> -->
        <p @click="showPopup">目录</p>
        <!-- </van-cell> -->
      </div>
    </mt-header>
      
    <!-- 内容区域 -->
    <div class="shang">
      <van-button v-if="is_color==0" type="primary" size="mini" @click.native="shang" >上一章</van-button>
      <p class="text_content">
        <!-- <span class="p1">瓜瓜</span> -->
        {{content1}}
      </p>
      <p class="p1">
        <!-- <span class="p1">瓜瓜</span> -->
        {{content2}}
      </p>
      <p class="p1">
        <!-- <span class="p1">瓜瓜</span> -->
        {{content3}}
      </p>
      <p class="p1">
        <!-- <span class="p1">瓜瓜</span> -->
        {{content4}}
      </p>
      <p class="p1">
        <!-- <span class="p1">瓜瓜</span> -->
        {{content5 }}
      </p>
      <p class="p1">
        <!-- <span class="p1">瓜瓜</span> -->
        {{content6}}
      </p>
      <p class="p1">
        <!-- <span class="p1">瓜瓜</span> -->
        {{content7}}
      </p>
    </div>
      <van-button type="primary" size="mini" @click.native="next" class="next" >下一章</van-button>

    <!-- 目录区域 -->
    <div class="mulu">
      <van-popup v-model="show" position="right" :style="{ width: '70%' }">
        <div class>
          <mt-cell-swipe
            is-link
            :title="item.title"
            v-for="(item,index) of chapters_data"
            :key="index"
            :class="{font_color:is_color==index}"
            @click.native="checked(index)"
          ></mt-cell-swipe>
        </div>
      </van-popup>
    </div>

    <!-- <div class="mulu" v-else>
      <div class>
        <mt-cell-swipe
          is-link
          :title="item.title"
          v-for="(item,index) of chapters_data"
          :key="index"
          :class="{font_color:is_color==index}"
          @click.native="checked(index)"
        ></mt-cell-swipe>
      </div>
    </div>-->
  </div>
</template>
<script >
// import {mapState}
import { mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["index"]),
  },
  data() {
    return {
      content1: "",
      content2: "",
      content3: "",
      content4: "",
      content5: "",
      content6: "",
      content7: "",
      chapters_text: [],
      chapters_data: [],
      title: "",
      sourceId: "",
      id: "",
      is_color: 0,
      show: false,
      //   index:''
    };
  },
  methods: {
    //   引入vuex中setindex方法
    ...mapMutations(["setindex", "cache_xb"]),
    //显示隐藏目录或内容
    showPopup() {
      console.log(this.show);
      if (this.show) {
        this.show = false;
      } else {
        this.show = true;
      }
    },

    checked(xb) {
      if (this.$route.query.cache_xb != "") {
        this.cache_xb(this.$route.query.cache_xb, xb);
      }
      this.is_color = xb;
      this.setindex(xb);
      // console.log(this.id)
      // console.log(xb)
      this.show = false;
    },
    // 下一章
    next() {
        this.is_color+=1;
      if (this.$route.query.cache_xb != "") {
        this.cache_xb(this.$route.query.cache_xb, this.is_color);
      }
      this.setindex(this.is_color);
      this.mock();
    },
    // 上一章
    shang() {
        this.is_color-=1;
      if (this.is_color >= 1) {
        if (this.$route.query.cache_xb != "") {
          this.cache_xb(this.$route.query.cache_xb, this.is_color);
        }
        this.setindex(this.is_color);
        this.mock();

      }
    },

    fanhui() {
      history.back(-1);
      //   this.$router.push({
      //       path:'./chapters',
      //       query:{
      //           index:this.index
      //       }
      //   })
    },

    //   获取小说源
    chapters(url) {
      return new Promise((resolve, reject) => {
        this.axios.get(url).then((res) => {
          // console.log("小说书源");
          // console.log(res.data);
          // console.log("小说书源id.......");
          // console.log(res.data[0]._id);
          this.sourceId = res.data[0]._id;
          // console.log("hhhh" + res.data[0]._id);
          resolve(this.sourceId);
        });
      });
    },
    //   根据小说源  获取小说章节
    _text(sourceId) {
      this.$indicator.open();
      this.axios.get(`/atoc/${sourceId}?view=chapters`).then((res) => {
        // console.log("小说章节");
        // console.log(res.data);
        this.chapters_text = res.data.chapters;
        // console.log(this.chapters_text);
        for (let i = 0; i < 300; i++) {
          this.chapters_data.push(this.chapters_text[i]);
          // this.chapters_text.shift(i);
        }

        // console.log("小说章节");
        this.title = this.chapters_data[this.index].title;

        // console.log(this.chapters_data[this.index].title);
        // console.log("小说书源id.......");
        //   }
        this.$indicator.close();
      });
    },
    // 向mock发送请求拿假文章内容
    mock(){
       this.axios.get("http://127.0.0.1:3000/ceshi").then((res) => {
      this.content1 = res.data.title1;
      this.content2 = res.data.title2;
      this.content3 = res.data.title3;
      this.content4 = res.data.title4;
      this.content5 = res.data.title5;
      this.content6 = res.data.title6;
      this.content7 = res.data.title7;
    });
    }
  },
  mounted() {
    this.is_color = this.index;
    // 接收详情页书籍id
    this.id = this.$route.query.id;
    // console.log(this.id);
    // 接收章节页 小说章节名称
    this.title = this.$route.query.title;
    // console.log("详情页书籍id" + this.id);
    this.chapters(`/atoc?view=summary&book=${this.id}`).then((res) => {
      this._text(res);
    });

    //章节下标
    // this.index = this.$route.query.index;
    // console.log(this.index)
    console.log(this.title);
   this.mock();
  },
  watch: {
    index() {
      console.log(this.chapters_data[this.index].title);
      this.title = this.chapters_data[this.index].title;
    },
  },
};
</script>
<style>
.text {
  padding: 0 7px;
  font-family: initial;
}
.text .p1 {
  margin-top: -13px;
  line-height: 24px;
  text-indent: 30px;
  letter-spacing: 4px;
}
.text .text_content {
  margin-top: 9px;
  text-indent: 30px;
  line-height: 24px;
  letter-spacing: 4px;
}
.text .left {
  width: 30px;
  height: 30px;
  margin-left: 10px;
}
.text .left > img {
  width: 100%;
}
.text .header {
  color: #333;
  font-size: 16px;
}
.text .right {
  margin-right: 10px;
  font-size: 19px;
  color: #1296db;
}

.text .mulu {
  margin-top: 50px;
}

.text .font_color {
  color: red;
}
.text .shang{
  margin-top: 60px;
}
.text .next{
  float: right;
}
</style>