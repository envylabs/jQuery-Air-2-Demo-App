var lesson = "2-1";

jQuery(function($) {
  question("Load data when clicking on a tab via ajax.");
});

function showFlights(active_div) {
  $("#tabs div").hide();
  $.ajax('/flights', {
    data: { date: active_div },
    cache: false, // Added this
    success: function(result) {
      $(active_div).html(result);
      $(active_div).show(); // Moved this from show_flights Fucntion
    }
  });
  
  // Alternately
  $.get("/flights", 
    { date: active_div }, 
    function(result) {
      $(active_div).html(result);
      $(active_div).show();
   });
}

function changeTab(e) {
  console.log(lesson + " changeTab");
  e.preventDefault();
  $("#tabs li a.active").removeClass("active").click(changeTab);
  $(e.target).addClass("active").unbind("click", changeTab);
  
  showFlights($(e.target).attr("href"));
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
  $("#tabs div").delegate('#flights a', 'click', selectFlight);
  $("#tabs ul li:eq(2) a").click();
});