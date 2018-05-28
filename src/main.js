// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
// import {Button} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import hello from './components/HelloWorld.vue';
import articleListPage from './page/articleListPage.vue';
import heroListPage from './page/heroListPage.vue';
import articleDetailPage from './page/articleDetailPage.vue';
import articleAddPage from './page/articleAddPage.vue';
import resultPage from './page/resultPage.vue';
import VueResource from 'vue-resource';
import equipmentListPage from './page/equipmentListPage.vue';
import equipmentAddPage from './page/equipmentAddPage.vue';
import bannerAdd from './page/bannerAdd.vue';
import bannerList from './page/bannerList.vue';
import login from './login.vue';
import manage from './manage.vue';
import jdtestpage from './page/JDTestPage.vue';
// import axios from 'axios';
// import VueAxios from 'vue-axios';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueRouter);
// Vue.use(axios, VueAxios);
Vue.use(VueResource);

const routes = [
  {
    path: '/',
    component: manage,
    children: [
      {
        path: '/articleListPage',
        component: articleListPage
      },
      {
        path: '/heroListpage',
        component: heroListPage
      },
      {
        path: '/articleDetailPage',
        name: 'articledetailpage',
        component: articleDetailPage
      },
      {
        path: '/articleAddPage',
        component: articleAddPage
      },
      {
        path: '/resultPage',
        component: resultPage
      },
      {
        path: '/equipmentListPage',
        component: equipmentListPage
      },
      {
        path: '/equipmentAddPage',
        component: equipmentAddPage
      },
      {
        path: '/bannerAdd',
        component: bannerAdd
      },
      {
        path: '/bannerList',
        component: bannerList
      },
      {
        path: '/jdtestpage',
        component: jdtestpage
      }
    ]
  },
  {
    path: '/login',
    component: login
  }
];

const router = new VueRouter({
  routes
});

// Vue.component(Button.name, Button);
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
