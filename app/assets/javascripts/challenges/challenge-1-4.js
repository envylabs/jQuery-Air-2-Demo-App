var lesson = "1-4";

jQuery(function($) {
  question("Add ability to clear a reservation by clicking on it using unbind.");
});

function isSeatReserved(seat) {
  console.log(lesson + " isSeatReserved");
  return $(seat).attr('data-reserved') == 'true';
}

function confirmReserveSeat(e) {
  console.log(lesson + " confirmReserveSeat");
  e.stopPropagation();
  if (confirm('Reserve this seat?')) {
    $(e.target).attr('data-reserved', 'true').addClass("reserved");
    $("#reservations").append("<li>Row 1, Seat 4. <a href='#' class='remove'>remove</a></li>");
  }
}

function removeReservation(e) {
  console.log(lesson + " removeReservation");
  if (isSeatReserved(this)) {
    e.stopImmediatePropagation();
    if (confirm('Already Reserved! Clear Reservation?')) {
      // <answer>
      $(this).removeAttr('data-reserved').removeClass('reserved');
      $(this).unbind('click', confirmReserveSeat);
      // </answer>
    }
  }
}

jQuery(function($) {
  $('.row li:not(.aisle)').bind('click', removeReservation);
  $('.row li:not(.aisle)').bind('click', confirmReserveSeat);
});