var expect = require('chai').expect;
var TFIDF = require('../Source/TFIDF.js');

describe('The countTermFrequencies method', function(){
  it('should generate a list of terms sorted by their frequency for unigrams', function(){
    var list = TFIDF.countTermFrequencies("Apple orange pizza apple");
    expect(list).to.deep.equal({ 1: ['orange', 'pizza'], 2: ['apple']});
  });

  it('should generate a list of terms sorted by their frequency for bigrams', function(){
    var list = TFIDF.countTermFrequencies("Apple orange pizza apple", {tokenLength: 2});
    expect(list).to.deep.equal({1: ['apple orange', 'orange pizza', 'pizza apple']});
  });
});

describe('The storeTermFrequencies method', function(){
  it('should add the termFrequencies to the term frequency storage', function(){
    var TFStorage = {};
    var list = TFIDF.countTermFrequencies("Apple orange pizza apple");
    TFIDF.storeTermFrequencies(list, TFStorage);
    expect(TFStorage).to.deep.equal({ apple: 2, orange: 1, pizza: 1});
    TFIDF.storeTermFrequencies(list, TFStorage);
    expect(TFStorage).to.deep.equal({ apple: 4, orange: 2, pizza: 2});
  });

  it('should return the new storage object', function(){
    var list = TFIDF.countTermFrequencies("Apple orange pizza apple");
    var storage = TFIDF.storeTermFrequencies(list);
    expect(storage).to.deep.equal({ apple: 2, orange: 1, pizza: 1});
  });
});

describe('The normalizeTermFrequencies method', function(){
  it('should normalize term frequency counts based on the current term frequency storage counts', function(){
    var TFStorage = {};
    var list = TFIDF.countTermFrequencies("Apple orange pizza apple");
    TFIDF.storeTermFrequencies(list, TFStorage);
    var IDF = TFIDF.normalizeTermFrequencies(list, TFStorage);
    expect(IDF).to.deep.equal({apple: 1, orange: 1, pizza: 1});

    var secondList = TFIDF.countTermFrequencies("Apple orange pizza peach");
    TFIDF.storeTermFrequencies(secondList, TFStorage);
    var secondIDF = TFIDF.normalizeTermFrequencies(secondList, TFStorage);
    expect(secondIDF).to.deep.equal({ apple: 0.3333 , orange: 0.5000, pizza: 0.5000, peach: 1.0000});
  });
});

describe('The identifyUniqueTerms method', function(){
  it('should identify the most unique term from the normalized set of terms', function(){
    var TFStorage = {};

    var list = TFIDF.countTermFrequencies("Apple orange pizza apple");
    TFIDF.storeTermFrequencies(list, TFStorage);
    var IDF = TFIDF.normalizeTermFrequencies(list, TFStorage);

    var secondList = TFIDF.countTermFrequencies("Apple orange pizza peach");
    TFIDF.storeTermFrequencies(secondList, TFStorage);
    var secondIDF = TFIDF.normalizeTermFrequencies(secondList, TFStorage);

    var mostUnique = TFIDF.identifyUniqueTerms(secondIDF);
    expect(mostUnique).to.deep.equal(['peach']);
  });

  it('should return a list of most unique terms when there is a tie', function(){
    var TFStorage = {};

    var list = TFIDF.countTermFrequencies("Apple orange pizza apple");
    TFIDF.storeTermFrequencies(list, TFStorage);
    var IDF = TFIDF.normalizeTermFrequencies(list, TFStorage);

    var secondList = TFIDF.countTermFrequencies("Apple orange pizza");
    TFIDF.storeTermFrequencies(secondList, TFStorage);
    var secondIDF = TFIDF.normalizeTermFrequencies(secondList, TFStorage);

    var mostUnique = TFIDF.identifyUniqueTerms(secondIDF);
    expect(mostUnique).to.deep.equal(['orange', 'pizza']);
  });

  it('should identify all unique terms based on the optional uniqueThreshold input', function(){
    var TFStorage = {};

    var list = TFIDF.countTermFrequencies("Apple orange pizza apple");
    TFIDF.storeTermFrequencies(list, TFStorage);
    var IDF = TFIDF.normalizeTermFrequencies(list, TFStorage);

    var secondList = TFIDF.countTermFrequencies("Apple orange pizza peach");
    TFIDF.storeTermFrequencies(secondList, TFStorage);
    var secondIDF = TFIDF.normalizeTermFrequencies(secondList, TFStorage);

    var mostUniqueTerms = TFIDF.identifyUniqueTerms(secondIDF, {uniqueThreshold: 0.5});
    expect(mostUniqueTerms).to.deep.equal({orange: 0.5000, pizza: 0.5000, peach: 1.0000});
  });
});

describe('The fullTFIDFAnalysis method', function(){
  it('should perform the above analyses on the input text', function(){
    var analysis = TFIDF.fullTFIDFAnalysis("Apple orange pizza pizza");
    expect(analysis.frequencyCount).to.deep.equal({1: ['apple', 'orange'], 2: ['pizza']});
    expect(analysis.TFStorage).to.deep.equal({apple: 1, orange: 1, pizza: 2});
    expect(analysis.IDF).to.deep.equal({apple: 1.0000, orange: 1.0000, pizza: 1.0000});
    expect(analysis.mostUniqueTerm).to.deep.equal(['apple', 'orange', 'pizza']);
  });
});
