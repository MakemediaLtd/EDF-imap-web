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
            titleA:  'Hinkley Point C Construction Site'
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
            'Construction'              		: 'lime'
          // , 'Workforce'                  	: 'green'
          , 'Site Operations'                 		: 'navy'
          , 'Geographical Features'     		: 'orange'
          , 'Power Station'             		: 'peach'
          , 'Archaeology &amp; the environment'	: 'cyan'
          , 'Off-Site Training Facilities'		: 'green'
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


// Power Station

    app.addNumberedPin({
        x: 2179
      , y: 1474
      , title: 'European Pressurised Water Reactor (EPR)'
      , slug:  '2'
      , tags:  ['Power Station']
      , slides: [ //img 25335 , img 9462
			{ src: 'assets/Images/2-reactor-718x404.gif', caption: 'Hinkley Point C: Illustrative view on completion.', 
              content: [
                  'Hinkley Point C will comprise of two UK EPR reactors. Each generating 1630 megawatts of electricity. That‘s almost four times more than Hinkley Point B‘s reactors. ',
				  'The UK EPR is an evolutionary design including improved efficiency and safety - its construction draws on experience gained from sister projects in Flamanville in France and Taishan in China.'
              ]
            }
           ,{ src: 'assets/Images/ID_25335_1.jpg', caption: 'EPR',
              content: [
                  'EPRs – originally known as European Pressurised Water Reactors – are a type of Pressurised Water Reactor (PWR). The design of the UK EPRs under construction at Hinkley Point C represent a major development on previous PWRs, making them amongst the safest and most efficient civil nuclear power generators ever designed.',
				  'Follow this link for more information.',
				  '<a href="https://www.edfenergy.com/energy/nuclear-new-build-projects/hinkley-point-c/about/reactor" target="_blank">https://www.edfenergy.com/energy/nuclear-new-build-projects/hinkley-point-c/about/reactor</a>'
              ]
            }
            , { src: 'ID_9462_1.jpg', caption: 'Design', 
              content: [
                  'The UK EPR design marks significant progress towards sustainability. It has been designed to use less uranium and produce almost a third less long-lived radioactive wastes compared with other water reactors in operation today.'
              ]
            }
		
        ]
    });
	
	/*
	app.addNumberedPin({
        x: 2179
      , y: 1474
      , title: 'Design Carousel Test'
      , slug:  '2'
      , tags:  ['Power Station']
      , slides: [
            { src: '', caption: 'Design', 
              content: [
                  'The UK EPR design marks significant progress towards sustainability. It has been designed to use less uranium and produce almost a third less long-lived radioactive wastes compared with other water reactors in operation today.'
              ]
            }
        ]
    });
	*/
		
	app.addNumberedPin({
        x: 1900
      , y: 1500
      , title: 'Base of Reactor'
      , slug:  '3'
      , tags:  ['Power Station']
      , slides: [ // 45816 video & 48892 jpg & 48924 video & 48894 jpg
			{ src: 'https://players.brightcove.net/4098359024001/q2SSHCRNG_default/index.html?videoId=6204676726001&muted', caption: 'Unit 1', 
              content: [
                  'Views near the base of Unit 1.',
				  'Drag the video to explore the scene.'
               // , ' More copy here...'
              ]
            },
            { src: 'assets/Images/ID_48892_1.jpg', caption: 'J0 Unit 2: Concrete pour', 
              content: [
                  'A major milestone achieved on schedule in 2020 was the completion of the 49,000-tonne base for Hinkley Point C‘s second reactor - meeting a target date set four years earlier. This major milestone in nuclear construction was completed by teams who adapted to new working conditions during the coronavirus pandemic. Their achievement, known as "J0"(Jalon Zero - meaning milestone zero), comes less than a year after the completion of Unit 1 base in June 2019.'
              ]
            },
            { src: 'https://players.brightcove.net/4098359024001/default_default/index.html?videoId=6204697658001', caption: 'Time-lapse',
              content: [
                  'J0 Unit 2 May 2020'
              ]
            },
		    { src: 'assets/Images/ID_48894_1.jpg', caption: 'J0 Unit 2: Completed concrete pour',
              content: [
                  'Completion of the second reactor base has benefited from experience gained on the first identical unit - leading to increases in productivity.  *Unit 2 vs Unit 1 *Steel installed 45% faster *Liner cup floor constructed 30% faster  *Cooling system components installed 50% faster.'
              ]
            }
			
        ]
    });
	
	app.addNumberedPin({
        x: 2350
      , y: 1150
      , title: 'Turbine Hall'
      , slug:  '2'
      , tags:  ['Power Station']
      , slides: [ // Video 45832
            { src: 'assets/Images/ID_51496_2.jpg', caption: '', 
              content: [
                  'The turbine hall is part of what is known as the conventional island, it contains the main non-nuclear  equipment that converts the steam into low carbon electricity.'
				  ,'These columns are part of the foundations for the turbine hall. 15 of these columns will support a reinforced concrete table for the largest steam turbine in the world.'
              ]
            },
			{ src: 'https://players.brightcove.net/4098359024001/q2SSHCRNG_default/index.html?videoId=6204680483001&muted', caption: 'Unit 2', 
              content: [
                  'Views near the Turbine Hall area of Unit 2.',
				  'Drag the video to explore the scene.'
               // , ' More copy here...'
              ]
            }
        ]
    });
	
	app.addNumberedPin({
        x: 2500
      , y: 700
      , title: 'Pump House Building'
      , slug:  '2'
      , tags:  ['Power Station']
      , slides: [ // Videos 49693 & 18897 & 50425
            { src: 'assets/Images/ID_49693_2.jpg', caption: '', 
              content: [
                  'The pumping station, will stand at 54m high but is set 36m underground, it is critical to the operation of the reactor as it pumps filtered seawater for cooling. The system will be capable of transferring 120,000 litres of water per second (this would empty an Olympic size swimming pool in less than a minute). The pump house and forebay structures will require 25% of all the concrete poured for the power station.'
              ]
            },
			{ src: 'https://players.brightcove.net/4098359024001/default_default/index.html?videoId=6204687893001', caption: 'Cooling Water Pipes', 
              content: [
                  'The CRF pipes will sit underneath the Turbine Hall and in between the pump house and outfall buildings. They will channel cooling water into the future power station. ‘CRF’ stands for ‘Circuit de Refroidissement’, a French term meaning ‘cooling water circuit’.'
			  ]
            },
			{ src: 'assets/Images/ID_50425_2.jpg', caption: 'Cooling Water Pipe Installation', 
              content: [
                  ''
              ]
            }
        ]
    });
	
    app.addLightbulbPin({
        x: 2050
      , y: 650
      , title: 'Water Intake and Outfall Tunnels'
      , slug:  'a'
      , tags:  ['Power Station']
      , slides: [
            { src: 'assets/Images/ID_51971_1.jpg', caption: '', 
              content: [
                  'Three tunnels are being excavated, two intake tunnels, which will bring cold water 3.5km out from the Bristol Channel into the power station, and one outfall tunnel to send the water back.  Our machines were named Beatrice, Emmeline and Mary by local school children.'
              ]
            }
          , { src: 'assets/Images/ID_51974_2.jpg', caption: '', 
              content: [
                  'A tunnel boring machine breaks through ground material to remove it, forming a tunnel in the process with concrete segment rings. There are three large tunnel boring machines and one smaller tunnelling kit operating at Hinkley Point C.'
              ]
            }
          , { src: 'assets/Images/ID_27773_1.jpg', caption: '', 
              content: [
                  'With its rotating cutting wheel at the front of the machine, the tunnel boring machine breaks materials away from the tunnel face. This earth is then transferred to the belt conveyor system inside the machine. There are a number of hydraulic arms which push the machine forward continually using the previous constructed concrete tunnel ring as its platform.'
              ]
            }
          , { src: 'assets/Images/ID_35616_1.jpg', caption: '', 
              content: [
                  '6,000 concrete segment rings will form the walls of the three tunnels. These are created with reinforced segments and grout injected to secure them in place. The segments are being constructed in a state-of- the-art facility at Bristol Port Dock in Avonmouth,  creating between 70-100 rings per week (each ring is made of six to eight segments).'
              ]
            }
        ]
    }); 
	
	
	
	// End of Power Station

    app.addNumberedPin({
        x: 1282
      , y: 3500
      , title: 'Excavated Material Stockpiles'
      , slug:  '3'
      , tags:  ['Construction']
      , slides: [
            { src: 'assets/Images/ID_18377_1.jpg', caption: 'Reprocessing', 
              content: [
                  'To create the base platforms for the power station vast quantities of material were excavated.  Much of excavated stone was crushed, sorted and stockpiled ready to be reused for building roads and backfilling areas of the site. The excavated material cannot be used to make the nuclear concrete as this needs high-grade stone, which is being sourced from UK quarries.'
              ]
            }
          , { src: 'assets/Images/ID_9705_1.jpg', caption: 'Holford Valley',
              content: [
                  'Much of the excavated material was sustainably reused in landscaping, including filling the Holford Valley. The valley contained the Holford stream that had to keep flowing so a concrete pipe, known as a culvert, was installed. It comprises 597 precast concrete sections. The stream now flows underneath the reused material.'
              ]
            }
        ]
    }); 
	
	    app.addNumberedPin({
        x: 1700
      , y: 540
      , title: 'Sea Wall'
      , slug:  '360_1'
      , tags:  ['Construction']
      , slides: [ // Video 45837 & 45838
            { src: 'https://players.brightcove.net/4098359024001/q2SSHCRNG_default/index.html?videoId=6204679644001&muted', caption: 'During Construction.', 
              content: [
                  'The sea wall, with its wave return top, stands at 13.5m high and 700m long. It is constructed along the foreshore, reinforcing the cliff that existed previously and forms part of the permanent defence against the sea.',
				  'Drag the video to explore the scene.'
               // , ' More copy here...'
              ]
            }
			/* Video Illustrative view of sea wall
             { src: 'https://players.brightcove.net/4098359024001/rJgmZvJZfm_default/index.html?videoId=5802472169001&muted', caption: 'After Construction - Illustrative View', 
              content: [
                  'The sea wall, with its wave return top, stands at 13.5m high and 700m long. It is constructed along the foreshore, reinforcing the cliff that existed previously and forms part of the permanent defence against the sea.',
				  'Drag the video to explore the scene.'
              ]
			} */
        ]
    });

	
	app.addNumberedPin({
        x: 2200
      , y: 1800
      , title: 'Big Carl'
      , slug:  '360_4'
      , tags:  ['Construction']
      , slides: [ // Videos 40623 & 44320 & Video 45819
            { src: 'https://players.brightcove.net/4098359024001/default_default/index.html?videoId=6204689449001', caption: 'The world‘s largest land based crane', 
              content: [
                  'The world‘s largest land based crane, the SGC-250, aka ‘Big Carl‘, runs along 6km of rail track, is able to stand 250m tall, is capable of lifting 5,000 tonnes and will be used to lift over 700 prefabricated pieces, including the heaviest components of the reactor buildings.'
               // , ' More copy here...'
              ]
            },
			{ src: 'https://players.brightcove.net/4098359024001/default_default/index.html?videoId=6204687742001', caption: 'The world‘s largest land based crane', 
              content: [
                  '‘Big Carl‘completed its first big lift in December 2019: the liner cup for Unit 1 at Hinkley Point C nuclear power station.'
              ]
            },
            { src: 'https://players.brightcove.net/4098359024001/q2SSHCRNG_default/index.html?videoId=6204679645001&muted', caption: 'Big Carl', 
              content: [
                  'The world‘s largest land based crane, the SGC-250, aka ‘Big Carl‘. At peak construction there will be more than 100 cranes  working together to carry out over one million lifts per year.',
				  'Drag the video to explore the scene.'
               // , ' More copy here...'
              ]
            }
        ]
    });

    app.addNumberedPin({
        x: 3252
      , y: 3968
      , title: 'Accommodation'
      , slug:  '4'
      , tags:  ['Site Operations']
      , slides: [
            { src: 'assets/Images/ID_27145_1.jpg', caption: 'Hinkley Point C On-Site & Off-Site Accommodation Campuses', 
              content: [
                  'We have built two temporary worker accommodation campuses. The on-site campus ‘Hinkley Campus’ is for 510 workers, the second, located in Bridgwater, named ‘Sedgemoor Campus’ is for 986 workers.'
              ]
            }
          , { src: 'assets/Images/ID_27147_2.jpg', caption: 'Outdoor Sports Facilities', 
              content: [
                  'The outdoor sports pitches at the Campuses are suitable for a range of sporting activities, including five-a-side football, basketball and tennis. Sedgemoor Campus has two five-a-side football pitches and a full size G3 astro-pitch.'
              ]
            }
          , { src: 'assets/Images/ID_28312_2.jpg', caption: 'Social Facilities',
              content: [
				   ''
			  ]
            }
          , { src: 'assets/Images/ID_28355_2.jpg', caption: 'Gym Facilities', 
              content: [
			       'Each campus has a fully equipped gym with cardio equipment and free weights. The sports pitches are available to hire and offer a range of fitness classes.'
			  ]
            }
        ]
    });

    app.addNumberedPin({
        x: 248
      , y: 528
      , title: 'Temporary Jetty'
      , slug:  '5'
      , tags:  ['Site Operations']
      , slides: [ // Videos 48756 & 42456 & 40531
            { src: 'assets/Images/ID_48756_2.jpg', caption: 'Temporary Jetty', 
              content: [
                  'The 500m long jetty at Hinkley Point C is fully operational.  Each delivery made via the jetty keeps around 300 lorry loads off the roads and it is expected to handle the equivalent of around 100,000 lorry loads over its life.'
              ]
            }
          , { src: 'assets/Images/ID_42456_1.jpg', caption: 'Temporary Jetty: Boat docking',
              content: [
                  'Much of the aggregate used in the site’s construction is sourced locally from Hanson’s Whatley Quarry near Frome in Somerset. From there it is transported by rail to Avonmouth before being shipped to Hinkley Point C.'
              ]
            }
          , { src: 'https://players.brightcove.net/4098359024001/default_default/index.html?videoId=6204689906001', caption: 'About the Temporary Jetty',
              content: [
			      'We have a a full time Harbour Master responsible for the safe operation of the jetty and the waters around it.'
			  ]
            }
        ]
    });

    app.addNumberedPin({
        x: 1750
      , y: 1950
      , title: 'North Office'
      , slug:  '6'
      , tags:  ['Site Operations']
      , slides: [
            { src: 'assets/Images/ID_41190_2.jpg', caption: 'Catering', 
              content: [
                  'Somerset Larder was established in 2014, bringing together the county’s finest food and drink producers – to act as one – to compete for Hinkley Point C‘s large catering contract. They won the contract, and now supply our workers with a range of great local food options.'
              ]
            }
		,	{ src: 'assets/Images/ID_31003_1.jpg', caption: 'Hinkley Health', 
              content: [
                  'Hinkley Health is our on-site medical facility. Hinkley Health is a nurse-led service with GP support. They can dispense medicine and treat many symptoms right away helping to keep our team fit and well.  In addition to this service we also have over 300 Mental Health Buddies. This is a community of volunteers changing the culture of the construction industry; tackling the stigma attached to mental health challenges and providing support and guidance to all.'
              ]
            }
		,	{ src: 'assets/Images/ID_24709_2.jpg', caption: 'Emergency Services - On-Site Fire Team', 
              content: [
                  'Serco provides fire and rescue services ensuring support is there in an emergency.'
              ]
            }
        ]
    });
	
	app.addNumberedPin({
        x: 2200
      , y: 3300
      , title: 'South Office'
      , slug:  '6'
      , tags:  ['Site Operations']
      , slides: [ // 31443 jpg & 49504 video & 30117 jpg 
            { src: 'assets/Images/ID_31443_2.jpg', caption: 'South office', 
              content: [
                  'South Office is primarily home to  our site operations team. They keep the entire site humming, their remit includes roads, buses, logistics, facilities, welfare and accommodation for team Hinkley Point C.'
              ]
            }
		,	{ src: 'https://players.brightcove.net/4098359024001/default_default/index.html?videoId=6204697575001', caption: 'Local Delivery Partners', 
              content: [
                  'The site operations team work closely with our local delivery partners like Somerset Passenger Solutions.'
              ]
            }
		,	{ src: 'assets/Images/ID_30117_2.jpg', caption: 'South office', 
              content: [
                  'Apprentice and skills hub is located in our south office. A place specifically designed for some of our 1000 apprentices to collaborate and recharge.'
              ]
            }
        ]
    });

    app.addLightbulbPin({
        x: 1282
      , y: 4042
      , title: 'Emergency Access Road'
      , slug:  'i'
      , tags:  ['Site Operations']
      , slides: [
            { src: 'assets/Images/i-image_1-718x404.jpg', caption: 'Emergency access road', 
              content: [
                  'The emergency access road will be available for emergency services if the main entrances to the site become inaccessible. It is a legal requirement for all new power stations to have two access roads.'
              ]
            }
        ]
    });

    //// Add the Lightbulb Pins. 


    app.addLightbulbPin({
        x: 504
      , y: 1584
      , title: 'Tree planting'
      , slug:  'e'
      , tags:  ['Archaeology &amp; the environment']
      , slides: [
            { src: 'assets/Images/ID_48321_2.jpg', caption: 'Cutting Carbon', 
              content: [
                  'As part of Hinkley Point C’s work to create habitats and public recreation space, the site has planted around 65,000 trees and shrubs. They will help to screen the site and attract more wildlife. Like all plants, trees take carbon dioxide from the air and release oxygen. They also help the soil capture significant amounts of carbon too.'
              ]
            }
        ]
    });

	/*
    app.addLightbulbPin({
        x: 966
      , y: 2128
      , title: 'Archaeology'
      , slug:  'f'
      , tags:  ['Archaeology &amp; the environment']
      , slides: [
            { src: 'assets/Images/f-image_1-718x404.jpg', caption: 'Archaeology', 
              content: [
                  'Early in the build we worked with Somerset Heritage Trust to unearth the history under the site.',
				  'Follow this link for more information.',
				  '<a href="https://archaeologyathinkleypoint.wordpress.com/about/the-project/" target="_blank">https://archaeologyathinkleypoint.wordpress.com/about/the-project/</a>'
              ]
            }
          , 

		  { src: 'assets/Images/f-image_2-718x404.jpg', caption: 'Summary of findings:', 
              content: [
                  'Everyday items including pottery, coins, and brooches, and fragments of imported pottery'
                , 'Remains of a sunken-floored building which may date to the sub-Roman period or Dark Ages'
              ]
            }
          , { src: 'assets/Images/f-image_3-718x404.png', caption: 1, 
              content: [
                  'Evidence of hunters and gatherers, from tiny worked flint tools called microliths, dating back 10,000 years'
                , 'Evidence people lived on and farmed the land during the Iron Age and Roman periods'
              ]
            }
          , { src: 'assets/Images/f-image_4-718x404.jpg', caption: 1, 
              content: [
                  'A number of flint tools dating from the Neolithic and Bronze Age periods'
                , 'Two parallel ditches dug from east to west, used to divide land in the Bronze Age'
              ]
            }
			
        ]
    });
	*/

    app.addLightbulbPin({
        x: 1480
      , y: 3084
      , title: 'Water Management'
      , slug:  'h'
      , tags:  ['Archaeology &amp; the environment']
      , slides: [
            { src: 'assets/Images/ID_48325_2.jpg', caption: 'Water Management', 
              content: [
                  'We have an environmental responsibility to manage water on our site. The Water Management Zones and our water treatment plant help us to protect the environment by ensuring water that is discharged from the site is clean.'
              ]
            }
        ]
    });


    app.addLightbulbPin({
        x: 3674
      , y: 1980
      , title: 'Archaeology' //Wick Barrow / Pixies Mound
      , slug:  'n'
      , tags:  ['Archaeology &amp; the environment']
      , slides: [ // The Folk-Lore of Wick Barrow video
			{ src: 'assets/Images/f-image_1-718x404.jpg', caption: 'Archaeology', 
              content: [
                  'Early in the build we worked with Somerset Heritage Trust to unearth the history under the site.',
				  'Follow this link for more information.',
				  '<a href="https://archaeologyathinkleypoint.wordpress.com/about/the-project/" target="_blank">https://archaeologyathinkleypoint.wordpress.com/about/the-project/</a>'
              ]
            }
          , 
            { src: 'https://players.brightcove.net/4098359024001/default_default/index.html?videoId=6204693671001', caption: 'The Folk Lore of Wick Barrow', 
              content: [
                  'Dated from about 6,000 years ago, Wick Barrow is a rare example of a Neolithic round barrow.  It measures  25 metres in diameter and 1.5 metres high. A barrow is the name given to a structure for burying the dead. It is located just to the south of Hinkley Point B, overlooking Wick Moor. It‘s also known as Pixie‘s Mound.'
              ]
            }
        ]
    });



    app.addLightbulbPin({
        x: 910
      , y: 2592
      , title: 'Biodiversity'
      , slug:  'r'
      , tags:  ['Archaeology &amp; the environment']
      , slides: [
            { src: 'assets/Images/r-image_4-718x404.jpg', caption: 'Wildlife Watch', 
              content: [
                  'Our site ecologist helps to monitor and manage our habitats and wildlife corridors on and around the construction site.  This includes surveys of bats, birds, moths, butterflies, great crested newts, badgers, otters and other reptile populations.',
				  'Follow this link for more information.',
				  '<a href="https://www.edfenergy.com/energy/nuclear-new-build-projects/hinkley-point-c/local-community/plugged-in/article/working-for-wildlife" target="_blank">https://www.edfenergy.com/energy/nuclear-new-build-projects/hinkley-point-c/local-community/plugged-in/article/working-for-wildlife/</a>'
			  ]	  
            }
          , { src: 'assets/Images/ID_24427_1.jpg', caption: 'Barbestelle bat', 
              content: [
                  'Barbastelle bats are extremely rare in Britain, but use Hinkley Point C to access wider foraging areas. So that the bat population can continue to migrate and forage, we have, as part of  our commitment to habitat connectivity, built bat crossings on the site’s wildlife corridor, Green Lane. In addition, a new foraging habitat has been established on the nearby East Quantoxhead Estate to support conservation of one of the UK’s last remaining colonies of the species.'
              ]
            }
          , { src: 'assets/Images/ID_19482_1.jpg', caption: 'Marine Management', 
              content: [
                  'The unique Red Corallina seaweed found along Hinkley Point C’s foreshore provides a habitat for a variety of marine life. As Corallina is very sensitive to drying out. The team have created artificial bunds which retain water at low tide, allowing it to filter over the seaweed until the tide turns. An exclusion zone also protects the Honeycomb worm colonies living nearby. This marine species uses sand to build tubes to live in, which when found in large colonies, creates a reef-like home for other marine wildlife.'
              ]
            }
          , { src: 'assets/Images/r-image_1-718x404.jpg', caption: 'Investing in the Quantocks', 
              content: [
                  'The Quantock Hills were England’s first-ever Area of Outstanding Natural Beauty. Thanks to funding from EDF and others, £2.6m is being invested in the Quantock Landscape Partnership Scheme.',
				  'Follow this link for more information.',
				  '<a href="https://www.edfenergy.com/energy/nuclear-new-build-projects/hinkley-point-c/local-community/plugged-in/article/working-for-wildlife" target="_blank">https://www.edfenergy.com/energy/nuclear-new-build-projects/hinkley-point-c/local-community/plugged-in/article/working-for-wildlife/</a>'
              ]
            }
        ]
    });

    app.addNumberedPin({
        x: 1480
      , y: 2450
      , title: 'Green Lane'
      , slug:  's'
      , tags:  ['Archaeology &amp; the environment']
      , slides: [ // img 28485
            { src: 'assets/Images/ID_28485_2.jpg', caption: '', 
              content: [
                  'Green Lane is a retained and enhanced habitat corridor which bisects the construction site and still records Barbastelles and Horeshoe bats, as well as retaining an active badger set. A lighting strategy is in place here and features to retain connectivity of Green Lane  to existing off-site habitats over the construction haul roads include landscape planting with moveable "tree tubs" and a bat gantry.'
              ]
            }
        ]
    });

// Off-Site Training Facilities
	
	app.addNumberedPin({
        x: 2900
      , y: 4500
      , title: 'National College for Nuclear'
      , slug:  '2'
      , tags:  ['Off-Site Training Facilities']
      , slides: [
            { src: 'assets/Images/ID_37973_1.jpg', caption: 'National College for Nuclear', 
              content: [
                  'Bridgwater & Taunton College is the principal delivery arm of the Southern Hub of the National College for Nuclear, based in Cannington, Somerset. It‘s a state-of-the-art nuclear training facility, including a virtual reality environment, a reactor simulator and computer-equipped training rooms; recreation and collaboration space; sports facilities and student accommodation.'
              ]
            },
			{ src: 'assets/Images/ID_51863_1.jpg', caption: '', 
              content: [
                  'The National College for Nuclear is a  Government  enabled partnership between industry, national regulators, skills bodies and training providers,  revolutionising the way that training for the nuclear sector is delivered.'
			  ]
			},
			{ src: 'assets/Images/ID_3201_1.jpg', caption: 'Apprentices', 
              content: [
                  'Apprentices in action inspiring local school children.'
			  ]
            }
        ]
    });
	
	app.addNumberedPin({
        x: 3100
      , y: 4500
      , title: 'The Welding Centre of Excellence'
      , slug:  '2'
      , tags:  ['Off-Site Training Facilities']
      , slides: [
            { src: 'assets/Images/ID_51350_1.jpg', caption: 'The Welding Centre of Excellence', 
              content: [
                  'The Welding Centre of Excellence, which is part of the South West Institute of Technology, houses brand new facilities for technical welding, training and skills development, including welding in a nuclear environment. '
              ]
            },
			{ src: 'assets/Images/ID_35773_2.jpg', caption: 'Welding underway at Hinkley Point C 35773', 
              content: [
                  'The centre is a collaboration between EDF, the Heart of the South West Local Enterprise Partnership, Weldability Sif Foundation and Bridgwater & Taunton College. The centre will help to supply high quality welders to the region and Hinkley Point C.'
			  ]
            }
        ]
    });
	
	app.addNumberedPin({
        x: 3300
      , y: 4500
      , title: 'The Construction Skills &amp; Innovation Centre'
      , slug:  '2'
      , tags:  ['Off-Site Training Facilities']
      , slides: [
            { src: 'assets/Images/ID_51351_2.jpg', caption: 'The Construction Skills & Innovation Centre', 
              content: [
                  'The EDF funded Construction Skills and Innovation Centre was built in partnership with  Bridgwater & Taunton College and EDF. It‘s a unique  training facility in Cannington, close to Hinkley Point C.'
              ]
            },
			{ src: 'assets/Images/ID_51979_1.jpg', caption: 'Apprentices at the Construction Skills and Innovation Centre using a Theodolite', 
              content: [
                  'The centre replicates a real-life construction site, with construction vehicles, machinery and equipment in operation. Construction site safety behaviours and standards are learnt alongside specific technical knowledge and skills including excavation, groundworks, concrete pouring, steel fixing, formwork, water utilities and lifting disciplines.'
			  ]
            }
        ]
    });

    //// Add the Hidden Pins. 
	
    app.addHiddenPin({
        x: 111
      , y: 650
      , title: 'The Next Generation'
      , slug:  'xtra-1'
      , isXtra: true
      , tags:  []
      , slides: [ //Videos 19975 & 25526 & 45656 & 24632
            { src: 'https://players.brightcove.net/4098359024001/default_default/index.html?videoId=6204688943001', caption: 'Inspire Education Programme', 
              content: [
                  'Inspire is Hinkley Point C’s education programme in Somerset and the wider South West region. We offer a range of free and innovative activities, including hands-on workshops, curriculum-linked teaching resources, assemblies and events for Key Stage 2, 3 and 4 – to help young people take advantage of the huge opportunities that the construction and operation of Hinkley Point C has to offer.'
				, 'Follow this link for more information.',
				  '<a href="https://www.edfenergy.com/energy/nuclear-new-build-projects/hinkley-point-c/for-teachers-students-and-educators/inspire" target="_blank">https://www.edfenergy.com/energy/nuclear-new-build-projects/hinkley-point-c/for-teachers-students-and-educators/inspire</a>'
              ]
            }
		  , { src: 'https://players.brightcove.net/4098359024001/default_default/index.html?videoId=6204687892001', caption: 'Young HPC', 
              content: [
                  'If you are aged between 16 and 21, Young HPC has been designed to give you support, guidance and resources to help you take steps towards your dream career.'
				, 'Follow this link for more information.',
				  '<a href="https://www.edfenergy.com/energy/nuclear-new-build-projects/hinkley-point-c/for-teachers-students-and-educators/young-hpc" target="_blank">https://www.edfenergy.com/energy/nuclear-new-build-projects/hinkley-point-c/for-teachers-students-and-educators/young-hpc</a>'
              ]
            }
		  , { src: 'assets/Images/ID_45656_2.jpg', caption: 'Apprenticeships',
              content: [
				  'At Hinkley Point C, our aspiration is to create 1,000 apprenticeships over the course of construction. The wide range of skills required to build the power station means there really is opportunity for everyone.'
				, 'Follow this link for more information.',
				  '<a href="https://www.edfenergy.com/energy/nuclear-new-build-projects/hinkley-point-c/jobs-and-training/apprenticeships" target="_blank">https://www.edfenergy.com/energy/nuclear-new-build-projects/hinkley-point-c/jobs-and-training/apprenticeships</a>'
			  ]
            }
		  , { src: 'assets/Images/ID_24632_2.jpg', caption: 'HPC Job Service',
              content: [
				  'The construction and operation of Hinkley Point C will create thousands of employment and apprenticeship opportunities in a broad range of occupations and careers.'
				, 'Follow this link for more information.',
				  '<a href="https://www.edfenergy.com/energy/nuclear-new-build-projects/hinkley-point-c/jobs-and-training" target="_blank">https://www.edfenergy.com/energy/nuclear-new-build-projects/hinkley-point-c/jobs-and-training</a>'
			  ]
            }
        ]
    });

    app.addHiddenPin({
        x: 222
      , y: 650
      , title: 'Working Together to Deliver Hinkley Point C'
      , slug:  'xtra-2'
      , isXtra: true
      , tags:  []
      , slides: [ // 45990 video & 45988 video
            { src: 'https://players.brightcove.net/4098359024001/default_default/index.html?videoId=6204693275001', caption: 'Realising the socio-economic benefits', 
              content: [
                  'Hinkley Point C is working hard to ensure the project benefits people and businesses across the UK. The benefits range from increasing employment, to the development of a sustainable national supply chain and the advancement of new training facilities and qualifications.'
				, 'Follow this link for more information.',
				  '<a href="https://www.edfenergy.com/energy/nuclear-new-build-projects/hinkley-point-c/about/realising-socio-economic-benefits" target="_blank">https://www.edfenergy.com/energy/nuclear-new-build-projects/hinkley-point-c/about/realising-socio-economic-benefits</a>'
              ]
            }
		  , { src: 'https://players.brightcove.net/4098359024001/default_default/index.html?videoId=6204695354001', caption: 'Built in Britain', 
              content: [
                  '64% of the construction cost of Hinkley Point C will be spent with UK companies.'
				, 'Follow this link for more information.',
				  '<a href="https://www.edfenergy.com/energy/nuclear-new-build-projects/hinkley-point-c/for-suppliers-and-local-businesses/built-in-britain" target="_blank">https://www.edfenergy.com/energy/nuclear-new-build-projects/hinkley-point-c/for-suppliers-and-local-businesses/built-in-britain</a>'
              ]
            }
        ]
    });

    app.addHiddenPin({
        x: 333
      , y: 650
      , title: 'Hinkley Point C in the Local Community'
      , slug:  'xtra-3'
      , isXtra: true
      , tags:  []
      , slides: [
            { src: 'assets/Images/ID_51302_1.png', caption: 'EDF Visitor Centre', 
              content: [
                  'A new visitor centre at Cannington Court will showcase Hinkley Point B, which has been generating since 1976, and Hinkley Point C, which will be generating low carbon electricity for over 60 years.'
				, 'Follow this link for more information.',
				  '<a href="https://www.edfenergy.com/energy/education/visitor-centres/hinkley-point-visitor-centre" target="_blank">https://www.edfenergy.com/energy/education/visitor-centres/hinkley-point-visitor-centre</a>'
              ]
            }
		  ,	{ src: 'assets/Images/ID_9837_1.jpg', caption: 'HPC Community Fund', 
              content: [
                  'As part of the development of Hinkley Point C, we have committed £20 million of community funding to improve the social, economic and environmental wellbeing of communities that are affected by the construction of our new nuclear power station. Our community funds have already delivered £12 million of investment into local projects. From a new play area and a village hall in Stogursey, to a new cycle path in Brean; museum restorations in Watchet and an Education Business Partnership for Somerset, to name but a few.'
				, 'Follow this link for more information.',
				  '<a href="https://www.edfenergy.com/energy/nuclear-new-build-projects/hinkley-point-c/local-community/being-part-of-the-community/community-fund" target="_blank">https://www.edfenergy.com/energy/nuclear-new-build-projects/hinkley-point-c/local-community/being-part-of-the-community/community-fund</a>'
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