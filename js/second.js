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

	var myWheel = new wheelObject($('#indexWheelContainer'), $('#wheel'));
	console.log(myWheel);
});

function wheelObject(indexObject, targetObject, startWheelPosition) {
	theWheelObject = this;
	this.indexObject = indexObject;
	this.targetObject = targetObject;
	this.startWheelPosition = typeof startWheelPosition == 'undefined' ? 0 : startWheelPosition;
	this.currentWheelPosition = startWheelPosition;
	this.totalObjects = this.targetObject.children('div.indexWheelLink').length;
	this.half = this.totalObjects/2;

	this.indexObject.children('div.indexWheelLink').click(function() {
		console.log('being clicked');
		console.log('test ---- ' + currentWheelPosition);
		var moveToIndex = $(this).attr('data-wheel-position');
		console.log('moveToIndex is ' + moveToIndex.toString());
		var turnsRight;
		if moveToIndex > this.currentWheelPosition {
			turnsRight = moveToIndex - currentWheelPosition;
		} else {
			turnsRight = totalObjects - currentWheelPosition + moveToIndex;
		}
		//var turnsRight = moveToIndex > this.currentWheelPosition ? moveToIndex - this.currentWheelPosition : this.totalObjects - this.currentWheelPosition + moveToIndex;
		console.log('turnsRight is ' + turnsRight.toString());
		if (turnsRight < this.half) {
			//Move to the right
			rotate(indexObject, parseFloat(turnsRight * 360) / this.totalObjects);
			rotate(targetObject, parseFloat(turnsRight * 360) / this.totalObjects);
		} else {
			//Move to the left
			var turnsLeft = this.totalObjects - moveToIndex - 1;
			rotate(indexObject, parseFloat(turnsLeft * 360) / this.totalObjects, false);
			rotate(targetObject, parseFloat(turnsLeft * 360) / this.totalObjects, false);
		}
		//Take it back now, y'all
	});

}


function getCurrentAngle(target) {
	var re = /deg\) translateY.*/;
	var theCurrent = $(target).css('-webkit-transform');
	if (theCurrent == 'none') {
		return 0;
	}
	return parseInt($(target).css('-webkit-transform').replace('rotate(', '').replace(re, ''));
}

function rotate(targetObject, deg, right) {
	right = typeof right == 'undefined' ? true : right;
	var currentAngle = getCurrentAngle(targetObject);
	targetAngle = right ? currentAngle + deg : currentAngle - deg;
	var transforms = ['-webkit-transform', '-o-transform', '-moz-transform', 'transform'];
	for (var i = 0;i<transforms.length;i++) {
		var theTransform = transforms[i];
		var currentCSS = $(targetObject).css(theTransform);
		if (currentCSS == 'none' || typeof currentCSS == 'undefined') {
			$(targetObject).css(theTransform, 'rotate(' + targetAngle.toString() + 'deg)');
		} else {
			$(targetObject).css(theTransform, $(targetObject).css(theTransform).replace(/(rotate\()\d*(.*)/, '$1' + targetAngle.toString() + '$2'));
		}
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
