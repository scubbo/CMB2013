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
		$('body').animate({backgroundColor: '#000000'}, 300);
		$('#nextPic').fadeIn(300, function() {
			$('#introPic').hide();
			console.log('1');
			setTimeout(function() {
				$('.fragment').show();
				$('#nextPic').hide();
			}, 200);
		});
	});
});

function makeFragments(number) {
	for (i=0;i<number;i++) {
		$('body').append('<img src="img/fragments/' + (i+1).toString() + '.png" class="fragment" id="fragment' + i.toString() + '" />');
	}
	$('.fragment').each(function(index, elem) {
		$(elem).attr('data-scatter-target', makeScatterTarget(elem));
	});
	$('.fragment').each(function(index, elem) {
		var theFragment = $(elem);
		theFragment.mouseover(function() {
			scatterX = theFragment.attr('data-scatter-target').split(',')[0];
			scatterY = theFragment.attr('data-scatter-target').split(',')[1];
			rotateX = theFragment.attr('data-scatter-target').split(',')[2];
			rotateY = theFragment.attr('data-scatter-target').split(',')[3];
			rotate = theFragment.attr('data-scatter-target').split(',')[4];
			theFragment.css({'-webkit-transform': 'translateX(' + scatterX + '%) translateY(' + scatterY + '%) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) rotate(' + rotate + 'deg)', 'opacity':0});
			theFragment.css({'-moz-transform': 'translateX(' + scatterX + '%) translateY(' + scatterY + '%) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) rotate(' + rotate + 'deg)', 'opacity':0});
			theFragment.css({'-o-transform': 'translateX(' + scatterX + '%) translateY(' + scatterY + '%) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) rotate(' + rotate + 'deg)', 'opacity':0});
			theFragment.css({'transform': 'translateX(' + scatterX + '%) translateY(' + scatterY + '%) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) rotate(' + rotate + 'deg)', 'opacity':0});
			theFragment.hide();
		});
		var left = fragmentPositions[index]['x'];
		var top = fragmentPositions[index]['y'];
		theFragment.css({left:left.toString() + '%', top:top.toString() + '%'});
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

var fragmentPositions = [
	{x:50, y:50},
	{x:35, y:26},
	{x:22, y:74},
	{x:14, y:10},
	{x:35, y:10},
	{x:39, y:26},
	{x:18, y:13},
	{x:26, y:82},
	{x:16, y:13},
	{x:19, y:44},
	{x:62, y:49},
	{x:73, y:32},
	{x:14, y:5},
	{x:16, y:86},
	{x:64, y:32},
	{x:32, y:12},
	{x:25, y:25},
	{x:85, y:76},
	{x:50, y:32},
	{x:4, y:5},
	{x:8, y:72},
	{x:63, y:3}
];
