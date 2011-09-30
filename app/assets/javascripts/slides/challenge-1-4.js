var lesson = "1-4";

// Unbind and alternate handler syntax

jQuery(function($) {
  question("Unbind the click handler on a tab when it's active.");
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
    $("#tabs span.tooltip").show();
}

function hideNumberOfFlights(a) {
  console.log(lesson + " hideNumberOfFlights");
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

// function changeTab(e) {
//   var a = e.target;
//   console.log(lesson + " changeTab");
//   $("#tabs div").hide();
//   $("#tabs li a.active").removeClass("active").click(changeTab);
//   $(a).addClass("active");
//   var active_div = $(a).attr("href");
//   $(active_div).show();
//   
//   // Also mention that you can unbind evertyhing with unbind('click')
//   // If you unbind('click.thing')
//   // So when you bind it.. you can do a namespace 
//   // bind({  
//   //    "click.flightSchedule": changeTab
//   //  })
//   $(a).unbind('click', changeTab);
// 
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
// jQuery(function($) {
//   $("#tabs ul li a").bind({
//     click: changeTab,
//     mouseenter: function() { showNumberOfFlights(this); },
//     mouseleave: function() { hideNumberOfFlights(this); }
//   });
//   $("#tabs ul li a.active").click();
// });