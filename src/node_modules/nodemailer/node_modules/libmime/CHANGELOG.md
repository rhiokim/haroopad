# Changelog

## v0.1.6 2014-10-25

Fixed an issue with `encodeWords` where a trailing space was invalidly included in a word if the word
ended with an non-ascii character.

## v0.1.5 2014-09-12

Do not use quotes for continuation encoded filename parts. Fixes an issue with Gmail where the Gmail webmail keeps the charset as part of the filename.