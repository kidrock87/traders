<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout align-center justify-center>
          <v-flex xs12 align-center justify-center>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Сигналы</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click.stop="settings_dialog = !settings_dialog">
                  <v-icon>settings</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
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
                <v-layout v-else  column>
                  Последние положительные сигналы
                  <v-flex xs12 sm6 d-flex>
                      <v-data-iterator
                        :items="positive_signals"
                        :rows-per-page-items="rowsPerPageItems"
                        :pagination.sync="pagination"
                        content-tag="v-layout"
                        row
                        wrap
                      >
                        <v-flex
                          slot="item"
                          slot-scope="props"

                        >

                          <v-card>
                            <v-card-title><h4>{{ props.item.pair }}</h4></v-card-title>
                            <v-divider></v-divider>
                            <v-list dense>
                              <v-list-tile>
                                <v-list-tile-content>Дата:</v-list-tile-content>
                                <v-list-tile-content class="align-end">{{ date(props.item.insert_date) }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Биржа:</v-list-tile-content>
                                <v-list-tile-content class="align-end">{{ props.item.exchange }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Средний объем:</v-list-tile-content>
                                <v-list-tile-content class="align-end">{{ props.item.average_volume }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Объем:</v-list-tile-content>
                                <v-list-tile-content class="align-end">{{ props.item.volume }}</v-list-tile-content>
                              </v-list-tile>
                            </v-list>
                          </v-card>
                          <!-- ДИАЛОГИ -->
        <v-dialog
            v-model="settings_dialog"
            width="500"
          >

            <v-card>
              <v-card-title
                class="headline grey lighten-2"
                primary-title
              >
                Настройки
              </v-card-title>

              <v-card-text>
                 Пока нет...
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  color="primary"
                  flat
                  @click="settings_dialog = false"
                >
                  Сохранить
                </v-btn>


                <v-btn
                  color="primary"
                  flat
                  @click="settings_dialog = false"
                >
                  Отменить
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
                        </v-flex>
                      </v-data-iterator>
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
      settings_dialog: false,
      pair_results: [],
      positive_signals: [],
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
        rowsPerPage: 5
      }
    }),
    async beforeMount() {
       let pp = await axios('http://68.183.64.195:3000/signals/positive');
       this.positive_signals = pp.data;
    },
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
