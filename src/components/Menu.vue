<template>
    <div>
        <nav class="navbar">
            <ul class="navbar-nav">
                <li class="nav-item"><router-link :to="{path: '/accueil'}" class="nav-link"><i class="bx bx-home bx-sm"></i><span>Accueil</span></router-link></li>
                <li class="nav-item"><router-link :to="{path: '/region'}" class="nav-link"><i class="bx bx-objects-horizontal-left bx-sm"></i><span>Région</span></router-link></li>
                <li class="nav-item"><router-link :to="{path: '/district'}" class="nav-link"><i class="bx bx-objects-horizontal-left bx-sm"></i><span>District</span></router-link></li>
                <li class="nav-item"><router-link :to="{path: '/commune'}" class="nav-link"><i class="bx bx-objects-horizontal-left bx-sm"></i><span>Commune</span></router-link></li>
                <li class="nav-item"><router-link :to="{path: '/quartier'}" class="nav-link"><i class="bx bx-layer bx-sm"></i><span>Quartier</span></router-link></li>
                <li class="nav-item"><router-link :to="{path: '/typeproduit'}" class="nav-link"><i class="bx bx-collection bx-sm"></i><span>Type produit</span></router-link></li>
                <li class="nav-item"><router-link :to="{path: '/produit'}" class="nav-link"><i class="bx bx-cart-alt bx-sm"></i><span>Produit</span></router-link></li>
                <li class="nav-item"><router-link :to="{path: '/groupe'}" class="nav-link"><i class="bx bx-group bx-sm"></i><span>Groupe</span></router-link></li>
                <li class="nav-item"><router-link :to="{path: '/typeorganisation'}" class="nav-link"><i class="bx bx-detail bx-sm"></i><span>Type organisation</span></router-link></li>
                <li class="nav-item"><router-link :to="{path: '/organisation'}" class="nav-link"><i class="bx bx-building-house bx-sm"></i><span>Organisation</span></router-link></li>
                <li class="nav-item"><router-link :to="{path: '/particulier'}" class="nav-link"><i class="bx bx-user bx-sm"></i><span>Particulier</span></router-link></li>
                <li class="nav-item"><router-link :to="{path: '/produire'}" class="nav-link"><i class="bx bx-category bx-sm"></i><span>Produire</span></router-link></li>
                <li class="nav-item"><router-link :to="{path: '/parametre'}" class="nav-link"><i class="bx bx-cog bx-sm"></i><span>Paramétre</span></router-link></li>
                <li class="nav-item" style="cursor:pointer" v-on:click="deconnexion"><a class="nav-link"><i class="bx bx-log-out bx-sm"></i><span>Déconnexion</span></a></li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
  name: 'Menu',
  methods: {
    deconnexion: function () {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('admin')
      localStorage.removeItem('pseudo')
      localStorage.removeItem('email')
      localStorage.removeItem('idU')
      this.$router.push('/login')
    }
  }
}
</script>
<style scoped>
</style>
