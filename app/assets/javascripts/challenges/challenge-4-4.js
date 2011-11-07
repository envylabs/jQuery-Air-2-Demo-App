jQuery(function($) {
  question("Convert highlightSeats into a jQuery plugin and use it in the change callback");
  
  // ===============
  // = initial code =
  // ===============
  /*
  $.highlightSeats = function(seat_selector, highlights){
    $.each(highlights, function(index, highlight){
      highlight = $(highlight);

      if (highlight.is(":checked")){
        $(seat_selector).each(function(index, seat){
          var features = $(seat).data('features');
          if (features && features.indexOf(highlight.attr('name')) != -1){
            $(seat).addClass(highlight.val());
          }
        })
      }else{
        $('.seating-chart a').removeClass(highlight.val())
      }
    });
  }
  
  $('#highlights input').change(function(e){
    $.highlightSeats('.seating-chart a.available', $(this));
  });
  */

  // =============
  // = resources =
  // =============
  
  // ==========
  // = answer =
  // ==========
  
  $.fn.highlightSeats = function(seat_selector){
    $.each(this, function(index, highlight){
      highlight = $(highlight);

      if (highlight.is(":checked")){
        $(seat_selector).each(function(index, seat){
          var features = $(seat).data('features');
          if (features && features.indexOf(highlight.attr('name')) != -1){
            $(seat).addClass(highlight.val());
          }
        })
      }else{
        $('.seating-chart a').removeClass(highlight.val())
      }
    });
  }
  
  $('#highlights input').change(function(e){
    $(this).highlightSeats('.seating-chart a.available');
  });
  
});
