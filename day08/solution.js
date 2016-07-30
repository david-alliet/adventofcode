/* possible way to solve this:



*/

function solve(inputString)  {

	/*  regular expressions (doesn't work :( )
	// keep a raw version of the string
	var raw = inputString;
	var clean = inputString;

	raw = raw.replace(/(\n)+/g, "");
	console.log("Raw string length: "+ raw.length);
	console.log(raw);
	// remove all double quote characters and new line combinations:
	clean = clean.replace(/("\n")+/g, "");
	// remove leading and trailing double quote
	clean = clean.substring(1, clean.length-1);
	// remove slash double quotes:
	clean = clean.replace(/(\\{1})("{1})+/g, "Q");
	// remove double slashes:
	clean = clean.replace(/(\\)(\\{1})+/g, "S");
	// remove hex
	clean = clean.replace(/(\\x[0-9a-f]{2})+/g, "H");
	*/

	// part 1:
	var raw = inputString.replace(/(\n)+/g, "");
	var lines = inputString.split("\n");
	var clean1 = "";

	for(var i=0; i<lines.length; i++) {
		clean1 += eval(lines[i]);
	}

	// part 2:
	var clean2 = "";
	var cleaned = "";
	for(i=0; i<lines.length; i++) {
		cleaned = lines[i].replace(/(\\)/g, "\\\\");
		clean2 += cleaned.replace(/(")/g, "\\\"");
	}
	console.log(clean2);


	document.getElementById("aoc-output-container").innerHTML = "<p>";
	document.getElementById("aoc-output-container").innerHTML += "Solution part 1: <strong>"+ (raw.length-clean1.length) +"</strong><br>";
	document.getElementById("aoc-output-container").innerHTML += "Solution part 2: <strong>"+ ((clean2.length - raw.length)+(lines.length*2))  +"</strong><br>";
	document.getElementById("aoc-output-container").innerHTML += "</p>";
}
