<template>
  <div>
    <div class="container-fluid mt-3 contenu-dynamique">
      <div class="row mt-3">
        <div v-if="admin === 1" class="col-md-12 bg-white shadow" style="padding:20px; border-radius:3px">
          <CreerCompte />
        </div>
        <div class="col-md-12 bg-white shadow mt-3" style="padding:20px; border-radius:3px">
          <ModifierUser />
        </div>
        <div class="col-md-12 bg-white shadow mt-3" style="padding:20px; border-radius:3px">
          <MotPasse />
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import CreerCompte from './CreerCompte.vue'
import MotPasse from './MotPasse.vue'
import ModifierUser from './modifierUtilisateur.vue'
export default {
  name: 'Parametre',
  data () {
    return {
      admin: parseInt(localStorage.getItem('admin'))
    }
  },
  components: { CreerCompte, MotPasse, ModifierUser }
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
