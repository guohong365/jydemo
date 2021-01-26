(function ($) {
    var contiesOptions = {
        charts: ['#incomeCharts', '#incomePies', "#serviceCharts", "#servicePies", "#memberCharts", "#memberPies", "#vechicleChart", "#employeeChart"],
        selectors: function () { return $("#page-2 .county-selector-box").find(".county-selector-wrapper"); },


        optionFactory: function (countyName) {
            var buildTitles = function () {
                let subtexts = ["历\n史\n变\n化", "历\n史\n累\n计", '支出分布', '收入分布', '收入来源', '乘车类型', '支付方式', '会员种类', '会员类型', '会员来源', '车辆类型', '员工分类'];
                let titleTexts = ["收入/支出", "乘车人次", "会员新增"];
                let titlePositions =
                    [
                        { top: 0, left: '50%' },
                        { top: 0, left: '50%' },
                        { top: 0, left: '50%' },
                    ]
                let subtextLeft = { top: 'middle', left: '5%', textAlign: 'right' };
                let subtextRight = { top: 'middle', right: '45%', textAlign: 'left' };
                let subtextCenter = { top: 0, left: 'center' };

                let titles = [];
                titleTexts.forEach(function (text, index) {
                    let title = {};
                    $.extend(true, title,
                        {
                            text: text,
                            textAlign: 'center',
                            verticalAlign: 'top',
                            textStyle: { color: 'yellow', fontSize: 14, fontWeight: 'bold' }
                        },
                        titlePositions[index]);
                    titles.push(title);
                });
                let subtitles = [];
                subtexts.forEach(function (text, index) {
                    let subtext = {};
                    $.extend(true, subtext, {
                        subtext: text,
                        textAlign: 'center',
                        verticalAlign: 'top',
                        subtextStyle: { color: 'yellow' }
                    }, index == 0 ? subtextLeft : (index == 1 ? subtextRight : subtextCenter));
                    subtitles.push(subtext);
                });
                return
                [
                    [titles[0], subtitles[0], subtitles[1]],
                    [titles[1], subtitles[0], subtitles[1]],
                    [titles[2], subtitles[0], subtitles[1]],
                    [subtitles[2], subtitles[3], subtitles[4]],
                    [subtitles[5], subtitles[6], subtitles[7]],
                    [subtitles[8], subtitles[9]],
                    subtitles[10],
                    subtitles[11],
                ];
            };
            var buildGrids = function () {
                let grids = [];
                let position = [{ left: '5%', top: 0, right: '45%', bootom: '10%' }]
                for (let i = 0; i < 3; i++) {
                    let grid = {};
                    grids.push($.extend(true, grid, {
                        backgroundColor: '#1F7EFF3F',
                        boderWidth: 0,
                        containLabel: true,
                        show: true
                    }, position));
                }
                return grids;
            }
            var getBasicOptions = function () {
                return {
                    color: ['red', 'green'],
                    tooltip: { trigger: 'axis', axisPointer: { type: 'cross', crossStyle: { color: '#999' } } },
                    legend: {
                        textStyle: { color: 'white', fontSize: 11 },
                        bottom: 'bottom',
                        left: 'center'
                    },
                    xAxis: [
                        {
                            type: 'category',
                            axisLine: { lineStyle: { color: '#1F7EFF', width: 1 } },
                            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                            axisPointer: { type: 'shadow' },
                            axisLabel: { interval: 0, textStyle: { color: '#fff' }, fontSize: 11, }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            splitLine: { show: true, lineStyle: { color: '#021439', width: 1 } },
                            axisLine: { show: true, lineStyle: { color: '#1F7EFF', width: 1 } },
                            axisLabel: { show: true, textStyle: { color: '#fff' }, fontSize: 11, interval: 'auto', formatter: '{value}' },
                            nameTextStyle: { color: '#fff', fontWeight: 'bold' }
                        },
                        {
                            type: 'value',
                            splitLine: { show: true, lineStyle: { color: '#021439', width: 1 } },
                            axisLine: { show: true, lineStyle: { color: '#1F7EFF', width: 1 } },
                            axisLabel: { show: true, textStyle: { color: '#fff' }, fontSize: 11, interval: 'auto', formatter: '{value}' },
                            nameTextStyle: { color: '#fff', fontSize: 11, fontWeight: 'bold' }
                        }
                    ],

                };
            };
            var getBasicSeries = function (type) {
                switch (type) {
                    case 'line':
                        return {
                            type: 'line',
                            symbol: 'circle',
                            symbolSize: 7,
                        };
                    case 'bar':
                        return {
                            type: 'bar',
                            barWidth: '30%',
                        };
                }
            }
            var options = [
                //收入历史
                {
                    legend: {
                        data: [
                            { name: '收入', icon: 'roundRect' },
                            { name: '支出', icon: 'roundRect' },
                            { name: '累计收入', icon: 'roundRect' },
                            { name: '累计支出', icon: 'roundRect' }
                        ],
                    },
                    series: [
                        {
                            name: '收入',
                            yAxisIndex: 0, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
                            data: [0, 0, 6, 17, 22, 26, 41, 48, 59, 69, 75, 90]
                        },
                        {
                            name: '支出',
                            yAxisIndex: 0,
                            data: [0, 0, 10, 15, 25, 30, 35, 50, 55, 70, 80, 85]
                        },
                        {
                            name: '累计支出',
                            yAxisIndex: 1, ////使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
                            data: [0, 0, 6, 23, 45, 71, 112, 160, 219, 288, 363, 453]
                        },
                        {
                            name: '累计收入',
                            yAxisIndex: 1,
                            data: [0, 0, 10, 25, 50, 80, 115, 165, 220, 290, 370, 455]
                        },
                    ],
                },
                //收入分布
                {
                    title: [
                        { left: '16.667%', subtext: "支出分布", subtextStyle: { color: 'yellow', }, textAlign: 'center' },
                        { left: '50%', subtext: "收入分布", subtextStyle: { color: 'yellow', }, textAlign: 'center' },
                        { left: '83.333%', subtext: "收入来源", subtextStyle: { color: 'yellow', }, textAlign: 'center' },
                    ],
                    tooltip: { trigger: 'item', formatter: '{b}:{c}({d})' },
                    series: [
                        {
                            name: '支出分布',
                            type: 'pie',
                            roseType: 'radius',
                            radius: ['20%', '50%'],
                            right: '66.667%',
                            label: { fontSize: 12, color: '#FFF', backgroundColor: 'transparent', boderColor: 'transparent', shadowColor: 'transparent' },
                            data: [
                                { name: "车辆维护费", value: 120 },
                                { name: "燃油费", value: 320 },
                                { name: "工资", value: 200 },
                                { name: "管理费", value: 130 },
                                { name: "其他", value: 90 }
                            ]
                        },
                        {
                            name: '收入分布',
                            type: 'pie',
                            roseType: 'radius',
                            left: '33.333%',
                            right: '33.333%',
                            radius: ['20%', '50%'],
                            label: { fontSize: 12, color: '#FFF', backgroundColor: 'transparent', boderColor: 'transparent', shadowColor: 'transparent' },
                            data: [
                                { name: "公交售票", value: 420 },
                                { name: "出租车", value: 320 },
                                { name: "长途客运", value: 200 },
                                { name: "其他", value: 130 },
                            ]
                        },
                        {
                            name: '收入来源',
                            type: 'pie',
                            roseType: 'radius',
                            left: '66.667%',
                            radius: ['20%', '50%'],
                            label: { fontSize: 12, color: '#FFF', backgroundColor: 'transparent', boderColor: 'transparent', shadowColor: 'transparent' },
                            data: [
                                { name: "一卡通", value: 420 },
                                { name: "移动支付", value: 220 },
                                { name: "现金", value: 320 },
                                { name: "其他", value: 30 },
                            ]
                        },
                    ],
                },
                //服务人数
                {
                    legend: {
                        data: [
                            { name: '人次', icon: 'roundRect' },
                            { name: '累计人次', icon: 'roundRect' },
                        ],

                    },
                    series: [{
                        name: '人次',
                        barWidth: '30%',
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                lineStyle: { color: '#0b7ff3' },
                                color: '#0b7ff3',
                            }
                        },
                        yAxisIndex: 0, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
                        data: [0, 0, 6, 17, 22, 26, 41, 48, 59, 69, 75, 90]
                    },
                    {
                        name: '累计人次',
                        type: 'line',
                        itemStyle: {
                            normal: {
                                lineStyle: { color: '#0b7ff3' },
                                fontSize: 11,
                                color: '#0b7ff3'

                            }
                        },
                        symbol: 'circle',
                        symbolSize: 5, //折线点的大小
                        yAxisIndex: 1, ////使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
                        data: [0, 0, 6, 23, 45, 71, 112, 160, 219, 288, 363, 453]
                    },
                    ],
                },
                //服务人数比例
                {
                    title: [{
                        left: '16.667%',
                        subtext: "车辆分布",
                        subtextStyle: {
                            color: 'yellow',
                        },
                        textAlign: 'center'
                    },
                    {
                        left: '50%',
                        subtextStyle: {
                            color: 'yellow',
                        },
                        textAlign: 'center',
                        subtext: "支付分布"
                    },
                    {
                        left: '83.333%',
                        subtextStyle: {
                            color: 'yellow',
                        },
                        textAlign: 'center',
                        subtext: "会员分布"
                    },
                    ],
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}:{c}{d}'
                    },
                    series: [{
                        name: '车辆分布',
                        type: 'pie',
                        radius: ['20%', '50%'],
                        right: '66.6667%',
                        label: {
                            fontSize: 12,
                            color: '#FFF',
                            backgroundColor: 'transparent',
                            boderColor: 'transparent',
                            shadowColor: 'transparent'
                        },

                        data: [
                            { name: "公交", value: 510 },
                            { name: "出租车", value: 100 },
                            { name: "长途", value: 250 },
                            { name: "其他", value: 50 }
                        ]
                    },
                    {
                        name: '支付分布',
                        type: 'pie',
                        radius: ['20%', '50%'],
                        left: '33.3333%',
                        right: '33.3333%',
                        label: {
                            fontSize: 12,
                            color: '#FFF',
                            backgroundColor: 'transparent',
                            boderColor: 'transparent',
                            shadowColor: 'transparent'
                        },

                        data: [
                            { name: "一卡通", value: 510 },
                            { name: "移动支付", value: 100 },
                            { name: "现金", value: 250 },
                            { name: "老年卡", value: 150 },
                            { name: "其他", value: 50 }

                        ]
                    },
                    {
                        name: '会员分布',
                        type: 'pie',
                        radius: ['20%', '50%'],
                        left: '66.6667%',
                        label: {
                            fontSize: 12,
                            color: '#FFF',
                            backgroundColor: 'transparent',
                            boderColor: 'transparent',
                            shadowColor: 'transparent'
                        },

                        data: [
                            { name: "本地", value: 310 },
                            { name: "异地", value: 100 },
                            { name: "非会员", value: 650 },
                        ]
                    },
                    ],
                },
                //新增会员
                {

                    legend: {
                        data: [
                            { name: '新增', icon: 'roundRect' },
                            { name: '累计', icon: 'roundRect' },
                        ],
                    },
                    series: [{
                        name: '新增',
                        itemStyle: {
                            lineStyle: { color: 'chartreuse' },
                            color: '#7FFF00',
                        },
                        yAxisIndex: 0, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
                        data: [30, 0, 6, 17, 22, 14, 41, 48, 59, 39, 75, 90]
                    },
                    {
                        name: '累计',
                        type: 'line',
                        itemStyle: {
                            lineStyle: { color: '#42C96E' },
                            color: '#42C96E'
                        },
                        yAxisIndex: 1, ////使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
                        data: [0, 0, 6, 23, 45, 71, 112, 160, 219, 288, 363, 453]
                    },
                    ],
                },
                //新增会员比例
                {
                    title: [{
                        left: '25%',
                        subtext: "分类",
                        subtextStyle: {
                            color: 'yellow',
                        },
                        textAlign: 'center'
                    },
                    {
                        left: '75%',
                        subtextStyle: {
                            color: 'yellow',
                        },
                        subtext: "来源"
                    },
                    ],
                    tooltip: {
                        trigger: 'item',
                    },
                    series: [{
                        name: '分类',
                        type: 'pie',
                        right: '50%',
                        radius: '50%',
                        label: {
                            fontSize: 12,
                            color: '#FFF',
                            backgroundColor: 'transparent',
                            boderColor: 'transparent',
                            shadowColor: 'transparent'
                        },
                        data: [
                            { name: "一卡通", value: 645 },
                            { name: "APP", value: 245 },
                            { name: "微信", value: 45 }
                        ]
                    },
                    {
                        name: '来源',
                        type: 'pie',
                        left: '50%',
                        radius: '50%',
                        label: {
                            fontSize: 12,
                            color: '#FFF',
                            backgroundColor: 'transparent',
                            boderColor: 'transparent',
                            shadowColor: 'transparent'
                        },
                        data: [
                            { name: "售卡点", value: 645 },
                            { name: "代理商", value: 245 },
                            { name: "网站", value: 45 },
                            { name: "活动", value: 175 },
                            { name: "其他", value: 15 }
                        ]
                    },
                    ],
                },
                //车辆类别
                {
                    title: [{
                        left: 'center',
                        subtext: "车辆类型",
                        subtextStyle: {
                            color: 'yellow',
                        },
                        textAlign: 'center'
                    },],
                    tooltip: {
                        trigger: 'item',
                    },
                    series: [{
                        name: '车辆类型',
                        type: 'pie',
                        radius: '25%',
                        bottom: 0,
                        label: {
                            fontSize: 12,
                            color: '#FFF',
                            backgroundColor: 'transparent',
                            boderColor: 'transparent',
                            shadowColor: 'transparent'
                        },
                        data: [
                            { name: "公交车", value: 65 },
                            { name: "长途客运", value: 21 },
                            { name: "出租车", value: 55 },
                            { name: "其他", value: 15 }
                        ]
                    },],
                },
                //员工类别
                {
                    title: [{
                        left: 'center',
                        subtext: "员工分类",
                        subtextStyle: {
                            color: 'yellow',
                        },
                        textAlign: 'center'
                    },],
                    tooltip: {
                        trigger: 'item',
                    },
                    series: [{
                        name: '员工分类',
                        type: 'pie',
                        radius: '25%',
                        bottom: 0,
                        label: {
                            fontSize: 12,
                            color: '#FFF',
                            backgroundColor: 'transparent',
                            boderColor: 'transparent',
                            shadowColor: 'transparent'
                        },
                        data: [
                            { name: "管理层", value: 45 },
                            { name: "职员", value: 145 },
                            { name: "司机", value: 445 },
                            { name: "后勤", value: 310 },
                            { name: "其他", value: 100 },
                        ]
                    },],
                },
            ];
            var data = [];
            var counties = [

            ];
            return options;
        }

    };

    var buildGrids = function () {

    };
    var adjustSize = function () {
        var pageVisible = $("#page-2").css("display") != "none";
        if (pageVisible) {
            var others = $("#page-2 .page-col");
            var space = 0;
            others.each(function () {
                space += $(this).width();
            });
            var middle = $("#page-2 #middle-area");
            var width = middle.parent().width() - 400;
            middle.css({ "width": width + "px" });
        }
    }



    var CountiesView = function (options) {
        this._counties = [
            "安宁公交", "东川公交", "元谋公交", "禄劝公交", "景洪公交", "嵩明公交"
        ];
        this._currentCounty = 0;
        this._currentType = 0;
        this._selectors = options.selectors;
        this._optionFacotry = options.optionFactory;
        this._initailized = false;
        this._charts = new Array();

        this.init = function () {
            if (this._initailized) return;

            var _this = this;
            var selectors = this._selectors();
            selectors.each(function (index) {
                $(this).click(function () {
                    $(this).addClass("active").siblings().removeClass("active");
                });
            });
            adjustSize();
            window.addEventListener("resize", function () {
                adjustSize();
            });

            var elements = $(options.charts.join());
            var _this = this;
            elements.each(function (index) {
                var chart = echarts.init(elements[index], 'shine');
                _this._charts.push(chart);
                window.addEventListener("resize", function () {
                    $.CountiesView._charts[index].resize();
                });
            });

            this._initailized = true;
            console.log("counties initialied.");
        };
        this.update = function (dateType) {
            if (!this._initailized) {
                this.init();
            }
            var options = this._optionFacotry(this._currentCounty);
            this._charts.forEach(function (chart, index) {
                chart.setOption(options[index]);
                chart.resize();
            });
        };
    };

    $.extend({
        CountiesView: new CountiesView(contiesOptions)
    });
    console.log("counties was loaded.")

}(window.jQuery));