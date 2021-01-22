(function ($) {
    var companies =[
        { name :"安宁公交",  scale : 1.0,  solt : [0,0], },
        { name :"东川公交", scale : 0.8, solt : [0.12,0.35]},
        { name :"元谋公交", scale : 0.5, solt : [0.12,0.35]},
        { name :"禄劝公交", scale : 0.3, solt : [0.12,0.35]},
        { name :"景洪公交", scale : 0.4, solt : [0.12,0.35]},
        { name :"嵩明公交", scale : 0.1, solt : [0.12,0.35]}
    ];    
    var baseline =[24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120];
    var dataSetNames=["收入","支出","累计收入", "累计支出"];    
    var months=["", "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
    function random(min, max){
        return Math.random() * (max - min) + min;
    }
    function generateData(company, baseline){
        var data=[];
        data.push(company.name);
        for (let i = 0; i < 12; i++) {
            var value =parseFloat((baseline[i] *(1 + random(company.solt[0], company.solt[1])) * company.scale).toFixed(2));
            data.push(value);
        }        

        return data;
    }
    function accumulateData(start, source) {
        var data = source.concat();   
        var sum = 0;
        for (let i = start; i < data.length; i++) {
            sum += data[i];
            data[i] = sum;
        }
        return data;
    }

    function buildDataSet() {
        var dataSets=new Array(dataSetNames.length);        
        for (let count = 0; count < dataSetNames.length; count++) {
            var dimention = months.concat();
            dimention[0] = dataSetNames[count];
            var source =[];
            source.push(dimention);
            companies.forEach(function (company, companyIndex) {
                var data = null;
                if(count < 2){
                    data = generateData(company, baseline);
                } else {
                    data = accumulateData(1, dataSets[count - 2].source[companyIndex + 1]);
                }               
                source.push(data);
            });
            dataSets[count]={source : source};
        }
        return dataSets;       
    }
    function buildLines(grid, dataset, xAxis, yAxis){
        var series=[];
        companies.forEach(function () {
            var line = {
                xAxisIndex : xAxis,
                yAxisIndex : yAxis,
                gridIndex: grid,
                datasetIndex: dataset,
                type: 'line',
                smooth: true,
                seriesLayoutBy: 'row'
            };
            series.push(line);
        });
        return series;
    }
    function buildPie(name, dataset, position){        
        var pie = {
            datasetIndex: dataset,
            type: 'pie',
            radius: '30%',
            left : position.left,
            top : position.top,
            right : position.right,
            bottom : position.bottom,            
            label: {
                backgroundColor : 'transparent',
                shadowColor : 'transparent',
                color : '#FFF',
                rich : { a : {color :'yellow'}}, //'#1F7EFF'}},
                formatter: function(param){
                    return param.name.substr(0,2) +"{a|(" + param.percent.toFixed(1) + '%)}';}
            },
            encode: {
                itemName: name,
                value: '一月',
                tooltip: '一月'
            }                
        };
        return pie;
    }

    function buildSeries(){
        var series = [];
        var line = null;
        lines=buildLines(0, 0, 0, 0);
        series=series.concat(lines);
        lines=buildLines(1, 2, 1, 1);
        series=series.concat(lines);
        lines=buildLines(2, 1, 2, 2);
        series=series.concat(lines);
        lines=buildLines(3, 3, 3, 3);
        series=series.concat(lines);
        var pie=buildPie(0, 0, {left : '70%', top : '0%', right : '12.5%', bottom : '50%'});
        series.push(pie);
        pie=buildPie(0, 1, {left : '82.5%', top : '0%', right : '0%', bottom : '50%'});
        series.push(pie);
        pie=buildPie(0, 2, {left : '70%', top : '50%', right : '12.5%', bottom : '10%'});
        series.push(pie);
        pie=buildPie(0, 3, {left : '82.5%', top : '50%', right : '0%', bottom : '10%'});        
        series.push(pie);
        console.log(series);
        return series;
    }
    function buildxAxises(){
        var axises = [];
        for(let i = 0; i< 4; i++){
            axises.push({
                type: "category",
                gridIndex : i, 
                show : true, 
                axisLine :{ lineStyle:{color : '#1F7EFF', width : 1} }, 
                axisLabel :{ color: 'white'}
            });
        }
        return axises;
    }
    function buildyAxises(){
        var axises = [];
        for(let i = 0; i< 4; i++){
            axises.push({
                type: "value",
                gridIndex : i, 
                show : true, 
                axisLine :{show: true, lineStyle:{color : '#1F7EFF', width : 1} }, 
                axisLabel :{ color: 'white'},
                splitLine :{ lineStyle :{ color : '#cccccc3f'}}
            });
        }
        return axises;
    }
    function buildTitles(){
        var titles =[
            { subtext : "收入" }, {subtext : "累计收入" }, {subtext : "支出" }, {subtext : "累计支出" } ];
        for(let i=0; i< 4; i++){
            titles.push({
                subtextStyle : { color : 'green'}
            });
        }
        return titles;
    }
    function buildGrids(){
        var boundaries =[
            {left : '0%', top : '5%', right : '67%', bottom : '57%' },
            { left : '37%', top : '5%', right : '30%', bottom : '57%' },
            { left : '0%', top : '49%', right : '67%', bottom : '12%' },
            { left : '37%', top : '49%', right : '30%', bottom : '12%' },
        ];
        var grids =[];
        boundaries.forEach(function(boundary){
            grids.push({
                containLabel :true,
                left : boundary.left,
                top : boundary.top,
                right : boundary.right,
                bottom : boundary.bottom,
                backgroundColor : '#1F7EFF3F',
                show : true,
                borderWidth : 0
            });
        });
        return grids;
    }

    var chart = echarts.init($("#CompareChart")[0]);
    option = {
        legend: {
            show: true,
            textStyle : { color : 'yellow'}
        },
        tooltip: {
            trigger: 'axis',
        },
        dataset: buildDataSet(),
        xAxis: buildxAxises(),
        yAxis: buildyAxises(),
        grid: buildGrids(),
        series: buildSeries(),
    };

    chart.on('updateAxisPointer', function (event) {
        console.log(event);
        var xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
            var dimension = xAxisInfo.value + 1;
            var pie = (event.seriesIndex)/6 + 24;
            console.log(pie);
            if(pie >= 24 && pie < 28 ){
                option.series[pie].encode= {
                    value: dimension,
                    tooltip: dimension
                };
                chart.setOption(option);
            };
        }
    });


    chart.setOption(option);
    /*
    var SerierBar = {
            name: '',
            barWidth: 10,
            type: 'bar',
            yAxisIndex: 0, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
            data: []
    };
    var serierLine={
        name: '',
        type: 'line',
        symbol: 'circle',
        symbolSize: 5, //折线点的大小
        yAxisIndex: 1,
        data: []
    };

    var counties =[
        "五华区", "盘龙区", "官渡区", "呈贡区", "西山区", "安宁市", "宜良县", "石林彝族自治县",
        "晋宁区", "嵩明县", "富民县", "寻甸回族彝族自治县", "东川区", "禄劝彝族苗族自治县"
    ];    
    var compareOptions = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            },
            showContent : false
        },
        legend: {
            data: counties,
            textStyle: {
                color: '#ffffff',
                fontSize: 11
            },
            bottom: 'bottom',
            left: 'center',
        },
        dataset : {source : []},
        series: [],
        xAxis: [
            {
                type: 'category',
                axisLine: {
                    lineStyle: {
                        color: '#1F7EFF',
                        width: 1
                    }
                },
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel: {
                    interval: 0,//横轴信息全部显示
                    textStyle: {
                        color: '#fff'
                    },
                    fontSize: 11,
                    // rotate:45,//度角倾斜显示
                    formatter: function (value) {
                        return value.length > 5 ? value.substring(0, 5) + '...' : value;
                    }
                }
            }
        ],
        yAxis: [//这里配置两条Y轴
            {
                type: 'value',
                splitLine: {
                    show: true,
                    lineStyle: { color: '#021439', width: 1 }
                },
                axisLine: {
                    show: true,
                    lineStyle: { color: '#1F7EFF', width: 1 }
                },
                axisLabel: {
                    show: true,
                    textStyle: { color: '#fff' },
                    fontSize: 11,
                    interval: 'auto',
                    formatter: '{value}'
                },
                name: '单位（万）',
                nameTextStyle: { color: '#fff', fontWeight: 'bold' }
            },
            {
                type: 'value',
                splitLine: {
                    show: true,
                    lineStyle: { color: '#021439', width: 1 }
                },
                axisLine: {
                    show: true,
                    lineStyle: { color: '#1F7EFF', width: 1 }
                },
                axisLabel: {
                    show: true,
                    textStyle: { color: '#fff' },
                    fontSize: 11,
                    interval: 'auto',
                    formatter: '{value}'
                },
                name: '单位（万）',
                nameTextStyle: {
                    color: '#fff',
                    fontSize: 11,
                    fontWeight: 'bold'
                }
            }
        ],        
    };
    function buildOption(){
        var options = [];
        counties.forEach(function(item, index){
            var bar=Object.create(SerierBar);
            bar.name = item;
            for(let i = 0; i< 12; i++){
                bar.data.push();
            } 
        });
    }

    var CompareView = function(options){
        this._chart = null;
        this.init=function(){
            this._chart = echarts.init($("#CompareChart")[0]);
        }
    };

    $.extend({
        CompareView : new CompareView(compareOptions)
    });
*/
}(window.jQuery));