var expect = require('chai').expect;
var textAnalysis = require('./textAnalysis.js');

describe('The countWords method', function(){
  it('should work on an empty string', function(){
    var wordCount = textAnalysis.countWords('');
    expect(wordCount).to.equal(0);
  });
  it('should count the number of words in a string without punctuation', function(){
    var wordCount = textAnalysis.countWords("This is test number one")
    expect(wordCount).to.equal(5);
    var biggerWordCount = textAnalysis.countWords("Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum")
    expect(biggerWordCount).to.equal(69);
  });

  it('should not count punctuation or whitespace in the word count', function(){
    var wordCount = textAnalysis.countWords("This is another text.    ");
    expect(wordCount).to.equal(4);
    var nextWordCount = textAnalysis.countWords("And now, for another test!  With more puncuation - you know, the kind that can 'get in the way'!")
    expect(nextWordCount).to.equal(17);
  });

  it('should count numbers as words', function(){
    var wordCount = textAnalysis.countWords("There are 7 words in this string.");
    expect(wordCount).to.equal(7);
  });
});

describe('The countSentences method', function(){
  it('should work on an empty string', function(){
    var sentenceCount = textAnalysis.countSentences('');
    expect(sentenceCount).to.equal(0);
  });

  it('should count the number of sentences in a string', function(){
    var sentenceCount = textAnalysis.countParagraphs("This is a test.  Just a test?  Yes! Just a test; and semicolons can't get in my way!!!")
    expect(sentenceCount).to.equal(4)
  });
});

describe('The countParagraphs method', function(){
  it('should work on an empty string', function(){
    var paragraphCount = textAnalysis.countParagraphs('');
    expect(paragraphCount).to.equal(0);
  });

  it('should count the number of paragraphs in a string', function(){
    var paragraphCount = textAnalysis.countParagraphs('Hello, World. \n\n Goodbye, World.');
    expect(paragraphCount).to.equal(2);
  });
});

describe('The estimateReadingTime method', function(){
  it('should calculate the estimated reading time of a string', function(){
    var text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
    var time = textAnalysis.estimateReadingTime(text);
    expect(time).to.equal(2);
    var timeWithInputSpeed = textAnalysis.estimateReadingTime(text, 450);
    expect(timeWithInputSpeed).to.equal(1);
  });
});

describe('The analyzeText method', function(){
  it('should generate a report on the input string, including the metrics tested above.', function(){
    var text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    var analysis = textAnalysis.analyzeText(text);
    expect(analysis).to.have.property('wordCount');
    expect(analysis).to.have.property('sentenceCount');
    expect(analysis).to.have.property('paragraphCount');
    expect(analysis).to.have.property('estimatedReadingTime');
    expect(analysis).to.have.property('readingSpeed');
    expect(analysis).to.have.property('tags');
  });
});

describe('The addTags method', function(){
  it('should add tags to an analysis object', function(){
    var text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    var analysis = textAnalysis.analyzeText(text);
    textAnalysis.addTags(analysis, ['test']);
    expect(textAnalysis.tags).to.deep.equal(['test']);
  });
});
