//// Typings. 
/// <reference path="../typings/globals/jquery/index.d.ts" />
/// <reference path="../typings/globals/slick-carousel/slick-carousel.d.ts" />
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
        $bkgnds:          JQuery;
        $bkgndAImg:       JQuery;
        $bkgndBImg:       JQuery;
        $infoPoints:      JQuery;
        $rtn2map:         JQuery;
        $popup:           JQuery;
        $carousel:        JQuery;
        $caption:         JQuery;
        $content:         JQuery;
        $tagmenu:         JQuery;
        $xtramenu:        JQuery;
        $sidebar:          JQuery;
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

        resizeBkgnds () {
            let aspectRatio = this.config.bkgnd.height / this.config.bkgnd.width;
            let innerWidth  = $(window).innerWidth();
            let innerHeight = $(window).innerHeight();
            let bkgndsWidth = innerHeight / aspectRatio;
            bkgndsWidth = Math.max( bkgndsWidth, innerWidth * 0.7 );
            bkgndsWidth = Math.min( bkgndsWidth, innerWidth - 120 );
            this.$sidebar.css({
                width:  innerWidth - bkgndsWidth + 2 // `+ 2` allows a little overlap
            });
            this.$bkgnds.css({
                height: innerHeight
              , width:  bkgndsWidth
            });
            this.$rtn2map.css('left', innerWidth - bkgndsWidth);
        }

        updatePins () {
            let { top, left } = this.$bkgndAImg.position();
            let containerLeft = this.$bkgndA.position().left; 
            let width = this.$bkgndAImg.width();
            let height = this.$bkgndAImg.height();
            // let headerRt = Math.max(4, $(window).width() - (left + width - 4) );
            // this.$headerA.css('right', headerRt);
            // this.$headerB.css('right', headerRt);
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
                pin.updateInfoPoint(top, left + this.$bkgndA.position().left, zoom);
            }
        }

        hideAll (except?:string) {
            for (let pin of this.pins) { pin.deactivate(); }
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
        }

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
            this.$rtn2map = $('.eiw-rtn2map', this.$wrap); 
            this.$headerA = $('.eiw-header-a', this.$wrap);
            this.$headerB = $('.eiw-header-b', this.$wrap);
            this.$rtn2map.click( () => {
                $('.eiw-changeview', this.$wrap).click();
            });

            //// Render the sidebar. 
            this.$wrap.append(`
                <div class="eiw-sidebar">
                  <div>
                    <div class="eiw-tagmenu-toggle">
                      <div class="eiw-button">
                        <span>
                          <span class="eiw-icon">
                            <img class="eiw-default" src="assets/icon-burger-tow-130x130.png">
                            <img class="eiw-hover"   src="assets/icon-burger-wot-130x130.png">
                          </span>
                          <span class="eiw-text">
                            ${this.config.tagmenu.title}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="eiw-xtramenu-toggle">
                      <div class="eiw-button">
                        <span>
                          <span class="eiw-icon">
                            <img class="eiw-default" src="assets/icon-burger-tow-130x130.png">
                            <img class="eiw-hover"   src="assets/icon-burger-wot-130x130.png">
                          </span>
                          <span class="eiw-text">
                            ${this.config.xtramenu.title}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="eiw-changeview">
                      <div>
                        <img src="assets/icon-changeview-wot-130x130.png">
                        ${this.config.changeview.title}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="eiw-instructions">
                      <div>
                        <img class="eiw-icon-pin" src="assets/icon-numbered.png">
                        <span class="eiw-text">${this.config.instructions.title}</span>
                        <div class="eiw-icon-logo"><img src="assets/icon-logo-212x192.png"></div>
                      </div>
                    </div>
                  </div>
                </div>
            `);
            this.$sidebar = $('.eiw-sidebar');
            $('.eiw-tagmenu-toggle .eiw-button', this.$wrap).click( () => {
                this.hideAll('tagmenu');
                if ( this.$tagmenu.hasClass('eiw-min') ) {
                    this.$tagmenu
                       .removeClass('eiw-min')
                       .css( 'height', $('> div', this.$tagmenu).height() )
                    ;
                    // window.setTimeout( () => {
                    //     this.$tagmenu.css('height', 'auto')
                    // }, 500);
                } else {
                    this.$tagmenu
                        .addClass('eiw-min')
                        .css('height', 0)
                    ;
                    // this.$tagmenu
                    //    .css( 'height', $('> div', this.$tagmenu).height() )
                    // ;
                    // window.setTimeout( () => {
                    //     this.$tagmenu
                    //        .addClass('eiw-min')
                    //        .css('height', 0)
                    //     ;
                    // }, 1);
                }
                $('.eiw-tagmenu-toggle', this.$wrap).toggleClass('eiw-active');
            });
            $('.eiw-xtramenu-toggle .eiw-button', this.$wrap).click( () => {
                this.hideAll('xtramenu');
                if ( this.$xtramenu.hasClass('eiw-min') ) {
                    this.$xtramenu
                       .removeClass('eiw-min')
                       .css( 'height', $('> div', this.$xtramenu).height() )
                    ;
                } else {
                    this.$xtramenu
                       .addClass('eiw-min')
                       .css('height', 0)
                    ;
                }
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
            this.$bkgnds = $('.eiw-bkgnd-a, .eiw-bkgnd-b', this.$wrap);
            this.$bkgnds.click( () => {
                this.hideAll();
            })
            this.resizeBkgnds();
            this.$bkgndA = $('.eiw-bkgnd-a', this.$wrap);
            let minWidth  = $('.eiw-bkgnd-a').width()  * 1.01 / this.config.bkgnd.width; // `* 1.01` fills the container more fully */
            let minHeight = $('.eiw-bkgnd-a').height() * 1.01 / this.config.bkgnd.height;
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
                this.resizeBkgnds();
                this.$bkgndA.iviewer('update');
            });

            //// Render each pin. 
            for (let pin of this.pins) {
                pin.renderInfoPoint(this.$wrap);
            }
            this.$infoPoints = $('.eiw-info-point', this.$wrap);
            this.$infoPoints
               .click( (evt:JQueryMouseEventObject) => {
                    this.hideAll();
                    $(evt.currentTarget).data('eiwPinInstance').activate();
                })
               .hover( (evt:JQueryMouseEventObject) => {
                    $('li', this.$tagmenu).removeClass('eiw-active');
                    if ( $(evt.target).parent().data('eiwTagmenuLI') ) {
                        $(evt.target).parent().data('eiwTagmenuLI').addClass('eiw-active');
                    }
                })
               .mouseleave( (evt:JQueryMouseEventObject) => {
                    $('li', this.$tagmenu).removeClass('eiw-active');
                })
            ;

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
                    let $tagmenuLink = $(`<li>${pin.config.title}</li>`);
                    $tagmenuLink.data('eiwPinInstance', pin); 
                    pin.$el.data('eiwTagmenuLI', $tagmenuLink);
                    tags[tag].push($tagmenuLink); 
                }
            }
            this.$tagmenu = $(`<div class="eiw-tagmenu eiw-min">`);
            let $tagmenuContent = $(`<div>`);
            if (this.config.tagmenu.heading) {
                $tagmenuContent.append(`<h3>${this.config.tagmenu.heading}</h3>`);
            }
            this.$tagmenu.append($tagmenuContent);
            for (let tag in tags) {
                let $tagmenuHeading = $(`<h4 class="eiw-color-${this.config.tagcolors[tag]}">${tag}</h4>`);
                let $tagmenuSection = $(`<div class="eiw-section eiw-min eiw-color-${this.config.tagcolors[tag]}">`);
                let $tagmenuUL      = $(`<ul>`);
                for (let $tagmenuLink of tags[tag]) {
                    $tagmenuUL.append($tagmenuLink);
                }
                $tagmenuSection.append($tagmenuUL);
                $tagmenuContent.append($tagmenuHeading);
                $tagmenuHeading.data('eiwSection', $tagmenuSection);
                $tagmenuContent.append($tagmenuSection);
            }
            $('.eiw-tagmenu-toggle', this.$wrap).append(this.$tagmenu);
            $('h4', this.$tagmenu).click( (evt:JQueryMouseEventObject) => {
                let $tagmenuHeading = $(evt.target);
                let $tagmenuSection = $tagmenuHeading.data('eiwSection');
                let $previouslyOpen = $('> div > div', this.$tagmenu).not('.eiw-min');
                let isMin = $tagmenuSection.hasClass('eiw-min');
                let tagmenuSectionHeight = $('> ul', $tagmenuSection).height();
                let tagmenuHeight = $('> div', this.$tagmenu).height();
                if (0 === $previouslyOpen.length && isMin) { // nothing previously open
                    tagmenuHeight += tagmenuSectionHeight;
                } else if ($previouslyOpen.length && isMin) { // another section was open
                    tagmenuHeight += tagmenuSectionHeight -= $previouslyOpen.height();
                } else if (! isMin) { // just closing the currently open section
                    tagmenuHeight -= tagmenuSectionHeight;
                } else {
                    console.log('!');
                }
                $('h4', this.$tagmenu).removeClass('eiw-active');
                $('> div > div', this.$tagmenu).addClass('eiw-min').css('height', 0);
                this.$tagmenu.css('height', tagmenuHeight);
                if (isMin) {
                    $tagmenuSection
                       .removeClass('eiw-min')
                       .css( 'height', $('> ul', $tagmenuSection).height() )
                    ;
                    $tagmenuHeading
                       .addClass('eiw-active')
                    ;
                }
            });
            $('li', this.$tagmenu)
               .click( (evt:JQueryMouseEventObject) => {
                    this.hideAll();
                    $(evt.target).data('eiwPinInstance').activate();
                })
               .hover( (evt:JQueryMouseEventObject) => {
                    this.$infoPoints.removeClass('eiw-active');
                    $(evt.target).data('eiwPinInstance').$el.addClass('eiw-active');
                })
               .mouseleave( (evt:JQueryMouseEventObject) => {
                    this.$infoPoints.removeClass('eiw-active');
                })
            ;

            //// Render the xtramenu (initially hidden).
            this.$xtramenu = $(`
                <div class="eiw-xtramenu eiw-min">
                  <div>
                    <h3>${this.config.xtramenu.heading}</h3>
                  </div>
                </div>
            `);
            for (let pin of this.pins) {
                if (! pin.config.isXtra) continue;
                let $xtraLink = $(`<h4>${pin.config.title}</h4>`);
                $xtraLink.data('eiwPinInstance', pin);
                $('> div', this.$xtramenu).append($xtraLink);
            }
            $('.eiw-xtramenu-toggle', this.$wrap).append(this.$xtramenu);
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
