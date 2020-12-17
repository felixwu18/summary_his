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


/* 最新个股下拉配置数据集 */
export function getConfigsP(params = {}) {
    return new Promise((resolve => {
        axios.get(`http://127.0.0.1:4000/latestPQuery`)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.error(err)
            })
    }))
}
/* 最新个股价 */
export function getLatestP(params = {}) {
    return new Promise((resolve => {
        params = { updateTime: Date.now(), ...params }
        const queryStr = qs.stringify(params)
        axios.get(`http://127.0.0.1:4000/latestP?${queryStr}`)
            .then(res => {
                // // const jsonD = res.data.split('(')[1].split(')')[0]
                // const data = JSON.parse(res.data)
                resolve(res.data)
            })
            .catch(err => {
                console.error(err)
            })
    }))
}

/* 最新版块价 */
export function getbkLatestP(params = {}) {
    return new Promise((resolve => {
        params = { updateTime: Date.now(), ...params }
        const queryStr = qs.stringify(params)
        axios.get(`http://127.0.0.1:4000/bkLatestPQuery?${queryStr}`)
            .then(res => {
                //  debugger
                //  const jsonD = res.data.split('(')[1].split(')')[0]
                //      const data = res.data
                const data = res.data.data
                resolve(data)
            })
            .catch(err => {
                console.error(err)
            })
    }))
}

/* 融资融券 */
export function getRZRQ() {
    return new Promise((resolve => {
        axios.get(`http://127.0.0.1:4000/rzrqQuery?updateTime=${Date.now()}`)
            .then(res => {
                //  debugger
                //  const jsonD = res.data.split('(')[1].split(')')[0]
                //      const data = res.data
                const data = res.data.result
                resolve(data)
            })
            .catch(err => {
                console.error(err)
            })
    }))
}

/* 分时价查询 三方接口 */
export function getFSP(params = {}) {
    return new Promise((resolve => {
        const queryStr = qs.stringify(params)
        axios.get(`http://127.0.0.1:4000/fenshiLatestP?${queryStr}`)
            .then(res => {
                const data = res.data.trends
                resolve(data)
            })
            .catch(err => {
                console.error(err)
            })
    }))
}

/* 分时价查询 后台缓存数据接口 */
export function getCacheFSP(params = {}) {
    return new Promise((resolve => {
        const queryStr = qs.stringify(params)
        axios.get(`http://127.0.0.1:4000/getCacheFSP?${queryStr}`)
            .then(res => {
                const data = res.data
                resolve(data)
            })
            .catch(err => {
                console.error(err)
            })
    }))
}

/* 最新分时间推送后台 */
export function pushLatestFSP(params = {}) {
    const url = `http://127.0.0.1:4000/setCacheFSP`
    axios.post(url, params)
        .then(res => {
            const data = res.data
        })
        .catch(err => {
            console.error(err)
        })
}
