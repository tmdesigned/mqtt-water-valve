import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueMqtt from 'vue-mqtt';


Vue.use(VueMqtt, 'ws://broker.losant.com:80', {
  clientId: '5ccb82cf04156e0008b023b9',
  username: 'f0e3144c-5726-411b-8323-fc891163c225',
  password: 'da1096b88c72093595f94fb54aa2b013f368d66cc482b36f71f2082950fc1d35'
});
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
