(function ($) {
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
        this.mergeOption = function (options) {
            $.extend(true, this.options, options);
        };
        this.setOption = function (options) {
            if (options) {
                this.options = options;
            }
        };
        this.setOption(options);

        this.getCompanies = function () {
            let names = [
                { name: "安宁公交" },
                { name: "东川公交" },
                { name: "元谋公交" },
                { name: "禄劝公交" },
                { name: "景洪公交" },
                { name: "嵩明公交" }
            ];
            let ret = [];
            names.forEach(function (item) {
                ret.push({ name: item });
            });
        };
        this.getYears = function (fromYear, count) {
            let years = [];
            for (let i = 0; i < count; i++) {
                years.push({ name: '' + (fromYear - i), year: fromYear - i })
            }
            return years;
        };
        this.getMonths = function (fromMonth) {
            let months = [
                { name: "一月" }, { name: "二月" }, { name: "三月" }, { name: "四月" }, { name: "五月" }, { name: "六月" },
                { name: "七月" }, { name: "八月" }, { name: "九月" }, { name: "十月" }, { name: "十一月" }, { name: "十二月" }
            ];
            let ret = [];
            for (let i = 0; i < 12; i++) {
                var current = (fromMonth + i) % 12;
                ret.push(months[current]);
            }
            return ret;
        };
        this.getDays = function (year, month, endDay) {
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
                days.push({ name: '' + i, value: i });
            }
            return days;
        };

        this.buildHistoryData = function () {
            let historyOption = {
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

        function getColumnData(dataset) {
            let index = dataset.source[0].length - 1;

            let rows = dataset.source.slice(1);
            var data = [];
            rows.forEach(function (row) {
                data.push(row[index]);
            });
            return data;
        }
        this.buildPieData = function (historyData, index) {
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
                columns: [{ name: '2020' }]
            });
            latest = getColumnData(historyData[1])
            var monthsData = generator.generate({
                name: '2020年12月数据',
                min: latest[index] / 10,
                max: latest[index] / 3,
                columns: [{ name: '2020-12' }]
            });
            latest = getColumnData(historyData[2])
            var daysData = generator.generate({
                name: '2020年12月-31数据',
                min: latest[index] / 10,
                max: latest[index] / 3,
                columns: [{ name: '2020-12-31' }]
            });
            return [yearsData, monthsData, daysData];
        };

        this.buildDataSets = function () {
            let histories = this.buildHistoryData();
            let incomes = this.buildPieData(histories, 2);
            let expenses = this.buildPieData(histories, 3);
            return {
                histories: histories,
                incomes: incomes,
                expenses: expenses
            };
        };
    }



    var chartsOptions = {
        //表格数据
        tablesFactory: function (dataType) {
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

    var Overview = function (options) {
        this._initialied = false;
        var builder = new DataSetBuilder();
        this._dataSets = builder.buildDataSets();

        this.charts = new Array();
        this._tables = new Array();
        if ($.isFunction(options.tablesFactory)) {
            this._tablesFactory = options.tablesFactory;
        } else {
            console.error("tableDataFactory is not a function or null.")
            return;
        }
        this._current = 0;
        this._defaultComparer = function (a, b) { return b.value - a.value; };

        this.buildHistoryLine = function (dataset) {
            const LINE_COUNT = 4;
            let option = {
                color: ['red', 'green', 'red', 'green'],
                tooltip: { trigger: 'axis', textStyle: { color: 'white' } },
                grid: { top: '5%', left: '5%', right: '5%', bottom: '5%', show: true, boderColor: '#012f4a', containLabel: true },
                xAxis: { type: 'category', axisLabel: { color: 'white' }, axisLine: { lineStyle: { color: '#1F7EFF' } } },
                yAxis: [
                    { type: 'value', axisLine: { show: true, lineStyle: { color: '#1F7EFF' } }, axisLabel: { color: 'white' }, splitLine: { lineStyle: { color: '#012f4a' } } },
                    { type: 'value', axisLine: { show: true, lineStyle: { color: '#1F7EFF' } }, axisLabel: { color: 'white' }, splitLine: { lineStyle: { color: '#012f4a' } } }
                ],
                dataset: [],
                series: []
            };
            option.dataset = dataset;
            for (let i = 0; i < LINE_COUNT; i++) {
                option.series.push({
                    smooth: true,
                    type: 'line',
                    yAxisIndex: i < 2 ? 0 : 1,
                    datasetIndex: this._current,
                    seriesLayoutBy: 'row',
                });
            }
            return option;
        };
        this.buildPie = function (dataset) {
            let option = {
                tooltip: { trigger: 'item', formatter: '{c}<br/> ({d}%)' },
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
                        rich: { a: { color: 'yellow' } }, //'#1F7EFF'}},
                        formatter: function (param) {
                            return param.name.substr(0, 2) + "\n{a|(" + param.percent.toFixed(1) + '%)}';
                        }
                    },
                    datasetIndex: this._current,
                    encode: { itemName: 0, value: 1, tooltip: 1 }
                }]
            };
            return option;
        };

        this.buildMap = function (datasets) {
            let defaultItemStyle = {
                emphasis: {
                    label: { show: false, color: '#FFF', },
                    itemStyle: {
                        borderColor: "rgba(19,198,249,0.8)",
                        borderWidth: 1,
                        areaColor: { type: 'radial', x: 0.5, y: 0.5, r: 0.8, colorStops: [{ offset: 0, color: '#FFFFFF00' }, { offset: 1, color: "rgba(19,198,249,0.6)" }], },
                    }
                },
                itemStyle: {
                    borderColor: "rgba(19,198,249,0.45)", borderWidth: 1, color: '#FFFFFF00',
                    areaColor: { type: 'radial', x: 0.5, y: 0.5, r: 0.8, colorStops: [{ offset: 0, color: '#FFFFFF00' }, { offset: 1, color: "rgba(19,198,249,0.15)" }], },
                    shadowColor: "rgba(19,198,249,1)",
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 10
                }
            };
            function buildRegions(names, itemStyle) {
                let regions = [];
                names.forEach(function (item) {
                    let region = { name: item.name };
                    $.extend(true, region, itemStyle);
                    region.emphasis.itemStyle.boderColor = "rgba(154,205,50,1)";
                    //region.emphasis.itemStyle.areaColor.colorStops[0].color = 'rgba(19,198,249,0.8)';
                    region.emphasis.itemStyle.areaColor.colorStops[1].color = 'rgba(154,205,50,1)';
                    region.itemStyle.boderColor = "rgba(154,205,50,0.8)";
                    //region.itemStyle.areaColor.colorStops[0].color = 'rgba(19,198,249,0.5)';
                    region.itemStyle.areaColor.colorStops[1].color = 'rgba(154,205,50,0.8)';
                    regions.push(region);
                });
                return regions;
            }
            function buildData(names) {
                var random = new RandomGenerator();
                var data = [];
                names.forEach(function (item) {
                    item.value.push(parseFloat(random.next(20, 100).toFixed(2)));
                    data.push({
                        name: item.name,
                        value: item.value,
                        itemStyle: { color: "rgba(19,198,249,0.5)" },
                        tooltip: {
                            backgroundColor: 'rgba(255,255,255,0.5)',
                            textStyle: { color: 'red', fontSize: 16 }
                        }
                    });
                });
                return data;
            }

            function buildScatters(names) {
            }
            let names = [
                { name: "安宁公交", value: [102.485544, 24.921785] },
                { name: "东川公交", value: [103.182, 26.08349] },
                { name: "元谋公交", value: [101.870837, 25.703313] },
                { name: "禄劝公交", value: [102.46905, 25.556533] },
                { name: "景洪公交", value: [100.797947, 22.002087] },
                { name: "嵩明公交", value: [103.038777, 25.335087] }
            ];

            var option = {
                tooltip: { triggerOn: "mousemove", backgroundColor: "transparent", color: 'white' },
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
                    regions: buildRegions(names, defaultItemStyle)
                },
                series: [
                    {
                        type: "effectScatter",
                        coordinateSystem: "geo",
                        showEffectOn: "render",
                        rippleEffect: { brushType: 'fill' },
                        hoverAnimation: true,
                        symbolSize: function (val) { return val[2] / 2; },
                        encode: { value: 2 },
                        zlevel: 1,
                        label: {
                            formatter: "{b}",
                            color: "yellow",
                            show: true
                        },
                        itemStyle: {
                            color: "#FFFF000F",
                            shadowBlur: 10,
                            shadowColor: "#333"
                        },
                        data: buildData(names)
                    },
                ]
            }
            $.extend(true, option.geo, defaultItemStyle);
            return option;
        };
        this.buildCharts = function () {
            var historyChart = this.buildHistoryLine(this._dataSets.histories);
            var icomePie = this.buildPie(this._dataSets.incomes);
            var expensePie = this.buildPie(this._dataSets.expenses);
            var mainMap = this.buildMap(this._dataSets.incomes);
            var ret = [];
            ret.push({ charElement: $("#timesPie"), option: expensePie });
            ret.push({ charElement: $("#incomePie"), option: icomePie });
            ret.push({ charElement: $("#historyChart"), option: historyChart });
            ret.push({ charElement: $("#mainMap"), option: mainMap });
            return ret;
        };

        this.init = function () {
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
            var tables = this._tablesFactory(this._current);
            if ($.isArray(tables)) {
                this._tables = tables;
            }
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

        this.updateTables = function (dataType) {
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

        this.updateCharts = function (dataType) {
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

        this.update = function (timeType) {
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