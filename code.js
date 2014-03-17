

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

var fps = 40;		// frames per second

var raptor;		// object to hold data for raptor
var enemy;		// enemy 



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

	// Initialize ship
	raptor = new Object();
	raptor.width = 15;
	raptor.height = 20;
	raptor.x = 200;
	raptor.y = 250;
	// Velocities going forward, backwards, sideways
	raptor.forwardvel = 70/fps;	// Numerator represents speed in pixels per second
	raptor.sidevel = 60/fps;
	raptor.backvel = 35/fps;

	// Enemy
	enemy = new Object();
	enemy.width = 25;
	enemy.height = 40;
	enemy.x = 300;
	enemy.y = 150;

	

	// Begin endless delayed loop
	tick();

});


// This function is executed "fps" times per second
function tick()
{
	// Set timer for next tick
	setTimeout(tick,1000/fps);

    updateRaptor();

 	// Check for collision between raptor and enemy
	if(collision(raptor,enemy))
	{
		enemy.x = Math.random()*(width-enemy.width);
		enemy.y = Math.random()*(height-enemy.height);
	}

	// Clear the canvas
	ctx.clearRect(0,0,width,height);

	// Draw the box, with the topleft corner at coordinates (tempx,tempy)
	ctx.fillStyle="#000000";
	ctx.fillRect(raptor.x,raptor.y,raptor.width,raptor.height);

	ctx.fillStyle="#ff0000";
	ctx.fillRect(enemy.x,enemy.y,enemy.width,enemy.height);



}

function collision(a,b)
{
	if(a.x+a.width>b.x)
	{
		if(b.x+b.width>a.x)
		{
			if(a.y+a.height>b.y)
			{
				if(b.y+b.height>a.y)
				{
					return true;
				}
			}
		}
	}

	return false;
}

function updateRaptor() {
    // Alter tempx/tempy if certain keys pressed
    if(keydown[rightkey])
    {
        raptor.x += raptor.sidevel;
    }

    if(keydown[leftkey])
    {
        raptor.x -= raptor.sidevel;
    }

    if(keydown[upkey])
    {
        raptor.y -= raptor.forwardvel;
    }

    if(keydown[downkey])
    {
        raptor.y += raptor.backvel;
    }
}

