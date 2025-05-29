<template>
  <div>
    <div class="modal fade" id="s_myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">SUPRESSION DE LA COMMUNE</h4>
          </div>
          <div class="modal-body">
            <p>Voulez vous vraiment la supprimer ?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" v-on:click="supprimerCommune()">Oui</button>
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
                <label class="col-form-label col-formlabel-lg">Commune <span class="textdanger">*</span></label>
                <input type="text" placeholder="Entrez le nom de la commune" v-model.trim="$v.nomComm.$model" :class="{'is-invalid': validationStatus($v.nomComm)}" class="form-control form-control-lg">
                <div v-if="!$v.nomComm.required" class="invalid-feedback">Remplissez le champs de la commune !</div>
              </div>
              <div class="col-12 form-group">
                <label class="col-form-label col-formlabel-lg">District <span class="textdanger">*</span></label>
                <select v-model.trim="$v.idDist.$model" :class="{'is-invalid': validationStatus($v.idDist)}" class="form-control form-control-lg">
                  <option value="">Selectionnez un district</option>
                  <option :value="value.idDist" v-for = "(value, index) in listeDistrict" :key = "index">{{ value.nomDist }}</option>
                </select>
                <div v-if="!$v.idDist.required" class="invalid-feedback">Selectionnez un district !</div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <div class="row ">
              <div class="col-md-6">
                <input type="reset" data-dismiss="modal" value="Annuler" class="btn btn-danger btn-block" v-on:click="resetForm()">
              </div>
              <div class="col-md-6">
                <input type="button" v-if="ajouter"  value="Ajouter" v-on:click.prevent="submitCommune()" class="btn btn-primary btn-block">
                <input type="button" v-if="!ajouter"  value="Modfier" v-on:click.prevent="modifierCommune()" class="btn btn-primary btn-block">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid mt-3 contenu-dynamique">
      <div class="row">
        <div class="col-2">
          <button class="btn btn-primary btn-block" v-on:click="showModalAjoutCommune()"> Ajouter</button>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-12 bg-white shadow" style="padding:20px; border-radius:3px">
          <div class="row">
            <div class="col-md-8 d-flex align-items-center">
              <h5 class="d-flex align-items-center"><span class="text-primary">Commune</span><i class="bx bx-chevron-right bx-sm"></i> Listes des communes </h5>
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
                  <th >Commune</th>
                  <th >District</th>
                  <th >Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for = "(value, index) in listeCommune" :key = "index" align="center">
                  <td>{{ index + 1}}</td>
                  <td>{{ value.nomComm }}</td>
                  <td>{{ value.nomDist }}</td>
                  <td>
                    <button class="btn btn-success" v-on:click="showModalCommuneEdit(value.idComm)"><i class="bx bxs-edit"></i></button>
                    <button class="btn btn-danger" v-on:click="showModalsupCommune(value.idComm)"><i class="bx bxs-trash"></i></button>
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
  name: 'Commune',
  data () {
    return {
      idComm: '',
      nomComm: '',
      idDist: '',
      titre: '',
      ajouter: false,
      listeCommune: null,
      listeDistrict: null
    }
  },
  validations: {
    nomComm: { required },
    idDist: { required }
  },
  mounted () {
    this.getListeCommune()
    this.getListeDistrict()
    this.chercherCommune()
  },
  methods: {
    validationStatus: function (validation) {
      return typeof validation !== 'undefined' ? validation.$error : false
    },
    showModalAjoutCommune: function () {
      $('#myModal').modal({backdrop: 'static'})
      $('#message_myModal').modal('hide')
      this.titre = 'AJOUT COMMUNE'
      this.ajouter = true
    },
    submitCommune: function () {
      this.$v.$touch()
      if (this.$v.$pendding || this.$v.$error) {
        return
      }
      axios.post('/ajoutCommune', {
        nomComm: this.nomComm,
        idDist: this.idDist
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
          this.getListeCommune()
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
    showModalCommuneEdit: function (idComm) {
      this.titre = 'MODIFICATION DE LA COMMUNE'
      this.ajouter = false
      axios.get(`/listeCommune/${idComm}`)
        .then((response) => {
          var value = response.data[0]
          this.idComm = value.idComm
          this.nomComm = value.nomComm
          this.idDist = value.idDist
          $('#myModal').modal({backdrop: 'static'})
        })
        .catch(err => console.log(err))
    },
    modifierCommune: function () {
      this.$v.$touch()
      if (this.$v.$pendding || this.$v.$error) {
        return
      }
      axios.patch(`/modifierCommune/${this.idComm}`, {
        idDist: this.idDist,
        nomComm: this.nomComm
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
          this.getListeCommune()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    showModalsupCommune: function (idComm) {
      $('#s_myModal').modal({backdrop: 'static'})
      this.idComm = idComm
    },
    supprimerCommune: function () {
      axios.delete(`/supprimerCommune/${this.idComm}`)
        .then(response => {
          if (response.data.etat) {
            this.$swal({
              icon: 'error',
              html: response.data.msg
            })
          } else {
            this.getListeCommune()
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
    getListeDistrict: function () {
      axios.get('/listeDistrict')
        .then((response) => {
          this.listeDistrict = response.data
        })
        .catch(err => console.log(err))
    },
    chercherCommune: function () {
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
      this.idDist = ''
      this.nomComm = ''
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
