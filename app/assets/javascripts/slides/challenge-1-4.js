var lesson = "1-4";

// Unbind and alternate handler syntax

jQuery(function($) {
  question("Unbind the click handler on a tab when it's active.");
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
//   var a = this;
//   console.log(lesson + " changeTab");
//   $("#tabs div").hide();
//   $("#tabs li a.active").removeClass("active").click(changeTab);
//   $(a).addClass("active");
//   var activeDiv = $(a).attr("href");
//   $(activeDiv).show();
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