/**
 * Created by luoshuo on 14/12/4.
 */
(function (Framework7, $$, T7, moment, myapi) {
    'use strict';

    // 助手
    T7.registerHelper('time_ago', function (time) {
        return moment.unix(time).fromNow();
    });
    T7.registerHelper('array_length', function (arr) {
        return arr ? arr.length : 0;
    });
    T7.registerHelper('pluralize', function (arr, options) {
        return (arr.length === 1) ? options.hash.single : arr.length + " " + options.hash.multiple;
    });

    // 初始化
    var app = new Framework7({
        modalTitle: '杨凌视线',
        animateNavBackIcon: true,
        precompileTemplates: true,
        template7Pages: true,
        externalLinks: 'a.external, .message a',
        router: true
    });

    // 初始化视图
    var mainView = app.addView('.view-main', {
        dynamicNavbar: true,
        animatePages: false,
        swipeBackPage: false,
        reloadPages: true,
        preloadPreviousPage: false
    });


    // 更新头条
    function updateTopNews(topnews) {
        app.template7Data.news = topnews;
        $$('.page[data-page="index"] .page-content .list-block').html(T7.templates.newsTemplate(topnews));
    }
    // 更新新闻
    function updateNews(news) {
        app.template7Data.news = news;
        $$('.page[data-page="news"] .page-content .news-list').html(T7.templates.newsTemplate(news));
    }
    // 更新农业
    function updateAgri(agri) {
        app.template7Data.news = agri;
        $$('.page[data-page="agri"] .page-content .agri-list').html(T7.templates.newsTemplate(agri));
    }
    // 更新活动
    function updateHuodong(huodong) {
        app.template7Data.news = huodong;
        $$('.page[data-page="huodong"] .page-content .huodong-list').html(T7.templates.newsTemplate(huodong));
    }
    // 更新视频
    function updateMedia(media) {
        app.template7Data.news = media;
        $$('.page[data-page="media"] .page-content .media-list').html(T7.templates.newsTemplate(media));
    }
    // 更新生活
    function updateLife(life) {
        app.template7Data.news = life;
        $$('.page[data-page="life"] .page-content .life-list').html(T7.templates.newsTemplate(life));
    }

    // 获取头条
    function getTopNews(refresh) {
        var results = refresh ? [] : JSON.parse(window.localStorage.getItem('topnews')) || [];
        if (results.length === 0) {
            app.showPreloader('信息更新');
            myapi.topnews(function (data) {
                data = JSON.parse(data);
                results = data;
                window.localStorage.setItem('topnews', JSON.stringify(results));
                // PTR Done
                app.pullToRefreshDone();

                updateTopNews(results);

                app.hidePreloader();

            });

        }
        else {
            updateTopNews(results);
        }
        return results;
    }



    // 获取新闻
    function getNews(refresh) {
        var results = refresh ? [] : JSON.parse(window.localStorage.getItem('news')) || [];
        if (results.length === 0) {
            app.showPreloader('信息更新');
            myapi.news(function (data) {
                data = JSON.parse(data);
                results = data;
                window.localStorage.setItem('news', JSON.stringify(results));
                // PTR Done
                app.pullToRefreshDone();

                updateNews(results);

                app.hidePreloader();

            });

        }
        else {
            updateNews(results);
        }
        return results;
    }

    // 获取农业
    function getAgri(refresh) {
        var results = refresh ? [] : JSON.parse(window.localStorage.getItem('agri')) || [];
        if (results.length === 0) {
            app.showPreloader('信息更新');
            myapi.agri(function (data) {
                data = JSON.parse(data);
                results = data;
                window.localStorage.setItem('agri', JSON.stringify(results));
                // PTR Done
                app.pullToRefreshDone();

                updateAgri(results);

                app.hidePreloader();

            });

        }
        else {
            updateAgri(results);
        }
        return results;
    }

    // 获取活动
    function getHuodong(refresh) {
        var results = refresh ? [] : JSON.parse(window.localStorage.getItem('huodong')) || [];
        if (results.length === 0) {
            app.showPreloader('信息更新');
            myapi.huodong(function (data) {
                data = JSON.parse(data);
                results = data;
                window.localStorage.setItem('huodong', JSON.stringify(results));
                // PTR Done
                app.pullToRefreshDone();

                updateHuodong(results);

                app.hidePreloader();

            });

        }
        else {
            updateHuodong(results);
        }
        return results;
    }

    // 获取视频
    function getMedia(refresh) {
        var results = refresh ? [] : JSON.parse(window.localStorage.getItem('media')) || [];
        if (results.length === 0) {
            app.showPreloader('信息更新');
            myapi.media(function (data) {
                data = JSON.parse(data);
                results = data;
                window.localStorage.setItem('media', JSON.stringify(results));
                // PTR Done
                app.pullToRefreshDone();

                updateMedia(results);

                app.hidePreloader();

            });

        }
        else {
            updateMedia(results);
        }
        return results;
    }

    // 获取生活
    function getLife(refresh) {
        var results = refresh ? [] : JSON.parse(window.localStorage.getItem('life')) || [];
        if (results.length === 0) {
            app.showPreloader('信息更新');
            myapi.life(function (data) {
                data = JSON.parse(data);
                results = data;
                window.localStorage.setItem('life', JSON.stringify(results));
                // PTR Done
                app.pullToRefreshDone();

                updateLife(results);

                app.hidePreloader();

            });

        }
        else {
            updateLife(results);
        }
        return results;
    }


    //更新新闻栏目

    $$('#news').on('show', function () {
        getNews();
    });
    $$('#agri').on('show', function () {
        getAgri();
    });
    $$('#huodong').on('show', function () {
        getHuodong();
    });
    $$('#media').on('show', function () {
        getMedia();
    });
    $$('#life').on('show', function () {
        getLife();
    });



    // app加载时候获取头条
    getTopNews();

    // 导出app到全局
    window.app = app;



})(Framework7, Dom7, Template7, moment, myapi);