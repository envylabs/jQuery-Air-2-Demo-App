var lesson = "1-1";

// Might need to start off teaching data & attr into this lesson.

jQuery(function($) {
  question("When a tab is clicked, show the related flights and highlight the tab using bind({}).");
});

function changeTab(e) {
  console.log(lesson + " changeTab");
  e.preventDefault();
  $("#tabs li a.active").removeClass("active");
  $(e.target).addClass("active");
}

function showNumberOfFlights(a) {
  console.log(lesson + " showNumberOfFlights");
  $(a).append("<span class='tooltip'>"+ $(a).data('flights') +" flights</span>");
}

function hideNumberOfFlights(a) {
  console.log(lesson + " showNumberOfFlights");
  $(".tooltip").remove();
}

// jQuery(function($) {
//   $("#tabs ul li a").click(function(e){
//     e.preventDefault();
//     $("#tabs li a.active").removeClass("active");
//     $(this).addClass("active");
//   });
// });

jQuery(function($) {
  $("#tabs ul li a").click(changeTab);
  $("#tabs ul li:eq(2) a").click();
});