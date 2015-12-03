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

	var coordinates = initArray(coordinatesLength); 

	var x = startCoordinates;
	var xa = startCoordinates;
	var xb = startCoordinates;
	var y = startCoordinates;
	var ya = startCoordinates;
	var yb = startCoordinates;
	var cnt1 = 0;
	var cnt2 = 0;

	for(var j=0; j<=inputString.length; j++) { 
		// check if passed by this coordinate before
		if(coordinates[x][y]===undefined) {
			// increase count when passed through coordinate for the first time
			cnt1++;
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

	// recreate a blank array
	coordinates = initArray(coordinatesLength);
	
	// loop through input
	for(var j=0; j<=inputString.length; j++) {
		// solution part 2:
		// if the string position is odd, move the first marker, else move the second marker 
		if(isOdd(j)) {
			if(coordinates[xa][ya]===undefined) {
				// increase count when passed through coordinate for the first time
				cnt2++;
				// initialize this coordinate
				coordinates[xa][ya] = 1;
			} else {
				// increase the value at this coordinate
				coordinates[xa][ya]++;
			}
			// move array index based on input
			switch(inputString.charAt(j)) {
				case "<" : xa--; break;
				case ">" : xa++; break;
				case "^" : ya++; break;
				case "v" : ya--; break;
			}
		} else {
			if(coordinates[xb][yb]===undefined) {
				// increase count when passed through coordinate for the first time
				cnt2++;
				// initialize this coordinate
				coordinates[xb][yb] = 1;
			} else {
				// increase the value at this coordinate
				coordinates[xb][yb]++;
			}
			// move array index based on input
			switch(inputString.charAt(j)) {
				case "<" : xb--; break;
				case ">" : xb++; break;
				case "^" : yb++; break;
				case "v" : yb--; break;
			}
		}
	}
	
	document.getElementById("aoc-output-container").innerHTML = "<p>In conditions of part 1 <strong>"+ cnt1 +"</strong> coordinates were passed at least once<br>";
	document.getElementById("aoc-output-container").innerHTML += "In conditions of part 2 <strong>"+ cnt2 +"</strong> coordinates were passed at least once<br>";

}

function initArray(len) {
	var ar = Array(len);
	for(var i=0; i<ar.length; i++)
		ar[i] = Array(len);
	return ar;
}

function isOdd(x) {
	if(x%2==1)
		return true;
	else
		return false;
}