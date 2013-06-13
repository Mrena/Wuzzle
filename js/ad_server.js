
var AdServer = (function AdServer(){
    
   var images_urls = ['http://imp.tradedoubler.com/imp?type(img)g(21200656)a(2277110)',
                      'http://imp.tradedoubler.com/imp?type(img)g(21118256)a(2277110)',
                      'http://imp.tradedoubler.com/imp?type(img)g(21196644)a(2277110)',
                      'http://imp.tradedoubler.com/imp?type(img)g(20000308)a(2277110)'
                    ],
        images_links = ['http://clk.tradedoubler.com/click?p=217815&a=2277110&g=21200656',
                        'http://clk.tradedoubler.com/click?p=216274&a=2277110&g=21118256',
                        'http://clk.tradedoubler.com/click?p=234341&a=2277110&g=21196644',
                        'http://clk.tradedoubler.com/click?p=212499&a=2277110&g=20000308'
                       ],
        js_urls = [                   
                   'http://clk.tradedoubler.com/click?p=214704&a=2277110&g=20155758'
                  ],
        js_images = ['http://vht.tradedoubler.com/file/214704/468x60_DayToDay.jpg'],      
     
           init = function(){
               
             var rand_number = Math.floor(Math.random()*images_urls.length);
             var url = images_urls[rand_number];
                url = url + new String(Math.random()).substring (2, 11);
                $(".ad_area").html(["<a href='",images_links[rand_number],"' target='_BLANK'><img src='",url,"' border=0></a>"].join(''));
                 
            }, 
         iterateImagesAds = function(){
       
            var rand_number = Math.floor(Math.random()*images_urls.length);
            var url = images_urls[rand_number];
                url = url + new String(Math.random()).substring (2, 11);
                $(".ad_area").html(["<a href='",images_links[rand_number],"' target='_BLANK'><img src='",url,"' border=0></a>"].join(''));
                 
           },  
        iterateJSAds = function(){
    
            var rand_number = Math.floor(Math.random()*js_urls.length);
            var url = js_urls[rand_number];
                url = url + new String(Math.random()).substring (2, 11);
                $(".ad_area").html(["<a href='",url,"' target='_BLANK'><img src='",js_images[rand_number],"' border=0></a>"].join(''));
                
        },           
      iterateAds = function(interval){
          
            setInterval(function(){
                iterateImagesAds();
                },interval);
                
          
          var js_interval = parseInt(interval+(interval*0.5));
              setInterval(function(){
                iterateJSAds();
             },js_interval);
          
        };      
           
       return {
           iterateAds : iterateAds,
                 init : init
       };
    
})();

