<template>
    <div>
        <span>QTE D'UN PRODUIT PAR MOIS DANS UNE ANNEE ET DANS UN QUARTIER PRECISE</span>
        <canvas id="myChartPs" width="400" height="120"></canvas>
        <div class="row mt-4">
            <div class="col-md-3 form-group">
              <label class="col-form-label col-formlabel-lg">Nom de produit <span class="textdanger">*</span></label>
              <select v-model.trim="$v.idProd.$model" :class="{'is-invalid': validationStatus($v.idProd)}" class="form-control form-control-lg">
              <option value="">Selectionnez un produit</option>
              <option :value="value.idProd" v-for = "(value, index) in listeProduit" :key = "index">P{{ value.idProd }}-{{ value.designation }}</option>
              </select>
              <div v-if="!$v.idProd.required" class="invalid-feedback">Selectionnez un prouit !</div>
            </div>
            <div class="col-md-3 form-group">
              <label class="col-form-label col-formlabel-lg">Quartier <span class="textdanger">*</span></label>
              <select v-model.trim="$v.idFkt.$model" :class="{'is-invalid': validationStatus($v.idFkt)}" class="form-control form-control-lg">
              <option value="">Selectionnez un quartier</option>
              <option :value="value.idFkt" v-for = "(value, index) in listeQuartier" :key = "index">{{ value.nomFkt }}-{{value.nomComm}}</option>
              </select>
              <div v-if="!$v.idFkt.required" class="invalid-feedback">Selectionnez un quartier !</div>
            </div>
            <div class="col-md-3 form-group">
              <label class="col-form-label col-formlabel-lg">Année <span class="textdanger">*</span></label>
              <input type="text" placeholder="Année" v-model.trim="$v.annee.$model" :class="{'is-invalid': validationStatus($v.annee)}" class="form-control form-control-lg">
              <div v-if="!$v.annee.required" class="invalid-feedback">Remplissez le champs de l'année !</div>
            </div>
            <div class="col-md-3 form-group">
              <label for="" class="col-form-label col-formlabel-lg">.</label>
              <input type="button" class="btn btn-primary btn-block" value="Voir" v-on:click="submitlistProdMois">
            </div>
        </div>
    </div>
</template>

<script>
import Chart from 'chart.js'
import axios from '../../axios/Axios'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'BarChartPersonnalise',
  data () {
    return {
      myChart: null,
      annee: '',
      idProd: '',
      idFkt: '',
      listeProduit: null,
      listeQuartier: null
    }
  },
  validations: {
    annee: { required },
    idProd: { required },
    idFkt: { required }
  },
  mounted () {
    this.getListeProduit()
    this.getListeQuartier()
  },
  methods: {
    validationStatus: function (validation) {
      return typeof validation !== 'undefined' ? validation.$error : false
    },
    submitlistProdMois: function () {
      this.$v.$touch()
      if (this.$v.$pendding || this.$v.$error) {
        return
      }
      axios.post(`/listeProdMois`, {
        annee: this.annee,
        idProd: this.idProd,
        idFkt: this.idFkt
      }).then(response => {
        var value = response.data
        var dataDb = []
        var labelDb = []
        var mois = ['', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
        for (var i = 0; i < value.length; i++) {
          dataDb.push(parseInt(value[i].qte))
          labelDb.push(mois[value[i].mois])
        }
        var ctx = document.getElementById('myChartPs').getContext('2d')
        this.myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labelDb,
            datasets: [{
              label: `# ${value[0].designation}`,
              data: dataDb,
              backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(255,150,0,0.7)',
                'rgba(40, 206, 86, 0.7)',
                'rgba(255,5,0,0.7)',
                'rgba(255,55,150,0.7)',
                'rgba(255,220,0,0.7)',
                '#3B71CA',
                'rgba(0, 159, 244, 0.7)',
                'rgba(255, 99, 132, 0.7)',
                'rgba(255,150,0,0.7)',
                'rgba(40, 206, 86, 0.7)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 0
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        })
      }).catch(err => {
        console.log(err)
      })
    },
    getListeQuartier: function () {
      axios.get('/listeQuartier')
        .then((response) => {
          this.listeQuartier = response.data
        })
        .catch(err => console.log(err))
    },
    getListeProduit: function () {
      axios.get('/listeProduit')
        .then((response) => {
          this.listeProduit = response.data
        })
        .catch(err => console.log(err))
    }
  }
}
</script>
<style scoped>
select,input[type='text']
  {
    height: 42px;
    font-size: 1em;
  }
  option
  {
    font-size: 1em;
  }
</style>
