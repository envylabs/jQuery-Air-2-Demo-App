jQuery(function($) {
  question("We're adding tooltips when hovering over seats.  Update showSeatInformation to fadeIn the tooltip after a 200ms delay.  Update hideSeatInformation to remove the tooltip after a fadeOut (make sure and use a callback on fadeOut)");
  
  /* Starts with
    function showSeatInformation(e){
      var seat = $(this).find('a').data('seat');
      $(this).append("<span class='tooltip'>seat " + seat + "</span>");
      $('.seating-chart .tooltip').show();
    }

    function hideSeatInformation(e){
      $('.seating-chart .tooltip').remove();
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
    $('.seating-chart .tooltip').fadeOut(function(){
      $(this).remove()
    });
  }


});
