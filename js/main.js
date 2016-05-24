/*
* require 配置映射
*
* */

require.config({
    paths : {
        jquery : 'libs/jquery',
        underscore : 'libs/underscore',
        backbone : 'libs/backbone',
        storage : 'libs/backbone.localStorage',
        text : 'libs/require/text'
    },

    /*
    * shim 配置依赖关系
    * */
    shim : {
        underscore : {
            exports : '_'
        },
        backbone : {
            deps : ['underscore','jquery'],
            exports : 'Backbone'
        }
    }
});

require(['views/app','collections/todos'],function(AppView,AppCollection){
    var app_view = new AppView({
        collection : AppCollection
    });
});