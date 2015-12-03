function calculate(inputString) {
	// create 2 dimensional array, max size -> string.length +1
	var coordinatesLength = (inputString.length*2)+1
	var startCoordinates = Math.floor(coordinatesLength/2);

	/* the following method of creating arrays is way too slow:, probably because of the combination of map and apply
	// this line creates an empty aray of a given length
	var coordinates = Array.apply(null, Array(coordinatesLength).map( function(){} ));
	// make it multidimensional: 
	for(var i=0; i<coordinates.length; i++) {
		coordinates[i] = Array.apply(null, Array(coordinatesLength).map( function(){} ));
	}
	*/

	var coordinates = Array(coordinatesLength);
	for(var i=0; i<coordinates.length; i++)
		coordinates[i] = Array(coordinatesLength);

	var x = startCoordinates;
	var y = startCoordinates;
	var cnt = 0;

	
	// loop through input
	for(var j=0; j<=inputString.length; j++) {
		// check if passed by this coordinate before
		if(coordinates[x][y]===undefined) {
			// increase count when passed through coordinate for the first time
			cnt++;
			// initialize this coordinate
			coordinates[x][y] = 1;
		} else {
			// increase the value at this coordinate
			coordinates[x][y]++;
		}
		// move array index based on input
		switch(inputString.charAt(j)) {
			case "<" : x--; break;
			case ">" : x++; break;
			case "^" : y++; break;
			case "v" : y--; break;
		}
	}
	
	document.getElementById("aoc-output-container").innerHTML = "<p><strong>"+ cnt +"</strong> coordinates were passed at least once</p>";

}