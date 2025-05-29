<template>
    <div>
        <span>LISTE DU DERNIER PRODUCTION</span>
        <canvas id="myChart" width="400" height="150"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js'
import axios from '../../axios/Axios'
export default {
  name: 'BarChartPerso',
  data () {
    return {
      myChart: null
    }
  },
  mounted () {
    this.getListeDerProd()
  },
  methods: {
    getListeDerProd: function () {
      axios.get('/listeDernierProd')
        .then(response => {
          var value = response.data
          var dataDb = []
          var labelDb = []
          for (var i = 0; i < value.length; i++) {
            dataDb.push(parseInt(value[i].qte))
            labelDb.push(value[i].des + '(' + value[i].unite + ')')
          }
          var ctx = document.getElementById('myChart').getContext('2d')
          this.myChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: labelDb,
              datasets: [{
                label: '# Qté',
                data: dataDb,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.7)',
                  'rgba(255,150,0,0.7)',
                  'rgba(40, 206, 86, 0.7)',
                  'rgba(255,5,0,0.7)',
                  'rgba(255,55,150,0.7)',
                  'rgba(255,220,0,0.7)',
                  '#3B71CA',
                  'rgba(0, 159, 244, 0.7)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 0
              }]
            },
            options: {
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            }
          })
        })
        .catch(err => console.log(err))
    }
  }
}
</script>
