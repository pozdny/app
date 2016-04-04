/**
 * Created by user on 27.01.16.
 */
/*jslint browser: true*/
/*global console*/

var myapp = myapp || {};
myapp.pages = myapp.pages || {};

myapp.pages.InfoPageController = function (myapp, $$) {
    'use strict';

    // Init method
    (function () {
        var options = {
                'bgcolor': '',
                'fontcolor': 'red',
                'onOpened': function () {
                    console.log("info screen opened");
                },
                'onClosed': function () {
                    console.log("info screen closed");
                }
            },
            info_slides = function(){
                var storage;
                if(storageGet(n.key_storage.categories)){
                    storage = storageGet(n.key_storage.categories);
                }
                var info_arr = storage.attractions[LN];    console.log(info_arr);
                return info_arr;
            },
            info = myapp.sliderSwiper(info_slides, options);  console

    }());

};