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

var initialNumber = [0, 21.1, 345.6]
setInterval(() => {
    var random = new RandomGenerator();
    var increament = random.next(0, 10000);
    initialNumber[0] += increament;
    initialNumber[1] += increament / 10000;
    initialNumber[2] += increament / 10000;

    $("#dailyIncome").html(initialNumber[0].toFixed(2) + '元');
    $("#monthlyIncome").html(initialNumber[1].toFixed(2) + '万元');
    $("#yearlyIncome").html(initialNumber[2].toFixed(2) + '万元');
}, 1000);