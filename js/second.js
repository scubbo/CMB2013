$(document).ready(function() {
	var pageWidth = $(window).width();
	var pageHeight = $(window).height();

	$('#indexWheelContainer').css('top', pageHeight - 400).css('left', 4);
	$('.indexWheelLink').each(function(index, elem) {
		//var theWidth = $(elem).width();
		//This is how it should really be done...I feel so dirty...
		var theWidth = imageWidths[index];
		$(elem).css({'-webkit-transform':'rotate(' + (index*60).toString() + 'deg) translateY(-160px)', '-moz-transform':'rotate(' + (index*60).toString() + 'deg) translateY(-160px)', '-o-transform':'rotate(' + (index*60).toString() + 'deg) translateY(-160px)', 'transform':'rotate(' + (index*60).toString() + 'deg) translateY(-160px)', 'left':(200-(theWidth/2.0)).toString() + 'px'});
	});

	$('#wheelViewport').height(pageHeight).width(pageWidth);
	$('.wheelContent').each(function(index, elem) {
		var contentWidth = 2000; //Might need to change this
		$(elem).css({'left':((2000 - contentWidth)/2.0).toString()}).css({'-webkit-transform':'rotate(' + (index*60).toString() + 'deg) translateY(-' + pageHeight.toString() + 'px)', '-webkit-transform-origin':'center top', '-moz-transform':'rotate(' + (index*60).toString() + 'deg) translateY(-' + pageHeight.toString() + 'px)', '-moz-transform-origin':'center top', '-o-transform':'rotate(' + (index*60).toString() + 'deg) translateY(-' + pageHeight.toString() + 'px)', '-o-transform-origin':'center top', 'transform':'rotate(' + (index*60).toString() + 'deg) translateY(-' + pageHeight() + 'px)', 'transform-origin':'center top'});
	});

	var myWheel = new wheelObject($('#indexWheelContainer'), $('#wheel'));
});

function wheelObject(indexObject, targetObject, startWheelPosition) {
	theWheelObject = this;
	this.indexObject = indexObject;
	this.targetObject = targetObject;
	this.startWheelPosition = typeof startWheelPosition !== 'undefined' ? startWheelPosition : 0;
	this.currentWheelPosition = this.startWheelPosition;
	this.totalObjects = this.indexObject.children('div.indexWheelLink').length;
	this.half = this.totalObjects/2;
	if (this.currentWheelPosition == 0) {
		this.currentAngle = 0
	} else {
		this.currentAngle = this.currentWheelPosition > this.half ? parseFloat(this.currentWheelPosition * 360) / theWheelObject.totalObjects : - parseFloat(theWheelObject.totalObjects - this.currentWheelPosition) * 360 / theWheelObject.totalObjects;
	}
	console.log('currentAngle is ' + this.currentAngle.toString());

	this.indexObject.children('div.indexWheelLink').click(function(event) {
		var moveToIndex = parseInt($(this).attr('data-wheel-position'));
		var turnsRight;
		if (moveToIndex > theWheelObject.currentWheelPosition) {
			console.log('case a1');
			turnsRight = moveToIndex - theWheelObject.currentWheelPosition;
		} else {
			console.log('case a2');
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
			console.log(turnsRight * 360);
			console.log(parseFloat(turnsRight * 360));
			console.log(parseFloat(turnsRight * 360) / theWheelObject.totalObjects);
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
			targetAngle = theWheelObject.currentAngle + (parseFloat(turnsLeft * 360) / theWheelObject.totalObjects);
			rotateTo(indexObject, targetAngle);
			rotateTo(targetObject, targetAngle);
		}
		//Take it back now, y'all
		theWheelObject.currentWheelPosition = moveToIndex;
		console.log('current WheelPosition is now ' + moveToIndex.toString());
		theWheelObject.currentAngle = targetAngle
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
	168
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
