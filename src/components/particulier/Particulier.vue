<template>
  <div>
    <div class="modal fade" id="p_myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">{{nom}} {{prenom}}</h4>
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
            <h4 class="modal-title">SUPRESSION DU PARTICULIER</h4>
          </div>
          <div class="modal-body">
            <p>Voulez vous vraiment le supprimer ?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" v-on:click="supprimerParticulier()">Oui</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal">Non</button>
          </div>
        </div>
      </div>
    </div>
    <!------------------------------------------modal ajout Paarticuler ------------------------>
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
                        <label class="col-form-label col-formlabel-lg">Nom de la producteur <span class="textdanger">*</span></label>
                        <input type="text" placeholder="Entrez le nom de la producteur" v-model.trim="$v.nom.$model" :class="{'is-invalid': validationStatus($v.nom)}" class="form-control form-control-lg">
                        <div v-if="!$v.nom.required" class="invalid-feedback">Remplissez le champs de nom de la producteur !</div>
                    </div>
                    <div class="col-12 form-group">
                        <label class="col-form-label col-formlabel-lg">Prénom de la producteur <span class="textdanger">*</span></label>
                        <input type="text" placeholder="Entrez le prénom de la producteur" v-model.trim="$v.prenom.$model" :class="{'is-invalid': validationStatus($v.prenom)}" class="form-control form-control-lg">
                        <div v-if="!$v.prenom.required" class="invalid-feedback">Remplissez le champs de prénom de la producteur !</div>
                    </div>
                    <div class="col-12 form-group">
                        <label class="col-form-label col-formlabel-lg">Date de naissance<span class="textdanger">*</span></label>
                        <input type="date" placeholder="Entrez la date de naissance" v-model.trim="$v.dateNais.$model" :class="{'is-invalid': validationStatus($v.dateNais)}" class="form-control form-control-lg">
                        <div v-if="!$v.dateNais.required" class="invalid-feedback">Remplissez le champs de la date de naissance !</div>
                    </div>
                    <div class="col-12 form-group">
                        <label class="col-form-label col-formlabel-lg">Sexe <span class="textdanger">*</span></label>
                        <select v-model.trim="$v.sexe.$model" :class="{'is-invalid': validationStatus($v.sexe)}" class="form-control form-control-lg">
                        <option value="">Selectionnez un sexe</option>
                        <option value="H">Homme</option>
                        <option value="F">Femme</option>
                        </select>
                        <div v-if="!$v.sexe.required" class="invalid-feedback">Selectionnez un sexe</div>
                    </div>
                </div>
                <div class="col-md-6">
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
                        <div v-if="!$v.tel.maxLength" class="invalid-feedback">Le N° de téléphone doit être 10 chiffres ! </div>
                    </div>
                    <div class="col-12 form-group">
                        <label class="col-form-label col-formlabel-lg">Adresse <span class="textdanger">*</span></label>
                        <input type="text" placeholder="Entrez l'adresse" v-model.trim="$v.adresse.$model" :class="{'is-invalid': validationStatus($v.adresse)}" class="form-control form-control-lg">
                        <div v-if="!$v.adresse.required" class="invalid-feedback">Remplissez le champs de l'adresse !</div>
                    </div>
                    <div class="col-12 form-group">
                        <label class="col-form-label col-formlabel-lg">Groupe <span class="textdanger">*</span></label>
                        <select v-model.trim="$v.idGroupe.$model" :class="{'is-invalid': validationStatus($v.idGroupe)}" class="form-control form-control-lg">
                        <option value="">Selectionnez un groupe</option>
                        <option :value="value.idGroupe" v-for = "(value, index) in listeGroupe" :key = "index">{{ value.nomGroupe }}</option>
                        </select>
                        <div v-if="!$v.idGroupe.required" class="invalid-feedback">Selectionnez un groupe !</div>
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
                <input type="button" v-if="ajouter"  value="Ajouter" v-on:click.prevent="submitParticulier()" class="btn btn-primary btn-block">
                <input type="button" v-if="!ajouter"  value="Modfier" v-on:click.prevent="modifierParticulier()" class="btn btn-primary btn-block">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid mt-3 contenu-dynamique">
      <div class="row">
        <div class="col-2">
          <button class="btn btn-primary btn-block" v-on:click="showModalAjoutParticulier()"> Ajouter</button>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-12 bg-white shadow" style="padding:20px; border-radius:3px">
          <div class="row">
            <div class="col-md-8 d-flex align-items-center">
              <h5 class="d-flex align-items-center"><span class="text-primary">Particulier</span><i class="bx bx-chevron-right bx-sm"></i> Listes des producteurs </h5>
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
                  <th >Nom</th>
                  <th >Prenom</th>
                  <th >Date de naissance</th>
                  <th >Sexe</th>
                  <!--th >Email</th>
                  <th >N° téléphone</th>
                  <th >Adresse</th-->
                  <th >Groupe</th>
                  <th >Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for = "(value, index) in listeParticulier" :key = "index" align="center">
                  <td>PRODC{{ value.idProdr}}</td>
                  <td>{{ value.nom }}</td>
                  <td>{{ value.prenom }}</td>
                  <td>{{ dateParseInv(value.dateNais) }}</td>
                  <td>{{ value.sexe }}</td>
                  <!--td>{{ value.mail }}</td>
                  <td>{{ value.tel }}</td>
                  <td>{{ value.adresse }}</td-->
                  <td>{{ value.nomGroupe }}</td>
                  <td>
                    <button class="btn btn-info" v-on:click="showModalParticulierPerso(value.idProdr)"><i class="bx bxs-show"></i></button>
                    <button class="btn btn-success" v-on:click="showModalParticulierEdit(value.idProdr)"><i class="bx bxs-edit"></i></button>
                    <button class="btn btn-danger" v-on:click="showModalsupParticulier(value.idProdr)"><i class="bx bxs-trash"></i></button>
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
import { required, email, numeric, maxLength } from 'vuelidate/lib/validators'
import moment from 'moment'
export default {
  name: 'Commune',
  data () {
    return {
      idProdr: '',
      nom: '',
      prenom: '',
      dateNais: '',
      sexe: '',
      mail: '',
      tel: '',
      adresse: '',
      idGroupe: '',
      ajouter: false,
      titre: '',
      listeGroupe: null,
      listeParticulier: null
    }
  },
  validations: {
    nom: { required },
    prenom: { required },
    dateNais: { required },
    sexe: { required },
    mail: { required, email },
    tel: { required, numeric, maxLength: maxLength(10) },
    adresse: { required },
    idGroupe: { required }
  },
  mounted () {
    this.getListeParticulier()
    this.chercherParticulier()
    this.getListeGroupe()
  },
  methods: {
    validationStatus: function (validation) {
      return typeof validation !== 'undefined' ? validation.$error : false
    },
    showModalAjoutParticulier: function () {
      $('#myModal').modal({backdrop: 'static'})
      $('#message_myModal').modal('hide')
      this.titre = 'AJOUT PARTICULIER'
      this.ajouter = true
    },
    submitParticulier: function () {
      this.$v.$touch()
      if (this.$v.$pendding || this.$v.$error) {
        return
      }
      axios.post('/ajoutParticulier', {
        nom: this.nom,
        prenom: this.prenom,
        dateNais: this.dateNais,
        sexe: this.sexe,
        mail: this.mail,
        tel: this.tel,
        adresse: this.adresse,
        idGroupe: this.idGroupe
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
          this.getListeParticulier()
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
    showModalParticulierEdit: function (idProdr) {
      this.titre = 'MODIFICATION DU PARTICULIER'
      this.ajouter = false
      axios.get(`/listeParticulier/${idProdr}`)
        .then((response) => {
          var value = response.data[0]
          this.nom = value.nom
          this.prenom = value.prenom
          this.dateNais = this.dateParse(value.dateNais)
          this.sexe = value.sexe
          this.mail = value.mail
          this.tel = value.tel
          this.adresse = value.adresse
          this.idGroupe = value.idGroupe
          this.idProdr = value.idProdr
          $('#myModal').modal({backdrop: 'static'})
        })
        .catch(err => console.log(err))
    },
    showModalParticulierPerso: function (idProdr) {
      axios.get(`/listeParticulier/${idProdr}`)
        .then((response) => {
          var value = response.data[0]
          this.nom = value.nom
          this.prenom = value.prenom
          this.mail = value.mail
          this.tel = value.tel
          this.adresse = value.adresse
          $('#p_myModal').modal('show')
        })
        .catch(err => console.log(err))
    },
    modifierParticulier: function () {
      this.$v.$touch()
      if (this.$v.$pendding || this.$v.$error) {
        return
      }
      axios.patch(`/modifierParticulier/${this.idProdr}`, {
        nom: this.nom,
        prenom: this.prenom,
        dateNais: this.dateNais,
        sexe: this.sexe,
        mail: this.mail,
        tel: this.tel,
        adresse: this.adresse,
        idGroupe: this.idGroupe
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
          this.getListeParticulier()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    showModalsupParticulier: function (idProdr) {
      $('#s_myModal').modal({backdrop: 'static'})
      this.idProdr = idProdr
    },
    supprimerParticulier: function () {
      axios.delete(`/supprimerParticulier/${this.idProdr}`)
        .then(response => {
          if (response.data.etat) {
            this.$swal({
              icon: 'error',
              html: response.data.msg
            })
          } else {
            this.getListeParticulier()
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
    getListeParticulier: function () {
      axios.get('/listeParticulier')
        .then((response) => {
          this.listeParticulier = response.data
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
    chercherParticulier: function () {
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
      this.prenom = ''
      this.dateNais = ''
      this.sexe = ''
      this.mail = ''
      this.tel = ''
      this.adresse = ''
      this.idGroupe = ''
      $('#myModal').modal('hide')
      this.$v.$reset()
    },
    dateParse: function (data) {
      return moment(data).format('YYYY-MM-DD')
    },
    dateParseInv: function (data) {
      return moment(data).format('DD-MM-YYYY')
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
