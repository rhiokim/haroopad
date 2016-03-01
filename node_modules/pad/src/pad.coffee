
module.exports = (string, size, char=' ') ->
  if typeof string is 'number'
    _size = size
    size = string
    string = _size
  string = string.toString()
  pad = ''
  size = size - string.length
  for i in [0 ... size]
    pad += char
  if _size
  then pad + string
  else string + pad
