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
    var Item = (function () {
        function Item(config, id) {
            console.log('new Item, id ' + id + '!');
        }
        return Item;
    }());
    EDF_IMAP_WEB.Item = Item;
    var Main = (function () {
        function Main(config) {
            this.items = [];
            console.log('Main::constructor()');
        }
        Main.prototype.add = function (item) {
            this.items.push(new Item(item, this.items.length));
        };
        Main.prototype.init = function (selector) {
            console.log('Main::init() ' + selector);
        };
        return Main;
    }());
    EDF_IMAP_WEB.Main = Main;
})(EDF_IMAP_WEB || (EDF_IMAP_WEB = {}));
EDF_IMAP_WEB['main'] = new EDF_IMAP_WEB.Main({});
