$(document).ready(function() {
	console.log('window.location is');
	console.log(window.location);
	console.log(window.location.href);
	console.log(window.location.search);

	var pageWidth = $(window).width();
	var pageHeight = $(window).height();

	positionLookup = {
		"workers":0, 
		"tickets":1, 
		"acts":2, 
		"contacts":3, 
		"vip":4, 
		"gallery":5
	};
	//var queryString = getParameterByName("section");
	var queryString = window.location.pathname.replace('/moreDetails/', '');
	var startPosition; 
	if (typeof queryString !== 'undefined' && queryString != "") {
		startPosition = positionLookup[queryString];
	} else {
		startPosition = 0;
	}

	$('#indexWheelContainer').css('top', pageHeight - 420).css('left', 20);
	$('.indexWheelLink').each(function(index, elem) {
		//var theWidth = $(elem).width();
		//This is how it should really be done...I feel so dirty...
		var theWidth = imageWidths[index];
		index = index-startPosition;
		$(elem).css({'-webkit-transform':'rotate(' + (index*60).toString() + 'deg) translateY(-160px)', '-moz-transform':'rotate(' + (index*60).toString() + 'deg) translateY(-160px)', '-o-transform':'rotate(' + (index*60).toString() + 'deg) translateY(-160px)', 'transform':'rotate(' + (index*60).toString() + 'deg) translateY(-160px)', 'left':(200-(theWidth/2.0)).toString() + 'px'});
	});

	$('#wheelViewport').height(pageHeight).width(pageWidth);
	var wheelRadius = 2*pageHeight;
	$('#wheel').height(2*wheelRadius);
	$('.wheelContent').each(function(index, elem) {
		var contentWidth = 800; //Might need to change this
		$(elem).css({'left':((pageWidth - contentWidth)/2.0).toString() + 'px', 'top':wheelRadius.toString() + 'px'})
		index = index-startPosition;
		$(elem).css({'-webkit-transform':'rotate(' + (index*60).toString() + 'deg) translateY(-' + wheelRadius.toString() + 'px)', '-webkit-transform-origin':'center top', '-moz-transform':'rotate(' + (index*60).toString() + 'deg) translateY(-' + wheelRadius.toString() + 'px)', '-moz-transform-origin':'center top', '-o-transform':'rotate(' + (index*60).toString() + 'deg) translateY(-' + wheelRadius.toString() + 'px)', '-o-transform-origin':'center top', 'transform':'rotate(' + (index*60).toString() + 'deg) translateY(-' + wheelRadius.toString() + 'px)', 'transform-origin':'center top'});
	});

	var myWheel = new wheelObject($('#indexWheelContainer'), $('#wheel'), startPosition);
	//var myWheel = new wheelObject($('#indexWheelContainer'), $('#wheel'));
});

function wheelObject(indexObject, targetObject, startWheelPosition) {
	theWheelObject = this;
	this.indexObject = indexObject;
	this.targetObject = targetObject;
	this.startWheelPosition = typeof startWheelPosition !== 'undefined' ? startWheelPosition : 0;
	this.currentWheelPosition = this.startWheelPosition;
	this.totalObjects = this.indexObject.children('div.indexWheelLink').length;
	this.half = this.totalObjects/2;
	
	this.currentAngle = 0;
	//if (this.currentWheelPosition == 0) {
	//	this.currentAngle = 0
	//} else {
	//	this.currentAngle = this.currentWheelPosition > this.half ? parseFloat(theWheelObject.totalObjects - this.currentWheelPosition) * 360 / theWheelObject.totalObjects : - (parseFloat(this.currentWheelPosition) * 360 / theWheelObject.totalObjects);
	//}
	//this.startAngle = this.currentAngle;

	this.targetObject.children().each(function(index, elem) {
		if ($(elem).attr('data-wheel-position') == theWheelObject.currentWheelPosition.toString()) {
			$(elem).css('opacity', '1');
			console.log('making visible');
		}
	});

	this.indexObject.children('div.indexWheelLink').click(function(event) {
		console.log('Current Wheel Position is ' + theWheelObject.currentWheelPosition.toString());
		console.log('Current angle is ' + theWheelObject.currentAngle.toString());
		var moveToIndex = parseInt($(this).attr('data-wheel-position'));
		console.log('Move To Index is ' + moveToIndex.toString());
		var turnsRight;
		if (moveToIndex > theWheelObject.currentWheelPosition) {
			turnsRight = moveToIndex - theWheelObject.currentWheelPosition;
		} else {
			console.log(theWheelObject.totalObjects);
			console.log(theWheelObject.currentWheelPosition);
			console.log(moveToIndex);
			console.log(theWheelObject.totalObjects - theWheelObject.currentWheelPosition);
			console.log(theWheelObject.totalObjects - theWheelObject.currentWheelPosition + moveToIndex);
			turnsRight = theWheelObject.totalObjects - theWheelObject.currentWheelPosition + moveToIndex;
		}
		//var turnsRight = moveToIndex > theWheelObject.currentWheelPosition ? moveToIndex - theWheelObject.currentWheelPosition : theWheelObject.totalObjects - theWheelObject.currentWheelPosition + moveToIndex;
		console.log('turnsRight is ' + turnsRight.toString());
		var targetAngle;
		if (turnsRight < theWheelObject.half) {
			//Move to the right
			console.log('case 1');
			console.log(turnsRight);
			console.log(parseFloat(turnsRight * 360) / theWheelObject.totalObjects);
			console.log('currentAngle is ' + theWheelObject.currentAngle.toString());
			//console.log('start angle is ' + theWheelObject.startAngle.toString());
			targetAngle = theWheelObject.currentAngle - (parseFloat(turnsRight * 360) / theWheelObject.totalObjects);
			rotateTo(indexObject, targetAngle);
			rotateTo(targetObject, targetAngle);
		} else {
			//Move to the left
			var turnsLeft = theWheelObject.currentWheelPosition > moveToIndex ? theWheelObject.currentWheelPosition - moveToIndex : theWheelObject.currentWheelPosition + theWheelObject.totalObjects - moveToIndex;
			console.log('case 2');
			console.log(turnsLeft);
			console.log(turnsLeft * 360);
			console.log(parseFloat(turnsLeft * 360));
			console.log(parseFloat(turnsLeft * 360) / theWheelObject.totalObjects);
			console.log('currentAngle is ' + theWheelObject.currentAngle.toString());
			//console.log('start angle is ' + theWheelObject.startAngle.toString());
			targetAngle = theWheelObject.currentAngle + (parseFloat(turnsLeft * 360) / theWheelObject.totalObjects);
			rotateTo(indexObject, targetAngle);
			rotateTo(targetObject, targetAngle);
		}
		//Take it back now, y'all
		$('.wheelContent').each(function(index, elem) {
			if ($(elem).attr('data-wheel-position') == moveToIndex.toString()) {
				$(elem).css('opacity', '1');
			} else {
				$(elem).css('opacity', '0');
			}
		});
		theWheelObject.currentWheelPosition = moveToIndex;
		console.log('current WheelPosition is now ' + moveToIndex.toString());
		theWheelObject.currentAngle = targetAngle;
		console.log('current angle is now ' + targetAngle.toString());
	});

}


function getCurrentAngle(obj) {
    var matrix = obj.css("-webkit-transform") ||
    obj.css("-moz-transform")    ||
    obj.css("-ms-transform")     ||
    obj.css("-o-transform")      ||
    obj.css("transform");
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else { var angle = 0; }
    return angle;
}

function rotateTo(targetObject, deg) {
	console.log('rotating to ' + deg.toString());
	var transforms = ['-webkit-transform', '-o-transform', '-moz-transform', 'transform'];
	for (var i = 0;i<transforms.length;i++) {
		var theTransform = transforms[i];
		$(targetObject).css(theTransform, 'rotate(' + deg.toString() + 'deg)');
	}
}

var imageWidths = [
	197, 
	139, 
	107, 
	174, 
	100,
	148
];

var range = function(start, end, step) {
    var range = [];
    var typeofStart = typeof start;
    var typeofEnd = typeof end;

    if (step === 0) {
        throw TypeError("Step cannot be zero.");
    }

    if (typeofStart == "undefined" || typeofEnd == "undefined") {
        throw TypeError("Must pass start and end arguments.");
    } else if (typeofStart != typeofEnd) {
        throw TypeError("Start and end arguments must be of same type.");
    }

    typeof step == "undefined" && (step = 1);

    if (end < start) {
        step = -step;
    }

    if (typeofStart == "number") {

        while (step > 0 ? end >= start : end <= start) {
            range.push(start);
            start += step;
        }

    } else if (typeofStart == "string") {

        if (start.length != 1 || end.length != 1) {
            throw TypeError("Only strings with one character are supported.");
        }

        start = start.charCodeAt(0);
        end = end.charCodeAt(0);

        while (step > 0 ? end >= start : end <= start) {
            range.push(String.fromCharCode(start));
            start += step;
        }

    } else {
        throw TypeError("Only string and number types are supported");
    }

    return range;

}

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

