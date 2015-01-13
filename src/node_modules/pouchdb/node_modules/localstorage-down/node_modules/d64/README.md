# d64

a copy-pastable, url friendly, ascii embeddable, lexiographicly sortable binary encoding.

## Example

``` js
var d64  = require('d64')

var buf  = new Buffer([0x01, 0x23, 0x45, 0x67, 0x89, 0xab])
var str  = d64.encode(binary)
var buf2 = d64.decode(string)
```

## Encoding binary as base 64 ascii

There is already a well described base64 encoding [[1]]
but it has some downsides, base 64 encoded are not lexiographically sortable,
because the ascii characters do not have the same ordering as they unencoded
bytes they encode. Consistent ordering is very useful when building database
which needs sorting in an enviroment where a binary key is not possible
(for example, in indexeddb or levelup[[2]] in the browser)

Also, it's simplest if all the characters used do not need to be encoded in
common text inputs, such as URLs, or the shell. Finally, some of the 
non-alphanumeric characters may  trigger line breaks in a textarea,
which can make the encoded string ambigious.

There are other encodings which have addressed some of these issues,
such as hex and base32[[1]], base58[[3]].
base16 or base32 expand the message more than necessary,
and since base58 does not line up with a whole number of bits,
then the implementation is not simple, and requires big integers.

There are also other interesting encodings such as zbase32 [[4]] or proquints [[5]]
which are optimized for human transmission (recognition and pronouncability).

d64 is optimized for being easy to implement, fast to encode/decode,
and that a collection of encoded strings should have the same bytewise ordering
as they would unencoded.

the 64 characters, in ascending order, are `.` (full stop) `0-9` (the digits),
`A-Z` (the capital letters), `_` (underscore), `a-z` (the lowercase letters).

``` js
var chars = '.0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz'
```

## Justification for choice of characters

There are only 62 alphanumeric characters, so we need to pick two more.
first, lets find the characters which can be used in URLs without escaping them.

``` js
var sensible = '!@#$%^&*(){}?+|_"<>\',-.'
  .split('').sort().map(encodeURIComponent)
  .filter(function (e) { return e.length ==1 })
  .join('')
```

the non-encoded characters are `!'()*-._~`

`_` is an obvious choice, because it's very nearly always a valid character
within a variable name, so it's treated like a aphabetic character in most cases.

It's better not to choose `!` and `~`, because they are the first and last printable
characters, so they are quite useful for delimiting strings while maintaining the sorting
properties - for instance strings of d64.

`!` and `~` are commonly used in levelup[[2]], and that is one of the target applications for d64.

`-` causes text areas to line wrap, so that is out.

`'*()` are all significant in bash.

that leaves just `.`
It feels weird to use `.` as a value, but all the other choices have been eliminated.

## Invalid encoded lengths

d64 does not use any padding at the end, as in base64.
(there are no suitable characters left, anyway) the string length mod 4
a d64 string encodes is always 2, 3, or 0. If the length % 4 is 1,
that means there is 6 bits overhanging which is invalid.

For characters which overhang the byte array, (i.e. the last character if length % 4 == 2 or 3)
the overhanging portion must encode 0 bits.

`if length % 4 == 2` then 4 bits overhang, the valid characters are: `.FVK`
`if length % 4 == 3` then 2 bits overhang, the valid characters are: `.37BFJNRVZcgkosw`

``` js
var overhang2bits = chars.split('').filter(function (_, i) { return !(i&0xf) }).join('')
// ==> .FVK
var overhang4bits = chars.split('').filter(function (_, i) { return !(i&0x3) }).join('')
// ==> .37BFJNRVZcgkosw
```

Although everything is for a reason and carefully described, that doesn't mean inventing
your own encoding isn't a douchebag thing to do, but hey - everyone else does it!

## References

1. <http://www.rfc-base.org/txt/rfc-3548.txt>
2. <https://github.com/rvagg/node-levelup>
3. <http://search.cpan.org/~miyagawa/Encode-Base58-0.01/lib/Encode/Base58.pm>
4. <http://search.cpan.org/~gwyn/Convert-zBase32-0.0201/lib/Convert/zBase32.pm>
5. <http://arxiv.org/html/0901.4016>

## License

MIT

***

[1]: http://www.rfc-base.org/txt/rfc-3548.txt
[2]: https://github.com/rvagg/node-levelup
[3]: http://search.cpan.org/~miyagawa/Encode-Base58-0.01/lib/Encode/Base58.pm
[4]: http://search.cpan.org/~gwyn/Convert-zBase32-0.0201/lib/Convert/zBase32.pm
[5]: http://arxiv.org/html/0901.4016

