$(document).ready(function() {
	var pageWidth = $(window).width();
	var pageHeight = $(window).height();

	$('#wheelContainer').css('top', pageHeight - 400).css('left', 4);
	$('.wheelLink').each(function(index, elem) {
		$(elem).css({'-webkit-transform':'rotate(' + (index*60).toString() + 'deg) translateY(150px)', '-moz-transform':'rotate(' + (index*60).toString() + 'deg) translateY(150px)', '-o-transform':'rotate(' + (index*60).toString() + 'deg) translateY(150px)', 'transform':'rotate(' + (index*60).toString() + 'deg) translateY(150px)'});
	});
});
