// Array.prototype.reduce is part of ECMA-262 5th edition,
// so if the browser doesn't support it, it will with this code:
if ( 'function' !== typeof Array.prototype.reduce ) {
  Array.prototype.reduce = function( callback /*, initialValue*/ ) {
    'use strict';
    if ( null === this || 'undefined' === typeof this ) {
      throw new TypeError(
         'Array.prototype.reduce called on null or undefined' );
    }
    if ( 'function' !== typeof callback ) {
      throw new TypeError( callback + ' is not a function' );
    }
    var t = Object( this ), len = t.length >>> 0, k = 0, value;
    if ( arguments.length >= 2 ) {
      value = arguments[1];
    } else {
      while ( k < len && ! k in t ) k++;
      if ( k >= len )
        throw new TypeError('Reduce of empty array with no initial value');
      value = t[ k++ ];
    }
    for ( ; k < len ; k++ ) {
      if ( k in t ) {
         value = callback( value, t[k], k, t );
      }
    }
    return value;
  };
}

/**
 * Torto
 * =====
 *
 * A Javascript implementation of a Unscrumble game.
 *
 * @author Rafael BSIDES Pereira <github.com/bsides/torto>
 */
var Torto = (function($) {

  // Instance vars
  var _instance, _game;
  // Other / Utility vars
  var anagram     = {}
  , possibleWords = "tropa,trapo,parto,topar,prato,potra,optar,porta,rapto,toar,apto,rota,rato,pato,apor,proa,tora,taro,paro,tapo,apto,roa,tao,ator,por,pao"
  , accepted      = {}
  , defaultConfig = {
      words: possibleWords.split(",")
    };

  function init(config) {
    conf = $.extend( {}, defaultConfig, config );
    _game = new Game(conf);

    /** Public methods **/
    return {
      /**
       * Return a visual representation of the board
       * @returns {jQuery} Game table
       */
      start: _game.buildGUI,

      /**
       * Reset the game board.
       */
      reset: _game.resetGUI,

      /**
       * Check if the word properly in the array of acceptable words
       */
      check: _game.check,

      // Debugging
      echo: _game.config.words,

     }
   }

  function Game(config) {
    this.config = config;

    return this;
  }

  Game.prototype = {
    // Build the General User Interface
    buildGUI: function() {
      console.log('Interface is being built');
      console.log('Interface building has been completed');
    },
    // Reset the whole game and interface
    resetGUI: function() {
      console.log('Game has reseted');
    },
    // Solve the words
    check: function(word) {
      console.log('Checking if the word exist in the array of anagrams');

      // Populate anagram hash with possible words separated by hash
      var words = conf.words;
      populate(words);

      // Check if the word exist
      if (checkWord(word)) {
        console.log('The word indeed exists');
      } else {
        console.log('The word doesn\'t exist in the database of anagrams');
      }

    }
  };

  function sortCharArray(word) {
    return word.split("").sort().join("");
  };

  function populate(words) {
    // Reducing to a single value
    words.reduce(function (previousValue, currentValue, index, array) {
      // Sort the word in alphabetical letter order
      var sortedFirst = sortCharArray(previousValue);
      var sortedSecond = sortCharArray(currentValue);
      // If they have the same value, they are in the same anagram
      if (sortedFirst === sortedSecond) {
        var anagrams = anagram[sortedFirst];
        if (anagrams && anagrams.indexOf(currentValue) < 0) {
          anagram[sortedFirst] = (anagrams + ',' + currentValue);
        } else {
          anagram[sortedFirst] = previousValue + ','+ currentValue;
        }
      }
      return currentValue;
    });
  }

  function checkWord(searchWord) {
    // Make the word being found ordered alphabetically,
    // to check against the anagram hash
    var keyToSearch = sortCharArray(searchWord);
    // If it is inside the anagram hash, it's found!
    if (anagram.hasOwnProperty(keyToSearch)) {
      var anagrams = anagram[keyToSearch];
      console.log(anagrams.split(',').length + ' anagrams has been found for the word:' +  searchWord);
      console.log('They are: ' + anagrams);
      return true;
    } else {
      console.log('No anagrams has been found for the word: ' + searchWord);
      return false;
    }
  }

  return {
    /**
    * Get the singleton instance. Only one instance is allowed.
    * The method will either create an instance or will return
    * the already existing instance.
    *
    * @param {[type]} config [description]
    * @returns {[type]} [description]
    */
    getInstance: function( config ) {
      // if ( !_instance ) {
        _instance = init( config );
      // }
      return _instance;
    }
};
})(jQuery);
$(function () {
  // Start our game
  game = Torto.getInstance();
  game.start();
  game.check('porta');
  game.check('porto');
});

