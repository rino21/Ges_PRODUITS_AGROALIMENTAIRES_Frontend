<template>
  <div>
    <div class="modal fade" id="s_myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">SUPRESSION DU PRODUIT</h4>
          </div>
          <div class="modal-body">
            <p>Voulez vous vraiment le supprimer ?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" v-on:click="supprimerProduit()">Oui</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal">Non</button>
          </div>
        </div>
      </div>
    </div>
    <!------------------------------------------modal ajout Corps ------------------------>
    <div class="modal fade" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">{{titre}}</h4>
          </div>
          <div class="modal-body">
            <form action="" >
              <div class="col-12 form-group">
                <label class="col-form-label col-formlabel-lg">Designation <span class="textdanger">*</span></label>
                <input type="text" placeholder="Entrez la designation du produit" v-model.trim="$v.designation.$model" :class="{'is-invalid': validationStatus($v.designation)}" class="form-control form-control-lg">
                <div v-if="!$v.designation.required" class="invalid-feedback">Remplissez le champs de la commune !</div>
              </div>
              <div class="col-12 form-group">
                <label class="col-form-label col-formlabel-lg">Type produit <span class="textdanger">*</span></label>
                <select v-model.trim="$v.idTypeProd.$model" :class="{'is-invalid': validationStatus($v.idTypeProd)}" class="form-control form-control-lg">
                  <option value="">Selectionnez un type de produit</option>
                  <option :value="value.idTypeProd" v-for = "(value, index) in listeTypeProduit" :key = "index">{{ value.classement }}</option>
                </select>
                <div v-if="!$v.idTypeProd.required" class="invalid-feedback">Selectionnez un type de produit !</div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <div class="row ">
              <div class="col-md-6">
                <input type="reset" data-dismiss="modal" value="Annuler" class="btn btn-danger btn-block" v-on:click="resetForm()">
              </div>
              <div class="col-md-6">
                <input type="button" v-if="ajouter"  value="Ajouter" v-on:click.prevent="submitProduit()" class="btn btn-primary btn-block">
                <input type="button" v-if="!ajouter"  value="Modfier" v-on:click.prevent="modifierProduit()" class="btn btn-primary btn-block">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid mt-3 contenu-dynamique">
      <div class="row">
        <div class="col-2">
          <button class="btn btn-primary btn-block" v-on:click="showModalAjoutProduit()"> Ajouter</button>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-12 bg-white shadow" style="padding:20px; border-radius:3px">
          <div class="row">
            <div class="col-md-8 d-flex align-items-center">
              <h5 class="d-flex align-items-center"><span class="text-primary">Produit</span><i class="bx bx-chevron-right bx-sm"></i> Listes des produits </h5>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <input type="search" name="" id="searchDistrict" placeholder="Rechercher ..." class="form-control">
              </div>
            </div>
          </div>
          <div class="table-contenu mt-2">
            <table class="table table-striped table-hover table-bordered">
              <thead>
                <tr align="center">
                  <th >N°</th>
                  <th >Designation</th>
                  <th >Type de produit</th>
                  <th >Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for = "(value, index) in listeProduit" :key = "index" align="center">
                  <td>P{{value.idProd}}</td>
                  <td>{{ value.designation }}</td>
                  <td>{{ value.classement }}</td>
                  <td>
                    <button class="btn btn-success" v-on:click="showModalProduitEdit(value.idProd)"><i class="bx bxs-edit"></i></button>
                    <button class="btn btn-danger" v-on:click="showModalsupProduit(value.idProd)"><i class="bx bxs-trash"></i></button>
                  </td>
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
import $ from 'jquery'
import moment from 'moment'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'Produit',
  data () {
    return {
      idProd: '',
      designation: '',
      idTypeProd: '',
      titre: '',
      ajouter: false,
      listeTypeProduit: null,
      listeProduit: null
    }
  },
  validations: {
    designation: { required },
    idTypeProd: { required }
  },
  mounted () {
    this.getListeTypeProduit()
    this.getListeProduit()
    this.chercherProduit()
  },
  methods: {
    validationStatus: function (validation) {
      return typeof validation !== 'undefined' ? validation.$error : false
    },
    showModalAjoutProduit: function () {
      $('#myModal').modal({backdrop: 'static'})
      $('#message_myModal').modal('hide')
      this.titre = 'AJOUT PRODUIT'
      this.ajouter = true
    },
    submitProduit: function () {
      this.$v.$touch()
      if (this.$v.$pendding || this.$v.$error) {
        return
      }
      axios.post('/ajoutProduit', {
        designation: this.designation,
        idTypeProd: this.idTypeProd
      }).then(response => {
        console.log(response)
        if (!response.data.etat) {
          this.resetForm()
          this.$swal({
            icon: 'success',
            html: response.data.msg,
            showConfirmButton: false,
            timer: 1100
          })
          this.getListeProduit()
          this.resetForm()
        } else {
          this.$swal({
            icon: 'error',
            html: response.data.msg
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    showModalProduitEdit: function (idProd) {
      this.titre = 'MODIFICATION DU PRODUIT'
      this.ajouter = false
      axios.get(`/listeProduit/${idProd}`)
        .then((response) => {
          var value = response.data[0]
          this.idProd = value.idProd
          this.designation = value.designation
          this.idTypeProd = value.idTypeProd
          $('#myModal').modal({backdrop: 'static'})
        })
        .catch(err => console.log(err))
    },
    modifierProduit: function () {
      this.$v.$touch()
      if (this.$v.$pendding || this.$v.$error) {
        return
      }
      axios.patch(`/modifierProduit/${this.idProd}`, {
        designation: this.designation,
        // pu: this.pu,
        // dateExp: this.dateExp,
        idTypeProd: this.idTypeProd
      }).then(response => {
        console.log(response)
        if (response.data.etat) {
          this.resetForm()
          this.$swal({
            icon: 'success',
            html: response.data.msg,
            showConfirmButton: false,
            timer: 1100
          })
          this.getListeProduit()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    showModalsupProduit: function (idProd) {
      $('#s_myModal').modal({backdrop: 'static'})
      this.idProd = idProd
    },
    supprimerProduit: function () {
      axios.delete(`/supprimerProduit/${this.idProd}`)
        .then(response => {
          if (response.data.etat) {
            this.$swal({
              icon: 'error',
              html: response.data.msg
            })
          } else {
            this.getListeProduit()
            $('#s_myModal').modal('hide')
            this.$swal({
              icon: 'success',
              html: response.data.msg,
              showConfirmButton: false,
              timer: 1100
            })
          }
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
    getListeTypeProduit: function () {
      axios.get('/listeTypeProduit')
        .then((response) => {
          this.listeTypeProduit = response.data
        })
        .catch(err => console.log(err))
    },
    chercherProduit: function () {
      $(document).ready(function () {
        $('#searchDistrict').on('keyup', function () {
          var value = $(this).val().toLowerCase()
          $('tbody tr').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          })
        })
      })
    },
    resetForm: function () {
      this.designation = ''
      this.pu = ''
      this.dateExp = ''
      this.idTypeProd = ''
      $('#myModal').modal('hide')
      this.$v.$reset()
    },
    dateParse: function (data) {
      return moment(data).utc().format('YYYY-MM-DD')
    }
  }
}

</script>
<style scoped>
  option
  {
    font-size: 1em;
  }
  select,input[type='text'],input[type='email'],input[type='number'],input[type='date']
  {
    height: 42px;
    font-size: 1em;
  }
</style>
