var lesson = "1-5";

jQuery(function($) {
  question("Add a live event handler when clicking on a price.");
});

function fetch_flights(activeDiv) {
  $.ajax('/flights', {
    data: { date: activeDiv },
    success: function(result) {
      $(activeDiv).html(result);
    }
  });
}

function changeTab(e) {
  console.log(lesson + " changeTab");
  e.preventDefault();
  $("#tabs li a.active").removeClass("active").click(changeTab);
  $(this).addClass("active").unbind("click", changeTab);
  
  showFlights($(this).attr("href"));
}

function showFlights(activeDiv) {
  $("#tabs div").hide();
  $(activeDiv).show();
  fetch_flights(activeDiv);
}

function showNumberOfFlights(e) {
  console.log(lesson + " showNumberOfFlights");
  var num_flights = $(this).data('flights');
  $(this).append("<span class='tooltip'>"+ num_flights 
                      +" flights</span>");
    $("#tabs span.tooltip").show();
}

function hideNumberOfFlights(a) {
  console.log(lesson + " showNumberOfFlights");
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
  // $("table a").live('click', selectFlight);
  $("#tabs div").delegate('#flights a', 'click', selectFlight);
  $("#tabs ul li:eq(2) a").click();
});

// function changeTab(e) {
//   var a = this;
//   console.log(lesson + " changeTab");
//   $("#tabs div").hide();
//   $("#tabs li a.active").removeClass("active").click(changeTab);
//   $(a).addClass("active");
//   var activeDiv = $(a).attr("href");
//   $(a).unbind('click', changeTab);
//   $(activeDiv).show();  // Later when we teach ajax, this should move into the success.
//   
//   // ajax to load
//   
//   $.ajax('/flights', {
//     success: function(result) {
//       $(activeDiv).html(result);
//     }
//   });
// }
// 
// function showNumberOfFlights(a) {
//   console.log(lesson + " showNumberOfFlights");
//   $(a).append("<span class='tooltip'>"+ $(a).data('flights') +" flights</span>");
// }
// 
// function hideNumberOfFlights(a) {
//   console.log(lesson + " showNumberOfFlights");
//   $(".tooltip").remove();
// }
// 
// 
// function selectFlight(e) {
//   console.log(lesson + " selectFlight");
//   a = this;
//   $(a).toggleClass('selected');
//   e.preventDefault();
// }
// 
// jQuery(function($) {
//   $("#tabs ul li a").bind({
//     click: changeTab,
//     mouseenter: function() { showNumberOfFlights(this); },
//     mouseleave: function() { hideNumberOfFlights(this); }
//   });
//   
//   $("#tabs div").delegate('table tr td a', 'click', selectFlight);
//   $("#tabs ul li a.active").click();
// });






















































   