/**
 * Created by user on 13.04.16.
 */


Framework7.prototype.plugins.filter = function (app, globalPluginParams) {
    'use strict';

    var $$ = Dom7,
        t7 = Template7,
        Filter_loc;
    Filter_loc = function (options) {
        this.data = { };

        var self = this,
            defaultTemplate,
            template,
            container,
            parentContainer,
            storage,
            storageGames,
            storageDatesGame,
            arrGames,
            labelArr,
            defaults = {
                elems: {
                    form: '#form-games'
                }
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
        function clearCheckBoxInStorage(){
            storage = storageGet(n.key_storage.categories);
            storage.data.checkedGames = [];
            storageSet(n.key_storage.categories, storage);
        }
        function setCheckBoxToStorage(checkbox){
            storage = storageGet(n.key_storage.categories);
            storage.data.checkedGames = checkbox;
            storageSet(n.key_storage.categories, storage);
        }
        function initCheckbox(){
            labelArr = parentContainer.find('label input');
            var formData,
                checkbox = [];
            labelArr.on('change', function(){
                formData = myApp.formToJSON(options.elems.form);
                checkbox = formData.checkbox;
                console.log(checkbox);
                clearCheckBoxInStorage();
                if(checkbox.length > 0){
                    setCheckBoxToStorage(checkbox);
                }
            })
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
        self.init = function(){
            getStorage();
            getStorageGames();
            getStorageDatesGame();
            parentContainer = $$('#page-filter');
            clearParentContainer(parentContainer);
            var games = getGames();
            container = $$(template({options: options, games:games}));
            parentContainer.append(container);
            initCheckbox();
        };


        /**
         * Sets the default template
         *
         * @private
         */
        function defineDefaultTemplate() {
            defaultTemplate = '<form class="searchbar searchbar-init">' +
                    '<div class="searchbar-input">' +
                        '<input type="search" placeholder="' + _w.dif_filds[LN].search + '">' +
                        '<a href="#" class="searchbar-clear"></a>' +
                    '</div>' +
                    '<a href="#" class="searchbar-cancel">' + _w.dif_filds[LN].cancel + '</a>' +
                '</form>' +
                '<div class="searchbar-overlay"></div>' +
                '<div class="content-block-title">' + _w.dif_filds[LN].filter + '</div>' +
                '<div class="content-block searchbar-not-found">' +
                    '<div class="content-block-inner">' + _w.dif_filds[LN].nothing_found + '</div>' +
                '</div>' +
                '<form class="list-block list-block-search searchbar-found" id="form-games">' +
                    '<ul>' +
                        '{{#each games}}' +
                        '<li>' +
                            '<label class="label-checkbox item-content">' +
                                '<input type="checkbox" name="checkbox" value="{{icon}}">' +
                                '<div class="item-media">' +
                                    '<i class="icon icon-{{icon}}"></i>' +
                                '</div>' +

                                '<div class="item-inner">' +
                                    '<div class="item-title">{{name}}</div>' +
                                '</div>' +
                                '<div class="item-media">' +
                                    '<i class="icon icon-form-checkbox"></i>' +
                                '</div>' +
                            '</label>' +
                        '</li>'+
                        '{{/each}}' +
                    '</ul>' +
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
                if (!app._compiledTemplates.filter) {
                    app._compiledTemplates.filter = t7.compile(defaultTemplate);
                }
                template = app._compiledTemplates.filter;

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

    app.filter = function (options) {
        return new Filter_loc(options);
    };
};


