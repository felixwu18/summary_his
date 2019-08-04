// import Cookies from 'js-cookie';
import * as types from './type';
import { getConfigure, supportManList, fetchArea, fetchCity } from 'src/api/public'

// import {userCookieExpires} from 'src/config/limitConfig'
// Cookies.defaults.expires = userCookieExpires; //cookie持续时间


const admin = {
    state: {
        configure: null,
        configure_obj: {},
        supportManList: null,
        supportManList_obj: {},
        dx189: null,
        city: null,
        area: null,
        area_obj: {},
        layout: false,
        isReload: true,
        configure_p:null
    },


    mutations: {
        [types.SET_SP_LAYOUT]: (state, layout) => {
            layout ? state.layout = true : state.layout = false
        },
        [types.SET_CONFIGURE]: (state, configure) => {
            state.configure = configure
        },

        [types.FORMAT_CONFIGURE]: (state, data) => {
            /*
            直接修改state.configure_obj的子元素,利用计算属性无法监听到改变量的修改
            所以先清空再赋值
             */
            let tmp = state.configure_obj;
            state.configure_obj = {}
            for (let i in data) {
                if (state.configure_obj[i]) continue;
                let conf = {};
                let key = '';
                let value = '';
                let lenght = 0;
                data[i].forEach((el, index) => {
                    if (index == 0) {
                        for (let ii in el) {
                            if (lenght <= 0) {
                                key = ii;
                                ++lenght;
                            } else if (lenght == 1) {
                                value = ii
                            }
                        }
                    }

                    conf[el[key]] = el[value]
                });
                tmp[i] = conf;
                conf = {};
            }
            state.configure_obj = tmp
        },
        [types.SET_DX189]: (state, dx) => {
            state.dx189 = dx
        },
        [types.SET_CITY]: (state, city) => {
            state.city = city
        },
        [types.GET_AREA]: (state, data) => {
            state.area = data.area;
            state.area_obj = data.areaObj;
            // console.log('获取城市',state.area_obj)
        },
        [types.GET_CITY]: (state, province) => {

            state.area.every(el => {
                if (el.id === province) {
                    state.city = el.children;
                    return false
                }
                return true
            })
        },
        [types.SET_SUPPORTMANLIST]: (state, supportManList) => {
            state.supportManList = supportManList;
            supportManList.forEach(el => {
                state.supportManList_obj[el.id] = el.truename
            })
        },
        [types.RELOAD_VIEW]: (state, isReload) => {
            state.isReload = isReload
        },

    },
    getters: {
        reloadComponents: state => {
            return state.isReload
        },
        configureObj: (state) => (configName) => {
            // console.log(state.configure)
            if (state.configure) {
                if (state.configure[configName]) {
                    return state.configure[configName]
                }
            }
        }
    },

    actions: {

        /*刷新组件*/
        reloadView({ commit }) {
            commit('RELOAD_VIEW', false);
            setTimeout(function() {
                commit('RELOAD_VIEW', true)
            }, 0)

        },

        /*获取系统状态配置*/
        fetchConfigure({ commit, state }, params) {
            return new Promise((resolve, reject) => {
                getConfigure(params).then(({ data }) => {
                    commit(types.SET_CONFIGURE, data);

                    // if (data.platform) {
                    //     console.log(data.platform)
                    //     commit('SET_CONFIGURE_P', data);
                    // }
                    commit(types.FORMAT_CONFIGURE, data);
                    resolve(data)
                }).catch(() => {
                    reject()
                })
            })

        },


        /*市场支撑人员*/
        fetchSupportManList({ commit, state }) {
            return new Promise((resolve, reject) => {
                supportManList().then(({ data }) => {
                    commit(types.SET_SUPPORTMANLIST, data);
                    resolve()
                }).catch(() => {
                    reject()
                })
            })
        },

        // /*电信本地网*/
        // fetchDX({commit, state},params) {
        //   return new Promise((resolve, reject) => {
        //     fetchdx189(params).then(({data}) => {
        //         commit(types.SET_DX189, data.list)
        //         resolve()
        //       }
        //     ).catch(() => {
        //       reject()
        //     })
        //   })
        //
        // },

        /*设置省市*/
        fetchCityList({ commit, state }, params) {
            return new Promise((resolve, reject) => {
                fetchCity(params).then(({ data }) => {
                    commit(types.SET_CITY, data);
                    resolve()
                }).catch(() => {
                    reject()
                })
            })

        },

        /*获取所有省市*/
        fetchAreaList({ commit, state }) {
            if (sessionStorage.getItem('area')) {
                let area = sessionStorage.getItem('area');
                area = JSON.parse(area);
                let areaObj = sessionStorage.getItem('areaObj');
                areaObj = JSON.parse(areaObj);
                commit(types.GET_AREA, { area, areaObj });
            } else {
                return new Promise((resolve, reject) => {
                    fetchArea().then(({ data }) => {
                        let areaObj = {};
                        let area = [];
                        data.forEach(el => {
                            areaObj[el.id] = el.title;
                            if (el.fid == 0) {
                                el.children = [];
                                area.push(el)
                            }
                        });
                        area.forEach(el => {
                            data.filter(item => {
                                if (item.fid === el.id) {
                                    el.children.push(item)
                                }
                            })
                        });
                        commit(types.GET_AREA, { area, areaObj });
                        sessionStorage.setItem('area', JSON.stringify(area));
                        sessionStorage.setItem('areaObj', JSON.stringify(areaObj));
                        resolve()
                    }).catch(() => {
                        reject()
                    })
                })

            }


        },


    }
};

export default admin;