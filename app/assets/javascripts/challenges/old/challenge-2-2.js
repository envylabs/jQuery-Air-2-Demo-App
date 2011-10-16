var lesson = "2-2";

jQuery(function($) {
  question('Add a "failure" callback that will display an alert() that the seat is already taken.');
});

function displayPrice(e) {
  $(this).html("$99");
}

function hidePrice(e) {
  if(!isSeatReserved(this)) {
    $(this).html("");
  }
}

function reserveSeat(seat) {
  console.log(lesson + " reserveSeat");
  $(seat).attr('data-reserved', 'true').addClass("reserved");
  $("#reservations").append("<li>Row 1, Seat 4. <a href='#' class='remove'>remove</a></li>");
}



jQuery(function($) {
  $('.row').delegate('li:not(.aisle)', 'hover', displayPrice);
  $('.row').delegate('li:not(.aisle)', 'mouseleave', hidePrice);
});



jQuery(function($) {
  $('.row li:not(.aisle)').bind('click', function (e) {
    var reservationName = prompt('Provide a name for your reservation');
    if (reservationName) {
      $.ajax('/reservations/fail', {
        type: 'POST',
        success: function() {
          reserveSeat(this)
        },
        error: function() {
          alert("Seat is already taken.");
        }
      });
    }
  });
});