jQuery(function($) {
  question("Convert highlightSeats into a jQuery plugin and use it in the change callback");
  
  // ===============
  // = initial code =
  // ===============
  /*
    $.fn.highlightSeats = function(seat_selector, options){
      $.each(this, function(index, highlight){
        highlight = $(highlight);

        if (highlight.is(":checked")){
          $(seat_selector).each(function(index, seat){
            var features = $(seat).data('features');
            if (features && features.indexOf(highlight.attr('name')) != -1){
              $(seat).addClass(highlight.val());
              $(seat).css({opacity: options.initialOpacity}).animate({opacity: options.targetOpacity})
            }
          })
        }else{
          $(seat_selector).removeClass(highlight.val())
        }
      });
    }

    $('#highlights input').change(function(e){
      $(this).highlightSeats('.seating-chart a.available', {
        initialOpacity: 0.3,
        targetOpacity: 0.9
      });
    });
  */

  // =============
  // = resources =
  // =============
  
  // ==========
  // = answer =
  // ==========
  
  $.fn.highlightSeats = function(seat_selector, options){
    defaults = {
      initialOpacity: 0.5,
      targetOpacity: 1.0
    }
    
    options = $.extend(defaults, options);
    
    $.each(this, function(index, highlight){
      highlight = $(highlight);

      if (highlight.is(":checked")){
        $(seat_selector).each(function(index, seat){
          var features = $(seat).data('features');
          if (features && features.indexOf(highlight.attr('name')) != -1){
            $(seat).addClass(highlight.val());
            $(seat).css({opacity: options.initialOpacity}).animate({opacity: options.targetOpacity})
          }
        })
      }else{
        $(seat_selector).removeClass(highlight.val())
      }
    });
  }
  
  $('#highlights input').change(function(e){
    $(this).highlightSeats('.seating-chart a.available', {
      initialOpacity: 0.3,
      targetOpacity: 0.9
    });
  });
  
});
