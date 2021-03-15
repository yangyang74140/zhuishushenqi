import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    index:0,
    // tab1:'bookcase',
    tab1:'index',
    searchBook:[],
    setsearchBookcase:[],
    gerenBook:JSON.parse(localStorage.getItem('gerenBook'))!=null?JSON.parse(localStorage.getItem('gerenBook')):[]
  },
  mutations: {
    setindex(state,index){
      state.index=index
    },
    settab1(state,tab1){
      state.tab1=tab1
    },
    setsearchBook(state,book){
      state.searchBook=book
    },
    setsearchBookcase(state,book){
      state.setsearchBookcase=book
    },
    setgerenBook(state,book){
      // 把整本书和章节下标  这个对象  push到gerenBook数组中
      state.gerenBook.push(book)
      // 把整本书和章节下标  这个对象  存到本地localStorage中
      localStorage.setItem('gerenBook',JSON.stringify(state.gerenBook));
    },
    delgerenBook(state,index){
      state.gerenBook.splice(index,1);
      localStorage.setItem('gerenBook',JSON.stringify(state.gerenBook));
    },
    cache_xb(state,cache_xb,index){
      // 更新浏览器缓存中  具体书籍 阅读到第几章的值
        state.gerenBook[cache_xb].classify_index=index;
        localStorage.setItem('gerenBook',JSON.stringify(state.gerenBook));
    }

  },
  actions: {
  },
  modules: {
  }
})
