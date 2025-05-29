<template>
    <div>
        <span>PRODUCTEUR : {{titrePie}}</span>
        <canvas id="myChartP" width="400" height="280"></canvas>
    </div>
</template>

<script>
import axios from '../../axios/Axios'
import Chart from 'chart.js'
export default {
  name: 'BarChartPerso',
  data () {
    return {
      myChart: null,
      titrePie: ''
    }
  },
  mounted () {
    this.getListeNombreProducteur()
  },
  methods: {
    getListeNombreProducteur: function () {
      axios.get('/nombreProdGroupe')
        .then(response => {
          var value = response.data
          var dataDb = []
          var labelDb = []
          for (var i = 0; i < value.length; i++) {
            dataDb.push(parseInt(value[i].nb))
            labelDb.push(value[i].nomGroupe)
          }
          this.titrePie = this.calcul(dataDb)
          var ctx = document.getElementById('myChartP').getContext('2d')
          this.myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: labelDb,
              datasets: [{
                label: '#',
                data: dataDb,
                backgroundColor: [
                  'rgba(0, 159, 244, 0.7)',
                  'rgba(255,5,0,0.7)',
                  'rgba(255,5,0,0.7)',
                  'rgba(255,55,150,0.7)',
                  'rgba(255,220,0,0.7)',
                  '#3B71CA',
                  'rgba(0, 159, 244, 0.7)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 0
              }]
            }
          })
        })
        .catch(err => console.log(err))
    },
    calcul: function (tab) {
      var som = 0
      for (var i = 0; i < tab.length; i++) {
        som += parseInt(tab[i])
      }
      return som
    }
  }
}
</script>
