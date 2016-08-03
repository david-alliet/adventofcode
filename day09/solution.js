/*
	Solution:
	* generate all permutations of the cities in the instructions
	* calculate total distance of each permutation
	* sort distances
*/

var cities = [];
var distances = [];

function solve(inputString)  {

	cities = [];
	distances = [];

	inputString = inputString.trim();
	distances = inputString.split("\n");
	var line = "";

	// loop through lines, clean up, build list of unique cities in instructions
	for(var i=0; i<distances.length; i++) {
		line = distances[i].split(" ");
		line.splice(1, 1);
		line.splice(2, 1);
		line[2] = parseInt(line[2]);
		distances[i] = line;
		// build list of cities:
		addCity(distances[i][0]);
		addCity(distances[i][1]);
	}

	// implement some form of permutations solution
	var p = [];
	var allroutes = permutate(cities.length, cities, p);

	console.log(allroutes);
	allroutes.sort();

	document.getElementById("aoc-output-container").innerHTML = "<p>";
	document.getElementById("aoc-output-container").innerHTML += "Solution part 1: <strong>"+ allroutes[0] +"</strong><br>";
	document.getElementById("aoc-output-container").innerHTML += "Solution part 2: <strong>"+ allroutes[allroutes.length-1] +"</strong><br>";
	document.getElementById("aoc-output-container").innerHTML += "</p>";
}


// checks if a city is in the list of cities
function addCity(c) {
	for(var i=0; i<cities.length; i++){
		if(cities[i] == c) return true;
	}
	cities.push(c);
	return false;
}


// Heap's algorithm (recursive)
function permutate(n, list, output){
	var t;
	if(n===1) {
		// calculate total distance of this route and push to output
		d = calcDistance(list);
		output.push(d);
		//output.push(calcDistance(list));
	} else {
		for(var i=0; i<n-1; i++) {
			permutate(n-1, list, output);
			if(n%2===0) {
				t = list[i];
				list[i] = list[n-1];
				list[n-1] = t;
			} else {
				t = list[0];
				list[0] = list[n-1];
				list[n-1] = t;
			}
		}
		permutate(n-1, list, output);
	}
	//console.log(output);
	return output;
}


// calculate distance from given list
function calcDistance(route) {

	//console.log(route);

	// loop over route
	var distance = 0;

	for(var i=0; i<route.length-1; i++) {
		for(var j=0; j<distances.length; j++) {
			if(route[i]==distances[j][0] && route[i+1] == distances[j][1]) {
				distance += distances[j][2];
			} else if(route[i+1]==distances[j][0] && route[i] == distances[j][1]) {
				distance += distances[j][2];
			}
		}
	}

	//console.log(distance);
	return distance;

}
