import Vue from 'vue'

import Accueil from '../components/accueil/Accueil.vue'
import Region from '../components/region/Region.vue'
import District from '../components/district/District.vue'
import Commune from '../components/commune/Commune.vue'
import Quartier from '../components/quartier/Quartier.vue'
import TypeProduit from '../components/typeproduit/TypeProduit.vue'
import Produit from '../components/produit/Produit.vue'
import Groupe from '../components/groupe/Groupe.vue'
import TypeOrganisation from '../components/typeproducteur/TypeProducteur.vue'
import Organisation from '../components/organisation/Organisation.vue'
import Particulier from '../components/particulier/Particulier.vue'
import Produire from '../components/produire/Produire.vue'
import Parametre from '../components/parametre/Parametre.vue'
import AppContenu from '../AppContenu.vue'
import Login from '../login/Login.vue'
import SendEmail from '../login/SendEmail.vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: AppContenu,
      children: [
        {path: '/accueil', name: 'accueil', component: Accueil},
        {path: '/region', name: 'region', component: Region},
        {path: '/district', name: 'district', component: District},
        {path: '/commune', name: 'commune', component: Commune},
        {path: '/quartier', name: 'fokotany', component: Quartier},
        {path: '/typeproduit', name: 'typeproduit', component: TypeProduit},
        {path: '/produit', name: 'produit', component: Produit},
        {path: '/groupe', name: 'groupe', component: Groupe},
        {path: '/typeorganisation', name: 'typeorganisation', component: TypeOrganisation},
        {path: '/organisation', name: 'organisation', component: Organisation},
        {path: '/particulier', name: 'particuler', component: Particulier},
        {path: '/produire', name: 'produire', component: Produire},
        {path: '/parametre', name: 'parametre', component: Parametre}
      ]
    },
    {path: '/login', name: 'login', component: Login},
    {path: '/sendEmail', name: 'sendEmail', component: SendEmail}

  ],
  mode: 'history',
  base: '/'
})
