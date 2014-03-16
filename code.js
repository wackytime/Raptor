

// Global Vars
var ctx;		// pointer to the "context" of the screen canvas

var width = 400;	// Width & Height of game area, in pixels
var height = 300;

var keydown = new Array(256);	// Boolean Array to track pressed keys
var upkey = 38;
var downkey = 40;
var leftkey = 37;	// keycodes correspond to arrow keys
var rightkey = 39;
var firekey = 32;	// spacebar

var ltime;		// Keep track of time between current and last tick

var tempx=100;		// temp x&y vars of moving box
var tempy=100;



// Init routine
$(document).ready(function()
{
	// Create Canvas element
	$("body").append("<canvas id='screen' width='"+width+"px;' height ='"+height+"px' style='border:1px solid black'></canvas>");

	// Set ctx to newly created canvas
	ctx = document.getElementById("screen").getContext("2d");

	// Initialize clock
	ltime = (new Date()).getTime();

	// Code to track keyboard input
	$("body").keydown(function(e)
	{
		keydown[e.keyCode] = true;
	});
	$("body").keyup(function(e)
	{
		keydown[e.keyCode] = false;
	});
	

	// Begin endless delayed loop
	tick();

});


// This function is executed once every 30 ms
function tick()
{
	
	// Alter tempx/tempy if certain keys pressed
	if(keydown[rightkey])
	{
		tempx+=1;
	}

	// Clear the canvas
	ctx.clearRect(0,0,width,height);

	// Draw the box, with the topleft corner at coordinates (tempx,tempy)
	ctx.fillStyle="#000000";
	ctx.fillRect(tempx,tempy,20,20);




	// Calculate time left until next tick, set timer
	var time = (new Date()).getTime();
	dtime = time - ltime;
	ltime = time;
	setTimeout(tick,30-dtime);
}


