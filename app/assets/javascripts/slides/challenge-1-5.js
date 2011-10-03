var lesson = "1-5";

jQuery(function($) {
  question("Add a live event handler when clicking on a price.");
});


function fetch_flights(active_div) {
  $.ajax('/flights', {
    data: { date: active_div },
    success: function(result) {
      $(active_div).html(result);
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

function showFlights(active_div) {
  $("#tabs div").hide();
  $(active_div).show();
  fetch_flights(active_div);
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
  $("#flights a.selected").removeClass('selected');
  $(this).toggleClass('selected');
}


jQuery(function($) {
  $("#tabs ul li a").bind({
    click: changeTab,
    mouseenter: showNumberOfFlights,
    mouseleave: hideNumberOfFlights
  });
  // $("table a").bind('click', selectFlight);
  $("#flights a").live('click', selectFlight);
  $("#tabs ul li:eq(2) a").click();
});

// function changeTab(e) {
//   var a = this;
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
//   $("table a").live('click', selectFlight);
//   $("#tabs ul li a.active").click();
// });