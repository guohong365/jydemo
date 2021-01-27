(function($) {

    function DataSetsBuilder() {}
    DataSetsBuilder.prototype.buildDataSets = function() {
        let options = {
            name: '',
            min: 0,
            max: 100,
            rows: [],
            columns: []
        };
        let baseline = [0, 0, 6, 17, 22, 26, 41, 48, 59, 69, 75, 90];
        let months = [
            { name: "一月" }, { name: "二月" }, { name: "三月" }, { name: "四月" }, { name: "五月" }, { name: "六月" },
            { name: "七月" }, { name: "八月" }, { name: "九月" }, { name: "十月" }, { name: "十一月" }, { name: "十二月" }
        ];
        let generator = $.createGenerator();
        let datasets = [];
        datasets.push([
            generator.generate({
                name: '收入/支出',
                min: 5,
                max: 100,
                rows: [{ name: '收入' }, { name: '支出' }, { name: '累计收入', method: 'accum', rowIndex: 0 }, { name: '累计支出', method: 'accum', rowIndex: 1 }],
                columns: months
            }),
            generator.generate({
                name: '支出分布',
                rows: [{ name: "车辆维护费" }, { name: "燃油费" }, { name: "工资" }, { name: "管理费" }, { name: "其他" }],
                columns: [{ name: '1' }]
            }),
            generator.generate({
                name: '收入分布',
                rows: [{ name: "公交售票" }, { name: "出租车" }, { name: "长途客运" }, { name: "其他" }],
                columns: [{ name: '1' }]
            }),
            generator.generate({
                name: '收入来源',
                rows: [{ name: "一卡通" }, { name: "移动支付" }, { name: "现金" }, { name: "其他" }],
                columns: [{ name: '1' }]
            })
        ], [
            generator.generate({
                name: '服务人次',
                min: 20,
                max: 300,
                rows: [{ name: '人次' }, { name: '累计人次', method: 'accum', rowIndex: 0 }],
                columns: months
            }),
            generator.generate({
                name: '车辆分布',
                rows: [{ name: "公交" }, { name: "出租车" }, { name: "长途" }, { name: "其他" }],
                columns: [{ name: '1' }]
            }),
            generator.generate({
                name: '支付分布',
                rows: [{ name: "一卡通" }, { name: "移动支付" }, { name: "现金" }, { name: "老年卡" }, { name: "其他" }],
                columns: [{ name: '1' }]
            }),
            generator.generate({
                name: '会员分布',
                rows: [{ name: "本地" }, { name: "异地" }, { name: "非会员" }, ],
                columns: [{ name: '1' }]
            })
        ], [
            generator.generate({
                name: '新增会员',
                min: 0,
                max: 1000,
                rows: [{ name: '新增' }, { name: '累计新增', method: 'accum', rowIndex: 0 }],
                columns: months
            }),
            generator.generate({
                name: '分类',
                rows: [{ name: "一卡通" }, { name: "APP" }, { name: "微信" }],
                columns: [{ name: '1' }]
            }),
            generator.generate({
                name: '来源',
                rows: [{ name: "售卡点" }, { name: "代理商" }, { name: "网站" }, { name: "活动" }, { name: "其他" }],
                columns: [{ name: '1' }]
            })
        ], [
            generator.generate({
                name: '车辆类型',
                baseline: [200, 70, 150, 50],
                rows: [{ name: "公交车" }, { name: "长途车" }, { name: "出租车" }, { name: "其他" }],
                columns: [{ name: '1' }]
            })
        ], [
            generator.generate({
                name: '员工分类',
                baseline: [10, 30, 300, 200, 50],
                rows: [{ name: "管理层", solt: { min: 0.01, max: 0.05 }, }, { name: "职员", solt: { min: 0.01, max: 0.05 } }, { name: "司机", solt: { min: 0.01, max: 0.05 } }, { name: "后勤", solt: { min: 0.01, max: 0.05 } }, { name: "其他", solt: { min: 0.01, max: 0.05 } }],
                columns: [{ name: '1' }]
            })
        ]);
        return datasets;
    }

    function ChartsFactory() {
        this.datasets = new DataSetsBuilder().buildDataSets();
        this.titles = this.buildTitles();
        this.grids = this.buildGrids();
        this.charts = ['#incomeCharts', "#serviceCharts", "#memberCharts", "#vechicleChart", "#employeeChart"];
    }
    ChartsFactory.prototype.buildTitles = function() {
        let subtexts = ["历\n史\n变\n化", "历\n史\n累\n计", '支出分布', '收入分布', '收入来源', '乘车类型', '支付方式', '会员种类', '会员类型', '会员来源', '车辆类型', '员工分类'];
        let titleTexts = ["收入/支出", "乘车人次", "会员新增"];
        let titlePosition = { top: 0, left: '50%' };

        let subtextPositions = [
            { top: 'middle', left: '1.25%' }, { top: 'middle', right: '51.25%' },
            { top: '0%', left: '58.333%' }, { top: '0%', left: '75%' }, { top: '0%', left: '91.333%' },
            { top: '0%', left: '58.333%' }, { top: '0%', left: '75%' }, { top: '0%', left: '91.333%' },
            { top: '0%', left: '62.5%' }, { top: '0%', left: '87.5%' },
            { top: '0%', left: 'center' },
            { top: '0%', left: 'center' }
        ];

        let titles = [];
        titleTexts.forEach(function(text, index) {
            let title = {};
            $.extend(true, title, {
                    text: text,
                    textAlign: 'center',
                    verticalAlign: 'top',
                    textStyle: { color: 'yellow', fontSize: 14, fontWeight: 'bold' }
                },
                titlePosition);
            titles.push(title);
        });
        let subtitles = [];
        subtexts.forEach(function(text, index) {
            let subtext = {};
            $.extend(true, subtext, {
                subtext: text,
                textAlign: 'center',
                verticalAlign: 'top',
                subtextStyle: { color: 'yellow' }
            }, subtextPositions[index]);
            subtitles.push(subtext);
        });
        return [
            [titles[0], subtitles[0], subtitles[1], subtitles[2], subtitles[3], subtitles[4]],
            [titles[1], subtitles[0], subtitles[1], subtitles[5], subtitles[6], subtitles[7]],
            [titles[2], subtitles[0], subtitles[1], subtitles[8], subtitles[9]],
            subtitles[10],
            subtitles[11],
        ];
    };
    ChartsFactory.prototype.buildxAxis = function() {
        return {
            type: 'category',
            axisLabel: { color: 'white' },
            axisLine: { lineStyle: { color: '#1F7EFF' } }
        };
    };
    ChartsFactory.prototype.buildyAxis = function() {
        return [
            { type: 'value', axisLine: { lineStyle: { color: '#1F7EFF' } }, axisLabel: { color: 'white' }, splitLine: { lineStyle: { color: '#012f4a' } } },
            { type: 'value', axisLine: { lineStyle: { color: '#1F7EFF' } }, axisLabel: { color: 'white' }, splitLine: { lineStyle: { color: '#012f4a' } } }
        ];
    }
    ChartsFactory.prototype.buildGrids = function() {
        return {
            left: '2.5%',
            top: '10%',
            right: '52.5%',
            bottom: '5%',
            backgroundColor: '#1F7EFF1F',
            boderWidth: 0,
            containLabel: true,
            show: true
        };
    }

    ChartsFactory.prototype.getBasicOptions = function(withAxis) {
        let basicOption = {
            tooltip: { trigger: 'axis', axisPointer: { type: 'cross', crossStyle: { color: '#999' } } },
            legend: { show: false }
        };
        let xAxis = this.buildxAxis();
        if (withAxis) {
            $.extend(true, basicOption, { xAxis: [this.buildxAxis()], yAxis: this.buildyAxis() });
        }
        return basicOption;
    };

    ChartsFactory.prototype.getBasicSeries = function(type) {
        switch (type) {
            case 'line':
                return {
                    type: 'line',
                    symbol: 'circle',
                    symbolSize: 7,
                    seriesLayoutBy: 'row',
                    smooth: true
                };
            case 'bar':
                return {
                    type: 'bar',
                    barWidth: '30%',
                    seriesLayoutBy: 'row',
                };
            case 'pie':
                return {
                    type: 'pie',
                    roseType: 'radius',
                    label: { fontSize: 12, color: '#FFF', backgroundColor: 'transparent', boderColor: 'transparent', shadowColor: 'transparent' },

                    encode: {
                        itemName: 0,
                        value: 1,
                        tooltip: '{b}({c}%)'
                    }
                };
        }
    }

    ChartsFactory.prototype.buildGridSeries = function(type, option) {
        var series = this.getBasicSeries(type);
        $.extend(true, series, option);
        return series;
    }
    ChartsFactory.prototype.buildPieSeries = function(name, position, datasetIndex, radius) {
        var pie = this.getBasicSeries('pie');
        $.extend(true, pie, {
            name: name,
            datasetIndex: datasetIndex,
            radius: (radius ? radius : ['20%', '50%']),
        }, position);
        return pie;
    }
    ChartsFactory.prototype.buildOptions = function() {
        let piePositions = [
            { left: "50%", top: '10%', width: '16.667%', bottom: '10%' },
            { left: "66.667%", top: '10%', width: '16.667%', bottom: '10%' },
            { left: "83.333%", top: '10%', width: '16.667%', bottom: '10%' },
            { left: "50%", top: '10%', width: '25%', bottom: '10%' },
            { left: "75%", top: '10%', width: '25%', bottom: '10%' }
        ];
        var addtions = [
            //收入/支出历史
            {
                grid: this.buildGrids(),
                series: [
                    this.buildGridSeries('bar', { name: '收入', xAxisIndex: 0, yAxisIndex: 0, datasetIndex: 0 }),
                    this.buildGridSeries('bar', { name: '支出', xAxisIndex: 0, yAxisIndex: 0, datasetIndex: 0 }),
                    this.buildGridSeries('line', { name: '累计支出', xAxisIndex: 0, yAxisIndex: 1, datasetIndex: 0 }),
                    this.buildGridSeries('line', { name: '累计收入', xAxisIndex: 0, yAxisIndex: 1, datasetIndex: 0 }),
                    this.buildPieSeries('支出分布', piePositions[0], 1),
                    this.buildPieSeries('收入分布', piePositions[1], 2),
                    this.buildPieSeries('收入来源', piePositions[2], 3)
                ]
            },
            //服务人数
            {
                grid: this.buildGrids(),
                series: [
                    this.buildGridSeries('bar', { name: '人次', xAxisIndex: 0, yAxisIndex: 0, datesetIndex: 0, itemStyle: { lineStyle: { color: '#0b7ff3' }, fontSize: 11, color: '#0b7ff3' }, }),
                    this.buildGridSeries('line', { name: '累计人次', xAxisIndex: 0, yAxisIndex: 1, datesetIndex: 0, itemStyle: { lineStyle: { color: '#0b7ff3' }, fontSize: 11, color: '#0b7ff3' }, }),
                    this.buildPieSeries("车辆分布", piePositions[0], 1),
                    this.buildPieSeries('支付分布', piePositions[1], 2),
                    this.buildPieSeries('会员分布', piePositions[2], 3)
                ],
            },
            //新增会员
            {
                grid: this.buildGrids(),
                series: [
                    this.buildGridSeries('bar', { name: '新增', xAxisIndex: 0, yAxisIndex: 0, datasetIndex: 0, itemStyle: { lineStyle: { color: 'chartreuse' }, color: '#7FFF00', }, }),
                    this.buildGridSeries('line', { name: '累计', xAxisIndex: 0, yAxisIndex: 1, datasetIndex: 0, itemStyle: { lineStyle: { color: '#42C96E' }, color: '#42C96E' } }),
                    this.buildPieSeries('分类', piePositions[3], 1, '50%'),
                    this.buildPieSeries('来源', piePositions[4], 2, '50%'),
                ]
            },
            //车辆类别
            {
                series: [this.buildPieSeries('车辆类型', { buttom: 0 }, 0, '25%')],
            },
            //员工类别
            {
                series: [
                    this.buildPieSeries('员工分类', { buttom: 0 }, 0, '25%')
                ]
            }
        ];
        var options = [];
        let _this = this;
        addtions.forEach(function(addtion, index) {
            let option = _this.getBasicOptions(index < 3 ? true : false);
            option.title = _this.titles[index];
            option.dataset = _this.datasets[index];
            $.extend(true, option, addtion);
            options.push(option);
        })
        console.log(this.datasets);
        console.log(options);
        return options;
    };

    function CountiesView() {
        this._counties = [
            "安宁公交", "东川公交", "元谋公交", "禄劝公交", "景洪公交", "嵩明公交"
        ];
        this._currentCounty = 0;
        this._currentType = 0;
        this._chartsFacotry = new ChartsFactory();
        this._initailized = false;
        this._charts = [];
    }
    CountiesView.prototype.selectors = function() { return $("#page-2 .county-selector-box").find(".county-selector-wrapper"); };

    CountiesView.prototype.adjustSize = function() {
        var pageVisible = $("#page-2").css("display") != "none";
        if (pageVisible) {
            var others = $("#page-2 .page-col");
            var space = 0;
            others.each(function() {
                space += $(this).width();
            });
            var middle = $("#page-2 #middle-area");
            var width = middle.parent().width() - 400;
            middle.css({ "width": width + "px" });
        }
    };
    CountiesView.prototype.init = function() {
        if (this._initailized) return;
        let menu = this.selectors();
        menu.each(function(index) {
            if (index == 0) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
            $(this).click(function() {
                $(this).addClass("active").siblings().removeClass("active");
            });
        });

        this.adjustSize();
        var _this = this;
        window.addEventListener("resize", function() {
            _this.adjustSize();
        });
        let allCharts = $(this._chartsFacotry.charts.join());
        allCharts.each(function(index) {
            let chart = echarts.init(this, 'shine');
            _this._charts.push(chart);
            window.addEventListener("resize", function() {
                _this._charts[index].resize();
            });
        });
        this._initailized = true;
        console.log("counties initialied.");
    };
    CountiesView.prototype.update = function() {
        if (!this._initailized) {
            this.init();
        }
        let options = this._chartsFacotry.buildOptions();
        this._charts.forEach(function(chart, index) {
            chart.setOption(options[index]);
            chart.resize();
        });
    };

    $.extend({
        CountiesView: new CountiesView()
    });
    console.log("counties was loaded.")

}(window.jQuery));