var sol1 = "";
var sol2 = "";

function calculate(inputString) {
	
	var solution1 = new XMLHttpRequest();
	var solution2 = new XMLHttpRequest();

	// function that processes php response
	solution1.onload = resolveRequest;
	solution2.onload = resolveRequest;

	solution1.open("GET", "solution1.php?input="+ inputString, true); 
	solution1.send();

	solution2.open("GET", "solution2.php?input="+ inputString, true); 
	solution2.send();

	document.getElementById("aoc-output-container").innerHTML = "";
}

function resolveRequest(e){
	console.log("start loading");
	console.log(this);
	if (this.readyState === XMLHttpRequest.DONE) {
		if (this.status === 200) {
			document.getElementById("aoc-output-container").innerHTML += "<strong>" + this.responseText +"</strong><br>";
		} else {
			console.log('There was a problem with the request.');
		}
	}
	
}