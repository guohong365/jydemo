var Chart = function(optoins){
    this._element = typeof optoins.element === "string" ? $(optoins.element) : optoins.element;
    this._option = optoins.optoin;
    this._init = optoins.init;
    this._initParam = optoins.initParam;
    this._updateParam = options.updateParam;
    this._chart = echarts.init(this._element[0]);
    if(typeof this._init ==='function'){
        this._init(this._initParameter,this);
    }
    var _this = this;
    window.addEventListener('resize', function(){
        if(_this._chart)
        {
            _this._chart.resize();
        }
    });
}

Chart.prototype = {
    constructor : Chart,
    update : function(param){
        var option = null;
        if(typeof this._option=== "function")
        {            
            if(typeof param != "undefined"){
                option = this._option(param, this);
            } else if(typeof this._updateParam !='undefined'){
                option = this._option(this._updateParam, this);
            } else {
                option=this._option(this);
            }
        } else if( typeof param === "object") {
            option = param;
        } else {
            option = this._option;
        }
        this._chart.setOption(option);
    }
}