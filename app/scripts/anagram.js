var AnagramStringMiningExample = function () {

/* Author: Dennis Baughn
*  This has also been posted at:
*  http://stackoverflow.com/questions/909449/anagrams-finder-in-javascript/5642437#5642437

*  Free, private members of the closure and anonymous, innner function
*  We will be building a hashtable for anagrams found, with the key
*  being the alphabetical char sort (see sortCharArray())
*  that the anagrams all have in common.
*/
    var dHash = {};

    var sortCharArray = function(word) {
        return word.split("").sort().join("");
    };

/* End free, private members for the closure and anonymous, innner function */

/* This goes through the dictionary entries.
 *  finds the anagrams (if any) for each word,
 *  and then populates them in the hashtable.
 *  Everything strictly local gets de-allocated
 *  so as not to pollute the closure with 'junk DNA'.
*/
    (function() {
       /* 'dictionary' referring to English dictionary entries. For a real
        *  English language dictionary, we could be looking at 20,000+ words, so
        *  an array instead of a string would be needed.
        */
       var dictionaryEntries = "buddy,pan,nap,toot,toto,anestri,asterin,eranist,nastier,ratines,resiant,restain,retains,retinas,retsina,sainter,stainer,starnie,stearin";
       /* This could probably be refactored better.
        * It creates the actual hashtable entries. */
       var populateDictionaryHash = function(keyword, newWord) {
          var anagrams = dHash[keyword];
          if (anagrams && anagrams.indexOf(newWord) < 0)
            dHash[keyword] = (anagrams+','+newWord);
          else dHash[keyword] = newWord;
       };

       var words = dictionaryEntries.split(",");

       /* Old School answer, brute force
       for (var i = words.length - 1; i >= 0; i--) {
        var firstWord = words[i];
        var sortedFirst = sortCharArray(firstWord);
        for (var k = words.length - 1; k >= 0; k--) {
               var secondWord = words[k];
           if (i === k) continue;
            var sortedSecond = sortCharArray(secondWord);
            if (sortedFirst === sortedSecond)
                       populateDictionaryHash(sortedFirst, secondWord);
        }
       }/*

        /*Better Method for JS, using JS Array.reduce(callback) with scope binding on callback function */
        words.reduce(function (prev, cur, index, array) {
            var sortedFirst = this.sortCharArray(prev);
            var sortedSecond = this.sortCharArray(cur);
            if (sortedFirst === sortedSecond) {
                var anagrams = this.dHash[sortedFirst];
                if (anagrams && anagrams.indexOf(cur) < 0)
                   this.dHash[sortedFirst] = (anagrams + ',' + cur);
                else
                   this.dHash[sortedFirst] = prev + ','+ cur;
            }
            return cur;
        }.bind(this));
    }());

    /* return in a nice, tightly-scoped closure the actual function
     *  to search for any anagrams for searchword provided in args and render results.
    */
    return function(searchWord) {
       var keyToSearch = sortCharArray(searchWord);
       document.writeln('<p>');
       if (dHash.hasOwnProperty(keyToSearch)) {
        var anagrams = dHash[keyToSearch];
        document.writeln(searchWord + ' is part of a collection of '+anagrams.split(',').length+' anagrams: ' + anagrams+'.');
       } else document.writeln(searchWord + ' does not have anagrams.');
       document.writeln('<\/p>');
    };
};
var checkForAnagrams = new AnagramStringMiningExample();
checkForAnagrams('toot');
checkForAnagrams('pan');
checkForAnagrams('retinas');
checkForAnagrams('buddy');
