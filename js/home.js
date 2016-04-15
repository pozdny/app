/**
 * Created by user on 31.03.16.
 */

Framework7.prototype.plugins.home = function (app, globalPluginParams) {
    'use strict';

    var $$ = Dom7,
        t7 = Template7,
        Home_loc;
    Home_loc = function (options) {
        this.data = { };
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
        var self = this,
            defaultTemplate,
            defaultTemplateNotification,
            template,
            templateNotification,
            container,
            parentContainer,
            parentContainerNotification,
            containerNotification,
            storage,
            storageGames,
            storageDatesGame,
            currentId,
            currentDate,
            notifDate,
            notifObj,
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
             storageDatesGame = storage.data.datesGame.shadule;
        }

        function getArrGames(arr, date){
            var array = [];
            $$.each(arr, function(i, val){
                array.push(new ObjGame(storageGames[val.id].name, storageGames[val.id].icon, val.id, date, val.notification) );
            });
            sortArrayAlfabet(array);
            return array;
        }
        function getArr(){
            var datesGame = [];
            var date;
            $$.each(storageDatesGame, function(i, val){
                for (var key in val) {
                    date = new Date("August " + Number(key) + ", 2016 0:00").getTime();
                    datesGame.push({
                        key: key,
                        date: date,
                        dateFormat: new Date(date).getShortDateMounth2(),
                        games: getArrGames(val[key], date)
                    });
                }

            });
            return datesGame;
        }
        function getDatesGame(){
            getStorageDatesGame();
            return getArr();
        }
        function getThisGame(date, id, str){    console.log(date, id, str);
            var length = storageDatesGame.length;
            var obj;
            for(var i = 0; i < length; i++){
                for (var key in storageDatesGame[i]) {
                    if(key === date){
                        var formatDate = new Date(new Date("August " + Number(date) + ", 2016 0:00").getTime()).getShortDateMounth2();
                        for (var j=0;  j < storageDatesGame[i][key].length; j++) {
                            if(storageDatesGame[i][key][j].id === id){
                                if(str === 'save'){
                                    storageDatesGame[i][key][j].notification.date = notifDate;
                                    if(notifObj.length > 0){
                                        storageDatesGame[i][key][j].notification.on = true;
                                        var idNotification;
                                        if(storageDatesGame[i][key][j].notification.id !== undefined){
                                            idNotification = storageDatesGame[i][key][j].notification.id;
                                        }
                                        else{
                                            idNotification = new Date().getTime();
                                        }

                                        storageDatesGame[i][key][j].notification.id = idNotification;

                                        createNotificationDate(notifDate, idNotification, storageGames[id].name + ', ' + formatDate);
                                    }
                                    else{
                                        storageDatesGame[i][key][j].notification.on = false;
                                        if(storageDatesGame[i][key][j].notification.id !== undefined){
                                            deleteNotificationDate(storageDatesGame[i][key][j].notification.id);
                                        }

                                    }
                                    storage.data.datesGame.shadule = storageDatesGame;
                                    storageSet(n.key_storage.categories, storage);
                                    break;
                                }
                                else{
                                   obj = new ObjGame(storageGames[id].name, storageGames[id].icon, id, key, storageDatesGame[i][key][j].notification);
                                   return obj;
                                }
                            }
                        }
                    }
                }
            }
            return;
        }
        function getDataGame(id){
            var arr = id.split('_'),
                game_date = arr[0],
                game_id = Number(arr[1]);
                currentId = game_id;
                currentDate = game_date;
                return getThisGame(game_date, game_id);
        }
        function saveData(){
            getThisGame(currentDate, currentId, 'save');
        }
        function ClickSaveAction(){
            var that = $$(this);
            var formData = myApp.formToJSON('#form-game-notification');
            notifObj = formData.notif;
            notifDate = Date.parse(formData.date);
            saveData();
            that.off('click', ClickSaveAction);
            backPage("index");
        }

        function initBarSaveBlock(){
            $$('#icon-save-link').on('click', ClickSaveAction);
        }

        self.getGameNotificationData = function(id){
            parentContainerNotification = $$('#page-game-notification');
            clearParentContainer(parentContainerNotification);
            var game = getDataGame(id);
            containerNotification = $$(templateNotification({options: options, game:game, text_notif: _w.global.pages_title[LN].notification}));
            parentContainerNotification.append(containerNotification);
            initBarSaveBlock();
            getPicker(game);

        };
        self.init = function(){
            getStorage();
            getStorageGames();
            var context;
            parentContainer = $$('#page-home');
            clearParentContainer(parentContainer);
            context = getDatesGame();
            container = $$(template({options: options, date:context}));
            parentContainer.append(container);
        };
        function setValuePicker(game){   console.log(game.notification.date);
            var today;
            if(game.notification.date){

                today = new Date(game.notification.date);
            }
            else{
                today = new Date(game.date);
            }

            var value =  [today.getDate(), today.getHours(), (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())];
            n.pickerInline.setValue(value);
        }
        function getPicker(game){
            var today = new Date();
            n.pickerInline = myApp.picker({
                input: '#picker-date',
                container: '',
                toolbar: true,
                rotateEffect: true,
                value: [today.getDate(), today.getHours(), (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())],
                onChange: function (picker, values, displayValues) {
                    var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
                    if (values[1] > daysInMonth) {
                        picker.cols[1].setValue(daysInMonth);
                    }
                },
                formatValue: function (p, values, displayValues) {
                    $$('#picker-date-full').val(7 + ' ' + values[0] + ', 2016 ' + values[1] + ':' + values[2]);
                    return _w.dif_filds[LN].month + ' ' + values[0] + ', 2016 ' + values[1] + ':' + values[2];
                    //return displayValues[0] + ' ' + values[1] + ', ' + values[2] + ' ' + values[3] + ':' + values[4];
                },
                cols: [
                    // Months
                    // Space divider
                    {
                        divider: true,
                        content: _w.dif_filds[LN].month
                    },
                    // Days
                    {
                        values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
                    },
                    // Years
                    {
                        divider: true,
                        content: '2016'
                    },
                    // Space divider
                    {
                        divider: true,
                        content: '  '
                    },
                    // Hours
                    {
                        values: (function () {
                            var arr = [];
                            for (var i = 0; i <= 23; i++) { arr.push(i); }
                            return arr;
                        })(),
                    },
                    // Divider
                    {
                        divider: true,
                        content: ':'
                    },
                    // Minutes
                    {
                        values: (function () {
                            var arr = [];
                            for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
                            return arr;
                        })(),
                    }
                ]
            });
            setValuePicker(game);
        }

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
                                    '<a href="#game-notification?id={{../key}}_{{id}}" class="item-content">' +
                                        '<div class="item-media">' +
                                            '<i class="icon icon-{{icon}}"></i>' +
                                        '</div>' +
                                        '<div class="item-inner">' +
                                            '<div class="item-title">{{name}}</div>' +
                                            '{{#if notification.on}}' +
                                            '<div class="item-after">' +
                                                '<div class="item-media">' +
                                                    '<i class="icon icon-notification"></i>' +
                                                '</div>' +
                                            '</div>' +
                                            '{{/if}}' +
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
        function defineDefaultTemplateNotification() {
            defaultTemplateNotification ='<div class="list-block">' +
                '<div class="item-content">' +
                '<div class="item-media">' +
                '<i class="icon icon-{{game.icon}}"></i>' +
                '</div>' +
                '<div class="item-inner">' +
                '<div class="item-title">{{game.name}}</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<form id="form-game-notification">' +
                    '<div class="list-block">' +
                        '<div class="item-content">' +
                            '<div class="item-inner">' +
                                '<div class="item-title label">{{text_notif}}</div>' +
                                '<div class="item-input">' +
                                    '<label class="label-switch">' +
                                    '<input name="notif" type="checkbox" id="ch-box" {{#if game.notification.on}}checked{{/if}}>' +
                                    '<div class="checkbox"></div>' +
                                    '</label>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="list-block" id="picker-date-block">' +
                        '<div class="item-content">' +
                            '<div class="item-inner" id="date-block">' +
                                '<div class="item-title">' + _w.dif_filds[LN].date + '</div>' +
                                '<div class="item-input">' +
                                    '<input id="picker-date" type="text" readonly="" placeholder="' + _w.dif_filds[LN].date + '">' +
                                    '<input name="date" id="picker-date-full" type="hidden" readonly="">' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div id="picker-date-container"></div>' +
                    '</div>' +
                 '</form>';
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
            if (!app._compiledTemplates.game_notification) {
                app._compiledTemplates.game_notification = t7.compile(defaultTemplateNotification);

            }
            templateNotification = app._compiledTemplates.game_notification;

        }


        (function () {
            applyOptions();
            defineDefaultTemplate();
            defineDefaultTemplateNotification();
            compileTemplate();
            self.init();
        }());

        return self;
    };

    app.home = function (options) {
        return new Home_loc(options);
    };
};

