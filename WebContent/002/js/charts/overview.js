(function($) {
    if (!$) {
        console.log("jquery not initialized.");
    }

    function DataSetBuilder(options) {
        this.options = {
            name: '',
            min: 0,
            max: 100,
            rows: [],
            columns: []
        };
        this.mergeOption = function(options) {
            $.extend(true, this.options, options);
        };
        this.setOption = function(options) {
            if (options) {
                this.options = options;
            }
        };
        this.setOption(options);

        this.getCompanies = function() {
            var names = [
                { name: "安宁公交" },
                { name: "东川公交" },
                { name: "元谋公交" },
                { name: "禄劝公交" },
                { name: "景洪公交" },
                { name: "嵩明公交" }
            ];
            var ret = [];
            names.forEach(function(item) {
                ret.push({ name: item });
            });
        };
        this.getYears = function(fromYear, count) {
            var years = [];
            for (let i = 0; i < count; i++) {
                years.push({ name: '' + fromYear - i, year: fromYear - i })
            }
        };
        this.getMonths = function(fromMonth) {
            var months = [
                { name: "一月" }, { name: "二月" }, { name: "三月" }, { name: "四月" }, { name: "五月" }, { name: "六月" },
                { name: "七月" }, { name: "八月" }, { name: "九月" }, { name: "十月" }, { name: "十一月" }, { name: "十二月" }
            ];
            var ret = [];
            for (let i = 0; i < 12; i++) {
                var current = (fromMonth + i) % 12;
                ret.push({ name: months[current], month: current });
            }
            return ret;
        };
        this.getDays = function(year, month, fromDay) {
            var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            month = month < 0 ? 0 : (month > 11 ? 11 : month);
            if (month == 1) { //判断闰年
                if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
                    monthDays[month] = 29;
                }
            }
            fromDay = fromDay < 1 ? 1 : (fromDay > monthDays[month] ? monthDays[month] : fromDay);
            for (let i = fromDay; i >= 1; i--) {
                item.days.push({ name: '' + i, value: i });
            }
        };

        this.buildHistoryData = function() {
            var historyOption = {
                name: '',
                min: 60,
                max: 1200,
                rows: [
                    { name: "收入", scale: 1.0, solt: { min: 0, max: 0 } },
                    { name: "支出", scale: 0.8, solt: { min: -0.12, max: 0.2 } },
                    { name: "累计收入", method: 'accum', rowIndex: 0 },
                    { name: "累计支出", method: 'accum', rowIndex: 1 },
                ],
                columns: []
            };
            var generator = $.createGenerator(historyOption);
            var yearsData = generator.generate({
                name: '历年数据',
                columns: getYears(2020, 10)
            });
            var monthsData = this.generator.generate({
                name: '2020年历史数据',
                columns: this.getMonths(0)
            });
            var daysData = generator.generate({
                name: '2020年12月数据',
                columns: this.getDays(2020, 12, 1)
            });
            return [yearsData, monthsData, daysData];
        };

        function getColumnData(dataset) {
            let index = dataset.source[0].length - 1;
            var rows = dataset.slice(1);
            var data = [];
            rows.forEach(function(row) {
                data.push(row[index]);
            });
            return data;
        }
        this.buildPieData = function(historyData, index) {
            var pieOption = {
                name: '',
                min: 5,
                max: 100,
                rows: [
                    { name: "安宁公交", scale: 1.0, solt: { min: 0, max: 0 } },
                    { name: "东川公交", scale: 0.8, solt: { min: -0.12, max: 0.2 } },
                    { name: "元谋公交", scale: 0.5, solt: { min: -0.02, max: 0.05 } },
                    { name: "禄劝公交", scale: 0.3, solt: { min: -0.03, max: 0.05 } },
                    { name: "景洪公交", scale: 0.4, solt: { min: -0.03, max: 0.05 } },
                    { name: "嵩明公交", scale: 0.1, solt: { min: -0.01, max: 0.015 } }
                ],
                columns: []
            };
            var generator = $.createGenerator(pieOption);
            var latest = getColumnData(historyData[0]);
            var yearsData = generator.generate({
                name: '2020年数据',
                min: latest[index] / 10,
                max: latest[index] / 3,
                columns: ['2020']
            });
            latest = getColumnData(historyData[1])
            var monthsData = generator.generate({
                name: '2020年12月数据',
                min: latest[index] / 10,
                max: latest[index] / 3,
                columns: ['2020-12']
            });
            latest = getColumnData(historyData[2])
            var daysData = generator.generate({
                name: '2020年12月-31数据',
                min: latest[index] / 10,
                max: latest[index] / 3,
                columns: ['2020-12-31']
            });
            return [yearsData, monthsData, daysData];
        };

        this.buildDataSets = function() {
            var histories = this.buildHistoryData();
            var incomes = this.buildPieData(histories, 2);
            var expense = this.buildPieData(histories, 3);

            var datasets = [];
            for (let i = 0; i < 3; i++) {
                datasets.push({
                    historiy: histories[i],
                    income: incomes[i],
                    expense: expense[i]
                });
            }
        };
    }





    function buildMap(dataset) {
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: '{b}<br/>{c}'
            },
            visualMap: {
                type: 'continuous',
                show: false,
                min: 0,
                max: 120,
                inRange: { color: ['lightskyblue', 'yellow', 'orangered'] },
            },
            series: [{
                type: 'map',
                map: '云南',
                roam: true,
                data: data[index],
                itemStyle: {
                    normal: {
                        borderColor: '#0692a4',
                        borderWidth: 1
                    },
                    emphasis: {
                        borderColor: '#0b1c2d',
                        borderWidth: 2
                    }
                },
                label: {
                    normal: { show: true, color: '#000' }
                },
                nameMap: {
                    "五华区": "五华",
                    "盘龙区": "盘龙",
                    "官渡区": "官渡",
                    "呈贡区": "呈贡",
                    "西山区": "西山",
                    "安宁市": "安宁",
                    "宜良县": "宜良",
                    "石林彝族自治县": "石林",
                    "晋宁区": "晋宁",
                    "嵩明县": "嵩明",
                    "富民县": "富民",
                    "寻甸回族彝族自治县": "寻甸",
                    "东川区": "东川",
                    "禄劝彝族苗族自治县": "禄劝"
                },
            }]
        };
    }

    var chartsOptions = {
        chartsFactory: function(dataType) {
            var optionFactory = function(chartType) {
                //收入饼图
                var factories = [
                    function(index) {
                        var data = [
                            [
                                { name: "安宁公交", value: 80 },
                                { name: "东川公交", value: 90 },
                                { name: "元谋公交", value: 110 },
                                { name: "禄劝公交", value: 50 },
                                { name: "景洪公交", value: 65 },
                                { name: "嵩明公交", value: 30 },
                            ],
                            [
                                { name: "安宁公交", value: 80 },
                                { name: "东川公交", value: 90 },
                                { name: "元谋公交", value: 110 },
                                { name: "禄劝公交", value: 50 },
                                { name: "景洪公交", value: 65 },
                                { name: "嵩明公交", value: 30 },
                            ],
                            [
                                { name: "安宁公交", value: 80 },
                                { name: "东川公交", value: 90 },
                                { name: "元谋公交", value: 110 },
                                { name: "禄劝公交", value: 50 },
                                { name: "景洪公交", value: 65 },
                                { name: "嵩明公交", value: 30 },
                            ],
                        ];
                        var option = {
                            tooltip: { trigger: 'item', formatter: '{b}<br/> {c} ({d}%)' },
                            series: {
                                type: 'pie',
                                radius: ["15%", "50%"],
                                center: ['50%', '40%'],
                                roseType: 'radius',
                                label: {
                                    fontSize: 12,
                                    color: '#FFF',
                                    backgroundColor: 'transparent',
                                    boderColor: 'transparent',
                                    shadowColor: 'transparent'
                                },
                                data: data[index],
                            }
                        };
                        return option;
                    },

                    //人次饼图
                    function(index) {
                        var data = [
                            [
                                { name: "安宁公交", value: 80 },
                                { name: "东川公交", value: 90 },
                                { name: "元谋公交", value: 110 },
                                { name: "禄劝公交", value: 50 },
                                { name: "景洪公交", value: 65 },
                                { name: "嵩明公交", value: 30 },
                            ],
                            [
                                { name: "安宁公交", value: 80 },
                                { name: "东川公交", value: 90 },
                                { name: "元谋公交", value: 110 },
                                { name: "禄劝公交", value: 50 },
                                { name: "景洪公交", value: 65 },
                                { name: "嵩明公交", value: 30 },
                            ],
                            [
                                { name: "安宁公交", value: 80 },
                                { name: "东川公交", value: 90 },
                                { name: "元谋公交", value: 110 },
                                { name: "禄劝公交", value: 50 },
                                { name: "景洪公交", value: 65 },
                                { name: "嵩明公交", value: 30 },
                            ]
                        ];
                        var option = {
                            tooltip: { trigger: 'item', formatter: '{b}<br/> {c} ({d}%)' },
                            series: {
                                type: 'pie',
                                radius: ["15%", "50%"],
                                center: ['50%', '40%'],
                                roseType: 'radius',
                                label: {
                                    fontSize: 12,
                                    color: '#FFF',
                                    backgroundColor: 'transparent',
                                    boderColor: 'transparent',
                                    shadowColor: 'transparent'
                                },
                                data: data[index],
                            }
                        };
                        return option;
                    },
                    //历史数据
                    function(index) {
                        var data = [
                            [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
                            [123, 175, 112, 197, 121, 67, 98, 21, 43, 64, 76, 38, 123, 175, 112, 197, 121, 67, 98, 21, 43, 64, 76, 38, 10],
                            [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
                        ];
                        var labels = [
                            ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"],
                            ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"],
                            ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
                        ];

                        var option = {
                            color: '#00f2f1',
                            tooltip: { trigger: 'axis' },
                            grid: { top: '5%', left: '5%', right: '5%', bottom: '5%', show: true, boderColor: '#012f4a', containLabel: true },
                            xAxis: { type: 'category', data: labels[index], axisTick: { show: false }, axisLabel: { color: '#4c9bfd' }, axisLine: { show: false }, boundaryGap: false },
                            yAxis: { type: 'value', axisTick: { show: false }, axisLine: { show: false }, axisLabel: { color: '#4c9bfd' }, splitLine: { lineStyle: { color: '#012f4a' } } },
                            series: [{ data: data[index], smooth: true, type: 'line' }]
                        };
                        return option;
                    },
                    //地图数据
                    function(index) {
                        var data = [
                            [
                                { name: "安宁公交", value: 80 },
                                { name: "东川公交", value: 90 },
                                { name: "元谋公交", value: 110 },
                                { name: "禄劝公交", value: 50 },
                                { name: "景洪公交", value: 65 },
                                { name: "嵩明公交", value: 30 },
                            ],
                            [
                                { name: "安宁公交", value: 80 },
                                { name: "东川公交", value: 90 },
                                { name: "元谋公交", value: 110 },
                                { name: "禄劝公交", value: 50 },
                                { name: "景洪公交", value: 65 },
                                { name: "嵩明公交", value: 30 },
                            ],
                            [
                                { name: "安宁公交", value: 80 },
                                { name: "东川公交", value: 90 },
                                { name: "元谋公交", value: 110 },
                                { name: "禄劝公交", value: 50 },
                                { name: "景洪公交", value: 65 },
                                { name: "嵩明公交", value: 30 },
                            ]
                        ];
                        var option = {
                            tooltip: {
                                trigger: 'item',
                                formatter: '{b}<br/>{c}'
                            },
                            visualMap: {
                                type: 'continuous',
                                show: false,
                                min: 0,
                                max: 120,
                                inRange: { color: ['lightskyblue', 'yellow', 'orangered'] },
                            },
                            series: [{
                                type: 'map',
                                map: '云南',
                                roam: true,
                                data: data[index],
                                itemStyle: {
                                    normal: {
                                        borderColor: '#0692a4',
                                        borderWidth: 1
                                    },
                                    emphasis: {
                                        borderColor: '#0b1c2d',
                                        borderWidth: 2
                                    }
                                },
                                label: {
                                    normal: { show: true, color: '#000' }
                                },
                                nameMap: {
                                    "五华区": "五华",
                                    "盘龙区": "盘龙",
                                    "官渡区": "官渡",
                                    "呈贡区": "呈贡",
                                    "西山区": "西山",
                                    "安宁市": "安宁",
                                    "宜良县": "宜良",
                                    "石林彝族自治县": "石林",
                                    "晋宁区": "晋宁",
                                    "嵩明县": "嵩明",
                                    "富民县": "富民",
                                    "寻甸回族彝族自治县": "寻甸",
                                    "东川区": "东川",
                                    "禄劝彝族苗族自治县": "禄劝"
                                },
                            }]
                        };
                        return option;
                    }
                ];
                return [factories[0](chartType), factories[1](chartType), factories[2](chartType), factories[3](chartType)];
            };
            var options = optionFactory(dataType);
            return [{
                    item: $("#incomePie"),
                    option: options[0]
                },
                {
                    item: $("#timesPie"),
                    option: options[1]
                },
                {
                    item: $("#historyChart"),
                    option: options[2]
                },
                {
                    item: $("#mainMap"),
                    option: options[3]
                }
            ];
        },

        //表格数据
        tablesFactory: function(dataType) {
            var data = [
                [
                    [
                        { name: "安宁公交", value: 80 },
                        { name: "东川公交", value: 90 },
                        { name: "元谋公交", value: 110 },
                        { name: "禄劝公交", value: 50 },
                        { name: "景洪公交", value: 65 },
                        { name: "嵩明公交", value: 30 },
                    ],
                    [
                        { name: "安宁公交", value: 80 },
                        { name: "东川公交", value: 90 },
                        { name: "元谋公交", value: 110 },
                        { name: "禄劝公交", value: 50 },
                        { name: "景洪公交", value: 65 },
                        { name: "嵩明公交", value: 30 },

                    ],
                    [
                        { name: "安宁公交", value: 80 },
                        { name: "东川公交", value: 90 },
                        { name: "元谋公交", value: 110 },
                        { name: "禄劝公交", value: 50 },
                        { name: "景洪公交", value: 65 },
                        { name: "嵩明公交", value: 30 },

                    ]
                ],
                [
                    [
                        { name: "安宁公交", value: 80 },
                        { name: "东川公交", value: 90 },
                        { name: "元谋公交", value: 110 },
                        { name: "禄劝公交", value: 50 },
                        { name: "景洪公交", value: 65 },
                        { name: "嵩明公交", value: 30 },

                    ],
                    [
                        { name: "安宁公交", value: 80 },
                        { name: "东川公交", value: 90 },
                        { name: "元谋公交", value: 110 },
                        { name: "禄劝公交", value: 50 },
                        { name: "景洪公交", value: 65 },
                        { name: "嵩明公交", value: 30 },

                    ],
                    [
                        { name: "安宁公交", value: 80 },
                        { name: "东川公交", value: 90 },
                        { name: "元谋公交", value: 110 },
                        { name: "禄劝公交", value: 50 },
                        { name: "景洪公交", value: 65 },
                        { name: "嵩明公交", value: 30 },

                    ]
                ],
                [
                    [
                        { name: "安宁公交", value: 80 },
                        { name: "东川公交", value: 90 },
                        { name: "元谋公交", value: 110 },
                        { name: "禄劝公交", value: 50 },
                        { name: "景洪公交", value: 65 },
                        { name: "嵩明公交", value: 30 },
                    ],
                    [
                        { name: "安宁公交", value: 80 },
                        { name: "东川公交", value: 90 },
                        { name: "元谋公交", value: 110 },
                        { name: "禄劝公交", value: 50 },
                        { name: "景洪公交", value: 65 },
                        { name: "嵩明公交", value: 30 },
                    ],
                    [
                        { name: "安宁公交", value: 80 },
                        { name: "东川公交", value: 90 },
                        { name: "元谋公交", value: 110 },
                        { name: "禄劝公交", value: 50 },
                        { name: "景洪公交", value: 65 },
                        { name: "嵩明公交", value: 30 },
                    ]
                ]
            ];
            var headers = ["<tr><th width='15%'>排名</td><th width='35%'>公司</td><th width='50%'>收入(万元)</td></tr>",
                "<tr><th width='15%'>排名</td><th width='35%'>公司</td><th width='50%'>服务人次</td></tr>",
                "<tr><th width='15%'>排名</td><th width='35%'>公司</td><th width='50%'>会员新增</td></tr>"
            ];
            var colors = [
                ["red", "orange", "coral", "cyan", "darkcyan"],
                ["red", "orange", "coral", "cyan", "darkcyan"],
                ["red", "orange", "coral", "cyan", "darkcyan"]
            ];
            var tops = [5, 5, 5];

            function comparer(a, b) { return b.value - a.value; }
            var comparers = [comparer, comparer, comparer];
            var tables = $("#page-1 tbody");
            return [{
                    header: headers[0],
                    table: tables.eq(0),
                    data: data[dataType][0],
                    comparer: comparers[0],
                    top: tops[0],
                    colors: colors[0]
                },
                {
                    header: headers[1],
                    table: tables.eq(1),
                    data: data[dataType][1],
                    comparer: comparers[1],
                    top: tops[1],
                    colors: colors[1]
                },
                {
                    header: headers[2],
                    table: tables.eq(2),
                    data: data[dataType][2],
                    comparer: comparers[2],
                    top: tops[2],
                    colors: colors[2]
                },
            ];
        }
    };

    var Overview = function(options) {
        this._initialied = false;
        this._chartsFactory = null;
        if ($.isFunction(options.chartsFactory)) {
            this._chartsFactory = options.chartsFactory;
        } else {
            console.error("chartFactory is not a function or null.")
            return;
        }
        this._charts = new Array();
        this._tables = new Array();
        if ($.isFunction(options.tablesFactory)) {
            this._tablesFactory = options.tablesFactory;
        } else {
            console.error("tableDataFactory is not a function or null.")
            return;
        }
        this._current = 0;
        this._defaultComparer = function(a, b) { return b.value - a.value; };

        this.buildHistoryLine = function(datasets) {
            let option = {
                color: '#00f2f1',
                tooltip: { trigger: 'axis' },
                grid: { top: '5%', left: '5%', right: '5%', bottom: '5%', show: true, boderColor: '#012f4a', containLabel: true },
                xAxis: { type: 'category', axisLabel: { color: 'white' }, axisLine: { lineStyle: { color: '#1F7EFF' } } },
                yAxis: { type: 'value', axisLine: { show: true, lineStyle: { color: '#1F7EFF' } }, axisLabel: { color: 'white' }, splitLine: { lineStyle: { color: '#012f4a' } } },
                dataset: datasets,
                series: []
            };
            for (let i = 0; i < datasets.length; i++) {
                option.series.push({
                    smooth: true,
                    type: 'line',
                    datasetIndex: i,
                    seriseLayoutBy: 'row'
                });
            };
            return option;
        };
        this.buildPie = function(datasets) {
            let option = {
                tooltip: { trigger: 'item', formatter: '{b}<br/> {c} ({d}%)' },
                dataset: datasets,
                series: {
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
                        alignTo: 'labelLine',
                        formatter: function(param) {
                            return param.name.substr(0, 2) + "\n{a|(" + param.percent.toFixed(1) + '%)}';
                        }
                    },
                    encode: { itemName: 0, value: 1, tooltip: 1 }
                }
            };
            return option;
        };

        this.init = function() {
            if (this._initialied) return;

            var items = this._chartsFactory(this._current);
            for (let index = 0; index < items.length; index++) {
                var thisChart = echarts.init(items[index].item[0]);
                items[index].chart = thisChart;
                var num = this._charts.push(items[index]);
                window.addEventListener('resize', function() { $.Overview._charts[num - 1].chart.resize(); });
            }
            var tables = this._tablesFactory(this._current);
            if ($.isArray(tables)) {
                this._tables = tables;
            }
            $("#mainPageType a").each(function(index) {
                $(this).click(function() {
                    $(this).parent().addClass("active").siblings().removeClass("active");
                    $.Overview.update(index);
                    $.Overview._current = index;
                });
            });
        };

        this.updateTables = function(dataType) {
            if (this._current != dataType) {
                this._current = dataType;
                this._tables = this._tablesFactory(dataType);
            }
            for (let num = 0; num < this._tables.length; num++) {
                var table = this._tables[num];
                if ($.isFunction(table.comparer)) {
                    table.data.sort(table.comparer);
                } else {
                    table.data.sort(this._defaultComparer);
                }
                var lines = "";
                var lastColor = 0;
                for (let i = 0; i < table.data.length && i < table.top; i++) {
                    var color = table.colors[lastColor];
                    lines += "<tr>" +
                        "<td><div class='order' style='background-color:" + color + ";'><div>" + (i + 1) + "</div></div></td>" +
                        "<td>" + table.data[i].name + "</td>" +
                        "<td>" + table.data[i].value + "</td>" +
                        "</tr>";
                    if (lastColor < table.colors.length - 1) lastColor++;
                }
                table.table.html(table.header + lines);
            }
        };

        this.updateCharts = function(dataType) {
            if (this._current != dataType) {
                this._current = dataType;
                this._charts = this.chartsFactory(dataType);
            }
            for (let index = 0; index < this._charts.length; index++) {
                this._charts[index].chart.setOption(this._charts[index].option);
                this._charts[index].chart.resize();
            }
        };

        this.update = function(timeType) {
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
        };
    };

    $.extend({ Overview: new Overview(chartsOptions) });
    console.log("overview loaded. ");
}(window.jQuery));