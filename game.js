//NOTE: functions ordered alphabetically for ease of locating.

//Sets up canvas screen for the game.
/*const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

context.scale(20,20);

context.fillStyle= '#000' ; //black screen
context.fillRect(0,0,canvas.width, canvas.height);*/

//hold image variable
var imageRepository = new function(){
	this.background = new Image();
	this.background.src = "sky.png"; 
}

Background.prototype = new Drawable();

/**  THIS IS ANIMATE FUNCTION AND REQUEST ANIM FRAME IS USED FROM AN ONLINE TUTORIAL. 
http://blog.sklambert.com/html5-canvas-game-panning-a-background#the-basics
 * The animation loop. Calls the requestAnimationFrame shim to
 * optimize the game loop and draws all game objects. This
 * function must be a global function and cannot be within an
 * object.
 */
function animate() {
	requestAnimFrame( animate );
	game.background.draw();
}
/**
 * requestAnim shim layer by Paul Irish
 * Finds the first API that works to optimize the animation loop,
 * otherwise defaults to setTimeout().
 */
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame   ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(/* function */ callback, /* DOMElement */ element){
				window.setTimeout(callback, 1000 / 60);
			};
})();

function Background() {
	this.speed = 1; //set speed to move background
	this.draw = function() { 
		//here we pan the background
		this.x = this.speed;
		this.context.drawImage(imageRepository.background, this.x, this.y)
		
		//we want to keep the image continuous so we
		//draw the image at the edge
		this.context.drawImage(imageRepository.background, this.x - this.canvasWidth, this.y);

		//resets if image is scrolled off screen
		if(this.x >= this.canvasWidth){
			this.x = 0;
		}
	}	
}

//Drawable = base function for all drawable objects in the game.
//All child objects will inherit this and default functions.
function Drawable() {
	this.init = function(x, y){ //init allows us to set x and y position of object when it is created.
		//gives us the default variables
		this.x = x;
		this.y = y;
	}
	this.speed = 0;
	this.canvasWidth = 0;
	this.canvashHeight = 0;

}

/*
init function grabs all the canvas elements
we then check with a conditional if the canvas is supported
the start  begins the animation loop if init function is true*/
function Game() {

	this.init = function(){ //this lets us use the canvas element


		//Sets up game and game objects(functions)
		this.bgCanvas = document.getElementById('background');
		if(this.bgCanvas.getContext) {
			this.bgContext = this.bgCanvas.getContext;
			//initialize objects to have the canvas and context info
			Background.prototype.context = this.bgContext;
			Background.prototype.canvasWidth = this.bgCanvas.width;
			Background.prototype.canvashHeight = this.bgCanvas.height;

			//make background object
			this.background = new Background();
			this.background.init(0,0);
			return true;
		}
		else {
			//tstop running from trying to run on unsupported browsers
			return false;
		}
	}

	//to start an animation loop
	this.start = function() {
		animate();
	}
}

function init() {
	if(Game.init()){
		Game.start();
	}
}
