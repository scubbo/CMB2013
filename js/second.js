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
	this.startWheelPosition = typeof startWheelPosition !== 'undefined' ? startWheelPosition : 0;
	this.currentWheelPosition = this.startWheelPosition;
	this.totalObjects = this.indexObject.children('div.indexWheelLink').length;
	this.half = this.totalObjects/2;
	console.log('this.half is ' + this.half.toString());

	this.indexObject.children('div.indexWheelLink').click(function(event) {
		var moveToIndex = $(this).attr('data-wheel-position');
		var turnsRight;
		if (moveToIndex > theWheelObject.currentWheelPosition) {
			turnsRight = moveToIndex - theWheelObject.currentWheelPosition;
		} else {
			turnsRight = theWheelObject.totalObjects - theWheelObject.currentWheelPosition + moveToIndex;
		}
		//var turnsRight = moveToIndex > theWheelObject.currentWheelPosition ? moveToIndex - theWheelObject.currentWheelPosition : theWheelObject.totalObjects - theWheelObject.currentWheelPosition + moveToIndex;
		console.log('turnsRight is ' + turnsRight.toString());
		if (turnsRight < theWheelObject.half) {
			//Move to the right
			console.log('case 1');
			console.log(turnsRight);
			console.log(turnsRight * 360);
			console.log(parseFloat(turnsRight * 360));
			console.log(parseFloat(turnsRight * 360) / theWheelObject.totalObjects);
			rotate(indexObject, parseFloat(turnsRight * 360) / theWheelObject.totalObjects);
			rotate(targetObject, parseFloat(turnsRight * 360) / theWheelObject.totalObjects);
		} else {
			//Move to the left
			var turnsLeft = theWheelObject.totalObjects - moveToIndex;
			console.log('case 2');
			console.log(turnsLeft);
			console.log(turnsLeft * 360);
			console.log(parseFloat(turnsLeft * 360));
			console.log(parseFloat(turnsLeft * 360) / theWheelObject.totalObjects);
			rotate(indexObject, parseFloat(turnsLeft * 360) / theWheelObject.totalObjects, false);
			rotate(targetObject, parseFloat(turnsLeft * 360) / theWheelObject.totalObjects, false);
		}
		//Take it back now, y'all
		theWheelObject.currentWheelPosition = moveToIndex;
		console.log('current WheelPosition is now ' + moveToIndex.toString());
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

function rotate(targetObject, deg, right) {
	right = typeof right == 'undefined' ? true : right;
	var currentAngle = getCurrentAngle(targetObject);
	console.log(currentAngle);
	console.log(deg);
	targetAngle = right ? currentAngle - deg : currentAngle + deg;
	var transforms = ['-webkit-transform', '-o-transform', '-moz-transform', 'transform'];
	for (var i = 0;i<transforms.length;i++) {
		var theTransform = transforms[i];
		var currentCSS = $(targetObject).css(theTransform);
		if (currentCSS == 'none' || typeof currentCSS == 'undefined') {
			$(targetObject).css(theTransform, 'rotate(' + targetAngle.toString() + 'deg)');
		} else {
			console.log(targetAngle.toString());
			var textToMake = $(targetObject).css(theTransform).replace(/(rotate\()\d*(.*)/, '$1' + targetAngle.toString() + '$2');
			console.log(textToMake);
			$(targetObject).css(theTransform, textToMake);
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
