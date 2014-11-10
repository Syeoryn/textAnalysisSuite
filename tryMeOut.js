var textAnalysis = require('./Source/textAnalysis.js');
var nGrams = require('./Source/nGrams.js');
var TFIDF = require('./Source/TFIDF.js');

var TFStorage = {};

process.stdin.setEncoding('utf8');

process.stdin.on('data', function(data){
  var simpleAnalysis = textAnalysis.analyzeText(data);
  var bigramsSet = nGrams.buildNGrams(data, 2);
  var bigramList = nGrams.listNGramsByCount(bigramsSet);
  var commonBigrams = nGrams.getMostCommonNGrams(bigramsSet);
  var printableBigrams = '';
  for(var i = 0; i < commonBigrams.length; i++){
    printableBigrams += '"' + commonBigrams[i] + '"';
    if(i < commonBigrams.length - 1) printableBigrams += ', ';
  }

  var TFIDFAnalysis = TFIDF.fullTFIDFAnalysis(data, {TFStorage: TFStorage});
  var printableUniques = '';
  for(var i = 0; i < TFIDFAnalysis.mostUniqueTerms.length; i++){
    printableUniques += '"' + TFIDFAnalysis.mostUniqueTerms[i] + '"';
    if(i < TFIDFAnalysis.mostUniqueTerms.length - 1) printableUniques += ', ';
  }

  process.stdout.write('\n\n================RAW DATA================\n');
  process.stdout.write('nSimple analysis\n' + JSON.stringify(simpleAnalysis) + '\n\n');
  process.stdout.write('nBigrams\n' + JSON.stringify(bigramList) + '\n\n');
  process.stdout.write('nTFIDF\n' + JSON.stringify(TFIDFAnalysis) + '\n\n');
  process.stdout.write('\n\n================INTERPRETED DATA================\n');
  process.stdout.write('Word Count: ' + simpleAnalysis.wordCount + '\n');
  process.stdout.write('Sentence Count: ' + simpleAnalysis.sentenceCount + '\n');
  process.stdout.write('Paragraph Count: ' + simpleAnalysis.paragraphCount + '\n');
  process.stdout.write('Estimated Reading Time: ' + simpleAnalysis.estimatedReadingTime + ' minute\n');
  process.stdout.write('Most Common Bigrams: ' + printableBigrams + '\n');
  process.stdout.write('Most Unique Terms: ' + printableUniques + '\n');
  process.stdout.write('\n\n================END================\n\n\n\n');
});
