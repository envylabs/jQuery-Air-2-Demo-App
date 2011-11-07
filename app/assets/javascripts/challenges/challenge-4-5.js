jQuery(function($) {
  question("Update the highlightSeats plugin to have defaults for the options.  The default values should be initialOpacity of 0.5, and targetOpacity of 1.0");
  
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
  */

  // =============
  // = resources =
  // =============
  
  $('#highlights input').change(function(e){
    $(this).highlightSeats('.seating-chart a.available', {
      initialOpacity: 0.3,
      targetOpacity: 0.9
    });
  });
  
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
  
});
