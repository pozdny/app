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
    swiper:null,
    swiper_pages: null,
    swiperCalendar:null,
    swiper_pages_calendar: null,
    achievements:null,
    dateIfChangeDate:0,
    calendar:null,
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
    storageClear();
    if(!storageGet(n.key_storage.categories)){
        // заносим категории по умолчанию
        createArrayStorage();
    }
    else{
        console.log('init');
        n.home = myApp.home({});
        n.settings = myApp.settings();
        n.info = myApp.info({});
        //n.calendar = myApp.calendar({});
    }
});


myApp.onPageReinit('index', function (page) {
    n.home.init();
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
$$('#view-calendar').on('show', function (page) { console.log('show', n.settings);
    n.settings.init();
    if(!n.swiper_pages_calendar){
        n.swiper_pages_calendar = new myapp.pages.CalendarPageController(myApp, $$);
    }
});
$$('#view-main').on('show', function (page) { console.log(n.settings);
    n.settings.init();
});
$$('#view-info').on('show', function (page) {
    n.settings.init();
});
myApp.init();

myapp.init = (function () {
    'use strict';
    var exports = {};
    document.addEventListener("DOMContentLoaded", function(event) {
        // Init method
        (function(){

            n.JSAPI = JSAPI;
            n.JSAPI.keepScreenOn();
            n.JSAPI.setStatusBarColor("black");

            // установка языка
            if(!localStorage.getItem(n.key_storage.language)) {
                localStorage.setItem(n.key_storage.language, 'multi');
            }
            //создание нотификаций
            if(localStorage.getItem(n.key_storage.categories)){
                var storage = JSON.parse(localStorage.getItem(n.key_storage.categories));
                if(storage.settings.notifications){
                    createNotification();
                }
                else{

                }
            }
            else{
                createNotification();
            }
            // sounds
            n.sounds.achiev = new Sound('sounds/achieve.mp3');
            n.sounds.achiev.volume(0.5);
            n.sounds.tap = new Sound('sounds/tap.mp3');
            n.sounds.tap.volume(0.5);

            if(n.free){
                addPaddingBunner();
            }
            //setInterval(updateData, 1000);

            console.log('end ready');
        }());
        // Initialize app
        var fw7App = myApp,
            $$ = Dom7,
            ipc = new myapp.pages.IndexPageController(fw7App, $$);
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
    return exports;
}());




