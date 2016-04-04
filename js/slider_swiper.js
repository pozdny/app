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
Framework7.prototype.plugins.sliderSwiper = function (app, globalPluginParams) {     console.log('ok');
    'use strict';
    // Variables in module scope
    var $$ = Dom7,
        t7 = Template7,
        SliderSwiper;

    // Click handler to close sliderSwiper
    $$(document).on('click', '.close-slider', function (e) {
        e.preventDefault();
        var $swiperscreen = $$(this).parents('.swiperSlider');
        if ($swiperscreen.length > 0 && $swiperscreen[0].f7Swiper) { $swiperscreen[0].f7Swiper.close(); }
    });

    /**
     * Represents the welcome screen
     *
     * @class
     * @memberof module:Framework7/prototype/plugins/sliderSwiper
     */
    SliderSwiper = function (slides, options) {

        // Private properties
        var self = this,
            defaultTemplate,
            template,
            container,
            swiper,
            swiperContainer,
            parentContainer,
            defaults = {
                closeButton: true,        // enabled/disable close button
                closeButtonText : 'Skip', // close button text
                cssClass: '',             // additional class on container
                pagination: true,         // swiper pagination
                loop: true,              // swiper loop
                open: true,              // open

            };

        /**
         * Initializes the swiper
         *
         * @private
         */
        function initSwiper() {
            n.swiper = swiper = new Swiper('.swiper-container', {
                direction: 'horizontal',
                loop: options.loop,
                pagination: options.pagination ? parentContainer.find('.swiper-pagination') : undefined
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
            defaultTemplate = '<div class="swiperSlider">' +
                '<div class="swiper-container">' +
                                    '<div class="swiper-wrapper">' +
                '{{#each slides}}' +
                                        '<div class="swiper-slide" {{#if id}}id="{{id}}"{{/if}}>' +
                                            '<div class="info-img img-{{icon}}"></div>' +
                                            '<div class="item-name">' +
                                                 '<div>{{name}}</div>' +
                                            '</div>' +
                                            '<div class="content-block">' +

                                                '{{content}}' +
                                            '</div>' +
                                        '</div>' +
                '{{/each}}' +
                                    '</div>' +
                              '</div>' +
                '</div>' +
                '<div class="swiper-pagination"></div>';

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
                if (!app._compiledTemplates.swiper) {
                    app._compiledTemplates.swiper = t7.compile(defaultTemplate);
                }
                template = app._compiledTemplates.swiper;
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
            container = $$(template({options: options, slides: slides}));
            swiperContainer = container.find('.swiper-container');
            parentContainer = $$('#info-item');
            setColors();
            $$('#info-item').append(container);
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
            // Open on init
            if (options.open) {
                self.open();
            }

        }());

        // Return instance
        return self;
    };

    app.sliderSwiper = function (slides, options) {
        return new SliderSwiper(slides, options);
    };

};