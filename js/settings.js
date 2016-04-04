/**
 * Created by user on 29.01.16.
 */

Framework7.prototype.plugins.settings = function (app, globalPluginParams) {
    'use strict';

    var $$ = Dom7,
        t7 = Template7,
        Settings_loc;
    Settings_loc = function (options) {
        this.data = { };

        var self = this,
            defaultTemplate,
            template,
            container,
            parentContainer,
            storage,
            soundsBlock,
            notificationsBlock,
            iconSounds,
            iconNotifications,
            checkBoxSounds,
            checkBoxNotifications,
            defaults = { };
        function getStorage(){
            if(storageGet(n.key_storage.categories)){
                storage = storageGet(n.key_storage.categories);
            }
        }
        function getSettings(){
            getStorage();
            var storageSettings = storage.settings;
            var obj = [];
            obj.push({
                title: "sounds",
                name: _w.settings[LN].sounds,
                status: storage.settings.sounds,
                icon: "sounds"
            });
            obj.push({
                title: "notifications",
                name: _w.settings[LN].notifications,
                status: storage.settings.notifications,
                icon: "notifications"
            });
            return obj;
        }
        function initFirstStatusForSettings(status, icon, checkbox){
            if(status){
                icon.addClass('active');
            }else{
                icon.removeClass('active');
            }
            if(checkbox !== undefined){
                checkbox.prop('checked', status);
            }
            //$$('#ch-sounds').prop('checked', false);
        }
        function onChangeButtonAction(){
            checkBoxSounds.on('change', function(){
                storage = storageGet(n.key_storage.categories);
                storage.settings.sounds = $$(this).prop('checked');
                initFirstStatusForSettings(storage.settings.sounds, iconSounds);
                storageSet(n.key_storage.categories, storage);
            });
            checkBoxNotifications.on('change', function(){
                storage = storageGet(n.key_storage.categories);

                storage.settings.notifications = $$(this).prop('checked');
                if($$(this).prop('checked')){
                    createNotification();
                }
                else{
                    deleteNotification();
                }
                initFirstStatusForSettings(storage.settings.notifications, iconNotifications);
                storageSet(n.key_storage.categories, storage);
            });
        }
        function drowView(){
            getStorage();
            var storageSettings = storage.settings;
            initFirstStatusForSettings(storageSettings.sounds, iconSounds, checkBoxSounds);
            initFirstStatusForSettings(storageSettings.notifications, iconNotifications, checkBoxNotifications);

        }
        function initSettingsBlocks(){
            soundsBlock = $$('.li-sounds');
            notificationsBlock = $$('.li-notifications');
            iconSounds = soundsBlock.find('.icon-sounds');
            iconNotifications = notificationsBlock.find('.icon-notifications');
            checkBoxSounds = soundsBlock.find('input');
            checkBoxNotifications = notificationsBlock.find('input');
            drowView();
            onChangeButtonAction();
        }
        self.init = function(){
            var context;
            parentContainer = $$('#page-settings');
            context = getSettings();
            container = $$(template({options: options, li:context}));
            parentContainer.append(container);
            initSettingsBlocks();
        };


        /**
         * Sets the default template
         *
         * @private
         */
        function defineDefaultTemplate() {
                defaultTemplate = '<div class="list-block">' +
                    '<ul>' +
                    '{{#each li}}' +
                        '<li class="li-{{title}}">' +
                            '<div class="item-content">' +
                                '<div class="item-media">' +
                                    '<i class="icon icon-{{icon}} {{#if status}}active{{/if}}"></i>' +
                                '</div>' +
                                '<div class="item-inner">' +
                                    '<div class="item-title label">{{name}}</div>' +
                                    '<div class="item-input">' +
                                        '<label class="label-switch">' +
                                            '<input type="checkbox" id="ch-{{title}}">' +
                                                '<div class="checkbox"></div>' +
                                        '</label>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</li>' +
                    '{{/each}}' +
                    '</ul>' +
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
                if (!app._compiledTemplates.settings) {
                    app._compiledTemplates.settings = t7.compile(defaultTemplate);
                }
                template = app._compiledTemplates.settings;

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

    app.settings = function (options) {
        return new Settings_loc(options);
    };
};

