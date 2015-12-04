<?php

	$input = $_GET["input"];
	$hashed = md5($input);
	$cnt = 0;

	while(substr($hashed, 0, 5)!=="00000") {
		$cnt+=1;
		$hashed = md5($input.$cnt);
	}

	print $cnt;

?>