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


    //// Add the Numbered Pins. 
    main.addNumberedPin({
        x: 123
      , y: 456
      , title: 'Title for Numbered Pin One'
      , slug:  'slug-for-numbered-pin-one'
      , content: [
            'This is the first paragraph. '
          , 'Here’s paragraph 2. '
        ]
      , items: [
            { src: 'assets/test-1-288x360.jpg', caption: 'Caption for first item. ' }
          , { src: 'assets/test-2-288x360.jpg', caption: 'Caption for second item. ' }
        ]
    });

    main.addNumberedPin({
        x: 500
      , y: 150
      , title: 'Title for Numbered Pin Two'
      , slug:  'slug-for-numbered-pin-two'
    });


    //// Add the Lightbulb Pins. 
    main.addLightbulbPin({
        x: 50
      , y: 200
      , title: 'Title for Lightbulb Pin One'
      , slug:  'slug-for-lightbulb-pin-one'
      , items: [
            { src: 'assets/test-3-288x360.jpg', caption: 'Caption for item. ' }
        ]
    });

    main.addLightbulbPin({
        x: 300
      , y: 270
      , title: 'Title for Lightbulb Pin Two'
      , slug:  'slug-for-lightbulb-pin-two'
    });


    //// Add the Hidden Pins. 
    main.addHiddenPin({
        x: 50
      , y: 200
      , title: 'Title for Hidden Pin One'
      , slug:  'slug-for-hidden-pin-one'
    });

    main.addHiddenPin({
        x: 300
      , y: 270
      , title: 'Title for Hidden Pin Two'
      , slug:  'slug-for-hidden-pin-two'
    });

}();