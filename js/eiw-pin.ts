//// Typings. 
/// <reference path="../typings/globals/jquery/index.d.ts" />
/// <reference path="../typings/globals/slick-carousel/slick-carousel.d.ts" />
/// <reference path="../typings/globals/jqueryui/index.d.ts" />
/// <reference path="../typings/globals/jquery.tinyscrollbar/index.d.ts" />

//// Classes. 
/// <reference path="eiw-main.ts" />


//// EDF_IMAP_WEB.Pin
namespace EDF_IMAP_WEB { export namespace Pin {

    let me = 'js/edf-pin.ts:\n  ';

    //// Describe the `Pin` class’s configuration-object. 
    export interface PinItem {
        src:      string;
        caption:  string | number;
        content:  any; // @todo prevent TypeScript from complaining about `number | string[]`
    }
    export interface PinConfig {
        x:        number;
        y:        number;
        slug:     string;
        isXtra?:  boolean;
        title:    string;
        tags:     string[];
        items:    PinItem[];
    }

    //// Define the base class for all Pins. 
    export class Pin {
        config: PinConfig;
        main:   Main.Main;
        $el:    JQuery;
        kind:   string = 'base';
        id:     number = 0;

        constructor (config:PinConfig, main:Main.Main) {
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
            this.main.$carousel.data('eiwCurrentSlideTally', items.length);
            if (1 === items.length && ! items[0].src) { // deal with a single-slide pin which has no image or video
                this.main.$popup.addClass('eiw-carousel-hidden');

            } else {
                this.main.$popup.removeClass('eiw-carousel-hidden');
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
                if ( items[0] && '.mp4' === items[0].src.substr(-4) ) {
                    $('[data-slick-index="0"] video', this.main.$carousel)[0]['play']();
                }
            }

            //// Show caption and content for current slide. 
            this.showSlide(0);
            // $('.eiw-caption', this.main.$wrap)
            //    .html(items[0].caption ? `<h4>${items[0].caption}</h4>` : '')
            // ;
            // $('.eiw-content', this.main.$wrap)
            //    .html(items[0].content ? `<p>${items[0].content['join']('</p><p>')}</p>` : '')
            //    .css('height', this.main.calcContentHeight() - 45 ) // `- 45` allows for padding
            // ;

        }

        showSlide (slideIndex:number) { // before change
            let item = this.config.items[slideIndex];
            let { src, caption, content } = item;
            if ('number' == typeof caption) caption = this.config.items[caption].caption;
            if ('number' == typeof content) content = this.config.items[content].content;
            this.main.$caption.html(caption ? `<h4>${caption}</h4>` : '');
            this.main.$content.html(content ? `<p>${content['join']('</p><p>')}</p>` : '');
            let contentBottom = this.main.$content.position().top + this.main.$content.outerHeight(true);
            let gap = this.main.$footer.position().top - contentBottom;
            if (50 > gap) {
                let currHeight = this.main.$content.height();
                this.main.$content.height( currHeight - 50 + gap ); 
            } else {
                this.main.$content.height('auto'); 
                contentBottom = this.main.$content.position().top + this.main.$content.outerHeight(true);
                gap = this.main.$footer.position().top - contentBottom;
                if (50 > gap) {
                    let currHeight = this.main.$content.height();
                    this.main.$content.height( currHeight - 50 + gap );
                } 
            }
            this.main.$content.scrollTop(0);
        }

        resetGif (slideIndex:number) { // after change
            let item = this.config.items[slideIndex];
            let { src, caption, content } = item;
            if ( '.gif' === src.substr(-4) ) {
                // $('.slick-current img').attr('src', src+'?'+Math.random()); //@todo better method of restarting GIFs
            }
        }

        renderInfoPoint ($container:JQuery) {
            this.$el = $(`
                <div class="eiw-info-point eiw-pin-${this.kind} eiw-info-point-${this.config.slug}">
                  <img src="assets/icon-${this.kind}${this.id ? '-'+this.id:''}.png">
                </div>
            `);
            this.$el.css({
                left: this.config.x
              , top:  this.config.y
            }).data('eiwPinInstance', this); // allows backreference
            $container.append(this.$el); 
        }

        updateInfoPoint (top:number, left:number, zoom:number) {
            this.$el.css({
                left: this.config.x * zoom + left
              , top:  this.config.y * zoom + top
            });
        }

    }

    //// Define `Numbered`, `Lightbulb` and `Hidden` Pins. 
    export class NumberedPin extends Pin {
        kind = 'numbered';

        constructor (config:PinConfig, main:Main.Main) {
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

} } // end `EDF_IMAP_WEB.Pin` namespace
