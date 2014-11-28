module.exports = (function (my) {
  my.chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  my.encode = function(i){
    if (i === 0) {return '0';}
    var s = '';
    while (i > 0) {
      s = this.chars[i % 62] + s;
      i = Math.floor(i/62);
    }
    return s;
  };
  my.decode = function(a,b,c,d){
    for (
      b = c = (
        a === (/\W|_|^$/.test(a += "") || a)
      ) - 1;
      d = a.charCodeAt(c++);
    )
    b = b * 62 + d - [, 48, 29, 87][d >> 5];
    return b;
  };

  return my;
}({}));
