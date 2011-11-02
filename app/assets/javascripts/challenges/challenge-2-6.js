jQuery(function($) {
  question("Add an abort to the viewAlternateFlight function. Don't forget to clear it when a request completes.");

  /* Starts with

    var fetchingFlight = null;

    function viewAlternateFlight() {
      if (fetchingFlight) {
        // abort the request
      }

      var href = $(this).attr('href');

      $.ajax(href, {
        method: "get",
        success: function(result){
          $('.seating-chart').html(result);
        }
      });
    }

    $('#flight-navigation').delegate('a', 'click', viewAlternateFlight);

  */

  /* resources */

  /* answer */

  var fetchingFlight = null;

  function viewAlternateFlight() {
    if (fetchingFlight) {
      fetchingFlight.abort();
    }

    var href = $(this).attr('href');

    fetchingFlight = $.ajax(href, {
      method: "get",
      success: function(result) {
        $('.seating-chart').html(result);
        fetchingFlight = null;
      }
    });
  }

  $('#flight-navigation').delegate('a', 'click', viewAlternateFlight);

});
