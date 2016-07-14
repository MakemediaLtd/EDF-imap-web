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
        caption: string;
        content: string[]; // each array element is a paragraph
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
        }

        activate () {
            this.$el.addClass('eiw-active');
            this.main.activePin = this; 
            this.main.$popup.removeClass('eiw-hidden');
            let { title='', tags=[], items=[{ src:'', caption:'', content:[''] }] } 
                = this.config;
            $('.eiw-title').html(title);
            $('.eiw-tags').html(`<tt>${tags.join('</tt><tt>')}</tt>`);

            //// Remove the previous carousel slides, and add the new ones.  
            for (var i=this.main.$carousel.data('eiwCurrentSlideTally'); i>0; i--) {
                this.main.$carousel.slick('slickRemove', i-1);
            }
            for (let item of items) {
                this.main.$carousel.slick('slickAdd', 
                  `<div><img src="${item.src}"></div>`);
            }
            this.main.$carousel.data('eiwCurrentSlideTally', items.length);

            //// Show caption/content for current slide. 
            $('.eiw-caption').html(`<p>${items[0].caption}</p>`);
            $('.eiw-content').html(`<p>${items[0].content.join('</p><p>')}</p>`);

        }

        showSlide (slideIndex:number) {
            let item = this.config.items[slideIndex];
            $('.eiw-caption').html(`<p>${item.caption}</p>`);
            $('.eiw-content').html(`<p>${item.content.join('</p><p>')}</p>`);
        }

        renderInfoPoint ($wrap:JQuery) {
            this.$el = $(`
                <div class="eiw-info-point eiw-pin-${this.kind}">
                  ${this.id||''}
                </div>
            `);
            this.$el.css({
                left: this.config.x
              , top:  this.config.y
            }).data('eiwPinInstance', this); // allows backreference
            $wrap.append(this.$el); 
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
        bkgnd?: {
            src:    string;
            width:  number;
            height: number;
        };
    }

    export class Main {

        constructor () {
        }

        config:           MainConfig;
        $wrap:            JQuery;
        $popup:           JQuery;
        $carousel:        JQuery;
        $tagmenu:         JQuery;
        pins:             Pin[] = [];
        numberedPinTally: number = 0;
        activePin:        Pin;

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

        init (wrapSelector:string) {

            //// Get a reference to the HTML element which will contain the app.
            this.$wrap = $(wrapSelector)
            if (! this.$wrap.length) throw Error(me+'No $wrap');

            //// Render the background-image. 
            this.$wrap.append(`
                <div class="eiw-bkgnd">
                  <img src="${this.config.bkgnd.src}">
                </div>
            `);

            //// Render each pin. 
            for (let pin of this.pins) {
                pin.renderInfoPoint(this.$wrap);
            }
            $('.eiw-info-point').click( (evt:JQueryMouseEventObject) => {
                for (let pin of this.pins) { pin.deactivate(); }
                $(evt.target).data('eiwPinInstance').activate();
            });

            //// Render the popup (initially hidden).
            this.$popup = $(`
                <div class="eiw-popup eiw-hidden">
                  <h2  class="eiw-title"    >Title here</h2>
                  <div class="eiw-dismiss"  >X</div>
                  <div class="eiw-carousel" ></div>
                  <h4  class="eiw-caption"  >Caption here</h4>
                  <div class="eiw-arrows"   ></div>
                  <div class="eiw-dots"     ></div>
                  <div class="eiw-content"  ><p>Content here. </p></div>
                  <div class="eiw-tags"     ><tt>A Tag</tt><tt>Another Tag</tt></div>
                </div>
            `);
            this.$wrap.append(this.$popup);
            $('.eiw-dismiss').click( (evt:JQueryMouseEventObject) => {
                for (let pin of this.pins) { pin.deactivate(); }
                this.$popup.addClass('eiw-hidden');
            });

            //// Initialize the ‘Slick’ carousel. 
            this.$carousel = $('.eiw-carousel'); 
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
                })
            ;

            //// Render the tagmenu (initially hidden).
            let tags = {};
            for (let pin of this.pins) {
                for (let tag of pin.config.tags) {
                    tags[tag] = tags[tag] || [];
                    let $li = $(`<li>${pin.config.title}</li>`);
                    $li.data('eiwPinInstance', pin); 
                    tags[tag].push($li); 
                }
            }
            this.$tagmenu = $(`
                <div class="eiw-tagmenu eiw-hidden">
                  <h4>${this.config.tagmenu.title}</h4>
                  <ul></ul>
                </div>
            `);
            for (let tag in tags) {
                let $section = $(`<li><h4>${tag}</h4></li>`);
                let $ul      = $(`<ul></ul>`);
                for (let $li of tags[tag]) {
                    $ul.append($li);
                }
                $section.append($ul);
                this.$tagmenu.append($section);
            }
            this.$wrap.append(this.$tagmenu);
            this.$tagmenu.accordion({
                create: (event, ui) => { console.log(event, ui); }
            });
            $('li li', this.$tagmenu).click( (evt:JQueryMouseEventObject) => { //@todo DRY ... this is an exact repeat of the anon fn above!
                for (let pin of this.pins) { pin.deactivate(); }
                $(evt.target).data('eiwPinInstance').activate();
            });

        }
    }
}

//// We use a singleton instance of `Main` for the app. 
EDF_IMAP_WEB['main'] = new EDF_IMAP_WEB.Main();

