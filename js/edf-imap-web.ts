//// Typings. 
/// <reference path="../typings/globals/jquery/index.d.ts" />
/// <reference path="../typings/globals/slick-carousel/slick-carousel.d.ts" />

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
        src:     number;
        caption: string;
    }
    interface PinConfig {
        x:       number;
        y:       number;
        slug:    string;
        title:   string;
        content: string[]; // each array element is a paragraph
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
            this.config = config;
            this.main   = main;
        }

        deactivate () {
            this.$el.removeClass('eiw-active');
        }

        activate () {
            this.$el.addClass('eiw-active');
            this.main.$popup.removeClass('eiw-hidden');
            let { title = '', content = [], items = [] } = this.config;
            $('.eiw-title').html(title);
            $('.eiw-content').html(`<p>${content.join('</p><p>')}</p>`);
            for (var i=EDF_IMAP_WEB['current-carousel-tally']; i>0; i--) {
                this.main.$carousel.slick('slickRemove', i-1);
            }
            // let carousel = '';
            for (let item of items) {
                // carousel += `<div><img src="${item.src}"><h4>${item.caption}</h4></div>`;
                this.main.$carousel.slick('slickAdd', 
                  `<div><img src="${item.src}"><h4>${item.caption}</h4></div>`);
            }
            EDF_IMAP_WEB['current-carousel-tally'] = items.length;
            // this.main.$carousel.slick('unslick'); // destroy the ‘Slick’ carousel
            // this.main.$carousel.html(carousel);
            // this.main.$carousel.slick({
            //     appendArrows: $('.eiw-arrows')
            //   , appendDots:   $('.eiw-dots')
            //   , dots:         true
            //   , infinite:     false
            // });
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
            this.id = ++EDF_IMAP_WEB['numbered-pin-tally'];
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

        config:    MainConfig;
        $wrap:     JQuery;
        $popup:    JQuery;
        $carousel: JQuery;
        pins:      Pin[] = [];

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

            //// Render each pin, and attach event-listeners. 
            for (let pin of this.pins) {
                pin.renderInfoPoint(this.$wrap);
            }
            $('.eiw-info-point').click( (evt:JQueryMouseEventObject) => {
                for (let pin of this.pins) { pin.deactivate(); }
                $(evt.target).data('eiwPinInstance').activate();
            });

            //// Render the popup (initially hidden) and attach event-listeners.
            this.$popup = $(`
                <div class="eiw-popup eiw-hidden">
                  <h2  class="eiw-title"    >Title here</h2>
                  <div class="eiw-dismiss"  >X</div>
                  <div class="eiw-carousel" ></div>
                  <h4  class="eiw-caption"  >Caption here</h4>
                  <div class="eiw-arrows"   ></div>
                  <div class="eiw-dots"     ></div>
                  <div class="eiw-content"  ><p>Content here. </p></div>
                </div>
            `);
            this.$wrap.append(this.$popup);
            $('.eiw-dismiss').click( (evt:JQueryMouseEventObject) => {
                for (let pin of this.pins) { pin.deactivate(); }
                this.$popup.addClass('eiw-hidden');
            });

            //// Initialize the ‘Slick’ carousel. 
            this.$carousel = $('.eiw-carousel'); 
            this.$carousel.slick({
                appendArrows: '.eiw-arrows'
              , appendDots:   '.eiw-dots'
              , dots:         true
              , infinite:     false
            });

        }
    }
}

//// We use a singleton instance of `Main` for the app. 
EDF_IMAP_WEB['main'] = new EDF_IMAP_WEB.Main();
EDF_IMAP_WEB['numbered-pin-tally'] = 0;
EDF_IMAP_WEB['current-carousel-tally'] = 0;

