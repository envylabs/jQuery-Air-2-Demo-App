var lesson = "1-4";

// Unbind and alternate handler syntax

jQuery(function($) {
  question("Unbind the click handler on a tab when it's active.");
});

function changeTab(e) {
  var a = e.target;
  console.log(lesson + " changeTab");
  $("#tabs div").hide();
  $("#tabs li a.active").removeClass("active").click(changeTab);
  $(a).addClass("active");
  var active_div = $(a).attr("href");
  $(active_div).show();
  
  $(a).unbind('click', changeTab);
  // Also can send in a handler function.
  // ex: $(a).unbind('click', changeTab);
}

function showNumberOfFlights(a) {
  console.log(lesson + " showNumberOfFlights");
  $(a).append("<span class='tooltip'>"+ $(a).data('flights') +" flights</span>");
}

function hideNumberOfFlights(a) {
  console.log(lesson + " showNumberOfFlights");
  $(".tooltip").remove();
}

jQuery(function($) {
  $("#tabs ul li a").bind({
    click: changeTab,
    mouseenter: function() { showNumberOfFlights(this); },
    mouseout: function() { hideNumberOfFlights(this); }
  });
  $("#tabs ul li a.active").click();
});