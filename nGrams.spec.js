var expect = require('chai').expect;
var nGrams = require('./nGrams.js');

describe('The buildNGrams method', function(){
  it('should work on an empty string', function(){
    var emptyGrams = nGrams.buildNGrams('', 1);
    expect(emptyGrams).to.be(null);
  });

  it('should be able to build unigrams', function(){
    var unigrams = nGrams.buildNGrams('Hello world!', 1});
    expect(unigrams).to.deep.equal({ hello: 1, world: 1 });
  });

  it('should be able to build nGrams with punctuation', function(){
    var unigrams = nGrams.buildNGrams('Hello, world.  How are you?', 1, {includePunctuation: true});
    expect(unigrams).to.deep.equal({ hello: 1, world: 1, '.': 1, how: 1, are: 1, you: 1, '?': 1});
  });

  it('should be able to build case sensitive nGrams', function(){
    var unigrams = nGrams.buildNGrams('Hello World! Hello world!', 1, {caseSensitive: true});
    expect(unigrams).to.deep.equal({ Hello: { World: 1, world: 1 }})
  });

  it('should be able to build nGrams of arbitrary length', function(){
    var bigrams = nGrams.buildNGrams("How are you doing today?", 2);
    expect(bigrams).to.deep.equal({ how: { are: 1 }, are: { you: 1 }, you: { doing: 1 }, doing: { today: 1 }});
    var trigrams = nGrams.buildNGrams("How are you doing today?", 3);
    expect(trigrams).to.deep.equal({ "how are": { you: 1 }, "are you": { doing: 1 }, "you doing": { today: 1 }});
    var quadrigram = nGrams.buildNGrams("How are you doing today?", 4);
    expect(quadrigrams).to.deep.equal({ "how are you": { doing: 1 }, "are you doing": { today: 1 }});
    var quintigrams = nGrams.buildNGrams("How are you doing today", 5)
    expect(quintigrams).to.deep.equal({"how are you doing": { today: 1 }});
  });

  it('should not build nGrams greater than the length of the input text', function(){
    var trigrams = nGrams.buildNGrams("Hello, world", 3);
    expect(trigrams).to.equal(null);
  });
});

describe('The listAllNGrams method', function(){
  it('should work for an empty set of nGrams', function(){
    var emptyGrams = nGrams.buildNGrams("", 2);
    var allNGrams = nGrams.listAllNGrams(emptyGrams);
    expect(allNGrams).to.deep.equal([]);
  });

  it('should return a list of all nGrams, given an input set of nGrams', function(){
    var bigrams = nGrams.buildNGrams("Hello, world!  Goodbye, world!", 2);
    var allNGrams = nGrams.listAllNGrams(bigrams);
    expect(allNGrams).to.deep.equal(["hello world", "goodbye world"]);
  });
});

describe('The getNGramsByFrequency method', function(){
  it('should work for an empty set of nGrams', function(){
    var emptyGrams = nGrams.buildNGrams("", 2);
    var twiceGrams = nGrams.getNGramsByFrequency(emptyGrams, 2);
    expect(twiceGrams).to.deep.equal([]);
  });

  it('should return all nGrams that appear the input number of times', function(){
    var bigrams = nGrams.buildNGrams("Hello world!  How are you?  Hello world!", 2);
    var twiceGrams = nGrams.getNGramsByFrequency(bigrams, 2);
    expect(twiceGrams).to.deep.equal(["hello world"]);
  });

  it('should work when there are no matching nGrams', function(){
    var bigrams = nGrams.buildNGrams("Hello world!  Goodbye world!", 2);
    var commonNGrams = nGrams.getNGramsByFrequency(bigrams, 5);
    expect(commonNGrams).to.deep.equal([]);
  });
});

describe('The getMostCommonNGrams method', function(){
  it('should work for an empty set of nGrams', function(){
    var emptyGrams = nGrams.buildNGrams("", 2);
    var commonGrams = nGrams.getMostCommonNGrams(emptyGrams, 2);
    expect(commonGrams).to.deep.equal([]);
  });

  it('should return the most common nGram when there is only one most frequent nGram.', function(){
    var bigrams = nGrams.buildNGrams("Hello world!  How are you?  Hello world!", 2);
    var commonNGrams = nGrams.getMostCommonNGrams(bigrams);
    expect(commonNGrams).to.deep.equal(["hello world"]);
  });

  it('should return a list of the most common nGrams when there are multiple.', function(){
    var bigrams = nGrams.buildNGrams("Hello world!  Goodbye world!", 2, {includePunctuation: false});
    var commonNGrams = nGrams.getMostCommonNGrams(bigrams);
    expect(commonNGrams).to.deep.equal(["hello world", "goodbye world"]);
  });
});
