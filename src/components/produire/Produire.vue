<template>
  <div>
    <div class="modal fade" id="s_myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">SUPRESSION DE LA PRODUCTION</h4>
          </div>
          <div class="modal-body">
            <p>Voulez vous vraiment la supprimer ?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" v-on:click="supprimerProduire()">Oui</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal">Non</button>
          </div>
        </div>
      </div>
    </div>
    <!------------------------------------------modal ajout Produire ------------------------>
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
                        <label class="col-form-label col-formlabel-lg">Producteur <span class="textdanger">*</span></label>
                        <select v-model.trim="$v.idProdr.$model" :class="{'is-invalid': validationStatus($v.idProdr)}" class="form-control form-control-lg">
                        <option value="">Selectionnez un producteur</option>
                        <option :value="value.idProdr" v-for = "(value, index) in listeProducteur" :key = "index">PRODC{{ value.idProdr}}-{{ value.nom }}-{{value.nomGroupe}}</option>
                        </select>
                        <div v-if="!$v.idProdr.required" class="invalid-feedback">Selectionnez un producteur !</div>
                    </div>
                    <div class="col-12 form-group">
                        <label class="col-form-label col-formlabel-lg">Quartier <span class="textdanger">*</span></label>
                        <select v-model.trim="$v.idFkt.$model" :class="{'is-invalid': validationStatus($v.idFkt)}" class="form-control form-control-lg">
                        <option value="">Selectionnez un quartier</option>
                        <option :value="value.idFkt" v-for = "(value, index) in listeQuartier" :key = "index">{{ value.nomFkt }}-{{value.nomComm}}</option>
                        </select>
                        <div v-if="!$v.idFkt.required" class="invalid-feedback">Selectionnez un quartier !</div>
                    </div>
                    <div class="col-12 form-group">
                        <label class="col-form-label col-formlabel-lg">Nom de produit <span class="textdanger">*</span></label>
                        <select v-model.trim="$v.idProd.$model" :class="{'is-invalid': validationStatus($v.idProd)}" class="form-control form-control-lg">
                        <option value="">Selectionnez un produit</option>
                        <option :value="value.idProd" v-for = "(value, index) in listeProduit" :key = "index">P{{ value.idProd }}-{{ value.designation }}</option>
                        </select>
                        <div v-if="!$v.idProd.required" class="invalid-feedback">Selectionnez un prouit !</div>
                    </div>
                    <div class="col-12 form-group">
                        <label class="col-form-label col-formlabel-lg">Unité <span class="textdanger">*</span></label>
                        <input type="text" placeholder="Entrez l'unité (Kg,t,lt)" v-model.trim="$v.unite.$model" :class="{'is-invalid': validationStatus($v.unite)}" class="form-control form-control-lg">
                        <div v-if="!$v.unite.required" class="invalid-feedback">Remplissez le champs de l'unité !</div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="col-12 form-group">
                        <label class="col-form-label col-formlabel-lg">Qté <span class="textdanger">*</span></label>
                        <input type="number" placeholder="Qté de produit" v-model.trim="$v.qteProd.$model" :class="{'is-invalid': validationStatus($v.qteProd)}" class="form-control form-control-lg">
                        <div v-if="!$v.qteProd.required" class="invalid-feedback">Remplissez le champs de la quantité !</div>
                    </div>
                    <div class="col-12 form-group">
                      <label class="col-form-label col-formlabel-lg">Prix <span class="textdanger">*</span></label>
                      <input type="number" placeholder="Entrez la prix du produit" v-model.trim="$v.pu.$model" :class="{'is-invalid': validationStatus($v.pu)}" class="form-control form-control-lg">
                      <div v-if="!$v.pu.required" class="invalid-feedback">Remplissez le champs de la prix de produit !</div>
                    </div>
                    <div class="col-12 form-group">
                        <label class="col-form-label col-formlabel-lg">Date de la production <span class="textdanger">*</span></label>
                        <input type="date" placeholder="" v-model.trim="$v.dateProd.$model" :class="{'is-invalid': validationStatus($v.dateProd)}" class="form-control form-control-lg">
                        <div v-if="!$v.dateProd.required" class="invalid-feedback">Remplissez le champs la date de la production !</div>
                    </div>
                    <div class="col-12 form-group">
                      <label class="col-form-label col-formlabel-lg">Date d'expiration <span class="textdanger">*</span></label>
                      <input type="date" placeholder="Entrez la prix du produit" v-model.trim="$v.dateExp.$model" :class="{'is-invalid': validationStatus($v.dateExp)}" class="form-control form-control-lg">
                      <div v-if="!$v.dateExp.required" class="invalid-feedback">Remplissez le champs de la date d'expiration !</div>
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
                <input type="button" v-if="ajouter"  value="Ajouter" v-on:click.prevent="submitProduire()" class="btn btn-primary btn-block">
                <input type="button" v-if="!ajouter"  value="Modfier" v-on:click.prevent="modifierProduire()" class="btn btn-primary btn-block">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid mt-3 contenu-dynamique">
      <div class="row">
        <div class="col-2">
          <button class="btn btn-primary btn-block" v-on:click="showModalAjoutProduire()"> Ajouter</button>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-12 bg-white shadow" style="padding:20px; border-radius:3px">
          <div class="row">
            <div class="col-md-8 d-flex align-items-center">
              <h5 class="d-flex align-items-center"><span class="text-primary">Produire</span><i class="bx bx-chevron-right bx-sm"></i> Listes des production </h5>
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
                  <th >Producteur</th>
                  <th >Produit</th>
                  <th >Quartier</th>
                  <th >Unité</th>
                  <th >Qté</th>
                  <th >Prix</th>
                  <th >Date Prod</th>
                  <th >Date Exp</th>
                  <th >Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for = "(value, index) in listeProduire" :key = "index" align="center">
                  <td>PRODC{{ value.idProdr}}-{{value.nom}}-{{value.nomGroupe}}</td>
                  <td>P{{ value.idProd }} - {{ value.designation }}</td>
                  <td>{{ value.nomFkt }}-{{value.nomComm}}</td>
                  <td>{{ value.unite }}</td>
                  <td>{{ value.qteProd }}</td>
                   <td>{{ value.pu }}</td>
                  <td>{{ dateParse(value.dateProd) }}</td>
                  <td>{{ dateParse(value.dateExp) }}</td>

                  <td>
                    <button class="btn btn-danger" v-on:click="showModalsupProduire(value.id)"><i class="bx bxs-trash"></i></button>
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
import moment from 'moment'
export default {
  name: 'Commune',
  data () {
    return {
      idProdr: '',
      idProd: '',
      idFkt: '',
      unite: '',
      qteProd: '',
      dateProd: '',
      pu: '',
      dateExp: '',
      ajouter: false,
      titre: '',
      id: '',
      listeProduire: null,
      listeProduit: null,
      listeQuartier: null,
      listeProducteur: null
    }
  },
  validations: {
    idProdr: { required },
    idProd: { required },
    idFkt: { required },
    unite: { required },
    pu: { required },
    dateExp: { required },
    qteProd: { required },
    dateProd: { required }
  },
  mounted () {
    this.getListeProduire()
    this.chercherProduire()
    this.getListeProduit()
    this.getListeProducteur()
    this.getListeQuartier()
  },
  methods: {
    validationStatus: function (validation) {
      return typeof validation !== 'undefined' ? validation.$error : false
    },
    showModalAjoutProduire: function () {
      $('#myModal').modal({backdrop: 'static'})
      $('#message_myModal').modal('hide')
      this.titre = 'AJOUT PRODUCTION'
      this.ajouter = true
    },
    submitProduire: function () {
      this.$v.$touch()
      if (this.$v.$pendding || this.$v.$error) {
        return
      }
      axios.post('/ajoutProduire', {
        idProdr: this.idProdr,
        idProd: this.idProd,
        idFkt: this.idFkt,
        unite: this.unite,
        qteProd: this.qteProd,
        pu: this.pu,
        dateExp: this.dateExp,
        dateProd: this.dateProd
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
          this.getListeProduire()
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
    showModalsupProduire: function (id) {
      $('#s_myModal').modal({backdrop: 'static'})
      this.id = id
    },
    supprimerProduire: function () {
      axios.delete(`/supprimerProduire/${this.id}`)
        .then(response => {
          if (response.data.etat) {
            this.$swal({
              icon: 'error',
              html: response.data.msg
            })
          } else {
            this.getListeProduire()
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
    getListeProduire: function () {
      axios.get('/listeProduire')
        .then((response) => {
          this.listeProduire = response.data
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
    getListeProducteur: function () {
      axios.get('/listeProducteur')
        .then((response) => {
          this.listeProducteur = response.data
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
    chercherProduire: function () {
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
      this.idProdr = ''
      this.idProd = ''
      this.idFkt = ''
      this.unite = ''
      this.qteProd = ''
      this.dateProd = ''
      this.pu = ''
      this.dateExp = ''
      $('#myModal').modal('hide')
      this.$v.$reset()
    },
    dateParse: function (data) {
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
