import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueWebsocket from "vue-websocket";
Vue.use(VueWebsocket, "ws://localhost:3000");
Vue.use(VueResource);

new Vue({
  el: 'body',
  components: { App }
});
