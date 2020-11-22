import fetch from '@/plugins/interceptorAxios';
import axios from 'axios'
import qs from 'qs';

const config = {
    proxy: 'api'
}

// 最新price
// export function getLatestP(params = {}) {
// console.log(fetch,  11111);
//    return fetch({
//       url: 'priceP',
//       params,
//       ...config
//     });
// }
export function getLatestP(params = {}) {
   return new Promise((resolve => {
                   params = {updateTime: Date.now(), ...params}
                   const queryStr = qs.stringify(params)
           axios.get(`http://127.0.0.1:4000/latestP?${queryStr}`)
                .then(res => {
                const jsonD = res.data.split('(')[1].split(')')[0]
                //      const data = res.data
                const data = JSON.parse(jsonD)
                     resolve(data)                  
                })
   }))             
 }

 export function getConfigsP(params = {}) {
     return new Promise((resolve => {
                axios.get(`http://127.0.0.1:4000/latestPQuery`)
                .then(res => {
                    resolve(res.data)                  
                })
     }))             
}