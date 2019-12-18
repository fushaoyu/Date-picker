import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import fsyDatePicker from 'fsy-date-picker'

Vue.use(ElementUI);
Vue.use(fsyDatePicker);



new Vue({
  el: '#app',
  render: h => h(App)
})
