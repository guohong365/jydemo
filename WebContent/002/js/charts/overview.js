(function ($) {
    if (!$) {
        console.log("jquery not initialized.");
    }

    class DataSetBuilder {
        constructor(options) {
            this.options = new GeneratorOption({
                name: '',
                min: 0,
                max: 100,
                rows: [],
                columns: []
            });
            this.options.__merge(options, {
                deep: true
            });
        }

        mergeOption(options) {
            $.extend(true, this.options, options);
        }
        setOption(options, mergeOpt) {
            this.__merge(options, mergeOpt);
        };
        getCompanies() {
            let names = [{
                    name: "安宁公交"
                },
                {
                    name: "东川公交"
                },
                {
                    name: "元谋公交"
                },
                {
                    name: "禄劝公交"
                },
                {
                    name: "景洪公交"
                },
                {
                    name: "嵩明公交"
                }
            ];
            return names.slice(0);
        };

        getYears(fromYear, count) {
            let years = [];
            for (let i = 0; i < count; i++) {
                years.push({
                    name: '' + (fromYear - i),
                    year: fromYear - i
                })
            }
            return years;
        };
        getMonths(fromMonth) {
            let months = [{
                    name: "一月"
                }, {
                    name: "二月"
                }, {
                    name: "三月"
                }, {
                    name: "四月"
                }, {
                    name: "五月"
                }, {
                    name: "六月"
                },
                {
                    name: "七月"
                }, {
                    name: "八月"
                }, {
                    name: "九月"
                }, {
                    name: "十月"
                }, {
                    name: "十一月"
                }, {
                    name: "十二月"
                }
            ];
            let ret = [];
            for (let i = 0; i < 12; i++) {
                var current = (fromMonth + i) % 12;
                ret.push(months[current]);
            }
            return ret;
        };
        getDays(year, month, endDay) {
            let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            month = month < 0 ? 0 : (month > 11 ? 11 : month);
            if (month == 1) { //判断闰年
                if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
                    monthDays[month] = 29;
                }
            }
            endDay = !endDay || endDay < 1 || endDay > monthDays[month] ? monthDays[month] : endDay;
            let days = [];
            for (let i = 1; i <= endDay; i++) {
                days.push({
                    name: '' + i,
                    value: i
                });
            }
            return days;
        };

        buildHistoryData() {
            let historyOption = {
                name: '',
                min: 60,
                max: 1200,
                rows: [{
                        name: "收入",
                        scale: 1.0,
                        solt: {
                            min: 0,
                            max: 0
                        }
                    },
                    {
                        name: "支出",
                        scale: 0.8,
                        solt: {
                            min: -0.12,
                            max: 0.2
                        }
                    },
                    {
                        name: "累计收入",
                        method: 'accum',
                        rowIndex: 0
                    },
                    {
                        name: "累计支出",
                        method: 'accum',
                        rowIndex: 1
                    },
                ],
                columns: []
            };
            let generator = $.createGenerator(historyOption);
            let years = this.getYears(2020, 10);
            let yearsData = generator.generate({
                name: '历年数据',
                columns: years
            });
            let months = this.getMonths(0);
            let monthsData = generator.generate({
                name: '2020年历史数据',
                columns: months
            });
            let days = this.getDays(2020, 12);
            let daysData = generator.generate({
                name: '2020年12月数据',
                columns: days
            });
            return [yearsData, monthsData, daysData];
        };

        buildOthers() {
            var option = {
                name: '',
                min: 0,
                max: 100,
                rows: [{
                        name: "安宁公交",
                        scale: 1.0,
                        solt: {
                            min: 0,
                            max: 0
                        }
                    },
                    {
                        name: "东川公交",
                        scale: 0.8,
                        solt: {
                            min: -0.12,
                            max: 0.2
                        }
                    },
                    {
                        name: "元谋公交",
                        scale: 0.5,
                        solt: {
                            min: -0.02,
                            max: 0.05
                        }
                    },
                    {
                        name: "禄劝公交",
                        scale: 0.3,
                        solt: {
                            min: -0.03,
                            max: 0.05
                        }
                    },
                    {
                        name: "景洪公交",
                        scale: 0.4,
                        solt: {
                            min: -0.03,
                            max: 0.05
                        }
                    },
                    {
                        name: "嵩明公交",
                        scale: 0.1,
                        solt: {
                            min: -0.01,
                            max: 0.015
                        }
                    }
                ],
                columns: ["2020"]
            };

            let generator = $.createGenerator(option);
            let serviceTimes = [];
            //yearly
            serviceTimes.push(generator.generate({
                name: '（万人）',
                min: 500,
                max: 1500,
                columns: ["2020"]
            }));
            //monthly
            serviceTimes.push(generator.generate({
                name: '（人）',
                min: 10,
                max: 100,
                columns: ["2020"]
            }));
            //daily
            serviceTimes.push(generator.generate({
                name: '（人）',
                min: 100,
                max: 100000,
                columns: ["2020"]
            }));

            let memberIncrement = [];
            //yearly
            memberIncrement.push(generator.generate({
                name: '（人）',
                min: 500,
                max: 10000,
                columns: ["2020"]
            }));
            //monthly
            memberIncrement.push(generator.generate({
                name: '（人）',
                min: 0,
                max: 3000,
                columns: ["2020"]
            }));
            //daily
            memberIncrement.push(generator.generate({
                name: '（人）',
                min: 0,
                max: 1000,
                columns: ["2020"]
            }));
            return {
                serviceTimes: serviceTimes,
                memberIncrement: memberIncrement
            };
        };

        getColumnData(dataset) {
            let index = dataset.source[0].length - 1;

            let rows = dataset.source.slice(1);
            var data = [];
            rows.forEach(function (row) {
                data.push(row[index]);
            });
            return data;
        }
        buildPieData(historyData, index) {
            var pieOption = {
                name: '',
                min: 5,
                max: 100,
                rows: [{
                        name: "安宁公交",
                        scale: 1.0,
                        solt: {
                            min: 0,
                            max: 0
                        }
                    },
                    {
                        name: "东川公交",
                        scale: 0.8,
                        solt: {
                            min: -0.12,
                            max: 0.2
                        }
                    },
                    {
                        name: "元谋公交",
                        scale: 0.5,
                        solt: {
                            min: -0.02,
                            max: 0.05
                        }
                    },
                    {
                        name: "禄劝公交",
                        scale: 0.3,
                        solt: {
                            min: -0.03,
                            max: 0.05
                        }
                    },
                    {
                        name: "景洪公交",
                        scale: 0.4,
                        solt: {
                            min: -0.03,
                            max: 0.05
                        }
                    },
                    {
                        name: "嵩明公交",
                        scale: 0.1,
                        solt: {
                            min: -0.01,
                            max: 0.015
                        }
                    }
                ],
                columns: []
            };
            var generator = $.createGenerator(pieOption);
            var latest = this.getColumnData(historyData[0]);
            var yearsData = generator.generate({
                name: '2020年数据',
                min: latest[index] / 10,
                max: latest[index] / 3,
                columns: [{
                    name: '2020'
                }]
            });
            latest = this.getColumnData(historyData[1])
            var monthsData = generator.generate({
                name: '2020年12月数据',
                min: latest[index] / 10,
                max: latest[index] / 3,
                columns: [{
                    name: '2020-12'
                }]
            });
            latest = this.getColumnData(historyData[2])
            var daysData = generator.generate({
                name: '2020年12月-31数据',
                min: latest[index] / 10,
                max: latest[index] / 3,
                columns: [{
                    name: '2020-12-31'
                }]
            });
            return [yearsData, monthsData, daysData];
        };

        buildDataSets(options) {
            this.mergeOption(options);

            let histories = this.buildHistoryData();
            let incomes = this.buildPieData(histories, 2);
            let expenses = this.buildPieData(histories, 3);
            let others = this.buildOthers();
            return {
                histories: histories,
                incomes: incomes,
                expenses: expenses,
                serviceTimes: others.serviceTimes,
                memberIncrement: others.memberIncrement
            };
        }
    }

    class Overview {
        constructor() {
            this._initialied = false;
            let builder = new DataSetBuilder();
            this._dataSets = builder.buildDataSets();
            this.charts = [];
            this._tables = [];
            this._current = 0;
            this._defaultComparer = function (a, b) {
                return b.value - a.value;
            };
        }
        buildHistoryLine(dataset) {
            const LINE_COUNT = 4;
            let option = {
                color: ['red', 'green', 'red', 'green'],
                tooltip: {
                    trigger: 'axis',
                    textStyle: {
                        color: 'white'
                    }
                },
                grid: {
                    top: 20,
                    left: '0%',
                    right: '0%',
                    bottom: '0%',
                    show: true,
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    axisLabel: {
                        color: 'white'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#1F7EFF'
                        }
                    }
                },
                yAxis: [{
                        type: 'value',
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#1F7EFF'
                            }
                        },
                        axisLabel: {
                            color: 'white'
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#012f4a'
                            }
                        }
                    },
                    {
                        type: 'value',
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#1F7EFF'
                            }
                        },
                        axisLabel: {
                            color: 'white'
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#012f4a'
                            }
                        }
                    }
                ],
                dataset: [],
                series: []
            };
            option.dataset = dataset;
            for (let i = 0; i < LINE_COUNT; i++) {
                option.series.push({
                    smooth: true,
                    type: i < 2 ? 'bar' : 'line',
                    yAxisIndex: i < 2 ? 0 : 1,
                    datasetIndex: this._current,
                    seriesLayoutBy: 'row',
                });
            }
            return option;
        };
        buildPie(dataset) {
            let option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{c}<br/> ({d}%)'
                },
                dataset: dataset,
                series: [{
                    type: 'pie',
                    radius: ["15%", "50%"],
                    center: ['50%', '40%'],
                    roseType: 'radius',
                    label: {
                        fontSize: 12,
                        color: '#FFF',
                        backgroundColor: 'transparent',
                        boderColor: 'transparent',
                        shadowColor: 'transparent',
                        //alignTo: 'labelLine',
                        rich: {
                            a: {
                                color: 'yellow'
                            }
                        }, //'#1F7EFF'}},
                        formatter: function (param) {
                            return param.name.substr(0, 2) + "\n{a|(" + param.percent.toFixed(1) + '%)}';
                        }
                    },
                    datasetIndex: this._current,
                    encode: {
                        itemName: 0,
                        value: 1,
                        tooltip: 1
                    }
                }]
            };
            return option;
        };

        buildMap(datasets) {
            let defaultItemStyle = {
                emphasis: {
                    label: {
                        show: false,
                        color: '#FFF',
                    },
                    itemStyle: {
                        borderColor: "rgba(19,198,249,0.8)",
                        borderWidth: 1,
                        areaColor: {
                            type: 'radial',
                            x: 0.5,
                            y: 0.5,
                            r: 0.8,
                            colorStops: [{
                                offset: 0,
                                color: '#FFFFFF00'
                            }, {
                                offset: 1,
                                color: "rgba(19,198,249,0.6)"
                            }],
                        },
                    }
                },
                itemStyle: {
                    borderColor: "rgba(19,198,249,0.45)",
                    borderWidth: 1,
                    color: '#FFFFFF00',
                    areaColor: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.8,
                        colorStops: [{
                            offset: 0,
                            color: '#FFFFFF00'
                        }, {
                            offset: 1,
                            color: "rgba(19,198,249,0.15)"
                        }],
                    },
                    shadowColor: "rgba(19,198,249,1)",
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 10
                }
            };
            let names = [{
                    name: "安宁公交",
                    value: [102.485544, 24.921785]
                },
                {
                    name: "东川公交",
                    value: [103.182, 26.08349]
                },
                {
                    name: "元谋公交",
                    value: [101.870837, 25.703313]
                },
                {
                    name: "禄劝公交",
                    value: [102.46905, 25.556533]
                },
                {
                    name: "景洪公交",
                    value: [100.797947, 22.002087]
                },
                {
                    name: "嵩明公交",
                    value: [103.038777, 25.335087]
                }
            ];
            //准备regions
            let regions = [];
            names.forEach(function (item) {
                let region = {
                    name: item.name
                };
                $.extend(true, region, defaultItemStyle);
                region.emphasis.itemStyle.boderColor = "#ff0000";
                //region.emphasis.itemStyle.areaColor.colorStops[0].color = 'rgba(19,198,249,0.8)';
                region.emphasis.itemStyle.areaColor.colorStops[1].color = "#ff0000";
                region.itemStyle.boderColor = "#ffd300";
                //region.itemStyle.areaColor.colorStops[0].color = 'rgba(19,198,249,0.5)';
                region.itemStyle.areaColor.colorStops[1].color = '#ffd300';
                regions.push(region);
            });
            //准备数据
            var random = new RandomGenerator();
            var data = [];
            names.forEach(function (item) {
                item.value.push(parseFloat(random.next(20, 50).toFixed(2)));
                data.push({
                    name: item.name,
                    value: item.value,
                    itemStyle: {
                        color: "#ff0000F0"
                    },
                    tooltip: {
                        backgroundColor: 'rgba(55,55,55,0.5)',
                        textStyle: {
                            color: "rgba(49,198,249,1)",
                            fontSize: 16
                        }
                    }
                });
            });

            var scatters = {
                type: "effectScatter",
                coordinateSystem: "geo",
                showEffectOn: "render",
                rippleEffect: {
                    brushType: 'fill'
                },
                emphasis: {
                    scale: true,
                    focus: 'self'
                },
                symbolSize: function (val) {
                    return val[2] / 2;
                },
                encode: {
                    value: 2
                },
                zlevel: 2,
                label: {
                    formatter: "{b}",
                    color: "white",
                    show: true,
                    position: 'bottom'
                },
                itemStyle: {
                    color: "#FFFF000F",
                    shadowBlur: 10,
                    shadowColor: "#333"
                },
                data: data
            };

            let lineData = [];

            names.forEach(function (from) {
                names.forEach(function (to) {
                    lineData.push({
                        coords: [from.value, to.value]
                    });
                });
            });

            let lines = {
                tooltip: {
                    show: false
                },
                type: 'lines',
                zlevel: 3,
                effect: {
                    show: true,
                    period: 5,
                    trailLength: 0.2,
                    symbol: 'arrow',
                    symbolSize: 6,
                },
                lineStyle: {
                    color: "rgba(49,198,249,1)",
                    width: 1,
                    opacity: 0.2,
                    curveness: .3
                },
                data: lineData
            };
            let option = {
                tooltip: {
                    triggerOn: "mousemove",
                    backgroundColor: "rgba(198,198,198,0.8)",
                    color: 'white'
                },
                geo: {
                    map: '530000-2',
                    roam: true,
                    silent: false,
                    zoom: 1.5,
                    nameMap: {
                        "安宁市": "安宁公交",
                        "嵩明县": "嵩明公交",
                        "东川区": "东川公交",
                        "禄劝彝族苗族自治县": "禄劝公交",
                        "元谋县": "元谋公交",
                        "景洪市": "景洪公交"
                    },
                    regions: regions
                },
                series: [scatters, lines]
            }
            $.extend(true, option.geo, defaultItemStyle);
            return option;
        };
        buildCharts() {
            var historyChart = this.buildHistoryLine(this._dataSets.histories);
            var icomePie = this.buildPie(this._dataSets.incomes);
            var expensePie = this.buildPie(this._dataSets.expenses);
            var mainMap = this.buildMap(this._dataSets.incomes);
            var ret = [];
            ret.push({
                charElement: $("#timesPie"),
                option: expensePie
            });
            ret.push({
                charElement: $("#incomePie"),
                option: icomePie
            });
            ret.push({
                charElement: $("#historyChart"),
                option: historyChart
            });
            ret.push({
                charElement: $("#mainMap"),
                option: mainMap
            });
            return ret;
        };
        //表格数据
        buildTables() {
            let colors = [
                ["red", "orange", "coral", "cyan", "darkcyan"],
                ["red", "orange", "coral", "cyan", "darkcyan"],
                ["red", "orange", "coral", "cyan", "darkcyan"]
            ];
            let bodys = $("#page-1 tbody");
            const top = 6;
            let tableCollection = [];
            let comparer = function (a, b) {
                return b.value - a.value;
            };
            let _this = this;
            var dataset = null;
            let getHeader = function (index, unit) {
                let headers = [
                    "<tr><th width='15%'>排名</td><th width='35%'>公司</td><th width='50%'>收入",
                    "<tr><th width='15%'>排名</td><th width='35%'>公司</td><th width='50%'>服务人次",
                    "<tr><th width='15%'>排名</td><th width='35%'>公司</td><th width='50%'>会员新增"
                ];
                let tail = "</td></tr>";
                return headers[index] + unit + tail;
            };
            let buildOne = function (dataType) {
                let tables = [];
                for (let i = 0; i < 3; i++) {
                    switch (i) {
                        case 0:
                            dataset = _this._dataSets.incomes;
                            break;
                        case 1:
                            dataset = _this._dataSets.serviceTimes;

                            break;
                        case 2:
                            dataset = _this._dataSets.memberIncrement;
                            break;
                    }
                    let source = dataset[dataType].source;
                    let values = [];
                    source.forEach(function (data, dataIndex) {
                        if (dataIndex == 0) return;
                        values.push({
                            name: data[0],
                            value: data[data.length - 1]
                        });
                    });
                    values = values.sort(comparer);
                    let rows = getHeader(i, i == 0 ? "（万元）" : source[0][0]);
                    let lastColor = 0;
                    values.forEach(function (row, index) {
                        if (index >= top) return;
                        let color = colors[i][lastColor];
                        rows = rows +
                            "<tr>" +
                            "<td>" +
                            "<div class='order' style='background-color:" + color + ";'>" +
                            "<div>" + (index + 1) + "</div>" +
                            "</div>" +
                            "</td>" +
                            "<td>" + row.name + "</td>" +
                            "<td>" + row.value + "</td>" +
                            "</tr>";
                        if (lastColor < colors[i].length - 1) lastColor++;
                    });
                    tables.push({
                        table: bodys.eq(i),
                        body: rows
                    });
                }
                return tables;
            };
            for (let i = 0; i < 3; i++) {
                tableCollection.push(buildOne(i));
            }
            return tableCollection;
        };

        init() {
            if (this._initialied) return;
            var items = this.buildCharts();
            let _this = this;
            items.forEach(function (item, index) {
                let chart = echarts.init(item.charElement[0], 'shine');
                item.chart = chart;
                _this.charts.push(item);
                window.addEventListener("resize", function () {
                    $.Overview.charts[index].chart.resize();
                });
            });
            this._tables = this.buildTables();

            $("#mainPageType a").each(function (index) {
                $(this).click(function () {
                    $(this).parent().addClass("active").siblings().removeClass("active");
                    var data = index == 0 ? 0 : (index == 1 ? 2 : 1);
                    $.Overview.update(data);
                    $.Overview._current = data;
                });
            });
            this._initialied = true;
        };

        updateTables(dataType) {
            let tables = [];
            this._current = dataType;
            tables = this._tables[dataType];
            tables.forEach(function (table) {
                table.table.html(table.body);
            });
        };

        updateCharts(dataType) {
            this._current = dataType;
            let _this = this;
            this.charts.forEach(function (item) {
                item.option.series.forEach(function (s) {
                    s.datasetIndex = _this._current;
                });
                item.chart.setOption(item.option);
                item.chart.resize();
            });
        };

        update(timeType) {
            if (!this._initialied) {
                this.init();
            }
            if (typeof timeType === "undefined") {
                this.updateTables(this._current);
                this.updateCharts(this._current);
            } else {
                this.updateTables(timeType);
                this.updateCharts(timeType);
            }
        }
    }
    $.extend({
        Overview: new Overview()
    });
    console.log("overview loaded. ");
}(window.jQuery));