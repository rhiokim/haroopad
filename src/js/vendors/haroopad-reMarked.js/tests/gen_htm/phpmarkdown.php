<?php

require "../vendor/markdown.php";

$dir = '../md_src';
foreach (new DirectoryIterator($dir) as $file) {
	if ($file->isDot()) continue;

	$name = $file->getFilename();
	$guts = file_get_contents($dir . '/' . $name);

	$fp = fopen("../md_htm/phpmarkdown/{$name}.htm", 'w');
	fwrite($fp, Markdown($guts));
	fclose($fp);
}
