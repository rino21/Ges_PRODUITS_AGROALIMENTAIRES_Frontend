<template>
    <div class="container-fluid contenu-login">
      <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-10 mt-5">
          <div class="card mt-5">
            <div class="card-body contenu-login-inside">
              <div class="row">
                <div class="col-md-5">
                  <form v-on:submit.prevent="loginUser">
                      <h5 class="text-center mb-4">CONNEXION</h5>
                      <div class="col-12 form-group">
                        <label class="col-form-label col-formlabel-lg">Email</label>
                        <input type="text" placeholder="Email" v-model.trim="$v.email.$model" :class="{'is-invalid': validationStatus($v.email)}" class="form-control form-control-lg">
                        <div v-if="!$v.email.required" class="invalid-feedback">Email invalide !</div>
                        <div v-if="!$v.email.email" class="invalid-feedback">Email invalide !</div>
                      </div>
                      <div class="col-12 form-group">
                        <label class="col-form-label col-formlabel-lg">Mot de passe</label>
                        <input type="password" placeholder="Mot de passe" v-model.trim="$v.mdp.$model" :class="{'is-invalid': validationStatus($v.mdp)}" class="form-control form-control-lg">
                        <div v-if="!$v.mdp.required" class="invalid-feedback">Mot de passe invalide !</div>
                      </div>
                      <div class="row d-flex align-items-center mt-4">
                        <div class="col-6">
                          <div class="col-12 form-group">
                            <input type="submit" value="Connexion" class="btn btn-primary">
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="col-12 form-group">
                            <router-link to="/sendEmail" class="text-center">Mot de passe oublié ?</router-link>
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
  name: 'Login',
  data () {
    return {
      email: '',
      mdp: ''
    }
  },
  validations: {
    email: { required, email },
    mdp: { required }
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
    loginUser: function () {
      this.$v.$touch()
      if (this.$v.$pendding || this.$v.$error) {
        return
      }
      axios.post('/login', {
        email: this.email,
        mdp: this.mdp
      }).then(response => {
        if (response.data.stat) {
          localStorage.setItem('accessToken', response.data.accessToken)
          localStorage.setItem('refreshToken', response.data.refreshToken)
          localStorage.setItem('admin', parseInt(response.data.user.admin))
          localStorage.setItem('pseudo', response.data.user.pseudo)
          localStorage.setItem('email', response.data.user.email)
          localStorage.setItem('idU', response.data.user.idU)
          this.$router.push('/accueil')
        }
      }).catch(err => {
        if (err.code === 'ERR_BAD_REQUEST') {
          this.mdp = ''
          this.email = ''
        }
      })
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
