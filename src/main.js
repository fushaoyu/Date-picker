import Vue from 'vue'
import App from './App.vue'
import F_DatePicker from 'fsy-date-picker';
import 'element-ui/lib/theme-chalk/index.css';
import { Input } from 'element-ui';

Vue.config.productionTip = false;


Vue.use(F_DatePicker);
Vue.use(Input);


new Vue({
  render: h => h(App),
}).$mount('#app')
