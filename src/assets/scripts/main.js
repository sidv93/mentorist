$(document).ready(function(){
$('.owl-carousel.role-carousel').owlCarousel({
    loop:true,
    margin:20,
    navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:1,
            nav:true
        },
        1000:{
            items:1,
            nav:true,
            loop:true
        }
    }
})

$('.input-focus-animation input').focus(function(){
    $(this).parent().addClass('active');
});
$('.input-focus-animation input').blur(function(){
    if($(this).val()==0){
    $(this).parent().removeClass('active');
    }
});
});
$(document).ready(function(){
    updateScroll();
  $(".chat-input").keyup(function(){
         if($(".chat-input").val() == ''){
      $(".send").removeClass("active");
    }
    else{
      $(".send").addClass("active");
  
    }
    });
    $(".chat-input").keydown(function(e){
      if(e.keyCode == 13){
        send();
      }
  });
  
    // These Code Will Mostly Be Removed During Deployment

    $(".chat-box-section .chat-input-wrapper .send").click(function(){
      send();
    });

    function send(){
      var chatContent = $(".chat-input").val();
    $(".chat-input").val("");
    $(".chat-box").append('<div class="row no-gutters"><div class="col-md-6 ml-md-auto sent"><img src="assets/images/user.jpeg" width="45" class="rounded-circle"><p class="sent-txt">'+chatContent+'</p></div></div>'); 
    $(".received.typing-indicator").removeClass("typing");
    $(".send").removeClass("active");
    updateScroll();
    }

    function updateScroll(){
      $('.chat-box').scrollTop($('.chat-box')[0].scrollHeight);
  }

//   // Add scrollspy to <body>
//     $('body').scrollspy({target: "body"});   
    
//     // Add smooth scrolling on all links inside the navbar
//     $("#home-nav a").on('click', function(event) {
  
//       // Prevent default anchor click behavior
//       event.preventDefault();
  
//       // Store hash
//       var hash = this.hash;
  
//       // Using jQuery's animate() method to add smooth page scroll
//       // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
//       $('html, body').animate({
//         scrollTop: $(hash).offset().top
//       }, 1000, function(){
     
//         // Add hash (#) to URL when done scrolling (default click behavior)
//         window.location.hash = hash;
//       });
//     });

  });