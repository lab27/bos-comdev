var fonts = [
	'Barrio',
	'Bahiana',
	'Fjalla One',
	'Arvo',
	'Anton',
	'Abril Fatface']

var fontCounter = 0;

$('h1, .section h2').css('font-family',fonts[fontCounter]).on('click',function(){
	if(fontCounter == fonts.length){
		fontCounter = 0;
	} else {

	fontCounter ++
	}
	$('h1, .section h2').css('font-family',fonts[fontCounter])
});



//toggle help
$('#mobile-menu-toggler, #main-menu-toggler').on('click',function(){
	console.log("toggle that menu!")
	TweenMax.to($('#helpbar'),.2,{autoAlpha:1})
});


$('#close-help').on('click',function(){
	TweenMax.to($('#helpbar'),.2,{autoAlpha:0})
});