$(function() {
  $('a[href*="#"]').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var that = $(this);
      var target = $(this.hash);
      var header = $(".main-header").hasClass("fixed") ? $(".main-header").height() : 0;

      if (target.length) {
        if (!$(this).parents(".main-header").hasClass("fixed")) {
          header *= 2;
        }
        else {
          header = $(".main-header").height();
        }

        $('html, body').stop().animate({
          scrollTop: target.offset().top - header
        }, 500, function(){
          window.location.hash = that.attr("href");
        });
        return false;
      }
    }
  });
});