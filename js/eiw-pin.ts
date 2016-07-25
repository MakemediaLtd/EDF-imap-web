//// Classes. 
/// <reference path="eiw-main.ts" />


//// EDF_IMAP_WEB.Pin
namespace EDF_IMAP_WEB { export namespace Pin {

    let me = 'js/edf-pin.ts:\n  ';

    //// Describe the `Pin` class’s configuration-object. 
    interface Slide {
        src:      string;
        caption:  string | number;
        content:  any; // @todo prevent TypeScript from complaining about `number | string[]`
    }
    export interface Config {
        x:        number;
        y:        number;
        slug:     string;
        isXtra?:  boolean;
        title:    string;
        tags:     string[];
        slides:   Slide[];
    }

    //// Define the base class for all Pins. 
    export class Pin {
        config: Config;
        main:   Main.Main;
        $el:    JQuery;
        kind:   string = 'base';
        id:     number = 0;
        color:  string;

        constructor (config:Config, main:Main.Main) {
            config.tags = config.tags || []; //@todo find a better defaults syntax
            this.config = config;
            this.main   = main;
            this.color = main.config.tagcolors[ config.tags[0] ];
            if (! this.color) throw new RangeError(me+config.tags[0]+' not found');
        }

        deactivate () {
            this.$el.removeClass('eiw-active');
            this.main.activePin = null;
        }

        activate () {
            this.$el.addClass('eiw-active');
            this.main.activePin = this; 
            this.main.$popup.removeClass('eiw-hidden');
            let { title='', tags=[], slides=[{ src:'', caption:'', content:[''] }] } 
                = this.config;
            $('.eiw-title', this.main.$wrap).html(title);
            $('.eiw-tags', this.main.$wrap).html(`<tt>${tags.join('</tt><tt>')}</tt>`);

            //// Remove the previous carousel slides, and add the new ones.  
            for (var i=this.main.$carousel.data('eiwCurrentSlideTally'); i>0; i--) {
                this.main.$carousel.slick('slickRemove', i-1);
            }
            this.main.$carousel.data('eiwCurrentSlideTally', slides.length);
            if (1 === slides.length && ! slides[0].src) { // deal with a single-slide pin which has no image or video
                this.main.$popup.addClass('eiw-carousel-hidden');

            } else {
                this.main.$popup.removeClass('eiw-carousel-hidden');
                for (let slide of slides) {
                    let media:string;
                    if (! slide.src) { // no media
                        media = '';
                    } else if ( '.mp4' === slide.src.substr(-4) ) { // a movie
                        media = `<video loop src="${slide.src}"></video>`;
                    } else { // an image
                        media = `<img src="${slide.src}">`;
                    }
                    this.main.$carousel.slick('slickAdd', `<div>${media}</div>`);
                }
                if ( slides[0] && '.mp4' === slides[0].src.substr(-4) ) {
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

        }

        showSlide (slideIndex:number) { // before change
            let slide = this.config.slides[slideIndex];
            let { src, caption, content } = slide;
            if ('number' == typeof caption) caption = this.config.slides[caption].caption;
            if ('number' == typeof content) content = this.config.slides[content].content;
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
            let slide = this.config.slides[slideIndex];
            let { src, caption, content } = slide;
            if ( '.gif' === src.substr(-4) ) {
                // $('.slick-current img').attr('src', src+'?'+Math.random()); //@todo better method of restarting GIFs
            }
        }

        renderInfoPoint ($container:JQuery) {
            if ('hidden' == this.kind) {
                this.$el = $(`
                    <div class="eiw-info-point eiw-pin-hidden eiw-info-point-${this.config.slug}"></div>
                `);
            } else {
                this.$el = $(`
                    <div class="eiw-info-point eiw-pin-numbered eiw-info-point-${this.config.slug}">
                    <img src="assets/icon-teardrop-${this.color}.png">
                    </div>
                `);
                //// nb, in versions before 2.0.5 we treated lightbulbs and  
                //// numbered pins differently, and used: 
                //// `<img src="assets/icon-${this.kind}${this.id ? '-'+this.id:''}.png">`
            }
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

        constructor (config:Config, main:Main.Main) {
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
