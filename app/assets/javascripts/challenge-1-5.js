var lesson = "1-5";

jQuery(function($) {
  question("Change the way reservations link events are bound to allow them to be dynamically added then removed.");
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
      $(this).removeAttr('data-reserved').removeClass('reserved');
      $(this).unbind('click', confirmReserveSeat);
    }
  }
}

function removeSeatFromReservation(e) {
  $(this).parent().remove();
}


jQuery(function($) {
  $('.row li:not(.aisle)').bind('click', removeReservation);
  $('.row li:not(.aisle)').bind('click', confirmReserveSeat);
  
  // Original 
  // $('#reservations a.remove').click(removeSeatFromReservation);
  // <answer>
  $('#reservations a.remove').live('click', removeSeatFromReservation);
  // </answer>
});