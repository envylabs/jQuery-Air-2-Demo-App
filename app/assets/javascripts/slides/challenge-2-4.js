jQuery(function($) {

  var lesson = "2-4";

  question("Abort ajax request if another one is clicked.");

  var fetchingFlights = null;

  function showFlights(active_div) {
    $("#tabs div").hide();
    if (fetchingFlights) {
      fetchingFlights.abort();
    }
    fetchingFlights = $.ajax('/flights', {  
      data: { date: active_div },
      cache: false, 
      beforeSend: function(result) {
        $('#tabs #loading').show();
      },
      complete: function(result) {
        $('#tabs #loading').hide();
        fetchingFlights = null;
      },
      success: function(result) {
        $(active_div).html(result);
        $('#tabs #error').hide();
        $(active_div).show(); 
      },
      error: function(result) {
        if (result.statusText != "abort") { 
          $('#tabs #error').show();
        }
      }
    });
  }

  function changeTab(e) {
    e.preventDefault();
    $("#tabs li a.active").removeClass("active").click(changeTab);
    $(e.target).addClass("active").unbind("click", changeTab);

    showFlights($(e.target).attr("href"));
  }

  function showNumberOfFlights(e) {
    var num_flights = $(e.target).data('flights');
    $(e.target).append("<span class='tooltip'>"+ num_flights 
    +" flights</span>");
    $("#tabs span.tooltip").show();
  }

  function hideNumberOfFlights(a) {
    $("#tabs span.tooltip").remove();
  }

  function selectFlight(e) {
    e.preventDefault();
    $("#tabs a.selected").removeClass('selected');
    $(e.target).toggleClass('selected');
  }

  $("#tabs ul li a").bind({
    click: changeTab,
    mouseenter: showNumberOfFlights,
    mouseleave: hideNumberOfFlights
  });

  $("#tabs #error a").click(function (e){
    e.preventDefault();
    showFlights($("#tabs li a.active").attr("href"));
  });

  $("#tabs div").delegate('#flights a', 'click', selectFlight);
  $("#tabs ul li:eq(2) a").click();
});