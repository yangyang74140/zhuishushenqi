import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
//导入mint-ui
import mintUI from 'mint-ui'
//导入mintui样式
import 'mint-ui/lib/style.min.css'
//挂载
Vue.use(mintUI)
//引入vant popup弹出层
import { Popup } from 'vant';
Vue.use(Popup);

//引入vant 搜索框
import { Search } from 'vant';
Vue.use(Search);

//引入vant badge徽标
import { Badge } from 'vant';
Vue.use(Badge);

import { Cell, CellGroup } from 'vant';
Vue.use(Cell);
Vue.use(CellGroup);

import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe);
Vue.use(SwipeItem);

import { SwipeCell } from 'vant';
Vue.use(SwipeCell);
import { Card } from 'vant';
Vue.use(Card);
import { Button } from 'vant';
Vue.use(Button);

import { Col, Row } from 'vant';
Vue.use(Col);
Vue.use(Row);

import { Toast } from 'vant';
Vue.use(Toast);

axios.defaults.baseURL='/'
Vue.prototype.axios=axios;


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
