<template>
  <div class="container-fluid">
    <div class="row mt-4">
      <div class="col-md-12">
        <h5><i class="bx bx-home btn btn-primary"></i> Dashboard</h5>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-3" style="cursor:pointer">
        <ProduitExpire/>
      </div>
      <div class="col-md-3" style="cursor:pointer">
        <BientotExpire/>
      </div>
      <div class="col-md-3">
        <div class="card shadow">
          <div class="card-body">
            <div class="row d-flex align-items-center">
              <div class="col-md-4"><i class="bx bx-building-house bx-sm btn text-white" style="background-color:rgba(255, 99, 132, 0.7);border-radius:50px"></i></div>
              <div class="col-md-8">
                <span>Organisation</span><br>
                <h5>{{nbOrg}}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card shadow">
          <div class="card-body">
            <div class="row d-flex align-items-center">
              <div class="col-md-4"><i class="bx bx-user bx-sm btn btn-primary text-white" style="border-radius:50px"></i></div>
              <div class="col-md-8">
                <span>Particulier</span><br>
                <h5>{{nbParti}}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-8">
        <div class="card shadow dashboard_1" >
          <div class="card-body">
            <BarChart/>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card shadow dashboard_1">
          <div class="card-body">
            <PieChart />
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4 mb-4">
      <div class="col-12">
        <div class="card shadow">
          <div class="card-body">
            <BarCharPersonnalise/>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-12">
        <div class="card">
          <div class="card body">
            <ListeProdDate/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../axios/Axios'
// import $ from 'jquery'
// import { required, numeric } from 'vuelidate/lib/validators'
// import moment from 'moment'
import ProduitExpire from './ProduitExpire.vue'
import BarChart from './BarChartPerso.vue'
import ListeProdDate from './ListeProdDate.vue'
import PieChart from './PieChart.vue'
import BarCharPersonnalise from './BarCharPersonnalise.vue'
import BientotExpire from './BientotExpire.vue'
export default {
  name: 'Accueil',
  components: {
    BarChart, PieChart, BarCharPersonnalise, ProduitExpire, BientotExpire, ListeProdDate
  },
  data () {
    return {
      nbOrg: '',
      nbParti: ''
    }
  },
  mounted () {
    this.conuntNbOrg()
    this.conuntNbParti()
  },
  methods: {
    conuntNbOrg: function () {
      axios.get('/nombreOrg')
        .then(response => {
          this.nbOrg = response.data[0].nb
        })
        .catch(err => {
          if (err) {
            console.log(err)
          }
        })
    },
    conuntNbParti: function () {
      axios.get('/nombreParti')
        .then(response => {
          this.nbParti = response.data[0].nb
        })
        .catch(err => {
          if (err) {
            console.log(err)
          }
        })
    }
  }
}

</script>
<style scoped>
 .dashboard_1 {
  height: 330px;
 }
</style>
