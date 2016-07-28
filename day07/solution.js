/* possible way to solve this:

- build a list of nodes (each node is a connection)
- store the nodes in an array with the node name as key
- object as value of array element with key:
	- instruction related to that node
	- solved value
*/

var nodes = {};

function solve(inputString)  {

	// array containing all lines in instruction set
	var instructions = inputString.split("\n");

	// loop through lines
	for(var i=0; i<instructions.length; i++) {
		// parse instruction:
		parse(instructions[i]);
	}

	//console.log(nodes);

	// part one: get signal on wire a.
	var sa = getSignalOnNode("a");

	document.getElementById("aoc-output-container").innerHTML = "<p>";
	document.getElementById("aoc-output-container").innerHTML += "Solution part 1: <strong>"+ sa +"</strong><br>";

	// part two: reset wires, override signal on wire b with value of wire a and recalculate wire a
	for(i=0; i<instructions.length; i++) {
		parse(instructions[i]);
	}
	nodes.b.signal = sa;
	var sb = getSignalOnNode("a");

	document.getElementById("aoc-output-container").innerHTML += "Solution part 1: <strong>"+ sb  +"</strong><br>";
	document.getElementById("aoc-output-container").innerHTML += "</p>";



}

function getSignalOnNode(n) {

	//console.log("Reading signal on node "+ n);

	var s1, s2;

	if(nodes[n].signal===undefined) {
		// no signal detected: calculate signal using connected nodes and operator

		// read signals on connected nodes
		if(nodes[n].n1!==undefined){
			if(!isNaN(parseInt(nodes[n].n1, 10))) {
				s1 = nodes[n].n1;
			} else {
				s1 = getSignalOnNode(nodes[n].n1);
			}
		}
		if(nodes[n].n2!==undefined){
			if(!isNaN(parseInt(nodes[n].n2, 10))) {
				s2 = nodes[n].n2;
			} else {
				s2 = getSignalOnNode(nodes[n].n2);
			}
		}
		// calculate signal on nodes
		switch(nodes[n].operator) {
			case "AND":
				nodes[n].signal = s1 & s2;
				break;

			case "OR":
				nodes[n].signal = s1 | s2;
				break;

			case "NOT":
				nodes[n].signal = ~ s1;
				break;

			case "LSHIFT":
				nodes[n].signal = s1 << nodes[n].parameter;
				break;

			case "RSHIFT":
				nodes[n].signal = s1 >> nodes[n].parameter;
				break;

			default:
				nodes[n].signal = s1;
		}
	}

	return nodes[n].signal;

}

// takes an instruction string and converts it to its components
function parse (instr) {

	var d, k, signal, operator, param, nodeRef1, nodeRef2;

	// logic for parsing instruction:
	// split by spaces:
	d = instr.split(" ");
	if(d.length===1) {
		console.log("error parsing instruction "+ s);
		return false;
	} else {
		// output wire = last element in array
		k = d.pop();
		// remove ->
		d.pop();
		if(d.length===1) {

			if(isNaN(parseInt(d[0], 10))) {
				nodeRef1 = d[0];
			} else {
				signal = d[0];
			}

		} else if(d.length===2) {
			// instruction is NOT input -> output
			operator = d[0];
			nodeRef1 = d[1];
		} else {
			// Instruction is AND, OR, LSHIFT, RSHIFT
			// if AND or OR: two wires input
			if(d[1]==="AND" || d[1]==="OR") {
				nodeRef1 = d[0];
				nodeRef2 = d[2];
				operator = d[1];
			} else {
				nodeRef1 = d[0];
				operator = d[1];
				param = d[2];
			}
			// if LSHIFT or RSHIFT, second wire is actually an extra instructions

		}

		nodes[k] = {
			'signal': signal,
			'n1': nodeRef1,
			'n2': nodeRef2,
			'operator': operator,
			'parameter': param
		};
	}

}
