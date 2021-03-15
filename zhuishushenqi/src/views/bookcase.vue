<template>
  <div class="bookcase">
    <mt-header title="个人书架" fixed></mt-header>

    <!-- 轮播图上方图片 -->
    <div class="swipe">
      <div v-for="(item,index) of bookcase" :key="index">
        <img :class="{imgs:index==index1}" :src="img+item.cover" alt />
      </div>
    </div>

    <!-- 轮播图 -->
    <van-swipe :loop="false" :autoplay="3000" :show-indicators="false" @change="onChange">
      <van-swipe-item v-for="(item,index) of bookcase" :key="index">
        <div class="swipe_content">
          <div class="ceshi" @click="detail(item._id)">
            <div class="ceshi1">
              <img :src="img+item.cover" alt />
            </div>
            <div class="ceshi2">
              <div class="swipe_content_p">
                <p>{{item.title}}</p>
                <p>{{item.cat}}</p>
                <p>{{item.author}}</p>
              </div>
            </div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>

    <!-- 个人书籍 -->
    <div class="mybook">
      <p class="soucang">收藏书籍：</p>
      <div class="books" v-for="(item,index) of books" :key="index">
        <van-swipe-cell @click.native="read(item.bookcase._id,item.classify_index,index)">
          <van-row>
            <van-col span="6" class="span8">
              <img :src="img+item.bookcase.cover" alt />
            </van-col>
            <van-col span="16">
              <p>{{item.bookcase.title}}</p>
              <p class="p_text">{{item.bookcase.longIntro}}</p>
            </van-col>
          </van-row>
          <template #right >
            <van-button @click.native="del(index)" square type="danger" text="删除" />
          </template>
        </van-swipe-cell>
      </div>

      <!-- 书架中没有书籍显示 -->
      <div v-if="books.length<1" class="mybook_content">
        <img src="../assets/images/book2.png" alt />
        <p>书架竟然没有猪？</p>
      </div>
    </div>

    <!-- 底部 -->
    <tabbar />
  </div>
</template>
<script>
import tabbar from "../components/tabbar";
import { mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["gerenBook"]),
  },
  components: {
    tabbar,
  },
  data() {
    return {
      index1: 0,
      bookcase: [],
      img: "http://statics.zhuishushenqi.com",
      // 接收 返回的个人书籍信息
      books: [],
    };
  },
  methods: {
    ...mapMutations(["setsearchBookcase","delgerenBook"]),
    del(index){
      // 删除浏览器缓存的书籍
      this.delgerenBook(index);
      // 删除本页面的书籍
      this.books.splice(index,1)
      console.log("删除成功")
    },
    detail(id) {
      this.$router.push({
        path: "/detail",
        query: {
          id: id,
        },
      });
    },
    onChange(index) {
      // console.log(index);
      this.index1 = index;
    },
    // 1.书籍id  2.阅读到第几章  3.浏览器缓存中的第几本书
    read(book_id,index,cache_xb){
      this.$router.push({
        path:'/text',
        query:{
          id:book_id,
          index:index,
          cache_xb:cache_xb
        }
      })
    },
  },
  mounted() {
    // 如果gerenBook的长度大于0 证明有书籍
    // console.log(this.gerenBook)
    if (this.gerenBook.length > 0) {

      for (const element of this.gerenBook) {
        // console.log("遍历"+element.bookcase_id)
        let bookobj={ bookcase: {}, classify_index: 0 };

        this.axios.get(`/book/${element.bookcase_id}`).then((res) => {
          // console.log("小说信息.......");
          // console.log(res.data);
        bookobj.classify_index = element.classify_index;
        bookobj.bookcase = res.data;
        // console.log(this.bookobj.bookcase);
        // 把返回 回来的书籍push到 this.bookobj中
        this.books.push(bookobj);
          // console.log(this.books);
        });
        
      }
      // this.gerenBook.for((element) => {
      //   // 把下标存到 bookobj中
      //   console.log("遍历"+element)
      //   this.bookobj.classify_index = element.classify_index;
      //   this.axios.get(`/book/${element.bookcase_id}`).then((res) => {
      //     // console.log("小说信息.......");
      //     // console.log(res.data);
      //   this.bookobj.bookcase_id = res.data._id;
      //   console.log(this.bookobj.bookcase_id);
      //   });
      //   this.books.push(this.bookobj);
      //     console.log(this.bookobj);
      // });
    }

    this.axios.get(`/book/fuzzy-search?query=斗罗`).then((res) => {
      // console.log(res.data);
      // this.bookcase = res.data.books;
      for (let i = 0; i < 6; i++) {
        this.bookcase.push(res.data.books[i]);
      }
      this.setsearchBookcase(this.bookcase);
    });
  },
};
</script>
<style scoped>
.bookcase .mint-header {
  background-color: hsl(180, 43%, 78%) !important;
  font-size: 18px;
}

.bookcase .swipe {
  margin-top: 60px;
  display: flex;
  justify-content: center;
}
.bookcase .swipe > div {
  flex: 0 0 10%;
  margin: 7px;
}
.bookcase .swipe > div > img {
  width: 85%;
}
.bookcase .imgs {
  width: 100% !important;
}
.bookcase .swipe_content {
  display: flex;
  justify-content: space-around;
  width: 60%;
  background-color: #ffeeee;
  margin: auto;
  padding: 5px;
  border-radius: 10px;
  overflow: hidden;
}

.bookcase .ceshi {
  display: flex;
  /* justify-content: space-around; */
  width: 100%;
  align-items: center;
  /* flex-wrap: wrap; */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.bookcase .swipe_content > .ceshi > .ceshi1 {
  flex: 0 0 30%;
}
.bookcase .swipe_content > .ceshi > .ceshi1 > img {
  max-width: 100%;
}

.bookcase .swipe_content_p {
  width: 100%;
  display: flex;
  flex-flow: column;
  font-size: 13px;
}
.bookcase .swipe_content_p > p {
  flex: 1;
  padding-left: 10px;
  margin: 7px 0;
}
.bookcase .mybook_content {
  text-align: center;
  margin-top: 50px;
  color: rgb(246, 150, 148);
}
.bookcase .mybook_content > img {
  width: 30%;
}

/* 个人书籍 */
.bookcase .mybook {
  margin-top: 25px;
  margin-bottom: 50px;
}
.bookcase .soucang {
  font-weight: 600;
  color: rgb(246, 150, 148);
}
.bookcase .books {
  margin-top: 6px;
  background-color: rgba(158, 248, 218, 0.1);
  border-right: 1px solid rgba(241, 26, 22, 0.5);
}

.span8 {
  padding: 5px;
}
.span8 > img {
  width: 70%;
  margin-left: 16px;
}
.van-button--danger {
  height: 100%;
}

.p_text {
  margin-top: -7px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 13px;
  color: #666;
}
</style>