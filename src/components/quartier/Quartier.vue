<template>
  <div>
    <div class="modal fade" id="s_myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">SUPRESSION DU QUARTIER</h4>
          </div>
          <div class="modal-body">
            <p>Voulez vous vraiment le supprimer ?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" v-on:click="supprimerQuartier()">Oui</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal">Non</button>
          </div>
        </div>
      </div>
    </div>
    <!------------------------------------------modal ajout Quartier ------------------------>
    <div class="modal fade" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">{{titre}}</h4>
          </div>
          <div class="modal-body">
            <form action="" >
              <div class="col-12 form-group">
                <label class="col-form-label col-formlabel-lg">Quartier <span class="textdanger">*</span></label>
                <input type="text" placeholder="Entrez le nom du quartier" v-model.trim="$v.nomFkt.$model" :class="{'is-invalid': validationStatus($v.nomFkt)}" class="form-control form-control-lg">
                <div v-if="!$v.nomFkt.required" class="invalid-feedback">Remplissez le champs du quartier !</div>
              </div>
              <div class="col-12 form-group">
                <label class="col-form-label col-formlabel-lg">commune <span class="textdanger">*</span></label>
                <select v-model.trim="$v.idComm.$model" :class="{'is-invalid': validationStatus($v.idComm)}" class="form-control form-control-lg">
                  <option value="">Selectionnez une commune</option>
                  <option :value="value.idComm" v-for = "(value, index) in listeCommune" :key = "index">{{ value.nomComm }}</option>
                </select>
                <div v-if="!$v.idComm.required" class="invalid-feedback">Selectionnez une commune !</div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <div class="row ">
              <div class="col-md-6">
                <input type="reset" data-dismiss="modal" value="Annuler" class="btn btn-danger btn-block" v-on:click="resetForm()">
              </div>
              <div class="col-md-6">
                <input type="button" v-if="ajouter"  value="Ajouter" v-on:click.prevent="submitQuartier()" class="btn btn-primary btn-block">
                <input type="button" v-if="!ajouter"  value="Modfier" v-on:click.prevent="modifierQuartier()" class="btn btn-primary btn-block">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid mt-3 contenu-dynamique">
      <div class="row">
        <div class="col-2">
          <button class="btn btn-primary btn-block" v-on:click="showModalAjoutQuartier()"> Ajouter</button>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-12 bg-white shadow" style="padding:20px; border-radius:3px">
          <div class="row">
            <div class="col-md-8 d-flex align-items-center">
              <h5 class="d-flex align-items-center"><span class="text-primary">Quartier</span><i class="bx bx-chevron-right bx-sm"></i> Listes des quartier </h5>
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
                  <th >Quartier</th>
                  <th >Commune</th>
                  <th >Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for = "(value, index) in listeQuartier" :key = "index" align="center">
                  <td>{{ index + 1}}</td>
                  <td>{{ value.nomFkt }}</td>
                  <td>{{ value.nomComm }}</td>
                  <td>
                    <button class="btn btn-success" v-on:click="showModalQuartierEdit(value.idFkt)"><i class="bx bxs-edit"></i></button>
                    <button class="btn btn-danger" v-on:click="showModalsupQuartier(value.idFkt)"><i class="bx bxs-trash"></i></button>
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
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'Quartier',
  data () {
    return {
      idComm: '',
      nomFkt: '',
      idFkt: '',
      titre: '',
      ajouter: false,
      listeCommune: null,
      listeQuartier: null
    }
  },
  validations: {
    nomFkt: { required },
    idComm: { required }
  },
  mounted () {
    this.getListeCommune()
    this.getListeQuartier()
    this.chercherQuartier()
  },
  methods: {
    validationStatus: function (validation) {
      return typeof validation !== 'undefined' ? validation.$error : false
    },
    showModalAjoutQuartier: function () {
      $('#myModal').modal({backdrop: 'static'})
      $('#message_myModal').modal('hide')
      this.titre = 'AJOUT QUARTIER'
      this.ajouter = true
    },
    submitQuartier: function () {
      this.$v.$touch()
      if (this.$v.$pendding || this.$v.$error) {
        return
      }
      axios.post('/ajoutQuartier', {
        nomFkt: this.nomFkt,
        idComm: this.idComm
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
          this.getListeQuartier()
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
    showModalQuartierEdit: function (idFkt) {
      this.titre = 'MODIFICATION DU QUARTIER'
      this.ajouter = false
      axios.get(`/listeQuartier/${idFkt}`)
        .then((response) => {
          var value = response.data[0]
          this.idFkt = value.idFkt
          this.nomFkt = value.nomFkt
          this.idComm = value.idComm
          $('#myModal').modal({backdrop: 'static'})
        })
        .catch(err => console.log(err))
    },
    modifierQuartier: function () {
      this.$v.$touch()
      if (this.$v.$pendding || this.$v.$error) {
        return
      }
      axios.patch(`/modifierQuartier/${this.idFkt}`, {
        nomFkt: this.nomFkt,
        idComm: this.idComm
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
          this.getListeQuartier()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    showModalsupQuartier: function (idFkt) {
      $('#s_myModal').modal({backdrop: 'static'})
      this.idFkt = idFkt
    },
    supprimerQuartier: function () {
      axios.delete(`/supprimerQuartier/${this.idFkt}`)
        .then(response => {
          if (response.data.etat) {
            this.$swal({
              icon: 'error',
              html: response.data.msg
            })
          } else {
            this.getListeQuartier()
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
    getListeCommune: function () {
      axios.get('/listeCommune')
        .then((response) => {
          this.listeCommune = response.data
        })
        .catch(err => console.log(err))
    },
    getListeQuartier: function () {
      axios.get('/listeQuartier')
        .then((response) => {
          this.listeQuartier = response.data
        })
        .catch(err => console.log(err))
    },
    chercherQuartier: function () {
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
      this.idComm = ''
      this.nomFkt = ''
      $('#myModal').modal('hide')
      this.$v.$reset()
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
