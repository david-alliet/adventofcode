function calculate(inputString) {
	// break string into seperate lines
	var valuesList = inputString.split("\n");
	var totalValueFormula1 = 0;
	var totalValueFormula2 = 0;
	for(var i=0; i<valuesList.length; i++) {
		// break lines into seperate values
		valuesList[i] = valuesList[i].split("x");

		// find the smallest value
		// javascript sort method wont work out of the box because it sorts based on unicode
		// javascript sort method can be extended with a compare function method (see mdn)
		valuesList[i].sort(function(a, b){ return a-b; });
		
		// calculate values: (x*y) + 2(x*y) + 2(x*z) + 2(y*z)
		// providing the values are sorted small to large
		totalValueFormula1 += valuesList[i][0]*valuesList[i][1] + 2*valuesList[i][0]*valuesList[i][1] + 2*valuesList[i][0]*valuesList[i][2] + 2*valuesList[i][1]*valuesList[i][2];
		totalValueFormula2 += (2*valuesList[i][0]) + (2*valuesList[i][1]) + (valuesList[i][0]*valuesList[i][1]*valuesList[i][2]);
	}
	document.getElementById("aoc-output-container").innerHTML = "<p>";
	document.getElementById("aoc-output-container").innerHTML += "The total calculated amount for part 1 is <strong>" + totalValueFormula1 + "</strong><br>";
	document.getElementById("aoc-output-container").innerHTML += "The total calculated amount for part 2 is <strong>" + totalValueFormula2 + "</strong>";
	document.getElementById("aoc-output-container").innerHTML += "</p>";
}