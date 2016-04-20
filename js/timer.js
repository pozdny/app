/**
 * Created by user on 15.04.16.
 */

Framework7.prototype.plugins.timer = function (app, globalPluginParams) {
    'use strict';

    var $$ = Dom7,
        t7 = Template7,
        Timer_loc;
    Timer_loc = function (options) {
        this.data = { };

        var self = this,
            defaultTemplate,
            template,
            container,
            parentContainer,
            storage,
            timer = {},
            startDay = 3,
            startMonth = String("August"),
            defaults = { };
        function getStorage(){
            if(storageGet(n.key_storage.categories)){
                storage = storageGet(n.key_storage.categories);
            }
        }
        function calcTime(offsetc) {
            var d = new Date();
            // получаем время локальное в миллисекундах
            var milsecHere = d.getTime();
            // получаем разницу в часах между локальной зоной и Рио
            var offset = (d.getTimezoneOffset()/60) - offsetc;
            // переводим разницу в миллисекунды
            var milsecOffset = Math.abs(offset) * (60*60*1000);
            // вычитаем разницу из локального времени и получаем время в милсек в Рио
            var milsecTown = milsecHere - milsecOffset;
            // return time as milsec
            return milsecTown;
        }

        self.startTimer = function(){
            var nowDateInRio = calcTime(3);
            var startTimer = new Date(startMonth + " " + Number(startDay) + ", 2016 0:00").getTime();
            var time;
            if(startTimer > nowDateInRio){
                time = startTimer - nowDateInRio;
            }
            else{
                setTimeToBlock(0, 0, 0, 0);
                return;
            }

            var elapsed = parseInt(time/1000);   // время в секундах до начала
            var days = parseInt(elapsed/(60*60*24)); //days
            var hours = parseInt(elapsed/(60*60))%24; //hours
            var minutes = parseInt(elapsed/60)%60;   //minutes
            var seconds = parseInt(elapsed)%60;      //seconds
            setTimeToBlock(days, hours, minutes, seconds);
             function instance() {
                time -= 1000;
                elapsed = parseInt(time/1000);
                 var days = parseInt(elapsed/(60*60*24)); //days
                 var hours = parseInt(elapsed/(60*60))%24; //hours
                 var minutes = parseInt(elapsed/60)%60;   //minutes
                 var seconds = parseInt(elapsed)%60;      //seconds
                // строка времени
                 if(days === 0 && hours === 0 && minutes === 0 && seconds === 0){
                     setTimeToBlock(days, hours, minutes, seconds);
                     return;
                 }
                 setTimeToBlock(days, hours, minutes, seconds);

                self.counterTimer = window.setTimeout(instance, 1000);
            }
            self.counterTimer = window.setTimeout(instance, 1000);
        };
        function setTimeToBlock(d, h, m, s){
            var dayB = parentContainer.find(".days"),
                day_elem = dayB.find(".num"),
                day_title = dayB.find(".title"),
                hoursB = parentContainer.find(".hours"),
                hours_elem = hoursB.find(".num"),
                hours_title = hoursB.find(".title"),
                minutesB = parentContainer.find(".minutes"),
                minutes_elem = minutesB.find(".num"),
                minutes_title = minutesB.find(".title"),
                secondsB = parentContainer.find(".seconds"),
                seconds_elem = secondsB.find(".num"),
                seconds_title = secondsB.find(".title");
            if (h < 10) {
                h = '0' + h; // часы
            }
            if (m < 10) {
                m = '0' + m; // минуты
            }
            if (s < 10) {
                s = '0' + s; // секунды
            }
            $$(day_elem).html(d);
            $$(hours_elem).html(h);
            $$(minutes_elem).html(m);
            $$(seconds_elem).html(s);
        }
        self.init = function(){
            getStorage();
            var context;
            parentContainer = $$('#block-timer');
            clearParentContainer(parentContainer);
            context = {};
            container = $$(template({options: options, date:context}));
            parentContainer.append(container);
            self.startTimer();
        };


        /**
         * Sets the default template
         *
         * @private
         */
        function defineDefaultTemplate() {
            defaultTemplate = '<div class="days">' +
                '<div class="num">0</div>' +
                    '<div class="title">days</div>' +
                '</div>' +
                '<div class="row-time">' +
                    '<div class="hours">' +
                        '<div class="num">00</div>' +
                        '<div class="title">hours</div>' +
                    '</div>' +
                    '<div class="minutes">' +
                        '<div class="num">00</div>' +
                        '<div class="title">minutes</div>' +
                    '</div>' +
                    '<div class="seconds">' +
                        '<div class="num">00</div>' +
                        '<div class="title">seconds</div>' +
                    '</div>' +
                '</div>';
        }

        /* Sets the options that were required
         *
         * @private
         */
        function applyOptions() {
            var def;
            options = options || {};
            for (def in defaults) {
                if (typeof options[def] === 'undefined') {
                    options[def] = defaults[def];
                }
            }
        }

        /**
         * Compiles the template
         *
         * @private
         */
        function compileTemplate() {
            if (!options.template) {
                // Cache compiled templates
                if (!app._compiledTemplates.timer) {
                    app._compiledTemplates.timer = t7.compile(defaultTemplate);
                }
                template = app._compiledTemplates.timer;

            } else {
                template = t7.compile(options.template);
            }

        }


        (function () {
            applyOptions();
            defineDefaultTemplate();
            compileTemplate();
            self.init();
        }());

        return self;
    };

    app.timer = function (options) {
        return new Timer_loc(options);
    };
};

