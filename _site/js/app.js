


//toggle help
$('#mobile-menu-toggler, #main-menu-toggler').on('click',function(){
	console.log("toggle that menu!")
	TweenMax.to($('#helpbar'),.2,{autoAlpha:1})
});


$('#close-help').on('click',function(){
	TweenMax.to($('#helpbar'),.2,{autoAlpha:0})
});