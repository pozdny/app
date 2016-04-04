/**
 * Created by user on 31.03.16.
 */
/**
 * Created by user on 29.01.16.
 */

Framework7.prototype.plugins.home = function (app, globalPluginParams) {
    'use strict';

    var $$ = Dom7,
        t7 = Template7,
        Home_loc;
    Home_loc = function (options) {
        this.data = { };
        var ObjGame = function(name, icon, notification){
            this.name = name;
            this.icon = icon;
            this.notification = notification;
        };
        var self = this,
            defaultTemplate,
            template,
            container,
            parentContainer,
            storage,
            storageGames,
            storageDatesGame,
            defaults = { };
        function getStorage(){
            if(storageGet(n.key_storage.categories)){
                storage = storageGet(n.key_storage.categories);
            }
        }
        function getStorageGames(){
            storageGames = storage.games[LN];
        }
        function getStorageDatesGame(){
             storageDatesGame = storage.data.datesGame;
        }

        function getArrGames(arr){
            var array = [];
            $$.each(arr, function(i, val){
                array.push(new ObjGame(storageGames[val.id].name, storageGames[val.id].icon))
            });
            sortArrayAlfabet(array);
            return array;
        }
        function getArr(){
            var datesGame = [];
            $$.each(storageDatesGame, function(i, val){
                datesGame.push({
                    date: Number(i),
                    dateFormat: new Date(Number(i)).getShortDateMounth2(),
                    games: getArrGames(val)
                })
            });
            return datesGame;
        }
        function getDatesGame(){
            getStorageDatesGame();
            return getArr();
        }
        self.init = function(){
            getStorage();
            getStorageGames();
            var context;
            parentContainer = $$('#page-home');
            context = getDatesGame();  console.log(context);
            container = $$(template({options: options, date:context}));
            parentContainer.append(container);
        };


        /**
         * Sets the default template
         *
         * @private
         */
        function defineDefaultTemplate() {
            defaultTemplate = '<div class="home-block">' +
                    '<div class="top-block">' +
                        '<div class="icon"></div>' +
                        '<div class="time">' +
                            '<div class="days">' +
                                '<div class="num">120</div>' +
                                '<div class="title">days</div>' +
                            '</div>' +
                            '<div class="row-time">' +
                                '<div class="hours">' +
                                    '<div class="num">16</div>' +
                                    '<div class="title">hours</div>' +
                                '</div>' +
                                '<div class="minutes">' +
                                    '<div class="num">55</div>' +
                                    '<div class="title">minutes</div>' +
                                '</div>' +
                                '<div class="seconds">' +
                                    '<div class="num">12</div>' +
                                    '<div class="title">seconds</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="bottom-block">' +
                        '{{#each date}}' +
                        '<div class="content-block-title">{{dateFormat}}</div>' +
                        '<div class="list-block">' +
                            '<ul>' +
                                '{{#each games}}' +
                                '<li>' +
                                    '<a href="#game-notification" class="item-content">' +
                                        '<div class="item-media">' +
                                            '<i class="icon icon-{{icon}}"></i>' +
                                        '</div>' +
                                        '<div class="item-inner">' +
                                            '<div class="item-title">{{name}}</div>' +
                                            '<div class="item-after">' +
                                                '<div class="item-media">' +
                                                    '<i class="icon icon-notification"></i>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                    '</a>' +
                                '</li>' +
                                '{{/each}}' +
                            '</ul>' +
                        '</div>' +
                        '{{/each}}' +
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
                if (!app._compiledTemplates.home) {
                    app._compiledTemplates.home = t7.compile(defaultTemplate);
                }
                template = app._compiledTemplates.home;

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

    app.home = function (options) {
        return new Home_loc(options);
    };
};

