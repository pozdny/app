/*jslint browser: true*/
/*global console*/

var myapp = myapp || {};
myapp.pages = myapp.pages || {};

myapp.pages.IndexPageController = function (myapp, $$) {
    'use strict';

    // Welcomscreen method
    (function () {
           var options = {
                'bgcolor': '#fff',
                'fontcolor': '#589001',

                'onOpened': function () {
                },
                'onClosed': function () {
                }
            },
            welcomescreen_slides,
            welcomescreen;

        welcomescreen_slides = [
            {
                id: 'slide0',
                picture: '<div class="welcome-icon"><i class="icon icon-welcome"></i></div>',
                text: '',
                title: '',
            }

        ];

        welcomescreen = myapp.welcomescreen(welcomescreen_slides, options);
        $$(document).on('click', '.tutorial-close-btn', function () {
            welcomescreen.close();
        });

        $$('.tutorial-open-btn').click(function () {
            welcomescreen.open();
        });

        $$(document).on('click', '.tutorial-next-link', function (e) {
            welcomescreen.next();
        });

        $$(document).on('click', '.tutorial-previous-slide', function (e) {
            welcomescreen.previous();
        });

        // скрываем флеш скрин
        var welcom = $$('.welcomescreen-container');
        var hide_animation = function(){
            welcom.addClass('hideAnimation');
            var hide_welcomescreen = function(){
                welcomescreen.close();
            };
            delyed(hide_welcomescreen, 1000);
        };
        delyed(hide_animation,1500);


    }());



};