/* possible way to solve this:

	eval() will solve part one, but only chumps use eval
	use regular expressions !

*/

function solve(inputString)  {

	/*  regular expressions */

	// part 1:
	var raw = inputString.replace(/(\n)+/g, "");
	var lines = inputString.split("\n");

	var clean1 = inputString;
	// remove all double quote characters and new line combinations:
	clean1 = clean1.replace(/("\n")+/g, "");
	// remove leading and trailing double quote
	clean1 = clean1.substring(1, clean1.length-1);
	// remove slash double quotes:
	clean1 = clean1.replace(/(\\")/g, "Q");
	// remove double slashes:
	clean1 = clean1.replace(/(\\\\)/g, "S");
	// remove hex
	clean1 = clean1.replace(/(\\x[0-9a-f]{2})/g, "H");


	// part 2:
	var clean2 = "";
	var cleaned = "";
	for(i=0; i<lines.length; i++) {
		cleaned = lines[i].replace(/(\\)/g, "\\\\");
		clean2 += cleaned.replace(/(")/g, "\\\"");
	}
	//console.log(clean2);


	document.getElementById("aoc-output-container").innerHTML = "<p>";
	document.getElementById("aoc-output-container").innerHTML += "Solution part 1: <strong>"+ (raw.length-clean1.length) +"</strong><br>";
	document.getElementById("aoc-output-container").innerHTML += "Solution part 2: <strong>"+ ((clean2.length - raw.length)+(lines.length*2))  +"</strong><br>";
	document.getElementById("aoc-output-container").innerHTML += "</p>";
}
