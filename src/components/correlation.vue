<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
              <v-dialog
                  v-model="dialog"
                  width="500"
                >
                  <v-btn
                    slot="activator"
                    color="red lighten-2"
                    dark
                  >
                    Выбрать валюты
                  </v-btn>

                  <v-card>
                    <v-card-title
                      class="headline grey lighten-2"
                      primary-title
                    >
                      Выбрать валюты
                    </v-card-title>

                    <v-card-text>
                         <v-flex xs12 sm6 d-flex>
                           <v-select
                             @click="Get_correlation(item.contactID)"
                             v-model="crypto1"
                             :items="cryptos"
                             label="1-я пара"
                           ></v-select>
                         </v-flex>

                         <v-flex xs12 sm6 d-flex>
                           <v-select
                             @click="Get_correlation(item.contactID)"
                             v-model="crypto2"
                             :items="cryptos"
                             label="2-я пара"
                           ></v-select>
                         </v-flex>

                         <v-btn  @click="create_chart" color="error">Старт</v-btn>


                    </v-card-text>

                    <v-divider></v-divider>


                  </v-card>
              </v-dialog>
          <line-chart :data="chartData" height="800px" :library="options"></line-chart>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
import ChartJsPluginZoom from 'chartjs-plugin-zoom';
import VueChartkick from 'vue-chartkick'
import axios from 'axios'
import Chart from 'chart.js'
import Vue from 'vue'


function intersect(a, b) {
    var d = {};
    var results = [];
    for (var i = 0; i < b.length; i++) {
        d[b[i]] = true;
    }
    for (var j = 0; j < a.length; j++) {
        if (d[a[j]])
            results.push(a[j]);
    }
    return results;
}


async function get_data(coin1, coin2){
  const res = await axios('http://68.183.64.195:3000/tickers/bitfinex/t'+coin1);
  const res1 = await axios('http://68.183.64.195:3000/tickers/bitfinex/t'+coin2);
  let map = {};
  let map1 = {};

  res.data.map( i => {
    map = {...map, [new Date(Math.ceil((i.insert_date/100))*100*1000).toString()]: i.ask_price};
  });

  res1.data.map( i => {
    map1 = {...map1, [new Date(Math.ceil((i.insert_date/100))*100*1000).toString()]: i.ask_price};
  });


  let dates = intersect(Object.keys(map),Object.keys(map1));

  let result = {};
  dates.map(i => {
      result[i] = Math.abs(map[i] - map1[i]);

  });

  let aaa = [
    {name: coin1, data: map},
    {name: coin2, data: map1},
    {name: 'Корреляция', data: result}

  ]
  //взять данные из аксиос
  //посчитать корреляцию
  //добавить в chartData
  return aaa;
}

Vue.use(ChartJsPluginZoom)
Vue.use(VueChartkick, {adapter: Chart})
export default {
  data() {
      return {
        dialog: '',
        chartData: [],
        options: {
          pan: {
            enabled: true,
            mode: 'xy'
          },
          zoom: {
            enabled: true,
            mode: 'xy'
          },
          legend: {
  					display: true
  				},
        },
        crypto1: '',
        crypto2: '',
        cryptos: []
      }
  },
  async beforeMount() {
     let cryptos = await axios('http://68.183.64.195:3000/signals/okex');
     console.log(cryptos)
     this.cryptos = cryptos.data;


     //get_data('BTCUSD', 'ETHUSD').then(aaa => {
     //   this.chartData = aaa;
     //});
  },
  methods: {
    async create_chart() {
      let lp1 = await axios('http://68.183.64.195:3000/signals/okex/'+this.crypto1);
      let lp2 = await axios('http://68.183.64.195:3000/signals/okex/'+this.crypto2);

      let ask1 = lp1.data[0].ask_price;
      let ask2 = lp2.data[0].ask_price;

      var coin1, coin2 = '';
      if(ask1 > ask2){
         coin1 = this.crypto1;
         coin2 = this.crypto2;
      }else{
         coin1 = this.crypto2;
         coin2 = this.crypto1;
      }

      get_data(coin1, coin2).then(aaa => {
          this.chartData = aaa;
      });


    }
  },


  name: 'correlation'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
