!function () {

    //// Basic validation. 
    var me = 'js/content.js:\n  ';
    if ('undefined' == typeof window) throw new Error(me+'No `window` object');
    if (! window.EDF_IMAP_WEB) throw new Error(me+'No `window.EDF_IMAP_WEB`');
    var main = window.EDF_IMAP_WEB.main;

    //// Configure the interactive map. 
    main.configure({
        bkgnd: {
            src:    'assets/test-jpeg-1.jpg'
          , width:  984
          , height: 735
        }
    });

    //// Add the Markers. 
    main.addMarker({
        x: 123
      , y: 456
      , title: 'Title for Marker Zero'
      , slug:  'slug-for-marker-zero'
    });

    //// Add the Markers. 
    main.addMarker({
        x: 500
      , y: 50
      , title: 'Title for Marker One'
      , slug:  'slug-for-marker-one'
    });

}();