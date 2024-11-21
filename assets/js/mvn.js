gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;
let rafId = null;

function lenisScroll() {
  if (window.innerWidth > 1024) {
    $("body").css("overflow", "hidden");
    if (!lenisInstance) {
      lenisInstance = new Lenis({
        duration: 1,
        easing: (t) => Math.min(1, 1.008 - Math.pow(2, -5 * t)), // Easing for smoothness
        smoothWheel: true, // Enable smooth wheel scrolling
        smoothTouch: true, // Enable smooth touch scrolling (for mobile/tablet)
      });

      function raf(time) {
        lenisInstance.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    }
  } else if (lenisInstance) {
    $("body").css("overflow", "hidden");
    lenisInstance.destroy();
    lenisInstance = null;
    cancelAnimationFrame(rafId);
  }
}
lenisScroll();

// form validation
$(document).ready(function () {

  $("#contactFormFooter").validate({
    highlight: function (element) {
      $(element).addClass("border-red-500"); // Add red border on error
    },
    unhighlight: function (element) {
      $(element).removeClass("border-red-500").addClass("border-gray-300"); // Remove red border when valid
    },
    rules: {
      name: {
        required: true,
        minlength: 3,
      },
      phone: {
        required: true,
        digits: true,
        minlength: 10,
      },
      email: {
        required: true,
        email: true,
      },
    },
    messages: {
      name: {
        required: "Required",
        minlength: "At least 3 characters",
      },
      phone: {
        required: "Required",
        digits: "Use only digits",
        minlength: "Must be at least 10 digits",
      },
      email: {
        required: "Required",
        email: "Enter valid email",
      },
    },
    submitHandler: function (form, event) {
      event.preventDefault(); // Prevent form from reloading the page
      $.ajax({
        url: "submitForm.php",
        type: "POST",
        data: {
          name: $("#footer_name").val(),
          email: $("#footer_email").val(),
          phone: $("#footer_phone").val(),
        },
        success: function (response) {
          console.log(response);
          $("#formResponse").html(
            '<p class="bg-yellow text-green py-3 px-4 mt-3 rounded-full text-center">Message sent successfully!</p>'
          );
          $("#contactFormFooter")[0].reset();
          $(".popup-overlay").css("display", "flex");
          $(".close-btn").click(function () {
            $(".popup-overlay").css("display", "none");
          });
        },
        error: function (error) {
          $("#formResponse").html(
            '<p class="text-red-500">Error sending message. Please try again.</p>'
          );
        },
      });
    },
  });
  
  $("#popupForm").validate({
    highlight: function (element) {
      console.log($(element));
      $(element).addClass("border-red-500"); // Add red border on error
    },
    unhighlight: function (element) {
      $(element).removeClass("border-red-500").addClass("border-gray-300"); // Remove red border when valid
    },
    rules: {
      name: {
        required: true,
        minlength: 3,
      },
      phone: {
        required: true,
        digits: true,
        minlength: 10,
      },
      email: {
        required: true,
        email: true,
      },
    },
    messages: {
      name: {
        required: "Required",
        minlength: "At least 3 characters",
      },
      phone: {
        required: "Required",
        digits: "Use only digits",
        minlength: "Must be at least 10 digits",
      },
      email: {
        required: "Required",
        email: "Enter valid email",
      },
    },
    submitHandler: function (form, event) {
      event.preventDefault(); // Prevent form from reloading the page
      $.ajax({
        url: "submitForm.php", // Properly referencing ajax_object.ajax_url
        type: "POST",
        data: {
          name: $("#name").val(),
          email: $("#email").val(),
          phone: $("#phone").val(),
         
        },
        success: function (response) {
          $('#popupForm').hide()
          console.log(response)
          $("#formResponse").html(
            '<p class="bg-yellow text-green py-3 px-4 mt-3 rounded-full text-center">Message sent successfully!</p>'
          );
          $("#popupForm")[0].reset();
          $(".popup-overlay").css("display","flex");
          $('.close-btn').click(function(){
            $(".popup-overlay").css("display","none");

          })
        },
        error: function (error) {
          $("#formResponse").html(
            '<p class="text-red-500">Error sending message. Please try again.</p>'
          );
        },
      });
    },
  });
});

document.addEventListener("DOMContentLoaded", () => {
  new Swiper(".mySwiper", {
    direction: "vertical",
    slidesPerView: 1,
    spaceBetween: 0,
    mousewheel: false,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    on: {
      // Pause Lenis when interacting with Swiper
      // slideChangeTransitionStart: () => lenisInstance.stop(),
      // slideChangeTransitionEnd: () => lenisInstance.start(),
    },
  });
});

$(document).ready(function(){
  $('#popupForm').hide()
  $('#formTrigger').click(function(){
    $('#popupForm').show()
  });
  $('#popup-close-btn').click(function(){
    $('#popupForm').hide()
  });

});



