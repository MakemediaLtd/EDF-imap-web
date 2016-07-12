//// Basic validation. 
!function () {
    let me = 'js/edf-imap.web.ts:\n  ';
    if ('undefined' == typeof window) throw new Error(me+'No `window` object');
    if (window['EDF_IMAP_WEB']) throw new Error(me+'`EDF_IMAP_WEB` exists');
}();

//// Public API. 
module EDF_IMAP_WEB {
    export class Item {
        x:     number;
        y:     number;
        title: string;
        slug:  string;
        constructor(config:Object, id:number) {
            console.log('new Item, id ' + id + '!');
        }
    }
    export class Main {

        constructor(config:Object) {
            console.log('Main::constructor()');
        }

        items: Item[] = [];

        add(item:Object) {
            this.items.push(new Item(item, this.items.length));
        }

        init(selector:string) {
            console.log('Main::init() ' + selector);
        }
    }
}

EDF_IMAP_WEB['main'] = new EDF_IMAP_WEB.Main({});