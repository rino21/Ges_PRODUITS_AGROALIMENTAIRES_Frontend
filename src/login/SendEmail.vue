<template>
    <div class="container-fluid contenu-login">
      <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-10 mt-5">
          <div class="card mt-5">
            <div class="card-body contenu-login-inside">
              <div class="row">
                <div class="col-md-5">
                  <form>
                      <h5 class="text-center mb-4">MOT DE PASSE OUBLIE</h5>
                      <div class="col-12 form-group">
                        <label class="col-form-label col-formlabel-lg">Email</label>
                        <input type="text" placeholder="Email" v-model.trim="$v.email.$model" :class="{'is-invalid': validationStatus($v.email)}" class="form-control form-control-lg">
                        <div v-if="!$v.email.required" class="invalid-feedback">Email invalide !</div>
                        <div v-if="!$v.email.email" class="invalid-feedback">Email invalide !</div>
                      </div>
                      <div class="row d-flex align-items-center mt-4">
                        <div class="col-6">
                          <div class="col-12 form-group d-flex align-items-center">
                            <button class="btn btn-primary d-flex align-items-center" type="button" v-on:click.prevent="sendEmail">
                              <span v-if="showIcon" class="spinner-grow spinner-grow-sm mr-2" role="status" aria-hidden="true"></span>
                              Envoyer
                            </button>
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="col-12 form-group">
                            <router-link to="/login" class="text-center">Page de connexion</router-link>
                          </div>
                        </div>
                      </div>
                  </form>
                </div>
                <div class="col-md-7 login-aside">
                  <img src="../assets/lalaina.jpg" alt="" width="100%" height="100%">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-1"></div>
      </div>
    </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import axios from '../axios/Axios'

export default {
  name: 'SendEmail',
  data () {
    return {
      email: '',
      showIcon: false
    }
  },
  validations: {
    email: { required, email }
  },
  mounted () {
    let accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      this.$router.push('/accueil')
    }
  },
  methods: {
    validationStatus: function (validation) {
      return typeof validation !== 'undefined' ? validation.$error : false
    },
    sendEmail: function () {
      this.$v.$touch()
      if (this.$v.$pendding || this.$v.$error) {
        return
      }
      this.showIcon = true
      axios.post('/email', {
        email: this.email
      }).then(response => {
        if (response.data.etat) {
          this.$swal({
            icon: 'success',
            html: response.data.msg
          })
          this.showIcon = false
          this.email = ''
          this.$v.$reset()
        } else {
          this.showIcon = false
          this.$swal({
            icon: 'error',
            html: response.data.msg
          })
        }
      }).catch(err => { console.log(err) })
    }
  }
}
</script>
<style scoped>
 @font-face
{
    font-family: 'Poppins Meduim';
    src: url('../assets/Poppins/Poppins-Medium.ttf');
}

@font-face
{
    font-family: 'Poppins Bold';
    src: url('../assets/Poppins/Poppins-Bold.ttf');
}

@font-face
{
    font-family: 'Poppins Semi';
    src: url('../assets/Poppins/Poppins-SemiBold.ttf');
}

@font-face
{
    font-family: 'Poppins Light';
    src: url('../assets/Poppins/Poppins-Light.ttf');
}

@font-face
{
    font-family: 'Poppins Regular';
    src: url('../assets/Poppins/Poppins-Regular.ttf');
}

h3.titre-h2 {
    font-family: 'Poppins semi', sans-serif;
    font-size: 1.8em;
}
h5 {
    font-family: 'Poppins Meduim', sans-serif;
    font-size: 2em;
}

button {
    font-family: 'Poppins Regular';
}
* {
    font-family: 'Poppins Meduim', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    font-size: 0.996em;
}

.contenu-login {
  height: 100vh;
  width: 100%;
  background-image: url('../assets/fond.png');
  background-repeat: no-repeat;
  background-size: cover;
}
 select,input[type='number'],input[type='password'],input[type='text'],input[type='email']
  {
    height: 40px;
    font-size: 1em;
  }
  .shadow {
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.095);
  }
/*
.contenu-login-inside {
  height: 70vh;
} */
.login-aside {
  height: 60vh;
  /* background-image: url('../assets/lalaina.jpg');
  background-repeat: no-repeat;
  background-size: cover; */
}
</style>
