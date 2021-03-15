<template>
  <div
    class="classify1"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="20"
  >
    <!-- 头部 -->
    <top :aa="major" />
    <!-- 分类1 -->
    <div class="ify1">
      <div class="bg" v-for="(item,index) of mins" :key="index" @click="dianji">
        <p class="p2" :class="{p3:index==tag_}" :data-index="index">{{item}}</p>
      </div>
    </div>
    <!-- 分类2 -->
    <div class="ify2" @click="dianji1">
      <div class="bg">
        <p class="p2" :class="{p3:sty=='0'}" :data-index1="0">热门</p>
      </div>
      <div class="bg">
        <p class="p2" :class="{p3:sty=='1'}" :data-index1="1">新书</p>
      </div>
      <div class="bg">
        <p class="p2" :class="{p3:sty=='2'}" :data-index1="2">完结</p>
      </div>
    </div>
    <!-- 小说书籍 -->
    <div class="books">
      <div v-for="(item,index) of book" :key="index" :date-id="item._id" @click="detail(item._id)">
        <div class="left">
          <img :src="img+item.cover" alt />
        </div>
        <div class="right">
          <div>
            <div class="title">
              <p>{{item.title}}</p>
            </div>
            <div class="shortIntro">
              <p class="shortIntro_p">{{item.shortIntro}}</p>
            </div>
            <div class="author">
              <div class="first">
                <p>作者:{{item.author}}</p>
              </div>
              <div class="last">
                <div>
                  <div class="minorCate">
                    <p>{{item.minorCate}}</p>
                  </div>
                  <div class="latelyFollower">
                    <p>{{(item.latelyFollower/10000).toFixed(1)}}万</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Tabbar />
  </div>
</template>
<script>
import top from "../components/top";
import Tabbar from "../components/tabbar";
import { mapMutations, mapState } from 'vuex';
export default {
  computed:{
    ...mapState(['index'])
  },
  components: {
    top,
    Tabbar,
  },
  data() {
    return {
      mins: [],
      // index: "",
      major: "",
      tag_: 0,
      sty: "0",
      tyep: "hot",
      gender: "",
      book: [],
      img: "http://statics.zhuishushenqi.com",
      lodading: "",
      start: 1,
    };
  },
  methods: {
    //引入vuex 中的setindex方法
    ...mapMutations(['setindex']),
    getdata() {
     //接受大分类 例如 男生，女生
    let cats = this.$route.query.gender;
    this.gender = cats;
    //男生或女生里的  下标
    let index = this.$route.query.index;
    //发送请求获取小分类
    let mins = () => {
      return new Promise((dor) => {
        this.axios.get("/cats/lv2").then((res) => {
          // console.log(res.data)
          this.mins = res.data[cats][index].mins;
          this.major = res.data[cats][index].major;
          this.lodading = false;
          // console.log("ggg1");
          dor();
        });
      });
    };
    //获取小说列表
    let booklist = () => {
      return new Promise((dor) => {
        this.axios
          .get(
            `/book/by-categories?gender=${cats}&type=${this.tyep}&major=${
              this.major
            }&minor=${this.mins[this.tag_]}&start=${(this.start-1)*7}&limit=7`
          )
          .then((res) => {
            // this.book = res.data.books;
            // console.log(this.book);
            res.data.books.forEach((elem)=>{
              this.book.push(elem)
              // console.log(elem);
              // console.log(this.book);
            })
            // console.log(1);
          });
      });
    };

    mins().then(booklist);
    },
    //无线滚动
    loadMore() {
      this.lodading = true;
      this.start++;
      this.getdata()
      console.log(this.start);

      //   this.getdata();
    },
    detail(id) {
      //清楚小章节选中记录
    this.setindex(0)
      this.$router.push({
        path: "/detail",
        query: {
          id: id,
        },
      });
    },
    dianji(e) {
      this.book=[]
        this.$indicator.open();
      if (e.target.nodeName == "P") {
        this.tag_ = e.target.dataset.index;
      }
    },
    dianji1(e) {
      this.book=[]
        this.$indicator.open();
      if (e.target.nodeName == "P") {
        let index = e.target.dataset.index1;
        this.sty = index;
        if (index == 0) {
          this.tyep = "hot";
        } else if (index == 1) {
          this.tyep = "new";
        } else if (index == 2) {
          this.tyep = "over";
        }
      }
      console.log(this.tyep)

    },
  },
  mounted() {
    //接受大分类 例如 男生，女生
    let cats = this.$route.query.gender;
    this.gender = cats;
    //男生或女生里的  下标
    let index = this.$route.query.index;
    //发送请求获取小分类
    let mins = () => {
      return new Promise((dor) => {
        this.axios.get("/cats/lv2").then((res) => {
          // console.log(res.data)
          this.mins = res.data[cats][index].mins;
          this.major = res.data[cats][index].major;
          // console.log("ggg1");
          dor();
        });
      });
    };
    //获取小说列表
    let booklist = () => {
      this.$indicator.open()
      return new Promise((dor) => {
        this.axios
          .get(
            `/book/by-categories?gender=${cats}&type=${this.tyep}&major=${
              this.major
            }&minor=${this.mins[this.tag_]}&start=0&limit=7`
          )
          .then((res) => {
            // this.book = res.data.books;
            console.log(this.book);
            res.data.books.forEach((elem)=>{
              this.book.push(elem)
              // console.log(elem);
              // console.log(this.book);
            })
              this.$indicator.close();
            // console.log(1);
          });
      });
    };

    mins().then(booklist);
  },
  watch: {
    sty() {
      this.axios
        .get(
          `/book/by-categories?gender=${this.gender}&type=${this.tyep}&major=${
            this.major
          }&minor=${this.mins[this.tag_]}&start=0&limit=7`
        )
        .then((res) => {
          res.data.books.forEach((elem)=>{
              this.book.push(elem)
              // console.log(elem);
              // console.log(this.book);
            })
        this.$indicator.close()

        });
    },
    tag_() {
      this.axios
        .get(
          `/book/by-categories?gender=${this.gender}&type=${this.tyep}&major=${
            this.major
          }&minor=${this.mins[this.tag_]}&start=0&limit=7`
        )
        .then((res) => {
          res.data.books.forEach((elem)=>{
              this.book.push(elem)
              // console.log(elem);
              // console.log(this.book);
            })
        this.$indicator.close()

        });
    },
  },
};
</script>
<style >
.classify1 {
  margin-top: 70px;
}
.classify1 .ify1,
.classify1 .ify2 {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
}
.classify1 .ify2 {
  margin-top: 17px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding-bottom: 17px;
}
.classify1 .ify1 > .bg,
.ify2 > .bg {
  margin-right: 12px;
  margin-bottom: -21px;
  color: #66c;
}
.classify1 .bg > .p2 {
  font-size: 13px;
  padding: 7px;
  border-radius: 17px;
}
.classify1 .p3 {
  background-color: rgb(254, 236, 234);
  color: rgb(243, 131, 128);
}
/* 小说书籍 */
.classify1 .books {
  margin-bottom: 50px;
}
.classify1 .books > div {
  display: flex;
  flex-flow: wrap;
  margin: 10px 0;
}
.classify1 .books > div > .left {
  flex: 1;
}
.classify1 .books > div > .left > img {
  width: 100%;
}
.classify1 .books > div > .right {
  flex: 3;
  padding-left: 10px;
}
.classify1 .books > div > .right > div > .title {
  font-size: 16px;
}
.classify1 .books > div > .right > div > .shortIntro {
  font-size: 12px;
}
.classify1 .books > div > .right > div > .shortIntro > .shortIntro_p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin: 0 0;
}
.classify1 .books > div > .right > div > .author {
  font-size: 7px;
}
.classify1 .author {
  display: flex;
  justify-content: space-between;
}
.classify1 .author .first {
  flex: 2;
}
.classify1 .author .last {
  flex: 2;
}
.classify1 .author .last > div {
  display: flex;
  justify-content: space-around;
  padding-bottom: 10px;
  align-items: center;
}
.classify1 .last .minorCate {
  color: rgb(220, 138, 158);
  border-radius: 15px;
}
.classify1 .last .latelyFollower {
  color: rgb(246, 150, 148);
  border-radius: 15px;
}
</style>