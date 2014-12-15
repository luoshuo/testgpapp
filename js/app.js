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
        hideNavbarOnPageScroll:false,
        hideToolbarOnPageScroll:false,
        externalLinks: 'a.external, .message a',
        router: true
    });

    // 初始化视图
    var mainView = app.addView('.view-main', {
        dynamicNavbar: true,
        animatePages: false,
        swipeBackPage: true,
        reloadPages: false,
        preloadPreviousPage: true
       // domCache:true
    });


    $$(document).on('pageInit', function (e) {
        var page = e.detail.page;

        if (page.name === 'index') {
            getTopPpt();
            getTopNews();
        }

        if (page.name === 'news') {
            getNews();
        }

        if (page.name === 'agri') {
            getAgri();
        }

        if (page.name === 'huodong') {
            getHuodong();
        }

        if (page.name === 'media') {
            getMedia();
        }

        if (page.name === 'life') {
            getLife();
        }
    });





    // 更新头条
    function updateTopNews(topnews) {
        app.template7Data.topnews = topnews;
        $$('.page[data-page="index"] .page-content .list-block ul').html(T7.templates.topnewsTemplate(topnews));
    }
    // 更新头条ppt
    function updateTopPpt(topppt) {
        app.template7Data.topppt = topppt;
        $$('.page[data-page="index"] .page-content .list-block .slider-container').html(T7.templates.toppptTemplate(topppt));
    }
    // 更新新闻
    function updateNews(news) {
        app.template7Data.news = news;
        $$('.page[data-page="news"] .page-content .news-list').html(T7.templates.newsTemplate(news));
    }
    // 更新农业
    function updateAgri(agri) {
        app.template7Data.agri = agri;
        $$('.page[data-page="agri"] .page-content .agri-list').html(T7.templates.agriTemplate(agri));
    }
    // 更新活动
    function updateHuodong(huodong) {
        app.template7Data.huodong = huodong;
        $$('.page[data-page="huodong"] .page-content .huodong-list').html(T7.templates.huodongTemplate(huodong));
    }
    // 更新视频
    function updateMedia(media) {
        app.template7Data.media = media;
        $$('.page[data-page="media"] .page-content .media-list').html(T7.templates.mediaTemplate(media));
    }
    // 更新生活
    function updateLife(life) {
        app.template7Data.life = life;
        $$('.page[data-page="life"] .page-content .life-list').html(T7.templates.lifeTemplate(life));
    }

    // 获取头条
    function getTopNews(refresh) {
        var results = refresh ? [] : JSON.parse(window.localStorage.getItem('topnews')) || [];
        if (results.length === 0) {
           // app.showPreloader('信息更新');
            myapi.topnews(function (data) {
                data = JSON.parse(data);
                results = data;
                window.localStorage.setItem('topnews', JSON.stringify(results));
                // PTR Done
                app.pullToRefreshDone();

                updateTopNews(results);

              //  app.hidePreloader();

            });

        }
        else {
            updateTopNews(results);
        }
        return results;
    }

    // 获取头条ppt
    function getTopPpt(refresh) {
        var results = refresh ? [] : JSON.parse(window.localStorage.getItem('topppt')) || [];
        if (results.length === 0) {
            //app.showPreloader('信息更新');
            myapi.topppt(function (data) {
                data = JSON.parse(data);
                results = data;
                window.localStorage.setItem('topppt', JSON.stringify(results));
                // PTR Done
                app.pullToRefreshDone();

                updateTopPpt(results);

                //app.hidePreloader();

            });

        }
        else {
            updateTopPpt(results);
        }
        return results;
    }


    //TODO:测试成功后下一步将下面函数合并

    // 获取新闻
    function getNews(refresh) {
        var results = refresh ? [] : JSON.parse(window.localStorage.getItem('news')) || [];
        if (results.length === 0) {
           // app.showPreloader('信息更新');
            myapi.news(function (data) {
                data = JSON.parse(data);
                results = data;
                window.localStorage.setItem('news', JSON.stringify(results));
                // PTR Done
                app.pullToRefreshDone();

                updateNews(results);

               // app.hidePreloader();

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
            //app.showPreloader('信息更新');
            myapi.agri(function (data) {
                data = JSON.parse(data);
                results = data;
                window.localStorage.setItem('agri', JSON.stringify(results));
                // PTR Done
                app.pullToRefreshDone();

                updateAgri(results);

              //  app.hidePreloader();

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
          //  app.showPreloader('信息更新');
            myapi.huodong(function (data) {
                data = JSON.parse(data);
                results = data;
                window.localStorage.setItem('huodong', JSON.stringify(results));
                // PTR Done
                app.pullToRefreshDone();

                updateHuodong(results);

               // app.hidePreloader();

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
          //  app.showPreloader('信息更新');
            myapi.media(function (data) {
                data = JSON.parse(data);
                results = data;
                window.localStorage.setItem('media', JSON.stringify(results));
                // PTR Done
                app.pullToRefreshDone();

                updateMedia(results);

               // app.hidePreloader();

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
            //app.showPreloader('信息更新');
            myapi.life(function (data) {
                data = JSON.parse(data);
                results = data;
                window.localStorage.setItem('life', JSON.stringify(results));
                // PTR Done
                app.pullToRefreshDone();

                updateLife(results);

              //  app.hidePreloader();

            });

        }
        else {
            updateLife(results);
        }
        return results;
    }


    function removeQT(refresh) {

        window.localStorage.removeItem('news');
        window.localStorage.removeItem('agri');
        window.localStorage.removeItem('huodong');
        window.localStorage.removeItem('media');
        window.localStorage.removeItem('life');

       // window.localStorage.removeItem('topnews');

        //window.localStorage.removeItem('topppt');

    }


    //更新新闻栏目
/*
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
*/


    // app加载时候获取头条
    getTopPpt();
    getTopNews();

    var mySlider = app.slider('.slider-container', {
        pagination:'.slider-pagination',
        paginationHide: false,
        nextButton: '.slider-next-button',
        prevButton: '.slider-prev-button',
        indexButton: '.slider-pagination-bullet',
        speed: 400,
    });


  //  var ptrCon = $$('.view-main[data-page="huodong"]');


  //  app.pullToRefreshTrigger(ptrCon);


    // 下拉刷新页面
    var ptrContent = $$('.pull-to-refresh-content');

    // 添加'refresh'监听器
    ptrContent.on('refresh', function (e) {

      //  alert('test');
        // 模拟2s的加载过程

        removeQT();
        getTopPpt();
        getTopNews();



        setTimeout(function () {




           // console.log($$('.view-main')[0].f7View);

           // alert(mainView.activePage);

            /*$$(document).on('pageInit', function (e) {

                var page = e.detail.page;

                if (page.name === 'index') {
                    getTopPpt();
                    getTopNews();
                }

                if (page.name === 'news') {
                    getNews();
                }

                if (page.name === 'agri') {
                    getAgri();
                }

                if (page.name === 'huodong') {
                    getHuodong();
                }

                if (page.name === 'media') {
                    getMedia();
                }

                if (page.name === 'life') {
                    getLife();
                }

            })*/



            app.pullToRefreshDone();
        }, 2000);
    });






    /*
            var loading = false;

            var lastIndex = $$('.my-list ul li.swipeout').length;

           // var str = $$('.my-list ul li')[lastIndex - 1] + '';
            var jsonstr;

            //TODO:此处需要获取最后一行a中contentid值


        function extend(des, a, b){



            return des;
        }





            // 最多可加载的条目
            var maxItems = 100;

            // 每次加载添加多少条目
            var itemsPerLoad = 10;


            $$('.infinite-scroll').on('infinite', function () {

                // 如果正在加载，则退出
                if (loading) return;

                // 设置flag
                loading = true;

                // 模拟1s的加载过程
                setTimeout(function () {
                    // 重置加载flag
                    loading = false;

                    if (lastIndex >= maxItems) {
                        // 加载完毕，则注销无限加载事件，以防不必要的加载
                        myApp.detachInfiniteScroll($$('.infinite-scroll'));
                        // 删除加载提示符
                        $$('.infinite-scroll-preloader').remove();
                        return;
                    }

                    var c;
                    var minid = 422;
                    var results = [];
                    var a;
                    var b;
                    var src = [];
                    myapi.n(minid, function (data) {
                        data = JSON.parse(data);
                        results = data;

                        b = JSON.stringify(results);

                        src = window.localStorage.getItem('nx');



                        if(src){
                            a = JSON.stringify(JSON.parse(src));
                        }



                      //  var a = window.localStorage.getItem('nx');


                       // var b = data;


                        c = a.substr(0,a.length -1) + ',' + b.substr(1);

                        console.log(c);




                        window.localStorage.setItem('nx', c);

                       // window.localStorage.setItem('nx', JSON.stringify(results));

                    });



                    jsonstr = JSON.parse(c);

                    //jsonstr = JSON.parse(window.localStorage.getItem('nx'));

                    // 生成新条目的HTML
                    var html = '';
                    for (var i = 0; i < jsonstr.length; i++) {

                        var index = lastIndex + i + 1;

                        html += '<li class="swipeout">' +
                        '<div class="swipeout-content">' +
                        '<a href="item.html?id=' + jsonstr[i].id + '" data-contextName="topnews.' + index + '" class="item-content item-link">' +
                        '<div class="item-media"><img src="' + jsonstr[i].photo + '" width="80" height="60"></div>' +
                        '<div class="item-inner">' +
                        ' <div class="item-title-row">' +
                        ' <div class="item-title">' + jsonstr[i].title + '</div>' +
                        ' </div>';

                        if (jsonstr[i].hasmedia) {

                            html += '<div class="item-icon"> <i class="icon icon-video"></i></div>';
                        }


                        html += '</div></a></div></li>';


                    }

                    // 添加新条目
                    $$('.list-block ul').append(html);

                    // 更新最后加载的序号
                    lastIndex = $$('.my-list ul li.swipeout').length;
                }, 1000);
            });



    */







    // 导出app到全局
    window.app = app;



})(Framework7, Dom7, Template7, moment, myapi);