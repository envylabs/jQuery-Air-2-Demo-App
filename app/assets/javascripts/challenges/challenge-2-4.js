jQuery(function($) {
  question("Refactor the viewAlternateFlight function.  Use the href of the clicked link as the ajax url.  The href includes the direction so you can remove the data parameter.");
  
  /* Starts with
    
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

  */
  
  /* resources */

  $('#flight-navigation a').click(viewAlternateFlight)
  
  /* answer */
  
  function viewAlternateFlight(){
    var href = $(this).attr('href');
    
    $.ajax(href, {
      method: "get",
      success: function(result){
        $('.seating-chart').html(result);
      }
    });
  }
});