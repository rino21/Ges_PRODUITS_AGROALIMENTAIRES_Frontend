<template>
    <div>
        <div class="row mt-4">
            <div class="col-12">
                <span class="ml-3">LISTE D'UN PRODUIT ENTRE 2 DATE DANS UN QUARTIER</span>
            </div>
        </div>
        <div class="row">
            <div class="col-md-5">
                <div class="card ml-5 mt-4 mb-4">
                    <div class="card-body">
                        <form action="" v-on:submit.prevent="submitlistProdDate">
                            <div class="col-md-12 form-group">
                                <label class="col-form-label col-formlabel-lg">Nom de produit <span class="textdanger">*</span></label>
                                <select v-model.trim="$v.idProd.$model" :class="{'is-invalid': validationStatus($v.idProd)}" class="form-control form-control-lg">
                                <option value="">Selectionnez un produit</option>
                                <option :value="value.idProd" v-for = "(value, index) in listeProduit" :key = "index">P{{ value.idProd }}-{{ value.designation }}</option>
                                </select>
                                <div v-if="!$v.idProd.required" class="invalid-feedback">Selectionnez un prouit !</div>
                            </div>
                            <div class="col-md-12 form-group">
                                <label class="col-form-label col-formlabel-lg">Quartier <span class="textdanger">*</span></label>
                                <select v-model.trim="$v.idFkt.$model" :class="{'is-invalid': validationStatus($v.idFkt)}" class="form-control form-control-lg">
                                <option value="">Selectionnez un quartier</option>
                                <option :value="value.idFkt" v-for = "(value, index) in listeQuartier" :key = "index">{{ value.nomFkt }}-{{value.nomComm}}</option>
                                </select>
                                <div v-if="!$v.idFkt.required" class="invalid-feedback">Selectionnez un quartier !</div>
                            </div>
                            <div class="col-md-12 form-group">
                                <label class="col-form-label col-formlabel-lg">Date debut <span class="textdanger">*</span></label>
                                <input type="date" placeholder="Année" v-model.trim="$v.annee.$model" :class="{'is-invalid': validationStatus($v.annee)}" class="form-control form-control-lg">
                                <div v-if="!$v.annee.required" class="invalid-feedback">Remplissez le champs de la date de debut !</div>
                            </div>
                            <div class="col-md-12 form-group">
                                <label class="col-form-label col-formlabel-lg">Date Fin <span class="textdanger">*</span></label>
                                <input type="date" placeholder="Année" v-model.trim="$v.anneeFin.$model" :class="{'is-invalid': validationStatus($v.anneeFin)}" class="form-control form-control-lg">
                                <div v-if="!$v.anneeFin.required" class="invalid-feedback">Remplissez le champs de la date de fin !</div>
                            </div>
                            <div class="col-md-12 form-group">
                                <input type="submit" value="Voir" class="btn btn-primary btn-block">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-6 ">
                <table class="table table-bordered mt-4 ml-5">
                    <thead>
                        <tr align="center">
                            <th>N°</th>
                            <th>Date de production</th>
                            <th>Quantité</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr align="center" v-for="(value, index) in listeProdDate" :key="index">
                            <td>{{index + 1}}</td>
                            <td>{{dateParseInv(value.dateProd)}}</td>
                            <td>{{value.qteProd}} {{value.unite}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../../axios/Axios'
import { required } from 'vuelidate/lib/validators'
import moment from 'moment'
export default {
  name: 'ListeProdDate',
  data () {
    return {
      annee: '',
      idProd: '',
      idFkt: '',
      anneeFin: '',
      listeProduit: null,
      listeQuartier: null,
      listeProdDate: null
    }
  },
  validations: {
    annee: { required },
    idProd: { required },
    idFkt: { required },
    anneeFin: { required }
  },
  mounted () {
    this.getListeProduit()
    this.getListeQuartier()
  },
  methods: {
    validationStatus: function (validation) {
      return typeof validation !== 'undefined' ? validation.$error : false
    },
    submitlistProdDate: function () {
      this.$v.$touch()
      if (this.$v.$pendding || this.$v.$error) {
        return
      }
      axios.post(`/listeProdDate`, {
        annee: this.annee,
        idProd: this.idProd,
        idFkt: this.idFkt,
        anneeFin: this.anneeFin
      }).then(response => {
        this.listeProdDate = response.data
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
    },
    dateParseInv: function (data) {
      return moment(data).format('DD-MM-YYYY')
    }
  }
}
</script>
<style scoped>
select,input[type='text'],input[type='date']
  {
    height: 42px;
    font-size: 1em;
  }
  option
  {
    font-size: 1em;
  }
</style>
