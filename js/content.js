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
      , tagmenu: {
            title: 'Numbered Pins Link to On-Site Signs'
        }
    });


    //// Add the Numbered Pins. 
    main.addNumberedPin({
        x: 123
      , y: 456
      , title: 'Title for Numbered Pin One'
      , slug:  'slug-for-numbered-pin-one'
      , tags:  ['Logistics', 'Workforce']
      , items: [
            { src: 'assets/test-1-288x360.jpg', caption: 'Caption for first item. ', 
              content: [
                  'This is the first paragraph for the first item. '
                , 'Here’s paragraph 2. '
              ]
            }
          , { src: 'assets/test-2-288x360.jpg', caption: 'Caption for second item. ', 
              content: [
                  'This is the first paragraph for the second item. '
                , 'Here’s paragraph 2 for the second item. '
              ]
            }
        ]
    });

    main.addNumberedPin({
        x: 500
      , y: 150
      , title: 'Title for Numbered Pin Two'
      , slug:  'slug-for-numbered-pin-two'
      , tags:  ['Logistics']
      , items: [
            { src: 'assets/test-1-288x360.jpg', caption: 'Caption for first item. ', 
              content: [
                  'This is the first paragraph for the first item. '
                , 'Here’s paragraph 2. '
              ]
            }
          , { src: 'assets/test-2-288x360.jpg', caption: 'Caption for second item. ', 
              content: [
                  'This is the paragraph for the second item. '
              ]
            }
          , { src: 'assets/test-3-288x360.jpg', caption: 'Caption for third item. ', 
              content: [
                  'This is the first paragraph for the third item. '
                , 'Here’s paragraph 2 for the third item. '
                , 'Here’s paragraph 3 for the third item. '
              ]
            }
        ]
    });


    //// Add the Lightbulb Pins. 
    main.addLightbulbPin({
        x: 50
      , y: 200
      , title: 'Title for Lightbulb Pin One'
      , slug:  'slug-for-lightbulb-pin-one'
      , tags:  ['Power Station', 'Workforce']
      , items: [
            { src: 'assets/test-3-288x360.jpg', caption: 'Caption for item. ', 
              content: [
                  'This is the first paragraph for the item. '
                , 'Here’s paragraph 2 for the item. '
              ]
            }
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