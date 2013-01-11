console.log('Welcome to Clare May Ball 2013!');
console.log('test');
$(document).ready(function() {
	console.log('this is done');
	//$('#mainImageContainer').children('img').
	var pos = $('#introPic').position();
	$('#nextPic').style('top', pos.top);
	$('nextPic').style('left', pos.left);
});


