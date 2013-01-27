$(document).ready(function() {
	//makeFragments(1304);
	var pageWidth = $(window).width();
	var pageHeight = $(window).height();

	var picWidth = Math.min(pageWidth*0.8, pageHeight);	
	var indent = (pageWidth - picWidth) / 2.0;
	//$('#introPic, #nextPicContainer').css('width', picWidth).css('height', picWidth).css('left', indent);
	$('#introPic, #nextPicContainer').css('width', picWidth).css('left', indent);

	var loadingIndent = (pageWidth - 220) / 2.0;
	var loadingIndentTop = (pageHeight - 19) / 2.0;
	$('#loadingIcon').css('left', loadingIndent).css('top', loadingIndentTop);

	$('#introPic').load(function() {
		$('#loadingIcon').hide();
		$('#introPic').fadeIn(1000);
	});
	$('#nextPic').load(function() {
		$('#introPic').click(function() {
			firstTransition();
		});
	});

	positionTitles();
	makeLinks();
	makeBCFragments(2);

});

function positionTitles() {
	scatter = makeScatterTarget();
	scatterX = scatter.split(',')[0];
	scatterY = scatter.split(',')[1];
	rotateX = scatter.split(',')[2];
	rotateY = scatter.split(',')[3];
	rotate = scatter.split(',')[4];
	$('#mainTitle').css({'-webkit-transform': 'translateX(' + scatterX + '%) translateY(' + scatterY + '%) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) rotate(' + rotate + 'deg)', 'opacity':0});
	$('#mainTitle').css({'-moz-transform': 'translateX(' + scatterX + '%) translateY(' + scatterY + '%) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) rotate(' + rotate + 'deg)', 'opacity':0});
	$('#mainTitle').css({'-o-transform': 'translateX(' + scatterX + '%) translateY(' + scatterY + '%) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) rotate(' + rotate + 'deg)', 'opacity':0});
	$('#mainTitle').css({'transform': 'translateX(' + scatterX + '%) translateY(' + scatterY + '%) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) rotate(' + rotate + 'deg)', 'opacity':0});
	scatter = makeScatterTarget();
	scatterX = scatter.split(',')[0];
	scatterY = scatter.split(',')[1];
	rotateX = scatter.split(',')[2];
	rotateY = scatter.split(',')[3];
	rotate = scatter.split(',')[4];
	$('#secondaryTitle').css({'-webkit-transform': 'translateX(' + scatterX + '%) translateY(' + scatterY + '%) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) rotate(' + rotate + 'deg)', 'opacity':0});
	$('#secondaryTitle').css({'-moz-transform': 'translateX(' + scatterX + '%) translateY(' + scatterY + '%) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) rotate(' + rotate + 'deg)', 'opacity':0});
	$('#secondaryTitle').css({'-o-transform': 'translateX(' + scatterX + '%) translateY(' + scatterY + '%) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) rotate(' + rotate + 'deg)', 'opacity':0});
	$('#secondaryTitle').css({'transform': 'translateX(' + scatterX + '%) translateY(' + scatterY + '%) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) rotate(' + rotate + 'deg)', 'opacity':0});
}

function makeLinks() {
	var links = ['acts', 'contacts', 'gallery', 'tickets', 'vip', 'workers']
	for (i=0;i<links.length;i++) {
		$('#nextPicContainer').append('<img src="img/links/' + links[i] + '.png" class="link" id="link' + i.toString() + '" />');
	}
	$('.link').click(function() {
		window.location.href = "/moreDetails/" + $(this).attr('src').replace('img/links/', '').replace('.png', '');
	});	
}

function firstTransition() {
	$('body').animate({backgroundColor: '#000000'}, 500);
	$('#nextPicContainer').fadeIn(2500, function() {
		$('#introPic').hide();
		setTimeout(function() {
			$('#nextPic').fadeOut(2000, function() {
				$('#mainTitle').css({'-webkit-transform': 'translateX(0px) translateY(0px) rotateX(0deg) rotateY(0deg) rotate(0deg)', 'opacity':1});
				$('#mainTitle').css({'-moz-transform': 'translateX(0px) translateY(0px) rotateX(0deg) rotateY(0deg) rotate(0deg)', 'opacity':1});
				$('#mainTitle').css({'-o-transform': 'translateX(0px) translateY(0px) rotateX(0deg) rotateY(0deg) rotate(0deg)', 'opacity':1});
				$('#mainTitle').css({'transform': 'translateX(0px) translateY(0px) rotateX(0deg) rotateY(0deg) rotate(0deg)', 'opacity':1});
				setTimeout(function() {
					$('#secondaryTitle').css({'-webkit-transform': 'translateX(0px) translateY(0px) rotateX(0deg) rotateY(0deg) rotate(0deg)', 'opacity':1});
					$('#secondaryTitle').css({'-moz-transform': 'translateX(0px) translateY(0px) rotateX(0deg) rotateY(0deg) rotate(0deg)', 'opacity':1});
					$('#secondaryTitle').css({'-o-transform': 'translateX(0px) translateY(0px) rotateX(0deg) rotateY(0deg) rotate(0deg)', 'opacity':1});
					$('#secondaryTitle').css({'transform': 'translateX(0px) translateY(0px) rotateX(0deg) rotateY(0deg) rotate(0deg)', 'opacity':1});
				}, 1000);
			});
		}, 2000);
	});
}

function makeBCFragments(number) {
	for (i=0;i<number;i++) {
		$('#nextPicContainer').append('<img src="img/fragments/BC' + (i+1).toString() + '.png" class="BCfragment" id="fragment' + i.toString() + '" />');
	}
	$('.BCfragment').each(function(index, elem) {
		var theFragment = $(elem);
		var fragIndex = $(elem).attr('id').replace('fragment', '');
		theFragment.mouseover(function() {
			scatter = makeScatterTarget();
			scatterX = scatter.split(',')[0];
			scatterY = scatter.split(',')[1];
			rotateX = scatter.split(',')[2];
			rotateY = scatter.split(',')[3];
			rotate = scatter.split(',')[4];
			theFragment.css({'-webkit-transform': 'translateX(' + scatterX + '%) translateY(' + scatterY + '%) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) rotate(' + rotate + 'deg)'});
			theFragment.css({'-moz-transform': 'translateX(' + scatterX + '%) translateY(' + scatterY + '%) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) rotate(' + rotate + 'deg)'});
			theFragment.css({'-o-transform': 'translateX(' + scatterX + '%) translateY(' + scatterY + '%) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) rotate(' + rotate + 'deg)'});
			theFragment.css({'transform': 'translateX(' + scatterX + '%) translateY(' + scatterY + '%) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) rotate(' + rotate + 'deg)'});
			setTimeout(function() {
				theFragment.css({'-webkit-transform': 'translateX(0px) translateY(0px) rotateX(0deg) rotateY(0deg) rotate(0deg)'});
				theFragment.css({'-moz-transform': 'translateX(0px) translateY(0px) rotateX(0deg) rotateY(0deg) rotate(0deg)'});
				theFragment.css({'-o-transform': 'translateX(0px) translateY(0px) rotateX(0deg) rotateY(0deg) rotate(0deg)'});
				theFragment.css({'transform': 'translateX(0px) translateY(0px) rotateX(0deg) rotateY(0deg) rotate(0deg)'});
			}, 300);
		});
		var left = fragmentPositions[fragIndex]['x'];
		var top = fragmentPositions[fragIndex]['y'];
		var width = fragmentPositions[fragIndex]['width'];
		//theFragment.css({'left':left.toString() + '%', 'top':top.toString() + '%', '-webkit-transform':'rotate(' + rotate.toString() + 'deg)', '-moz-transform':'rotate(' + rotate.toString() + 'deg)', '-o-transform':'rotate(' + rotate.toString() + 'deg)', 'transform':'rotate(' + rotate.toString() + 'deg)'});
		theFragment.css({'left':left.toString() + '%', 'top':top.toString() + '%', 'width':width.toString() + '%'});
	});
}

function makeFragmentWrapperDiv(longSide, shortSide, angle) {
	//generates the html for a div with long and short sides as described, rotated by `angle` degrees
	var output = '<div class="fragmentWrapper" style="position:absolute;width:' + longSide.toString + 'px;height:' + shortSide.toString() + 'px;-webkit-transform:rotate(' + angle.toString() + 'deg);-moz-transform:rotate(' + angle.toString() + 'deg);-o-transform:rotate(' + angle.toString() + 'deg);transform:rotate(' + angle.toString() + 'deg);" />';
	return output;
}

function makeScatterTarget() {
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
	{x:33, y:27, width:4.2},
	{x:28.5, y:64.2, width:2.8}, 
];

