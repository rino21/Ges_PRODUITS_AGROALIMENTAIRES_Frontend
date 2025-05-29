<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <h5 class="d-flex align-items-center"><span class="text-primary">Paramétre</span><i class="bx bx-chevron-right bx-sm"></i> <span  data-toggle="collapse" data-target="#creerM" style="cursor:pointer">Changer le mot de passe</span></h5>
                <div id="creerM" class="collapse">
                <form action="" v-on:submit.prevent="submitMot">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-5 form-group">
                                    <label class="col-form-label col-formlabel-lg">Ancien mot de passe<span class="textdanger">*</span></label>
                                    <input type="password" placeholder="Ancien mot de passe" v-model.trim="$v.mdp.$model" :class="{'is-invalid': validationStatus($v.mdp)}" class="form-control form-control-lg">
                                    <div v-if="!$v.mdp.required" class="invalid-feedback">
                                        Remplissez le champs de l'ancien mot de passe !
                                    </div>
                                </div>
                                <div class="col-5 form-group">
                                    <label class="col-form-label col-formlabel-lg">Nouveau mot de passe<span class="textdanger">*</span></label>
                                    <input type="password" placeholder="Nouveau mot de passe" v-model.trim="$v.mdpN.$model" :class="{'is-invalid': validationStatus($v.mdpN)}" class="form-control form-control-lg">
                                    <div v-if="!$v.mdpN.required" class="invalid-feedback">
                                        Remplissez le champs du mot de passe !
                                    </div>
                                    <div v-if="!$v.mdpN.minLength" class="invalid-feedback">
                                        Le mot de passe doit être 6 caractéres au moins !
                                    </div>
                                </div>
                                <div class="col-2 form-group">
                                    <label class="col-form-label col-formlabel-lg">.</label><br>
                                    <input type="submit" value="Changer" class="btn btn-primary btn-block">
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
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'MotPasse',
  data () {
    return {
      mdp: '',
      mdpN: '',
      idU: localStorage.getItem('idU')
    }
  },
  validations: {
    mdp: { required },
    mdpN: { required, minLength: minLength(6) }
  },
  mounted () {
  },
  methods: {
    validationStatus: function (validation) {
      return typeof validation !== 'undefined' ? validation.$error : false
    },
    submitMot: function () {
      this.$v.$touch()
      if (this.$v.$pendding || this.$v.$error) {
        return
      }
      axios.patch(`/modifierMotPasse/${this.idU}`, {
        mdp: this.mdp,
        mdpN: this.mdpN
      }).then(response => {
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
select,input[type='text'],input[type='email'],input[type='number'],input[type='password']
  {
    height: 42px;
    font-size: 1em;
  }
</style>
