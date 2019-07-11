!function () {

    //// Basic validation. 
    var me = 'js/content.js:\n  ';
    if ('undefined' == typeof window) throw new Error(me+'No `window` object');
    if (! window.EDF_IMAP_WEB) throw new Error(me+'No `window.EDF_IMAP_WEB`');
    var app = window.EDF_IMAP_WEB.app;


    //// Configure the interactive map. 
    app.configure({
        bkgnd: {
            srcA:    'assets/bkgnd-a-hinkley-v4-3760x4648.jpg'
          , srcB:    'assets/bkgnd-b-aerial-view-3760x4648.jpg'
          , width:   3760
          , height:  4648
        }
      , header: {
            titleA:  'Hinkley Point C Construction Site May 2019'
          , titleB:  'Hinkley Point C Construction Complete'
          , rtn2Map: 'Return to map'
        }
      , tagmenu: {
            title:   'Browse By Category'
          , heading: '' // was 'Numbered Pins Link<br>to On-Site Signs'
        }
      , xtramenu: {
            title:   'Additional Information'
          , heading: 'Hinkley Point C<br>Community Links'
        }
      , changeview: {
            title:   'Change View'
        }
      , instructions: {
            title:   'Tap an information point<br>to get more detail &amp; media'
        }
      , tagcolors: {
            'Construction'              : 'lime'
          // , 'Workforce'                 : 'green'
          , 'Logistics'                 : 'navy'
          , 'Geographical Features'     : 'orange'
          , 'Power Station'             : 'peach'
          , 'Site History &amp; Ecology': 'cyan'
          , '360 Videos'				: 'green'
        }
    });


    //// Add the Numbered Pins. 
    // app.addNumberedPin({
    //     x: 2957
    //   , y: 1644
    //   , title: 'HPC Introduction'
    //   , slug:  '1'
    //   , tags:  []
    //   , slides: [
    //         { src: 'assets/1-image_2-718x404.png', caption: 'Site Construction Director’s Welcome', 
    //           content: [
    //               'Welcome to the Hinkley Point C construction site. '
    //             , 'Hinkley Point C will restart nuclear construction in the UK. It will be the first nuclear power station to be built in the UK for 25 years, the first in a generation.'
    //             , 'Safety is our number one priority. Please listen carefully to your host regarding the risks present on our construction site. If you have any concerns please tell us. '
    //           ]
    //         }
    //       , { src: 'assets/1-edf-hpc-animation-v3-718x404.gif', caption: '', //@todo add this movie
    //           content: [
    //               'Hinkley Point C will host two nuclear reactors capable of producing enough low carbon electricity to power around 5 million homes'
    //             , 'Will offset the emission of 10 million tonnes of CO&#8322; a year.'
    //             , 'Will be capable of generating 7% of the UK’s electricity'
    //             , 'Will provide 25,000 different job opportunities during construction, with  5,600 people on site at the peak'
    //             , 'The site is approximately 175 hectares in size, equal to 245 football pitches'
    //           ]
    //         }
    //     ]
    // });

   //  { src: 'assets/360img-locodojo.jpg', caption: '', 
   //           content: [
   //               'This is a 360 image'
   //             , 'From assets. '
   //           ]
   //         }
   //      ,
   //   }


// 360 videos

    app.addNumberedPin({
        x: 1700
      , y: 500
      , title: 'Sea Wall'
      , slug:  '360_1'
      , tags:  ['360 Videos']
      , slides: [ // <iframe width="560" height="315" src="https://www.youtube.com/embed/lV5G7VozIOc?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            { src: 'https://players.brightcove.net/4098359024001/q2SSHCRNG_default/index.html?videoId=6051592775001&muted', caption: 'Sea Wall: During Construction.', 
              content: [
                  'Drag the video to explore the scene.'
               // , ' More copy here...'
              ]
            },
             { src: 'https://players.brightcove.net/4098359024001/rJgmZvJZfm_default/index.html?videoId=5802472169001&muted', caption: 'Sea Wall: After Construction.', 
              content: [
                  'Drag the video to explore the scene.'
              ]
            }
          , 
            

          
        ]
    });


   	app.addNumberedPin({
        x: 2400
      , y: 1474
      , title: 'Tower'
      , slug:  '360_2'
      , tags:  ['360 Videos']
      , slides: [ // <iframe width="560" height="315" src="https://www.youtube.com/embed/lV5G7VozIOc?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            { src: 'https://players.brightcove.net/4098359024001/q2SSHCRNG_default/index.html?videoId=6051592969001&muted', caption: 'View from the Tower', 
              content: [
                  'Drag the video to explore the scene.'
               // , ' More copy here...'
              ]
            }
            

          
        ]
    });

    app.addNumberedPin({
        x: 2000
      , y: 1174
      , title: 'Unit 1 Heatsink'
      , slug:  '360_6'
      , tags:  ['360 Videos']
      , slides: [ // <iframe width="560" height="315" src="https://www.youtube.com/embed/lV5G7VozIOc?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            { src: 'https://players.brightcove.net/4098359024001/q2SSHCRNG_default/index.html?videoId=6051588490001&muted', caption: 'Unit 1 Heatsink: During Construction', 
              content: [
                  'Drag the video to explore the scene.'
               // , ' More copy here...'
              ]
            }
            

          
        ]
    });


   	app.addNumberedPin({
        x: 2000
      , y: 1474
      , title: 'Unit 2 Heatsink'
      , slug:  '360_3'
      , tags:  ['360 Videos']
      , slides: [ // <iframe width="560" height="315" src="https://www.youtube.com/embed/lV5G7VozIOc?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            { src: 'https://players.brightcove.net/4098359024001/q2SSHCRNG_default/index.html?videoId=6051592776001&muted', caption: 'Unit 2 Heatsink: During Construction', 
              content: [
                  'Drag the video to explore the scene.'
               // , ' More copy here...'
              ]
            }
            

          
        ]
    });


   	app.addNumberedPin({
        x: 360
      , y: 1200
      , title: 'Batching Plant'
      , slug:  '360_4'
      , tags:  ['360 Videos']
      , slides: [ // <iframe width="560" height="315" src="https://www.youtube.com/embed/lV5G7VozIOc?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            { src: 'https://players.brightcove.net/4098359024001/q2SSHCRNG_default/index.html?videoId=6051590996001&muted', caption: 'Batching Plant: During Construction', 
              content: [
                  'Drag the video to explore the scene.'
               // , ' More copy here...'
              ]
            },
            { src: 'https://players.brightcove.net/4098359024001/rJgmZvJZfm_default/index.html?videoId=5803040492001&muted', caption: 'Batching Plant: After Construction', 
              content: [
                  'Drag the video to explore the scene.'
               // , ' More copy here...'
              ]
            }
            

          
        ]
    });


   	app.addNumberedPin({
        x: 670
      , y: 2000
      , title: 'Environmental'
      , slug:  '360_5'
      , tags:  ['360 Videos']
      , slides: [ // <iframe width="560" height="315" src="https://www.youtube.com/embed/lV5G7VozIOc?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            { src: 'https://players.brightcove.net/4098359024001/rJgmZvJZfm_default/index.html?videoId=5803043706001&muted', caption: 'Environmental: During Construction', 
              content: [
                  'Drag the video to explore the scene.'
               // , ' More copy here...'
              ]
            },
            { src: 'https://players.brightcove.net/4098359024001/rJgmZvJZfm_default/index.html?videoId=5803047334001&muted', caption: 'Environmental: After Construction', 
              content: [
                  'Drag the video to explore the scene.'
               // , ' More copy here...'
              ]
            }
            

          
        ]
    });



// End 360 Videos


    app.addNumberedPin({
        x: 2179
      , y: 1474
      , title: 'Reactor buildings'
      , slug:  '2'
      , tags:  ['Power Station']
      , slides: [
            { src: 'assets/2-reactor-718x404.gif', caption: '', 
              content: [
                  'Hinkley Point C will comprise of two UK EPR&trade; reactors each generating 1630MW. HPC will produce almost four times more electricity than Hinkley Point B station’s two reactors.'
                , 'The UK EPR&trade; is an evolutionary design including improved efficiency and safety — its construction draws from experience gained from sister projects in Flamanville in France and Taishan in China. '
              ]
            }
          , { src: 'assets/2-image_2-718x404.jpg', caption: 'Aerial view HPC', 
              content: [
                  'When operational HPC will employ 900 people and has an operating life of 60 years. '
              ]
            }
          , { src: 'assets/2-image_3-718x404.jpg', caption: 1, // use caption from slide 1 (zero-indexed) 
              content: 1 // use text from slide 1 (zero-indexed)
            }
          , { src: 'assets/2-flamanville-dome-718x404.gif', caption: 'The dome of Flamanville 3 EPR in France being lowered into place', 
              content: [
                  'One of the world’s tallest, most powerful cranes will be used to raise the unit’s dome, which will measure 57 metres in diameter, and to lower it slowly into place on the 64 metre high reactor building.'
              ]
            }
        ]
    });

    app.addNumberedPin({
        x: 507
      , y: 1191
      , title: 'Concrete Batching Plant'
      , slug:  '3'
      , tags:  ['Construction']
      , slides: [
            { src: 'assets/3-batching-plant-718x404.gif', caption: '', 
              content: [
                  '3 million tonnes of concrete will be required during the construction of Hinkley Point C - that’s 75 times more concrete than was used to build the Millennium Stadium. '
                , 'HPC will manufacture the required concrete on site through concrete batching plants. '
              ]
            }
          , { src: 'assets/3-page-2-image-718x404.jpg', caption: '',
              content: [
                  'Three concrete batching plants will be fed by a temporary jetty which will provide the raw materials. Each batching plant has an aggregate ground storage capacity of 50,000 tonnes and each overhead aggregate storage bin capacity of 100 tonnes. The mixer capacity is 140 cubic metres per hour.'
              ]
            }
        ]
    });

    app.addNumberedPin({
        x: 3252
      , y: 3968
      , title: 'Accommodation'
      , slug:  '4'
      , tags:  ['Logistics']
      , slides: [
            { src: 'assets/Hinkley Campus Opening - 9th July 2018 - 114.jpg', caption: 'Hinkley Point C On-Site Accommodation Campus', 
              content: [
                  'During peak construction over 5,600 people will work onsite at any one time. The 510 bed Hinkley Camps opened onsite in July 2018. The campus, which is the biggest of its kind in Europe, will be home to many of the workforce during their time at HPC.'
              ]
            }
          , { src: 'assets/Hinkley Campus Opening - 9th July 2018 - 129.jpg', caption: 0, 
              content: [
                  'In the nearby town of Bridgwater further accommodation for 1,000 people is planned. All campus accommodation will include excellent sports and recreation facilities for the HPC workforce'
              ]
            }
          , { src: 'assets/Host - Hinkley Campus - 10th Sept 2018 - 065.jpg', caption: 0, // use caption from slide 1 (zero-indexed) 
              content: 1 // use text from slide 1 (zero-indexed)
            }
          , { src: 'assets/Hinkley Campus Opening - 9th July 2018 - 043.jpg', caption: 0, 
              content: 1
            }
        ]
    });

    app.addNumberedPin({
        x: 248
      , y: 528
      , title: 'Temporary Jetty'
      , slug:  '5'
      , tags:  ['Logistics']
      , slides: [
            { src: 'assets/20180704_221100.jpg', caption: '', 
              content: [
                  'In order to reduce the number of vehicles on the roads, and associated CO&#8322; emissions,  HPC will receive at least 80% of construction aggregates by sea — an estimated 2.8 million tonnes. The Jetty development will be used to bring these bulk materials to site. '
              ]
            }
          , { src: 'assets/HPC Site Progress - KBJV - 25th July 2018 - 027.jpg', caption: '', // use caption from slide 0 (zero-indexed) 
              content: [
                  'The jetty will be approximately 500 metres in length and will comprise of a bridge, a head (where ships will berth) and also conveyors that will be used to discharge ships. '
              ]
            }
          , { src: 'assets/DJI_0003.jpg', caption: 1,
              content: 1 // use text from slide 1 (zero-indexed)
            }
          , { src: 'assets/DJI_0024.jpg', caption: 1, 
              content: [
                  'The jetty is designed and built to function effectively within the Severn Estuary’s 11-metre tidal range and at 500 metres long it will be the UK’s ninth longest pier'
                , 'The jetty is a temporary structure that will be removed after its operational phase.'
              ]
            }
        ]
    });

    app.addNumberedPin({
        x: 3332
      , y: 2164
      , title: 'Northern Plaza'
      , slug:  '6'
      , tags:  ['Logistics']
      , slides: [
            { src: 'assets/6-image_1-718x404.png', caption: 'Hinkley Point C’s interim bus service', 
              content: [
                  'During peak construction 5,600 people will work on site at Hinkley Point C at any one time. '
                , 'To reduce car journeys on local roads 95% of construction workers will travel to site by bus. This will be facilitated by four park and rides.'
                , 'The Northern Plaza will manage around 254 buses and cars per day at peak construction.'
              ]
            }
        ]
    });

    app.addNumberedPin({
        x: 2968
      , y: 2396
      , title: 'Green Lane'
      , slug:  '7'
      , tags:  ['Geographical Features']
      , slides: [
            { src: 'assets/7-green-lane-718x404.gif', caption: '', 
              content: [
                  'Green Lane is an ancient right of way. It will remain protected during construction and public access will be returned when Hinkley Point C is operational. '
                , 'Green Lane runs east to west across the site and sits roughly between the top of Holford Valley and the area of main construction. '
              ]
            }
          , { src: 'assets/7-image_1-718x404.jpg', caption: 0, // use caption from slide 0 (zero-indexed) 
              content: 0 // use text from slide 0 (zero-indexed)
            }
        ]
    });

    app.addNumberedPin({
        x: 2360
      , y: 2292
      , title: 'Concrete process trial'
      , slug:  '8'
      , tags:  ['Construction']
      , slides: [
            { src: 'assets/8-concrete-trials-718x404.gif', caption: '', 
              content: [
                  'In order to trial the processes and procedures used for concrete manufacture and construction, a mock up was created following the same techniques and materials that will be used in main construction. '
                , 'By testing the methods in this way we have been able to incorporate learning and best practice as well as assure the quality of the final product. The concrete process trial took 18 months to complete.'
              ]
            }
          , { src: 'assets/8-image_1-718x404.jpg', caption: 0, // use caption from slide 0 (zero-indexed) 
              content: 0 // use text from slide 0 (zero-indexed)
            }
          , { src: 'assets/8-image_2-718x404.jpg', caption: 0, 
              content: 0
            }
        ]
    });

    app.addNumberedPin({
        x: 2647
      , y: 2697
      , title: 'Holford Valley'
      , slug:  '9'
      , tags:  ['Geographical Features']
      , slides: [
            { src: 'assets/9-image_1-718x404.jpg', caption: 'Holford culvert under construction', 
              content: [
                  'Over 5 million cubic metres of materials will be excavated as part of the build. '
                , 'Much of this earth will be transferred to Holford Valley. '
                , 'In preparation for the excavated material a tunnel called a culvert was created to protect Holford Stream and allow it to continue flowing.'
              ]
            }
          , { src: 'assets/9-image_2-718x404.jpg', caption: 0, // use caption from slide 0 (zero-indexed) 
              content: 0 // use text from slide 0 (zero-indexed)
            }
          , { src: 'assets/9-culvert-final-piece-718x404.gif', caption: 'Last concrete section being lifted into Holford Culvert', 
              content: [
                  'The Holford Stream culvert was built in 2015 and is 710m long comprising of 592 pre-cast concrete sections - each of which weighs 16 tonnes.'
                , 'Holford culvert is large enough for a mini-digger to pass through and keep it clear. It has animal ‘benches’ above the water, allowing small animals to pass underground.'
              ]
            }
        ]
    });

    app.addNumberedPin({
        x: 2952
      , y: 3520
      , title: 'Southern Plaza'
      , slug:  '10'
      , tags:  ['Logistics']
      , slides: [
            { src: 'assets/10-pc3000-arriving-718x404.gif', caption: 'Large plant will arrive here throughout the build', 
              content: [
                  'The Southern Plaza plays a key role in efficient site logistics to minimise impact on the local road network. Using a computerised Delivery Management System, the Plaza will manage up to 375 HGVs each day. '
                , 'Freight management facilities have been built at Junctions 23 & 24 of the M5 motorway to maximise delivery efficiency. '
              ]
            }
          , { src: 'assets/10-image_2-718x404.jpg', caption: 'ANPR cameras', 
              content: [
                  'HPC’s computerised Delivery Management System is linked to 35 traffic Automatic Number Plate Recognition cameras (ANPR) at 11 locations along routes to Hinkley Point. All deliveries are processed through this system ensuring proper control over logistics.'
              ]
            }
        ]
    });


    //// Add the Lightbulb Pins. 
    app.addLightbulbPin({
        x: 1435
      , y: 513
      , title: 'Water Intake and Outfall Tunnels'
      , slug:  'a'
      , tags:  ['Power Station']
      , slides: [
            { src: 'assets/a-image_1-718x404.png', caption: '', 
              content: [
                  'Nuclear power stations require large volumes of water for cooling. The water intake and outfall tunnels ensure that a separate and continuous supply of sea water is taken and returned to the sea. '
                , 'Water used for cooling the steam is never in contact with radioactive materials. Separate cooling circuits are an important aspect of nuclear power station design. '
              ]
            }
          , { src: 'assets/13.jpg', caption: 'Tunnel Boring Machine', 
              content: [
                  'The marker buoy for the water outfall is closest (approx. 2km from shore) and the intake is further out (approx. 3.3km from shore – where water is colder). '
                , 'Hinkley Point C’s water intake and outfall tunnels will be drilled by specialist tunnel boring machines out under the Severn Estuary. '
              ]
            }
          , { src: 'assets/a-image_3-718x404.png', caption: 'Proposed arrangement at tunnel heads to control water flow', 
              content: [
                  'We will be removing 500,000m3 of rock from beneath the Bristol channel to create the tunnels, enough to fill almost 1,500 international standard squash courts. This will be retained and landscaped on site.'
                , 'We will be constructing 6 head structures, 2 for each tunnel for the control of water at the ends of the tunnels. These will be constructed in a dock facility on the Bristol channel. Each of the heads will weigh approx. 3,500 tonnes. '
                , 'We then have to place them in the deep-water position to within an accuracy of 50mm , or the width of a bank card.'
              ]
            }
          , { src: 'assets/hpc_gary_taylor_crf_13.12.17_1656.jpg', caption: 'Cooling water pipes', 
              content: [
                  'The pipe infrastructure which will sit in HPC’s deep excavation, below the turbine halls and in between the pump house and outfall buildings, and will channel the cooling water into the power station. The completed structure will comprise 724 segments for Units 1 & 2, with a total length of 1.4km.'
              ]
            }
        ]
    });

    app.addLightbulbPin({
        x: 504
      , y: 1584
      , title: 'Tree planting'
      , slug:  'e'
      , tags:  ['Site History &amp; Ecology']
      , slides: [
            { src: 'assets/e-image_1-718x404.jpg', caption: '', 
              content: [
                  'Over 20,000 trees have been planted to help provide a natural screen to construction activities for our neighbours in the nearby hamlet of Shurton.'
              ]
            }
        ]
    });

    app.addLightbulbPin({
        x: 966
      , y: 2128
      , title: 'Archaeology'
      , slug:  'f'
      , tags:  ['Site History &amp; Ecology']
      , slides: [
            { src: 'assets/f-image_1-718x404.jpg', caption: '', 
              content: [
                  'Several large area excavations have been carried out at the Hinkley Point C site. The first seven-month archaeological excavations began in March 2012. Further excavations took place on HPC Site in the summer of 2014 and also outside the Southern perimeter fence in November 2015.'
              ]
            }
          , { src: 'assets/f-image_2-718x404.jpg', caption: 'Summary of findings:', 
              content: [
                  'Everyday items including pottery, coins, and brooches, and fragments of imported pottery'
                , 'Remains of a sunken-floored building which may date to the sub-Roman period or Dark Ages'
              ]
            }
          , { src: 'assets/f-image_3-718x404.png', caption: 1, 
              content: [
                  'Evidence of hunters and gatherers, from tiny worked flint tools called microliths, dating back 10,000 years'
                , 'Evidence people lived on and farmed the land during the Iron Age and Roman periods'
              ]
            }
          , { src: 'assets/f-image_4-718x404.jpg', caption: 1, 
              content: [
                  'A number of flint tools dating from the Neolithic and Bronze Age periods'
                , 'Two parallel ditches dug from east to west, used to divide land in the Bronze Age'
              ]
            }
        ]
    });

    app.addLightbulbPin({
        x: 1480
      , y: 3084
      , title: 'Water Management'
      , slug:  'h'
      , tags:  ['Site History &amp; Ecology']
      , slides: [
            { src: 'assets/h-water-management-718x404.gif', caption: 'Hinkley Point C Water Management Zones', 
              content: [
                  'Large ponds have been created on the construction site to hold rainwater run-off. Importantly they allow sediment to settle before water is released to sea or streams.'
              ]
            }
          , { src: 'assets/h-image_1-718x404.jpg', caption: 'Early Water Management Zones', 
              content: [
                  'The ponds, or Early Water Management Zones, are necessary as top-soil has been removed across site in large quantities.'
                , 'Previously the top-soil, comprising of grass and other vegetation, would have acted as a natural filter.'
              ]
            }
        ]
    });

    app.addLightbulbPin({
        x: 1282
      , y: 4042
      , title: 'Emergency Access Road'
      , slug:  'i'
      , tags:  ['Logistics']
      , slides: [
            { src: 'assets/i-image_1-718x404.jpg', caption: 'Illustrative view of emergency access road', 
              content: [
                  'The emergency access road will be available for emergency services if the main entrances to site become inaccessible. It is a legal requirement for all new nuclear power stations to have two access roads .'
              ]
            }
        ]
    });

    app.addLightbulbPin({
        x: 1950
      , y: 3684
      , title: 'Materials Stockpile'
      , slug:  'j'
      , tags:  ['Construction']
      , slides: [
            { src: 'assets/j-transporting-materials-to-holford-valley-718x404.gif', caption: 'Transferring material into Holford Valley', 
              content: [
                  'Various types of material which have been excavated from the site are segregated here. The soil will be reused for landscaping and backfill.'
              ]
            }
          , { src: 'assets/j-image_1-718x404.jpg', caption: 'PC 3000 moving materials at HPC site', 
              content: [
                  'Over 5 million cubic metres of material will be moving as part of the enabling works programme. '
                , '48,000m&sup3; of material has been used to backfill the old Hinkley Point A buildings.'
                , 'By doing this we have avoided 3,200 lorry movements travelling over 288,000 miles and saved 400 tonnes of CO&#8322;.'
              ]
            }
          , { src: 'assets/j-image_2-718x404.jpg', caption: 1, // use caption from slide 1 (zero-indexed) 
              content: 1 // use text from slide 1 (zero-indexed)
            }
        ]
    });

	/*
    app.addLightbulbPin({
        x: 2188
      , y: 4200
      , title: 'Southern Landscaping'
      , slug:  'k'
      , tags:  ['Site History &amp; Ecology']
      , slides: [
            { src: '', caption: '', 
              content: [
                  'Landscaping is due to occur outside the current perimeter fence at the south of the site. This will provide a screen to mitigate against visual and audible impacts of construction. It will be seeded and planted. '
              ]
            }
        ]
    });
	*/

    app.addLightbulbPin({
        x: 2598
      , y: 4013
      , title: 'Perimeter fence'
      , slug:  'l'
      , tags:  ['Geographical Features']
      , slides: [
            { src: '', caption: '', 
              content: [
                  'Hinkley Point C is a nuclear licensed site and security is a priority. The perimeter fence is part of site security arrangements and is approximately 6.5 km long.'
              ]
            }
        ]
    });

    app.addLightbulbPin({
        x: 3674
      , y: 1980
      , title: 'Wick Barrow / Pixies Mound'
      , slug:  'n'
      , tags:  ['Site History &amp; Ecology']
      , slides: [
            { src: '', caption: '', 
              content: [
                  'Wick Barrow is a rare example of a Neolithic round barrow, dating from about 6,000 years ago.  It measures about 25 metres in diameter and 1.5 metres high.  A barrow is a name given to a structure for burying the dead. '
                , 'Wick Barrow was found to contain late stone age human remains when excavated in 1907. The excavation also revealed it was disturbed in Roman times as Roman coins and a dagger were found. '
                , 'Wick Barrow is a Scheduled Ancient Monument and nationally important. It is often referred to as Pixies’ Mound because according to local legend Pixies inhabit the mound.'
              ]
            }
        ]
    });

    app.addLightbulbPin({
        x: 2870
      , y: 2030
      , title: 'Plant Equipment'
      , slug:  'p'
      , tags:  ['Construction']
      , slides: [
            { src: 'assets/p-pc30000-in-operation-718x404.gif', caption: '', 
              content: [
                  'PC3000 at work'
              ]
            }
        ]
    });

    app.addLightbulbPin({
        x: 1868
      , y: 656
      , title: 'Illustrative view of sea wall'
      , slug:  'q'
      , tags:  ['Construction']
      , slides: [
            { src: 'assets/q-image_1-718x404.jpg', caption: 'Illustrative view of sea wall', 
              content: [
                  'A sea wall is currently under construction to protect against natural hazards that have a frequency of less than one in 10,000 years and includes tides, storm surges and tsunami as isolated or in-combination events.'
                , 'Having also taken predicted sea level rise over the station’s lifetime into account, the seawall will be 760m long and stand at 13.5 metres high.'
                , 'A physical scale model (1:40) of a 400m long section of the sea wall has already been constructed and tested to assess the structural stability of the wall and the volume of wave overtopping.'
              ]
            }
        ]
    });

    app.addLightbulbPin({
        x: 910
      , y: 2592
      , title: 'Ecology'
      , slug:  'r'
      , tags:  ['Site History &amp; Ecology']
      , slides: [
            { src: 'assets/r-image_4-718x404.jpg', caption: 'Illustrative view of restored landscape', 
              content: [
                  'Over 20,000 trees have been planted to provide a screen to construction activities for local villages.'
                , 'Additional planting will help create 13.5 hectares of broad leaved woodland and 11.2km of species rich hedgerows as habitats for wildlife during Hinkley Point C’s operation.'
              ]
            }
          , { src: 'assets/r-image_2-718x404.jpg', caption: 'Barbestelle bat', 
              content: [
                  'HPC is used for foraging and commuting by at least 9 species of bat including the rare Barbestelle species. '
                , 'We have built a bespoke bat house on site to accommodate a range of bat species throughout the year. Currently two species are known to be living in the barn.'
                , '60 bat boxes, acting as summer roost sites, have also been installed in nearby woodland.'
              ]
            }
          , { src: 'assets/r-image_3-718x404.jpg', caption: 'Badger relocation and protection', 
              content: [
                  'Badgers were previously present on the HPC site. Two temporary replacements setts have been built to house badgers and protect them from areas where plant machinery will be operating. '
                , 'These temporary habitats will decompose over time encouraging the badgers to make natural setts in the adjacent hedge.'
              ]
            }
          , { src: 'assets/r-image_1-718x404.jpg', caption: 'Ecological mitigation', 
              content: [
                  'An ecological mitigation area either side of Green Lane will help to provide additional habitat, especially for reptiles such as slowworms and grass snakes. Gloworms are also present – the females can be seen glowing on a hot summer’s night.'
              ]
            }
        ]
    });


    //// Add the Hidden Pins. 
    app.addHiddenPin({
        x: 111
      , y: 650
      , title: 'Project construction summary'
      , slug:  'xtra-1'
      , isXtra: true
      , tags:  []
      , slides: [
            { src: 'assets/xtra-1-image_1-718x404.jpg', caption: 'Project construction timescale', 
              content: [
                  'The initial programme of site activity focuses on earth excavation. Over 5 million cubic metres of earth will be dug from the north of the site creating excavations large enough to host the power station’s two reactors. '
                , 'Throughout this period temporary buildings will be constructed across the site providing welfare facilities and office accommodation for the workforce. '
                , 'During this initial activity, also in the north of the site, a sea jetty will be constructed to bring bulk materials to site and works will also begin on tunnelling the water inlet and outlet structures under the Severn Estuary. '
                , 'Upon completion of the excavation works, main civil construction works will start which will see approximately three million tonnes of concrete poured to create suitable foundations for the power station. '
                , 'Permanent buildings will then be constructed to house key components like the power station’s turbines and electricity  transmission infrastructure. A sea wall and a public information centre will also be constructed. '
                , 'The project will be delivered by many different contractor organisations all bringing world class knowledge and expertise to the challenge. '
              ]
            }
          , { src: 'assets/xtra-1-image_2-718x404.jpg', caption: 0, // use caption from slide 0 (zero-indexed) 
              content: 0 // use text from slide 0 (zero-indexed)
            }
        ]
    });

    app.addHiddenPin({
        x: 222
      , y: 650
      , title: 'More than a power station'
      , slug:  'xtra-2'
      , isXtra: true
      , tags:  []
      , slides: [
            { src: 'assets/xtra-2-image_1-718x404.jpg', caption: 'Hinkley Point C’s Associated Developments ', 
              content: [
                  'A number of off site facilities are required during construction for both our workforce and to ensure efficient logistics. '
                , 'These are referred to as Hinkley Point C’s Associated Developments and include: park and rides, freight management facilities and £16m of road improvements - with a bypass around the village of Cannington. '
                , 'The Associated Developments also include refurbishment of a sea wharf in the village of Combwich which is critical for logistics. '
              ]
            }
        ]
    });

    app.addHiddenPin({
        x: 333
      , y: 650
      , title: 'Our role in the Community'
      , slug:  'xtra-3'
      , isXtra: true
      , tags:  []
      , slides: [
            { src: 'assets/xtra-3-image_1-718x404.jpg', caption: 'Hinkley Point C staff volunteering at a local school', 
              content: [
                  'The Hinkley Point C project is one of the first major projects to invest so much at an early stage in local schools, colleges and training. EDF Energy is fully committed to Somerset people benefitting from the skills and employment opportunities the project will bring. '
                , 'Almost £15 million is being invested in education, employment and skills in Somerset. This includes a commitment to over £6 million for Bridgwater College and West Somerset College. '
                , 'An Energy Skills Centre, Enterprise Centre and a Construction Skills and Innovation centre have been built as part of the investment. '
                , 'The project presents a transformational opportunity for the Somerset economy. Over 2,000 companies in the local area have registered their interest to work on the construction of Hinkley Point C with extensive activity underway to help local firms prepare for the challenge. '
                , 'It is estimated that around £100 million each year will be put into the region’s economy during peak construction and £40 million each year of its planned 60 year operating life. '
                , 'EDF Energy has reached agreement with local councils to deliver almost £100 million to mitigate the impacts of the construction which includes a £20 million community fund. '
              ]
            }
        ]
    });

    // app.addHiddenPin({
    //     x: 444
    //   , y: 650
    //   , title: 'On site temporary accommodation'
    //   , slug:  's'
    //   , tags:  ['Workforce']
    //   , slides: [
    //         { src: '', caption: '', 
    //           content: [
    //               'It is anticipated that over 50,000 square meters of welfare accommodation will be required during construction. '
    //           ]
    //         }
    //     ]
    // });

}();