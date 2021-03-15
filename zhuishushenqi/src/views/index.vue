<template>
  <div class="index">
    <!-- 顶部选项卡 -->
    <mt-navbar v-model="selected">
      <mt-tab-item id="male">男生</mt-tab-item>
      <mt-tab-item id="female">女生</mt-tab-item>
      <mt-tab-item id="picture">出版</mt-tab-item>
      <mt-tab-item id="perss">标签</mt-tab-item>
    </mt-navbar>
    <!-- 内容区域 -->
    <div class="content">
      <div v-for="(item,index) of cats" :key="index" @click="skip(selected,index)">
        <div class="book" >
          <div class="left">
              <p class="p1">{{item.name}}</p>
              <p class="p2">{{item.bookCount}}本</p>
          </div>
          <div class="right">
              <img :src="img+item.bookCover[1]" alt="">
          </div>
        </div>
      </div>
      <div></div>
    </div>
        <tabbar/>
  </div>
</template>
<script>
import tabbar from '../components/tabbar'
import "../../mock/mock.js"
import { mapMutations, mapState } from 'vuex';
export default {
  computed:{
    ...mapState(['index','bookid'])
  },
  components:{
        tabbar
    },
  data() {
    return {
      selected:"male",
      classify:{},
      img:'http://statics.zhuishushenqi.com',
      cats:[],
      major:'',
      gerenBook:[]
    };
  },
  methods:{
    ...mapMutations(['setindex','setbookid']),
    skip(selected,index){
      this.$router.push({
        path:'/classify',
        query:{
          gender:selected,
          index:index
        }
      })
    }
  },
  mounted() {
    // 查看是否有用户使用过
    if(JSON.parse(localStorage.getItem('mystate'))!=1){
        // let bookclassify = JSON.parse(localStorage.getItem('bookclassify'));
        // this.setbookid(bookclassify);
        localStorage.setItem('gerenBook',JSON.stringify(this.gerenBook));
        // console.log(JSON.parse(localStorage.getItem('gerenBook')))
    }

    // 开启加载
    this.$indicator.open();
    //获取所有分类
    this.axios.get("/cats/lv2/statistics").then((res) => {
      this.classify=res.data
      this.cats=res.data.male;
      // console.log(res.data);
      //结束加载 
      this.$indicator.close()
    });



    // this.axios.get('/book/54d2e3e958ec2f3d7cffdf25?view=updated').then(res=>{
    //     console.log('获取分类下小类别');
    //     console.log(res.data);
    // });
    // this.axios.get('/book/by-categories',{
    //   parmas:{
    //     gender:'female',
    //     type:'hot',
    //     major:'现代言情',
    //     minor:'豪门总裁',
    //   }
    // }).then(res=>{
    //     console.log('ggg');
    //     console.log(res.data);
    // });
    // this.axios.get('/book/by-categories?gender=male&type=hot&major=玄幻&minor=东方玄幻&page=3').then(res=>{
    //     console.log('ggg');
    //     console.log(res.data);
    // });
  },
   watch:{
       selected(value){
           if(value=='male'){
               this.cats=this.classify.male;
           }else if(value=='female'){
               this.cats=this.classify.female;
           }else if(value=='picture'){
               this.cats=this.classify.picture;
           }else if(value=='perss'){
               this.cats=this.classify.press;
           }
           
       }
   }
};
</script>
<style >

.index .content {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  margin-top: 25px;
  margin-bottom: 44px;
}
.index .content > div {
  flex: 0 0 45%;
}
.index .book{
    display: flex;
    margin-bottom: 10px;
    background-color: rgb(248, 248, 250);
}
.index .book>.left{
    flex: 0 0 35%;
    padding: 10px;
    padding-bottom: 0;
    padding-right: 0;
}
.index .book>.right{
    flex: 0 0 65%;
    padding: 10px;
    padding-bottom: 0;
}
.index .book>.left>.p1{
    font-size: 14px;
    color: #000;
}
.index .book>.left>.p2{
    font-size: 12px;
    color: #666;
}

.index .book>.right{
    flex: 2
}
.index .right img{
    width: 100%;
}
</style>