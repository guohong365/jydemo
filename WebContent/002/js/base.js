/**
 * 
 */
 function selectPage(index){
            switch(index)
            {
            case 0:
            	overview();
            	break;
            case 1:
            	branchOverview();
            	break;
            case 2:
            	compare();
            	break;
            case 3:
            	prediction();
            } 
 }
 $('.nav-top ul li').each(function(index){
 	$(this).click(function(){
 		$(this).addClass("nav-active").siblings().removeClass("nav-active");
 		$(".page-tabs .inner-page").eq(index).fadeIn().siblings().stop().hide();
 		selectPage(index);
 	});
 });
  
 function overview() {
 }
 function branchOverview(){
 }
 function compare(){
 }
 function prediction(){
 }
 