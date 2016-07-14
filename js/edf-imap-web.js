//// Typings. 
/// <reference path="../typings/globals/jquery/index.d.ts" />
/// <reference path="../typings/globals/slick-carousel/slick-carousel.d.ts" />
/// <reference path="../typings/globals/jqueryui/index.d.ts" />
/// <reference path="../typings/globals/jquery.tinyscrollbar/index.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//// Basic validation. 
!function () {
    var me = 'js/edf-imap.web.ts:\n  ';
    if ('undefined' == typeof window)
        throw new Error(me + 'No `window` object');
    if (window['EDF_IMAP_WEB'])
        throw new Error(me + '`EDF_IMAP_WEB` exists');
}();
//// Public API. 
var EDF_IMAP_WEB;
(function (EDF_IMAP_WEB) {
    var me = 'js/edf-imap-web.ts:\n  ';
    //// Define the base class for all Pins. 
    var Pin = (function () {
        function Pin(config, main) {
            this.kind = 'base';
            this.id = 0;
            config.tags = config.tags || []; //@todo find a better defaults syntax
            this.config = config;
            this.main = main;
        }
        Pin.prototype.deactivate = function () {
            this.$el.removeClass('eiw-active');
        };
        Pin.prototype.activate = function () {
            this.$el.addClass('eiw-active');
            this.main.activePin = this;
            this.main.$popup.removeClass('eiw-hidden');
            var _a = this.config, _b = _a.title, title = _b === void 0 ? '' : _b, _c = _a.tags, tags = _c === void 0 ? [] : _c, _d = _a.items, items = _d === void 0 ? [{ src: '', caption: '', content: [''] }] : _d;
            $('.eiw-title').html(title);
            $('.eiw-tags').html("<tt>" + tags.join('</tt><tt>') + "</tt>");
            //// Remove the previous carousel slides, and add the new ones.  
            for (var i = this.main.$carousel.data('eiwCurrentSlideTally'); i > 0; i--) {
                this.main.$carousel.slick('slickRemove', i - 1);
            }
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var item = items_1[_i];
                this.main.$carousel.slick('slickAdd', "<div><img src=\"" + item.src + "\"></div>");
            }
            this.main.$carousel.data('eiwCurrentSlideTally', items.length);
            //// Show caption/content for current slide. 
            $('.eiw-caption').html("<p>" + items[0].caption + "</p>");
            $('.eiw-content').html("<p>" + items[0].content.join('</p><p>') + "</p>");
        };
        Pin.prototype.showSlide = function (slideIndex) {
            var item = this.config.items[slideIndex];
            $('.eiw-caption').html("<p>" + item.caption + "</p>");
            $('.eiw-content').html("<p>" + item.content.join('</p><p>') + "</p>");
        };
        Pin.prototype.renderInfoPoint = function ($wrap) {
            this.$el = $("\n                <div class=\"eiw-info-point eiw-pin-" + this.kind + "\">\n                  " + (this.id || '') + "\n                </div>\n            ");
            this.$el.css({
                left: this.config.x,
                top: this.config.y
            }).data('eiwPinInstance', this); // allows backreference
            $wrap.append(this.$el);
        };
        return Pin;
    }());
    //// Define `Numbered`, `Lightbulb` and `Hidden` Pins. 
    var NumberedPin = (function (_super) {
        __extends(NumberedPin, _super);
        function NumberedPin(config, main) {
            _super.call(this, config, main);
            this.kind = 'numbered';
            this.id = ++this.main.numberedPinTally;
        }
        return NumberedPin;
    }(Pin));
    EDF_IMAP_WEB.NumberedPin = NumberedPin;
    var LightbulbPin = (function (_super) {
        __extends(LightbulbPin, _super);
        function LightbulbPin() {
            _super.apply(this, arguments);
            this.kind = 'lightbulb';
        }
        return LightbulbPin;
    }(Pin));
    EDF_IMAP_WEB.LightbulbPin = LightbulbPin;
    var HiddenPin = (function (_super) {
        __extends(HiddenPin, _super);
        function HiddenPin() {
            _super.apply(this, arguments);
            this.kind = 'hidden';
        }
        return HiddenPin;
    }(Pin));
    EDF_IMAP_WEB.HiddenPin = HiddenPin;
    var Main = (function () {
        function Main() {
            this.pins = [];
            this.numberedPinTally = 0;
        }
        Main.prototype.configure = function (config) {
            this.config = config;
        };
        Main.prototype.addNumberedPin = function (pin) {
            this.pins.push(new NumberedPin(pin, this));
        };
        Main.prototype.addLightbulbPin = function (pin) {
            this.pins.push(new LightbulbPin(pin, this));
        };
        Main.prototype.addHiddenPin = function (pin) {
            this.pins.push(new HiddenPin(pin, this));
        };
        Main.prototype.init = function (wrapSelector) {
            var _this = this;
            //// Get a reference to the HTML element which will contain the app.
            this.$wrap = $(wrapSelector);
            if (!this.$wrap.length)
                throw Error(me + 'No $wrap');
            //// Render the background-image. 
            this.$wrap.append("\n                <div class=\"eiw-bkgnd\">\n                  <img src=\"" + this.config.bkgnd.src + "\">\n                </div>\n            ");
            //// Render each pin. 
            for (var _i = 0, _a = this.pins; _i < _a.length; _i++) {
                var pin = _a[_i];
                pin.renderInfoPoint(this.$wrap);
            }
            $('.eiw-info-point').click(function (evt) {
                for (var _i = 0, _a = _this.pins; _i < _a.length; _i++) {
                    var pin = _a[_i];
                    pin.deactivate();
                }
                $(evt.target).data('eiwPinInstance').activate();
            });
            //// Render the popup (initially hidden).
            this.$popup = $("\n                <div class=\"eiw-popup eiw-hidden\">\n                  <h2  class=\"eiw-title\"    >Title here</h2>\n                  <div class=\"eiw-dismiss\"  >X</div>\n                  <div class=\"eiw-carousel\" ></div>\n                  <h4  class=\"eiw-caption\"  >Caption here</h4>\n                  <div class=\"eiw-arrows\"   ></div>\n                  <div class=\"eiw-dots\"     ></div>\n                  <div class=\"eiw-content\"  ><p>Content here. </p></div>\n                  <div class=\"eiw-tags\"     ><tt>A Tag</tt><tt>Another Tag</tt></div>\n                </div>\n            ");
            this.$wrap.append(this.$popup);
            $('.eiw-dismiss').click(function (evt) {
                for (var _i = 0, _a = _this.pins; _i < _a.length; _i++) {
                    var pin = _a[_i];
                    pin.deactivate();
                }
                _this.$popup.addClass('eiw-hidden');
            });
            //// Initialize the ‘Slick’ carousel. 
            this.$carousel = $('.eiw-carousel');
            this.$carousel
                .data('eiwCurrentSlideTally', 0)
                .slick({
                appendArrows: '.eiw-arrows',
                appendDots: '.eiw-dots',
                dots: true,
                infinite: false
            })
                .on('beforeChange', function (evt, slick, currentSlide, nextSlide) {
                _this.activePin.showSlide(nextSlide);
            });
            //// Render the tagmenu (initially hidden).
            var tags = {};
            for (var _b = 0, _c = this.pins; _b < _c.length; _b++) {
                var pin = _c[_b];
                for (var _d = 0, _e = pin.config.tags; _d < _e.length; _d++) {
                    var tag = _e[_d];
                    tags[tag] = tags[tag] || [];
                    var $accordionLink = $("<li>" + pin.config.title + "</li>");
                    $accordionLink.data('eiwPinInstance', pin);
                    tags[tag].push($accordionLink);
                }
            }
            this.$tagmenu = $("\n                <div class=\"eiw-tagmenu eiw-hidden\">\n                  <h3>" + this.config.tagmenu.heading + "</h3>\n                </div>\n            ");
            var $accordionContent = $('<div></div>');
            this.$tagmenu.append($accordionContent);
            for (var tag in tags) {
                $accordionContent.append("<h4>" + tag + "</h4");
                var $accordionSection = $("<ul>");
                for (var _f = 0, _g = tags[tag]; _f < _g.length; _f++) {
                    var $accordionLink = _g[_f];
                    $accordionSection.append($accordionLink);
                }
                $accordionContent.append($accordionSection);
            }
            this.$wrap.append(this.$tagmenu);
            this.$tagmenu.accordion({
                header: 'h4',
                create: function (event, ui) { console.log(event, ui); }
            });
            $('li', this.$tagmenu).click(function (evt) {
                for (var _i = 0, _a = _this.pins; _i < _a.length; _i++) {
                    var pin = _a[_i];
                    pin.deactivate();
                }
                $(evt.target).data('eiwPinInstance').activate();
            });
        };
        return Main;
    }());
    EDF_IMAP_WEB.Main = Main;
})(EDF_IMAP_WEB || (EDF_IMAP_WEB = {}));
//// We use a singleton instance of `Main` for the app. 
EDF_IMAP_WEB['main'] = new EDF_IMAP_WEB.Main();
