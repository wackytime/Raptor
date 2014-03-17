

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

// A Javascript object intended for use as an abstract class
var polygon = {
    xcoords: undefined,
    ycoords: undefined,
    color: undefined,
    draw: function() {
        if (typeof this.xcoords === 'undefined'
            || typeof this.ycoords === 'undefined'
            || typeof this.color === 'undefined'
            || this.xcoords.length < 3
            || this.ycoords.length != this.xcoords.length) {
            // TODO: Find a better way to alert us to these types of errors
            alert("Programming error: we tried to draw an improperly constructed polygon");
        }

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.xcoords[0], this.ycoords[0]);
        for (var i = 0; i < this.xcoords.length; i ++) {
            ctx.lineTo(this.xcoords[i], this.ycoords[i]);
        }
        ctx.closePath();
        ctx.fill();
    },
    moveX: function(distance) {
        for (var i = 0; i < this.xcoords.length; i ++) {
            this.xcoords[i] = this.xcoords[i] + distance;
        }
    },
    moveY: function(distance) {
        for (var i = 0; i < this.ycoords.length; i ++) {
            this.ycoords[i] = this.ycoords[i] + distance;
        }
    }
};

var raptor = Object.create(polygon);

function initializeRaptor() {
    raptor.color = "#FF0000";
    raptor.xcoords = [60, 80, 100];
    raptor.ycoords = [100, 50, 100];
}

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

    initializeRaptor();

	// Begin endless delayed loop
	tick();
});


// This function is executed once every 30 ms
function tick()
{
    // Process key commands, mouse movements, etc.
    processUserInput();

	// Clear the canvas
	ctx.clearRect(0,0,width,height);

    // TODO: Consider replacing this with something more general for all drawable objects.
    raptor.draw();

	// Calculate time left until next tick, set timer
	var time = (new Date()).getTime();
	dtime = time - ltime;
	ltime = time;
	setTimeout(tick,30-dtime);
}

function processUserInput() {
    if(keydown[rightkey])
    {
        raptor.moveX(1);
    }

    if(keydown[leftkey])
    {
        raptor.moveX(-1);
    }

    if(keydown[upkey])
    {
        raptor.moveY(-1);
    }

    if(keydown[downkey])
    {
        raptor.moveY(1);
    }
}

