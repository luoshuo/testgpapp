/**
 * Created by luoshuo on 14/12/4.
 */
(function (Framework7, $$) {
    'use strict';

    var urls = [
        //'http://localhost/aiteoa/index.php/cms/api/'
        'http://www.yanglingtv.com/index.php/cms/api/'
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

    var myapi = {

        urls: urls,

        topnews: function (success, error) {
            return req('topnews', success, error);
        },
        news: function (success, error) {
            return req('news', success, error);
        },
        agri: function (success, error) {
            return req('agri', success, error);
        },
        huodong: function (success, error) {
            return req('huodong', success, error);
        },
        media: function (success, error) {
            return req('media', success, error);
        },
        life: function (success, error) {
            return req('life', success, error);
        }
    };

    window.myapi = myapi;

})(Framework7, Dom7);