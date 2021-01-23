(function($) {
    if (!$) {
        console.log("jquery not initialized.");
    }
    var companies = [
        { name: "安宁公交" },
        { name: "东川公交" },
        { name: "元谋公交" },
        { name: "禄劝公交" },
        { name: "景洪公交" },
        { name: "嵩明公交" }
    ];

    var months = [
        { name: "一月" }, { name: "二月" }, { name: "三月" }, { name: "四月" }, { name: "五月" }, { name: "六月" },
        { name: "七月" }, { name: "八月" }, { name: "九月" }, { name: "十月" }, { name: "十一月" }, { name: "十二月" }
    ];


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