var mainState = {
	preload: function(){ //opening paragraph
		//will load my chocobo drawn png file
		//hopefully can eventually change this into a gif of
		//the two pics i drew (T_T)
		game.load.image('chocobo', 'assets/chocobo.png')
		game.load.image('block', 'assets/block.png')
		game.load.image('bullet', 'assets/bullet.png')
	},
	create: function(){
		
		game.stage.backgroundColor='#71c5cf'; //using hexacolor code for blue sky
	
		//call a physics object into start system method
		//starts up the physics structure to program
		game.physics.startSystem(Phaser.Physics.ARCADE);

		//Displays the chocobo at position x=100 and y=245
		this.chocobo = game.add.sprite(100, 245, 'chocobo');

		//The chocobo needs physics
		//api physics.arcade helps movements, gravity, collisions...
		game.physics.arcade.enable(this.chocobo);

		//how does body fall?
		this.chocobo.body.gravity.y = 1000; 

		//input button from user lets chocobo flap upward
		var spaceKey = game.input.keyboard.addKey(
						Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.add(this.jump, this);

		
		//input rightarrowkey to shoot
		var rightArrowKey = game.input.keyboard.addKey(
						Phaser.Keyboard.RIGHT);
		rightArrowKey.onDown.add(this.shoot, this);

		this.blocks = game.add.group(); //make a group for the blocks

		this.timer = game.time.events.loop(1500, this.addRowOfBlocks, this);
		// every 1500 or 1.5seconds, blocks created

		this.score = 0;
		this.labelScore = game.add.text(20, 20, "0",
							{font: "26px Arial", fill: "#ffffff"});
	},
	update: function(){
		//fail the user for moving too high or too low
		if ( this.chocobo.y < 0 || this.chocobo.y > 400 ){
			this.restartGame();
		}
		game.physics.arcade.overlap(
			this.chocobo, this.blocks, this.restartGame, null, this);

		//game.physics.arcade.overlap(
		//	this.bullet, this.blocks, /*this.methodToRemoveBlock*/, null, this);

	},
	//we need to define a jump function so the chocobo jumps
	jump: function(){
		this.chocobo.body.velocity.y = -350;
	},
	//we also need to have a reset game
	restartGame: function() {
		//start the main state which just restarts the game.
		game.state.start('main');
	},
	addOneBlock: function(x, y){
		//set a block variable at point x,y
		var block = game.add.sprite(x, y, 'block');
	
		//add this block to our block group
		this.blocks.add(block);

		//let physics do its thing on the block
		game.physics.arcade.enable(block);

		//so once physics is on, you want to set the velocity of 
		//the blocks to approach the direction of chocobo
		block.body.velocity.x = -300;

		// once BLOCK is no longer visible to the left, KILL IT
		block.checkWorldBounds = true;//check
		block.outOfBoundsKill = true;//kill
	},
	addRowOfBlocks: function() {
		var hole = Math.floor(Math.random()*5) +1; //random num between 1-5
		for(var i=0; i<8; i++){

			if((i != hole) && (i != hole+1)){
				this.addOneBlock(400, i*60 + 10); 				
			}

		}
		
		this.score += 1;
		this.labelScore.text = this.score;
	},
	shoot: function(){
		this.bullet = game.add.sprite(this.chocobo.x+100, this.chocobo.y + 40, 'bullet');

		//note physics.arcade helps movements, gravity, collisions...
		game.physics.arcade.enable(this.bullet);

		//how does bullet fall?
		this.bullet.body.gravity.x = 100; 

		this.bullet.body.velocity.x = 500;
	}

};

//making a main phaser game with dimensions of 400 by 400
var game =  new Phaser.Game(400, 400);

game.state.add('main', mainState); //you're taking mainState var and
								   //turning into 'main' for later reference


game.state.start('main');	

