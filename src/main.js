// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router/index'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/boxicons-2.1.4/css/boxicons.css'
import './assets/boxicons-2.1.4/css/transformations.css'
import './assets/boxicons-2.1.4/css/animations.css'
// import '@fortawesome/fontawesome-free/css/all.css'
// import '@fortawesome/fontawesome-free/js/all.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'popper.js'
import 'datatables.net-bs4'
import 'jszip'
import 'pdfmake'
import 'datatables.net-buttons-bs4'
import 'datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css'
import 'datatables.net-buttons/js/buttons.colVis'
import 'datatables.net-buttons/js/buttons.flash'
import 'datatables.net-buttons/js/buttons.html5'
import 'datatables.net-buttons/js/buttons.print'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import Vuelidate from 'vuelidate'
const options = {
  confirmButtonColor: '#3B71CA'
}

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(VueSweetalert2, options)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
