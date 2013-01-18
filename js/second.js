$(document).ready(function() {
	var pageWidth = $(window).width();
	var pageHeight = $(window).height();

	$('#indexWheelContainer').css('top', pageHeight - 400).css('left', 4);
	$('.indexWheelLink').each(function(index, elem) {
		var theWidth = $(elem).width();
		var theWidth2 = $(elem).children('img').width();
		console.log(theWidth);
		console.log(theWidth2);
		$(elem).css({'-webkit-transform':'rotate(' + (index*60).toString() + 'deg) translateY(-150px)', '-moz-transform':'rotate(' + (index*60).toString() + 'deg) translateY(-150px)', '-o-transform':'rotate(' + (index*60).toString() + 'deg) translateY(-150px)', 'transform':'rotate(' + (index*60).toString() + 'deg) translateY(-150px)', 'left':(200-(theWidth/2.0)).toString() + 'px'});
	});
});
