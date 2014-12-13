

/* is mobile */
var isMobile = jQuery.browser.mobile;

/* IE sucks */
var ieSucks = $('body').hasClass('ie-sucks');

/* scroll to anchor */
$("nav a").click(function(e) {
  e.preventDefault();
  anchorScroll( $(this), $($(this).attr("href")), 700 );
});

$("#top .more").click(function(e) {
  e.preventDefault();
  anchorScroll( $('#top'), $($(this).attr("href")), 700 );
});

 
function anchorScroll(from, to, base_speed) {
  var from_offset = from.offset();
  var to_offset = to.offset();
  var offset_diff = Math.abs(to_offset.top - from_offset.top);
 
  var speed       = (offset_diff * base_speed) / 1000;

 
  $("html,body").animate({
    scrollTop: to_offset.top + (window.innerWidth <= 900 ? 1 : - 49)
  }, speed);
}


/* Navigation */
$('nav a').on('click', function() {
  $('#show-menu').prop('checked', false);
});


/* About */
$('#ipad').css('overflow', 'hidden');
var about = {
  current: 1,
  images: $('#ipad img').length,
  autoScroll: true,
  speed: 3500
}
about.next = function() {
  $('#ipad div').css('marginLeft', '-' + (115 * about.current) + 'px');
  about.current = (about.current + 1 < about.images)
                ? about.current + 1
                : 0;
  if (about.autoScroll) {
    setTimeout(function(){
      if (about.autoScroll) {
        about.next();
      }
    }, about.speed);
    
  }
}

$('#me').on('click', function(){
  about.autoScroll = false;
  about.next();
});


var aboutStarted = false;
$('#me').bind('inview', function(e, isVisible){
  if (isVisible && !aboutStarted) {

    aboutStarted = true;
    setTimeout(function(){
      if (about.autoScroll) {
        about.next();
      }
    }, about.speed);
  }
});



/* Languages */
$('#languages').bind('inview', function(e, isVisible){
  if (isVisible) {
    $(this).addClass('animate');
  }
});


/* scroll to next section */
// $('#scroll').onepage_scroll({
//   sectionContainer: '.page',
//   topPos: '60px'
// });


/* Work */
if (!isMobile && !ieSucks) {
  $('#work .box').addClass('animate');
  $('#work .box').each(function(){
    $(this).bind('inview', function(e, isVisible){
      if (isVisible) {
        $(this).removeClass('animate');
      }
    });
  });
}

/* Education */
if (!isMobile && !ieSucks) {
  $('#education .box').addClass('animate');
  $('#education .box').each(function(){
    $(this).bind('inview', function(e, isVisible){
      if (isVisible) {
        $(this).removeClass('animate');
      }
    });
  });
}

/* Apps */
if (!isMobile && !ieSucks) {
  var mobile = $('#apps .mobile');
  mobile.addClass('animate');
  mobile.bind('inview', function(e, isVisible){
    if (isVisible && mobile.hasClass('animate')) {
      mobile.removeClass('animate');
      $('.worldcapp .mobile').mobileSlideshow();
    }
  });
}
$('#apps .select-app li').on('click', function(){
  $('#apps .select-app .active').removeClass('active');
  var select = $(this);
  var active = select.attr('class');
  select.addClass('active');

  $('#apps .apps .active').removeClass('active');
  $('#apps .' + active).addClass('active');

  var mobile = $('#apps .' + active + ' .mobile');
  if (!mobile.hasClass('slideshow')) {
    mobile.mobileSlideshow();
  }

})

/* slideshow */
$('#hobbies').bind('inview', function(e, isVisible){
  if (isVisible) {
    $('#hobbies .pic div').each(function(index, container){
      container = $(container);
      if (!container.hasClass('slideshow')) {
        var pictures = container.data('pics');
        var path = container.data('path');
        
        pictures = pictures.split(',');
        for (var i = 0, length = pictures.length; i < length; i++) {
          container.append('<img src="' + path + pictures[i] + '" class="' + (i == 0 ? 'next' : 'hide') + '">');
        };
        container
          .addClass('slideshow')
          .find('img')
            .on('click', function(){
              var current = $(this);

              if (current.hasClass('current')) {
                current.addClass('hide');
                var next = container.find('.next');

                setTimeout(function(){
                  current.removeClass('current');
                  next.addClass('current').removeClass('next');
                  
                  next = next.next();

                  if (next.length == 0) {
                    next = container.find('img:first-child');
                  }
                  
                  next.removeClass('hide').addClass('next');
                }, 500);
              }
              
            })
        container.find('img:first-child').addClass('current');

        
        setTimeout(function(){
          setInterval(function(){hobbyClick(container)}, 4000);
        }, (1400 * index));
      }
    });

    
  }
});


function hobbyClick(target) {
  target.find('.current').click();
}

$('#apps .screen').on('click', function() {
  $(this).find('li:first').css('marginTop', '-295px');
});


jQuery(document).ready(function ($) {
//     var options = {
//       $AutoPlay: false,
//       $ArrowKeyNavigation: true,
//       // $SlideHeight: '100%'
//     };
//     var jssor_slider1 = new $JssorSlider$('test', options);
//     function ScaleSlider() {
//       var parentWidth = $('#test').parent().width();
//       if (parentWidth) {
//         jssor_slider1.$SetScaleWidth(parentWidth);
//       }
//       else
//         window.setTimeout(ScaleSlider, 30);
//     }
//     //Scale slider after document ready
//     ScaleSlider();
//     if (!navigator.userAgent.match(/(iPhone|iPod|iPad|BlackBerry|IEMobile)/)) {
//       //Capture window resize event
//       $(window).bind('resize', ScaleSlider);
//     }
});


(function($){

  $.fn.mobileSlideshow = function(options) {

    return this.each(function(options) {
      mobile = $(this).addClass('slideshow');
      var ul    = mobile.find('ul'),
          num   = mobile.find('li').length,
          pos   = 0,
          width = parseInt(mobile.find('img').css('width')) + 1;

      var defaults = {
        pause: 2000,
        autorun: true,
        speed: 3500,
      }

      options = $.extend(defaults, options);

      mobile
        .find('>div')
        .css('overflow', 'hidden');


      ul.css('width', num * width + 'px');

      var next = function() {
        
        ul.animate({
          left: (pos * width * -1) + 'px'
        }, 300);

        pos++;

        if (pos == num) {
          pos = 0;
        }

        if (options.autorun) {
          setTimeout(function(){
            next();
          }, options.speed);
        }
      }

      
      next();

    });
  }

})(jQuery);


/*
var slideshow = $('#apps .mobile');
slideshow.pos = 0;
slideshow.num = slideshow.find('li').length;
slideshow.pause = false;
slideshow.find('>div')
  .css('overflow', 'hidden');

slideshow.move = function() {
  var ul = this.find('ul');
  ul.animate({
    left: (this.pos * -341) + 'px'
  }, 300);
}
slideshow.play = function() {
  setTimeout(function(){
    if (!slideshow.pause) {
      slideshow.next();
      slideshow.play();
    }
  }, 5500);
}
slideshow.prev = function() {
  this.pause = true;
  if (--this.pos == -1) {
    this.pos = this.num -1;
  }
  this.move();
}
slideshow.next = function(pause) {
  if (pause) {
    this.pause = true;
  }
  if (++this.pos  == this.num) {
    this.pos = 0;
  }
  this.move();
}

// slideshow.play();

slideshow.find('.prev').on('click', function(){
  slideshow.prev();
  slideshow.find('.play').addClass('pause');
});
slideshow.find('.next').on('click', function(){
  slideshow.next(true);
  slideshow.find('.play').addClass('pause');
});
slideshow.find('.play').on('click', function(){
  var play = $(this);
  play.toggleClass('pause');
  slideshow.pause = play.hasClass('pause');

  if (!slideshow.pause) {
    slideshow.next();
    slideshow.play();
  }
  
});




/* Travelling map */
// var map;
//               AmCharts.ready(function() {
//                   map                  = new AmCharts.AmMap();
//                   map.pathToImages     = "http://www.amcharts.com/lib/3/images/";
//                   map.panEventsEnabled = true;
//                   map.backgroundColor  = "#2F3640";
//                   map.backgroundAlpha  = 1;

//                   map.zoomControl.panControlEnabled  = true;
//                   map.zoomControl.zoomControlEnabled = true;

//                   var dataProvider     = {
//                       mapVar          : AmCharts.maps.worldHigh,
//                       getAreasFromMap : true,
//                       areas           : [
//   { id: 'AT', showAsSelected: true },
//   { id: 'BE', showAsSelected: true },
//   { id: 'HR', showAsSelected: true },
//   { id: 'CZ', showAsSelected: true },
//   { id: 'DK', showAsSelected: true },
//   { id: 'FR', showAsSelected: true },
//   { id: 'DE', showAsSelected: true },
//   { id: 'GI', showAsSelected: true },
//   { id: 'GR', showAsSelected: true },
//   { id: 'HU', showAsSelected: true },
//   { id: 'IE', showAsSelected: true },
//   { id: 'IT', showAsSelected: true },
//   { id: 'MC', showAsSelected: true },
//   { id: 'ME', showAsSelected: true },
//   { id: 'NL', showAsSelected: true },
//   { id: 'NO', showAsSelected: true },
//   { id: 'PT', showAsSelected: true },
//   { id: 'SK', showAsSelected: true },
//   { id: 'ES', showAsSelected: true },
//   { id: 'SE', showAsSelected: true },
//   { id: 'CH', showAsSelected: true },
//   { id: 'TR', showAsSelected: true },
//   { id: 'GB', showAsSelected: true },
//   { id: 'VA', showAsSelected: true },
//   { id: 'US', showAsSelected: true },
//   { id: 'EG', showAsSelected: true },
//   { id: 'TN', showAsSelected: true }
//                       ]
//                   };

//                   map.dataProvider     = dataProvider;

//                   map.areasSettings    = {
//                       autoZoom             : true,
//                       color                : "#EEEEEE",
//                       colorSolid           : "#5EB7DE",
//                       selectedColor        : "#5EB7DE",
//                       outlineColor         : "#666666",
//                       rollOverColor        : "#DDDDDD",
//                       rollOverOutlineColor : "#FFFFFF"
//                   };

//                   map.write("mapdiv");
//               });









(function($){
  $.fn.slideshow2 = function(options) {
    var defaults = {
      speed: 1000,
      pause: 2000,
      transition: 'fade'
    },

    options = $.extend(defaults, options);

    this.each(function(){

      var $this = $(this);

      $this.wrap('<div class="slider-wrap" />');

      $this.css({
        'width': '99999px',
        'position': 'relative',
        'padding': 0
      });

      if (options.transition === 'slide') {
        $('ul').children().css({
          'float': 'left',
          'list-style': 'none'
        })

        $('.slider-wrap').css({
          'width': $this.children().width(),
          'overflow': 'hidden'
        })
      }

      if (options.transition === 'fade') {
        $('ul').children().css({
          'width': $this.children().width(),
          'position': 'absolute',
          'left': 0,
          'list-style': 'none'
        })

        for (var i =  $this.children().length - 1, y = 0; i >= 0; i--, y--) {
          $this.children().eq(y).css('zIndex', i + 99999);
        }

        fade();

      }

      function fade() {
        setInterval(function() {
          $this.children(':first').animate({'opacity': 0}, options.speed, function(){
            $this
              .children(':first')
              .css('opacity', 1)
              .css('zIndex', $this.children(':last').css('zIndex') - 1)
              .appendTo($this)
          })
        }, options.pause)
      }

    });
  }
})(jQuery);





// Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-259739-9']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();