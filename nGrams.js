var buildNGrams = function(text, unit, options){
  unit = unit || 1;
  options = options || {};
  var nGrams = {};
  if(!text.length) return nGrams;
  if(!options.caseSensitive) text = text.toLowerCase();
  if(options.includePunctuation){
    var sentenceSplitter = new RegExp('[^\.\?!;]+[\.\?!;]', 'g')
  } else {
    var sentenceSplitter = new RegExp('[^.?!;]+', 'g');
  }
  // split text into a list of sentenceList
  var sentenceList = text.match(sentenceSplitter);
  // strip punctuation from the sentenceList and separate by word
  for(var i = 0; i < sentenceList.length; i++){
    if(options.includePunctuation) {
      sentenceList[i] = sentenceList[i].replace(/([\?\.!;])/, ' $1');
    }
    sentenceList[i] = sentenceList[i].replace(/([^\w]*-[^\w])+|[\s,:]+/g, ' ')
                                     .replace(/^\s/, '')
                                     .split(/\s+/g);
  }

  for(var sentence = 0; sentence < sentenceList.length; sentence++){
    for(var word = 0; word < sentenceList[sentence].length - unit + 1; word++){
      var start = '';
      for(var gramLength = 0; gramLength < unit - 1; gramLength++){
        start += sentenceList[sentence][word + gramLength] + ' ';
      }
      // remove trailing space
      start = start.slice(0, start.length - 1);
      var end = sentenceList[sentence][word + unit - 1];
      if(unit === 1){
        var bucket = nGrams;
      } else {
        if( !(start in nGrams) ){
          nGrams[start] = {};
        }
        var bucket = nGrams[start];
      }
      if(end in bucket){
        bucket[end]++;
      } else {
        bucket[end] = 1;
      }
    }
  }
  return nGrams;
}

module.exports = {
  buildNGrams: buildNGrams,
}
