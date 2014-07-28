module.exports.verifyNotFoundError = function verifyNotFoundError (err) {
  return (/NotFound/i).test(err.message)
}

module.exports.isTypedArray = function isTypedArray (value) {
  return (typeof ArrayBuffer != 'undefined' && value instanceof ArrayBuffer)
      || (typeof Uint8Array != 'undefined' && value instanceof Uint8Array)
}
