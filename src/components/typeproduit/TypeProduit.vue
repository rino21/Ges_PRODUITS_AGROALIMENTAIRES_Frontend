<template>
  <div>
    <div class="modal fade" id="s_myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">SUPRESSION DU TYPE DE PRODUIT</h4>
          </div>
          <div class="modal-body">
            <p>Voulez vous vraiment le supprimer ?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" v-on:click="supprimerTypeProduit()">Oui</button>
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
                <label class="col-form-label col-formlabel-lg">Classement <span class="textdanger">*</span></label>
                <input type="text" placeholder="Entrez le classement de la produit" v-model.trim="$v.classement.$model" :class="{'is-invalid': validationStatus($v.classement)}" class="form-control form-control-lg">
                <div v-if="!$v.classement.required" class="invalid-feedback">Remplissez le champs le type de produit !</div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <div class="row ">
              <div class="col-md-6">
                <input type="reset" data-dismiss="modal" value="Annuler" class="btn btn-danger btn-block" v-on:click="resetForm()">
              </div>
              <div class="col-md-6">
                <input type="button" v-if="ajouter"  value="Ajouter" v-on:click.prevent="submitTypeProduit()" class="btn btn-primary btn-block">
                <input type="button" v-if="!ajouter"  value="Modfier" v-on:click.prevent="modifierTypeProduit()" class="btn btn-primary btn-block">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid mt-3 contenu-dynamique">
      <div class="row">
        <div class="col-2">
          <button class="btn btn-primary btn-block" v-on:click="showModalAjoutTypeProduit()"> Ajouter</button>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-12 bg-white shadow" style="padding:20px; border-radius:3px">
          <div class="row">
            <div class="col-md-8 d-flex align-items-center">
              <h5 class="d-flex align-items-center"><span class="text-primary">Type produit</span><i class="bx bx-chevron-right bx-sm"></i> Listes des types produits </h5>
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
                  <th >Classement</th>
                  <th >Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for = "(value, index) in listeTypeProduit" :key = "index" align="center">
                  <td>{{ index + 1}}</td>
                  <td>{{ value.classement }}</td>
                  <td>
                    <button class="btn btn-success" v-on:click="showModalTypeProduitEdit(value.idTypeProd)"><i class="bx bxs-edit"></i></button>
                    <button class="btn btn-danger" v-on:click="showModalsupTypeProduit(value.idTypeProd)"><i class="bx bxs-trash"></i></button>
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
  name: 'TypeProduit',
  data () {
    return {
      idTypeProd: '',
      classement: '',
      titre: '',
      ajouter: false,
      listeTypeProduit: null
    }
  },
  validations: {
    classement: { required }
  },
  mounted () {
    this.getListeTypeProduit()
    this.chercherTypeProduit()
  },
  methods: {
    validationStatus: function (validation) {
      return typeof validation !== 'undefined' ? validation.$error : false
    },
    showModalAjoutTypeProduit: function () {
      $('#myModal').modal({backdrop: 'static'})
      $('#message_myModal').modal('hide')
      this.titre = 'AJOUT TYPE DE PRODUIT'
      this.ajouter = true
    },
    submitTypeProduit: function () {
      this.$v.$touch()
      if (this.$v.$pendding || this.$v.$error) {
        return
      }
      axios.post('/ajoutTypeProduit', {
        classement: this.classement
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
          this.getListeTypeProduit()
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
    showModalTypeProduitEdit: function (idTypeProd) {
      this.titre = 'MODIFICATION DE LA TYPE DE PRODUIT'
      this.ajouter = false
      axios.get(`/listeTypeProduit/${idTypeProd}`)
        .then((response) => {
          var value = response.data[0]
          this.classement = value.classement
          this.idTypeProd = value.idTypeProd
          $('#myModal').modal({backdrop: 'static'})
        })
        .catch(err => console.log(err))
    },
    modifierTypeProduit: function () {
      this.$v.$touch()
      if (this.$v.$pendding || this.$v.$error) {
        return
      }
      axios.patch(`/modifierTypeProduit/${this.idTypeProd}`, {
        classement: this.classement
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
          this.getListeTypeProduit()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    showModalsupTypeProduit: function (idTypeProd) {
      $('#s_myModal').modal({backdrop: 'static'})
      this.idTypeProd = idTypeProd
    },
    supprimerTypeProduit: function () {
      axios.delete(`/supprimerTypeProduit/${this.idTypeProd}`)
        .then(response => {
          if (response.data.etat) {
            this.$swal({
              icon: 'error',
              html: response.data.msg
            })
          } else {
            this.getListeTypeProduit()
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
    getListeTypeProduit: function () {
      axios.get('/listeTypeProduit')
        .then((response) => {
          this.listeTypeProduit = response.data
        })
        .catch(err => console.log(err))
    },
    chercherTypeProduit: function () {
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
      this.classement = ''
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
