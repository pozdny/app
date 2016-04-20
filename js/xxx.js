/**
 * Created by user on 20.04.16.
 */
/*jslint browser: true*/
/*global console, Framework7, angular, Dom7*/
var myapp = myapp || {};
var myApp = new Framework7(
    {
        //pushState:true,
        init:false,
        //tapHold: true, //enable tap hold events
        router: true,
        reloadPages:true,
        //animateNavBackIcon: true,
        swipeBackPage: false,
        // Enable templates auto precompilation
        precompileTemplates: true,
        // Enabled pages rendering using Template7
        template7Pages: true,
        // Specify Template7 data for pages
        modalButtonCancel: _w.global.buttons.cancel[LN]
    });
// Export selectors engine
var $$ = Dom7,
    fw7ViewOptions = {
        dynamicNavbar: true,
        domCache: true,
        reloadPage: true
    };
var mainView = myApp.addView('.view-main', fw7ViewOptions),
    calendarView = myApp.addView('.view-calendar', fw7ViewOptions),
    infoView = myApp.addView('.view-info', fw7ViewOptions);

// global
var n = {
    language:'en',
    platform: "iOS",
    JSAPI: null,
    free: false,
    home:null,
    settings: null,
    info:null,
    filter:null,
    swiper:null,
    swiper_pages: null,
    swiperCalendar:null,
    swiper_pages_calendar: null,
    timer:null,
    dateIfChangeDate:0,
    calendar:null,
    searchbar:null,
    sounds:{},
    pickerInline: null,
    key_storage:{
        categories:"games_obj",
        language:"games_language"
    }
};

// установка языка
if(!localStorage.getItem(n.key_storage.language)) {
    localStorage.setItem(n.key_storage.language, 'multi');
}
//var LN = localStorage.getItem(n.key_storage.language);
var LN = navigator.language.substr(0, 2);
n.language = LN;
if(LN !== "en" && LN !== "ru"){
    LN = "en";
    n.language = "en";
}
myApp.onPageInit('index', function (page) {
    //storageClear();
    if(!storageGet(n.key_storage.categories)){
        // заносим категории по умолчанию
        createArrayStorage();
    }
    else{
        console.log('init');
        n.home = myApp.home({});
        //n.filter = myApp.filter({});
        if(n.settings === null){
            n.settings = myApp.settings();
        }
        else{
            n.settings.init();
        }
    }

});
myApp.onPageInit('calendar', function (page) {

});

myApp.onPageReinit('calendar-settings', function (page) {
    console.log('set');
});
myApp.onPageReinit('index', function (page) {
    n.home.init();
});
myApp.onPageReinit('calendar', function (page) {
    n.swiper_pages_calendar = myApp.calendar({});
});
myApp.onPageBeforeAnimation('info-one', function (page) {
    $$('#info-item').scrollTo(0, 0);
    if(!n.swiper_pages){
        n.swiper_pages = new myapp.pages.InfoPageController(myApp, $$);
    }
    getInfoOne(page.query.id);
});
myApp.onPageBeforeAnimation('game-notification', function (page) {
    if(page.query.id){
        n.home.getGameNotificationData(page.query.id);
    }
    else{
        console.log('error');
    }
});
$$('#view-calendar').on('show', function (page) {
    if(n.settings === null){
        n.settings = myApp.settings();
    }
    else{
        n.settings.init();
    }
    if(n.calendar === null){
        n.calendar = myApp.calendar({});
    }
    if(n.filter === null){
        n.filter = myApp.filter({});
    }
    n.searchbar = myApp.searchbar('.searchbar', {
        searchList: '.list-block-search',
        searchIn: '.item-title'
    });

});
$$('#view-main').on('show', function (page) {
    if(n.settings === null){
        n.settings = myApp.settings();
    }
    else{
        n.settings.init();
    }
});
$$('#view-info').on('show', function (page) {
    if(n.settings === null){
        n.settings = myApp.settings();
    }
    else{
        n.settings.init();
    }
    if(n.info === null){
        n.info = myApp.info({});
    }
});
myApp.init();

document.addEventListener("DOMContentLoaded", function(event) {
    // Init method
    n.JSAPI = JSAPI;
    n.JSAPI.keepScreenOn();
    n.JSAPI.setStatusBarColor("black");

    // установка языка
    if(!localStorage.getItem(n.key_storage.language)) {
        localStorage.setItem(n.key_storage.language, 'multi');
    }
    //создание нотификаций
    /*if(localStorage.getItem(n.key_storage.categories)){
     var storage = JSON.parse(localStorage.getItem(n.key_storage.categories));
     if(storage.settings.notifications){
     createNotification();
     }
     else{

     }
     }
     else{
     createNotification();
     }*/
    if(n.free){
        addPaddingBunner();
    }
    //setInterval(updateData, 1000);
    console.log('end ready');

    // Initialize app
    var fw7App = myApp,
        $$ = Dom7,
        ipc = new myapp.pages.IndexPageController(fw7App, $$);

    // sounds

    n.sounds.tap = new Sound('sounds/tap.mp3');
    n.sounds.tap.volume(0.5);


    $$(document.body).on('click', '.navbar .link, .toolbar .link, .swipeout-content, .subnavbar .tab-link', function(e){
        //e.preventDefault();
        //e.stopPropagation();
        var that = $$(this);
        pointerEvent(that, 'none');
        playSound(n.sounds.tap);
        pointerEvent(that, 'auto', 300);
    });
    $$(document.body).on('click','.toolbar .link', function(e){
        closeSettings();
    });
    $$('#page-add-training').on('click', '#form-exercises ul li', function(e){
        //e.preventDefault();
        e.stopPropagation();
        //playSound(n.sounds.tap);
    });
});


myapp.init = (function () {
    'use strict';
    var exports = {};

    window.addEventListener("appCloseEvent", function(){

    });
    window.addEventListener("appMaximizeEvent", function(){
        console.log('maximize');
    });
    window.addEventListener("appMinimizeEvent", function(){
        console.log('minimize');
    });
    return exports;
}());




