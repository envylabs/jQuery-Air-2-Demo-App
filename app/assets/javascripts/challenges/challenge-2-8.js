jQuery(function($) {
  question("Finish the method below which will fetch flight statistics. Parse the JSON returned, and show results in the #flight-stats div.");

  /* starts with

  function fetchFlightStatistics() {
    var flight_id = 815;

    $.ajax('flights/' + flight_id + '/stats', {
      type: 'get',
      dataType: 'json',
      success: function(result) {
        // example: {'meal': 'no', 'model': '737', 'percentage_on_time': 95}
        // update and show #flight-stats
      }
    });
  }

  */

  /* resources */

  $(document).bind('ready', fetchFlightStatistics);

  /* answer */

  function fetchFlightStatistics() {
    var flight_id = 815;

    $.ajax('flights/' + flight_id + '/stats', {
      type: 'get',
      dataType: 'json',
      success: function(result) {
        $('#flight-stats .meal').text(result.meal);
        $('#flight-stats .model').text(result.model);
        $('#flight-stats .on-time').text(result.percentage_on_time);
        $('#flight-stats').show();
      }
    });
  }
});
