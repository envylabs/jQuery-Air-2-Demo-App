var lesson = "1-5";

jQuery(function($) {
  question("Add a live event handler when clicking on a price.");
});

function changeTab(e) {
  var a = e.target;
  console.log(lesson + " changeTab");
  $("#tabs div").hide();
  $("#tabs li a.active").removeClass("active").click(changeTab);
  $(a).addClass("active");
  var active_div = $(a).attr("href");
  $(a).unbind('click', changeTab);
  $(active_div).show();  // Later when we teach ajax, this should move into the success.
  
  // ajax to load
  
  $.ajax('/flights', {
    success: function(result) {
      $(active_div).html(result);
    }
  });
}

function showNumberOfFlights(a) {
  console.log(lesson + " showNumberOfFlights");
  $(a).append("<span class='tooltip'>"+ $(a).data('flights') +" flights</span>");
}

function hideNumberOfFlights(a) {
  console.log(lesson + " showNumberOfFlights");
  $(".tooltip").remove();
}

function checkForFlights(a) {
  if(!hasFlights(a)) {
    a.stop
  }
}

function hasFlights(a) {
  return $(a).data('flights') > 0;
}

function selectFlight(e) {
  a = e.target;
  $(a).toggleClass('selected');
  e.preventDefault();
}

jQuery(function($) {
  $("#tabs ul li a").bind({
    click: changeTab,
    mouseenter: function() { showNumberOfFlights(this); },
    mouseout: function() { hideNumberOfFlights(this); }
  });
  
  $("table a").live('click', selectFlight);
  $("#tabs ul li a.active").click();
});