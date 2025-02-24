$(document).ready(function() {
	var pageWidth = window.innerWidth;
	var pageHeight = window.innerHeight;

	var picWidth = Math.min(pageWidth*0.8, pageHeight);	
	var indent = (pageWidth - picWidth) / 2.0;
	//$('#introPic, #nextPicContainer').css('width', picWidth).css('height', picWidth).css('left', indent);
	$('#introPic, #nextPicContainer').css('width', picWidth).css('left', indent);

	positionTitles();
	makeLinks();
	makeBCFragments(41);

	var loadingIndent = (pageWidth - 220) / 2.0;
	var loadingIndentTop = (pageHeight - 19) / 2.0;
	$('#loadingIcon').css('left', loadingIndent).css('top', loadingIndentTop);

	$('#nextPic').load(function() {	
		$('#loadingIcon').hide();
		$('#introPic').fadeIn(1000);
		$('#introPic').click(function() {
			firstTransition();
		});
	});

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
					setTimeout(activateBCFragments, 1000);
				}, 1000);
			});
		}, 2000);
	});
}

function makeBCFragments(number) {
	for (i=0;i<number;i++) {
		$('#nextPicContainer').append('<img src="img/fragments/BC' + (i+1).toString() + '.png" class="BCfragment" id="fragment' + i.toString() + '" />');
	}
	positionBCFragments();
	window.onresize = resizeContainers;
}

function activateBCFragments() {
	$('.BCfragment').each(function(index, elem) {
		var theFragment = $(elem);
		var fragIndex = $(elem).attr('id').replace('fragment', '');
		theFragment.mouseenter(function() {
			var transforms = ['-webkit-transform', '-moz-transform', '-o-transform', 'transform'];
			var theTransformString = 'translateX(' + (Math.random()*1000 - 500).toString() + 'px) translateY(' + (Math.random()*1000 - 500).toString() + 'px) translateZ(' + (Math.random()*500 - 250).toString() + 'px) rotateX(' + (Math.random()*1440 - 720).toString() + 'deg) rotateY(' + (Math.random()*1440 - 720).toString() + 'deg) rotateZ(' + (Math.random()*1440 - 720).toString() + 'deg)';
			console.log(theTransformString);
			for (i=0;i<transforms.length;i++) {
				var theTransform = transforms[i];
				$(elem).css(theTransform, theTransformString);
			}
			setTimeout(function() {
				var transforms = ['-webkit-transform', '-moz-transform', '-o-transform', 'transform'];
				for (i=0;i<transforms.length;i++) {
					var theTransform = transforms[i];
					$(elem).css(theTransform, 'translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)');
				}
			}, 600);
		});
	});
	$('.link').click(function() {
		//window.location.href = "/moreDetails/" + $(this).attr('src').replace('img/links/', '').replace('.png', '');
		window.location.href = "/moreDetails"
	});	
}

function positionBCFragments() {
	$('.BCfragment').each(function(index, elem) {
		var theFragment = $(elem);
		var fragIndex = $(elem).attr('id').replace('fragment', '');
		var left = fragmentPositions[fragIndex]['x'];
		var top = fragmentPositions[fragIndex]['y'];
		var width = fragmentPositions[fragIndex]['width'];
		theFragment.css({'left':left.toString() + '%', 'top':top.toString() + '%', 'width':width.toString() + '%'});
	});
}

function resizeContainers() {
	console.log('resizing');
	var pageWidth = window.innerWidth;
	var pageHeight = window.innerHeight;

	var picWidth = Math.min(pageWidth*0.8, pageHeight);	
	var indent = (pageWidth - picWidth) / 2.0;
	$('#introPic, #nextPicContainer').css('width', picWidth).css('left', indent);
}

function makeFragmentWrapperDiv(longSide, shortSide, angle) {
	//generates the html for a div with long and short sides as described, rotated by `angle` degrees
	var output = '<div class="fragmentWrapper" style="position:absolute;width:' + longSide.toString + 'px;height:' + shortSide.toString() + 'px;-webkit-transform:rotate(' + angle.toString() + 'deg);-moz-transform:rotate(' + angle.toString() + 'deg);-o-transform:rotate(' + angle.toString() + 'deg);transform:rotate(' + angle.toString() + 'deg);" />';
	return output;
}

function makeScatterTarget() {
	return maybeNegative() + (300 + Math.random() * 200).toString() + ',' + maybeNegative() + (300 + Math.random() * 200).toString() + ',' + maybeNegative() + (Math.random() * 600).toString() + ',' + maybeNegative() + (Math.random() * 600).toString() + ',' + maybeNegative() + (Math.random() * 600).toString();
}

function scatter(elem) {
	console.log('scattering')
	var transforms = ['-webkit-transform', '-moz-transform', '-o-transform', 'transform'];
	for (i=0;i<transforms.length;i++) {
		var theTransform = transforms[i];
		$(elem).css({theTransform: 'translateX(' + Number.random(-1000, 1000).toString() + ') translateY(' + Number.random(-1000, 1000).toString() + ') translateZ(' + Number.random(-500, 500).toString() + ') rotateX(' + Number.random(-720, 720).toString() + 'deg) rotateY(' + Number.random + 'deg) rotateZ(' + Number.random(-720, 720).toString() + 'deg)'});
	}
	console.log('done scattering');
}


function unscatter(elem) {
	console.log('unscattering');
	var transforms = ['-webkit-transform', '-moz-transform', '-o-transform', 'transform'];
	for (i=0;i<transforms.length;i++) {
		var theTransform = transforms[i];
		$(elem).css({theTransform: 'translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)'});
	}
	console.log('done unscattering');
	return '';
}

function maybeNegative() {
	if (Math.random() > 0.5) {
		return "-";
	} else {
		return "";
	}
}

function getInternetExplorerVersion()
// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
{
  var rv = -1; // Return value assumes failure.
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
}
function checkVersion()
{
  var ver = getInternetExplorerVersion();

  if ( ver > -1 )
  {
	alert('This website uses some new features not available in Internet Explorer. You will be redirected directly to the ticket purchase site. If you wish to view this site, please use a different browser.');
	window.location.href = "https://claremayball.soc.srcf.net/ticketing";
  }
}

var fragmentPositions = [
	{x:33, y:27, width:4.2},
	{x:28.5, y:64.2, width:2.8}, 
	{x:69.6, y:32.2, width:4.2}, 
	{x:77.6, y:59, width:2.6}, 
	{x:53, y:80.05, width:2.8}, 
	{x:44, y:82.7, width:2.5}, 
	{x:62, y:82.6, width:5.8}, 
	{x:35, y:80.1, width:2.4}, 
	{x:74.5, y:90.4, width:1.9}, 
	{x:76.2, y:85.6, width:3.7}, 
	{x:74.5, y:81.6, width:1.3}, 
	{x:68.4, y:77.3, width:2.7}, 
	{x:68.5, y:69.5, width:2.6}, 
	{x:74.5, y:66.8, width:2.4}, 
	{x:89.6, y:59, width:1.5}, 
	{x:94.3, y:53.7, width:4}, 
	{x:94, y:48.2, width:4.3}, 
	{x:80.4, y:40.1, width:2.5}, 
	{x:77.3, y:40, width:2.6}, 
	{x:56.3, y:21.9, width:3.8}, 
	{x:49.9, y:24.3, width:2.5}, 
	{x:49.7, y:28.8, width:1.4}, 
	{x:43.7, y:21.9, width:2.7}, 
	{x:71.4, y:11.2, width:2.7}, 
	{x:29.9, y:32.4, width:1.2}, 
	{x:22.4, y:34.7, width:2.6}, 
	{x:22.1, y:37.4, width:1.5}, 
	{x:25.5, y:42.5, width:5.4}, 
	{x:16.4, y:42.7, width:2.5}, 
	{x:28.4, y:21.5, width:2.7}, 
	{x:13.3, y:50.6, width:5.65}, 
	{x:5.5, y:49.9, width:1}, 
	{x:13.3, y:53.2, width:4.2}, 
	{x:4.3, y:57, width:2.6}, 
	{x:1.2, y:48, width:3.9}, 
	{x:1.3, y:53.7, width:3.9}, 
	{x:9.8, y:62.4, width:2.5}, 
	{x:22.3, y:58.5, width:2.7}, 
	{x:25.2, y:77.1, width:2.6}, 
	{x:16.2, y:79.8, width:2.5}, 
	{x:22, y:90.3, width:3.2}
];

