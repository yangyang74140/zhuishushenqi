<template>
  <div class="topall">
    <mt-header fixed>
      <div slot="left" class="left">
        <p class="p1" @click="getBack"><img src="../assets/images/fanhui2.png" alt=""></p>
        <p class="p2">{{aa}}</p>
      </div>
    </mt-header>
  </div>
</template>
<script>
export default {
  props:["aa"],
  data(){
    return{
      major:''
    }
  },
  methods:{
    getBack(){
      this.$router.go(-1)
    }
  },
  mounted(){
    this.major=this.$route.params.major
  }
}
</script>
<style >
.topall .left{
    display: flex;
    align-items: center;
}
.topall .p1 {
  width: 35px;
  height: 35px;
  margin-left: 7px;
  background-position: 0 0 ;
}
.topall .p1>img{
    width: 100%;
}
.topall .p2{
  margin-left: 30px;
  font-size: 16px;
  color: cornflowerblue;
}
.mint-header {
  font-size: 18px;
  background-color: #fff !important;
  height: 50px !important;
  box-shadow: 0px 6px 7px -3px #ccc !important;
}

</style>