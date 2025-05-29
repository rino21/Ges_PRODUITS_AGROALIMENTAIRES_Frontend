<template>
  <div>
    <div class="modal fade" id="s_myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">SUPRESSION DU DISTRICT</h4>
          </div>
          <div class="modal-body">
            <p>Voulez vous vraiment le supprimer ?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" v-on:click="supprimerDistrict()">Oui</button>
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
                <label class="col-form-label col-formlabel-lg">District <span class="textdanger">*</span></label>
                <input type="text" placeholder="Entrez le nom du district" v-model.trim="$v.nomDist.$model" :class="{'is-invalid': validationStatus($v.nomDist)}" class="form-control form-control-lg">
                <div v-if="!$v.nomDist.required" class="invalid-feedback">Remplissez le champs du district !</div>
              </div>
              <div class="col-12 form-group">
                <label class="col-form-label col-formlabel-lg">Région <span class="textdanger">*</span></label>
                <select v-model.trim="$v.idReg.$model" :class="{'is-invalid': validationStatus($v.idReg)}" class="form-control form-control-lg">
                  <option value="">Selectionnez une région</option>
                  <option :value="value.idReg" v-for = "(value, index) in listeRegion" :key = "index">{{ value.nomReg }}</option>
                </select>
                <div v-if="!$v.idReg.required" class="invalid-feedback">Selectionnez une région !</div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <div class="row ">
              <div class="col-md-6">
                <input type="reset" data-dismiss="modal" value="Annuler" class="btn btn-danger btn-block" v-on:click="resetForm()">
              </div>
              <div class="col-md-6">
                <input type="button" v-if="ajouter"  value="Ajouter" v-on:click.prevent="submitDistrict()" class="btn btn-primary btn-block">
                <input type="button" v-if="!ajouter"  value="Modfier" v-on:click.prevent="modifierDistrict()" class="btn btn-primary btn-block">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid mt-3 contenu-dynamique">
      <div class="row">
        <div class="col-2">
          <button class="btn btn-primary btn-block" v-on:click="showModalAjoutDistrict()"> Ajouter</button>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-12 bg-white shadow" style="padding:20px; border-radius:3px">
          <div class="row">
            <div class="col-md-8 d-flex align-items-center">
              <h5 class="d-flex align-items-center"><span class="text-primary">District</span><i class="bx bx-chevron-right bx-sm"></i> Listes des districts </h5>
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
                  <th >District</th>
                  <th >Region</th>
                  <th >Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for = "(value, index) in listeDistrict" :key = "index" align="center">
                  <td>{{ index + 1}}</td>
                  <td>{{ value.nomDist }}</td>
                  <td>{{ value.nomReg }}</td>
                  <td>
                    <button class="btn btn-success" v-on:click="showModalDistrictEdit(value.idDist)"><i class="bx bxs-edit"></i></button>
                    <button class="btn btn-danger" v-on:click="showModalsupDistrict(value.idDist)"><i class="bx bxs-trash"></i></button>
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
  name: 'District',
  data () {
    return {
      idReg: '',
      nomDist: '',
      idDist: '',
      titre: '',
      ajouter: false,
      listeRegion: null,
      listeDistrict: null
    }
  },
  validations: {
    nomDist: { required },
    idReg: { required }
  },
  mounted () {
    this.getListeRegion()
    this.getListeDistrict()
    this.chercherDistrict()
  },
  methods: {
    validationStatus: function (validation) {
      return typeof validation !== 'undefined' ? validation.$error : false
    },
    showModalAjoutDistrict: function () {
      $('#myModal').modal({backdrop: 'static'})
      $('#message_myModal').modal('hide')
      this.titre = 'AJOUT DISTRICT'
      this.ajouter = true
    },
    submitDistrict: function () {
      this.$v.$touch()
      if (this.$v.$pendding || this.$v.$error) {
        return
      }
      axios.post('/ajoutDistrict', {
        nomDist: this.nomDist,
        idReg: this.idReg
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
          this.getListeDistrict()
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
    showModalDistrictEdit: function (idDist) {
      this.titre = 'MODIFICATION DU DISTRICT'
      this.ajouter = false
      axios.get(`/listeDistrict/${idDist}`)
        .then((response) => {
          var value = response.data[0]
          this.idReg = value.idReg
          this.nomDist = value.nomDist
          this.idDist = value.idDist
          $('#myModal').modal({backdrop: 'static'})
        })
        .catch(err => console.log(err))
    },
    modifierDistrict: function () {
      this.$v.$touch()
      if (this.$v.$pendding || this.$v.$error) {
        return
      }
      axios.patch(`/modifierDistrict/${this.idDist}`, {
        idReg: this.idReg,
        nomDist: this.nomDist
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
          this.getListeDistrict()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    showModalsupDistrict: function (idDist) {
      $('#s_myModal').modal({backdrop: 'static'})
      this.idDist = idDist
    },
    supprimerDistrict: function () {
      axios.delete(`/supprimerDistrict/${this.idDist}`)
        .then(response => {
          if (response.data.etat) {
            this.$swal({
              icon: 'error',
              html: response.data.msg
            })
          } else {
            this.getListeDistrict()
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
    getListeRegion: function () {
      axios.get('/listeRegion')
        .then((response) => {
          this.listeRegion = response.data
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
    chercherDistrict: function () {
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
      this.idReg = ''
      this.nomDist = ''
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
