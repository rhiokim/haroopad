var path = {
  extname: function(str) {
    var ext, sts;
    str = str || '';
    sts = str.split('.');

    return sts.length <= 1 ? '' : '.'+ sts[sts.length-1];
  }
};