var nGrams = require('./nGrams.js');

var countTermFrequencies = function(text, options){
  var tokenLength = options ? options.tokenLength || 1 : 1;
  var nGramList =  nGrams.buildNGrams(text, tokenLength);
  return nGrams.listNGramsByCount(nGramList);
}

module.exports = {
  countTermFrequencies: countTermFrequencies,
}
