<template>
  <div class="chapters" 
    
  >
    <!-- 头部 -->
    <mt-header fixed :title="title" >
      <div slot="left" class="left">
        <img @click="fanhui" src="../assets/images/zuo.png" alt />
      </div>
      
    </mt-header>

    <!-- 设置margin-bottom  显示章节 -->
    <div class="bottom"></div>

    <!-- 章节内容 -->
    <mt-cell-swipe
      is-link
      :title="item.title"
      v-for="(item,index) of chapters_data"
      :key="index"
      :class="{font_color:is_color==index}"
      @click.native="checked(index,item.title)"
    >
    </mt-cell-swipe>
  </div>
</template>
<script>
// import top from "../components/top";
import { mapMutations, mapState } from 'vuex'
export default {
  //   components: {
  //     top,
  //   },
  props:["index_t"],
  computed:{
       ...mapState(["index"])
    },
  data() {
    return {
      id: "",
      sourceId: "",
      title: "",
      chapters_text: [],
      chapters_data:[],
      loading:'',
      is_color:0
    };
  },
  methods: {
    ...mapMutations(["setindex"]),
    checked(index,title){
      console.log(title)
      this.is_color=index;
      this.setindex(index);
      console.log(this.id)
      this.$router.push({
        path:'/text',
        query:{
          title:this.chapters_data[this.index].title,
          index:this.is_color,
          id:this.id,
          cache_xb:this.$route.query.cache_xb
        }
      })
    },
    //   loadMore(){
    //     //   for(let i=0;i<50;i++){
    //     //     this.chapters_data.push(this.chapters_text[i])
    //     //     this.chapters_text.shift(i)
    //     // }
        
    //     //   this.$indicator.close();
    //     //   this.lodading=false;
    //     console.log(this.chapters_text)

    //   },
      
    //   返回到上一个页面
    fanhui() {
      this.$router.go(-1);
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
        for(let i=0;i<300;i++){
            this.chapters_data.push(this.chapters_text[i])
            // this.chapters_text.shift(i);
        }
        // console.log(this.chapters_text)
        // console.log(this.chapters_text[0].link)
        // console.log("小说书源id.......");
        // console.log(res.data[0]._id);
        // resolve(this.sourceId);

        //   }
        this.$indicator.close()
      });
    },
  },
  mounted() {
    console.log(this.index);
    this.is_color=this.index;
    // if(this.$route.query.index){
    //接收text页面传来的章节下标
    // this.is_color=this.$route.query.index
    // }
    //接收到上一个页面的book_id
    this.id = this.$route.query.id;
    //接收到上一个页面的 小说名字
    this.title = this.$route.query.title;
    // console.log(this.$route.query);
    // console.log("书名"+this.title)
    // console.log("小说id" + this.id);
    //发送请求  获取小说正版源于盗版源(混合)
    console.log(this.id)
    this.chapters(`/atoc?view=summary&book=${this.id}`).then((res) => {
      this._text(res);
    });
    // this.axios.get(`/atoc?view=summary&book=${this.id}`).then((res) => {
    //   console.log("小说书源");
    //   console.log(res.data);
    //   console.log("小说书源id.......");
    //   console.log(res.data[0]._id);
    //   this.sourceId = res.data[0]._id;
    // });
  },
};
</script>
<style scoped>
.mint-header {
  font-size: 18px;
  background-color: #e8e8e8 !important;
  height: 50px !important;
  box-shadow: 0px 0px 0px 0px #ccc !important;
  color: black;
}
.chapters .left {
  width: 30px;
  height: 30px;
  margin-left: 10px;
}
.chapters .left > img {
  width: 100%;
}
.chapters .bottom {
  margin-top: 50px;
}
/* 选中颜色 */
 .chapters   .font_color{
   color: red;
 }

</style>