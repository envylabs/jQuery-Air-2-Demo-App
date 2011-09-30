var lesson = "2-2";

jQuery(function($) {
  question("Failure on server");
});

function showFlights(active_div) {
  $("#tabs div").hide();
  $.ajax('/flights', {  // Changed path to cause error 
    data: { date: active_div },
    cache: false, 
    success: function(result) {
      $(active_div).html(result);
      $('#error').hide(); // hide error
      $(active_div).show(); 
    },
    error: function(result) { // added callback
      $('#error').show(); 
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