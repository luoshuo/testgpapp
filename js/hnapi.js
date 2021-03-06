(function (Framework7, $$) {
  'use strict';
  
  var urls = [
      'http://localhost/aiteoa/index.php/cms/api/'
      //'http://www.yanglingtv.com/index.php/cms/api/'
  ];
  
  var req = function (path, success, error, retry) {
    retry = retry || 0;
    return $$.ajax({
      url: urls[retry % urls.length] + path,
      success: success,
      error: function (xhr) {
        if (retry < urls.length - 1) {
					req(path, success, error, retry += 1);
				} else {
					error(xhr);
				}
      }
    });
  };
  
  var hnapi = {
    
    urls: urls,
    
		item: function (id, success, error) {
			return req('item/id/' + id, success, error);
		},
		
		user: function (user, success, error) {
			return req('user/' + user + '.json', success, error);
		},
		
		topStories: function (success, error) {
			return req('top100', success, error);
		},

      agris: function (success, error) {
          return req('top100', success, error);
      },

        maxItemID: function (success, error) {
			return req('maxitem.json', success, error);
		},
		
		updates: function (success, error) {
			return req('updates.json', success, error);
		}
  };
  
  window.hnapi = hnapi;
  
})(Framework7, Dom7);