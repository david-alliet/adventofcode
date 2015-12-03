String.prototype.countValue = function(config){
	var totalValue = 0;
	var currentPosition = 0;
	var foundValueAtPosition = 0;
	var valueFound = false;

	// loop through the entire string
	for(var i=0; i<this.length; i++) {
		currentPosition++;
		
		// loop through the character array from config to count the total value of the string
		for(var j=0; j<config.characters.length; j++){
			// if the character matches a configured character, add the value to the total value of the string
			if(this[i]==config.characters[j].character) 
				totalValue += config.characters[j].value;
		}

		// check if the configured search value is found
		if(!valueFound && totalValue==config.searchvalue) {
			valueFound = true;
			foundValueAtPosition = currentPosition;
		}
	}

	return {
		"totalvalue": totalValue,
		"foundposition": valueFound ? foundValueAtPosition : valueFound
	};
};

function calculate (searchString) {
	// create a JSON object with the configuration for the value search
	var config = {
		"characters": [
			{
				"character": "(",
				"value": 1
			},
			{
				"character": ")",
				"value": -1
			}
		],
		"searchvalue": -1
	};
	
	var result = searchString.countValue(config);
	document.getElementById("aoc-output-container").innerHTML = "";
	document.getElementById("aoc-output-container").innerHTML += "<p>";
	document.getElementById("aoc-output-container").innerHTML += "Total value of string: <strong>"+ result.totalvalue +"</strong><br>";
	if(result.foundposition===false)
		document.getElementById("aoc-output-container").innerHTML += "String did not reach value "+ config.searchvalue;
	else 
		document.getElementById("aoc-output-container").innerHTML += "Value "+ config.searchvalue +" reached at position: <strong>"+ result.foundposition +"</strong>";
	document.getElementById("aoc-output-container").innerHTML += "</p>";
}	