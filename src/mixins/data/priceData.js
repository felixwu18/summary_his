/**
 * 比亚迪
 */
import { accumulator } from '@/utils/accumulator'
export default {
    data() {
        console.log(666)
        return {
            dataObj: {
                byd: {
                    // name: '比亚迪',
                    // klines: ["2020-05-27,59.60,57.30,59.95,57.07,113617,662802624.00,4.94,-1.72,-1.00,1.00",
                    //     "2020-05-28,57.35,57.48,58.23,56.40,86300,494679184.00,3.19,0.31,0.18,0.76",
                    //     "2020-05-29,57.12,57.41,58.02,56.81,68036,390882864.00,2.11,-0.12,-0.07,0.60",
                    //     "2020-06-01,57.75,59.33,59.69,57.44,161068,949983296.00,3.92,3.34,1.92,1.41",
                    //     "2020-06-02,59.57,61.00,62.18,58.88,204796,1235513472.00,5.56,2.81,1.67,1.79",
                    //     "2020-06-03,60.79,59.93,61.05,59.48,146357,882603744.00,2.57,-1.75,-1.07,1.28",
                    //     "2020-06-04,60.48,60.11,61.20,59.71,105743,637797408.00,2.49,0.30,0.18,0.93",
                    //     "2020-06-05,61.00,63.20,63.28,60.33,265451,1643855456.00,4.91,5.14,3.09,2.33", "2020-06-08,63.00,62.79,63.83,62.45,172441,1087013120.00,2.18,-0.65,-0.41,1.51", "2020-06-09,63.00,61.98,64.41,61.69,204431,1285542240.00,4.33,-1.29,-0.81,1.79", "2020-06-10,62.26,61.05,62.42,60.68,186194,1140629408.00,2.81,-1.50,-0.93,1.63", "2020-06-11,61.87,62.84,64.20,61.51,280233,1764678736.00,4.41,2.93,1.79,2.45", "2020-06-12,61.40,61.48,61.93,60.63,175497,1075893056.00,2.07,-2.16,-1.36,1.54", "2020-06-15,62.50,62.50,63.88,61.25,195740,1225432624.00,4.28,1.66,1.02,1.71", "2020-06-16,63.80,64.10,64.46,63.13,214116,1367780384.00,2.13,2.56,1.60,1.88", "2020-06-17,64.00,64.11,64.11,62.36,144378,912074336.00,2.73,0.02,0.01,1.26", "2020-06-18,63.80,66.74,66.76,62.94,279033,1829902640.00,5.96,4.10,2.63,2.44", "2020-06-19,66.69,66.99,68.68,66.30,220619,1487253008.00,3.57,0.37,0.25,1.93", "2020-06-22,66.60,68.00,68.78,66.29,196255,1325805168.00,3.72,1.51,1.01,1.72", "2020-06-23,67.57,71.03,72.09,67.00,260375,1812606800.00,7.49,4.46,3.03,2.28", "2020-06-24,71.10,71.70,73.06,70.76,196681,1414432112.00,3.24,0.94,0.67,1.72", "2020-06-29,71.50,70.60,72.43,70.30,173376,1233307824.00,2.97,-1.53,-1.10,1.52", "2020-06-30,71.41,71.80,72.85,70.87,169831,1223207520.00,2.80,1.70,1.20,1.48", "2020-07-01,73.21,72.47,75.45,71.03,235093,1726221248.00,6.16,0.93,0.67,2.05", "2020-07-02,72.63,72.14,74.61,71.80,214074,1559734672.00,3.88,-0.46,-0.33,1.87", "2020-07-03,73.30,79.35,79.35,73.23,455388,3497719616.00,8.48,9.99,7.21,3.97", "2020-07-06,79.33,80.90,81.59,77.41,461224,3661516240.00,5.27,1.95,1.55,4.03", "2020-07-07,84.76,83.00,88.50,83.00,466706,3978641296.00,6.80,2.60,2.10,4.07", "2020-07-08,81.94,82.75,84.28,81.86,319156,2647763136.00,2.92,-0.30,-0.25,2.79", "2020-07-09,82.75,84.46,86.30,81.46,327974,2764110592.00,5.85,2.07,1.71,2.86", "2020-07-10,84.47,89.00,92.36,83.05,396029,3495161216.00,11.02,5.38,4.54,3.46", "2020-07-13,92.60,97.90,97.90,92.29,579871,5536512768.00,6.30,10.00,8.90,5.06", "2020-07-14,97.90,96.55,97.91,90.58,536389,5075817472.00,7.49,-1.38,-1.35,4.68", "2020-07-15,97.00,94.50,97.29,92.69,388696,3699030992.00,4.76,-2.12,-2.05,3.39", "2020-07-16,94.40,85.05,95.50,85.05,560467,4984540928.00,11.06,-10.00,-9.45,4.89", "2020-07-17,83.02,81.59,85.36,80.07,430969,3549101616.00,6.22,-4.07,-3.46,3.76", "2020-07-20,83.70,87.17,89.30,81.61,431730,3684539648.00,9.43,6.84,5.58,3.77", "2020-07-21,89.90,88.09,91.33,87.68,317222,2834375728.00,4.19,1.06,0.92,2.77", "2020-07-22,86.00,87.19,89.48,85.50,269545,2367987136.00,4.52,-1.02,-0.90,2.35", "2020-07-23,86.06,88.99,89.00,85.58,327287,2869841088.00,3.92,2.06,1.80,2.86", "2020-07-24,87.78,83.00,88.14,82.50,388174,3298033872.00,6.34,-6.73,-5.99,3.39", "2020-07-27,83.50,83.52,85.20,82.30,208828,1753284464.00,3.49,0.63,0.52,1.82", "2020-07-28,85.98,83.91,86.66,83.00,216441,1829407616.00,4.38,0.47,0.39,1.89", "2020-07-29,83.31,86.93,87.50,82.52,287976,2464892400.00,5.93,3.60,3.02,2.51", "2020-07-30,87.02,85.00,87.63,84.30,224493,1917850496.00,3.83,-2.22,-1.93,1.96", "2020-07-31,84.96,85.39,86.66,83.46,258123,2201963264.00,3.76,0.46,0.39,2.25", "2020-08-03,85.41,86.17,86.50,84.40,280304,2394349088.00,2.46,0.91,0.78,2.45", "2020-08-04,86.95,89.00,91.00,86.88,383956,3414415344.00,4.78,3.28,2.83,3.35", "2020-08-05,89.00,88.15,89.00,86.58,190227,1667411296.00,2.72,-0.96,-0.85,1.66", "2020-08-06,88.81,88.73,89.60,87.00,205333,1815887520.00,2.95,0.66,0.58,1.79", "2020-08-07,87.60,85.38,88.76,83.81,245974,2120266848.00,5.58,-3.78,-3.35,2.15", "2020-08-10,83.79,81.98,84.35,80.00,336539,2752165152.00,5.09,-3.98,-3.40,2.94", "2020-08-11,81.90,81.00,83.20,80.95,194173,1596334592.00,2.74,-1.20,-0.98,1.69", "2020-08-12,81.18,81.98,81.98,78.45,220972,1768144496.00,4.36,1.21,0.98,1.93", "2020-08-13,83.50,81.80,83.80,81.65,135828,1119875376.00,2.62,-0.22,-0.18,1.19", "2020-08-14,82.10,81.93,82.59,80.00,120620,981262736.00,3.17,0.16,0.13,1.05", "2020-08-17,82.20,82.92,83.23,81.33,151032,1246372800.00,2.32,1.21,0.99,1.32", "2020-08-18,84.01,82.18,84.51,81.80,161553,1335564960.00,3.27,-0.89,-0.74,1.41", "2020-08-19,81.40,79.65,81.64,79.52,187358,1504274096.00,2.58,-3.08,-2.53,1.64", "2020-08-20,79.64,78.55,80.00,78.10,122724,967851104.00,2.39,-1.38,-1.10,1.07", "2020-08-21,80.00,79.58,80.64,78.90,111905,893244016.00,2.22,1.31,1.03,0.98", "2020-08-24,79.90,81.44,82.28,79.69,171281,1384872480.00,3.25,2.34,1.86,1.50", "2020-08-25,81.00,81.24,82.88,80.50,145106,1182126000.00,2.92,-0.25,-0.20,1.27", "2020-08-26,82.00,83.42,85.31,81.68,320472,2691953344.00,4.47,2.68,2.18,2.80", "2020-08-27,86.50,85.42,87.55,84.70,252035,2168640352.00,3.42,2.40,2.00,2.20", "2020-08-28,85.00,85.39,86.06,83.02,186470,1572760240.00,3.56,-0.04,-0.03,1.63", "2020-08-31,87.02,85.00,88.22,84.88,215347,1864842720.00,3.91,-0.46,-0.39,1.88", "2020-09-01,86.99,93.50,93.50,86.31,394613,3573272704.00,8.46,10.00,8.50,3.44", "2020-09-02,95.88,94.30,96.00,91.63,397047,3719378784.00,4.67,0.86,0.80,3.47", "2020-09-03,92.88,92.59,95.16,92.15,227795,2129704432.00,3.19,-1.81,-1.71,1.99", "2020-09-04,88.80,90.00,90.59,88.02,222021,1979126656.00,2.78,-2.80,-2.59,1.94", "2020-09-07,89.48,94.74,97.50,89.40,409987,3862436336.00,9.00,5.27,4.74,3.58", "2020-09-08,95.88,91.00,95.88,90.70,279084,2590896624.00,5.47,-3.95,-3.74,2.44", "2020-09-09,88.01,85.99,88.70,84.85,263292,2281813616.00,4.23,-5.51,-5.01,2.30", "2020-09-10,87.84,87.09,90.17,86.90,217063,1923920288.00,3.80,1.28,1.10,1.89", "2020-09-11,87.85,91.20,91.20,87.22,205764,1843068560.00,4.57,4.72,4.11,1.80", "2020-09-14,91.30,92.50,94.50,91.30,223839,2078549008.00,3.51,1.43,1.30,1.95", "2020-09-15,94.01,101.30,101.75,93.50,579221,5761285376.00,8.92,9.51,8.80,5.06", "2020-09-16,100.28,105.40,107.87,99.00,493789,5154280704.00,8.76,4.05,4.10,4.31", "2020-09-17,105.51,115.94,115.94,105.15,602351,6707262720.00,10.24,10.00,10.54,5.26", "2020-09-18,113.99,115.50,115.50,111.50,473754,5363840000.00,3.45,-0.38,-0.44,4.14", "2020-09-21,116.00,105.77,119.32,104.34,588771,6535043584.00,12.97,-8.42,-9.73,5.14", "2020-09-22,106.50,106.77,110.65,104.01,462882,4971987456.00,6.28,0.95,1.00,4.04", "2020-09-23,109.00,110.40,111.01,106.30,381409,4146613360.00,4.41,3.40,3.63,3.33", "2020-09-24,107.88,106.40,110.03,106.01,266126,2864183120.00,3.64,-3.62,-4.00,2.32", "2020-09-25,108.20,105.09,109.79,103.80,324363,3457966848.00,5.63,-1.23,-1.31,2.83", "2020-09-28,106.19,106.40,108.10,105.65,211883,2260356208.00,2.33,1.25,1.31,1.85", "2020-09-29,108.59,107.89,109.51,104.25,270046,2884125024.00,4.94,1.40,1.49,2.36", "2020-09-30,108.58,116.24,118.23,107.10,444201,5073415168.00,10.32,7.74,8.35,3.88", "2020-10-09,123.10,120.35,126.14,119.20,559678,6870685696.00,5.97,3.54,4.11,4.89", "2020-10-12,123.80,128.50,129.03,120.45,528089,6521180672.00,7.13,6.77,8.15,4.61", "2020-10-13,128.00,129.29,131.88,125.00,460527,5958597888.00,5.35,0.61,0.79,4.02", "2020-10-14,129.15,130.50,132.32,128.10,310472,4041272256.00,3.26,0.94,1.21,2.71", "2020-10-15,134.60,131.55,137.73,131.33,402893,5425288448.00,4.90,0.80,1.05,3.52", "2020-10-16,132.56,127.80,133.85,125.00,413536,5301212672.00,6.73,-2.85,-3.75,3.61", "2020-10-19,128.00,128.08,129.81,126.30,222006,2832538848.00,2.75,0.22,0.28,1.94", "2020-10-20,126.18,140.00,140.33,126.18,541679,7240427520.00,11.05,9.31,11.92,4.73", "2020-10-21,137.99,137.50,139.70,134.17,380567,5212917504.00,3.95,-1.79,-2.50,3.32",
                    //     "2020-10-22,137.23,143.79,145.00,132.07,434389,6061014016.00,9.40,4.57,6.29,3.79",
                    //     "2020-10-23,142.02,138.67,145.78,136.50,400994,5645291264.00,6.45,-3.56,-5.12,3.50",
                    //     "2020-10-26,136.50,139.96,142.85,133.10,309796,4319369728.00,7.03,0.93,1.29,2.70",
                    //     "2020-10-27,137.42,140.28,141.50,135.83,296545,4122784512.00,4.05,0.23,0.32,2.59",
                    //     "2020-10-28,139.51,151.60,153.48,139.02,517974,7669731584.00,10.31,8.07,11.32,4.52",
                    //     "2020-10-29,147.91,158.38,166.76,147.91,634705,10022998784.00,12.43,4.47,6.78,5.54",
                    //     "2020-10-30,160.00,159.81,170.30,154.20,673292,10882457088.00,10.17,0.90,1.43,5.88",
                    //     "2020-11-02,160.91,167.98,168.75,160.50,524911,8660252672.00,5.16,5.11,8.17,4.58",
                    //     "2020-11-03,172.00,164.08,172.45,159.58,661617,10960743424.00,7.66,-2.32,-3.90,5.77",
                    //     "2020-11-04,167.00,168.03,170.33,163.00,460948,7689440256.00,4.47,2.41,3.95,4.02",
                    //     "2020-11-05,175.00,184.83,184.83,171.00,674092,11951954688.00,8.23,10.00,16.80,5.88",
                    //     "2020-11-06,189.50,190.44,198.85,179.89,807667,15261971968.00,10.26,3.04,5.61,7.05",
                    //     "2020-11-09,191.60,190.95,193.67,184.12,525016,9934097152.00,5.01,0.27,0.51,4.58",
                    //     "2020-11-10,186.86,182.58,186.88,176.88,635350,11543486464.00,5.24,-4.38,-8.37,5.55",
                    //     "2020-11-11,176.90,164.35,181.89,164.32,805675,13840949760.00,9.62,-9.98,-18.23,7.03",
                    //     "2020-11-12,168.00,169.33,173.30,165.78,586640,9953360384.00,4.58,3.03,4.98,5.12",
                    //     "2020-11-13,180.00,175.90,182.02,173.29,609194,10790305792.00,5.16,3.88,6.57,5.32",
                    //     "2020-11-16,171.03,170.02,171.50,163.50,542565,9094656000.00,4.55,-3.34,-5.88,4.74",
                    //     "2020-11-17,173.50,167.00,175.18,164.46,568409,9641027072.00,6.31,-1.78,-3.02,4.96",
                    //     "2020-11-18,165.88,167.00,169.18,162.25,417033,6941379072.00,4.15,0.00,0.00,3.64",
                    //     "2020-11-19,168.00,161.62,168.70,159.52,470054,7652210688.00,5.50,-3.22,-5.38,4.10",
                    //     "2020-11-20,164.65,176.06,177.24,163.22,707527,12067220480.00,8.67,8.93,14.44,6.18"
                    // ]
                },
                FSP: [], //分时价
                rzrq: {},
                historyCashFlow: {},
                historyCashFlowOFBanKuai: {}, // 历史资金流
                financeReport: {}, //财务数据
                financeTableDataYear: {}, //财务数据 营业年收入， 年净利润等
                financeTableDataQuarter: {}, //财务数据 营业季度收入， 季度净利润等
            },
            bydN: [],
            option: {
                // 3 指定图表的配置项和数据
                title: {
                    text: "布林上轨",
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "30%",
                    containLabel: true,
                },

                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross",
                        label: {
                            backgroundColor: "red",
                        },
                    },
                },
                xAxis: {
                    type: "category",
                    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                },
                yAxis: {
                    type: "value",
                },
                series: [
                    {
                        name: "布林上轨",
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: "line",
                    },
                ],
            },
        };
    },
    methods: {
        /* 拿到画布处理好的基本数据，并渲染 */
        mixinInit(days = 20) {
            const averages = this.dynamicGet20Day(days).reverse() || [] // 将时间升序
            this.historyCashFlowInit() // 个股历史资金流
            this.historyCashFlowOFBanKuaiInit() // 板块历史资金流
            this.judgeStrongWeekInit() // 判断个股强弱-1 大盘跌时 个股表现
            this.judgeStrongZSAndStockInit() // 判断个股强弱-2 大盘与个股走势比较
            this.financeReportYearInit() // 财务数据 年净资产收益率
            this.financeReportMonthInit() // 财务数据 季度净资产收益率
            // this.financeTableDataYearInit() // 财务数据 年营业收入增长率， 净利润增长率, 现金流等
            // this.financeTableDataQuarterInit() // 财务数据 季度 营业收入增长率， 净利润增长率, 现金流等
            this.financeYSZKYearInit() // 财务数据 年应收账款增长率 -- 产品订单情况 直接关系营业收入
            // this.financeKCYearInit() // 财务数据 年库存增长率  -- 产品交付能力
            this.financeYFZKYearInit() // 财务数据 年预付账款增长率 -- 生产的积极性 向上游采购原材料
            this.financeYSZKAndYYSRYearInit() // 财务数据 年应收账款占营业收入比率 -- 未来收益预期
            this.LJZFDayInit() // 累计每天涨幅度数量统计 半年 季度 月份 周情况
            this.LJDFDayInit() // 累计每天跌幅幅度数量统计 半年 季度 月份 周情况
            // this.profitIncomRateInit() // 每年 利润占总营业收入比率变化
            const date_arr = averages.map(obj => obj.date) || []
            const upper_arr = [
                { name: '布林上轨', data: averages.map(obj => obj.upper), type: 'line' },
                { name: '收盘价格', data: averages.map(obj => obj.currentP), type: 'line' },
                { name: '布林中轨', data: averages.map(obj => obj.average20), type: 'line' },
                { name: '布林下轨', data: averages.map(obj => obj.lower), type: 'line' },
            ] || []
            /* 布林上轨斜率 */
            const ratio_arr = [
                { name: '斜率', data: averages.map(obj => obj.ratio), type: 'line' },
            ] || []
            /*  5% 以下：窄
                10% ：正常
                20% 以上: 宽 (做区间)
            */
            const bollwidth_arr = [
                { name: '带宽', data: averages.map(obj => obj.bollWidth), type: 'line' },
            ] || []
            const bollWidthRatio_arr = [
                { name: '带宽斜率', data: averages.map(obj => obj.bollWidthRatio), type: 'line' },
            ] || []
            /* 最高最低点数及振幅变化 */
            const TopLowSPDot_arr = [
                { name: '最高点数', data: averages.map(obj => obj.topDot), type: 'line' },
                { name: '当天涨幅', data: averages.map(obj => obj.todayZDF), type: 'line' },
                { name: '最低点数', data: averages.map(obj => obj.lowDot), type: 'line' },
            ] || []

            /* 振幅变化 及收盘价到20均 偏移量 累计收益 */
            const ZFPYArr_arr = [
                { name: '前3天累计点数', data: averages.map(obj => obj.ljrevenue3), type: 'line' },
                { name: '前5天累计点数', data: averages.map(obj => obj.ljrevenue5), type: 'line' },
                { name: '前20天累计点数', data: averages.map(obj => obj.ljrevenue), type: 'line' },
                { name: '每天振幅', data: averages.map(obj => obj.todayZF), type: 'line' },
                { name: '距20均偏移量', data: averages.map(obj => obj.toAverage20Ratio), type: 'line' },
            ] || []

            /* 最高价 最低价 对应的分时变化 */
            const TopLowPTime_arr = [
                { name: '最高价分时', data: averages.map(obj => obj.TopPtime), type: 'line' },
                { name: '最低价分时', data: averages.map(obj => obj.LowPtime), type: 'line' },
            ] || []

            /* 1 画布个数 */
            const datas = [
                { date: date_arr, data: upper_arr },
                { date: date_arr, data: ratio_arr },
                { date: date_arr, data: bollwidth_arr },
                { date: date_arr, data: bollWidthRatio_arr },
                { date: date_arr, data: ZFPYArr_arr },
                { date: date_arr, data: TopLowSPDot_arr },
                { date: date_arr, data: TopLowPTime_arr },
            ]
            /* 1 渲染各指标画布 各指标*/
            datas.forEach((every, index) => {
                const { date, data } = every
                this.updateConfig({ date, data, colName: this.dataObj.byd.name })
                const temp = JSON.parse(JSON.stringify(this.option))
                setTimeout(() => {
                    this.renderCanavas(this.myCharts[`myChart${index}`], temp)
                }, 300)
            })
        },
        /* 1 画布渲染生成数据 */
        renderCanavas(canavasDom, option) {
            canavasDom.setOption(option); // 延时画布生成
            // this.myCharts .myChart0.setOption(temp); // 延时画布生成
            // this.myCharts .myChart1.setOption(temp); // 延时画布生成
        },
        /* 标准差 */
        getStd(arr) {
            var sum = function (x, y) { return x * 1 + y * 1; };　　//求和函数
            var square = function (x) { return x * x; };　　//数组中每个元素求它的平方
            // var arr = [1,1,3,5,5];　　//
            var mean = arr.reduce(sum) / arr.length;
            var deviations = arr.map(function (x) { return x - mean; });
            var stddev = Math.sqrt(deviations.map(square).reduce(sum) / (arr.length - 1));
            return stddev.toFixed(2)
        },
        /* 返回基础数据的对象 */
        to20Average(day21Data) {
            const data = day21Data.slice(0, 20)
            // "2020-12-10, 168.00, 169.52, 171.66, 166.02, 370436, 6243808768.00, 3.26, -2.15, -3.72, 3.23"
            // index 开盘价 1 收盘价 2 最高价 3 最低价 4 成交量 5 成交额 6 振幅(当天最高最低差额/前一天收盘价) 7 涨跌幅 8 涨跌额 9 换手率 10
            let sum20 = null;
            let sum5 = null;
            let average20 = null
            const price20 = []
            let std = null
            data.forEach((str, index) => { // 降序时间
                const todayPrice = str.split(',')[2] // 取收盘价
                sum20 += todayPrice * 1
                if(index < 5) { sum5 +=  todayPrice * 1 }
                price20.push(todayPrice)
            })
            /* 计算出当天最高百分点 */
            const todayTopP = data[0].split(',')[3] // 当天最高价
            const todayLowP = data[0].split(',')[4] // 当天最低价
            const yesterdaySPJ = data[1].split(',')[2] // 昨天收盘价
            const topDot = ((todayTopP - yesterdaySPJ) / yesterdaySPJ * 100).toFixed(2) // 最高价点数
            const lowDot = ((todayLowP - yesterdaySPJ) / yesterdaySPJ * 100).toFixed(2) // 最低价点数

            /* 每天的振幅 */
            const todayZF = data[0].split(',')[7]

            /* 每天的涨跌幅 */
            const todayZDF = data[0].split(',')[8]

            /* 计算累计收益 */
            const earlistKPJ = day21Data.slice(-1)[0].split(',')[2] // 21天前收盘价
            const earlistKPJ5 = day21Data.slice(0, 6).slice(-1)[0].split(',')[2] // 6天前收盘价
            const earlistKPJ3 = day21Data.slice(0, 4).slice(-1)[0].split(',')[2] // 4天前收盘价
            const todaySPJ = data[0].split(',')[2]
            const ljrevenue = ((todaySPJ - earlistKPJ) / earlistKPJ * 100).toFixed(2)
            const ljrevenue5 = ((todaySPJ - earlistKPJ5) / earlistKPJ5 * 100).toFixed(2)
            const ljrevenue3 = ((todaySPJ - earlistKPJ3) / earlistKPJ3 * 100).toFixed(2)

            /* 处理当天最高价，对低价 对应的分明 格式： 14:42 => 14-42  */
            let TopPtime = '-', LowPtime = '-'
            if (data[0].split(',')[11]) {
                TopPtime = data[0].split(',')[11].replace(/:/, '.')
                LowPtime = data[0].split(',')[12].replace(/:/, '.')
            }

            average20 = (sum20 / 20).toFixed(2) * 1 // 当天20均
            std = this.getStd(price20) * 1 // 计算标准差

            /* 距20均偏移率 */
            const toAverage20Ratio = ((data[0].split(',')[2] - average20) / average20 * 100).toFixed(2)


            /* 组装数据 */
            const todayInfos = data[0].split(',')
            return {
                date: todayInfos[0],
                upper: (average20 * 1 + 2 * std * 1).toFixed(2),  // 布林通道上轨
                lower: (average20 * 1 - 2 * std * 1).toFixed(2),  // 布林通道下轨
                currentP: todayInfos[2],
                average20, // 当天20均价格(MD)
                topDot, // 最高点数
                lowDot, // 最低点数
                todayZF, // 当天的振幅
                todayZDF, // 当天的涨跌幅
                TopPtime, // 当天最高价对应的分时
                LowPtime, // 当天最低价对应的分时
                toAverage20Ratio, // 当天价到20均的偏移量
                ljrevenue, // 前20天累计收益点数
                ljrevenue5, // 前5天累计收益点数
                ljrevenue3, // 前3天累计收益点数
            }
        },
        /* days为查看多少天的情况 */
        dynamicGet20Day(days) {
            console.log(this.dataObj, 'this.dataObj--1');
            const averages = [];
            try {
                if (!this.dataObj.byd) { return }
                const data = JSON.parse(JSON.stringify(this.dataObj.byd.klines || [])).reverse(); // 时间降序
                /* 准备工作 处理分时数据  */
                const trends = this.dataObj.FSP
                const formartTrends = []
                const fsDaysCount = trends.length / 241
                for (let index = 0; index < fsDaysCount; index++) {
                    formartTrends.unshift(trends.slice(index * 241, 241 * (index + 1)))
                }
                console.log(this.dataObj, 'this.dataObj--2');

                /* 将最高价 最低价对应分时加入对应时间的数据串中 */
                for (let i = 0; i < fsDaysCount; i++) {
                    const todayTopPStr = formartTrends[i].find(fsitem => fsitem.split(',')[3] === data[i].split(',')[3]) // index 当天，分时最高价 3
                    const todayLowPStr = formartTrends[i].find(fsitem => {

                        return fsitem.split(',')[4] === data[i].split(',')[4]
                    }) // index 当天，分时最低价 4
                    // console.log(todayTopPStr, 'todayTopPStr------');
                    // console.log(data[i], 'data[i]------');
                    // if (!todayTopPStr) { continue }
                    if (todayTopPStr && data[i].slice(0, 10) === todayTopPStr.slice(0, 10)) {
                        // data.slice(0, 20)
                        for (let j = 0; j < 20; j++) { // 最近20天的个股信息
                            if (data[j].slice(0, 10) === todayTopPStr.slice(0, 10)) {
                                data[j] += `,${todayTopPStr.slice(11, 16)}` // 组装 kline里 最高价分时 index 11
                                data[j] += `,${todayLowPStr.slice(11, 16)}` // 组装 kline里 最低价分时 index 12
                            }
                        }
                    }
                }
                console.log(this.dataObj, 'this.dataObj--3');
                /* 进入处理数据主流程 */
                for (let i = 0; i < days; i++) {
                    const every = data.slice(i, i + 21); // 动态获取每天前20天收盘价
                    const average = this.to20Average(every) // 计算出每天的布林通道上轨(包括其他指标)
                    averages.push(average)
                }
                /* 单独处理加斜率 ratio ， 布林带宽 */
                averages.forEach((item, index) => {
                    item.ratio = this.getRatio(item, averages[index + 1])
                    item.bollWidth = this.getBollWidth(item)
                })
                /* 单独处理带宽斜率 */
                averages.forEach((item, index) => {
                    item.bollWidthRatio = this.getBollWidthRatio(item, averages[index + 1])
                })

            } catch (error) {
                console.log(error);
            }
        return averages
        },
        /* 组装渲染 rzrq*/
        rzrqInit(days = 20) {
            if (!this.dataObj.rzrq.data) { return }
            const data = this.dataObj.rzrq.data;
            const rzrqArr = data.slice(0, days + 1); // 动态获取每天前20天融资融券
            const currentData = this.rzrq20Days(rzrqArr).reverse() // 降序排列
            const date_arr = currentData.map(obj => obj.date) || []
            const rzrqIncrease_arr = [
                { name: '融资融券每天净量 (亿)', data: currentData.map(obj => obj.increase), type: 'line' },
            ]
            // const canavas = { date: date_arr, data: rzrqIncrease_arr }
            this.updateConfig({ date: date_arr, data: rzrqIncrease_arr })
            const temp = JSON.parse(JSON.stringify(this.option))
            /* 5-2 渲染融资融券画布 融资融券 */
            setTimeout(() => {
                this.renderCanavas(this.myCharts[`myChart${34}`], temp)
            }, 300)
        },
        /* 每天增加rzrq */
        rzrq20Days(rzrqArr) {
            // if (!this.dataObj.rzrq) { return }
            // const data = this.dataObj.rzrq.klines;
            // this.getrzrqIncrase(item)
            // for (let i = 0; i < days; i++) {

            // rzrqArr.forEach((item, index) => {

            // })
            return rzrqArr.map((item, index) => {
                if (!rzrqArr[index + 1]) { return '-' }
                // 后日期数据 减 前一天数据转化为亿的单E位
                // return { date: item.dim_date.split(' ')[0], increase: ((item.rzrqye - rzrqArr[index + 1].rzrqye) / 10000 / 10000).toFixed(0) }
                return { date: item.DIM_DATE.split(' ')[0], increase: ((item.RZRQYE - rzrqArr[index + 1].RZRQYE) / 10000 / 10000).toFixed(0) }
            }).slice(0, -1)
        },
        /* 资金流向（个股即时资金及历史资金流向） */
        /* 组装渲染 cahsFlow */
        historyCashFlowInit(days = 20) {
            if (!this.dataObj.historyCashFlow.klines) { return }
            // const data = this.dataObj.historyCashFlow.data;
            const data = this.dataObj.historyCashFlow.klines.reverse(); // 时间降序

            // const historyCashFlowArr = data.slice(0, days + 1);
            /* 进入处理历史资金流数据主流程 */
            const averages = []
            for (let i = 0; i < days; i++) {
                const every = data.slice(i, i + 20); // 动态获取每天前20天个股资金流
                const average = this.historyCashFlow20Days(every) // 计算出每天的前20天主力净累计
                averages.unshift(average)
            }
            /* 日期对应 */
            const date_arr = averages.map(obj => obj.date) || []

            /* 资金净额 */
            const majorCash_arr = [
                { name: '净额占比', data: averages.map(obj => obj.majorPureCurrentRatio), type: 'line' },
                { name: '净额', data: averages.map(obj => obj.cashFlowCurrent), type: 'line' },
            ] || []
            /* 净额累计均线 */
            const majorCashAverage_arr = [
                { name: '个股历史资金5均', data: averages.map(obj => obj.cashFlowaverage5), type: 'line' },
                { name: '13均', data: averages.map(obj => obj.cashFlowaverage13), type: 'line' },
                { name: '20均', data: averages.map(obj => obj.cashFlowaverage20), type: 'line' },
            ] || []

            /* 2 资金流画布 */
            const datas = [
                { date: date_arr, data: majorCash_arr },
                { date: date_arr, data: majorCashAverage_arr },
            ]

            /* 2 渲染个股资金流画布 个股资金流*/
            datas.forEach((every, index) => {
                const { date, data } = every
                this.updateConfig({ date, data, colName: this.dataObj.byd.name })
                const temp = JSON.parse(JSON.stringify(this.option))
                setTimeout(() => {
                    this.renderCanavas(this.myCharts[`myChart${index + 7}`], temp)
                }, 300)
            })
        },
        /* 板块资金流向（板块即时资金及历史资金流向）*/
        historyCashFlowOFBanKuaiInit(days = 20) {
            // 2021-04-30,2936391680.0,-1112835584.0,-1823556096.0,-1122026752.0,4058418432.0,6.63,-2.51,-4.12,-2.53,9.17,1918.91,4.87,0.00,0.00
            // index 日期 0 主力净额 1 主力净占比 6 超大单净额 5 超大单净占比 10  大单净额 4 大单净占比 9 中单净额 3 中单净占比 8 小单净额 2 小单净占比 7 现股价 11 涨跌幅 12
            const arr =this.dataObj.historyCashFlowOFBanKuai
            if (!arr&&Array.isArray(arr)) { return }
            const bankuai1_temp = JSON.parse(this.dataObj.historyCashFlowOFBanKuai[0])
            const bankuai2_temp = JSON.parse(this.dataObj.historyCashFlowOFBanKuai[1])
            const bankuai3_temp = JSON.parse(this.dataObj.historyCashFlowOFBanKuai[2])
            const bankuai4_temp = JSON.parse(this.dataObj.historyCashFlowOFBanKuai[3])
            const bankuai5_temp = JSON.parse(this.dataObj.historyCashFlowOFBanKuai[4])
            console.log('this.dataObj.historyCashFlowOFBanKuai');
            console.log(this.dataObj.historyCashFlowOFBanKuai);
            // debugger
            // const data = this.dataObj.historyCashFlow.data;
            // const data = bankuai1.klines.reverse(); // 时间降序
            /* 进入处理板块历史资金流数据主流程 */
            const averages_bankuai1 = []
            const averages_bankuai2 = []
            const averages_bankuai3 = []
            const averages_bankuai4 = []
            const averages_bankuai5 = []
            try {
                const bankuai1 = bankuai1_temp.klines.reverse(); // 时间降序
                const bankuai2 = bankuai2_temp.klines.reverse(); // 时间降序
                const bankuai3 = bankuai3_temp.klines.reverse(); // 时间降序
                const bankuai4 = bankuai4_temp.klines.reverse(); // 时间降序
                const bankuai5 = bankuai5_temp.klines.reverse(); // 时间降序
                for (let i = 0; i < days; i++) {
                    // const every1 = bankuai1.slice(i, i + 20); // 动态获取每天前20天个股资金流
                    // const averages_bankuai1 = this.historyCashFlow20Days(every1) // 计算出每天的前20天主力净累计
                    // const averages_bankuai2 = this.historyCashFlow20Days(every1) // 计算出每天的前20天主力净累计
                    // const averages_bankuai3 = this.historyCashFlow20Days(every1) // 计算出每天的前20天主力净累计
                    // averages.unshift(averages_bankuai1)
                    this.handleEvery(bankuai1, averages_bankuai1, i)
                    this.handleEvery(bankuai2, averages_bankuai2, i)
                    this.handleEvery(bankuai3, averages_bankuai3, i)
                    this.handleEvery(bankuai4, averages_bankuai4, i)
                    this.handleEvery(bankuai5, averages_bankuai5, i)
                }
                console.log(bankuai4, 'averages_bankuai1====');
                // debugger
            } catch (error) {
                console.log(error);
            }

            /* 日期对应 */
            const date_arr = averages_bankuai1.map(obj => obj.date) || []

            /* 资金净额 */
            // const majorCash_bankuai1_arr = [
            //     // { name: '净额占比', data: bankuai1.map(obj => obj.majorPureCurrentRatio), type: 'line' },
            //     { name: '净额', data: bankuai1.map(obj => obj.cashFlowCurrent), type: 'line' },
            // ] || []
            // const majorCash_bankuai2_arr = [
            //     // { name: '净额占比', data: bankuai2.map(obj => obj.majorPureCurrentRatio), type: 'line' },
            //     { name: '净额', data: bankuai2.map(obj => obj.cashFlowCurrent), type: 'line' },
            // ] || []
            // const majorCash_bankuai3_arr = [
            //     // { name: '净额占比', data: bankuai3.map(obj => obj.majorPureCurrentRatio), type: 'line' },
            //     { name: '净额', data: bankuai3.map(obj => obj.cashFlowCurrent), type: 'line' },
            // ] || []
            /* 净额累计均线 */
            const majorCashAverage_bankuai1_arr = [
                { name: '5均', data: averages_bankuai1.map(obj => obj.cashFlowaverage5), type: 'line' },
                { name: '13均', data: averages_bankuai1.map(obj => obj.cashFlowaverage13), type: 'line' },
                { name: '20均', data: averages_bankuai1.map(obj => obj.cashFlowaverage20), type: 'line' },
            ] || []
            const majorCashAverage_bankuai2_arr = [
                { name: '5均', data: averages_bankuai2.map(obj => obj.cashFlowaverage5), type: 'line' },
                { name: '13均', data: averages_bankuai2.map(obj => obj.cashFlowaverage13), type: 'line' },
                { name: '20均', data: averages_bankuai2.map(obj => obj.cashFlowaverage20), type: 'line' },
            ] || []
            const majorCashAverage_bankuai3_arr = [
                { name: '5均', data: averages_bankuai3.map(obj => obj.cashFlowaverage5), type: 'line' },
                { name: '13均', data: averages_bankuai3.map(obj => obj.cashFlowaverage13), type: 'line' },
                { name: '20均', data: averages_bankuai3.map(obj => obj.cashFlowaverage20), type: 'line' },
            ] || []
            const majorCashAverage_bankuai4_arr = [
                { name: '5均', data: averages_bankuai4.map(obj => obj.cashFlowaverage5), type: 'line' },
                { name: '13均', data: averages_bankuai4.map(obj => obj.cashFlowaverage13), type: 'line' },
                { name: '20均', data: averages_bankuai4.map(obj => obj.cashFlowaverage20), type: 'line' },
            ] || []
            const majorCashAverage_bankuai5_arr = [
                { name: '5均', data: averages_bankuai5.map(obj => obj.cashFlowaverage5), type: 'line' },
                { name: '13均', data: averages_bankuai5.map(obj => obj.cashFlowaverage13), type: 'line' },
                { name: '20均', data: averages_bankuai5.map(obj => obj.cashFlowaverage20), type: 'line' },
            ] || []

            /* 2 板块 资金流画布 */
            const datas_bankuai = [
                { date: date_arr, data: majorCashAverage_bankuai1_arr, name: bankuai1_temp.name },
                { date: date_arr, data: majorCashAverage_bankuai2_arr, name: bankuai2_temp.name },
                { date: date_arr, data: majorCashAverage_bankuai3_arr, name: bankuai3_temp.name },
                { date: date_arr, data: majorCashAverage_bankuai4_arr, name: bankuai4_temp.name },
                { date: date_arr, data: majorCashAverage_bankuai5_arr, name: bankuai5_temp.name },
            ]
            console.log('majorCashAverage_bankuai5_arr');
            console.log(datas_bankuai);
            /* 5-1 渲染板块资金流画布 板块资金流*/
            datas_bankuai.forEach((every, index) => {
                const { date, data, name } = every
                this.updateConfig({ date, data, colName: name })
                const temp = JSON.parse(JSON.stringify(this.option))
                setTimeout(() => {
                    this.renderCanavas(this.myCharts[`myChart${index + 29}`], temp)
                }, 300)
            })
        },
        handleEvery(bankuai, averages_bankuai, i) {
            const every = bankuai.slice(i, i + 20); // 动态获取每天前20天个股资金流
            const averages = this.historyCashFlow20Days(every) // 计算出每天的前20天主力净累计
            averages_bankuai.unshift(averages)
        },
        /* 每天cashFlow 相关*/
        historyCashFlow20Days(historyCashFlowArr) {
            // 2020-12-31, 615996768.0, -255824464.0, -360172304.0, -119660544.0, 735657312.0, 6.37, -2.65, -3.73, -1.24, 7.61, 194.30, 4.46, 0.00,0.00
            // index 日期 0 主力净额 1 主力净占比 6 超大单净额 5 超大单净占比 10  大单净额 4 大单净占比 9 中单净额 3 中单净占比 8 小单净额 2 小单净占比 7 现股价 11 涨跌幅 12

            /* 单位转化为亿 */
            const majorPureArr = historyCashFlowArr.map(cashFlowStr => cashFlowStr.split(',')[1] / 10000 / 10000)
            const majorPureRatioArr = historyCashFlowArr.map(cashFlowStr => cashFlowStr.split(',')[6])
            const dateArr = historyCashFlowArr.map(cashFlowStr => cashFlowStr.split(',')[0])
            /* 主力前20天净额累计 */
            const majorPureCurrentRatio = majorPureRatioArr[0]
            const cashFlowCurrent = majorPureArr[0].toFixed(2)
            const cashFlowaverage5 = accumulator(majorPureArr.slice(0, 5))
            const cashFlowaverage13 = accumulator(majorPureArr.slice(0, 10))
            const cashFlowaverage20 = accumulator(majorPureArr)

            return {
                date: dateArr[0],
                majorPureCurrentRatio,
                cashFlowCurrent,
                cashFlowaverage5,
                cashFlowaverage13,
                cashFlowaverage20,
            }
        },
        /* 判断个股强弱-1 大盘跌 个股表现 */
        judgeStrongWeekInit() {
            if (!this.dataObj.szzsP.klines || !this.dataObj.byd.klines) { return }
            const dataStock = JSON.parse(JSON.stringify(this.dataObj.byd.klines || [])).reverse(); // 时间降序
            const dataSZZS = JSON.parse(JSON.stringify(this.dataObj.szzsP.klines || [])).reverse(); // 时间降序
            /* 处理数据 取20大盘天下跌 个股表现 */
            const formatData = this.handleStrong({ dataStock, dataSZZS })
            /* 日期对应 */
            const date_arr = formatData.date_arr || []

            /* 最高价 最低价 对应的分时变化 */
            const stockStrongWeek_arr = [
                { name: '个股', data: formatData.stockZDF20DaysDatas, type: 'line' },
                { name: '大盘跌幅', data: formatData.szzsDF20DaysDatas, type: 'line' },
            ] || []


            this.updateConfig({ date: date_arr, data: stockStrongWeek_arr, colName: this.dataObj.byd.name })
            const temp = JSON.parse(JSON.stringify(this.option))
            /* 3 渲染判断个股强弱画布 判断个股强弱-1*/
            setTimeout(() => {
                this.renderCanavas(this.myCharts[`myChart${9}`], temp)
            }, 300)
        },
        /* 判断个股强弱-2 大盘与个股走势比较 */
        judgeStrongZSAndStockInit() {
            if (!this.dataObj.szzsP.klines || !this.dataObj.byd.klines) { return }
            const dataStock = JSON.parse(JSON.stringify(this.dataObj.byd.klines || [])).reverse(); // 时间降序
            const dataSZZS = JSON.parse(JSON.stringify(this.dataObj.szzsP.klines || [])).reverse(); // 时间降序
            const formatData = this.handleCompare({ dataStock, dataSZZS })
            /* 日期对应 */
            const date_arr = formatData.date_arr || []

            /* 个股及大盘指数变化 */
            const stockStrongWeek_arr = [
                { name: '个股走势', data: formatData.stockZDF20DaysDatas, type: 'line' },
                { name: '大盘走势', data: formatData.szzsZDF20DaysDatas, type: 'line' },
            ] || []


            this.updateConfig({ date: date_arr, data: stockStrongWeek_arr, colName: this.dataObj.byd.name })
            const temp = JSON.parse(JSON.stringify(this.option))
            /* 4 渲染判断个股强弱画布 判断个股强弱-2*/
            setTimeout(() => {
                this.renderCanavas(this.myCharts[`myChart${10}`], temp)
            }, 300)
        },
        /* 年净资产收益率 杜邦分析 */
        financeReportYearInit() {
            if (!this.dataObj.financeReport.nd) { return }
            const data = this.dataObj.financeReport.nd || []
            /* 日期对应 */
            const date_arr = data.map(item => item.REPORT_DATE).reverse()
            /* 个股年净资产收益率变化 */
            const formartROE_arr = data.map(item => item.ROE).reverse()
            const yearROE_arr = [
                { name: '年净资产收益率(ROE)', data: formartROE_arr, type: 'bar' },
            ] || []
            this.updateConfig({ date: date_arr, data: yearROE_arr, colName: this.dataObj.byd.name })
            const temp = JSON.parse(JSON.stringify(this.option))
            /* 6 渲染年净资产收益率画布 年净资产收益率*/
            setTimeout(() => {
                this.renderCanavas(this.myCharts[`myChart${11}`], temp)
            }, 300)
        },
        /* 季度净资产收益率 杜邦分析 */
        financeReportMonthInit() {
            if (!this.dataObj.financeReport.bgq) { return }
            const data = this.dataObj.financeReport.bgq || []
            /* 日期对应 */
            const date_arr = data.map(item => item.REPORT_DATE).reverse()
            /* 个股年净资产收益率变化 */
            const formartROE_arr = data.map(item => item.ROE).reverse()
            const yearROE_arr = [
                { name: '季度净资产收益率(ROE)', data: formartROE_arr, type: 'bar' },
            ] || []

            this.updateConfig({ date: date_arr, data: yearROE_arr, colName: this.dataObj.byd.name })
            const temp = JSON.parse(JSON.stringify(this.option))
            /* 7 渲染季度净资产收益率画布 季度净资产收益率*/
            setTimeout(() => {
                this.renderCanavas(this.myCharts[`myChart${12}`], temp)
            }, 300)
        },
        /* 年度 --- 财务数据分析基本面， 年 营业收入增长率， 净利润增长率等 */
        financeTableDataYearInit() {
            if (!this.dataObj.financeTableDataYear) { return }
            // debugger
            const data = JSON.parse(JSON.stringify(this.dataObj.financeTableDataYear || [])).reverse() || []
            /* 日期对应 */
            const date_arr = data.map(item => item.date).slice(1)
            /* 年营业总收入 */
            const yearIncome_arr = data.map(item => {
                if (item.yyzsr.slice(-1) === '万') {
                    return item.yyzsr.slice(0, -1) / 10000
                } else {
                    return item.yyzsr.slice(0, -1)
                }
            })
            const yearIncomeGrowRate_arr = yearIncome_arr.map((item, index) => ((yearIncome_arr[index + 1] - item) / item * 100).toFixed(1)).slice(0, -1)

            /* 年归属净利润 */
            const pureIncome_arr = data.map(item => {
                if (item.gsjlr.slice(-1) === '万') {
                    return (item.gsjlr.slice(0, -1) / 10000).toFixed(1)
                } else {
                    return item.gsjlr.slice(0, -1)
                }
            })
            const pureIncomeGrowRate_arr = pureIncome_arr.map((item, index) => ((pureIncome_arr[index + 1] - item) / item * 100).toFixed(1)).slice(0, -1)

            //  debugger
            const Income_arr = [
                { name: '年营业总收入增长率', data: yearIncomeGrowRate_arr, type: 'line' },
                { name: '年净利润增长率', data: pureIncomeGrowRate_arr, type: 'line' },
            ] || []
            this.updateConfig({ date: date_arr, data: Income_arr, colName: this.dataObj.byd.name })
            const temp = JSON.parse(JSON.stringify(this.option))
            /* 10 渲染年营业总收入画布 年营业总收入增长率*/
            setTimeout(() => {
                this.renderCanavas(this.myCharts[`myChart${23}`], temp)
            }, 300)
        },
       /* 季度 --- 财务数据分析基本面， 季度 营业收入增长率， 净利润增长率等 */
        financeTableDataQuarterInit() {
            if (!this.dataObj.financeTableDataQuarter) { return }
            const data = JSON.parse(JSON.stringify(this.dataObj.financeTableDataQuarter || [])).reverse() || []
            /* 日期对应 */
            const date_arr = data.map(item => item.date).slice(1)
            /* 季度营业总收入 亿为单位*/
            const quarterIncome_arr = data.map(item => {
                if (item.yyzsr.slice(-1) === '万') {
                    return item.yyzsr.slice(0, -1) / 10000
                } else {
                    return item.yyzsr.slice(0, -1)
                }
            })
            const quaterIncomeGrowRate_arr = quarterIncome_arr.map((item, index) => ((quarterIncome_arr[index + 1] - item) / item * 100).toFixed(1)).slice(0, -1)

            /* 季度归属净利润 */
            const pureIncome_arr = data.map(item => {
                if (item.gsjlr.slice(-1) === '万') {
                    return (item.gsjlr.slice(0, -1) / 10000).toFixed(1)
                } else {
                    return item.gsjlr.slice(0, -1)
                }
            })
            const pureIncomeGrowRate_arr = pureIncome_arr.map((item, index) => ((pureIncome_arr[index + 1] - item) / item * 100).toFixed(1)).slice(0, -1)

            //  debugger
            const Income_arr = [
                { name: '季度营业总收入增长率', data: quaterIncomeGrowRate_arr, type: 'line' },
                { name: '季度净利润增长率', data: pureIncomeGrowRate_arr, type: 'line' },
            ] || []
            this.updateConfig({ date: date_arr, data: Income_arr, colName: this.dataObj.byd.name })
            const temp = JSON.parse(JSON.stringify(this.option))
            /* 11 渲染季度营业总收入画布 季度营业总收入增长率*/
            setTimeout(() => {
                this.renderCanavas(this.myCharts[`myChart${24}`], temp)
            }, 300)
        },
        /* 一, 年应收账款增长率 -- 产品订单情况 直接关系营业收入 */
        financeYSZKYearInit() {
            if (!this.dataObj.financeReport.nd) { return }
            const data = this.dataObj.financeReport.nd || []
            /* 日期对应 */
            const date_arr = data.map(item => item.REPORT_DATE).reverse().slice(1)
            /* 个股年年应收账款数组 */
            const formartYSZK_arr = data.map((item) => {
                let temp_YSZK = item.ACCOUNTS_RECE
                // if(item.ch.slice(-1) === '万') {
                //     temp_YSZK = temp_YSZK / 1000
                // }
                return temp_YSZK
            })
            /* 年应收账款增长率 */
            const formartCKRatio_arr = this.getRatioFromArr(formartYSZK_arr).reverse()
            const yearYSZK_arr = [
                { name: '年应收账款增长率', data: formartCKRatio_arr, type: 'line' },
            ] || []
            this.updateConfig({ date: date_arr, data: yearYSZK_arr, colName: this.dataObj.byd.name })
            const temp = JSON.parse(JSON.stringify(this.option))
            /* 12 渲染应收账款画布 年应收账款增长率*/
            setTimeout(() => {
                this.renderCanavas(this.myCharts[`myChart${25}`], temp)
            }, 300)
        },
        /* 二, 年库存增长率  -- 产品交付能力 */
        financeKCYearInit() {
            if (!this.dataObj.financeReport.nd) { return }
            const data = this.dataObj.financeReport.nd || []
            /* 日期对应 */
            const date_arr = data.map(item => item.REPORT_DATE).reverse().slice(1)
            /* 个股年库存数组 */
            const formartKC_arr = data.map((item) => {
                let temp_CK = item.ch.slice(0, -1)
                if(item.ch.slice(-1) === '万') {
                    temp_CK = temp_CK / 1000
                }
                return temp_CK
            })
            /* 个股年库存增长率变化 */
            const formartCKRatio_arr = this.getRatioFromArr(formartKC_arr).reverse()

            const yearYSZK_arr = [
                { name: '年库存增长率', data: formartCKRatio_arr, type: 'line' },
            ] || []
            this.updateConfig({ date: date_arr, data: yearYSZK_arr, colName: this.dataObj.byd.name })
            const temp = JSON.parse(JSON.stringify(this.option))
            /* 13 渲染库存增长画布 年库存增长率*/
            setTimeout(() => {
                this.renderCanavas(this.myCharts[`myChart${26}`], temp)
            }, 300)
        },
        /* 三, 年预付账款增长率 -- 生产的积极性 向上游采购原材料 */
        financeYFZKYearInit() {
            if (!this.dataObj.financeReport.nd) { return }
            const data = this.dataObj.financeReport.nd || []
            /* 日期对应 */
            const date_arr = data.map(item => item.REPORT_DATE).reverse().slice(1)
            /* 个股年年应收账款数组 */
            const formartYFZK_arr = data.map((item) => {
                let temp_yfzk = item.ACCOUNTS_RECE
                // if(item.yfzk.slice(-1) === '万') {
                //     temp_yfzk = temp_yfzk / 1000
                // }
                return temp_yfzk
            })
            /* 个股年年应收账款增长率变化 */
            const formartYFZKRatio_arr = this.getRatioFromArr(formartYFZK_arr).reverse()
            // formartYFZK_arr.map((ele, index) => {
            //     const baseYFZK = formartYFZK_arr[index + 1]
            //    return ((ele - baseYFZK) / baseYFZK).toFixed(2)
            // })

            const yearYSZK_arr = [
                { name: '年预付账款增长率', data: formartYFZKRatio_arr, type: 'line' },
            ] || []
            this.updateConfig({ date: date_arr, data: yearYSZK_arr, colName: this.dataObj.byd.name })
            const temp = JSON.parse(JSON.stringify(this.option))
            /* 14 渲染预付账款增长画布 年预付账款增长率*/
            setTimeout(() => {
                this.renderCanavas(this.myCharts[`myChart${27}`], temp)
            }, 300)
        },
        /* 四, 年应收账款占营业收入比率 -- 未来收入的预期 */
        financeYSZKAndYYSRYearInit() {
            if (!this.dataObj.financeReport.nd) { return }
            const data = this.dataObj.financeReport.nd || []
            /* 日期对应 */
            const date_arr = data.map(item => item.REPORT_DATE).reverse()
            /* 个股年年应收账款数组 */
            const YSZKAndYYSRRatio_arr = data.map((item, i) => {
                let temp_yszk = item.ACCOUNTS_RECE
                let temp_yysr = item.ACCOUNTS_RECE
                // if(item.yszk.slice(-1) === '万') {
                //     temp_yszk = temp_yszk / 1000
                // }
                // if(item.yysr.slice(-1) === '万') {
                //     temp_yysr = temp_yysr / 1000
                // }
                return (temp_yszk / temp_yysr * 100).toFixed(2)
            })

            const yearYSZK_arr = [
                { name: '年应收账款营业收入比', data: YSZKAndYYSRRatio_arr.reverse(), type: 'line' },
            ] || []
            this.updateConfig({ date: date_arr, data: yearYSZK_arr, colName: this.dataObj.byd.name })
            const temp = JSON.parse(JSON.stringify(this.option))
            /* 14 渲染应收账款营业收入比画布 年应收账款营业收入比率*/
            setTimeout(() => {
                this.renderCanavas(this.myCharts[`myChart${28}`], temp)
            }, 300)
        },
        getRatioFromArr(arr) {
           return arr.map((ele, index) => {
               if(index + 1 === arr.length) { return false }
                const base = arr[index + 1]
               return ((ele - base) / base * 100).toFixed(2)
            }).slice(0, -1)
        },
        /* 累计每天涨幅度数量统计 半年 季度 月份 周情况 */
        LJZFDayInit() {
            // "2020-12-10, 168.00, 169.52, 171.66, 166.02, 370436, 6243808768.00, 3.26, -2.15, -3.72, 3.23"
            // index 开盘价 1 收盘价 2 最高价 3 最低价 4 成交量 5 成交额 6 振幅(当天最高最低差额/前一天收盘价) 7 涨跌幅 8 涨跌额 9 换手率 10
            if (!this.dataObj.byd) { return }
            const data = JSON.parse(JSON.stringify(this.dataObj.byd.klines || [])).reverse(); // 时间降序

            /* 一年 */
            const yearStatistic3Percent = data.slice(0, 240).map(item => item.split(',')[8]).filter(zdf => zdf > 3 && zdf < 5).length
            const yearStatistic5Percent = data.slice(0, 240).map(item => item.split(',')[8]).filter(zdf => zdf > 5 && zdf < 9).length
            const yearStatistic10Percent = data.slice(0, 240).map(item => item.split(',')[8]).filter(zdf => zdf > 9).length
            const year_arr = [
                { name: '一年次数', data: [yearStatistic10Percent, yearStatistic5Percent, yearStatistic3Percent], type: 'bar' },
            ]

            /* 半年 */
            const halfYearStatistic3Percent = data.slice(0, 120).map(item => item.split(',')[8]).filter(zdf => zdf > 3 && zdf < 5).length
            const halfYearStatistic5Percent = data.slice(0, 120).map(item => item.split(',')[8]).filter(zdf => zdf > 5 && zdf < 9).length
            const halfYearStatistic10Percent = data.slice(0, 120).map(item => item.split(',')[8]).filter(zdf => zdf > 9).length
            const halfYear_arr = [
                { name: '半年次数', data: [halfYearStatistic10Percent, halfYearStatistic5Percent, halfYearStatistic3Percent], type: 'bar' },
            ]

            /* 季度 */
            const Month3Statistic3Percent = data.slice(0, 60).map(item => item.split(',')[8]).filter(zdf => zdf > 3 && zdf < 5).length
            const Month3Statistic5Percent = data.slice(0, 60).map(item => item.split(',')[8]).filter(zdf => zdf > 5 && zdf < 9).length
            const Month3Statistic10Percent = data.slice(0, 60).map(item => item.split(',')[8]).filter(zdf => zdf > 9).length
            const Month3_arr = [
                { name: '季度次数', data: [Month3Statistic10Percent, Month3Statistic5Percent, Month3Statistic3Percent], type: 'bar' },
            ]

            /* 月 */
            const oneMonthStatistic3Percent = data.slice(0, 21).map(item => item.split(',')[8]).filter(zdf => zdf > 3 && zdf < 5).length
            const oneMonthStatistic5Percent = data.slice(0, 21).map(item => item.split(',')[8]).filter(zdf => zdf > 5 && zdf < 9).length
            const oneMonthStatistic10Percent = data.slice(0, 21).map(item => item.split(',')[8]).filter(zdf => zdf > 9).length
            const oneMonth_arr = [
                { name: '一月次数', data: [oneMonthStatistic10Percent, oneMonthStatistic5Percent, oneMonthStatistic3Percent], type: 'bar' },
            ]

            /* 2周 */
            const Week2Statistic3Percent = data.slice(0, 13).map(item => item.split(',')[8]).filter(zdf => zdf > 3 && zdf < 5).length
            const Week2Statistic5Percent = data.slice(0, 13).map(item => item.split(',')[8]).filter(zdf => zdf > 5 && zdf < 9).length
            const Week2Statistic10Percent = data.slice(0, 13).map(item => item.split(',')[8]).filter(zdf => zdf > 9).length
            const Week2_arr = [
                { name: '两周次数', data: [Week2Statistic10Percent, Week2Statistic5Percent, Week2Statistic3Percent], type: 'bar' },
            ]

            /* 横坐标 点数 */
            const date = ['10点次数', '5点次数', '3点次数']

            /* 2 画布个数 */
            const datas = [
                { date, data: year_arr },
                { date, data: halfYear_arr },
                { date, data: Month3_arr },
                { date, data: oneMonth_arr },
                { date, data: Week2_arr },
            ]
            /* 8 渲染涨幅度画布 涨幅度数量统计*/
            datas.forEach((every, index) => {
                const { date, data } = every
                this.updateConfig({ date, data, colName: this.dataObj.byd.name })
                const temp = JSON.parse(JSON.stringify(this.option))
                setTimeout(() => {
                    this.renderCanavas(this.myCharts[`myChart${index + 13}`], temp)
                }, 300)
            })
        },
        /* 累计每天跌幅度数量统计 半年 季度 月份 周情况 */
        LJDFDayInit() {
            // "2020-12-10, 168.00, 169.52, 171.66, 166.02, 370436, 6243808768.00, 3.26, -2.15, -3.72, 3.23"
            // index 开盘价 1 收盘价 2 最高价 3 最低价 4 成交量 5 成交额 6 振幅(当天最高最低差额/前一天收盘价) 7 涨跌幅 8 涨跌额 9 换手率 10
            if (!this.dataObj.byd) { return }
            const data = JSON.parse(JSON.stringify(this.dataObj.byd.klines || [])).reverse(); // 时间降序

            /* 一年 跌幅次数统计*/
            const yearStatistic3Percent = data.slice(0, 240).map(item => item.split(',')[8]).filter(zdf => zdf > -3 && zdf < 0).length
            const yearStatistic4Percent = data.slice(0, 240).map(item => item.split(',')[8]).filter(zdf => zdf > -5 && zdf < -3).length
            const yearStatistic5Percent = data.slice(0, 240).map(item => item.split(',')[8]).filter(zdf => zdf < -5 && zdf > -9).length
            const yearStatistic10Percent = data.slice(0, 240).map(item => item.split(',')[8]).filter(zdf => zdf < -9).length
            const year_arr = [
                { name: '一年次数', data: [yearStatistic10Percent, yearStatistic5Percent, yearStatistic4Percent, yearStatistic3Percent], type: 'bar' },
            ]

            /* 半年 跌幅次数统计*/
            const halfYearStatistic3Percent = data.slice(0, 120).map(item => item.split(',')[8]).filter(zdf => zdf > -3 && zdf < 0).length
            const halfYearStatistic4Percent = data.slice(0, 120).map(item => item.split(',')[8]).filter(zdf => zdf > -5 && zdf < -3).length
            const halfYearStatistic5Percent = data.slice(0, 120).map(item => item.split(',')[8]).filter(zdf => zdf < -5 && zdf > -9).length
            const halfYearStatistic10Percent = data.slice(0, 120).map(item => item.split(',')[8]).filter(zdf => zdf < -9).length
            const halfYear_arr = [
                { name: '半年次数', data: [halfYearStatistic10Percent, halfYearStatistic5Percent, halfYearStatistic4Percent, halfYearStatistic3Percent], type: 'bar' },
            ]

            /* 季度 跌幅次数统计*/
            const Month3Statistic3Percent = data.slice(0, 60).map(item => item.split(',')[8]).filter(zdf => zdf > -3 && zdf < 0).length
            const Month3Statistic4Percent = data.slice(0, 60).map(item => item.split(',')[8]).filter(zdf => zdf > -5 && zdf < -3).length
            const Month3Statistic5Percent = data.slice(0, 60).map(item => item.split(',')[8]).filter(zdf => zdf < -5 && zdf > -9).length
            const Month3Statistic10Percent = data.slice(0, 60).map(item => item.split(',')[8]).filter(zdf => zdf < -9).length
            const Month3_arr = [
                { name: '季度次数', data: [Month3Statistic10Percent, Month3Statistic5Percent, Month3Statistic4Percent, Month3Statistic3Percent], type: 'bar' },
            ]

            /* 月 跌幅次数统计*/
            const oneMonthStatistic3Percent = data.slice(0, 21).map(item => item.split(',')[8]).filter(zdf => zdf > -3 && zdf < 0).length
            const oneMonthStatistic4Percent = data.slice(0, 21).map(item => item.split(',')[8]).filter(zdf => zdf > -5 && zdf < -3).length
            const oneMonthStatistic5Percent = data.slice(0, 21).map(item => item.split(',')[8]).filter(zdf => zdf < -5 && zdf > -9).length
            const oneMonthStatistic10Percent = data.slice(0, 21).map(item => item.split(',')[8]).filter(zdf => zdf < -9).length
            const oneMonth_arr = [
                { name: '一月次数', data: [oneMonthStatistic10Percent, oneMonthStatistic5Percent, oneMonthStatistic4Percent, oneMonthStatistic3Percent], type: 'bar' },
            ]

            /* 2周 跌幅次数统计*/
            const Week2Statistic3Percent = data.slice(0, 13).map(item => item.split(',')[8]).filter(zdf => zdf > -3 && zdf < 0).length
            const Week2Statistic4Percent = data.slice(0, 13).map(item => item.split(',')[8]).filter(zdf => zdf > -5 && zdf < -3).length
            const Week2Statistic5Percent = data.slice(0, 13).map(item => item.split(',')[8]).filter(zdf => zdf < -5 && zdf > -9).length
            const Week2Statistic10Percent = data.slice(0, 13).map(item => item.split(',')[8]).filter(zdf => zdf < -9).length
            const Week2_arr = [
                { name: '两周次数', data: [Week2Statistic10Percent, Week2Statistic5Percent, Week2Statistic4Percent, Week2Statistic3Percent], type: 'bar' },
            ]

            /* 横坐标 点数 */
            const date = ['-10点次数', '-5点上次数', '-4内点次数', '-3点内次数']

            /* 2 画布个数 */
            const datas = [
                { date, data: year_arr },
                { date, data: halfYear_arr },
                { date, data: Month3_arr },
                { date, data: oneMonth_arr },
                { date, data: Week2_arr },
            ]
            /* 9 渲染跌幅度画布 跌幅度数量统计*/
            datas.forEach((every, index) => {
                const { date, data } = every
                this.updateConfig({ date, data, colName: this.dataObj.byd.name })
                const temp = JSON.parse(JSON.stringify(this.option))
                setTimeout(() => {
                    this.renderCanavas(this.myCharts[`myChart${index + 18}`], temp)
                }, 300)
            })
        },
        /* 历年利润占总收入比率变化 */
        profitIncomRateInit() {
            // if (!this.dataObj.financeTableDataYear) { return }

            // const data = JSON.parse(JSON.stringify(this.dataObj.financeTableDataYear)).reverse() || []
            // /* 日期对应 */
            // const date_arr = data.map(item => item.date)
            // debugger
            // /* 年利润 */
            // const yearProfits_arr = data.map(item => {
            //     if (item.yyzsr.slice(-1) === '万') {
            //         return item.yyzsr.slice(0, -1) / 10000
            //     } else {
            //         return item.yyzsr.slice(0, -1)
            //     }
            // })
            // const yearProfitsFormat_arr = yearProfits_arr.map((item, index) => ((yearProfits_arr[index + 1] - item) / item * 100).toFixed(1)).slice(0, -1)

            // /* 年营业总收入 */
            // const yearIncome_arr = data.map(item => {
            //     if (item.gsjlr.slice(-1) === '万') {
            //         return (item.gsjlr.slice(0, -1) / 10000).toFixed(1)
            //     } else {
            //         return item.gsjlr.slice(0, -1)
            //     }
            // })
            // const yearProfitIncomeRate_arr = yearIncome_arr.map((item, index) => ((yearIncome_arr[index + 1] - item) / item * 100).toFixed(1)).slice(0, -1)

            // //  debugger
            // const Income_arr = [
            //     { name: '年利润营业总收入比率', data: yearProfitIncomeRate_arr, type: 'line' },
            // ] || []
            // this.updateConfig({ date: date_arr, data: Income_arr, colName: this.dataObj.byd.name })
            // const temp = JSON.parse(JSON.stringify(this.option))
            // /* 10 渲染融资融券画布 年营业总收入增长率*/
            // setTimeout(() => {
            //     this.renderCanavas(this.myCharts[`myChart${23}`], temp)
            // }, 300)
        },
        handleStrong({ dataStock, dataSZZS }) {
            // 2020-12-31, 3419.73, 3473.07, 3474.92, 3419.73, 335673925, 450482319360.00, 1.62, 1.72, 58.62, 0.89
            // 大盘 index 日期 0 涨跌幅 8
            const szzsDFArr = dataSZZS.filter(SZZS => SZZS.split(',')[8] < 0)
            /* 20天跌幅 */
            const szzsDF20DaysArr = szzsDFArr.slice(0, 20).reverse() // 最近大盘下跌20天数据
            const szzsDFDateArr = szzsDF20DaysArr.map(DFStr => DFStr.split(',')[0]) // 上证跌幅对应日期数组 用于匹配个股用
            const stockZDF20DaysArr = dataStock.filter(stockStr => szzsDFDateArr.includes(stockStr.split(',')[0])).reverse()
            /* 最终数据 */
            const date_arr = szzsDFDateArr
            const szzsDF20DaysDatas = szzsDF20DaysArr.map(DFStr => DFStr.split(',')[8])
            const stockZDF20DaysDatas = stockZDF20DaysArr.map(ZDFStr => ZDFStr.split(',')[8])
            return {
                date_arr,
                szzsDF20DaysDatas,
                stockZDF20DaysDatas,
            }
        },
        handleCompare({ dataStock, dataSZZS }) {
            // 2020-12-31, 3419.73, 3473.07, 3474.92, 3419.73, 335673925, 450482319360.00, 1.62, 1.72, 58.62, 0.89
            // 大盘 index 日期 0 涨跌幅 8
            const szzsZDFArr = dataSZZS.filter(SZZS => SZZS.split(',')[8])
            /* 20天跌幅 */
            const szzsZDF20DaysArr = szzsZDFArr.slice(0, 20).reverse() // 最近大盘下跌20天数据
            const szzsZDFDateArr = szzsZDF20DaysArr.map(DFStr => DFStr.split(',')[0]) // 上证跌幅对应日期数组
            const stockZDF20DaysArr = dataStock.slice(0, 20).reverse()
            /* 最终数据 */
            const date_arr = szzsZDFDateArr
            const szzsZDF20DaysDatas = szzsZDF20DaysArr.map(DFStr => DFStr.split(',')[8])
            const stockZDF20DaysDatas = stockZDF20DaysArr.map(ZDFStr => ZDFStr.split(',')[8])
            return {
                date_arr,
                szzsZDF20DaysDatas,
                stockZDF20DaysDatas,
            }
        },
        /* 获取upper的斜率 */
        getRatio(suf, pre) { // pre时间前一天， suf后一天
            if (!pre) { return '-' }
            const ratio = (suf.upper - pre.upper) / pre.upper
            return `${((ratio) * 100).toFixed(2)}`
        },
        /* 获取带宽变化的斜率 */
        getBollWidthRatio(suf, pre) { // pre时间前一天， suf后一天
            if (!pre) { return '-' }
            const bollWidthRatio = (suf.bollWidth - pre.bollWidth) / pre.bollWidth
            return `${((bollWidthRatio) * 100).toFixed(2)}`
        },
        /* 获取布林带宽 */
        getBollWidth(obj) { // 包含upper, lower数据
            // if (!pre) { return '-' }
            const bollWidth = obj.upper - obj.lower
            return bollWidth.toFixed(2)
        },
        /* 获取斜率 */
        getRatio(suf, pre) { // pre时间前一天， suf后一天
            if (!pre) { return '-' }
            const ratio = (suf.upper - pre.upper) / pre.upper
            return `${((ratio) * 100).toFixed(2)}`
        },
        /* 更新画布配置 */
        updateConfig({ date, data, colName }) {

            /**
             * 表格头 // 取第一个数据name
             */
            const option = this.option;
            const names = data.map(item => item.name).join('&'); // 多标题
            option.title.text = colName ? `${colName}-(${names})` : names;
            // 内容
            option.xAxis = [
                {
                    type: 'category',
                    data: date
                }
            ];
            // 纵坐标数据可能多个类
            option.series = data;
            /* 纵坐标 值类型设置 */
            option.yAxis = {
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                }
            };
            // data[0].name === '斜率' && (option.yAxis.axisLabel.formatter = '{value}%')
            const ratioIncludes = [
                '斜率',
                '带宽斜率',
                '最高点数',
                '最低点数',
                '每天振幅',
                '当天涨幅',
                '前20天累计点数',
                '前5天累计点数',
                '距20均偏移量',
                '大盘跌幅',
                '个股',
                '个股走势',
                '大盘走势',
                '资产收益率',
                '年营业收入增长率',
                '年应收账款增长率',
                '年库存增长率',
                '年预付账款增长率',
                '年应收账款营业收入比',
            ]

            ratioIncludes.includes(data[0].name) && (option.yAxis.axisLabel.formatter = '{value}%')
        },
        /* 数字累加 */
        // accumulator(numArr){
        //     if (!numArr) { numArr = []; return }
        //     const reducer = (accumulator, currentValue) => (accumulator * 1 + currentValue * 1).toFixed(2);
        //     return numArr.reduce(reducer)
        // }
    },
    components: {},
    created() {
    },
    mounted() {
        // this.mixinInit()
    },
    computed: {}
};



// /**
//  * 表格头
//  */
// // option.title.text = `${rzrjData[0].SNAME}-券资比`
// // 内容
// option.xAxis = [
//     {
//         type: 'category',
//         data: date_arr
//     }
// ]

// option.series = [
//     {
//         name: '布林上轨',
//         data: upper_arr,
//         type: 'line'
//     },
//     {
//         name: '斜率',
//         data: ratio_arr,
//         stack: '比值',
//         type: 'line'
//     }
// ]

// 处理数据
// var Datas = []
// Datas.forEach((item, index) => {
// const temp = JSON.parse(JSON.stringify(option))
// setTimeout(() => {
//     // this.myCharts [`myChart${index}`].setOption(temp); // 延时画布生成
//     this.myCharts .myChart0.setOption(temp); // 延时画布生成
//     this.myCharts .myChart1.setOption(temp); // 延时画布生成
// })
// })