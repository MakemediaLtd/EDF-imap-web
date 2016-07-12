!function () {

    //// Basic validation. 
    var me = 'js/content.js:\n  ';
    if ('undefined' == typeof window) throw new Error(me+'No `window` object');
    if (! window.EDF_IMAP_WEB) throw new Error(me+'No `window.EDF_IMAP_WEB`');

    //// Add the content. 
    window.EDF_IMAP_WEB.main.add({
        x: 123
      , y: 456
      , title: 'The Title'
      , slug:  'the-slug'
    });

}();