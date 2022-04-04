jQuery.noConflict();

(function($) {
   // Art Deco - slick slider
   $('.art-deco-slick-slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      autoplay: false,
      arrows: true,
      autoplaySpeed: 4000
   });


   // indoor spaces - slick slider
   $('.indoor-spaces-slick-slider, .outdoor-spaces-slick-slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      autoplay: false,
      arrows: true,
      dots: true,
      autoplaySpeed: 4000
   });

   // indoor
   $('.indoor-spaces-slick-slider .slick-arrow').click(function() {
      var pos = $('.indoor-spaces-slick-slider .slick-dots li.slick-active').index();

      $('.indoor_bullet_controller div').removeClass('active');
      $('.indoor_bullet_controller div:nth-child('+(pos+1)+')').addClass('active');
   });

   $('.indoor_bullet_controller div').click(function() {
      $('.indoor_bullet_controller div').removeClass('active');
      $(this).addClass('active');

      var bullet_controller_pos = $(this).index();
      $('.indoor-spaces-slick-slider .slick-dots li:nth-child('+(bullet_controller_pos+1)+') button').click();
   });

   // outdoor
   $('.outdoor-spaces-slick-slider .slick-arrow').click(function() {
      var pos = $('.outdoor-spaces-slick-slider .slick-dots li.slick-active').index();

      $('.outdoor_bullet_controller div').removeClass('active');
      $('.outdoor_bullet_controller div:nth-child('+(pos+1)+')').addClass('active');
   });

   $('.outdoor_bullet_controller div').click(function() {
      $('.outdoor_bullet_controller div').removeClass('active');
      $(this).addClass('active');

      var bullet_controller_pos = $(this).index();
      $('.outdoor-spaces-slick-slider .slick-dots li:nth-child('+(bullet_controller_pos+1)+') button').click();
   });

})(jQuery);


/*========== GSAP CODE STARt ===========*/

// Zoom Image - Rare Location
ScrollTrigger.matchMedia({
  // desktop
  "(min-width: 800px)": function zoomImg() {
    gsap.to('.zoom_img', {
      duration: 1000,
      scale: 2,
      scrollTrigger: {
        trigger: '#sec_zoom',
        pin: '.zoom_img',
        start: '60% 50%',
        markers: true,
        scrub: 2
      }
    });
  },

  // mobile
  "(max-width: 799px)": function() {
    gsap.to('.zoom_img', {
      duration: 100,
      scale: 2,
      scrollTrigger: {
        trigger: '#sec_zoom',
        start: '-60% 50%',
        end: '20% 0%',
        // markers: true,
        scrub: 2
      }
    });
  }
});


// Move Image Left To Right - View That Stay
gsap.to('.building_move_lr', {
  duration: 500,
  xPercent: 100,
  scrollTrigger: {
    trigger: '.building_wrapper',
    end: '20% 0%',
    // markers: true,
    scrub: 1
  }
});


// Move Element - A Towring Vision
// (NOTE: both code working well)
// let fadein = gsap.utils.toArray('.fade-in')
// fadein.forEach((item, index) => {

//   let tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: item,
//       start: '-60% center',
//       end: '20% 0%',
//       scrub: 1,
//       // markers: true
//     }
//   });

//   tl.to(item, {
//     opacity: 1,
//     x: -20,
//     duration: 5,
//   });
// });

ScrollTrigger.matchMedia({
  // desktop
  "(min-width: 800px)": function zoomImg() {
    const fadein = gsap.utils.toArray('.fade-in');
    fadein.forEach(ele => {
      gsap.to(ele, {
        duration: 5,
        opacity: 1,
        x: -20,
        scrollTrigger: {
          trigger: ele,
          start: '-80% center',
          end: '20% 0%',
          scrub: 1
        }
      })
    });
  },

  // mobile
  "(max-width: 799px)": function() {
    const fadein = gsap.utils.toArray('.fade-in');
    fadein.forEach(ele => {
      gsap.to(ele, {
        duration: 2,
        opacity: 1,
        x: -30,
        scrollTrigger: {
          trigger: ele,
          start: '-220% 90%',
          end: '80% 0%',
          scrub: 1
        }
      })
    });
  }
});


// Club Palacio - Swimming Image Sequence
const swimming_canvas = document.getElementById("swimming_sequence");
const swimming_context = swimming_canvas.getContext("2d");

swimming_canvas.width = 640;
swimming_canvas.height = 360;

const swimming_frameCount = 76;
const swimming_currentFrame = index => (
  `./images/swimming/${(index + 1).toString()}.jpg`
);

const swimming_images = []
const swimming = {
  frame: 0
};

for (let i = 0; i < swimming_frameCount; i++) {
  const swimming_img = new Image();
  swimming_img.src = swimming_currentFrame(i);
  swimming_images.push(swimming_img);
}

ScrollTrigger.matchMedia({
  // desktop
  "(min-width: 800px)": function zoomImg() {
    gsap.to(swimming, {
      frame: swimming_frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: "#swimming_wrapper",
        pin: swimming_canvas,
        // markers: true,
        scrub: 1
      },
      onUpdate: swimming_render // use animation onUpdate instead of scrollTrigger's onUpdate
    });
  },

  // mobile
  "(max-width: 799px)": function() {
    gsap.to(swimming, {
      frame: swimming_frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: "#swimming_wrapper",
        // pin: swimming_canvas,
        start: '10% 50%',
        end: 'bottom 40%',
        // markers: true,
        scrub: 1
      },
      onUpdate: swimming_render // use animation onUpdate instead of scrollTrigger's onUpdate
    });
  }
});

swimming_images[0].onload = swimming_render;

function swimming_render() {
  swimming_context.clearRect(0, 0, swimming_canvas.width, swimming_canvas.height);
  swimming_context.drawImage(swimming_images[swimming.frame], 0, 0, swimming_canvas.width, swimming_canvas.height); 
}


// club palacio TEXT stick on scroll
ScrollTrigger.matchMedia({
  // desktop
  "(min-width: 800px)": function zoomImg() {
    gsap.to('.swimming_desc_abs', {
      scrollTrigger: {
        trigger: '#swimming_sequence',
        pin: '.swimming_desc_abs',
        // markers: true,
        scrub: 4
      }
    });
  },

  // mobile
  "(max-width: 799px)": function() {
    gsap.to('.swimming_desc_abs', {
      scrollTrigger: {
        trigger: '#swimming_sequence',
        // pin: '.swimming_desc_abs',
        // markers: true,
        scrub: 4
      }
    });
  }
});
