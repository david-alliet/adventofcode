/*
	Solution:
	*
*/

function solve(inputString)  {

	var sequence1 = inputString.trim();
	var sequence2 = inputString.trim();

	for(var i=0; i<40; i++) {
		//console.log(sequence);
		sequence1 = looksay(sequence1);
	}

	for(var j=0; j<50; j++) {
		sequence2 = looksay(sequence2);
	}
	//console.log(sequence);

	document.getElementById("aoc-output-container").innerHTML = "<p>";
	document.getElementById("aoc-output-container").innerHTML += "Solution part 1: <strong>"+ sequence1.length +"</strong><br>";
	document.getElementById("aoc-output-container").innerHTML += "Solution part 2: <strong>"+ sequence2.length +"</strong><br>";
	document.getElementById("aoc-output-container").innerHTML += "</p>";
}

function looksay(s) {
	s = ""+s;
	//console.log(s);
	var repeat = false, repeatCount, seq = "";
	//for(var i=0; i<s.length; i++){
	var i = 0;
	while(i<s.length) {

		// look for repeating characters
		repeatCount = 1;
		repeat = true;

		while(repeat) {
			if(s[i] == s[i+repeatCount])
				repeatCount++;
			else
				repeat = false;
		}
		seq += repeatCount + "" + s[i];
		i += repeatCount;
	}
	return seq;
}
