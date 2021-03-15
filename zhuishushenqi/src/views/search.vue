<template>
  <div class="search">
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      clearable
      clear-trigger="focus"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <!-- 补充热词 推荐 -->
    <van-cell center :title="item" icon="shop-o"
    v-for="(item,index) of keys" :key="index"
    @click.native="checked(item)">
        
    </van-cell>

    <!-- 搜索热词 -->
    <div class="s_hot">
      <van-badge :content="arr.length" :max="99">
        <div class="child">推荐热词</div>
      </van-badge>
    </div>
    <div class="hot">
      <div v-for="(item,index) of arr" :key="index" @click="show(item)">
        <van-badge :content="item" class="badag_btn" />
      </div>
    </div>
    <div class="s_hot1" v-if="book.length>0">
      <van-badge :content="book.length" :max="99">
        <div class="child">相关书籍</div>
      </van-badge>
    </div>
    <!-- 搜索到的书籍 -->
    <div class="book">
      <div class="books">
        <div
          v-for="(item,index) of book"
          :key="index"
          :date-id="item._id"
          @click="detail(item._id)"
        >
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
    </div>

    <!-- <van-popup v-model="show1" position="bottom" :style="{ width: '100%' }" class="pop">
      <div class>
        
      </div>
    </van-popup> -->


    <!-- 底部 -->
    <tabbar />
  </div>
</template>
<script>
import tabbar from "../components/tabbar";
import { mapMutations, mapState } from 'vuex';
export default {
  computed:{
    ...mapState(['index','searchBook'])
  },
  components: {
    tabbar,
  },
  data() {
    return {
      value: "",
      arr: [
        "萌宝",
        "致富",
        "赘婿",
        "末世",
        "霸道总裁",
        "老公",
        "斗罗",
        "狂婿",
        "绝世盛宠",
        "庶女攻略",
        "第一闪婚",
        "王爷",
        "桃花神戒",
      ],
      book: [],
      img: "http://statics.zhuishushenqi.com",
      timer: null,
      //   接收补充内容的搜索
      keys: [],
      show1: false,
    };
  },
  methods: {
    //引入vuex 中的setindex方法
    ...mapMutations(['setsearchBook','setindex']),
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
    checked(item) {
        this.keys=[];
        this.axios.get(`/book/fuzzy-search?query=${item}`).then((res) => {
        console.log(res.data);
        this.book = res.data.books;
        this.setsearchBook(this.book);
      });
    },

    onSearch() {
      this.keys=[]
      this.axios.get(`/book/fuzzy-search?query=${this.value}`).then((res) => {
        console.log(res.data);
        this.book = res.data.books;
        this.setsearchBook(this.book);
      });
    },
    show(value) {
      this.value = value;
    },
    search() {
      if (this.timer != null) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        //点击search时，
        //如果用户输入了有意义的关键词
        if (this.value.trim() !== "") {
          //获得用户输入的关键词，执行查找操作
          console.log(`11相关的内容...`);
          this.axios
            .get(`/book/auto-complete?query=${this.value}`)
            .then((res) => {
              this.keys = res.data.keywords;
              console.log(this.keys);
              if (this.keys.length > 0) {
                this.show1 = true;
              }
            });
        }
      }, 1500);
    },
  },
  mounted(){
         if(this.searchBook.length>0){
              this.book=this.searchBook;
         }
  },
  watch: {
    value() {
      this.search();
    },
  },
};
</script>
<style scoped>
.search .hot {
  display: flex;
  flex-flow: wrap;
  padding: 0 16px;
}
.search .hot > div {
  margin: 4px 6px;
}

.search > div .van-badge {
  font-size: 16px !important;
  background-color: #ccc;
}
.search .s_hot {
  padding: 0 10px;
  margin-bottom: 5px;
  margin-top: 20px;
  color: #ee0a24;
}
.search .s_hot1 {
  padding: 0 10px;
  margin-bottom: 0px;
  margin-top: 18px;
  color: #010091;
}
.search .s_hot1 > .badge-icon {
  background-color: #010091 !important;
}

.search .books {
  margin-bottom: 50px;
  padding: 0 10px;
}
.search .books > div {
  display: flex;
  flex-flow: wrap;
  margin: 10px 0;
}
.search .books > div > .left {
  flex: 1;
}
.search .books > div > .left > img {
  width: 100%;
}
.search .books > div > .right {
  flex: 3;
  padding-left: 10px;
}
.search .books > div > .right > div > .title {
  font-size: 16px;
}
.search .books > div > .right > div > .shortIntro {
  font-size: 12px;
}
.search .books > div > .right > div > .shortIntro > .shortIntro_p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin: 0 0;
}
.search .books > div > .right > div > .author {
  font-size: 7px;
}
.search .author {
  display: flex;
  justify-content: space-between;
}
.search .author .first {
  flex: 2;
}
.search .author .last {
  flex: 2;
}
.search .author .last > div {
  display: flex;
  justify-content: space-around;
  padding-bottom: 10px;
  align-items: center;
}
.search .last .minorCate {
  color: rgb(220, 138, 158);
  border-radius: 15px;
}
.search .last .latelyFollower {
  color: rgb(246, 150, 148);
  border-radius: 15px;
}

.search .pop {
  margin-top: 100px;
}
</style>
