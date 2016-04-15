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
Framework7.prototype.plugins.calendar = function (app, globalPluginParams) {     console.log('ok');
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
    SliderSwiperCalendar = function (options) {
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
        var ObjCol = function(obj, date, arr_date){
            this.date = date;
            this.status = false;
            this.checked = false;
            if(arr_date.indexOf(date) !=-1){
                this.status = true;
            }

        };
        var ObjRow = function(obj){
            if(obj.checked){
                this.checked = true;
            }
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

        var ObjSlide = function(rows, id){
            this.rows = rows;
            this.id = id;
            this.last = false;
            if(id + 1 === lengthSlide){
                this.last = true;
            }
        };
        var ObjSlideDate = function(rows, id){
            this.id = id;
            this.cols = [];
            var date;
            for(var i in rows){
                for(var j in rows[i]){
                    date = new Date("August " + Number(j) + ", 2016 0:00").getTime();
                    this.cols.push({
                        date: Number(j),
                        dayWeek: new Date(date).getDayWeek()
                    })
                }
            }

        };
        // Private properties
        var self = this,
            defaultTemplate,
            defaultTemplateTopBlock,
            template,
            templateTopBlock,
            container,
            containerTopBlock,
            storage,
            storageGames,
            storageCheckedGames,
            storageDatesGame,
            swiper,
            swiperDate,
            swiperContainer,
            parentContainer,
            parentContainerTopBlock,
            arrGames,
            arrRows,
            ceil = 7,
            lengthGame,
            lengthSlide,
            fLengthSlide,
            lengthShadule,
            activeIndex,
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
        function getStorageCheckedGames(){
            storageCheckedGames = storage.data.checkedGames;
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
             getStorageCheckedGames();
             $$.each(storageCheckedGames, function(i, val){
                 $$.each(arrGames, function(j, val1){
                     if(Number(val) === val1.id){
                         val1.checked = true;
                     }
                 })
             });

             return arrGames;
         }
        function getSlidesDate(){
            var slideDate = [];
            var rows2 = [];
            var arr = [];
            var colLength;
            var rows = copyItem(storageDatesGame);
            for(var i=0; i < lengthSlide; i++){
            rows2 = copyItem(rows);
            if(rows.length%ceil !== 0 && rows.length > ceil){
                colLength = ceil;

            }
            else{
                colLength = rows.length;
            }
            arr = [];
            for(var j=0; j < colLength; j++){   //console.log(val);
                arr.push(rows[j]);
            }
            rows2 = arr;
            rows.splice(0, colLength);
            slideDate.push(new ObjSlideDate(rows2, i));

            }
            return slideDate;
        }
        function getRows(){
             arrRows = [];
             $$.each(arrGames, function(i, val){
                 arrRows.push(new ObjRow(val));
             });
             return arrRows;
        }
        function getSlide(rows){
            var slide = [];
            var rows2 = [];
            var arr = [];
            var colLength,
                zLength;
                lengthGame = rows.length;
                lengthShadule = storageDatesGame.length;
                lengthSlide = Math.ceil(lengthShadule/ceil);
                fLengthSlide = 0;
            for(var i=0; i < lengthSlide; i++){
                rows2 = copyItem(rows);
                $$.each(rows, function(z, val) {   //console.log(val);
                    if(rows[z].cols.length%ceil !== 0 && rows[z].cols.length > ceil){
                        colLength = ceil;
                        zLength = ceil;
                    }
                    else{
                        colLength = rows[z].cols.length;
                        zLength = rows[z].cols.length;
                    }
                    arr = [];
                    for(var j=0; j < colLength; j++){
                        arr.push(rows[z].cols[j]);
                    }

                    rows2[z].cols = arr;
                    rows[z].cols.splice(0, zLength);

                });

                slide.push(new ObjSlide(rows2, i));

            }
            return slide;
        }
        function nextSlideAction(){
            swiperDate.slideNext(function(){ }, 600);
        }
        function prevSlideAction(){
            swiperDate.slidePrev(function(){ }, 500);
        }
        function initNextPrevButtons(){
            var nextButton = $$(".pagination .link.next");
            var prevButton = $$(".pagination .link.prev");
            nextButton.on('click', nextSlideAction);
            prevButton.on('click', prevSlideAction);
        }
        /**
         * Initializes the swiper
         *
         * @private
         */
        function initSwiper() {
            n.swiperCalendar = swiper = new Swiper('.swiper-container-calendar', {
                direction: 'horizontal',
                loop: options.loop,
                pagination: options.pagination ? parentContainer.find('.top-column') : undefined
            });
        }
        function initSwiperDate() {
            n.swiperCalendarDate = swiperDate = new Swiper('.swiper-container-data-calendar', {
                direction: 'horizontal',
                loop: options.loop,
                pagination: options.pagination ? parentContainer.find('.top-column') : undefined
            });

        }
        function synchronizeSwipers() {
            swiper.params.control = swiperDate;
            swiperDate.params.control = swiper;
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
                            '<div class="calendar-block">' +
                                '<div class="left-column">' +
                                    '<div class="bottom-block list-block">' +
                                        '<ul class="">' +
                                            '{{#each games}}' +
                                            '<li>' +
                                                '<div class="item-media">' +
                                                '<i class="icon icon-{{icon}} {{#if checked}}active{{/if}}"></i>' +
                                                '</div>' +
                                            '</li>' +
                                            '{{/each}}' +
                                        '</ul>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="swiper-container-calendar">' +
                                    '<div class="swiper-wrapper">' +
                                        '{{#each slides}}' +
                                        '<div class="swiper-slide {{#if last}}last{{/if}}" id="{{id}}">' +
                                           '<div class="list-block">' +
                                              '<ul>' +
                                                '{{#each rows}}' +
                                                '<li class="rows {{#if checked}}checked{{/if}}">' +
                                                    '{{#each cols}}' +
                                                        '<div {{#if status}}class="status"{{/if}}></div>' +
                                                    '{{/each}}' +
                                                '</li>' +
                                                '{{/each}}' +
                                              '</ul>' +
                                           '</div>' +
                                        '</div>' +
                                        '{{/each}}' +
                                    '</div>' +
                                '</div>' +

                            '</div>' +

                        '</div>' +
                '</div>';

        }
        function defineDefaultTemplateTopBlock() {
            defaultTemplateTopBlock = '<div class="top-block">' +
            '<div class="left-block"></div>' +
                '<div class="data-block">' +
                    '<div class="title">August</div>' +
                    '<div class="swiper-container-data">' +
                        '<div class="pagination">' +
                            '<div class="nav">' +
                                '<a href="#" class="link prev"><div class="prev"></div></a>' +
                                '<a href="#" class="link next"><div class="next"></div></a>' +
                            '</div>' +
                        '</div>' +
                        '<div class="swiper-container-data-calendar">' +
                            '<div class="swiper-wrapper">' +
                            '{{#each slidesDate}}' +
                            '<div class="swiper-slide" id="{{id}}">' +
                            '{{#each cols}}' +
                                '<div class="col-date">' +
                                    '<div class="num">{{date}}</div>' +
                                    '<div class="week">{{dayWeek}}</div>' +
                                '</div>' +
                            '{{/each}}' +
                            '</div>' +
                            '{{/each}}' +
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
            if (!app._compiledTemplates.top_block) {
                app._compiledTemplates.top_block = t7.compile(defaultTemplateTopBlock);

            }
            templateTopBlock = app._compiledTemplates.top_block;
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
            var rows = getRows();
            var slides = getSlide(rows);
            var slidesDate = getSlidesDate();
            var context = {
                games: games,
                slides:slides
            };
            var contextTopBlock = {
                slidesDate: slidesDate
            };

            containerTopBlock = $$(templateTopBlock({options: options, slidesDate:contextTopBlock.slidesDate}));
            container = $$(template({options: options, games:context.games, slides: context.slides}));
            swiperContainer = container.find('.swiper-container-calendar');
            parentContainerTopBlock = $$('#top-block-subnavbar-calendar');
            parentContainer = $$('#page-calendar');
            clearParentContainer(parentContainer);
            clearParentContainer(parentContainerTopBlock);
            setColors();
            parentContainerTopBlock.append(containerTopBlock);
            parentContainer.append(container);
            initSwiper();
            initSwiperDate();
            synchronizeSwipers();
            initNextPrevButtons();

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
            defineDefaultTemplateTopBlock();
            compileTemplate();
            applyOptions();
            // Open on init
            if (options.open) {
                self.open();
            }

        }());

        // Return instance
        return self;
    };

    app.calendar = function (slides, options) {
        return new SliderSwiperCalendar(slides, options);
    };

};