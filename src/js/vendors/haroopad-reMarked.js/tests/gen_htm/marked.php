<?php
	if (!empty($_POST['markup'])) {
		$markup = json_decode($_POST['markup']);
		$name = $_POST['name'];
		$fp = fopen("../md_htm/marked/{$name}.md.htm", 'w');
		fwrite($fp, $markup);
		fclose($fp);
		exit;
	}
?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>marked.js gen</title>
	<script src="../vendor/jquery-1.8.3.min.js"></script>
	<script src="../vendor/marked.js"></script>
	<script src="../bootstrap.js"></script>
	<script>
		$(document).ready(function(){
			$.each(list, function(i, v) {
				$.get('../md_src/' + v + '.md', function(data) {
					$.post("marked.php", {name: v, markup: JSON.stringify(marked(data))});
				});
			});
		});
	</script>
</head>
<body>
</body>
</html>