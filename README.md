####Features:
  * Text analysis module:
    * countWords
    * countSentences
    * countParagraphs
    * estimateReadingTime
    * analyzeText
    * addTags
  * nGram analysis module:
    * buildNGrams
    * listAllNGrams
    * getNGramsByFrequency
    * getMostCommonNGrams
    * listNGramsByCount
  * TFIDF module:
    * countTermFrequencies
    * storeTermFrequencies
    * normalizeTermFrequencies
    * identifyUniqueTerms

####Feature Descriptions:
  * Text Analysis
    * countWords: function(text)
      * Counts the total number of words in the input text.  Assumes words are separated by any whitespace, commas (,), colons (:), semicolons (;), periods (.), question marks (?), exclamation marks (!), or ellipses (...), but not by apostrophes (‘) or hyphens (-).
      * Example:
      ```
      countWords(“Hello, world! How’s the weather?”)  // returns 5
      ```
    * countSentences: function(text)
      * Counts the total number of sentences in the input text.  Assumes sentences are separated by periods (.), question marks (?), exclamation marks(!), or ellipses (...).
      * Example:
      ```
      countSentences(“Hello, world! How’s the weather?”)  // returns 2
      ```
    * countParagraphs: function(text)
      * Counts the total number of paragraphs in the input text.  Assumes paragraphs are separated by new lines (\n).
      * Example:
      ```
      countParagraphs(“Hello, world! How’s the weather?”)  // returns 1
      ```
    * estimateReadingTime: function(text [, readingSpeed])
      * Estimates the time required to read the input text, returning the number of minutes required to read the text, rounding up to the nearest minute.  Uses either the input readingSpeed (a number in words per minute) or the US average reading speed of 250 wpm.
      * Example:
      ```
      estimateReadingTime(“Hello, world! How’s the weather?”, 300)  // returns 1
      ```
    * analyzeText: function(text [, options])
      * Performs all the above text analyses, returning an object with the results of each analysis.
      * Options currently include readingSpeed, tags, and autoTag.
      * Example:
      ```
      analyzeText(“Hello, world!  How’s the weather?”, {readingSpeed: 300, tags: [‘test’, ‘HelloWorld’], autoTag: false})
         // returns 
           {text: “Hello, world!  How’s the weather?”,
            wordCount: 5,
            sentenceCount: 2,
            paragraphCount: 1,
            estimatedReadingTime: 1,
            readingSpeed: 300,
            tags: [‘test’, ‘HelloWorld’]
           }
      ```
    * addTags: function(analysis, tags)
      * Adds tags to the input analysis object

  * nGram Analysis
    * buildNGrams: function(text, unit [, options])
      * Maps all nGrams within input text with input unit length (1=unigram, 2=bigram, 3=trigram, ...) 
      * In constructing the nGram, terminal sentence punctuation (such as periods, question marks, and exclamation marks) and semicolons are considered words, as they also carry meaning.  Apostrophes and compound word hyphens are ignored.  To signify the end of a paragraph or body of text, null will be used.
      * Options include caseSensitive and includePunctuation.
        * If includePunctuation is set to false, then terminal sentence punctuation and the end of the body of text are not included in the nGram.
        * Both caseSensitive and includePunctuation both default to false.
      * Example:
      ```
        buildNGrams(“Hello, World!  How’s the world weather today? Hello, World!”, 2, {caseSensitive: true, includePunctuation: true})
        // returns { Hello: { ,: 2 },
                     ,: { World: 2 },
                     World: { !: 2 },
                     !: { How’s: 1, null: 1},
                     How’s: { the: 1 },
                     the: { world: 1 },
                     world: { weather: 1 },
                     weather: { today: 1 },
                     today: { ?: 1 },
                     ?: { Hello: 1 }
                   }
      ```
    * listAllNGrams: function(nGrams)
      * Given an input set of nGrams (of the same format as the buildNGrams output), listAllNGrams will return a list of unique nGrams found in the text.
      * Example:
      ```
        // Example input nGram for “Hello World.  Goodbye World!”, without punctuation
        listAllNGrams({ Hello: { World: 1 }, Goodbye: { world: 1 }})
        // returns [“hello world”, “goodbye world”]
      ```
    * getNGramsByFrequency: function(nGrams, frequency)
      * Given an input set of nGrams (of the same format as the buildNGrams output), getNGramsByFrequency will return a list of all nGrams that occur that many times.
      * Example:
      ```
        // Example input nGram for “Hello World”, without punctuation
        getNGramsByFrequency({ hello: { world: 1 }, 1)
        // returns [ “hello world”]
      ```
    * getMostCommonNGrams: function(nGrams)
      * Given an input set of nGrams (of the same format as the buildNGrams output), getMostCommonNGrams will return a list of the most common nGrams.
      * Example:
      ```
        // Example input nGram for “Hello World!  Goodbye World!”, with punctuation
        getMostCommonNGrams({ Hello: { World: 1 }, World: { !: 2 }, !: { Goodbye: 1, null: 1 }, Goodbye: { world: 1 }})
        // returns [“World!”]
      ```
    * listNGramsByCount: function(nGrams)
      * Given an input set of nGrams (of the same format as the buildNGrams output), listNGramsByCount will return all nGrams sorted into buckets by count.
      * Example:
      ```
        // Example input for “Hello, World!  How’s the weather?  Goodbye, World!”
        listNGramsByCount({ hello: 1, world: 2, “how’s”: 1, the: 1, weather: 1, goodbye: 1})
        // returns { 1: [“hello”, “how’s”, “the”, “weather”, “goodbye”], 2: [“world”]}
      ```

  * Term Frequency - Inverse Document Frequency (TFIDF) Module:
    * countTermFrequencies: function(text [, options])
      * Counts the number of times each token appears in the input text.
      * Current options include tokenLength, which dictates the number of words that comprise each token.  tokenLength defaults to 1.
      * Depends on nGrams module, which can get all tokens with arbitrary length.
    * storeTermFrequencies: function(tokenSet, TFStorage)
      * Adds the tokenSet to the collectionStorage for improved analysis over time.
      * It’s recommended to save this collection in a persistent data store, although this is unnecessary.
      * If collectionStorage is not provided, it will create it as an object and return that object.
    * normalizeTermFrequencies: function(tokenSet, TFStorage)
      * For each token in tokenSet, normalizeTermFrequencies will divide its count by the total number found in TFStorage and return the token set with normalized counts.
    * identifyUniqueTerms: function(normalizedTokenSet [, options])
      * From the input normalizedTokenSet, identifyUniqueTerms will return the most unique tokens, as defined by the highest TFIDF
      * Current options include uniqueThreshold.  If specified, identifyUniqueTerms will return all terms with a TFIDF equal to or greater than the uniqueThreshold
