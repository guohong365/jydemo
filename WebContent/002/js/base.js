/**
 * 
 */

function selectPage(index) {
    switch (index) {
        case 0:
            $.Overview.init();
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
$('.nav-top ul li').each(function(index) {
    $(this).click(function() {
        $(this).addClass("nav-active").siblings().removeClass("nav-active");
        $(".page-tabs .inner-page").eq(index).fadeIn().siblings().stop().hide();
        selectPage(index);
    });
});