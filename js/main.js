$(document).ready(function() {
	//makeFragments(22);
	var pageWidth = $(window).width();
	var pageHeight = $(window).height();

	var picWidth = Math.min(pageWidth*0.8, pageHeight);	
	var indent = (pageWidth - picWidth) / 2.0;
	$('#introPic, #nextPic').css('width', picWidth).css('height', picWidth).css('left', indent);

	var loadingIndent = (pageWidth - 220) / 2.0;
	var loadingIndentTop = (pageHeight - 19) / 2.0;
	$('#loadingIcon').css('left', loadingIndent).css('top', loadingIndentTop);

	$('#introPic').load(function() {
		$('#loadingIcon').hide();
		$('#introPic').fadeIn(1000);
	});
	$('#nextPic').load(function() {
		$('#introPic').click(function() {
			$('body').animate({backgroundColor: '#000000'}, 500);
			$('#nextPic').fadeIn(500, function() {
				$('#introPic').hide();
				/*setTimeout(function() {
					$('.fragment').show();
					$('#nextPic').hide();
				}, 200);*/
			});
		});
	});
});

function makeFragments(number) {
	console.log('making fragments');
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
		});
		var left = fragmentPositions[index]['x'];
		var top = fragmentPositions[index]['y'];
		var rotate = fragmentPositions[index]['rot'];
		theFragment.css({'left':left.toString() + '%', 'top':top.toString() + '%', '-webkit-transform':'rotate(' + rotate.toString() + 'deg)', '-moz-transform':'rotate(' + rotate.toString() + 'deg)', '-o-transform':'rotate(' + rotate.toString() + 'deg)', 'transform':'rotate(' + rotate.toString() + 'deg)'});
	});
}

function makeFragmentWrapperDiv(longSide, shortSide, angle) {
	//generates the html for a div with long and short sides as described, rotated by `angle` degrees
	var output = '<div class="fragmentWrapper" style="position:absolute;width:' + longSide.toString + 'px;height:' + shortSide.toString() + 'px;-webkit-transform:rotate(' + angle.toString() + 'deg);-moz-transform:rotate(' + angle.toString() + 'deg);-o-transform:rotate(' + angle.toString() + 'deg);transform:rotate(' + angle.toString() + 'deg);" />';
	return output;
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
	{x:50, y:50, rot:10},
	{x:35, y:26, rot:30},
	{x:22, y:74, rot:200},
	{x:14, y:10, rot:19},
	{x:35, y:10, rot:64},
	{x:39, y:26, rot:72},
	{x:18, y:13, rot:18},
	{x:26, y:82, rot:129},
	{x:16, y:13, rot:29},
	{x:19, y:44, rot:20},
	{x:62, y:49, rot:95},
	{x:73, y:32, rot:73},
	{x:14, y:5, rot:26},
	{x:16, y:86, rot:19},
	{x:64, y:32, rot:93},
	{x:32, y:12, rot:184},
	{x:25, y:25, rot:153},
	{x:85, y:76, rot:104},
	{x:50, y:32, rot:286},
	{x:4, y:5, rot:285},
	{x:8, y:72, rot:300},
	{x:63, y:3, rot:19}
];

