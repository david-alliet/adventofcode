function solve(inputString) {

	// instructions object with functionality for parsing instructions
	var Instruction = {
		raw: "",
		command: "",
		xCoordStart: 0,
		yCoordStart: 0,
		xCoordEnd: 0,
		yCoordEnd: 0,

		parse: function(s) {
			var l=0;
			var p1;
			this.raw = s;
			// break string up at commas
			var p = s.split(",");
			if(p.length===1) { 
				console.log("error parsing instruction "+ s);
				return false;
			} else {
				// command is everything left from right-most space of p[0]
				l = parseInt(p[0].trim().lastIndexOf(" "), 10);
				this.command = p[0].substr(0, l).trim();
				// xCoordStart is everything right from right-most space of p[0]
				this.xCoordStart = parseInt(p[0].substr(l, p[0].length).trim(), 10);
				// yCoordStart is everything left from left-most space of p[1]
				p1 = p[1].split(" ");
				this.yCoordStart = parseInt(p1[0], 10);
				// xCoordEnd is everything right from right-most space of p[1]
				this.xCoordEnd = parseInt(p1[2], 10);
				// yCoordEnd is p[2]
				this.yCoordEnd = parseInt(p[2].trim(), 10);
			}
		}
	};	

	// lights object with array of lights and functionality to control them
	var Lights = {
		list: [],
		onCount: 0,
		brightness: 0,

		init: function(len) {
			this.list = Array(len);
			for(var i=0; i<len; i++) {
				this.list[i] = Array(len);

				for(var j=0; j<len; j++) 
					this.list[i][j] = { "on": false, "brightness": 0 };
			}
		},

		turnOn: function(xStart, yStart, xEnd, yEnd) {
			for(var i=xStart; i<=xEnd; i++) {
				for(var j=yStart; j<=yEnd; j++) {
					// part 1: switch on? 
					if(this.list[i][j].on===false) {
						this.list[i][j].on = true;
						this.onCount++;
					}

					// part 2: increase brightness:
					this.list[i][j].brightness++;
					this.brightness++;
				}
			}
		}, 

		turnOff: function(xStart, yStart, xEnd, yEnd) {
			for(var i=xStart; i<=xEnd; i++) {
				for(var j=yStart; j<=yEnd; j++) {
					// part 1: turn off
					if(this.list[i][j].on===true) {
						this.list[i][j].on = false;
						this.onCount--;
					}

					// part 2: decrease brightness
					if(this.list[i][j].brightness>0) {
						this.list[i][j].brightness--;
						this.brightness--;
					}
				}
			}
		}, 

		toggle: function(xStart, yStart, xEnd, yEnd) {
			for(var i=xStart; i<=xEnd; i++) {
				for(var j=yStart; j<=yEnd; j++) {
					// part 1: actual toggle
					if(this.list[i][j].on===true) {
						this.list[i][j].on = false;
						this.onCount--;
					} else {
						this.list[i][j].on = true;
						this.onCount++;
					}

					// part 2: increase brightness by 2
					this.list[i][j].brightness+=2;
					this.brightness+=2;
				}
			}
		}
	};

	// create instance of lights object
	var lights = Object.create(Lights);
	lights.init(1000);

	// break string into array
	var instructions = inputString.split("\n");
	var instr;

	// loop through array to analyze each instruction
	for(var i=0; i<instructions.length; i++) {

		// make instance of Instructions object 
		instr = Object.create(Instruction);
		// parse instruction
		if(instr.parse(instructions[i])!==false) {
			// apply instruction to lights
			switch(instr.command) {
				case "turn on": lights.turnOn(instr.xCoordStart, instr.yCoordStart, instr.xCoordEnd, instr.yCoordEnd); break;
				case "turn off": lights.turnOff(instr.xCoordStart, instr.yCoordStart, instr.xCoordEnd, instr.yCoordEnd); break;
				case "toggle": lights.toggle(instr.xCoordStart, instr.yCoordStart, instr.xCoordEnd, instr.yCoordEnd); break;
			}
		}
	}


	document.getElementById("aoc-output-container").innerHTML = "<p>";
	document.getElementById("aoc-output-container").innerHTML += "Total lights on: <strong>"+ lights.onCount +"</strong></p>";
	document.getElementById("aoc-output-container").innerHTML += "Total brightness: <strong>"+ lights.brightness +"</strong></p>";
	document.getElementById("aoc-output-container").innerHTML += "</p>";



}


function initArray(len) {
	
}

