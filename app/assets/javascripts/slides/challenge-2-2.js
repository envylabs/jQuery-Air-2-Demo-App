var lesson = "2-2";

jQuery(function($) {
  question("Failure on server");
});

function showFlights(activeDiv) {
  $("#tabs div").hide();
  $.ajax('/flighx', {  // Changed path to cause error 
    data: { date: activeDiv },
    cache: false, 
    success: function(result) {
      $(activeDiv).html(result);
      $('#error').hide(); // hide error
      $(activeDiv).show(); 
    },
    error: function(result) { // added callback
      $('#error').show(); 
    }
  });
}

function changeTab(e) {
  e.preventDefault();
  $("#tabs li a.active").removeClass("active").click(changeTab);
  $(this).addClass("active").unbind("click", changeTab);
  
  showFlights($(this).attr("href"));
}

function showNumberOfFlights(e) {
  var num_flights = $(this).data('flights');
  $(this).append("<span class='tooltip'>"+ num_flights 
                      +" flights</span>");
    $("#tabs span.tooltip").show();
}

function hideNumberOfFlights(a) {
  $("#tabs span.tooltip").remove();
}

function selectFlight(e) {
  e.preventDefault();
  $("#tabs a.selected").removeClass('selected');
  $(this).toggleClass('selected');
}


jQuery(function($) {
  $("#tabs ul li a").bind({
    click: changeTab,
    mouseenter: showNumberOfFlights,
    mouseleave: hideNumberOfFlights
  });
  
  // Added error div link reload
  $("#error a").click(function (e){
    e.preventDefault();
    showFlights($("#tabs li a.active").attr("href"));
  });
  
  $("#tabs div").delegate('#flights a', 'click', selectFlight);
  $("#tabs ul li:eq(2) a").click();
});