/**
 * 
 */

function selectPage(index) {
    switch (index) {
        case 0:
            $.Overview.update();
            break;
        case 1:
            $.CountiesView.update()
            break;
        case 2:

            break;
        case 3:
            $.CompareView.update();
            break;
    }
}
$('.nav-top ul li').each(function (index) {
    $(this).click(function () {
        $(this).addClass("nav-active").siblings().removeClass("nav-active");
        $(".page-tabs .inner-page").eq(index).fadeIn().siblings().stop().hide();
        selectPage(index);
    });
});

var initialNumber = [0, 21.1, 345.6];
var initServiceNumber = [0, 35.7, 682.5];
setInterval(() => {
    var random = new RandomGenerator();
    var increment = random.next(0, 10000);
    initialNumber[0] += increment;
    initialNumber[1] += increment / 10000;
    initialNumber[2] += increment / 10000;

    $("#dailyIncome").html(initialNumber[0].toFixed(2) + '元');
    $("#monthlyIncome").html(initialNumber[1].toFixed(2) + '万元');
    $("#yearlyIncome").html(initialNumber[2].toFixed(2) + '万元');

    var timesIncrement = random.next(0, 1000);
    initServiceNumber[0] += timesIncrement;
    initServiceNumber[1] += timesIncrement / 10000;
    initServiceNumber[2] += timesIncrement / 10000;
    $("#dailyServiceTimes").html(initServiceNumber[0].toFixed(2) + '人');
    $('#monthlyServiceTimes').html(initServiceNumber[1].toFixed(2) + '万人');
    $('#yearlyServiceTimes').html(initServiceNumber[2].toFixed(2) + '万人');
}, 1000);

// 判断各种浏览器，找到正确的方法
(function ($) {
    function launchFullscreen() {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }
    };
    function exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }

    $("#fullSwitch").on('click', function () {
        if ($(this).hasClass('full')) {
            exitFullscreen();
        }
        else {
            launchFullscreen();
        }
        $(this).toggleClass('full');
    });

}(window.jQuery));
