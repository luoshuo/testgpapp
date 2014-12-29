/**
 * 
 * Cordova / Phonegap Video Player Plugin
 * Adnan Basar 2013
 *
 */

var VPlayer = function() {};
            
VPlayer.prototype.show = function(content, success, fail) {
    return cordova.exec( function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'VPlayer', '', [content]);
};

if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.vplayer) {
    window.plugins.vplayer = new VPlayer();
}
