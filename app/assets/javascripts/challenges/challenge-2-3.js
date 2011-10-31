jQuery(function($) {
  question("Fill in the viewAlternateFlight ajax call.  Use the 'rel' attribute from the clicked link as the direction parameter.  In the success callback, update the seating-chart html.");
  
  /* Starts with
    
    function viewAlternateFlight(){
      var flight_id = 815;
      
      $.ajax({
        url: "/flights/" + flight_id,
        method: "get",
        data: { direction: null }, // "prev" or "next"
        success: function(result){
          // update .seating-chart here
        }
      });
    }

  */
  
  /* resources */

  $('#flight-navigation a').click(viewAlternateFlight)
  
  /* answer */
  
  function viewAlternateFlight(){
    var flight_id = 815;
    var rel = $(this).attr('rel');
    
    $.ajax("/flights/" + flight_id, {
      method: "get",
      data: { direction: rel },
      success: function(result){
        $('.seating-chart').html(result);
      }
    });
  }
});