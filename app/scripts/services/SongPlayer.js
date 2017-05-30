(function() {
  function SongPlayer() {
    var SongPlayer = {};

    var currentSong = null;
 /**
 * @desc Buzz object audio file
 * @type {Object}
 */
     var currentBuzzObject = null;

 /**
  * @function setSong
  * @desc Stops currently playing song and loads new audio file as currentBuzzObject
  * @param {Object} song
  * @returns {Number}
  */
     var setSong = function(song) {
       if (currentBuzzObject) {
           currentBuzzObject.stop();
           currentSong.playing = null;
       }
       
       currentBuzzObject = new buzz.sound(song.audioUrl, {
           formats: ['mp3'],
           preload: true
       });

       currentSong = song;
     };

/**
* @function play
* @desc plays a  song and loads new audio file as currentBuzzObject
* @param {Object} song
* @returns {Number}
*/

    SongPlayer.play = function(song) {
      if (currentSong !== song) {
         setSong(song);
         currentBuzzObject.play();
         song.playing = true;
       } else if (currentSong === song) {
           if (currentBuzzObject.isPaused()) {
               currentBuzzObject.play();
           }
       }
     };

/**
* @function pause
* @desc pause a song
* @param {Object} song
*/
     SongPlayer.pause = function(song) {
       currentBuzzObject.pause();
       song.playing = false;
     };

// Assignment checkpoint 7
     SongPlayer.playsong = function(song) {
       currentBuzzObject.play();
       song.playing = true;
     };
// end Assignment

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();
