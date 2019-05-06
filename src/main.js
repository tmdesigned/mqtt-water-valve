import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueMqtt from 'vue-mqtt';

function getUrlVars() {
  var vars = {};
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}

Vue.use(VueMqtt, 'ws://broker.losant.com:80', {
  clientId: getUrlVars()["device"],
  username: getUrlVars()["public"],
  password: getUrlVars()["key"]
});
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

