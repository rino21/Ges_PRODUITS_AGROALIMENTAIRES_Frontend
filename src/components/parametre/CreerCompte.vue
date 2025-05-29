<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <h5 class="d-flex align-items-center"><span class="text-primary">Paramétre</span><i class="bx bx-chevron-right bx-sm"></i> <span  data-toggle="collapse" data-target="#creer" style="cursor:pointer">Création d'un compte</span></h5>
                <div id="creer" class="collapse">
                <form action="" v-on:submit.prevent="submitCreerUtilisateur">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-5 form-group">
                                    <label class="col-form-label col-formlabel-lg">Pseudo<span class="textdanger">*</span></label>
                                    <input type="text" placeholder="Pseudo" v-model.trim="$v.pseudo.$model" :class="{'is-invalid': validationStatus($v.pseudo)}" class="form-control form-control-lg">
                                    <div v-if="!$v.pseudo.required" class="invalid-feedback">
                                        Remplissez le champs de pseudo !
                                    </div>
                                </div>
                                <div class="col-5 form-group">
                                    <label class="col-form-label col-formlabel-lg">Email<span class="textdanger">*</span></label>
                                    <input type="email" placeholder="exemple@gmail.com" v-model.trim="$v.email.$model" :class="{'is-invalid': validationStatus($v.email)}" class="form-control form-control-lg">
                                    <div v-if="!$v.email.required" class="invalid-feedback">
                                        Remplissez le champs de l'email
                                    </div>
                                    <div v-if="!$v.email.email" class="invalid-feedback">
                                        ''email n'est pas validé !
                                    </div>
                                </div>
                                <div class="col-2 form-group">
                                    <label class="col-form-label col-formlabel-lg">.</label><br>
                                    <input type="submit" value="Créer" class="btn btn-primary btn-block">
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../../axios/Axios'
// import $ from 'jquery'
import { required, email } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      email: '',
      pseudo: '',
      idU: ''
    }
  },
  validations: {
    email: { required, email },
    pseudo: { required }
  },
  mounted () {
  },
  methods: {
    validationStatus: function (validation) {
      return typeof validation !== 'undefined' ? validation.$error : false
    },
    submitCreerUtilisateur: function () {
      this.$v.$touch()
      if (this.$v.$pendding || this.$v.$error) {
        return
      }
      axios.post('/creerUtilisateur', {
        email: this.email,
        pseudo: this.pseudo,
        mdp: 'admin',
        admin: '0'
      }).then(response => {
        console.log(response)
        if (response.data.etat) {
          this.$swal({
            icon: 'success',
            html: response.data.msg,
            showConfirmButton: false,
            timer: 1100
          })
        } else {
          this.$swal({
            icon: 'error',
            html: response.data.msg
          })
        }
      }).catch(err => {
        console.log(err)
      })
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
