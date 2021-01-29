(function ($) {
    $('.nav-bar ul li').each(function (index) {
        $(this).click(function () {
            $(this).addClass("active").siblings().removeClass("active");
            $(".page-tabs>div").eq(index).fadeIn().siblings().stop().hide();
        });
    });
    $('.company-selector-wrapper').each(function (index) {
        $(this).click(function () {
            $(this).addClass("active").siblings().removeClass("active");
        });
    });
}(window.jQuery));