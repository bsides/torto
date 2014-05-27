/**
 * Torto
 * =====
 *
 * A Javascript implementation of a Unscrumble game.
 *
 * @author Rafael BSIDES Pereira <github.com/bsides/torto>
 */
 var Torto = (function($) {

  var _instance
  , _game
  , anagram       = 'aptro'
  , possibleWords = [
  'tropa', 'trapo', 'parto', 'topar', 'prato', 'potra', 'optar', 'porta', 'rapto', 'toar', 'apto', 'rota', 'rato', 'pato', 'apor', 'proa', 'tora', 'taro', 'paro', 'tapo'
  ]
  , otherWords = "tropa,trapo,parto,topar,prato,potra,optar,porta,rapto,toar,apto,rota,rato,pato,apor,proa,tora,taro,paro,tapo,apto,roa,tao,ator,por,pao"
  , accepted      = []
  , defaultConfig = {
    difficulty: 'easy'
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
    check: function(words) {
      console.log('Checking if the word exist in the array');
      for (var i in words) {

      }
    }
  };

  function sortCharArray(word) {
    return word.split("").sort().join("");
  };

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
    if ( !_instance ) {
      _instance = init( config );
    }
    return _instance;
  }
};
})(jQuery);
$(function () {
  // Start our game
  game = Torto.getInstance();
  game.start();
});





var checkAnagram = (function ($) {

  var dHash = {},
      dictionaryEntries = "tropa,trapo,parto,topar,prato,potra,optar,porta,rapto,toar,apto,rota,rato,pato,apor,proa,tora,taro,paro,tapo,apto,roa,tao,ator,por,pao";

  var populateDictionaryHash = function(keyword, newWord) {
    var anagrams = dHash[keyword];
    if (anagrams && anagrams.indexOf(newWord) < 0)
      dHash[keyword] = (anagrams+','+newWord);
    else dHash[keyword] = newWord;
  };

  var words = dictionaryEntries.split(",");

  function sortCharArray(word) {
    if (typeof word !== 'undefined') {
      return word.split("").sort().join("");
    }
  }

  words.reduce(function (prev, cur, index, array) {
    var sortedFirst = sortCharArray(prev);
    var sortedSecond = sortCharArray(cur);
    if (sortedFirst === sortedSecond) {
      var anagrams = dHash[sortedFirst];
      if (anagrams && anagrams.indexOf(cur) < 0)
        dHash[sortedFirst] = (anagrams + ',' + cur);
      else
        dHash[sortedFirst] = prev + ','+ cur;
    }
    return cur;
  })

  return function(searchWord) {
    var keyToSearch = sortCharArray(searchWord);
    document.writeln('<p>');
    if (dHash.hasOwnProperty(keyToSearch)) {
      var anagrams = dHash[keyToSearch];
      document.writeln(searchWord + ' is part of a collection of '+anagrams.split(',').length+' anagrams: ' + anagrams+'.');
    } else {
      document.writeln(searchWord + ' does not have anagrams.');
      document.writeln('<\/p>');
    }
  }
})(jQuery);

checkAnagram('toot');
checkAnagram('pan');
checkAnagram('retinas');
checkAnagram('buddy');

