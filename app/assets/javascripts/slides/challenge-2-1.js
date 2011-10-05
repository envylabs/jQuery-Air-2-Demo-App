var lesson = "2-1";

jQuery(function($) {
  question("Load data when clicking on a tab via ajax.");
});

function showFlights(activeDiv) {
  $("#tabs div").hide();
  $.ajax('/flights', {
    data: { date: activeDiv },
    cache: false, // Added this
    success: function(result) {
      $(activeDiv).html(result);
      $(activeDiv).show(); // Moved this from show_flights Fucntion
    }
  });
  
  // Alternately
  $.get("/flights", 
    { date: activeDiv }, 
    function(result) {
      $(activeDiv).html(result);
      $(activeDiv).show();
   });
}

function changeTab(e) {
  console.log(lesson + " changeTab");
  e.preventDefault();
  $("#tabs li a.active").removeClass("active").click(changeTab);
  $(this).addClass("active").unbind("click", changeTab);
  
  showFlights($(this).attr("href"));
}

function showNumberOfFlights(e) {
  console.log(lesson + " showNumberOfFlights");
  var num_flights = $(this).data('flights');
  $(this).append("<span class='tooltip'>"+ num_flights 
                      +" flights</span>");
    $("#tabs span.tooltip").show();
}

function hideNumberOfFlights(a) {
  console.log(lesson + " hideNumberOfFlights");
  $("#tabs span.tooltip").remove();
}

function selectFlight(e) {
  console.log(lesson + " selectFlight");
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
  $("#tabs div").delegate('#flights a', 'click', selectFlight);
  $("#tabs ul li:eq(2) a").click();
});