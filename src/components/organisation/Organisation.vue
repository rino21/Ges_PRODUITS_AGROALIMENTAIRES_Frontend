<template>
  <div>
    <div class="modal fade" id="p_myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">{{nom}}</h4>
          </div>
          <div class="modal-body">
            <p class="d-flex align-items-center"><i class="bx bx-envelope bx-sm mr-2"> </i> {{mail}}</p>
            <p class="d-flex align-items-center"><i class="bx bx-phone bx-sm mr-2"> </i> {{tel}}</p>
            <p class="d-flex align-items-center"><i class="bx bx-home bx-sm mr-2"> </i> {{adresse}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="s_myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">SUPRESSION DE L'ORGANISATION</h4>
          </div>
          <div class="modal-body">
            <p>Voulez vous vraiment la supprimer ?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" v-on:click="supprimerOrganisation()">Oui</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal">Non</button>
          </div>
        </div>
      </div>
    </div>
    <!------------------------------------------modal ajout organisation ------------------------>
    <div class="modal fade" id="myModal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">{{titre}}</h4>
          </div>
          <div class="modal-body">
            <form action="" >
              <div class="row">
                <div class="col-md-6">
                    <div class="col-12 form-group">
                        <label class="col-form-label col-formlabel-lg">Nom d'organisation <span class="textdanger">*</span></label>
                        <input type="text" placeholder="Entrez le nom de l'organisation" v-model.trim="$v.nom.$model" :class="{'is-invalid': validationStatus($v.nom)}" class="form-control form-control-lg">
                        <div v-if="!$v.nom.required" class="invalid-feedback">Remplissez le champs de le nom d'organisation !</div>
                    </div>
                    <div class="col-12 form-group">
                        <label class="col-form-label col-formlabel-lg">Email <span class="textdanger">*</span></label>
                        <input type="text" placeholder="Entrez l'email" v-model.trim="$v.mail.$model" :class="{'is-invalid': validationStatus($v.mail)}" class="form-control form-control-lg">
                        <div v-if="!$v.mail.required" class="invalid-feedback">Remplissez le champs de l'email !</div>
                        <div v-if="!$v.mail.email" class="invalid-feedback">Votre email n'est pas validé !</div>
                    </div>
                    <div class="col-12 form-group">
                        <label class="col-form-label col-formlabel-lg">Numéro de Téléphone <span class="textdanger">*</span></label>
                        <input type="text" placeholder="Entrez le numéro de téléphone" v-model.trim="$v.tel.$model" :class="{'is-invalid': validationStatus($v.tel)}" class="form-control form-control-lg">
                        <div v-if="!$v.tel.required" class="invalid-feedback">Remplissez le champs de numéro de téléphone !</div>
                        <div v-if="!$v.tel.numeric" class="invalid-feedback">Le N° de téléphone doit être numéro </div>
                    </div>
                    <div class="col-12 form-group">
                        <label class="col-form-label col-formlabel-lg">Adresse <span class="textdanger">*</span></label>
                        <input type="text" placeholder="Entrez l'adresse" v-model.trim="$v.adresse.$model" :class="{'is-invalid': validationStatus($v.adresse)}" class="form-control form-control-lg">
                        <div v-if="!$v.adresse.required" class="invalid-feedback">Remplissez le champs de l'adresse !</div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="col-12 form-group">
                        <label class="col-form-label col-formlabel-lg">Groupe <span class="textdanger">*</span></label>
                        <select v-model.trim="$v.idGroupe.$model" :class="{'is-invalid': validationStatus($v.idGroupe)}" class="form-control form-control-lg">
                        <option value="">Selectionnez un groupe</option>
                        <option :value="value.idGroupe" v-for = "(value, index) in listeGroupe" :key = "index">{{ value.nomGroupe }}</option>
                        </select>
                        <div v-if="!$v.idGroupe.required" class="invalid-feedback">Selectionnez un groupe !</div>
                    </div>
                    <div class="col-12 form-group">
                        <label class="col-form-label col-formlabel-lg">NIF STAT <span class="textdanger">*</span></label>
                        <input type="text" placeholder="Entrez le NIF STAT" v-model.trim="$v.numNIF.$model" :class="{'is-invalid': validationStatus($v.numNIF)}" class="form-control form-control-lg">
                        <div v-if="!$v.numNIF.numeric" class="invalid-feedback">Le N° de NIF STAT doit être numéro </div>
                        <div v-if="!$v.numNIF.required" class="invalid-feedback">Remplissez le champs de la NIF STAT !</div>
                    </div>
                    <div class="col-12 form-group">
                        <label class="col-form-label col-formlabel-lg">Type d'organisation <span class="textdanger">*</span></label>
                        <select v-model.trim="$v.idTypeOrg.$model" :class="{'is-invalid': validationStatus($v.idTypeOrg)}" class="form-control form-control-lg">
                        <option value="">Selectionnez un type d'organisation</option>
                        <option :value="value.idTypeOrg" v-for = "(value, index) in listeTypeOrganisation" :key = "index">{{ value.nomTypeOrg }}</option>
                        </select>
                        <div v-if="!$v.idTypeOrg.required" class="invalid-feedback">Selectionnez un Type d'organisation !</div>
                    </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <div class="row ">
              <div class="col-md-6">
                <input type="reset" data-dismiss="modal" value="Annuler" class="btn btn-danger btn-block" v-on:click="resetForm()">
              </div>
              <div class="col-md-6">
                <input type="button" v-if="ajouter"  value="Ajouter" v-on:click.prevent="submitOrganisation()" class="btn btn-primary btn-block">
                <input type="button" v-if="!ajouter"  value="Modfier" v-on:click.prevent="modifierOrganisation()" class="btn btn-primary btn-block">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid mt-3 contenu-dynamique">
      <div class="row">
        <div class="col-2">
          <button class="btn btn-primary btn-block" v-on:click="showModalAjoutOrganisation()"> Ajouter</button>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-12 bg-white shadow" style="padding:20px; border-radius:3px">
          <div class="row">
            <div class="col-md-8 d-flex align-items-center">
              <h5 class="d-flex align-items-center"><span class="text-primary">Organisation</span><i class="bx bx-chevron-right bx-sm"></i> Listes des organisations </h5>
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
                  <th >Nom d'organisation</th>
                  <!--th >Email</th>
                  <th >N° téléphone</th>
                  <th >Adresse</th-->
                  <th >Groupe</th>
                  <th >NIF STAT</th>
                  <th >Type d'org</th>
                  <th >Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for = "(value, index) in listeOrganisation" :key = "index" align="center">
                  <td>PRODC{{ value.idProdr}}</td>
                  <td>{{ value.nom }}</td>
                  <!--td>{{ value.mail }}</td>
                  <td>{{ value.tel }}</td>
                  <td>{{ value.adresse }}</td-->
                  <td>{{ value.nomGroupe }}</td>
                  <td>{{ value.numNIF }}</td>
                  <td>{{ value.nomTypeOrg }}</td>
                  <td>
                    <button class="btn btn-info" v-on:click="showModalOrganisationPerso(value.idProdr)"><i class="bx bxs-show"></i></button>
                    <button class="btn btn-success" v-on:click="showModalOrganisationEdit(value.idProdr)"><i class="bx bxs-edit"></i></button>
                    <button class="btn btn-danger" v-on:click="showModalsupOrganisation(value.idProdr)"><i class="bx bxs-trash"></i></button>
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
import { required, email, numeric } from 'vuelidate/lib/validators'

export default {
  name: 'Commune',
  data () {
    return {
      idProdr: '',
      nom: '',
      mail: '',
      tel: '',
      adresse: '',
      idGroupe: '',
      numNIF: '',
      idTypeOrg: '',
      ajouter: false,
      titre: '',
      listeGroupe: null,
      listeTypeOrganisation: null,
      listeOrganisation: null
    }
  },
  validations: {
    nom: { required },
    mail: { required, email },
    tel: { required, numeric },
    adresse: { required },
    idGroupe: { required },
    numNIF: { required, numeric },
    idTypeOrg: { required }
  },
  mounted () {
    this.getListeOrganisation()
    this.chercherOrganisation()
    this.getListeTypeOrganisation()
    this.getListeGroupe()
  },
  methods: {
    validationStatus: function (validation) {
      return typeof validation !== 'undefined' ? validation.$error : false
    },
    showModalAjoutOrganisation: function () {
      $('#myModal').modal({backdrop: 'static'})
      $('#message_myModal').modal('hide')
      this.titre = 'AJOUT ORGANISATION'
      this.ajouter = true
    },
    submitOrganisation: function () {
      this.$v.$touch()
      if (this.$v.$pendding || this.$v.$error) {
        return
      }
      axios.post('/ajoutOrganisation', {
        nom: this.nom,
        mail: this.mail,
        tel: this.tel,
        adresse: this.adresse,
        idGroupe: this.idGroupe,
        numNIF: this.numNIF,
        idTypeOrg: this.idTypeOrg
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
          this.getListeOrganisation()
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
    showModalOrganisationEdit: function (idProdr) {
      this.titre = 'MODIFICATION DE L\'ORGNISATION'
      this.ajouter = false
      axios.get(`/listeOrganisation/${idProdr}`)
        .then((response) => {
          var value = response.data[0]
          this.nom = value.nom
          this.mail = value.mail
          this.tel = value.tel
          this.adresse = value.adresse
          this.idGroupe = value.idGroupe
          this.numNIF = value.numNIF
          this.idTypeOrg = value.idTypeOrg
          this.idProdr = value.idProdr
          $('#myModal').modal({backdrop: 'static'})
        })
        .catch(err => console.log(err))
    },
    showModalOrganisationPerso: function (idProdr) {
      axios.get(`/listeOrganisation/${idProdr}`)
        .then((response) => {
          var value = response.data[0]
          this.nom = value.nom
          this.mail = value.mail
          this.tel = value.tel
          this.adresse = value.adresse
          $('#p_myModal').modal('show')
        })
        .catch(err => console.log(err))
    },
    modifierOrganisation: function () {
      this.$v.$touch()
      if (this.$v.$pendding || this.$v.$error) {
        return
      }
      axios.patch(`/modifierOrganisation/${this.idProdr}`, {
        nom: this.nom,
        mail: this.mail,
        tel: this.tel,
        adresse: this.adresse,
        idGroupe: this.idGroupe,
        numNIF: this.numNIF,
        idTypeOrg: this.idTypeOrg
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
          this.getListeOrganisation()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    showModalsupOrganisation: function (idProdr) {
      $('#s_myModal').modal({backdrop: 'static'})
      this.idProdr = idProdr
    },
    supprimerOrganisation: function () {
      axios.delete(`/supprimerOrganisation/${this.idProdr}`)
        .then(response => {
          if (response.data.etat) {
            this.$swal({
              icon: 'error',
              html: response.data.msg
            })
          } else {
            this.getListeOrganisation()
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
    getListeOrganisation: function () {
      axios.get('/listeOrganisation')
        .then((response) => {
          this.listeOrganisation = response.data
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
    getListeTypeOrganisation: function () {
      axios.get('/listeTypeOrganisation')
        .then((response) => {
          this.listeTypeOrganisation = response.data
        })
        .catch(err => console.log(err))
    },
    chercherOrganisation: function () {
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
      this.nom = ''
      this.mail = ''
      this.tel = ''
      this.adresse = ''
      this.idGroupe = ''
      this.numNIF = ''
      this.idTypeOrg = ''
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
  option
  {
    font-size: 1em;
  }
</style>
