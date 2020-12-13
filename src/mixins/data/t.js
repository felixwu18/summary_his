!function ($) {
                ///资金流向排行数据配置
                var ggfields = {
                    "1": ["f12", "f14", "f2", "f3", "f62", "f184", "f66", "f69", "f72", "f75", "f78", "f81", "f84", "f87", "f204", "f205", "f124"],
                    "3": ["f12", "f14", "f2", "f127", "f267", "f268", "f269", "f270", "f271", "f272", "f273", "f274", "f275", "f276", "f257", "f258", "f124"],
                    "5": ["f12", "f14", "f2", "f109", "f164", "f165", "f166", "f167", "f168", "f169", "f170", "f171", "f172", "f173", "f257", "f258", "f124"],
                    "10": ["f12", "f14", "f2", "f160", "f174", "f175", "f176", "f177", "f178", "f179", "f180", "f181", "f182", "f183", "f260", "f261", "f124"]
                }
                var chartbkzjloadcont = 0;
                var zjlxinitfuncs = {
                    init_chartfs: function (hqcode, chartobj, danwei) {
                        var _this = this;
                        var data = {
                            lmt: "0",
                            klt: "1",
                            secid: hqcode,
                            fields1: "f1,f2,f3,f7",
                            fields2: "f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61,f62,f63",
                            ut: newHqut || "b2884a393a59ad64002292a3e90d46a5"
                        };
                        var arr = [];
                        for (var k in data) {
                            arr.push(k + "=" + data[k]);
                        }
                        var fullurl = newHqDomain + 'api/qt/stock/fflow/kline/get?' + arr.join("&");
                        Tools.getJsonDataNewHq(fullurl, function (json) {
                            var kline_data = json && json.data && json.data.klines;
                            var periods = json && json.data && json.data.tradePeriods && json.data.tradePeriods.periods;
                            if (kline_data && kline_data.length > 0 && periods) {
                                var suffix = danwei == 100000000 ? "亿元" : "万元";
                                var value = {
                                    xaxis: _this.getPeriods(periods),
                                    series: []
                                };
                                var main = {
                                    name: "主力净流入",
                                    color: "#FE3EE1",
                                    data: [],
                                    suffix: suffix
                                };
                                var small = {
                                    name: "小单净流入",
                                    color: "#94C4EE",
                                    data: [],
                                    suffix: suffix
                                };
                                var middle = {
                                    name: "中单净流入",
                                    color: "#FFB83D",
                                    data: [],
                                    suffix: suffix
                                };
                                var big = {
                                    name: "大单净流入",
                                    color: "#FF1117",
                                    data: [],
                                    suffix: suffix
                                };
                                var large = {
                                    name: "超大单净流入",
                                    color: "#650000",
                                    data: [],
                                    suffix: suffix
                                };
                                for (var i = 0; i < value.xaxis.length; i++) {
                                    var data = kline_data[i];
                                    var arr = data && data.split(',');
                                    if (arr && arr.length >= 6) {
                                        main.data.push(Tools.toFixed(arr[1] / danwei, 4));
                                        small.data.push(Tools.toFixed(arr[2] / danwei, 4));
                                        middle.data.push(Tools.toFixed(arr[3] / danwei, 4));
                                        big.data.push(Tools.toFixed(arr[4] / danwei, 4))
                                        large.data.push(Tools.toFixed(arr[5] / danwei, 4));
                                    }
                                    else {
                                        main.data.push("");
                                        small.data.push("");
                                        middle.data.push("");
                                        big.data.push("")
                                        large.data.push("");
                                    }
                                }
                                value.series.push(main);
                                value.series.push(large);
                                value.series.push(big);
                                value.series.push(middle);
                                value.series.push(small);
                                $(chartobj.container).css({ "background-image": "" });
                                _this.drawLine(value, chartobj);
                            }
                            else {
                                $(chartobj.container).css({ "background-image": "url(/images/panqianqingkong.jpg)", "background-repeat": "no-repeat" });
                            }
                        }, function (err) {
                            $(chartobj.container).css({ "background-image": "url(/images/panqianqingkong.jpg)", "background-repeat": "no-repeat" });
                        })
                    },
                    init_datanum: function (hqcode, chartobj, chartobj2, danwei) {
                        var _this = this;
                        var data = {
                            fltt: "2",
                            secids: hqcode,
                            fields: "f62,f184,f66,f69,f72,f75,f78,f81,f84,f87,f64,f65,f70,f71,f76,f77,f82,f83,f164,f166,f168,f170,f172,f252,f253,f254,f255,f256,f124,f6,f278,f279,f280,f281,f282",
                            ut: newHqut || "b2884a393a59ad64002292a3e90d46a5"
                        };
                        var arr = [];
                        for (var k in data) {
                            arr.push(k + "=" + data[k]);
                        }
                        var fullurl = newHqDomain + 'api/qt/ulist.np/get?' + arr.join("&");
            
                        Tools.getJsonDataNewHq(fullurl, function (json) {
                            var data = json && json.data && json.data.diff && json.data.diff[0];
                            var data2 = json && json.data && json.data.diff && json.data.diff[1];
                            if (data2) {
                                var data_f6 = data["f6"] + data2["f6"];
                                for (var key in data2) {
                                    if (key == 'f124') { //更新时间字段
                                        continue;
                                    }
                                    if (typeof (data2[key]) == 'number') {
                                        data[key] = data[key] + data2[key];
                                    }
                                }
                                data["f184"] = data["f62"] / data_f6 * 100;
                                data["f69"] = data["f66"] / data_f6 * 100;
                                data["f75"] = data["f72"] / data_f6 * 100;
                                data["f81"] = data["f78"] / data_f6 * 100;
                                data["f87"] = data["f84"] / data_f6 * 100;
                            }
                            if (data) {
                                var suffix = danwei == 100000000 ? "亿元" : "万元";
                                $("[data-bind]", ".flash-data-cont-line").each(function () {
                                    var ele = $(this);
                                    var key = "f" + ele.data("bind");
                                    if (data[key] != undefined) {
                                        var value = 0;
                                        if (ele.data("type") == "%")
                                            value = Tools.toPercent(data[key]);
                                        else
                                            value = Tools.toFixed(data[key] / danwei, 4);
                                        var color = Tools.getColor(value);
                                        ele.html(value).removeClass("red").removeClass("green");
                                        ele.addClass(color);
                                    }
                                });
                                $("[data-bind]", ".flash-legendrt").each(function () {
                                    var ele = $(this);
                                    var key = "f" + ele.data("bind");
                                    if (data[key] != undefined) {
                                        var value = Tools.toFixed(data[key] / danwei, 4);
                                        if (ele.data("sign") == '-') {
                                            value = (value == '-' || value == 0) ? value : ('-' + value);
                                        }
                                        ele.html(value);
                                    }
                                });
                                if (chartobj) {
                                    var value = [];
                                    value.push({
                                        name: "小单流入",
                                        color: "#ff8080",
                                        value: Tools.toFixed(data["f82"] / danwei, 4),
                                        showInfo: true
                                    });
                                    value.push({
                                        name: "中单流入",
                                        color: "#f83434",
                                        value: Tools.toFixed(data["f76"] / danwei, 4),
                                        showInfo: true
                                    });
                                    value.push({
                                        name: "大单流入",
                                        color: "#ae0000",
                                        value: Tools.toFixed(data["f70"] / danwei, 4),
                                        showInfo: true
                                    });
                                    value.push({
                                        name: "超大单流入",
                                        color: "#650000",
                                        value: Tools.toFixed(data["f64"] / danwei, 4),
                                        showInfo: true
                                    });
            
                                    value.push({
                                        name: "超大单流出",
                                        color: "#004800",
                                        value: Tools.toFixed(data["f65"] / danwei, 4),
                                        show: true,
                                        showInfo: true
                                    });
                                    value.push({
                                        name: "大单流出",
                                        color: "#0a820a",
                                        value: Tools.toFixed(data["f71"] / danwei, 4),
                                        showInfo: true
                                    });
                                    value.push({
                                        name: "中单流出",
                                        color: "#27b729",
                                        value: Tools.toFixed(data["f77"] / danwei, 4),
                                        showInfo: true
                                    });
                                    value.push({
                                        name: "小单流出",
                                        color: "#77e97a",
                                        value: Tools.toFixed(data["f83"] / danwei, 4),
                                        showInfo: true
                                    });
                                    if (data["f64"] + data["f70"] + data["f76"] + data["f82"] == 0) {
                                        $(chartobj.container).css({ "background-image": "url(/images/panqianqingkong_bing.jpg)", "background-repeat": "no-repeat" });
                                    }
                                    else {
                                        $(chartobj.container).css({ "background-image": "" });
                                        _this.drawPie(value, chartobj);
                                    }
                                }
                                if (chartobj2) {
                                    var series = [];
                                    series.push({
                                        prefix: '主力净流入',
                                        suffix: suffix,
                                        color: '#FE3EE1',
                                        data: [Tools.toFixed(data["f278"] / danwei, 4), Tools.toFixed(data["f252"] / danwei, 4)]
                                    });
                                    series.push({
                                        prefix: '超大单净流入',
                                        suffix: suffix,
                                        color: '#650000',
                                        data: [Tools.toFixed(data["f279"] / danwei, 4), Tools.toFixed(data["f253"] / danwei, 4)]
                                    });
                                    series.push({
                                        prefix: '大单净流入',
                                        suffix: suffix,
                                        color: '#FF1117',
                                        data: [Tools.toFixed(data["f280"] / danwei, 4), Tools.toFixed(data["f254"] / danwei, 4)]
                                    });
                                    series.push({
                                        prefix: '中单净流入',
                                        suffix: suffix,
                                        color: '#FFB83D',
                                        data: [Tools.toFixed(data["f281"] / danwei, 4), Tools.toFixed(data["f255"] / danwei, 4)]
                                    });
                                    series.push({
                                        prefix: '小单净流入',
                                        suffix: suffix,
                                        color: '#94C4EE',
                                        data: [Tools.toFixed(data["f282"] / danwei, 4), Tools.toFixed(data["f256"] / danwei, 4)]
                                    });
                                    chartobj2.options.yaxis = [{
                                        value: "一周(5日)\n资金流入",
                                        show: true,
                                        showline: true
                                    }, {
                                        value: "一月(20日)\n资金流入",
                                        show: true,
                                        showline: true
                                    }];
                                    chartobj2.options.series = series;
                                    chartobj2.draw();
                                }
                                $("#updateTime_0,#updateTime_1").html(new Date(data["f124"] * 1000).format("hh:mm"));
                            }
                        })
                    },
                    init_chartph: function (hqcode, chartobj, table, danwei) {
                        var _this = this;
                        var data = {
                            lmt: "0",
                            klt: "101",
                            secid: hqcode,
                            fields1: "f1,f2,f3,f7",
                            fields2: "f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61,f62,f63,f64,f65",
                            ut: newHqut || "b2884a393a59ad64002292a3e90d46a5"
                        };
                        var arr = [];
                        for (var k in data) {
                            arr.push(k + "=" + data[k]);
                        }
                        var fullurl = newHqDomain_K + 'api/qt/stock/fflow/daykline/get?' + arr.join("&");
                        Tools.getJsonDataNewHq(fullurl, function (json) {
                            var kline_data = json && json.data && json.data.klines;
                            if (kline_data && kline_data.length > 0) {
                                var suffix = danwei == 100000000 ? "亿元" : "万元";
                                var value = {
                                    xaxis: [],
                                    series: []
                                };
                                var main = {
                                    name: "主力净流入",
                                    color: "#FE3EE1",
                                    data: [],
                                    suffix: suffix
                                };
                                var small = {
                                    name: "小单净流入",
                                    color: "#94C4EE",
                                    data: [],
                                    suffix: suffix
                                };
                                var middle = {
                                    name: "中单净流入",
                                    color: "#FFB83D",
                                    data: [],
                                    suffix: suffix
                                };
                                var big = {
                                    name: "大单净流入",
                                    color: "#FF1117",
                                    data: [],
                                    suffix: suffix
                                };
                                var large = {
                                    name: "超大单净流入",
                                    color: "#650000",
                                    data: [],
                                    suffix: suffix
                                };
                                var kline_chart_data = kline_data.slice(-42);//从倒数第42到最后一个
                                var _y = kline_chart_data.length;
                                var is100 = 101;
                                var mo = _y == 100 ? (is100 = 0, 25) : (_y / 25) > 3 ? 25 : ((_y / 20) > 3 ? 20 : ((_y / 15) > 3 ? 15 : ((_y / 10) > 3 ? 10 : 5)));//满100条数据的情况下25
                                for (var i = 0; i < kline_chart_data.length; i++) {
                                    var data = kline_chart_data[i];
                                    var arr = data && data.split(',');
                                    if (arr && arr.length >= 6) {
                                        var isShow = false;
                                        var f = _y - (i + 1);//反序对应数
                                        if (f % mo == 0 || i == is100) {
                                            isShow = true;
                                        }
                                        value.xaxis.push({
                                            value: Tools.dateFormat2(arr[0], "MM-dd"),
                                            showline: isShow,
                                            show: isShow
                                        });
                                        main.data.push(Tools.toFixed(arr[1] / danwei, 4));
                                        small.data.push(Tools.toFixed(arr[2] / danwei, 4));
                                        middle.data.push(Tools.toFixed(arr[3] / danwei, 4));
                                        big.data.push(Tools.toFixed(arr[4] / danwei, 4))
                                        large.data.push(Tools.toFixed(arr[5] / danwei, 4));
                                    }
                                }
                                value.series.push(main);
                                value.series.push(large);
                                value.series.push(big);
                                value.series.push(middle);
                                value.series.push(small);
                                _this.drawLine(value, chartobj);
            
                                if (table) {
                                    var tbody = $("tbody", table);
                                    var isls = hqcode.indexOf("secid2") > 0;
                                    var isbk = hqcode.indexOf("BK") > 0;
                                    for (var i = kline_data.length - 1; i >= 0; i--) {
                                        var data = kline_data[i];
                                        var arr = data && data.split(',');
                                        if (arr && arr.length >= 15) {
                                            if (!isbk && i == kline_data.length - 1) {
                                                var rq = Tools.dateFormat2(arr[0], "yyyy-MM-dd");
                                                document.getElementById("updateTime_2").innerHTML = document.getElementById("updateTime_3").innerHTML = rq;
                                            }
                                            var tr = "<tr>";
                                            tr += "<td>" + Tools.dateFormat2(arr[0], "yyyy-MM-dd") + "</td>";
                                            if (!isbk) {
                                                tr += "<td><span class=\"" + Tools.getColor(arr[12]) + "\">" + arr[11] + "</span></td>";
                                                tr += "<td><span class=\"" + Tools.getColor(arr[12]) + "\">" + Tools.toPercent(arr[12]) + "</span></td>";
                                            }
                                            if (isls) {
                                                tr += "<td><span class=\"" + Tools.getColor(arr[14]) + "\">" + arr[13] + "</span></td>";
                                                tr += "<td><span class=\"" + Tools.getColor(arr[14]) + "\">" + Tools.toPercent(arr[14]) + "</span></td>";
                                            }
                                            tr += "<td>" + Tools.getColorByDate(arr[1]) + "</td>";
                                            tr += "<td>" + Tools.getColorByDate(arr[6], 2, "%") + "</td>";
                                            tr += "<td>" + Tools.getColorByDate(arr[5]) + "</td>";
                                            tr += "<td>" + Tools.getColorByDate(arr[10], 2, "%") + "</td>";
                                            tr += "<td>" + Tools.getColorByDate(arr[4]) + "</td>";
                                            tr += "<td>" + Tools.getColorByDate(arr[9], 2, "%") + "</td>";
                                            tr += "<td>" + Tools.getColorByDate(arr[3]) + "</td>";
                                            tr += "<td>" + Tools.getColorByDate(arr[8], 2, "%") + "</td>";
                                            tr += "<td>" + Tools.getColorByDate(arr[2]) + "</td>";
                                            tr += "<td>" + Tools.getColorByDate(arr[7], 2, "%") + "</td>";
                                            tr += "</tr>";
                                            tbody.append(tr);
                                        }
                                    }
                                }
                            }
                        })
                    },
                    init_chartbkzj: function (code, chartobj, key) {
                        key = key || "f62";
                        var _this = this;
                        var data = {
                            pn: 1,
                            pz: 500,
                            po: 1,
                            np: "1",
                            fields: "f12,f13,f14," + key,
                            fid: key,
                            fs: code,
                            ut: newHqut || "b2884a393a59ad64002292a3e90d46a5"
                        };
                        var arr = [];
                        for (var k in data) {
                            arr.push(k + "=" + data[k]);
                        }
                        var fullurl = newHqDomain + 'api/qt/clist/get?' + arr.join("&");
                        Tools.getJsonDataNewHq(fullurl, function (json) {
                            var data = json && json.data && json.data.diff;
                            if (data) {
                                var names = [], ydatas = [], objs = {};
                                for (var i = 0; i < data.length; i++) {
                                    var item = data[i];
                                    names.push(item["f14"]);
                                    ydatas.push(item[key]);
                                    objs[item["f14"]] = item;
                                }
                                if (chartbkzjloadcont > 0) {
                                    chartobj.setOption({ xAxis: {data:names},series: [{ data: ydatas }] });
                                    chartbkzjloadcont++;
                                }
                                else {
                                    var option = {
                                        tooltip: {
                                            trigger: 'axis',
                                            formatter: function (data) {
                                                var str = "";
                                                var date = data[0].axisValue;
                                                var linecount = 1;
                                                if (data.length > 20)
                                                    linecount = 5;
                                                for (var i = 0; i < data.length; i++) {
                                                    if (Tools.isExist(data[i].value)) {
                                                        str += data[i].marker + '<span style ="display:inline-block;width:155px;" >' + (data[i].value >= 0 ? "主力净流入" : "主力净流出") + ':' + Tools.FixAmt(data[i].value, 2) + '</span>' + ((i + 1) % linecount == 0 ? '<br/>' : '&nbsp;');
                                                    }
            
                                                }
                                                return date + '<br/>' + str;
                                            }
                                        },
                                        dataZoom: [
                                            {
                                                type: 'slider',
                                                show: true,
                                                endValue: 31,
                                                zoomLock: true
                                            }
                                        ],
                                        legend: {
                                            show: false
                                        },
                                        grid: {
                                            left: 65,
                                            right: 10,
                                            top: 33,
                                            bottom: 150
                                        },
                                        xAxis: {
                                            type: 'category',
                                            triggerEvent: true,
                                            data: names,
                                            axisTick: { show: false },
                                            splitLine: {
                                                show: false
                                            },
                                            axisLabel: {
                                                interval: 0,
                                                textStyle: {
                                                    color: '#00298F'
                                                },
                                                formatter: function (value) {
                                                    var str = value.split("");
                                                    return str.join("\n");
                                                }
                                            }
            
                                        },
                                        yAxis: [
                                            {
                                                //name: '单位(元)',
                                                type: 'value',
                                                //scale: true,
                                                axisTick: { show: false },
                                                axisLabel: {
                                                    formatter: function (value, index) {
                                                        return Tools.FixAmt(value, 1);
                                                    }
                                                },
                                                splitLine: {
                                                    show: true,
                                                    lineStyle: {
                                                        type: 'dotted',
                                                        color: "#E6E6E6"
                                                    }
                                                }
                                            }
            
                                        ],
                                        series: [
                                            {
                                                name: "主力净流入",
                                                type: 'bar',
                                                itemStyle: {
                                                    normal: {
                                                        color: function (params) {
                                                            if (params.data >= 0)
                                                                return "#FF3F3E";
                                                            else
                                                                return "#06960A";
                                                        }
                                                    }
                                                },
                                                barWidth: 15,
                                                label: {
                                                    normal: {
                                                        show: true,
                                                        position: 'top',
                                                        formatter: function (value, index) {
                                                            return Math.abs(value.data) < 50000000 ? "" : Tools.toFixed(value.data / 100000000, 1) + "亿";
                                                        },
                                                        fontSize: 8
                                                    }
                                                },
                                                data: ydatas
                                            }
                                        ]
                                    };
                                    chartobj.setOption(option);
                                    chartobj.on('click', function (params) {
                                        if (params.componentType == "xAxis")
                                            window.open('/bkzj/' + objs[params.value]["f12"] + '.html');
                                    })
                                    chartbkzjloadcont++;
                                }
                            }
                        })
                    },
                    init_chartbkzj_s: function (code, chartobj, po, key) {
                        key = key || "f62";
                        var _this = this;
                        var data = {
                            pn: 1,
                            pz: 10,
                            po: po,
                            np: "1",
                            fields: "f12,f13,f14," + key,
                            fid: key,
                            fs: code,
                            ut: newHqut || "b2884a393a59ad64002292a3e90d46a5"
                        };
                        var arr = [];
                        for (var k in data) {
                            arr.push(k + "=" + data[k]);
                        }
                        var fullurl = newHqDomain + 'api/qt/clist/get?' + arr.join("&");
                        Tools.getJsonDataNewHq(fullurl, function (json) {
                            var data = json && json.data && json.data.diff;
                            if (data) {
                                var names = [], ydatas = [], objs = {};
                                for (var i = 0; i < data.length; i++) {
                                    var item = data[i];
                                    names.push(item["f14"]);
                                    ydatas.push(item[key]);
                                    objs[item["f14"]] = item;
                                }
                                var option = {
                                    tooltip: {
                                        trigger: 'axis',
                                        formatter: function (data) {
                                            var str = "";
                                            var date = data[0].axisValue;
                                            var linecount = 1;
                                            if (data.length > 20)
                                                linecount = 5;
                                            for (var i = 0; i < data.length; i++) {
                                                if (Tools.isExist(data[i].value)) {
                                                    str += data[i].marker + '<span style ="display:inline-block;width:155px;" >' + (data[i].value >= 0 ? "主力净流入" : "主力净流出") + ':' + Tools.FixAmt(data[i].value, 2) + '</span>' + ((i + 1) % linecount == 0 ? '<br/>' : '&nbsp;');
                                                }
            
                                            }
                                            return date + '<br/>' + str;
                                        },
                                        confine: true
                                    },
                                    legend: {
                                        //left: 'center'
                                        show: false
                                    },
                                    grid: {
                                        left: 10,
                                        right: 10,
                                        top: 5,
                                        bottom: 105
                                    },
                                    xAxis: {
                                        type: 'category',
                                        triggerEvent: true,
                                        data: names,
                                        axisTick: { show: false },
                                        splitLine: {
                                            show: false
                                        },
                                        axisLabel: {
                                            interval: 0,
                                            textStyle: {
                                                color: '#00298F'
                                            },
                                            formatter: function (value) {
                                                var str = value.split("");
                                                return str.join("\n");
                                            }
                                        }
            
                                    },
                                    yAxis: [
                                        {
                                            show: false,
                                            name: '单位(元)',
                                            type: 'value',
                                            //scale: true,
                                            axisTick: { show: false },
                                            axisLabel: {
                                                formatter: function (value, index) {
                                                    return Tools.FixAmt(value, 1, "元");
                                                }
                                            },
                                            splitLine: {
                                                show: true,
                                                lineStyle: {
                                                    type: 'dotted',
                                                    color: "#E6E6E6"
                                                }
                                            }
                                        }
            
                                    ],
                                    series: [
                                        {
                                            name: "",
                                            type: 'bar',
                                            itemStyle: {
                                                normal: {
                                                    color: function (params) {
                                                        if (params.data >= 0)
                                                            return "#FF3F3E";
                                                        else
                                                            return "#06960A";
                                                    }
                                                }
                                            },
                                            data: ydatas
                                        }
                                    ]
                                };
                                chartobj.setOption(option);
                                chartobj.on('click', function (params) {
                                    if (params.componentType == "xAxis")
                                        window.open('/bkzj/' + objs[params.value]["f12"] + '.html');
                                })
                            }
                        })
                    },
                    init_tophqnum: function (hqcode, dom) {
                        var data = {
                            fltt: "2",
                            secids: hqcode,
                            fields: "f1,f2,f3,f4,f6,f12,f13,f104,f105,f106",
                            ut: newHqut || "b2884a393a59ad64002292a3e90d46a5"
                        };
                        var arr = [];
                        for (var k in data) {
                            arr.push(k + "=" + data[k]);
                        }
                        var urlzs = newHqDomain + 'api/qt/ulist.np/get?' + arr.join("&");
                        Tools.getJsonDataNewHq(urlzs, function (json) {
                            var spanCache = '<b>{dqzs}</b>{zdqs}<b>{zdzs}</b>{zdqs}<b>{zdf}%&nbsp;&nbsp;{cje}元</b> ';
                            var shdata = json.data.diff[0];
                            var shtype = Tools.getColor(shdata["f3"]);
                            var sh = spanCache.replace(/{dqzs}/ig, Tools.toFixed(shdata["f2"]));
                            sh = sh.replace(/{zdqs}/ig, shtype == "green" ? " <span class=\"arr\">↓</span>" : " <span class=\"arr\">↑</span>");
                            sh = sh.replace(/{zdzs}/ig, Tools.toFixed(shdata["f4"]));
                            sh = sh.replace(/{zdf}/ig, Tools.toFixed(shdata["f3"]));
                            sh = sh.replace(/{cje}/ig, shdata["f6"] == 0 ? '-' : Tools.FixAmt(shdata["f6"]));
                            var hqcont = dom || $(".zjlx_hqcont");
                            $(".shhq", hqcont).html(sh).attr("class", shtype);
                            $(".shz", hqcont).html(shdata["f104"]);
                            $(".shp", hqcont).html(shdata["f106"]);
                            $(".shd", hqcont).html(shdata["f105"]);
            
                            var szdata = json.data.diff[1];
                            var sztype = Tools.getColor(szdata["f3"]);
                            var sz = spanCache.replace(/{dqzs}/ig, Tools.toFixed(szdata["f2"]));
                            sz = sz.replace(/{zdqs}/ig, sztype == "green" ? " <span class=\"arr\">↓</span>" : " <span class=\"arr\">↑</span>");
                            sz = sz.replace(/{zdzs}/ig, Tools.toFixed(szdata["f4"]));
                            sz = sz.replace(/{zdf}/ig, Tools.toFixed(szdata["f3"]));
                            sz = sz.replace(/{cje}/ig, szdata["f6"] == 0 ? '-' : Tools.FixAmt(szdata["f6"]));
                            $(".szhq", hqcont).html(sz).attr("class", sztype);
                            $(".szz", hqcont).html(szdata["f104"]);
                            $(".szp", hqcont).html(szdata["f106"]);
                            $(".szd", hqcont).html(szdata["f105"]);
                            hqcont.show();
                        })
                    },
                    init_tophqtable: function (hqcode, dom) {
                        var tableCache = '<table cellpadding="0" cellspacing="0" class="t2 ns2"><thead><tr><th>\u4ee3\u7801</th><th>\u540d\u79f0</th><th>\u6700\u65b0\u4ef7</th><th>\u6da8\u8dcc\u989d</th><th>\u6da8\u8dcc\u5e45(%)</th><th>\u632f\u5e45</th><th>\u6210\u4ea4\u91cf(\u624b)</th><th>\u6210\u4ea4\u989d(\u5143)</th><th>\u6628\u6536</th><th>\u4eca\u5f00</th><th>\u6700\u9ad8</th><th>\u6700\u4f4e</th></tr></thead><tbody><tr><td><a href="http://quote.eastmoney.com/{code}.html" target="_blank">{codes}</a></td><td><a href="http://quote.eastmoney.com/{code}.html" target="_blank">{name}</a></td><td>{price}</td><td>{change}</td><td>{percent}</td><td><span>{zf}</span></td><td><span>{amount}</span></td><td><span>{volume}</span></td><td>{last}</td><td>{open}</td><td>{height}</td><td>{low}</td></tr></tbody></table>';
            
                        var data = {
                            fltt: "2",
                            invt: "2",
                            secid: hqcode,
                            fields: "f57,f58,f107,f43,f169,f170,f171,f47,f48,f60,f46,f44,f45",
                            ut: newHqut || "b2884a393a59ad64002292a3e90d46a5"
                        };
                        var arr = [];
                        for (var k in data) {
                            arr.push(k + "=" + data[k]);
                        }
                        var urlzs = newHqDomain + 'api/qt/stock/get?' + arr.join("&");
                        Tools.getJsonDataNewHq(urlzs, function (json) {
                            var data = json && json.data;
                            if (data) {
                                var hqcont = dom || $(".zjlx_hqcont");
                                var d = tableCache.replace(/{code}/ig, "zs" + data["f57"])
                                    .replace(/{codes}/ig, data["f57"])
                                    .replace(/{name}/ig, data["f58"])
                                    .replace(/{price}/ig, '<span class="' + Tools.getColor(data["f170"]) + '">' + data["f43"] + '</span>')
                                    .replace(/{change}/ig, '<span class="' + Tools.getColor(data["f170"]) + '">' + Tools.toFixed(data["f169"]) + '</span>')
                                    .replace(/{percent}/ig, '<span class="' + Tools.getColor(data["f170"]) + '">' + Tools.toFixed(data["f170"]) + '</span>')
                                    .replace(/{zf}/ig, data["f171"] == 0 ? '-' : Tools.toFixed(data["f171"]))
                                    .replace(/{amount}/ig, data["f47"] == 0 ? '-' : Tools.FixAmt(data["f47"]))
                                    .replace(/{volume}/ig, data["f48"] == 0 ? '-' : Tools.FixAmt(data["f48"]))
                                    .replace(/{last}/ig, data["f60"])
                                    .replace(/{open}/ig, '<span class="' + Tools.getColor(data["f46"] - data["f60"]) + '">' + data["f46"] + '</span>')
                                    .replace(/{height}/ig, '<span class="' + Tools.getColor(data["f44"] - data["f60"]) + '">' + data["f44"] + '</span>')
                                    .replace(/{low}/ig, '<span class="' + Tools.getColor(data["f45"] - data["f60"]) + '">' + data["f45"] + '</span>');
                                hqcont.html(d).show();
                            }
                        })
                    },
                    getPeriods: function (periods) {
                        var ret = [];
                        for (var i = 0; i < periods.length; i++) {
                            var item = periods[i];
                            for (var t = item.b + 1; t <= item.e; t++) {
                                if (t % 100 >= 60)
                                    continue;
                                var date_str = t.toString();
                                var time = date_str.substring(8, 10) + ':' + date_str.substring(10);
                                var isShow = (time == "09:31" || time == "10:30" || time == "11:30" || time == "14:00" || time == "15:00");
                                ret.push({
                                    value: time,
                                    showline: isShow,
                                    show: isShow
                                });
                            }
                        }
                        return ret;
                    },
                    drawLine: function (data, obj) {
                        obj.options.xaxis = data.xaxis;
                        obj.options.series = data.series;
                        //调用绘图方法
                        obj.draw(function (error) {
                            if (error == null) {
                                obj.reDraw();//使用上次的数据数据重绘
                            }
                        });
                    },
                    drawPie: function (data, obj) {
                        obj.options.data = data;
                        //调用绘图方法
                        obj.draw(function (error) {
                            if (error == null) {
                                obj.reDraw();//使用上次的数据数据重绘
                            }
                        });
                    },
                    checkTimeDo: function (cb, delay) {
                        var intervalId = window.setInterval(function () {
                            var _now = new Date();
                            try { _now = Eastmoney.Time.now(); } catch (e) { }
                            var _time = parseInt(tiny.dateFormat(_now, "HHmm") * 1);
                            var _day = _now.getDay();
                            if (true) {
                                if (!(_time <= 924 || (_time >= 1145 && _time <= 1259) || _time >= 1515 || _day > 5))
                                    cb && cb();
                            }
                        }, delay);
                        return intervalId;
                    }
                }
                window.zjlxinitfuncs = zjlxinitfuncs;
            
                var loadtablefun = {
                    ssmaketr: function (row, data, i, c) {
                        var _class = (i % 2 == 0) ? "" : "odd";
                        row.className = _class;
                        row.onmouseover = function () {
                            this.className = "over";
                        }
                        row.onmouseout = function (o, _c) {
                            o.className = _c;
                        }.binding(this, row, _class);
                        fieldArr = ggfields[this.options.param.stat_type.value]
                        var code = data["f12"];
                        row.cells[0].innerHTML = c;
                        row.cells[1].innerHTML = "<a href=\"http://quote.eastmoney.com/" + code + ".html\">" + code + "</a>"; //代码
                        row.cells[2].innerHTML = "<a href=\"http://data.eastmoney.com/stockdata/" + code + ".html\">" + data[fieldArr[1]] + "</a>"; //名称
                        row.cells[3].innerHTML = '<a href="/zjlx/' + code + '.html" class="red">详情</a> <a href="/stockdata/' + code + '.html">数据</a> <a href="http://guba.eastmoney.com/topic,' + code + '.html">股吧</a>'; //相关
                        row.cells[4].innerHTML = '<span class="' + Tools.getColor(data[fieldArr[3]]) + '">' + Tools.toFixed(data[fieldArr[2]]) + '</span>'; //最新价
                        row.cells[5].innerHTML = Tools.getColorByDate(data[fieldArr[3]], 2, '%'); //涨跌幅
                        row.cells[6].innerHTML = Tools.getColorByDate(data[fieldArr[4]]); //主力净流入净额
                        row.cells[7].innerHTML = Tools.getColorByDate(data[fieldArr[5]], 2, "%"); //主力净流入净占比
                        row.cells[8].innerHTML = Tools.getColorByDate(data[fieldArr[6]]); //超大单-净额
                        row.cells[9].innerHTML = Tools.getColorByDate(data[fieldArr[7]], 2, "%"); //超大单-净占比
                        row.cells[10].innerHTML = Tools.getColorByDate(data[fieldArr[8]]); //大单-净额
                        row.cells[11].innerHTML = Tools.getColorByDate(data[fieldArr[9]], 2, "%"); //大单-净占比
                        row.cells[12].innerHTML = Tools.getColorByDate(data[fieldArr[10]]); //中单-净额
                        row.cells[13].innerHTML = Tools.getColorByDate(data[fieldArr[11]], 2, "%"); //中单-净占比
                        row.cells[14].innerHTML = Tools.getColorByDate(data[fieldArr[12]]); //小单-净额
                        row.cells[15].innerHTML = Tools.getColorByDate(data[fieldArr[13]], 2, "%"); //小单-净占比
                    },
                    bkmaketr: function (row, data, i, c) {
                        var _class = (i % 2 == 0) ? "" : "odd";
                        row.className = _class;
                        row.onmouseover = function () {
                            this.className = "over";
                        }
                        row.onmouseout = function (o, _c) {
                            o.className = _c;
                        }.binding(this, row, _class);
                        fieldArr = ggfields[this.options.param.stat_type.value]
                        var code = data["f12"];
                        row.cells[0].innerHTML = c;
                        row.cells[1].innerHTML = "<a href=\"http://data.eastmoney.com/bkzj/" + code + ".html\">" + data[fieldArr[1]] + "</a>"; //名称
                        row.cells[2].innerHTML = '<a href="/bkzj/' + code + '.html" class="red">大单详情</a> <a href="http://guba.eastmoney.com/topic,' + code + '.html">股吧</a>'; //相关
                        row.cells[3].innerHTML = Tools.getColorByDate(data[fieldArr[3]], 2, '%'); //涨跌幅
                        row.cells[4].innerHTML = Tools.getColorByDate(data[fieldArr[4]]); //主力净流入净额
                        row.cells[5].innerHTML = Tools.getColorByDate(data[fieldArr[5]], 2, "%"); //主力净流入净占比
                        row.cells[6].innerHTML = Tools.getColorByDate(data[fieldArr[6]]); //超大单-净额
                        row.cells[7].innerHTML = Tools.getColorByDate(data[fieldArr[7]], 2, "%"); //超大单-净占比
                        row.cells[8].innerHTML = Tools.getColorByDate(data[fieldArr[8]]); //大单-净额
                        row.cells[9].innerHTML = Tools.getColorByDate(data[fieldArr[9]], 2, "%"); //大单-净占比
                        row.cells[10].innerHTML = Tools.getColorByDate(data[fieldArr[10]]); //中单-净额
                        row.cells[11].innerHTML = Tools.getColorByDate(data[fieldArr[11]], 2, "%"); //中单-净占比
                        row.cells[12].innerHTML = Tools.getColorByDate(data[fieldArr[12]]); //小单-净额
                        row.cells[13].innerHTML = Tools.getColorByDate(data[fieldArr[13]], 2, "%"); //小单-净占比
                        row.cells[14].innerHTML = Tools.isExist(data[fieldArr[15]]) ? "<a href=\"http://data.eastmoney.com/stockdata/" + data[fieldArr[15]] + ".html\">" + Tools.getTextValOrEmpty(data[fieldArr[14]]) + "</a>" : '-'; //名称
                    },
                    zjmakert: function (row, data, i, c) {
                        var _class = (i % 2 == 0) ? "" : "odd";
                        row.className = _class;
                        row.onmouseover = function () {
                            this.className = "over";
                        }
                        row.onmouseout = function (o, _c) {
                            o.className = _c;
                        }.binding(this, row, _class);
                        var code = data["f12"];
                        row.cells[0].innerHTML = c;
                        row.cells[1].innerHTML = "<a href=\"http://quote.eastmoney.com/" + code + ".html\">" + code + "</a>"; //代码
                        row.cells[2].innerHTML = "<a href=\"http://data.eastmoney.com/stockdata/" + code + ".html\">" + data["f14"] + "</a>"; //名称
                        row.cells[3].innerHTML = "<a href=\"/zjlx/" + code + ".html\" class=\"red\">详情</a> <a href=\"http://data.eastmoney.com/stockdata/" + code + ".html\">数据</a> <a href=\"http://guba.eastmoney.com/topic," + code + ".html\">股吧</a> <a href=\"http://data.eastmoney.com/report/" + code + ".html\">研报</a>"; //相关
                        row.cells[4].innerHTML = "<span class=\"" + Tools.getColor(data["f3"]) + "\">" + data["f2"] + "</span>"; //最新价
                        row.cells[5].innerHTML = Tools.getColorByDate(data["f184"], 2, '%'); //主力净流入净占比
                        row.cells[6].innerHTML = Tools.getTextValOrEmpty(data["f225"]); //今日排名
                        row.cells[7].innerHTML = Tools.getColorByDate(data["f3"], 2, "%"); //涨跌幅
                        row.cells[8].innerHTML = Tools.getColorByDate(data["f165"], 2, '%'); //5日净占比
                        row.cells[9].innerHTML = Tools.getTextValOrEmpty(data["f263"]);//5日排名 
                        row.cells[10].innerHTML = Tools.getColorByDate(data["f109"], 2, '%'); //5日涨跌幅
                        row.cells[11].innerHTML = Tools.getColorByDate(data["f175"], 2, "%"); //10日净占比
                        row.cells[12].innerHTML = Tools.getTextValOrEmpty(data["f264"]);//10日排名
                        row.cells[13].innerHTML = Tools.getColorByDate(data["f160"], 2, "%"); //10日涨跌幅
                        row.cells[14].innerHTML = Tools.isExist(data["f265"]) ? "<a href=\"/bkzj/" + data["f265"] + ".html\" >" + data["f100"] + "</a>" : '-';//所属板块
                    },
                    ggcells: function (type) {
                        var text = type || "今日";
                        var cells = [];
                        cells.push({ "n": "日期", "w": 80 });
                        cells.push({ "n": "收盘价", "w": 40 });
                        cells.push({ "n": "涨跌幅", "w": 40 });
                        cells.push({ "n": "主力净流入", cells: [{ "n": "净额", "w": 80 }, { "n": "净占比", "w": 55 }], "w": 135 });
                        cells.push({
                            "n": "超大单净流入<i title='因为存在一笔大额的委托单仅成交小部分的情况，所以会导致超大单或者大单流入/流出的数额极小。'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>",
                            cells: [
                                { "n": "净额", "w": 80 },
                                { "n": "净占比", "w": 55 }
                            ],
                            "w": 135
                        });
                        cells.push({
                            "n": "大单净流入",
                            cells: [
                                { "n": "净额", "w": 80 },
                                { "n": "净占比", "w": 55 }
                            ],
                            "w": 135
                        });
                        cells.push({
                            "n": "中单净流入",
                            cells: [
                                { "n": "净额", "w": 80 },
                                { "n": "净占比", "w": 55 }
                            ],
                            "w": 135
                        });
                        cells.push({
                            "n": "小单净流入",
                            cells: [
                                { "n": "净额", "w": 80 },
                                { "n": "净占比", "w": 55 }
                            ],
                            "w": 135
                        });
                        return cells;
                    },
                    sscells: function (type) {
                        var farr = ggfields[type || "1"];
                        if (type == "1")
                            type = "今";
                        var text = (type || "今") + "日";
                        var cells = [];
                        cells.push({ "n": "序号" });
                        cells.push({ "n": "代码", "s": "f12" });
                        cells.push({ "n": "名称", "w": 54 });
                        cells.push({ "n": "相关", "w": 90 });
                        cells.push({ "n": "最新价", "s": "f2" });
                        cells.push({ "n": text + "<br/>涨跌幅", "s": farr[3] });
                        cells.push({ "n": text + "主力净流入", cells: [{ "n": "净额", "s": farr[4] }, { "n": "净占比", "s": farr[5] }] });
                        cells.push({ "n": text + "超大单净流入", cells: [{ "n": "净额", "s": farr[6] }, { "n": "净占比", "s": farr[7] }] });
                        cells.push({ "n": text + "大单净流入", cells: [{ "n": "净额", "s": farr[8] }, { "n": "净占比", "s": farr[9] }] });
                        cells.push({ "n": text + "中单净流入", cells: [{ "n": "净额", "s": farr[10] }, { "n": "净占比", "s": farr[11] }] });
                        cells.push({ "n": text + "小单净流入", cells: [{ "n": "净额", "s": farr[12] }, { "n": "净占比", "s": farr[13] }] });
                        return cells;
                    },
                    bkcells: function (type) {
                        var farr = ggfields[type || "1"];
                        if (type == "1")
                            type = "今";
                        var text = (type || "今") + "日";
                        var cells = [];
                        cells.push({ "n": "序号" });
                        cells.push({ "n": "名称", "w": 54 });
                        cells.push({ "n": "相关", "w": 90 });
                        cells.push({ "n": text + "<br/>涨跌幅", "s": farr[3] });
                        cells.push({ "n": text + "主力净流入", cells: [{ "n": "净额", "s": farr[4] }, { "n": "净占比", "s": farr[5] }] });
                        cells.push({ "n": text + "超大单净流入", cells: [{ "n": "净额", "s": farr[6] }, { "n": "净占比", "s": farr[7] }] });
                        cells.push({ "n": text + "大单净流入", cells: [{ "n": "净额", "s": farr[8] }, { "n": "净占比", "s": farr[9] }] });
                        cells.push({ "n": text + "中单净流入", cells: [{ "n": "净额", "s": farr[10] }, { "n": "净占比", "s": farr[11] }] });
                        cells.push({ "n": text + "小单净流入", cells: [{ "n": "净额", "s": farr[12] }, { "n": "净占比", "s": farr[13] }] });
                        cells.push({ "n": text + "主力净流入最大股", "w": 70 });
                        return cells;
                    },
                    zjcells: function (type) {
                        var cells = [];
                        cells.push({ "n": "序号" });
                        cells.push({ "n": "代码", "s": "f12", "w": 48 });
                        cells.push({ "n": "名称", "w": 54 });
                        cells.push({ "n": "相关资讯", "w": 110 });
                        cells.push({ "n": "最新价", "s": "f2" });
                        cells.push({ "n": "今日排行榜", cells: [{ "n": "主力净占比", "s": "f184" }, { "n": "今日排名", "s": "f225" }, { "n": "今日涨跌", "s": "f3" }] });
                        cells.push({ "n": "5日排行榜", cells: [{ "n": "主力净占比", "s": "f165" }, { "n": "5日排名", "s": "f263" }, { "n": "5日涨跌", "s": "f109" }] });
                        cells.push({ "n": "10日排行榜", cells: [{ "n": "主力净占比", "s": "f175" }, { "n": "10日排名", "s": "f264" }, { "n": "10日涨跌", "s": "f160" }] });
                        cells.push({ "n": "所属板块" });
                        return cells;
                    },
                    getssField: function (type, oldfield) {
                        var newfields = ggfields[type || "1"];
                        if (oldfield) {
                            var field = "";
                            for (var item in ggfields) {
                                var ff = ggfields[item];
                                for (var i = 0; i < ff.length; i++) {
                                    if (oldfield == ff[i]) {
                                        field = newfields[i];
                                        break;
                                    }
                                }
                            }
                            return field;
                        } else {
                            return newfields;
                        }
            
                    }
                };
            
            
                window.loadtablefun = loadtablefun;
            }(jQuery)