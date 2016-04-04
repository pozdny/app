/**
 * Created by user on 29.03.16.
 */

Framework7.prototype.plugins.info = function (app, globalPluginParams) {
    'use strict';

    var $$ = Dom7,
        t7 = Template7,
        Info_loc;
    Info_loc = function (options) {
        this.data = { };

        var self = this,
            defaultTemplate,
            template,
            container,
            parentContainer,
            storage,
            defaults = { };
        function getStorage(){
            if(storageGet(n.key_storage.categories)){
                storage = storageGet(n.key_storage.categories);
            }
        }
        function getInfo(){
            getStorage();
            var attractions = storage.attractions[LN],
                ceil = 2,
                obj = {
                    rows: []
                },
                z = 0,
                j = 2;

            $$.each(attractions, function(i, val){
                if(ceil%j === 0){
                    if(j === 2){
                        obj.rows[z] = {
                            img: []
                        };
                    }
                    val.id = i;
                    obj.rows[z].img.push(val);
                    j--;
                    if(j === 0){
                        z++;
                        j = 2;
                    }
                }
            });
            return obj;
        }
        self.init = function(){
            var context;
            parentContainer = $$('#page-info');
            context = getInfo();
            container = $$(template({options: options, row:context.rows}));
            parentContainer.append(container);


        };


        /**
         * Sets the default template
         *
         * @private
         */
        function defineDefaultTemplate() {
            defaultTemplate = '<div class="info-block">' +
                '{{#each row}}' +
                '<div class="row">' +
                    '{{#each img}}' +
                    '<a href="#info-one?id={{id}}" class="col-50 info-img img-{{icon}} link">' +
                         '<div class="title">{{name}}</div>' +
                    '</a>'  +
                    '{{/each}}' +
                '</div>' +
                '{{/each}}' +
                '</div>';
        }

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
                if (!app._compiledTemplates.info) {
                    app._compiledTemplates.info = t7.compile(defaultTemplate);
                }
                template = app._compiledTemplates.info;

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

    app.info = function (options) {
        return new Info_loc(options);
    };
};

