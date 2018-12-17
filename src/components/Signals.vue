<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout align-center justify-center>
          <v-flex xs12 align-center justify-center>
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
                        v-on:change="change_exchange(ex_value)"
                        v-model="ex_value"
                       :items="exchange"
                       label="Биржа"
                       outline
                     ></v-select>
                   </v-flex>
                 </v-layout>
                 <v-layout>
                   <v-flex xs12 sm6 d-flex>
                      <v-select
                        v-on:change="change_pair(pair_value)"
                        v-model="pair_value"
                        :disabled="pair_disabled"
                        :items="pairs"
                        label="Пара"
                        outline
                      ></v-select>
                  </v-flex>
                </v-layout>

                <v-layout v-if="show_pairs_data">
                  <v-flex xs12 sm6 d-flex>
                    <v-data-table
                    :headers="headers"
                    :items="pair_results"
                    class="elevation-1"
                    >
                    <template slot="items" slot-scope="props">
                      <td>{{ props.item.pair }}</td>
                      <td class="text-xs-right">{{ props.item.exchange }}</td>
                      <td class="text-xs-right">{{ props.item.average_volume }}</td>
                      <td class="text-xs-right">{{ props.item.volume }}</td>
                      <td class="text-xs-right">{{ props.item.signal }}</td>
                      <td class="text-xs-right">{{ date(props.item.insert_date) }}</td>
                    </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
                <v-layout v-else>
                      <v-data-iterator
                        :items="items"
                        :rows-per-page-items="rowsPerPageItems"
                        :pagination.sync="pagination"
                        content-tag="v-layout"
                        row
                        wrap
                      >
                        <v-flex
                          slot="item"
                          slot-scope="props"
                          xs12
                          sm6
                          md4
                          lg3
                        >
                          <v-card>
                            <v-card-title><h4>{{ props.item.name }}</h4></v-card-title>
                            <v-divider></v-divider>
                            <v-list dense>
                              <v-list-tile>
                                <v-list-tile-content>Calories:</v-list-tile-content>
                                <v-list-tile-content class="align-end">{{ props.item.calories }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Fat:</v-list-tile-content>
                                <v-list-tile-content class="align-end">{{ props.item.fat }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Carbs:</v-list-tile-content>
                                <v-list-tile-content class="align-end">{{ props.item.carbs }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Protein:</v-list-tile-content>
                                <v-list-tile-content class="align-end">{{ props.item.protein }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Sodium:</v-list-tile-content>
                                <v-list-tile-content class="align-end">{{ props.item.sodium }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Calcium:</v-list-tile-content>
                                <v-list-tile-content class="align-end">{{ props.item.calcium }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Iron:</v-list-tile-content>
                                <v-list-tile-content class="align-end">{{ props.item.iron }}</v-list-tile-content>
                              </v-list-tile>
                            </v-list>
                          </v-card>
                        </v-flex>
                      </v-data-iterator>
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
import moment from 'moment'

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
      ex_value: '',
      pair_value: '',
      value: 4.5,
      pairs: [],
      exchange: ['okex'],
      pair_disabled: true,
      show_pairs_data: false,
      pair_results: [],
      headers: [
          {
            text: 'Пара',
            align: 'left',
            sortable: false,
            value: 'pair'
          },
          { text: 'Биржа', value: 'exchange' },
          { text: 'Ср. объем 12ч', value: 'average_volume' },
          { text: 'Объем', value: 'volume' },
          { text: 'Сигнал', value: 'signal' },
          { text: 'Дата', value: 'insert_date' }
        ],








        rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      },
      items: [
        {
          value: false,
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%'
        },
        {
          value: false,
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%'
        },
        {
          value: false,
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: '6%',
          iron: '7%'
        },
        {
          value: false,
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%'
        },
        {
          value: false,
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: '7%',
          iron: '16%'
        },
        {
          value: false,
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: '0%',
          iron: '0%'
        },
        {
          value: false,
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: '0%',
          iron: '2%'
        },
        {
          value: false,
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: '0%',
          iron: '45%'
        },
        {
          value: false,
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: '2%',
          iron: '22%'
        },
        {
          value: false,
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: '12%',
          iron: '6%'
        }
      ]




    }),
    methods: {
      date(item) {
        return moment.unix(item/1000).format("HH:mm DD/MM/YYYY");
      },
      async change_exchange(exchange) {
          //console.log(this.pair_disabled)
          //console.log(exchange);
          let pp = await axios('http://68.183.64.195:3000/signals/'+exchange);
          if(pp.data.length > 1){
            this.pairs = pp.data;
            this.pair_disabled = false;
            //console.log(this.pair_disabled)
          }
      },
      async change_pair(exchange) {
        console.log(this.pair_disabled)
          //console.log(exchange);
          let pp = await axios('http://68.183.64.195:3000/signals/'+this.ex_value+'/'+exchange);
          this.pair_results = pp.data;
          this.show_pairs_data = true;
          //console.log(pp);
      }
    },
    name: 'HelloWorld'
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
