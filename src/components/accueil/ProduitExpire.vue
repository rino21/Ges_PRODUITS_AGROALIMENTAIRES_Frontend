<template>
    <div>
        <div class="card shadow" v-on:click="showListeProdExp">
          <div class="card-body">
            <div class="row d-flex align-items-center">
              <div class="col-md-4"><i class="bx bx-cart-alt bx-sm btn text-white" style="background-color:rgba(255,5,0,0.7);border-radius:50px"></i></div>
              <div class="col-md-8">
                <span>Produit expirée</span><br>
                <h5>{{nb}}</h5>
              </div>
            </div>
          </div>
        </div>

        <div class="modal fade" id="ProdExp_myModal">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Liste des produits expirés</h4>
                </div>
                <div class="modal-body">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Designation</th>
                                <th>Qté</th>
                                <th>Uinté</th>
                                <th>Date d'expiration</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for = " (value, index) in listeProdExp " :key = "index">
                                <td>{{value.designation}}</td>
                                <td>{{value.qteProd}}</td>
                                <td>{{value.unite}}</td>
                                <td>{{dateParse(value.dateExp)}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../../axios/Axios'
import moment from 'moment'
import $ from 'jquery'
export default {
  name: 'ProduitExpire',
  data () {
    return {
      listeProdExp: null,
      nb: ''
    }
  },
  mounted () {
    this.getListeProdExp()
  },
  methods: {
    showListeProdExp: function () {
      $('#ProdExp_myModal').modal('show')
    },
    getListeProdExp: function () {
      axios.get('/listeproduitexpire')
        .then(response => {
          this.listeProdExp = response.data
          this.nb = response.data.length
        })
        .catch(err => {
          if (err) {
            console.log(err)
          }
        })
    },
    dateParse: function (data) {
      return moment(data).format('DD-MM-YYYY')
    }
  }
}
</script>
