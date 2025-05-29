<template>
  <div>
    <div class="modal fade" id="s_myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">SUPRESSION DE TYPE D'ORGANISATION</h4>
          </div>
          <div class="modal-body">
            <p>Voulez vous vraiment la supprimer ?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" v-on:click="supprimerTypeOrganisation()">Oui</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal">Non</button>
          </div>
        </div>
      </div>
    </div>
    <!------------------------------------------modal ajout TypeProducteur ------------------------>
    <div class="modal fade" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">{{titre}}</h4>
          </div>
          <div class="modal-body">
            <form action="" >
              <div class="col-12 form-group">
                <label class="col-form-label col-formlabel-lg">Type d'organisation <span class="textdanger">*</span></label>
                <input type="text" placeholder="Entrez le type de produit" v-model.trim="$v.nomTypeOrg.$model" :class="{'is-invalid': validationStatus($v.nomTypeOrg)}" class="form-control form-control-lg">
                <div v-if="!$v.nomTypeOrg.required" class="invalid-feedback">Remplissez le champs de type d'organisation !</div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <div class="row ">
              <div class="col-md-6">
                <input type="reset" data-dismiss="modal" value="Annuler" class="btn btn-danger btn-block" v-on:click="resetForm()">
              </div>
              <div class="col-md-6">
                <input type="button" v-if="ajouter"  value="Ajouter" v-on:click.prevent="submitTypeOrganisation()" class="btn btn-primary btn-block">
                <input type="button" v-if="!ajouter"  value="Modfier" v-on:click.prevent="modifierTypeOrganisation()" class="btn btn-primary btn-block">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid mt-3 contenu-dynamique">
      <div class="row">
        <div class="col-2">
          <button class="btn btn-primary btn-block" v-on:click="showModalAjoutTypeOrganisation()"> Ajouter</button>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-12 bg-white shadow" style="padding:20px; border-radius:3px">
          <div class="row">
            <div class="col-md-8 d-flex align-items-center">
              <h5 class="d-flex align-items-center"><span class="text-primary">Type d'organistion</span><i class="bx bx-chevron-right bx-sm"></i> Listes des type d'organisation </h5>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <input type="search" name="" id="searchCorps" placeholder="Rechercher ..." class="form-control">
              </div>
            </div>
          </div>
          <div class="table-contenu mt-2">
            <table class="table table-striped table-hover table-bordered">
              <thead>
                <tr align="center">
                  <th >N°</th>
                  <th >Type d'organisation</th>
                  <th >Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for = "(value, index) in listeTypeOrganisation" :key = "index" align="center">
                  <td>{{ index + 1}}</td>
                  <td>{{ value.nomTypeOrg }}</td>
                  <td>
                    <button class="btn btn-success" v-on:click="showModalTypeOrganisationEdit(value.idTypeOrg)"><i class="bx bxs-edit"></i></button>
                    <button class="btn btn-danger" v-on:click="showModalsupTypeOrganisation(value.idTypeOrg)"><i class="bx bxs-trash"></i></button>
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
  name: 'TypeOrganisation',
  data () {
    return {
      idTypeOrg: '',
      nomTypeOrg: '',
      titre: '',
      ajouter: false,
      listeTypeOrganisation: null
    }
  },
  validations: {
    nomTypeOrg: { required }
  },
  mounted () {
    this.getListeTypeOrganisation()
    this.chercherTypeOrganisation()
  },
  methods: {
    validationStatus: function (validation) {
      return typeof validation !== 'undefined' ? validation.$error : false
    },
    showModalAjoutTypeOrganisation: function () {
      $('#myModal').modal({backdrop: 'static'})
      $('#message_myModal').modal('hide')
      this.titre = 'AJOUT TYPE D\'ORGANISATION'
      this.ajouter = true
    },
    submitTypeOrganisation: function () {
      this.$v.$touch()
      if (this.$v.$pendding || this.$v.$error) {
        return
      }
      axios.post('/ajoutTypeOrganisation', {
        nomTypeOrg: this.nomTypeOrg
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
          this.getListeTypeOrganisation()
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
    showModalTypeOrganisationEdit: function (idTypeOrg) {
      this.titre = 'MODIFICATION DE TYPE D\'ORGANISATION'
      this.ajouter = false
      axios.get(`/listeTypeOrganisation/${idTypeOrg}`)
        .then((response) => {
          var value = response.data[0]
          this.nomTypeOrg = value.nomTypeOrg
          this.idTypeOrg = value.idTypeOrg
          $('#myModal').modal({backdrop: 'static'})
        })
        .catch(err => console.log(err))
    },
    modifierTypeOrganisation: function () {
      this.$v.$touch()
      if (this.$v.$pendding || this.$v.$error) {
        return
      }
      axios.patch(`/modifierTypeOrganisation/${this.idTypeOrg}`, {
        nomTypeOrg: this.nomTypeOrg
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
          this.getListeTypeOrganisation()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    showModalsupTypeOrganisation: function (idTypeOrg) {
      $('#s_myModal').modal({backdrop: 'static'})
      this.idTypeOrg = idTypeOrg
    },
    supprimerTypeOrganisation: function () {
      axios.delete(`/supprimerTypeOrganisation/${this.idTypeOrg}`)
        .then(response => {
          if (response.data.etat) {
            this.$swal({
              icon: 'error',
              html: response.data.msg
            })
          } else {
            this.getListeTypeOrganisation()
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
    getListeTypeOrganisation: function () {
      axios.get('/listeTypeOrganisation')
        .then((response) => {
          this.listeTypeOrganisation = response.data
        })
        .catch(err => console.log(err))
    },
    chercherTypeOrganisation: function () {
      $(document).ready(function () {
        $('#searchCorps').on('keyup', function () {
          var value = $(this).val().toLowerCase()
          $('tbody tr').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          })
        })
      })
    },
    resetForm: function () {
      this.nomTypeOrg = ''
      $('#myModal').modal('hide')
      this.$v.$reset()
    }
  }
}

</script>
<style scoped>
select,input[type='text'],input[type='email'],input[type='number'],input[type='date']
  {
    height: 42px;
    font-size: 1em;
  }
.zIndex {
  z-index: 4;
}
</style>
