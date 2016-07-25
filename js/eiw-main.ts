//// Typings. 
/// <reference path="../typings/globals/jquery/index.d.ts" />
/// <reference path="../typings/globals/slick-carousel/slick-carousel.d.ts" />
/// <reference path="../typings/globals/jqueryui/index.d.ts" />
/// <reference path="../typings/globals/jquery.tinyscrollbar/index.d.ts" />

//// Classes. 
/// <reference path="eiw-pin.ts" />


//// EDF_IMAP_WEB.Main
namespace EDF_IMAP_WEB { export namespace Main {

    let me = 'js/eiw-main.ts:\n  ';

    //// Describe the `Main` class’s configuration-object. 
    interface Config {
        bkgnd: {
            srcA:    string;
            srcB:    string;
            width:   number;
            height:  number;
        };
        header: {
            titleA:  string;
            titleB:  string;
            rtn2Map: string; 
        }
        tagmenu: {
            title:   string;
            heading: string;
        }
        xtramenu: {
            title:   string;
            heading: string;
        }
        changeview: {
            title:   string;
        }
        gps: {
            title:   string;
        }
        instructions: {
            title:   string;
        }
        tagcolors: Object
    }

    export class Main {

        constructor () {
        }

        config:           Config;
        $wrap:            JQuery;
        $headerA:         JQuery;
        $headerB:         JQuery;
        $bkgndA:          JQuery;
        $bkgndAImg:       JQuery;
        $bkgndBImg:       JQuery;
        $popup:           JQuery;
        $carousel:        JQuery;
        $caption:         JQuery;
        $content:         JQuery;
        $tagmenu:         JQuery;
        $xtramenu:        JQuery;
        $footer:          JQuery;
        pins:             Pin.Pin[] = [];
        numberedPinTally: number = 0;
        activePin:        Pin.Pin = null;
        prevTop:          number;
        prevLeft:         number;
        prevWidth:        number;
        prevHeight:       number;
        zoomFix:          boolean;

        configure (config:Config) {
            this.config = config;
        }

        addNumberedPin (pin:Pin.Config) {
            this.pins.push( new Pin.NumberedPin(pin, this) );
        }

        addLightbulbPin (pin:Pin.Config) {
            this.pins.push( new Pin.LightbulbPin(pin, this) );
        }

        addHiddenPin (pin:Pin.Config) {
            this.pins.push( new Pin.HiddenPin(pin, this) );
        }

        updatePins () {
            let { top, left } = this.$bkgndAImg.position();
            let width = this.$bkgndAImg.width();
            let height = this.$bkgndAImg.height();
            let headerRt = Math.max(4, $(window).width() - (left + width - 4) );
            this.$headerA.css('right', headerRt);
            this.$headerB.css('right', headerRt);
            let zoom = width / this.config.bkgnd.width;
            if (
                this.prevTop    === top
             && this.prevLeft   === left
             && this.prevWidth  === width
             && this.prevHeight === height
            ) { return; } // no need to update anything
            this.prevTop    = top;
            this.prevLeft   = left;
            this.prevWidth  = width;
            this.prevHeight = height;
            this.$bkgndBImg.css({
                top:    top
              , left:   left
              , width:  width
              , height: height
            });
            for (let pin of this.pins) {
                pin.updateInfoPoint(top, left, zoom);
            }
        }

        hideAll (except?:string) {
            for (let pin of this.pins) { pin.deactivate(); }
            if ('tagmenu' !== except) {
                $('.eiw-tagmenu', this.$wrap).addClass('eiw-hidden');
                $('.eiw-tagmenu-toggle', this.$wrap).removeClass('eiw-active');
            }
            if ('xtramenu' !== except) {
                $('.eiw-xtramenu', this.$wrap).addClass('eiw-hidden');
                $('.eiw-xtramenu-toggle', this.$wrap).removeClass('eiw-active');
            }
            this.$popup.addClass('eiw-hidden');
        }

        // calcContentHeight () { // used to update popup-content height
        //     let popupBottom = this.$popup.position().top + this.$popup.outerHeight(true);
        //     let captionBottom = this.$caption.position().top + this.$caption.outerHeight(true);
        //     return popupBottom - captionBottom; 
        // }

        init (wrapSelector:string) {

            //// Get a reference to the HTML element which will contain the app.
            this.$wrap = $(wrapSelector)
            if (! this.$wrap.length) throw Error(me+'No $wrap');
            this.$wrap.addClass('eiw-view-a');

            //// Reset the display when the window is resized. 
            $(window).on('resize', () => {
                this.hideAll();
                this.updatePins();
            });

            //// Render the header. 
            this.$wrap.append(`
                <div class="eiw-header-a">${this.config.header.titleA}</div>
                <div class="eiw-header-b">${this.config.header.titleB}</div>
                <div class="eiw-rtn2map"><span class="eiw-dismiss">X</span><div>${this.config.header.rtn2Map}</div></div>
            `);
            $('.eiw-rtn2map', this.$wrap).click( () => {
                $('.eiw-changeview', this.$wrap).click();
            });
            this.$headerA = $('.eiw-header-a', this.$wrap);
            this.$headerB = $('.eiw-header-b', this.$wrap);

            //// Render the footer. 
            this.$wrap.append(`
                <div class="eiw-footer">
                  <div class="eiw-tagmenu-toggle"><span>
                    <span class="eiw-icon">
                      <img class="eiw-default" src="assets/icon-burger-tow-130x130.png">
                      <img class="eiw-hover"   src="assets/icon-burger-wot-130x130.png">
                    </span>
                    <span class="eiw-text">
                      ${this.config.tagmenu.title}
                    </span>
                  </span></div>
                  <div class="eiw-xtramenu-toggle"><span>
                    <span class="eiw-text">
                      ${this.config.xtramenu.title}
                    </span>
                    <span class="eiw-icon">
                      <img class="eiw-hover"   src="assets/icon-burger-wot-130x130.png">
                      <img class="eiw-default" src="assets/icon-burger-tow-130x130.png">
                    </span>
                  </span></div>
                  <div class="eiw-changeview">
                    <img src="assets/icon-changeview-wot-130x130.png">
                    ${this.config.changeview.title}
                  </div>
                  <div class="eiw-gps">
                    ${/*<img src="assets/icon-gps-wot-130x130.png">*/''}
                    ${this.config.gps.title}
                  </div>
                  <div class="eiw-instructions">
                    <img class="eiw-icon-pin" src="assets/icon-numbered.png">
                    <span class="eiw-text">${this.config.instructions.title}</span>
                    <img class="eiw-icon-logo" src="assets/icon-logo-212x192.png">
                  </div>
                </div>
            `);
            this.$footer = $('.eiw-footer');
            $('.eiw-tagmenu-toggle', this.$wrap).click( () => {
                this.hideAll('tagmenu');
                $('.eiw-tagmenu', this.$wrap).toggleClass('eiw-hidden');
                $('.eiw-tagmenu-toggle', this.$wrap).toggleClass('eiw-active');
            });
            $('.eiw-xtramenu-toggle', this.$wrap).click( () => {
                this.hideAll('xtramenu');
                $('.eiw-xtramenu', this.$wrap).toggleClass('eiw-hidden');
                $('.eiw-xtramenu-toggle', this.$wrap).toggleClass('eiw-active');
            });
            $('.eiw-changeview', this.$wrap).click( () => {
                this.hideAll();
                this.$wrap.toggleClass('eiw-view-a');
            });

            //// Render the background-images. 
            this.$wrap.append(`
                <div class="eiw-bkgnds">
                  <div class="eiw-bkgnd-b"><img src="${this.config.bkgnd.srcB}"></div>
                  <div class="eiw-bkgnd-a"></div>
                </div>
            `);
            $('.eiw-bkgnd-a, .eiw-bkgnd-b', this.$wrap).click( () => {
                this.hideAll();
            })
            $('.eiw-bkgnd-a, .eiw-bkgnd-b', this.$wrap)
               .css('height', $(window).innerHeight() - $('.eiw-footer').height() );

            this.$bkgndA = $('.eiw-bkgnd-a', this.$wrap);
            let minWidth  = $('.eiw-bkgnd-a').width()  / this.config.bkgnd.width;
            let minHeight = $('.eiw-bkgnd-a').height() / this.config.bkgnd.height;
            this.$bkgndA.iviewer({
                src: this.config.bkgnd.srcA
              , zoom_min: Math.min(minWidth, minHeight) * 100
              , zoom_max: 100
              , zoom_delta: 1.2
              , ui_disabled: true
                // update_on_resize: false,
                // zoom_animation: false,
                // mousewheel: false,
                // onMouseMove: function(ev, coords) { },
                // onStartDrag: function(ev, coords) { return false; }, //this image will not be dragged
              , onZoom: (evt, zoom) => {
                    this.updatePins();
                }
              , onAfterZoom: (evt, zoom) => {
                    this.updatePins();
                }
              , onDrag: (evt, coords) => {
                    this.updatePins();
                }
            });
            this.$bkgndAImg = $('.eiw-bkgnd-a img', this.$wrap);
            this.$bkgndBImg = $('.eiw-bkgnd-b img', this.$wrap);

            $(window).on('resize', () => {
                $('.eiw-bkgnd-a, .eiw-bkgnd-b', this.$wrap)
                   .css('height', $(window).innerHeight() - $('.eiw-footer').height() );
                this.$bkgndA.iviewer('update');
            });

            //// Render each pin. 
            for (let pin of this.pins) {
                pin.renderInfoPoint(this.$wrap);
            }
            $('.eiw-info-point', this.$wrap).click( (evt:JQueryMouseEventObject) => {
                this.hideAll();
                $(evt.currentTarget).data('eiwPinInstance').activate();
            });

            //// Render the popup (initially hidden).
            this.$popup = $(`
                <div class="eiw-popup eiw-hidden">
                  <div>
                    <div>
                      <div class="eiw-dismiss"  >X</div>
                      <h2  class="eiw-title"    >Title here</h2>
                      <div class="eiw-carousel" ></div>
                      <div class="eiw-arrows"   ></div>
                      <div class="eiw-dots"     ></div>
                      <div class="eiw-caption"  >Caption here</div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div class="eiw-content"  ><p>Content here. </p></div>
                      <div class="eiw-tags"     ><tt>A Tag</tt><tt>Another Tag</tt></div>
                    </div>
                  </div>
                </div>
            `);
            this.$wrap.append(this.$popup);
            this.$caption = $('.eiw-caption', this.$wrap); 
            this.$content = $('.eiw-content', this.$wrap); 
            $('.eiw-dismiss', this.$wrap).click( (evt:JQueryMouseEventObject) => {
                this.hideAll();
            });
            $('.eiw-arrows', this.$wrap).append(`
                <img class="eiw-arrow-left"       src="assets/icon-arrow-left-130x200.png">
                <img class="eiw-arrow-glow-left"  src="assets/icon-arrow-glow-left-130x200.png">
                <img class="eiw-arrow-right"      src="assets/icon-arrow-right-130x200.png">
                <img class="eiw-arrow-glow-right" src="assets/icon-arrow-glow-right-130x200.png">
            `);

            //// Initialize the ‘Slick’ carousel. 
            this.$carousel = $('.eiw-carousel', this.$wrap); 
            this.$carousel
               .data('eiwCurrentSlideTally', 0)
               .slick({
                    prevArrow:   '.eiw-arrow-left'
                  , nextArrow:   '.eiw-arrow-right'
                  , appendDots:  '.eiw-dots'
                  , dots:        true
                  , infinite:    false
                })
               .on('beforeChange', (evt, slick, currentSlide, nextSlide) => {
                   this.activePin.showSlide(nextSlide);
                })
               .on('afterChange', (evt, slick, currentSlide) => {
                   this.activePin.resetGif(currentSlide);
                })
            ;

            //// Render the tagmenu (initially hidden).
            let tags = {};
            for (let pin of this.pins) {
                for (let tag of pin.config.tags) {
                    tags[tag] = tags[tag] || [];
                    let $accordionLink = $(`<li>${pin.config.title}</li>`);
                    $accordionLink.data('eiwPinInstance', pin); 
                    tags[tag].push($accordionLink); 
                }
            }
            this.$tagmenu = $(`
                <div class="eiw-tagmenu eiw-hidden">
                  <div class="eiw-icon-logo"><img src="assets/icon-logo-212x192.png"></div>
                  <h3>${this.config.tagmenu.heading}</h3>
                </div>
            `);
            let $accordionContent = $(`
                <div>
                  <h4 class="eiw-accordion-fix"></h4>
                  <ul class="eiw-accordion-fix"></ul>
                </div>
            `);
            this.$tagmenu.append($accordionContent);
            for (let tag in tags) {
                $accordionContent.append(`<h4>${tag}</h4`);
                let $accordionSection = $(`<ul>`);
                for (let $accordionLink of tags[tag]) {
                    $accordionSection.append($accordionLink);
                }
                $accordionContent.append($accordionSection);
            }
            this.$wrap.append(this.$tagmenu);
            this.$tagmenu.accordion({
                header: 'h4'
              , create: (event, ui) => { /* @todo something here? */ }
            });
            $('li', this.$tagmenu).click( (evt:JQueryMouseEventObject) => {
                this.hideAll();
                $(evt.target).data('eiwPinInstance').activate();
            });

            //// Render the xtramenu (initially hidden).
            this.$xtramenu = $(`
                <div class="eiw-xtramenu eiw-hidden">
                  <div class="eiw-icon-logo"><img src="assets/icon-logo-212x192.png"></div>
                  <h3>${this.config.xtramenu.heading}</h3>
                </div>
            `);
            for (let pin of this.pins) {
                if (! pin.config.isXtra) continue;
                let $xtraLink = $(`<h4>${pin.config.title}</h4>`);
                $xtraLink.data('eiwPinInstance', pin);
                this.$xtramenu.append($xtraLink);
            }
            this.$wrap.append(this.$xtramenu);
            $('h4', this.$xtramenu).click( (evt:JQueryMouseEventObject) => {
                this.hideAll();
                $(evt.target).data('eiwPinInstance').activate();
            });

            //// Set the initial pin positions, and fix various browser no-update issues. 
            this.updatePins();
            window.setInterval( () => {
                this.updatePins();
            }, 300);

        }
    }

} } // end `EDF_IMAP_WEB.Main` namespace

//// We use a singleton instance of `Main` for the app. 
window['EDF_IMAP_WEB'].app = new EDF_IMAP_WEB.Main.Main();
