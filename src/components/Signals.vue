<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout align-center justify-center>
          <v-flex xs12>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Сигналы</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <span class="group pa-2">
                    <v-icon>home</v-icon>Сигналов за неделю: 0
                </span>
                <v-layout>
                  <v-flex xs12 sm6 d-flex>
                     <v-select
                       :items="exchange"
                       label="Биржа"
                       outline
                     ></v-select>
                   </v-flex>
                   <v-flex xs12 sm6 d-flex>
                      <v-select
                        :disabled="pair_disabled"
                        :items="items"
                        label="Пара"
                        outline
                      ></v-select>
                  </v-flex>


                </v-layout>
              </v-card-text>
              <!--<v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary">Login</v-btn>
              </v-card-actions>-->
            </v-card>
          </v-flex>
        </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'

// function getValueA(coin){
//   axio
// }
//
// function intersect(a, b) {
//     var d = {};
//     var results = [];
//     for (var i = 0; i < b.length; i++) {
//         d[b[i]] = true;
//     }
//     for (var j = 0; j < a.length; j++) {
//         if (d[a[j]])
//             results.push(a[j]);
//     }
//     return results;
// }


// async function get_data(coin1, coin2){
//   const res = await axios('http://68.183.64.195:3000/tickers/bitfinex/t'+coin1);
//   const res1 = await axios('http://68.183.64.195:3000/tickers/bitfinex/t'+coin2);
//   let map = {};
//   let map1 = {};
//
//   res.data.map( i => {
//     map = {...map, [new Date(Math.ceil((i.insert_date/100))*100*1000).toString()]: i.ask_price};
//   });
//
//   res1.data.map( i => {
//     map1 = {...map1, [new Date(Math.ceil((i.insert_date/100))*100*1000).toString()]: i.ask_price};
//   });
//
//
//   let dates = intersect(Object.keys(map),Object.keys(map1));
//
//   let result = {};
//   dates.map(i => {
//       result[i] = map[i] - map1[i];
//
//   });
//
//   let aaa = [
//     {name: coin1, data: map},
//     {name: coin2, data: map1},
//     {name: 'Корреляция', data: result}
//
//   ]
  //взять данные из аксиос
  //посчитать корреляцию
  //добавить в chartData
//  return aaa;
//}
export default {
    data: () => ({
      reviews: 413,
      value: 4.5,
      pairs: '',
      exchange: ['OKEX'],
      pair_disabled: true
    })
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
