$(document).ready(function() {
	makeFragments(22);
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
			$('.fragment').show();
			$('#nextPic').click(function() {
				console.log('boom!');
			});
		});
	});
});

function makeFragments(number) {
	for (i=0;i<number;i++) {
		$('body').append('<img src="img/fragments/' + (i+1).toString() + '.png" class="fragment" id="fragment' + i.toString() + '" />');
		console.log('making ' + (i+1).toString());
	}
	$('.fragment').each(function(index, elem) {
		$(elem).attr('data-scatter-target', makeScatterTarget(elem));
	});
	$('.fragment').mouseover(function() {
		var theFragment = $(this);
		console.log('mousedover' + theFragment);
		scatterX = theFragment.attr('data-scatter-target').split(',')[0];
		scatterY = theFragment.attr('data-scatter-target').split(',')[1];
		rotateX = theFragment.attr('data-scatter-target').split(',')[2];
		rotateY = theFragment.attr('data-scatter-target').split(',')[3];
		rotate = theFragment.attr('data-scatter-target').split(',')[4];
		theFragment.css({'-webkit-transform': 'translateX(' + scatterX + '%) translateY(' + scatterY + '%) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) rotate(' + rotate + 'deg)'});
	});
}

function makeScatterTarget(elem) {
	return maybeNegative() + (300 + Math.random() * 200).toString() + ',' + maybeNegative() + (300 + Math.random() * 200).toString() + ',' + maybeNegative() + (Math.random() * 600).toString() + ',' + maybeNegative() + (Math.random() * 600).toString() + ',' + maybeNegative() + (Math.random() * 600).toString();
}

function maybeNegative() {
	if (Math.random() > 0.5) {
		return "-";
	} else {
		return "";
	}
}
