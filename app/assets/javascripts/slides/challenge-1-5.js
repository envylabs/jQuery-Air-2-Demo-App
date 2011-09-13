var lesson = "1-5";

jQuery(function($) {
  question("Add a live event handler when clicking on a price.");
});


function fetch_flights(active_div) {
  $.ajax('/flights', {
    success: function(result) {
      $(active_div).html(result);
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
  $(active_div).show();
  fetch_flights(active_div);
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
    mouseout: hideNumberOfFlights
  });
  // $("table a").bind('click', selectFlight);
  $("table a").live('click', selectFlight);
  $("#tabs ul li:eq(2) a").click();
});

// function changeTab(e) {
//   var a = e.target;
//   console.log(lesson + " changeTab");
//   $("#tabs div").hide();
//   $("#tabs li a.active").removeClass("active").click(changeTab);
//   $(a).addClass("active");
//   var active_div = $(a).attr("href");
//   $(a).unbind('click', changeTab);
//   $(active_div).show();  // Later when we teach ajax, this should move into the success.
//   
//   // ajax to load
//   
//   $.ajax('/flights', {
//     success: function(result) {
//       $(active_div).html(result);
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
// function selectFlight(e) {
//   a = e.target;
//   $(a).toggleClass('selected');
//   e.preventDefault();
// }
// 
// jQuery(function($) {
//   $("#tabs ul li a").bind({
//     click: changeTab,
//     mouseenter: function() { showNumberOfFlights(this); },
//     mouseout: function() { hideNumberOfFlights(this); }
//   });
//   
//   $("table a").live('click', selectFlight);
//   $("#tabs ul li a.active").click();
// });