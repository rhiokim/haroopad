<?php
	if (!empty($_POST['markdn'])) {
		$markdn = json_decode($_POST['markdn']);
		$name = $_POST['name'];
		$fp = fopen("../htm_md/reMarked/{$name}.htm.md", 'w');
		fwrite($fp, $markdn);
		fclose($fp);
		exit;
	}
?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>marked.js gen</title>
	<script src="../vendor/jquery-1.8.3.min.js"></script>
	<script src="../../reMarked.js"></script>
	<script src="../bootstrap.js"></script>
	<script>
		$(document).ready(function(){
			$.each(list, function(i, v) {
				$.get('../md_htm/marked/' + v + '.md.htm', function(data) {
					var opts = {};
					var reMarker = new reMarked(opts);
					var markdown = reMarker.render(data);
					$.post("", {name: v, markdn: JSON.stringify(markdown)});
				});
			});
		});
	</script>
</head>
<body>
</body>
</html>