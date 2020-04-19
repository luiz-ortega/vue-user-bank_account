import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuelidate from "vuelidate";
import vSelect from "vue-select";
import Notifications from "vue-notification";
import VueLoading from "vue-loading-overlay";

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(Notifications);
Vue.use(VueLoading);
Vue.component("v-select", vSelect);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
