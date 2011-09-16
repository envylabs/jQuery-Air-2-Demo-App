var lesson = "2-3";

jQuery(function($) {
  question("Loading Flights");
});

function fetch_flights(active_div) {
  $.ajax('/flights', {  // Changed path to cause error 
    data: { date: active_div },
    cache: false, 
    beforeSend: function(result) {
      $('#tabs #loading').show();
    },
    complete: function(result) {
      $('#tabs #loading').hide();
    },
    success: function(result) {
      $(active_div).html(result);
      $('#tabs #error').hide();
      $(active_div).show(); 
    },
    error: function(result) {
      $('#tabs #error').show();
    }
  });
}

function changeTab(e) {
  console.log(lesson + " changeTab");
  e.preventDefault();
  $("#tabs li a.active").removeClass("active").click(changeTab);
  $(e.target).addClass("active").unbind("click", changeTab);
  
  showFlights($(e.target).attr("href"));
}

function showFlights(active_div) {
  $("#tabs div").hide();
  fetch_flights(active_div);
}

function showNumberOfFlights(e) {
  console.log(lesson + " showNumberOfFlights");
  var num_flights = $(e.target).data('flights');
  $(e.target).append("<span class='tooltip'>"+ num_flights 
                      +" flights</span>");
}

function hideNumberOfFlights(a) {
  console.log(lesson + " hideNumberOfFlights");
  $("#tabs span.tooltip").remove();
}

function selectFlight(e) {
  console.log(lesson + " selectFlight");
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
  
  $("#tabs #error a").click(function (e){
    e.preventDefault();
    fetch_flights($("#tabs li a.active").attr("href"));
  });
  
  $("#tabs div").delegate('#flights a', 'click', selectFlight);
  $("#tabs ul li:eq(2) a").click();
});