$(document).ready(function() {
	var pageWidth = $(window).width();
	var pageHeight = $(window).height();
	var picWidth = Math.min(pageWidth*0.8, pageHeight*0.8);	
	var indent = (pageWidth - picWidth) / 2.0;
	$('#introPic, #nextPic').css('width', picWidth).css('height', picWidth).css('left', indent);
	console.log('update');
	$('#introPic').click(function() {
		console.log('fading in');
		$('#nextPic').fadeIn(2000, function() {
			$('#introPic').hide();
			$('#nextPic').click(function() {
				console.log('boom!');
			});
		});
	});
});
