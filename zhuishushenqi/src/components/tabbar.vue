<template>
  <div class="header">
    <!-- <Top/> -->
    <mt-tabbar v-model="tab" fixed>
      <mt-tab-item id="index">
        <img v-if="tab=='index'" src="../assets/images/index2.png" alt="">
        <img v-else src="../assets/images/index1.png" alt="">
      </mt-tab-item>
      <mt-tab-item id="search"> 
        <img v-if="tab=='search'" src="../assets/images/search2.png" alt="">
        <img v-else src="../assets/images/search1.png" alt="">
         </mt-tab-item>
      <mt-tab-item id="bookcase"> 
        <img v-if="tab=='bookcase'" src="../assets/images/bookrack2.png" alt="">
        <img v-else src="../assets/images/bookrack1.png" alt="">
         </mt-tab-item>
      <mt-tab-item id="my"> 
        <img v-if="tab=='my'" src="../assets/images/my2.png" alt="">
        <img v-else src="../assets/images/my1.png" alt="">
         </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
// import Top from '../views/Top'
import { mapMutations, mapState } from 'vuex'

export default {
  computed:{
    ...mapState(['tab1'])
  },
  data() {
    return {
      tab: "index",
    };
  },
  methods:{
    ...mapMutations(['settab1'])
  },
  // components:{
  //   Top
  // },
  mounted() {
    this.tab=this.tab1;
    switch (this.$router.fullPath) {
      case "/index":
        this.tab = "index";
        break;
      case "/search":
        this.tab = "search";
        break;
       case "/bookcase":
        this.tab = "bookcase";
        break;
       case "/my":
        this.tab = "my";
        break;
    }
  },
  watch: {
    tab() {
      this.settab1(this.tab);
      switch (this.tab) {
        case "index":
          this.$router.push(
            {path:"/"},
            onComplete=>{},
            onabort=>{});
          break;
        case "search":
          this.$router.push(
            {path:"/search"},
            onComplete=>{},
            onabort=>{});
          break;
        case "bookcase":
          this.$router.push(
            {path:"/bookcase"},
            onComplete=>{},
            onabort=>{});
          break;
        case "my":
          this.$router.push(
            {path:"/my"},
            onComplete=>{},
            onabort=>{});
          break;
      }
    },
  },
};
</script>
<style >
.mint-tab-item-label img{
  width: 35%;
}
.mint-tab-item-label{
  height: 30px;
  font-size: 22px !important;
}
</style>