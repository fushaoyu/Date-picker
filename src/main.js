import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import F_DatePicker from 'fsy-date-picker';
Vue.use(ElementUI);
Vue.use(F_DatePicker);


new Vue({
  el: '#app',
  render: h => h(App)
})
