var countWords = function(text){
  var words = text.match(/\w+['-']*\w*/g);
  return words ? words.length : 0;
}

var countSentences = function(text){
  var sentences = text.match(/[^.!?]+/g);
  return sentences ? sentences.length : 0;
}

module.exports = {
  countWords: countWords,
  countSentences: countSentences,
}
