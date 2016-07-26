var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//// Classes. 
/// <reference path="eiw-main.ts" />
//// EDF_IMAP_WEB.Pin
var EDF_IMAP_WEB;
(function (EDF_IMAP_WEB) {
    var Pin;
    (function (Pin_1) {
        var me = 'js/edf-pin.ts:\n  ';
        //// Define the base class for all Pins. 
        var Pin = (function () {
            function Pin(config, main) {
                this.kind = 'base';
                this.id = 0;
                config.tags = config.tags || []; //@todo find a better defaults syntax
                this.config = config;
                this.main = main;
                if (!config.isXtra) {
                    if (!config.tags[0])
                        throw new RangeError(me + config.slug + ' has no tags');
                    this.color = main.config.tagcolors[config.tags[0]];
                    if (!this.color)
                        throw new RangeError(me + config.tags[0] + ' not found');
                }
            }
            Pin.prototype.deactivate = function () {
                this.$el.removeClass('eiw-active');
                this.main.activePin = null;
            };
            Pin.prototype.activate = function () {
                this.$el.addClass('eiw-active');
                this.main.activePin = this;
                this.main.$popup.removeClass('eiw-hidden');
                var _a = this.config, _b = _a.title, title = _b === void 0 ? '' : _b, _c = _a.tags, tags = _c === void 0 ? [] : _c, _d = _a.slides, slides = _d === void 0 ? [{ src: '', caption: '', content: [''] }] : _d;
                this.main.$title.html(title);
                $('.eiw-tags', this.main.$wrap).html("<tt>" + tags.join('</tt><tt>') + "</tt>");
                //// Remove the previous carousel slides, and add the new ones.  
                for (var i = this.main.$carousel.data('eiwCurrentSlideTally'); i > 0; i--) {
                    this.main.$carousel.slick('slickRemove', i - 1);
                }
                this.main.$carousel.data('eiwCurrentSlideTally', slides.length);
                if (1 === slides.length && !slides[0].src) {
                    this.main.$popup.addClass('eiw-carousel-hidden');
                }
                else {
                    this.main.$popup.removeClass('eiw-carousel-hidden');
                    for (var _i = 0, slides_1 = slides; _i < slides_1.length; _i++) {
                        var slide = slides_1[_i];
                        var media = void 0;
                        if (!slide.src) {
                            media = '';
                        }
                        else if ('.mp4' === slide.src.substr(-4)) {
                            media = "<video loop src=\"" + slide.src + "\"></video>";
                        }
                        else {
                            media = "<img src=\"" + slide.src + "\">";
                        }
                        this.main.$carousel.slick('slickAdd', "<div>" + media + "</div>");
                    }
                    if (slides[0] && '.mp4' === slides[0].src.substr(-4)) {
                        $('[data-slick-index="0"] video', this.main.$carousel)[0]['play']();
                    }
                }
                //// Show caption and content for current slide. 
                this.showSlide(0);
                // $('.eiw-caption', this.main.$wrap)
                //    .html(slides[0].caption ? `<h4>${slides[0].caption}</h4>` : '')
                // ;
                // $('.eiw-content', this.main.$wrap)
                //    .html(slides[0].content ? `<p>${slides[0].content['join']('</p><p>')}</p>` : '')
                //    .css('height', this.main.calcContentHeight() - 45 ) // `- 45` allows for padding
                // ;
            };
            Pin.prototype.showSlide = function (slideIndex) {
                var slide = this.config.slides[slideIndex];
                var src = slide.src, caption = slide.caption, content = slide.content;
                if ('number' == typeof caption)
                    caption = this.config.slides[caption].caption;
                if ('number' == typeof content)
                    content = this.config.slides[content].content;
                this.main.$caption.html(caption ? "<h4>" + caption + "</h4>" : '');
                this.main.$content.html(content ? "<p>" + content['join']('</p><p>') + "</p>" : '');
                var contentBottom = this.main.$content.position().top + this.main.$content.outerHeight(true);
                var gap = $(window).innerHeight() - contentBottom; // was `this.main.$sidebar.position().top - contentBottom;`
                if (50 > gap) {
                    var currHeight = this.main.$content.height();
                    this.main.$content.height(currHeight - 50 + gap);
                }
                else {
                    this.main.$content.css('height', 'auto');
                    contentBottom = this.main.$content.position().top + this.main.$content.outerHeight(true);
                    gap = $(window).innerHeight() - contentBottom; // was `this.main.$sidebar.position().top - contentBottom;`
                    // console.log('gap', gap, 'contentBottom', contentBottom)
                    if (50 > gap) {
                        // console.log(33)
                        var currHeight = this.main.$content.height();
                        this.main.$content.height(currHeight - 50 + gap);
                    }
                }
                var resultingHeight = this.main.$content.height()
                    + Math.max(this.main.$caption.height(), this.main.$dots.height())
                    + this.main.$carousel.height()
                    + this.main.$title.height();
                resultingHeight = Math.min(resultingHeight, $(window).innerHeight() - this.main.$popup.position().top);
                this.main.$popup.css('height', resultingHeight); // allows CSS transition
                this.main.$content.scrollTop(0);
            };
            Pin.prototype.resetGif = function (slideIndex) {
                var slide = this.config.slides[slideIndex];
                var src = slide.src, caption = slide.caption, content = slide.content;
                if ('.gif' === src.substr(-4)) {
                }
            };
            Pin.prototype.renderInfoPoint = function ($container) {
                if ('hidden' == this.kind) {
                    this.$el = $("\n                    <div class=\"eiw-info-point eiw-pin-hidden eiw-info-point-" + this.config.slug + "\"></div>\n                ");
                }
                else {
                    this.$el = $("\n                    <div class=\"eiw-info-point eiw-pin-numbered eiw-info-point-" + this.config.slug + "\">\n                    <img src=\"assets/icon-teardrop-" + this.color + ".png\">\n                    </div>\n                ");
                }
                this.$el.css({
                    left: this.config.x,
                    top: this.config.y
                }).data('eiwPinInstance', this); // allows backreference
                $container.append(this.$el);
            };
            Pin.prototype.updateInfoPoint = function (top, left, zoom) {
                this.$el.css({
                    left: this.config.x * zoom + left,
                    top: this.config.y * zoom + top
                });
            };
            return Pin;
        }());
        Pin_1.Pin = Pin;
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
        Pin_1.NumberedPin = NumberedPin;
        var LightbulbPin = (function (_super) {
            __extends(LightbulbPin, _super);
            function LightbulbPin() {
                _super.apply(this, arguments);
                this.kind = 'lightbulb';
            }
            return LightbulbPin;
        }(Pin));
        Pin_1.LightbulbPin = LightbulbPin;
        var HiddenPin = (function (_super) {
            __extends(HiddenPin, _super);
            function HiddenPin() {
                _super.apply(this, arguments);
                this.kind = 'hidden';
            }
            return HiddenPin;
        }(Pin));
        Pin_1.HiddenPin = HiddenPin;
    })(Pin = EDF_IMAP_WEB.Pin || (EDF_IMAP_WEB.Pin = {}));
})(EDF_IMAP_WEB || (EDF_IMAP_WEB = {})); // end `EDF_IMAP_WEB.Pin` namespace
//// Typings. 
/// <reference path="../typings/globals/jquery/index.d.ts" />
/// <reference path="../typings/globals/slick-carousel/slick-carousel.d.ts" />
/// <reference path="../typings/globals/jquery.tinyscrollbar/index.d.ts" />
//// Classes. 
/// <reference path="eiw-pin.ts" />
//// EDF_IMAP_WEB.Main
var EDF_IMAP_WEB;
(function (EDF_IMAP_WEB) {
    var Main;
    (function (Main_1) {
        var me = 'js/eiw-main.ts:\n  ';
        var Main = (function () {
            function Main() {
                this.pins = [];
                this.numberedPinTally = 0;
                this.activePin = null;
            }
            Main.prototype.configure = function (config) {
                this.config = config;
            };
            Main.prototype.addNumberedPin = function (pin) {
                this.pins.push(new EDF_IMAP_WEB.Pin.NumberedPin(pin, this));
            };
            Main.prototype.addLightbulbPin = function (pin) {
                this.pins.push(new EDF_IMAP_WEB.Pin.LightbulbPin(pin, this));
            };
            Main.prototype.addHiddenPin = function (pin) {
                this.pins.push(new EDF_IMAP_WEB.Pin.HiddenPin(pin, this));
            };
            Main.prototype.resizeBkgnds = function () {
                var aspectRatio = this.config.bkgnd.height / this.config.bkgnd.width;
                var innerWidth = $(window).innerWidth();
                var innerHeight = $(window).innerHeight();
                var bkgndsWidth = innerHeight / aspectRatio;
                bkgndsWidth = Math.max(bkgndsWidth, innerWidth * 0.7);
                bkgndsWidth = Math.min(bkgndsWidth, innerWidth - 120);
                this.$sidebar.css({
                    width: innerWidth - bkgndsWidth + 2 // `+ 2` allows a little overlap
                });
                this.$bkgnds.css({
                    height: innerHeight,
                    width: bkgndsWidth
                });
                this.$rtn2map.css('left', innerWidth - bkgndsWidth);
            };
            Main.prototype.updatePins = function () {
                var _a = this.$bkgndAImg.position(), top = _a.top, left = _a.left;
                var containerLeft = this.$bkgndA.position().left;
                var width = this.$bkgndAImg.width();
                var height = this.$bkgndAImg.height();
                // let headerRt = Math.max(4, $(window).width() - (left + width - 4) );
                // this.$headerA.css('right', headerRt);
                // this.$headerB.css('right', headerRt);
                var zoom = width / this.config.bkgnd.width;
                if (this.prevTop === top
                    && this.prevLeft === left
                    && this.prevWidth === width
                    && this.prevHeight === height) {
                    return;
                } // no need to update anything
                this.prevTop = top;
                this.prevLeft = left;
                this.prevWidth = width;
                this.prevHeight = height;
                this.$bkgndBImg.css({
                    top: top,
                    left: left,
                    width: width,
                    height: height
                });
                for (var _i = 0, _b = this.pins; _i < _b.length; _i++) {
                    var pin = _b[_i];
                    pin.updateInfoPoint(top, left + this.$bkgndA.position().left, zoom);
                }
            };
            Main.prototype.hideAll = function (except) {
                for (var _i = 0, _a = this.pins; _i < _a.length; _i++) {
                    var pin = _a[_i];
                    pin.deactivate();
                }
                if ('tagmenu' !== except) {
                    this.$tagmenu.addClass('eiw-min').height(0);
                    $('.eiw-tagmenu-toggle', this.$wrap).removeClass('eiw-active');
                }
                if ('xtramenu' !== except) {
                    this.$xtramenu.addClass('eiw-min').height(0);
                    $('.eiw-xtramenu-toggle', this.$wrap).removeClass('eiw-active');
                }
                this.$popup.addClass('eiw-hidden');
                $('h4, li', this.$tagmenu).removeClass('eiw-active');
                $('> div > div', this.$tagmenu).css('height', 0);
            };
            Main.prototype.init = function (wrapSelector) {
                var _this = this;
                //// Get a reference to the HTML element which will contain the app.
                this.$wrap = $(wrapSelector);
                if (!this.$wrap.length)
                    throw Error(me + 'No $wrap');
                this.$wrap.addClass('eiw-view-a');
                //// Reset the display when the window is resized. 
                $(window).on('resize', function () {
                    _this.hideAll();
                    _this.updatePins();
                });
                //// Render the header. 
                this.$wrap.append("\n                <div class=\"eiw-header-a\">" + this.config.header.titleA + "</div>\n                <div class=\"eiw-header-b\">" + this.config.header.titleB + "</div>\n                <div class=\"eiw-rtn2map\"><span class=\"eiw-dismiss\">X</span><div>" + this.config.header.rtn2Map + "</div></div>\n            ");
                this.$rtn2map = $('.eiw-rtn2map', this.$wrap);
                this.$headerA = $('.eiw-header-a', this.$wrap);
                this.$headerB = $('.eiw-header-b', this.$wrap);
                this.$rtn2map.click(function () {
                    $('.eiw-changeview', _this.$wrap).click();
                });
                //// Render the sidebar. 
                this.$wrap.append("\n                <div class=\"eiw-sidebar\">\n                  <div>\n                    <div class=\"eiw-tagmenu-toggle\">\n                      <div class=\"eiw-button\">\n                        <span>\n                          <span class=\"eiw-icon\">\n                            <img class=\"eiw-default\" src=\"assets/icon-burger-tow-130x130.png\">\n                            <img class=\"eiw-hover\"   src=\"assets/icon-burger-wot-130x130.png\">\n                          </span>\n                          <span class=\"eiw-text\">\n                            " + this.config.tagmenu.title + "\n                          </span>\n                        </span>\n                      </div>\n                    </div>\n                  </div>\n                  <div>\n                    <div class=\"eiw-xtramenu-toggle\">\n                      <div class=\"eiw-button\">\n                        <span>\n                          <span class=\"eiw-icon\">\n                            <img class=\"eiw-default\" src=\"assets/icon-burger-tow-130x130.png\">\n                            <img class=\"eiw-hover\"   src=\"assets/icon-burger-wot-130x130.png\">\n                          </span>\n                          <span class=\"eiw-text\">\n                            " + this.config.xtramenu.title + "\n                          </span>\n                        </span>\n                      </div>\n                    </div>\n                  </div>\n                  <div>\n                    <div class=\"eiw-changeview\">\n                      <div>\n                        <img src=\"assets/icon-changeview-wot-130x130.png\">\n                        " + this.config.changeview.title + "\n                      </div>\n                    </div>\n                  </div>\n                  <div>\n                    <div class=\"eiw-instructions\">\n                      <div>\n                        <img class=\"eiw-icon-pin\" src=\"assets/icon-numbered.png\">\n                        <span class=\"eiw-text\">" + this.config.instructions.title + "</span>\n                        <div class=\"eiw-icon-logo\"><img src=\"assets/icon-logo-212x192.png\"></div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n            ");
                this.$sidebar = $('.eiw-sidebar');
                $('.eiw-tagmenu-toggle .eiw-button', this.$wrap).click(function () {
                    _this.hideAll('tagmenu');
                    if (_this.$tagmenu.hasClass('eiw-min')) {
                        _this.$tagmenu
                            .removeClass('eiw-min')
                            .css('height', $('> div', _this.$tagmenu).height());
                    }
                    else {
                        _this.$tagmenu
                            .addClass('eiw-min')
                            .css('height', 0);
                    }
                    $('.eiw-tagmenu-toggle', _this.$wrap).toggleClass('eiw-active');
                });
                $('.eiw-xtramenu-toggle .eiw-button', this.$wrap).click(function () {
                    _this.hideAll('xtramenu');
                    if (_this.$xtramenu.hasClass('eiw-min')) {
                        _this.$xtramenu
                            .removeClass('eiw-min')
                            .css('height', $('> div', _this.$xtramenu).height());
                    }
                    else {
                        _this.$xtramenu
                            .addClass('eiw-min')
                            .css('height', 0);
                    }
                    $('.eiw-xtramenu-toggle', _this.$wrap).toggleClass('eiw-active');
                });
                $('.eiw-changeview', this.$wrap).click(function () {
                    _this.hideAll();
                    _this.$wrap.toggleClass('eiw-view-a');
                });
                //// Render the background-images. 
                this.$wrap.append("\n                <div class=\"eiw-bkgnds\">\n                  <div class=\"eiw-bkgnd-b\"><img src=\"" + this.config.bkgnd.srcB + "\"></div>\n                  <div class=\"eiw-bkgnd-a\"></div>\n                </div>\n            ");
                this.$bkgnds = $('.eiw-bkgnd-a, .eiw-bkgnd-b', this.$wrap);
                this.$bkgnds.click(function () {
                    _this.hideAll();
                });
                this.resizeBkgnds();
                this.$bkgndA = $('.eiw-bkgnd-a', this.$wrap);
                var minWidth = $('.eiw-bkgnd-a').width() * 1.01 / this.config.bkgnd.width; // `* 1.01` fills the container more fully */
                var minHeight = $('.eiw-bkgnd-a').height() * 1.01 / this.config.bkgnd.height;
                this.$bkgndA.iviewer({
                    src: this.config.bkgnd.srcA,
                    zoom_min: Math.min(minWidth, minHeight) * 100,
                    zoom_max: 100,
                    zoom_delta: 1.2,
                    ui_disabled: true,
                    onZoom: function (evt, zoom) {
                        _this.updatePins();
                    },
                    onAfterZoom: function (evt, zoom) {
                        _this.updatePins();
                    },
                    onDrag: function (evt, coords) {
                        _this.updatePins();
                    }
                });
                this.$bkgndAImg = $('.eiw-bkgnd-a img', this.$wrap);
                this.$bkgndBImg = $('.eiw-bkgnd-b img', this.$wrap);
                $(window).on('resize', function () {
                    _this.resizeBkgnds();
                    _this.$bkgndA.iviewer('update');
                });
                //// Render each pin. 
                for (var _i = 0, _a = this.pins; _i < _a.length; _i++) {
                    var pin = _a[_i];
                    pin.renderInfoPoint(this.$wrap);
                }
                this.$infoPoints = $('.eiw-info-point', this.$wrap);
                this.$infoPoints
                    .click(function (evt) {
                    _this.hideAll();
                    $(evt.currentTarget).data('eiwPinInstance').activate();
                })
                    .hover(function (evt) {
                    $('li', _this.$tagmenu).removeClass('eiw-active');
                    if ($(evt.target).parent().data('eiwTagmenuLI')) {
                        $(evt.target).parent().data('eiwTagmenuLI').addClass('eiw-active');
                    }
                })
                    .mouseleave(function (evt) {
                    $('li', _this.$tagmenu).removeClass('eiw-active');
                });
                //// Render the popup (initially hidden).
                this.$popup = $("\n                <div class=\"eiw-popup eiw-hidden\">\n                  <div>\n                    <div>\n                      <div class=\"eiw-dismiss\"  >X</div>\n                      <h2  class=\"eiw-title\"    >Title here</h2>\n                      <div class=\"eiw-carousel\" ></div>\n                      <div class=\"eiw-arrows\"   ></div>\n                      <div class=\"eiw-dots\"     ></div>\n                      <div class=\"eiw-caption\"  >Caption here</div>\n                    </div>\n                  </div>\n                  <div>\n                    <div>\n                      <div class=\"eiw-content\"  ><p>Content here. </p></div>\n                      <div class=\"eiw-tags\"     ><tt>A Tag</tt><tt>Another Tag</tt></div>\n                    </div>\n                  </div>\n                </div>\n            ");
                this.$wrap.append(this.$popup);
                this.$title = $('.eiw-title', this.$wrap);
                this.$caption = $('.eiw-caption', this.$wrap);
                this.$dots = $('.eiw-dots', this.$wrap);
                this.$content = $('.eiw-content', this.$wrap);
                $('.eiw-dismiss', this.$wrap).click(function (evt) {
                    _this.hideAll();
                });
                $('.eiw-arrows', this.$wrap).append("\n                <img class=\"eiw-arrow-left\"       src=\"assets/icon-arrow-left-130x200.png\">\n                <img class=\"eiw-arrow-glow-left\"  src=\"assets/icon-arrow-glow-left-130x200.png\">\n                <img class=\"eiw-arrow-right\"      src=\"assets/icon-arrow-right-130x200.png\">\n                <img class=\"eiw-arrow-glow-right\" src=\"assets/icon-arrow-glow-right-130x200.png\">\n            ");
                //// Initialize the ‘Slick’ carousel. 
                this.$carousel = $('.eiw-carousel', this.$wrap);
                this.$carousel
                    .data('eiwCurrentSlideTally', 0)
                    .slick({
                    prevArrow: '.eiw-arrow-left',
                    nextArrow: '.eiw-arrow-right',
                    appendDots: '.eiw-dots',
                    dots: true,
                    infinite: false
                })
                    .on('beforeChange', function (evt, slick, currentSlide, nextSlide) {
                    _this.activePin.showSlide(nextSlide);
                })
                    .on('afterChange', function (evt, slick, currentSlide) {
                    _this.activePin.resetGif(currentSlide);
                });
                //// Render the tagmenu (initially hidden).
                var tags = {};
                for (var _b = 0, _c = this.pins; _b < _c.length; _b++) {
                    var pin = _c[_b];
                    for (var _d = 0, _e = pin.config.tags; _d < _e.length; _d++) {
                        var tag = _e[_d];
                        tags[tag] = tags[tag] || [];
                        var $tagmenuLink = $("<li>" + pin.config.title + "</li>");
                        $tagmenuLink.data('eiwPinInstance', pin);
                        pin.$el.data('eiwTagmenuLI', $tagmenuLink);
                        tags[tag].push($tagmenuLink);
                    }
                }
                this.$tagmenu = $("<div class=\"eiw-tagmenu eiw-min\">");
                var $tagmenuContent = $("<div>");
                if (this.config.tagmenu.heading) {
                    $tagmenuContent.append("<h3>" + this.config.tagmenu.heading + "</h3>");
                }
                this.$tagmenu.append($tagmenuContent);
                for (var tag in tags) {
                    var $tagmenuHeading = $("<h4 class=\"eiw-color-" + this.config.tagcolors[tag] + "\">" + tag + "</h4>");
                    var $tagmenuSection = $("<div class=\"eiw-section eiw-min eiw-color-" + this.config.tagcolors[tag] + "\">");
                    var $tagmenuUL = $("<ul>");
                    for (var _f = 0, _g = tags[tag]; _f < _g.length; _f++) {
                        var $tagmenuLink = _g[_f];
                        $tagmenuUL.append($tagmenuLink);
                    }
                    $tagmenuSection.append($tagmenuUL);
                    $tagmenuContent.append($tagmenuHeading);
                    $tagmenuHeading.data('eiwSection', $tagmenuSection);
                    $tagmenuContent.append($tagmenuSection);
                }
                $('.eiw-tagmenu-toggle', this.$wrap).append(this.$tagmenu);
                $('h4', this.$tagmenu).click(function (evt) {
                    var $tagmenuHeading = $(evt.target);
                    var $tagmenuSection = $tagmenuHeading.data('eiwSection');
                    var $previouslyOpen = $('> div > div', _this.$tagmenu).not('.eiw-min');
                    var isMin = $tagmenuSection.hasClass('eiw-min');
                    var tagmenuSectionHeight = $('> ul', $tagmenuSection).height();
                    var tagmenuHeight = $('> div', _this.$tagmenu).height();
                    if (0 === $previouslyOpen.length && isMin) {
                        tagmenuHeight += tagmenuSectionHeight;
                    }
                    else if ($previouslyOpen.length && isMin) {
                        tagmenuHeight += tagmenuSectionHeight -= $previouslyOpen.height();
                    }
                    else if (!isMin) {
                        tagmenuHeight -= tagmenuSectionHeight;
                    }
                    else {
                        console.log('!');
                    }
                    $('h4', _this.$tagmenu).removeClass('eiw-active');
                    $('> div > div', _this.$tagmenu).addClass('eiw-min').css('height', 0);
                    _this.$tagmenu.css('height', tagmenuHeight);
                    if (isMin) {
                        $tagmenuSection
                            .removeClass('eiw-min')
                            .css('height', $('> ul', $tagmenuSection).height());
                        $tagmenuHeading
                            .addClass('eiw-active');
                    }
                });
                $('li', this.$tagmenu)
                    .click(function (evt) {
                    _this.hideAll();
                    $(evt.target).data('eiwPinInstance').activate();
                })
                    .hover(function (evt) {
                    _this.$infoPoints.removeClass('eiw-active');
                    $(evt.target).data('eiwPinInstance').$el.addClass('eiw-active');
                })
                    .mouseleave(function (evt) {
                    _this.$infoPoints.removeClass('eiw-active');
                });
                //// Render the xtramenu (initially hidden).
                this.$xtramenu = $("\n                <div class=\"eiw-xtramenu eiw-min\">\n                  <div>\n                    <h3>" + this.config.xtramenu.heading + "</h3>\n                  </div>\n                </div>\n            ");
                for (var _h = 0, _j = this.pins; _h < _j.length; _h++) {
                    var pin = _j[_h];
                    if (!pin.config.isXtra)
                        continue;
                    var $xtraLink = $("<h4>" + pin.config.title + "</h4>");
                    $xtraLink.data('eiwPinInstance', pin);
                    $('> div', this.$xtramenu).append($xtraLink);
                }
                $('.eiw-xtramenu-toggle', this.$wrap).append(this.$xtramenu);
                $('h4', this.$xtramenu).click(function (evt) {
                    _this.hideAll();
                    $(evt.target).data('eiwPinInstance').activate();
                });
                //// Set the initial pin positions, and fix various browser no-update issues. 
                this.updatePins();
                window.setInterval(function () {
                    _this.updatePins();
                }, 300);
            };
            return Main;
        }());
        Main_1.Main = Main;
    })(Main = EDF_IMAP_WEB.Main || (EDF_IMAP_WEB.Main = {}));
})(EDF_IMAP_WEB || (EDF_IMAP_WEB = {})); // end `EDF_IMAP_WEB.Main` namespace
//// We use a singleton instance of `Main` for the app. 
window['EDF_IMAP_WEB'].app = new EDF_IMAP_WEB.Main.Main();
