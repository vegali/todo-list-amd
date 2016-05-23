require.config({
    baseUrl : '../',
    paths : {
        jquery : 'libs/jquery',
        underscore : 'libs/underscore',
        backbone : 'libs/backbone',
        text : 'libs/require/text'
    }
});

require(['views/app'],function(AppView){
    var app_view = new AppView();
});