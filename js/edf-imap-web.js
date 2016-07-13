//// Typings. 
/// <reference path="../typings/globals/jquery/index.d.ts" />
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
    var Marker = (function () {
        function Marker(config, id) {
            this.config = config;
            this.id = id;
        }
        return Marker;
    }());
    EDF_IMAP_WEB.Marker = Marker;
    var Main = (function () {
        function Main() {
            this.markers = [];
            console.log('Main::constructor()');
        }
        Main.prototype.configure = function (config) {
            this.config = config;
        };
        Main.prototype.addMarker = function (marker) {
            this.markers.push(new Marker(marker, this.markers.length));
        };
        Main.prototype.init = function (wrapSelector) {
            //// Get a reference to the HTML element which will contain the app.
            this.$wrap = $(wrapSelector);
            if (!this.$wrap.length)
                throw Error(me + 'No $wrap');
            //// Render the background-image. 
            this.$wrap.append("<div class=\"eiw-bkgnd\">\n              <img src=\"" + this.config.bkgnd.src + "\">\n            </div>");
            //// Render each marker. 
            for (var _i = 0, _a = this.markers; _i < _a.length; _i++) {
                var marker = _a[_i];
                marker.$el = $("\n                    <div class=\"eiw-marker\">\n                      " + marker.config.title + "\n                    </div>");
                this.$wrap.append(marker.$el);
                marker.$el.css({
                    left: marker.config.x,
                    top: marker.config.y
                });
            }
        };
        return Main;
    }());
    EDF_IMAP_WEB.Main = Main;
})(EDF_IMAP_WEB || (EDF_IMAP_WEB = {}));
//// We use a singleton instance of `Main` for the app. 
EDF_IMAP_WEB['main'] = new EDF_IMAP_WEB.Main();
