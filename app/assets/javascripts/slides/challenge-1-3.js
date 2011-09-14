var lesson = "1-3";

// Might need to start off teaching data & attr into this lesson.

jQuery(function($) {
  question("Add divs");
});

function changeTab(e) {
  console.log(lesson + " changeTab");
  e.preventDefault();
  $("#tabs li a.active").removeClass("active");
  $(e.target).addClass("active");
  
  var active_div = $(e.target).attr("href");
  $("#tabs div").hide();
  $(active_div).show();
}

function showNumberOfFlights(e) {
  console.log(lesson + " showNumberOfFlights");
  var num_flights = $(e.target).data('flights');
  $(e.target).append("<span class='tooltip'>"+ num_flights 
                      +" flights</span>");
}

function hideNumberOfFlights(a) {
  console.log(lesson + " showNumberOfFlights");
  $("#tabs span.tooltip").remove();
}

jQuery(function($) {
  $("#tabs ul li a").bind({
    click: changeTab,
    mouseenter: showNumberOfFlights,
    mouseleave: hideNumberOfFlights
  });
  $("#tabs ul li:eq(2) a").click();
});