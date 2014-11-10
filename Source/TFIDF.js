var nGrams = require('./nGrams.js');

var countTermFrequencies = function(text, options){
  var tokenLength = options ? options.tokenLength || 1 : 1;
  var nGramList =  nGrams.buildNGrams(text, tokenLength);
  return nGrams.listNGramsByCount(nGramList);
}

var storeTermFrequencies = function(TF, TFStorage){
  TFStorage = TFStorage || {};
  for(var count in TF){
    for(var i = 0; i < TF[count].length; i++){
      var word = TF[count][i];
      if(word in TFStorage) TFStorage[word] += +count;
      else TFStorage[word] = +count;
    }
  }
  return TFStorage;
}

var normalizeTermFrequencies = function(TF, TFStorage){
  var IDF = {};
  for(var count in TF){
    for(var i = 0; i < TF[count].length; i++){
      var word = TF[count][i];
      IDF[word] = +(count / TFStorage[word]).toFixed(4);
    }
  }

  return IDF;
}

module.exports = {
  countTermFrequencies: countTermFrequencies,
  storeTermFrequencies: storeTermFrequencies,
  normalizeTermFrequencies: normalizeTermFrequencies,
}
