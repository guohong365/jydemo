/**
 * 
 */
 function setupHistoryChart(){
  		var historyChart = echarts.init(document.querySelector("#historyChart .chart"));
  		var data=[
  			[ 24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120  ],
  			[40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
  			[123, 175, 112, 197, 121, 67, 98, 21, 43, 64, 76, 38,123,175,112, 197, 121, 67, 98, 21, 43, 64, 76, 38, 10]
  		];
  		var labels=[
  			["2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021"],
  			["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],  		
  			["00", "01","02","03","04","05","06","07","08", "09","10","11","12","13","14","15","16","17","18","19","20","21","22","23", "24"]
  		];
  		
 		var option = {
 			color : '#00f2f1',
 			tooltip : {	trigger : 'axis'	}, 			
 			grid : {	top : '5%',	left : '5%',	right:'5%',	bottom:'5%',	show : true, 	boderColor : '#012f4a', 	containLabel : true	},
 			xAxis: {	type : 'category',	 data : labels[2], axisTick:{ show:false}, axisLabel: { color : '#4c9bfd'}, 	axisLine : {show : false},	boundaryGap : false},
 			yAxis: {	type : 'value',	axisTick : { show : false},	axisLine: {show : false},	axisLabel:{ color : '#4c9bfd'},	splitLine: {lineStyle : { color : '#012f4a'}}},
 			series: [{data : data[2], smooth:true,	type : 'line'}]
 		};
 		console.log(option);
 		historyChart.setOption(option);
 		window.addEventListener('resize', 
 		function(){ 			
 			historyChart.resize();
 		});
 		$("#historyChart .chart-selector").on('click', "div", function(){
 		  historyChart=echarts.init($("#historyChart .chart")[0]);
 		   $(this).addClass("active").siblings().removeClass("active");
 		   var index = $(this).index();
 			option.series[0]= data[index];
 			option.xAxis.data=labels[index];
 			historyChart.setOption(option);
 		});
 	}
 	setupHistoryChart();
 	
 function setupIncomePie(){
 		var incomePie=echarts.init(document.querySelector("#incomePie"));
 		var data =[
 			[
 				{name:"五华", value: 80},
 				{name:"盘龙", value: 90},
 				{name:"官渡", value: 110},
 				{name:"呈贡", value: 50},
 				{name:"西山", value: 65},
 				{name:"安宁", value: 30},
 				{name:"宜良", value: 20},
 				{name:"石林", value: 40},
 				{name:"晋宁", value: 10},
 				{name:"嵩明", value: 20},
 				{name:"富民", value: 20},
 				{name:"寻甸", value: 10},
 				{name:"东川", value: 30}	
 			],
 		 	[
 				{name:"五华", value: 80},
 				{name:"盘龙", value: 90},
 				{name:"官渡", value: 110},
 				{name:"呈贡", value: 50},
 				{name:"西山", value: 65},
 				{name:"安宁", value: 30},
 				{name:"宜良", value: 20},
 				{name:"石林", value: 40},
 				{name:"晋宁", value: 10},
 				{name:"嵩明", value: 20},
 				{name:"富民", value: 20},
 				{name:"寻甸", value: 10},
 				{name:"东川", value: 30}	
 			],
 			[
 				{name:"五华", value: 80},
 				{name:"盘龙", value: 90},
 				{name:"官渡", value: 110},
 				{name:"呈贡", value: 50},
 				{name:"西山", value: 65},
 				{name:"安宁", value: 30},
 				{name:"宜良", value: 20},
 				{name:"石林", value: 40},
 				{name:"晋宁", value: 10},
 				{name:"嵩明", value: 20},
 				{name:"富民", value: 20},
 				{name:"寻甸", value: 10},
 				{name:"东川", value: 30}	
 			]
 		];
 		var option = {
        	tooltip: {  trigger: 'item',   formatter: '{b}<br/> {c} ({d}%)'   },        
        	series:{                
                type: 'pie',
                radius: ["10", "70"],
                center: ['50%', '40%'],
                roseType: 'radius',
                
                labelLine: {
                    // 链接图形的线条
                    length: 6,
                    // 链接文字的线条
                    lehgth2: 8
                },
                data: data[0],
            }
    };
 		
 		
 		incomePie.setOption(option);
 		window.addEventListener('resize',function(){
 			incomePie.resize();
 		});
 		$("#incomeSelector").on('click', "div", function(){ 		   
 		   $(this).addClass("active").siblings().removeClass("active");
 		   var index = $(this).index();
 			option.series[0]= data[index];
 			incomePie.setOption(option);
 		});
  }  
  setupIncomePie();
  
  function setupTable(){
  	var chart = echarts.init(document.querySelector("#timesPie"));
  	 		var data =[
 			[
 				{name:"五华", value: 80},
 				{name:"盘龙", value: 90},
 				{name:"官渡", value: 110},
 				{name:"呈贡", value: 50},
 				{name:"西山", value: 65},
 				{name:"安宁", value: 30},
 				{name:"宜良", value: 20},
 				{name:"石林", value: 40},
 				{name:"晋宁", value: 10},
 				{name:"嵩明", value: 20},
 				{name:"富民", value: 20},
 				{name:"寻甸", value: 10},
 				{name:"东川", value: 30}	
 			],
 		 	[
 				{name:"五华", value: 80},
 				{name:"盘龙", value: 90},
 				{name:"官渡", value: 110},
 				{name:"呈贡", value: 50},
 				{name:"西山", value: 65},
 				{name:"安宁", value: 30},
 				{name:"宜良", value: 20},
 				{name:"石林", value: 40},
 				{name:"晋宁", value: 10},
 				{name:"嵩明", value: 20},
 				{name:"富民", value: 20},
 				{name:"寻甸", value: 10},
 				{name:"东川", value: 30}	
 			],
 			[
 				{name:"五华", value: 80},
 				{name:"盘龙", value: 90},
 				{name:"官渡", value: 110},
 				{name:"呈贡", value: 50},
 				{name:"西山", value: 65},
 				{name:"安宁", value: 30},
 				{name:"宜良", value: 20},
 				{name:"石林", value: 40},
 				{name:"晋宁", value: 10},
 				{name:"嵩明", value: 20},
 				{name:"富民", value: 20},
 				{name:"寻甸", value: 10},
 				{name:"东川", value: 30}	
 			]
 		];
 		var option = {
        	tooltip: {  trigger: 'item',   formatter: '{b}<br/> {c} ({d}%)'   },        
        	series:{                
                type: 'pie',
                radius: ["10", "70"],
                center: ['50%', '40%'],
                roseType: 'radius',
                data: data[0],
            }
    	};
    	chart.setOption(option);
 		window.addEventListener('resize',function(){
 			incomePie.resize();
 		});
  }
  setupTimesPie();
  
  function setupMap(){
  		var mainMap = echarts.init(document.querySelector("#mainMap"));
  		var data =  [
 					{name:"五华", value: 80},
 					{name:"盘龙", value: 90},
 					{name:"官渡", value: 110},
 					{name:"呈贡", value: 50},
 					{name:"西山", value: 65},
 					{name:"安宁", value: 30},
 					{name:"宜良", value: 20},
 					{name:"石林", value: 40},
 					{name:"晋宁", value: 10},
 					{name:"嵩明", value: 20},
 					{name:"富民", value: 20},
 					{name:"寻甸", value: 10},
 					{name:"东川", value: 30}	,
 					{name:"禄劝", value: 5}
 				];
		var option=	
		{
			tooltip :{
				trigger : 'item',
				formatter : '{b}<br/>{c}'
			},			
			visualMap: {			
				type : 'continuous',			     
			     show:false,
			     min : 0,
			     max : 120,
			     inRange: {color: ['lightskyblue', 'yellow', 'orangered']},
			},
			series : [{
				type : 'map',
				map : '昆明', 
				roam:true,
				data : data,
				itemStyle: {
					normal: {
						borderColor: '#0692a4',
						borderWidth: 1
					},	
					emphasis: { 
						borderColor: '#0b1c2d', 
						borderWidth : 2
					}
				},
				label : {
					normal : {show : true, color : '#000'}
				},
				nameMap :{
				"五华区":"五华",
 				"盘龙区": "盘龙",
 				"官渡区":"官渡",
 				"呈贡区":"呈贡",
 				"西山区":"西山",
 				"安宁市":"安宁",
 				"宜良县":"宜良",
 				"石林彝族自治县":"石林",
 				"晋宁区":"晋宁",
 				"嵩明县":"嵩明",
 				"富民县":"富民", 
 				"寻甸回族彝族自治县":"寻甸",
 				"东川区":"东川",
 				"禄劝彝族苗族自治县":"禄劝"	
				},
 			}]
        };
        console.log(option);
        mainMap.setOption(option);
		window.addEventListener('resize', function(){
			mainMap.resize();
		});		
  }
  
  setupMap();
    