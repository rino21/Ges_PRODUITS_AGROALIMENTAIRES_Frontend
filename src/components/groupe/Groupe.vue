<template>
  <div>
    <div class="modal fade" id="s_myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">SUPRESSION DU GROUPE</h4>
          </div>
          <div class="modal-body">
            <p>Voulez vous vraiment le supprimer ?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" v-on:click="supprimerGroupe()">Oui</button>
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
                <label class="col-form-label col-formlabel-lg">Groupe <span class="textdanger">*</span></label>
                <input type="text" placeholder="Entrez le nom du groupe" v-model.trim="$v.nomGroupe.$model" :class="{'is-invalid': validationStatus($v.nomGroupe)}" class="form-control form-control-lg">
                <div v-if="!$v.nomGroupe.required" class="invalid-feedback">Remplissez le champs du groupe !</div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <div class="row ">
              <div class="col-md-6">
                <input type="reset" data-dismiss="modal" value="Annuler" class="btn btn-danger btn-block" v-on:click="resetForm()">
              </div>
              <div class="col-md-6">
                <input type="button" v-if="ajouter"  value="Ajouter" v-on:click.prevent="submitGroupe()" class="btn btn-primary btn-block">
                <input type="button" v-if="!ajouter"  value="Modfier" v-on:click.prevent="modifierGroupe()" class="btn btn-primary btn-block">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid mt-3 contenu-dynamique">
      <div class="row">
        <div class="col-2">
          <button class="btn btn-primary btn-block" v-on:click="showModalAjoutGroupe()"> Ajouter</button>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-12 bg-white shadow" style="padding:20px; border-radius:3px">
          <div class="row">
            <div class="col-md-8 d-flex align-items-center">
              <h5 class="d-flex align-items-center"><span class="text-primary">Groupe</span><i class="bx bx-chevron-right bx-sm"></i> Listes des groupes </h5>
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
                  <th >Groupe</th>
                  <th >Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for = "(value, index) in listeGroupe" :key = "index" align="center">
                  <td>{{ index + 1}}</td>
                  <td>{{ value.nomGroupe }}</td>
                  <td>
                    <button class="btn btn-success" v-on:click="showModalGroupeEdit(value.idGroupe)"><i class="bx bxs-edit"></i></button>
                    <button class="btn btn-danger" v-on:click="showModalsupGroupe(value.idGroupe)"><i class="bx bxs-trash"></i></button>
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
  name: 'Region',
  data () {
    return {
      idGroupe: '',
      nomGroupe: '',
      titre: '',
      ajouter: false,
      listeGroupe: null
    }
  },
  validations: {
    nomGroupe: { required }
  },
  mounted () {
    this.getListeGroupe()
    this.chercherGroupe()
  },
  methods: {
    validationStatus: function (validation) {
      return typeof validation !== 'undefined' ? validation.$error : false
    },
    showModalAjoutGroupe: function () {
      $('#myModal').modal({backdrop: 'static'})
      $('#message_myModal').modal('hide')
      this.titre = 'AJOUT GROUPE'
      this.ajouter = true
    },
    submitGroupe: function () {
      this.$v.$touch()
      if (this.$v.$pendding || this.$v.$error) {
        return
      }
      axios.post('/ajoutGroupe', {
        nomGroupe: this.nomGroupe
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
          this.getListeGroupe()
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
    showModalGroupeEdit: function (idGroupe) {
      this.titre = 'MODIFICATION DU GROUPE'
      this.ajouter = false
      axios.get(`/listeGroupe/${idGroupe}`)
        .then((response) => {
          var value = response.data[0]
          this.nomGroupe = value.nomGroupe
          this.idGroupe = value.idGroupe
          $('#myModal').modal({backdrop: 'static'})
        })
        .catch(err => console.log(err))
    },
    modifierGroupe: function () {
      this.$v.$touch()
      if (this.$v.$pendding || this.$v.$error) {
        return
      }
      axios.patch(`/modifierGroupe/${this.idGroupe}`, {
        nomGroupe: this.nomGroupe
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
          this.getListeGroupe()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    showModalsupGroupe: function (idGroupe) {
      $('#s_myModal').modal({backdrop: 'static'})
      this.idGroupe = idGroupe
    },
    supprimerGroupe: function () {
      axios.delete(`/supprimerGroupe/${this.idGroupe}`)
        .then(response => {
          if (response.data.etat) {
            this.$swal({
              icon: 'error',
              html: response.data.msg
            })
          } else {
            this.getListeGroupe()
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
    getListeGroupe: function () {
      axios.get('/listeGroupe')
        .then((response) => {
          this.listeGroupe = response.data
        })
        .catch(err => console.log(err))
    },
    chercherGroupe: function () {
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
      this.nomGroupe = ''
      $('#myModal').modal('hide')
      this.$v.$reset()
    }
  }
}

</script>
<style scoped>
.zIndex {
  z-index: 4;
}
select,input[type='text'],input[type='email'],input[type='number'],input[type='date']
  {
    height: 42px;
    font-size: 1em;
  }
</style>
