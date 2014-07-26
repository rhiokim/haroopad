module.exports.verifyNotFoundError = function verifyNotFoundError (err) {
  return (/NotFound/i).test(err.message)
}

module.exports.isTypedArray = function isTypedArray (value) {
  return value instanceof ArrayBuffer || value instanceof Uint8Array
}