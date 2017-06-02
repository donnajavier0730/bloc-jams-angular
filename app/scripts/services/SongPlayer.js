(function() {
  function SongPlayer(Fixtures) {
    var SongPlayer = {};

    var currentAlbum = Fixtures.getAlbum();

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
           SongPlayer.currentSong.playing = null;
       }

       currentBuzzObject = new buzz.sound(song.audioUrl, {
           formats: ['mp3'],
           preload: true
       });

       SongPlayer.currentSong = song;
     };

     var getSongIndex = function(song) {
       return currentAlbum.songs.indexOf(song);
     };

     /**
     * @desc Active song object from list of songs
     * @type {Object}
     */

     SongPlayer.currentSong = null;
/**
* @function play
* @desc plays a  song and loads new audio file as currentBuzzObject
* @param {Object} song
* @returns {Number}
*/

    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
         setSong(song);
         currentBuzzObject.play();
         song.playing = true;
       } else if (SongPlayer.currentSong === song) {
           if (currentBuzzObject.isPaused()) {
               currentBuzzObject.play();
           }
       }
     };


    /**
    * @function pause
    * @desc pause current song
    * @param {Object} song
    */
     SongPlayer.pause = function(song) {
       song = song || SongPlayer.currentSong;
       currentBuzzObject.pause();
       song.playing = false;
     };



     /**
     * @function previous
     * @desc go to previous song
     *
     */

     SongPlayer.previous = function() {
        var currentSongIndex = getSongIndex(SongPlayer.currentSong);
        currentSongIndex--;

        if (currentSongIndex < 0) {
          currentBuzzObject.stop();
          SongPlayer.currentSong.playing = null;
        } else {
           var song = currentAlbum.songs[currentSongIndex];
           setSong(song);
           currentBuzzObject.play();
          //  playSong(song);
        }
     };

// assignment -8
     SongPlayer.next = function() {
       var stopSong = function () {
         currentBuzzObject.stop();
         song.playing = null;
       };
       var currentSongIndex = getSongIndex(SongPlayer.currentSong);
       currentSongIndex++;

       if (currentSongIndex < 0) {
         currentBuzzObject.stop();
         SongPlayer.currentSong.playing = null;
       } else {
          var song = currentAlbum.songs[currentSongIndex];
          setSong(song);
          currentBuzzObject.play();
         //  playSong(song);
       }
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
    .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
