(function($) {
    if (!$) {
        console.error("jquery must be loaded before.");
        return;
    }

    function buildDataSets() {
        var baseline = [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120];
        var months = [
            { name: "一月" }, { name: "二月" }, { name: "三月" }, { name: "四月" }, { name: "五月" }, { name: "六月" },
            { name: "七月" }, { name: "八月" }, { name: "九月" }, { name: "十月" }, { name: "十一月" }, { name: "十二月" }
        ];
        var datasets = new Array(4);
        var generator = $.createGenerator();
        var monthlyGenerationOption = {
            name: '',
            min: 5,
            max: 100,
            baseline: baseline,
            rows: [
                { name: "安宁公交", scale: 1.0, solt: { min: 0, max: 0 } },
                { name: "东川公交", scale: 0.8, solt: { min: -0.12, max: 0.2 } },
                { name: "元谋公交", scale: 0.5, solt: { min: -0.02, max: 0.05 } },
                { name: "禄劝公交", scale: 0.3, solt: { min: -0.03, max: 0.05 } },
                { name: "景洪公交", scale: 0.4, solt: { min: -0.03, max: 0.05 } },
                { name: "嵩明公交", scale: 0.1, solt: { min: -0.01, max: 0.015 } }
            ],
            columns: months
        };
        monthlyGenerationOption.name = '月度收入';
        var item = generator.generate(monthlyGenerationOption);
        datasets[0] = (item);

        var accumulated = {};
        $.extend(true, accumulated, item);
        accumulated.source.forEach(function(row, index) {
            if (index == 0) {
                row[0] = '月度累计收入';
                return;
            }
            var data = generator.accumulate(row, 1);
            data.forEach(function(value, i) {
                row[i + 1] = value;
            });
        });
        datasets[2] = accumulated;

        monthlyGenerationOption.name = '月度支出入';
        monthlyGenerationOption.min = 35;
        monthlyGenerationOption.max = 90;
        item = generator.generate(monthlyGenerationOption);
        datasets[1] = item;

        accumulated = {};
        $.extend(true, accumulated, item);
        accumulated.source.forEach(function(row, index) {
            if (index == 0) {
                row[0] = '月度累计支出';
                return;
            }
            var data = generator.accumulate(row, 1);
            data.forEach(function(value, i) {
                row[i + 1] = value;
            });
        });
        datasets[3] = accumulated;
        return datasets;
    }

    var companies = [
        { name: "安宁公交" },
        { name: "东川公交" },
        { name: "元谋公交" },
        { name: "禄劝公交" },
        { name: "景洪公交" },
        { name: "嵩明公交" }
    ];

    function buildLines(grid, dataset, xAxis, yAxis) {
        var series = [];
        companies.forEach(function() {
            var line = {
                xAxisIndex: xAxis,
                yAxisIndex: yAxis,
                gridIndex: grid,
                datasetIndex: dataset,
                type: 'line',
                smooth: true,
                seriesLayoutBy: 'row',
            };
            series.push(line);
        });
        return series;
    }

    function buildPie(nameIndex, dataset, position) {
        var pie = {
            datasetIndex: dataset,
            type: 'pie',
            radius: '30%',
            label: {
                backgroundColor: 'transparent',
                shadowColor: 'transparent',
                color: '#FFF',
                alignTo: 'labelLine',
                rich: { a: { color: 'yellow' } }, //'#1F7EFF'}},
                formatter: function(param) {
                    return param.name.substr(0, 2) + "\n{a|(" + param.percent.toFixed(1) + '%)}';
                }
            },
            encode: {
                itemName: nameIndex,
                value: 1,
                tooltip: 1
            }
        };
        $.extend(true, pie, position);
        return pie;
    }

    function buildSeries() {
        var series = [];
        lines = buildLines(0, 0, 0, 0);
        series = series.concat(lines);
        lines = buildLines(1, 2, 1, 1);
        series = series.concat(lines);
        lines = buildLines(2, 1, 2, 2);
        series = series.concat(lines);
        lines = buildLines(3, 3, 3, 3);
        series = series.concat(lines);
        var pie = buildPie(0, 0, { left: '70%', top: '0%', right: '12.5%', bottom: '50%' });
        series.push(pie);
        pie = buildPie(0, 1, { left: '82.5%', top: '0%', right: '0%', bottom: '50%' });
        series.push(pie);
        pie = buildPie(0, 2, { left: '70%', top: '50%', right: '12.5%', bottom: '10%' });
        series.push(pie);
        pie = buildPie(0, 3, { left: '82.5%', top: '50%', right: '0%', bottom: '10%' });
        series.push(pie);
        return series;
    }

    function buildxAxises() {
        var axises = [];
        for (let i = 0; i < 4; i++) {
            axises.push({
                type: "category",
                gridIndex: i,
                show: true,
                axisLine: { lineStyle: { color: '#1F7EFF', width: 1 } },
                axisLabel: { color: 'white' }
            });
        }
        return axises;
    }

    function buildyAxises() {
        var axises = [];
        for (let i = 0; i < 4; i++) {
            axises.push({
                type: "value",
                gridIndex: i,
                show: true,
                axisLine: { show: true, lineStyle: { color: '#1F7EFF', width: 1 } },
                axisLabel: { color: 'white' },
                splitLine: { lineStyle: { color: '#cccccc3f' } }
            });
        }
        return axises;
    }

    function buildTitles() {
        var titles = [];
        let subtexts = ["收入", "累计收入", "支出", "累计支出"];

        var positions = [
            { left: '16.5%', top: '5%' },
            { left: '53.5%', top: '5%' },
            { left: '15.5%', top: '55%' },
            { left: '53.5%', top: '55%' },
        ];

        subtexts.forEach(function(subtext, index) {
            let title = {};
            $.extend(true, title, {
                subtext: subtext,
                textAlign: 'center',
                textVerticalAlign: 'middle',
                subtextStyle: { color: 'orange', fontWeight: 'bold', fontSize: 14 }
            }, positions[index]);
            titles.push(title);
        });
        return titles;
    }

    function buildGrids() {
        var boundaries = [
            { left: '0%', top: '5%', right: '67%', bottom: '51%' },
            { left: '37%', top: '5%', right: '30%', bottom: '51%' },
            { left: '0%', top: '55%', right: '67%', bottom: '5%' },
            { left: '37%', top: '55%', right: '30%', bottom: '5%' },
        ];
        var grids = [];
        boundaries.forEach(function(boundary) {
            grids.push({
                containLabel: true,
                left: boundary.left,
                top: boundary.top,
                right: boundary.right,
                bottom: boundary.bottom,
                backgroundColor: '#1F7EFF3F',
                show: true,
                borderWidth: 0
            });
        });
        return grids;
    }

    var compareOptions = {
        title: buildTitles(),
        legend: {
            show: true,
            textStyle: { color: 'yellow' }
        },
        tooltip: {
            trigger: 'axis',
            textStyle: {
                color: '#fff'
            }
        },
        dataset: buildDataSets(),
        xAxis: buildxAxises(),
        yAxis: buildyAxises(),
        grid: buildGrids(),
        series: buildSeries(),
    };

    var CompareView = function(options) {
        this._chart = null;
        this._initialized = false;
        this._options = options;
        this.init = function() {
            if (this._initialized) return;

            this._chart = echarts.init($("#CompareChart")[0], 'shine');
            window.addEventListener("resize", function() {
                $.CompareView._chart.resize();
            });
            this._chart.on('updateAxisPointer', function(event) {
                var xAxisInfo = event.axesInfo[0];
                if (xAxisInfo) {
                    var dimension = xAxisInfo.value + 1;
                    var pie = (event.seriesIndex) / 6 + 24;
                    if (pie >= 24 && pie < 28) {
                        $.CompareView._options.series[pie].encode = {
                            value: dimension,
                            tooltip: dimension
                        };
                        $.CompareView._chart.setOption($.CompareView._options);
                    };
                }
            });
            this._initialized = true;
        };
        this.update = function() {
            if (!this._initialized) {
                this.init(compareOptions);
            }
            this._chart.setOption(this._options);
        };
    };

    $.extend({
        CompareView: new CompareView(compareOptions)
    });


}(window.jQuery));