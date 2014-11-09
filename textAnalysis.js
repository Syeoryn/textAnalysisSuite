var countWords = function(text){
  var words = text.match(/\w+['-']*\w*/g);
  return words ? words.length : 0;
}

module.exports = {
  countWords: countWords,
}
