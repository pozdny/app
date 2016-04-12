/**
 * Created by user on 05.02.16.
 */
/**
 * Created by user on 27.01.16.
 */
/*jslint browser: true*/
/*global console, Framework7, alert, Dom7, Swiper, Template7*/

/**
 * A plugin for Framework7 to show a slideable welcome screen
 *
 * @module Framework7/prototype/plugins/sliderSwiper
 * @author www.timo-ernst.net
 * @license MIT
 */
Framework7.prototype.plugins.sliderSwiperCalendar = function (app, globalPluginParams) {     console.log('ok');
    'use strict';
    // Variables in module scope
    var $$ = Dom7,
        t7 = Template7,
        SliderSwiperCalendar;

    // Click handler to close sliderSwiper
    $$(document).on('click', '.close-slider', function (e) {
        e.preventDefault();
        var $swiperscreen = $$(this).parents('.swiperSliderCalendar');
        if ($swiperscreen.length > 0 && $swiperscreen[0].f7Swiper) { $swiperscreen[0].f7Swiper.close(); }
    });

    /**
     * Represents the welcome screen
     *
     * @class
     * @memberof module:Framework7/prototype/plugins/sliderSwiper
     */
    SliderSwiperCalendar = function (slides, options) {
        var ObjGame = function(name, icon, id, date, notification){
            this.name = name;
            this.icon = icon;
            this.id = id;
            this.date = new Date("August " + Number(date) + ", 2016 0:00").getTime();
            if(notification === undefined){
                this.notification = false;
            }
            else{
                this.notification = notification;
            }

        };
        var ObjCol = function(obj, date, arr_date){   console.log(obj, date, arr_date);
            this.date = date;
            this.status = false;
            this.checked = false;
            if(arr_date.indexOf(date) !=-1){
                console.log('есть', date);
                this.status = true;
            }

        };
        var ObjRow = function(obj){   console.log(obj);
            this.date = obj.date;
            this.name = obj.name;
            var arrCols = [];
            $$.each(storageDatesGame, function(i, val){
                for(var key in val){
                    arrCols.push(new ObjCol(val, Number(key), obj.date));
                }
            });
            this.cols = arrCols;
        };

        // Private properties
        var self = this,
            defaultTemplate,
            template,
            container,
            storage,
            storageGames,
            storageDatesGame,
            swiper,
            swiperContainer,
            parentContainer,
            arrGames,
            arrRows,
            defaults = {
                closeButton: true,        // enabled/disable close button
                closeButtonText : 'Skip', // close button text
                cssClass: '',             // additional class on container
                pagination: false,         // swiper pagination
                loop: false,              // swiper loop
                open: true              // open
            };
        function getStorage(){
            if(storageGet(n.key_storage.categories)){
                storage = storageGet(n.key_storage.categories);
            }
        }
        function getStorageGames(){
            storageGames = storage.games[LN];
        }
        function getStorageDatesGame(){
            storageDatesGame = storage.data.datesGame.shadule;
        }
         function getGames(){
             arrGames = [];
             arrGames.push(storageGames[0]);
             arrGames.push(storageGames[1]);
             storageGames.splice(0,2);
             sortArrayAlfabet(storageGames);
             $$.each(storageGames, function(i, val){
                arrGames.push(val);
             });
             return arrGames;
         }
        function getRows(){
             arrRows = [];
             $$.each(arrGames, function(i, val){
                 arrRows.push(new ObjRow(val));
             });
             return arrRows;
        }
        function getSlide(){

        }
        /**
         * Initializes the swiper
         *
         * @private
         */
        function initSwiper() {
            n.swiperSlider = swiper = new Swiper('.swiper-container-calendar', {
                direction: 'horizontal',
                loop: options.loop,
                pagination: options.pagination ? parentContainer.find('.top-column') : undefined
            });
        }

        /**
         * Sets colors from options
         *
         * @private
         */
        function setColors() {
            if (options.bgcolor) {
                container.css({
                    'background-color': options.bgcolor,
                    'color': options.fontcolor
                });
            }
        }

        /**
         * Sets the default template
         *
         * @private
         */
        function defineDefaultTemplate() {
            defaultTemplate = '<div class="swiperSliderCalendar">' +
                    '<div class="swiper-container-v">' +
                        '<div class="swiper-inner">' +
                            '<div class="left-column">' +
                                '<div class="top-block"></div>' +
                                '<div class="bottom-block list-block">' +
                                    '<ul class="">' +
                                        '{{#each context.games}}' +
                                        '<li>' +
                                            '<div class="item-media">' +
                                            '<i class="icon icon-{{icon}}"></i>' +
                                            '</div>' +
                                        '</li>' +
                                        '{{/each}}' +
                                    '</ul>' +
                                '</div>' +
                            '</div>' +
                            '<div class="swiper-container-calendar">' +
                                '<div class="top-column">55</div>' +
                                '<div class="swiper-wrapper">' +
                                    '<div class="swiper-slide" id="0">' +
                                       '<div class="list-block">' +
                                          '<ul>' +
                                            '{{#each rows}}' +
                                            '<li>' +

                                            '</li>' +
                                            '{{/each}}' +
                                          '</ul>' +
                                       '</div>' +
                                    '</div>' +
                                    '<div class="swiper-slide" id="1">2</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +

                '</div>';

        }

        /**
         * Sets the options that were required
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
                if (!app._compiledTemplates.calendar) {
                    app._compiledTemplates.calendar = t7.compile(defaultTemplate);
                }
                template = app._compiledTemplates.calendar;
            } else {
                template = t7.compile(options.template);
            }
        }

        /**
         * Shows the welcome screen
         *
         * @public
         * @memberof module:Framework7/prototype/plugins/sliderSwiper
         */
        self.open = function () {
            getStorage();
            getStorageGames();
            getStorageDatesGame();
            var games = getGames();
            var rows = getRows();console.log(rows);
            var slides = getSlide(rows);
            var context = {
                games: games,
                rows:rows
            };
            container = $$(template({options: options, context: context}));
            swiperContainer = container.find('.swiper-container-calendar');
            parentContainer = $$('#page-calendar');
            setColors();
            parentContainer.append(container);
            initSwiper();
            container[0].f7Swiper = self;
            if (typeof options.onOpened === 'function') { options.onOpened(); }
        };

        /**
         * Hides the welcome screen
         *
         * @public
         * @memberof module:Framework7/prototype/plugins/welcomescreen
         */
        self.close = function () {
            if (swiper) { swiper.destroy(true); }
            if (container) { container.remove(); }
            container = swiperContainer = swiper = undefined;
            if (typeof options.onClosed === 'function') { options.onClosed(); }
        };

        /**
         * Shows the next slide
         *
         * @public
         * @memberof module:Framework7/prototype/plugins/welcomescreen
         */
        self.next = function () {
            if (swiper) { swiper.slideNext(); }
        };

        /**
         * Shows the previous slide
         *
         * @public
         * @memberof module:Framework7/prototype/plugins/welcomescreen
         */
        self.previous = function () {
            if (swiper) { swiper.slidePrev(); }
        };

        /**
         * Goes to the desired slide
         *
         * @param {number} index The slide to show
         * @public
         * @memberof module:Framework7/prototype/plugins/welcomescreen
         */
        self.slideTo = function (index) {
            if (swiper) { swiper.slideTo(index); }
        };

        /**
         * Initialize the instance
         *
         * @method init
         */
        (function () {
            defineDefaultTemplate();
            compileTemplate();
            applyOptions();
            console.log(options);
            // Open on init
            if (options.open) {
                self.open();
            }

        }());

        // Return instance
        return self;
    };

    app.sliderSwiperCalendar = function (slides, options) {
        return new SliderSwiperCalendar(slides, options);
    };

};