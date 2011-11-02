jQuery(function($) {
  question("Convert the change event to use the highlightSeats utility function.  Pass in the selector used to find the seats (.seating-chart a.available), and the highlight checkboxes.  Move the if/else functionality in the change event into highlightSeats.");
  
  // ===============
  // = initial code =
  // ===============
  // $.highlightSeats = function(seat_selector, highlights){
  //   $.each(highlights, function(index, highlight){
  //     highlight = $(highlight);
  //     
  //     // insert code here
  //   });
  // }
  // 
  // $('#highlights input').change(function(e){
  //   var checkbox = $(this);
  //   
  //   if (checkbox.is(":checked")){
  //     $('.seating-chart a.available').each(function(index, seat){
  //       var features = $(seat).data('features');
  //       if (features && features.indexOf(checkbox.attr('name')) != -1){
  //         $(seat).addClass(checkbox.val());
  //       }
  //     })
  //   }else{
  //     $('.seating-chart a').removeClass(checkbox.val())
  //   }
  // });

  // =============
  // = resources =
  // =============
  
  // ==========
  // = answer =
  // ==========
  
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
  
});
