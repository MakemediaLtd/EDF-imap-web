//// Typings. 
/// <reference path="../typings/globals/jquery/index.d.ts" />

//// Basic validation. 
!function () {
    let me = 'js/edf-imap.web.ts:\n  ';
    if ('undefined' == typeof window) throw new Error(me+'No `window` object');
    if (window['EDF_IMAP_WEB']) throw new Error(me+'`EDF_IMAP_WEB` exists');
}();

//// Public API. 
module EDF_IMAP_WEB {

    let me = 'js/edf-imap-web.ts:\n  ';

    //// Describe the `Marker` class’s configuration-object. 
    interface MarkerConfig {
        x:     number;
        y:     number;
        title: string;
        slug:  string;
    }

    export class Marker {
        config: MarkerConfig;
        id:     number;
        $el:    JQuery;
        constructor(config:MarkerConfig, id:number) {
            this.config = config;
            this.id     = id;
        }
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

        constructor() {
            console.log('Main::constructor()');
        }

        config:  MainConfig;
        markers: Marker[] = [];
        $wrap:   JQuery;

        configure(config:MainConfig) {
            this.config = config;
        }

        addMarker(marker:MarkerConfig) {
            this.markers.push(new Marker(marker, this.markers.length));
        }

        init(wrapSelector:string) {

            //// Get a reference to the HTML element which will contain the app.
            this.$wrap = $(wrapSelector)
            if (! this.$wrap.length) throw Error(me+'No $wrap');

            //// Render the background-image. 
            this.$wrap.append(`<div class="eiw-bkgnd">
              <img src="${this.config.bkgnd.src}">
            </div>`);

            //// Render each marker. 
            for (let marker of this.markers) {
                marker.$el = $(`
                    <div class="eiw-marker">
                      ${marker.config.title}
                    </div>`
                ); 
                this.$wrap.append(marker.$el);
                marker.$el.css({
                    left: marker.config.x
                  , top:  marker.config.y
                });
            }
        }
    }
}

//// We use a singleton instance of `Main` for the app. 
EDF_IMAP_WEB['main'] = new EDF_IMAP_WEB.Main();

