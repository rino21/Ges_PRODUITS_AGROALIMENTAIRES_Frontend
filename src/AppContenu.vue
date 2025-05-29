<template>
<div class="">
    <div class="main">
        <div class="menu container">
            <h4 class="text-primary mt-2 bg-white d-flex align-items-center shadow" style="height:50px;border-radius:10px"><i class=""><img src="./assets/logotakalou.png" height="30" width="50" alt=""></i> TAKALOU</h4>
            <Menu />
        </div>
        <div class="contenu container-fluid">
            <div class="tete_contenu row bg-white shadow">
                <div class="col-md-10">
                    <h3 class="pl-3">GESTION DES PRODUITS AGROALIMENTAIRES</h3>
                </div>
                <div class="col-md-2 d-flex align-items-center"><i class="bx bx-user-circle bx-sm"> </i><h5 class="mt-1 ml-2"> {{pseudo}}</h5></div>
            </div>
            <router-view></router-view>
        </div>
    </div>
</div>
</template>

<script>
import Menu from './components/Menu.vue'
// import $ from 'jquery'
export default {
  name: 'AppContenu',
  components: {
    Menu
  },
  data () {
    return {
      pseudo: localStorage.getItem('pseudo')
    }
  },
  mounted () {
    if (!localStorage.getItem('accessToken')) {
      this.$router.push('/login')
    }
  }
}
</script>

<style>
@font-face
{
    font-family: 'Poppins Meduim';
    src: url('./assets/Poppins/Poppins-Medium.ttf');
}

@font-face
{
    font-family: 'Poppins Bold';
    src: url('./assets/Poppins/Poppins-Bold.ttf');
}

@font-face
{
    font-family: 'Poppins Semi';
    src: url('./assets/Poppins/Poppins-SemiBold.ttf');
}

@font-face
{
    font-family: 'Poppins Light';
    src: url('./assets/Poppins/Poppins-Light.ttf');
}

@font-face
{
    font-family: 'Poppins Regular';
    src: url('./assets/Poppins/Poppins-Regular.ttf');
}
h4 {
    font-family: 'Poppins semi';
}
* {
    font-family: 'Poppins Meduim', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    font-size: 0.998em;
}

h5 {
    font-size: 1.1em;
}
body {
    margin: 0;
    height: 0;
    background-color: rgba(0, 0, 0, 0.054);
    box-sizing: border-box;
}

.menu h1 {
    font-weight: bold;
    font-family: arial;
    text-align: center;
}

.main {
    display: flex;
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
}

.menu {
    height: 100vh;
    box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.095);
    width: 16%;
    overflow-y: scroll;
    position:sticky;
    top:0px;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.8);
}

.shadow {
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.095);
}

.contenu {
    height: auto;
    width: 84%;
}

.titre-logo {
    display: flex;
    justify-content: center;
    align-items: center;
}

.tete_contenu {
    height: 8vh;
    display: flex;
    align-items: center;
    position:sticky;
    top:0px;
    z-index: 2;
}

/* .tete_contenu h1
  {
     color:#fff;
  } */
.nav-link {
    color: white;
    display: flex;
    align-items: center;
}

.nav-link .bx {
    width: 40px
}

::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.35);
    border-radius: 2px;
}

input[type='text'] {
    font-size: .95em;
}
option {
    font-size: .8em;
}
nav ul .nav-link
{
    /* width:175px;
    text-align: center;
    border-top-left-radius: 5px; */
    color: rgba(255, 255, 255, 0.8)
}
.nav-link:hover
{
    /* transition-duration: 0.5s; */
    /* background-color: rgba(0, 0, 0, 0.094); */
    /* border-right: 3px solid dodgerblue; */
    color:rgba(255, 255, 255, 1)
}
/*::-webkit-scrollbar-thumb:hover
  {
  background: linear-gradient(transparent,#f00);
  } */
.contenu-dynamique {
    position: relative;
    z-index: 1;
}

</style>
