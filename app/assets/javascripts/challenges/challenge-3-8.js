jQuery(function($) {
  question("One last thing: when hiding the tooltip, make sure and stop() all the other tooltip effects");
  
  /* Starts with
    function showSeatInformation(e){
      var seat = $(this).data('seat');
      $(this).append("<span class='tooltip'>seat " + seat + "</span>");
      $('.seating-chart .tooltip').delay(200).fadeIn();
    }

    function hideSeatInformation(e){
      $('.seating-chart .tooltip').fadeOut(function(){
        $(this).remove()
      });
    }
  */
  
  /* resources */
  $('.seating-chart li.row li a').hover(showSeatInformation, hideSeatInformation)
  
  /* answer */
  
  function showSeatInformation(e){
    var seat = $(this).data('seat');
    $(this).append("<span class='tooltip'>seat " + seat + "</span>");
    $('.seating-chart .tooltip').delay(200).fadeIn();
  }
  
  function hideSeatInformation(e){
    $('.seating-chart .tooltip').stop().fadeOut(function(){
      $(this).remove()
    });
  }


});
