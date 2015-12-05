function solve(inputString) {
	
	var stringList = inputString.split("\n");
	var niceCount = 0;

	document.getElementById("aoc-output-container").innerHTML = "<p>";
	
	// Solve part 1:
	for(var i=0; i<stringList.length; i++) {
		if(evaluateStringConditions1(stringList[i]))
			niceCount++;
	}
	document.getElementById("aoc-output-container").innerHTML += "Number of strings matching conditions from part 1: <strong>"+ niceCount +"</strong><br>";
	
	// solve part 2?
	niceCount = 0;
	for(var j=0; j<stringList.length; j++) {
		if(evaluateStringConditions2(stringList[j]))
			niceCount++;
	}
	document.getElementById("aoc-output-container").innerHTML += "Number of strings matching conditions from part 2: <strong>"+ niceCount +"</strong></p>";
	document.getElementById("aoc-output-container").innerHTML += "</p>";
}

function evaluateStringConditions2(s) {
	
	var doubleFound = false;
	var repeatFound = false;
	var q = "";
	
	// loop through entire string:
	for(var i=0; i<s.length; i++) {
		
		// repeat of two consecutive characters ?
		if(i<s.length-1) {
			q = s.charAt(i)+""+s.charAt(i+1);
			if(s.indexOf(q, i+2, s.length)!==-1) repeatFound = true;
		}

		// repeat of a character with one other in between?
		if(i<s.length-2) {
			if(s.charAt(i)===s.charAt(i+2))
				doubleFound = true;
		}
	}

	if(repeatFound && doubleFound) return true;
}

function evaluateStringConditions1(s) {

	var vowelCount = 0;
	var doubleChar = false;

	// does not contain "ab", "cd", "pq" or "xy";
	if(s.indexOf("ab")!==-1 || s.indexOf("cd")!==-1 || s.indexOf("pq")!==-1 || s.indexOf("xy")!==-1) 
		return false;
	else {

		// loop through string to check the other conditions:
		for(var i=0; i<s.length; i++) {
			if(isVowel(s.charAt(i))) {
				vowelCount++;
			}

			if(i!=s.length-1) {
				if (s.charAt(i)==s.charAt(i+1))
					doubleChar = true;
			}
		}

		if(vowelCount>=3 && doubleChar) 
			return true;
		else 
			return false;
	}

}

function isVowel(s) {
	switch(s) {
		case "a": return true; 
		case "e": return true; 
		case "i": return true; 
		case "o": return true; 
		case "u": return true; 
		default: return false; 
	}
}