<template>
  <div class="detail">
    <!-- 书籍信息 -->
    <div class="bookbg">
      <!-- 返回箭头 -->
      <div class="fanhui" @click="fanhui">
        <img src="../assets/images/fanhui3.png" alt />
      </div>
      <div class="book">
        <div class="left">
          <img :src="img+book.cover" alt />
        </div>
        <div class="right">
          <p class="title_p">{{book.title}}</p>
          <p class="author_p">{{book.author}}</p>
          <p class="wordCount_p">{{(book.wordCount/10000).toFixed(1)}}万</p>
        </div>
      </div>
    </div>
    <!-- 书籍数据部分 -->
    <div class="book_data">
      <!-- 读者留存 -->
      <div class="retentionRatio">
        <p>{{book.retentionRatio}}%</p>
        <p>读者留存</p>
      </div>
      <!-- 一周人气 -->
      <div class="latelyFollower">
        <p>{{(book.latelyFollower/10000).toFixed(1)}}万</p>
        <p>一周人气</p>
      </div>
      <!-- 累计人气 -->
      <div class="totalFollower">
        <p>{{(book.totalFollower/10000).toFixed(1)}}万</p>
        <p>累计人气</p>
      </div>
      <!-- 有多少人评价 -->
      <div class="starRatingCount">
        <p>{{(book.starRatingCount/10000).toFixed(1)}}万</p>
        <p>评价人数</p>
      </div>
    </div>

    <hr class="hr" />
    <div class="synopsis">
      <!-- 书籍简介 -->
      <p>简介</p>
      <!-- 分类 -->
      <div class="classify">
        <div v-for="(item,id) of book.tags" :key="id">
          <p>{{item}}</p>
        </div>
      </div>
      <!-- 书籍文本 -->
      <div class="book_text" @click="show">
        <p :class="{p_show:p_show}">{{book.longIntro}}</p>
      </div>
      <!-- 目录 -->
      <div class="directory">
        <p>目录</p>
        <div>
          <div @click="chapters">
            <p class="zuixxin">{{book.lastChapter}}</p>
            <div class="tu_you">
              <img src="../assets/images/you.png" alt />
            </div>
          </div>
        </div>
      </div>
      <!-- 图书信息 -->
      <div class="tu_message">
        <div>
          <p>版权:©{{book.copyright}}</p>
        </div>
        <div>
          <p>图书信息：{{book.copyrightDesc}}</p>
        </div>
      </div>

      <!-- 图书版权 -->
    </div>
    <!-- 底部按钮 -->
    <div class="btn">
      <div>
        <div class="left" @click="join">
          <p>加入书架</p>
        </div>
        <div class="right" @click="read">
          <p>开始阅读</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
export default {
  computed: {
    ...mapState(["index", "gerenBook"]),
  },
  data() {
    return {
      img: "http://statics.zhuishushenqi.com",
      book: {},
      p_show: true,
      book_id: "",
      title: "",
      // 存个人书架的 书籍id，和章节下标
      bookcase: { bookcase_id: "", classify_index: 0 },
      huancun_xb: "",
      cunzai: true,
    };
  },
  methods: {
    ...mapMutations(["setindex", "setgerenBook"]),
    join() {
      if (this.cunzai) {
        // 用来保存用户状态 1证明用户使用过
        let mystate = 1;
        //保存到浏览器缓存
        localStorage.setItem("mystate", JSON.stringify(mystate));
        // 把书籍的id和章节下标  添加到对象中
        this.bookcase.bookcase_id = this.book_id;
        this.bookcase.classify_index = this.index;
        // 把整个对象存到vuex中
        this.setgerenBook(this.bookcase);
        Toast.success("成功文案");
        this.cunzai=false;
      } else {
        Toast.fail("失败文案");
      }
    },
    //跳转到内容页面
    read() {
      this.$router.push({
        path: "/text",
        query: {
          id: this.book_id,
          cache_xb: this.huancun_xb,
        },
      });
    },
    //跳转到章节页面
    chapters() {
      this.$router.push({
        path: "/chapters",
        query: {
          id: this.book_id,
          title: this.title,
          cache_xb: this.huancun_xb,
        },
      });
    },
    //返回前一个页面
    fanhui() {
      this.$router.history.go(-1);
    },
    show() {
      if (this.p_show) {
        this.p_show = false;
      } else {
        this.p_show = true;
      }
    },
  },
  mounted() {
    let id = this.$route.query.id;
    this.book_id = id;
    if (this.gerenBook.length > 0) {
      // console.log("12131");
      this.gerenBook.forEach((element, index) => {
        // console.log("瓜：" + element.bookcase_id);
        // console.log(this.book_id);
        if (element.bookcase_id == this.book_id) {
          this.huancun_xb = index;
          this.cunzai = false;
        }
      });
    }
    // this.setindex(0)

    this.axios.get(`/book/${id}`).then((res) => {
      // console.log("小说信息.......");
      // console.log(res.data);
      this.book = res.data;
      this.title = this.book.title;
      // console.log(this.text)
    });
  },
};
</script>
<style >
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.detail .bookbg {
  background-image: url("../assets/images/bookbg.png");
  width: 100%;
  height: 200px;
  position: relative;
}
.detail .fanhui {
  width: 35px;
  height: 35px;
  position: absolute;
  top: 15px;
  left: 15px;
}
.detail .fanhui > img {
  width: 100%;
}
.detail > .bookbg .left > img {
  width: 100%;
}
.detail .book {
  position: absolute;
  display: flex;
  top: 62px;
  left: 30px;
}
.detail .book > .left {
  flex: 0 0 27%;
}
.detail .book > .right {
  flex: 0 0 73%;
  box-sizing: border-box;
  padding-left: 30px;
}
.detail .book > .right > p {
  margin: 0 0;
}
.detail .book > .right > .title_p {
  color: #fff;
  font-size: 23px;
}
.detail .book > .right > .author_p {
  color: #f0b694;
  font-size: 19px;
  margin-top: 7px;
}
.detail .book > .right > .wordCount_p {
  color: rgb(255, 0, 212);
  font-size: 19px;
  margin-top: 7px;
}
/* 书籍评价 */
.detail .book_data {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;
}
.detail .book_data > div > p:last-child {
  margin-top: -12px;
  font-size: 14px;
  color: #ccc;
}
.detail .hr {
  margin: 0 auto;
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.75),
    rgba(0, 0, 0, 0)
  );
}

/* 书籍简介 */
.detail .synopsis {
  margin-top: 23px;
  padding: 0 25px;
}
.detail .synopsis > .classify {
  margin-top: -7px;
  display: flex;
  flex-wrap: wrap;
}
.detail .synopsis > .classify > div {
  height: 0;
  padding: 10px;
  margin-top: 5px;
  margin-right: 15px;
  background-color: rgb(254, 236, 234);
  color: rgb(243, 131, 128);
  border-radius: 13px;
}
.detail .synopsis > .classify > div > p {
  font-size: 13px;
  margin-top: -9px;
}
.detail .book_text {
  margin-top: 7px;
  font-size: 15px;
  color: rgb(147, 123, 158);
}
.detail .p_show {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin: 0 0;
}
.detail .directory {
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgb(17, 139, 248);
}
.detail .directory > p {
  flex: 0 0 30%;
}
.detail .directory > div {
  flex: 0 0 70%;
}

/* 最新章节 */
.detail .zuixxin {
  width: 70%;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.detail .directory > div > div {
  display: flex;
  align-items: center;
}
.detail .tu_you {
  width: 15px;
  height: 15px;
}
.detail .tu_you img {
  width: 100%;
}

/* 底部按钮 */
.detail .btn {
  width: 100%;
  height: 67px !important;
  position: fixed;
  bottom: -7px;
  left: 0;
  background-image: url("../assets/images/tab_botton.png");
  background-size: 100% 100%;
}
.detail .btn > img {
  width: 100%;
}

.detail .btn > div {
  width: 100%;
  display: flex;
  color: #fff;
  justify-content: space-around;
  font-size: 20px;
  text-align: center;
}
.detail .btn > div > div {
  flex: 1;
}
.detail .tu_message {
  margin-bottom: 90px;
}
.tu_message > div > p {
  font-size: 12px;
  color: #ccc;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
