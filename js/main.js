$(document).ready(function() {
	var pageWidth = $(window).width();
	var pageHeight = $(window).height();
	var picWidth = Math.min(pageWidth*0.8, pageHeight);	
	var indent = (pageWidth - picWidth) / 2.0;
	$('#introPic, #nextPic').css('width', picWidth).css('height', picWidth).css('left', indent);
	console.log('update');
	$('#introPic').click(function() {
		console.log('fading in');
		$('body').animate({backgroundColor: '#000000'}, 100);
		$('#nextPic').fadeIn(100, function() {
			$('#introPic').hide();
			makeFragments(22);
			$('#nextPic').click(function() {
				console.log('boom!');
			});
		});
	});
});

function makeFragments(number) {
	console.log('making fragments');
	for (i=0;i<number;i++) {
		$('body').append('<img src="img/fragments/' + (number+1).toString() + '.png" class="fragment" id="fragment' + number.toString() + '" />');
		console.log('making ' + (number+1).toString());
	}
	console.log('made fragments');
}
