console.log('This is a message');
$(document).ready(function() {
	var c = document.getElementById("mainCanvas");
	var ctx=c.getContext("2d");
	ctx.beginPath();
	var x = $(c).width() / 4;
	var y = $(c).height() / 4;
	var r = Math.min(x, y);
	drawCircle(ctx, x, y, r);
	drawCircle(ctx, 3*x, y, r);
	drawCircle(ctx, x, 3*y, r);
	drawCircle(ctx, 3*x, 3*y, r, '#FF0000');
	console.log('circle drawn');
	$(c).mousemove(function(event) {
		coords = c.relMouseCoords(event);
		console.log('-------');
		console.log(coords.x);
		console.log(coords.y);
	});
});

function drawCircle(context, x, y, r, color) {
	console.log('color is ' + color);
	context.beginPath();
	context.arc(x, y, r, 0, 2*Math.PI);
	color = typeof color !== 'undefined' ? color : '#000000';
	context.fillStyle = color;
	context.fill();
}

function relMouseCoords(event){
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do{
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while(currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return {x:canvasX, y:canvasY}
}
HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;
