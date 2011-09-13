var lesson = "1-2";

// Might need to start off teaching data & attr into this lesson.

jQuery(function($) {
  question("When a tab is clicked, show the related flights and highlight the tab using bind({}).");
});

function changeTab(a) {
  console.log(lesson + " changeTab");
  $("#tabs div").hide();
  $("#tabs li a.active").removeClass("active");
  $(a).addClass("active");
  var active_div = $(a).attr("href");
  $(active_div).show();
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
    click: function (e) { changeTab(this) },
    mouseenter: function (e) { showNumberOfFlights(this); },
    mouseout: function (e) { hideNumberOfFlights(this); }
  });
  $("#tabs ul li a.active").click();
});