(function ($) {
    var contiesOptions = {
        charts: [],
        selectors: function () { return $("#page-2 .county-selector-box").find(".county-selector-wrapper"); },
        counties: []
    };
    var adjustSize=function(){
        var pageVisible = $("#page-2").css("display")!="none";
        if (pageVisible) {
            var middle=$("#page-2 #middle-area");
            var width = middle.parent().width() - 400;
            middle.css({"width": width + "px"});
        }
    }
    var Counties = function (options) {
        this._currentCounty = 0;
        this._currentType = 0;
        this._selectors = options.selectors;
        this._initailized = false;

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
            window.addEventListener("resize", function(){
                adjustSize();
            });
            
            this._initailized = true;
            console.log("counties initialied.");
        };
        this.update = function (dateType) {
        };
    };

    $.extend({
        Counties: new Counties(contiesOptions)
    });
    console.log("counties was loaded.")

}(window.jQuery));