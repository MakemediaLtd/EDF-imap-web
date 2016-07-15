//// Typings. 
/// <reference path="../typings/globals/jquery/index.d.ts" />
/// <reference path="../typings/globals/slick-carousel/slick-carousel.d.ts" />
/// <reference path="../typings/globals/jqueryui/index.d.ts" />
/// <reference path="../typings/globals/jquery.tinyscrollbar/index.d.ts" />

//// Basic validation. 
!function () {
    let me = 'js/edf-imap.web.ts:\n  ';
    if ('undefined' == typeof window) throw new Error(me+'No `window` object');
    if (window['EDF_IMAP_WEB']) throw new Error(me+'`EDF_IMAP_WEB` exists');
}();

//// Public API. 
module EDF_IMAP_WEB {

    let me = 'js/edf-imap-web.ts:\n  ';

    //// Describe the `Pin` class’s configuration-object. 
    interface PinItem {
        src:     string;
        caption: string   | number;
        content: number | string[]; // each array element is a paragraph
    }
    interface PinConfig {
        x:       number;
        y:       number;
        slug:    string;
        title:   string;
        tags:    string[];
        items:   PinItem[];
    }

    //// Define the base class for all Pins. 
    class Pin {
        config: PinConfig;
        main:   Main;
        $el:    JQuery;
        kind:   string = 'base';
        id:     number = 0;

        constructor (config:PinConfig, main:Main) {
            config.tags = config.tags || []; //@todo find a better defaults syntax
            this.config = config;
            this.main   = main;
        }

        deactivate () {
            this.$el.removeClass('eiw-active');
            this.main.activePin = null;
        }

        activate () {
            this.$el.addClass('eiw-active');
            this.main.activePin = this; 
            this.main.$popup.removeClass('eiw-hidden');
            let { title='', tags=[], items=[{ src:'', caption:'', content:[''] }] } 
                = this.config;
            $('.eiw-title', this.main.$wrap).html(title);
            $('.eiw-tags', this.main.$wrap).html(`<tt>${tags.join('</tt><tt>')}</tt>`);

            //// Remove the previous carousel slides, and add the new ones.  
            for (var i=this.main.$carousel.data('eiwCurrentSlideTally'); i>0; i--) {
                this.main.$carousel.slick('slickRemove', i-1);
            }
            for (let item of items) {
                let media:string;
                if (! item.src) { // no media
                    media = '';
                } else if ( '.mp4' === item.src.substr(-4) ) { // a movie
                    media = `<video loop src="${item.src}"></video>`;
                } else { // an image
                    media = `<img src="${item.src}">`;
                }
                this.main.$carousel.slick('slickAdd', `<div>${media}</div>`);
            }
            this.main.$carousel.data('eiwCurrentSlideTally', items.length);
            if ( items[0] && '.mp4' === items[0].src.substr(-4) ) {
                $('[data-slick-index="0"] video', this.main.$carousel)[0].play();
            }  

            //// Show caption/content for current slide. 
            $('.eiw-caption', this.main.$wrap).html(`<p>${items[0].caption}</p>`);
            $('.eiw-content', this.main.$wrap).html(`<p>${items[0].content.join('</p><p>')}</p>`);

        }

        showSlide (slideIndex:number) {
            let item = this.config.items[slideIndex];
            let caption = item.caption;
            let content = item.content;
            if ('number' == typeof caption) caption = this.config.items[caption].caption;
            if ('number' == typeof content) content = this.config.items[content].content;
            $('.eiw-caption', this.main.$wrap).html(`<p>${caption}</p>`);
            $('.eiw-content', this.main.$wrap).html(`<p>${content.join('</p><p>')}</p>`);
        }

        renderInfoPoint ($container:JQuery) {
            this.$el = $(`
                <div class="eiw-info-point eiw-pin-${this.kind}">
                  ${this.id ? '<span>'+this.id+'</span>':''}
                  <img src="assets/icon-${this.kind}.png">
                </div>
            `);
            this.$el.css({
                left: this.config.x
              , top:  this.config.y
            }).data('eiwPinInstance', this); // allows backreference
            $container.append(this.$el); 
        }

    }

    //// Define `Numbered`, `Lightbulb` and `Hidden` Pins. 
    export class NumberedPin extends Pin {
        kind = 'numbered';

        constructor (config:PinConfig, main:Main) {
            super(config, main);
            this.id = ++this.main.numberedPinTally;
        }
    }

    export class LightbulbPin extends Pin {
        kind = 'lightbulb';
    }

    export class HiddenPin extends Pin {
        kind = 'hidden';
    }

    //// Describe the `Main` class’s configuration-object. 
    interface MainConfig {
        bkgnd: {
            srcA:    string;
            srcB:    string;
            width:   number;
            height:  number;
        };
        header: {
            titleA:  string;
            titleB:  string;
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
    }

    export class Main {

        constructor () {
        }

        config:           MainConfig;
        $wrap:            JQuery;
        $popup:           JQuery;
        $carousel:        JQuery;
        $tagmenu:         JQuery;
        $xtramenu:        JQuery;
        pins:             Pin[] = [];
        numberedPinTally: number = 0;
        activePin:        Pin = null;

        configure (config:MainConfig) {
            this.config = config;
        }

        addNumberedPin (pin:PinConfig) {
            this.pins.push( new NumberedPin(pin, this) );
        }

        addLightbulbPin (pin:PinConfig) {
            this.pins.push( new LightbulbPin(pin, this) );
        }

        addHiddenPin (pin:PinConfig) {
            this.pins.push( new HiddenPin(pin, this) );
        }

        hideAll (except?:string) {
            for (let pin of this.pins) { pin.deactivate(); }
            if ('tagmenu' !== except)
                $('.eiw-tagmenu', this.$wrap).addClass('eiw-hidden');
            if ('xtramenu' !== except)
                $('.eiw-xtramenu', this.$wrap).addClass('eiw-hidden');
            this.$popup.addClass('eiw-hidden');
        }

        init (wrapSelector:string) {

            //// Get a reference to the HTML element which will contain the app.
            this.$wrap = $(wrapSelector)
            if (! this.$wrap.length) throw Error(me+'No $wrap');
            this.$wrap.addClass('eiw-view-a');

            //// Render the header. 
            this.$wrap.append(`
                <div class="eiw-header-a">${this.config.header.titleA}</div>
                <div class="eiw-header-b">${this.config.header.titleB}</div>
            `);

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
                    <img src="assets/icon-gps-wot-130x130.png">
                    ${this.config.gps.title}
                  </div>
                  <div class="eiw-instructions">
                    <img class="eiw-icon-pin" src="assets/icon-numbered.png">
                    <span class="eiw-text">${this.config.instructions.title}</span>
                    <img class="eiw-icon-logo" src="assets/icon-logo-212x192.png">
                  </div>
                </div>
            `);
            $('.eiw-tagmenu-toggle', this.$wrap).click( () => {
                this.hideAll('tagmenu');
                $('.eiw-tagmenu', this.$wrap).toggleClass('eiw-hidden');
            });
            $('.eiw-xtramenu-toggle', this.$wrap).click( () => {
                this.hideAll('xtramenu');
                $('.eiw-xtramenu', this.$wrap).toggleClass('eiw-hidden');
            });
            $('.eiw-changeview', this.$wrap).click( () => {
                this.hideAll();
                this.$wrap.toggleClass('eiw-view-a');
            });

            //// Render the background-images. 
            this.$wrap.append(`
                <div class="eiw-bkgnds">
                  <div class="eiw-bkgnd-a"></div>
                  <div class="eiw-bkgnd-b"><img src="${this.config.bkgnd.srcB}"></div>
                </div>
            `);
            $('.eiw-bkgnd-a, .eiw-bkgnd-b', this.$wrap).click( () => {
                this.hideAll();
            })
            $('.eiw-bkgnd-a, .eiw-bkgnd-b', this.$wrap)
               .css('height', $(window).innerHeight() - $('.eiw-footer').height() );

            $('.eiw-bkgnd-a', this.$wrap).iviewer({
                src:      this.config.bkgnd.srcA
              , zoom_min: 'fit'
              , ui_disabled: true
                // update_on_resize: false,
                // zoom_animation: false,
                // mousewheel: false,
                // onMouseMove: function(ev, coords) { },
                // onStartDrag: function(ev, coords) { return false; }, //this image will not be dragged
              , onZoom: (evt, zoom) => {
                    console.log(zoom);
                }
              , onDrag: (evt, coords) => {
                    console.log(coords);
                }
            });

            $(window).on('resize', () => {
                $('.eiw-bkgnd-a, .eiw-bkgnd-b', this.$wrap)
                   .css('height', $(window).innerHeight() - $('.eiw-footer').height() );
                $('.eiw-bkgnd-a', this.$wrap).iviewer('update');
            });
            console.log( $('.eiw-bkgnd-a', this.$wrap).iviewer('info', 'coords') );

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
                  <div class="eiw-dismiss"  >X</div>
                  <h2  class="eiw-title"    >Title here</h2>
                  <div class="eiw-carousel" ></div>
                  <h4  class="eiw-caption"  >Caption here</h4>
                  <div class="eiw-arrows"   ></div>
                  <div class="eiw-dots"     ></div>
                  <div class="eiw-content"  ><p>Content here. </p></div>
                  <div class="eiw-tags"     ><tt>A Tag</tt><tt>Another Tag</tt></div>
                </div>
            `);
            this.$wrap.append(this.$popup);
            $('.eiw-dismiss', this.$wrap).click( (evt:JQueryMouseEventObject) => {
                this.hideAll();
            });

            //// Initialize the ‘Slick’ carousel. 
            this.$carousel = $('.eiw-carousel', this.$wrap); 
            this.$carousel
               .data('eiwCurrentSlideTally', 0)
               .slick({
                    appendArrows: '.eiw-arrows'
                  , appendDots:   '.eiw-dots'
                  , dots:         true
                  , infinite:     false
                })
               .on('beforeChange', (evt, slick, currentSlide, nextSlide) => {
                   this.activePin.showSlide(nextSlide);
                   console.log(nextSlide);
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
                  <h3>${this.config.tagmenu.heading}</h3>
                </div>
            `);
            let $accordionContent = $('<div></div>');
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
                  <h3>${this.config.xtramenu.heading}</h3>
                </div>
            `);
            this.$wrap.append(this.$xtramenu);

        }
    }
}

//// We use a singleton instance of `Main` for the app. 
EDF_IMAP_WEB['main'] = new EDF_IMAP_WEB.Main();

