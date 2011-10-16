function isSeatReserved(seat) {
  console.log(lesson + " isSeatReserved");
  return $(seat).attr('data-reserved') == 'true';
}

function confirmReserveSeat(e) {
  console.log(lesson + " confirmReserveSeat");
  e.stopPropagation();
  if (confirm('Reserve this seat?')) {
    $(this).attr('data-reserved', 'true').addClass("reserved");
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

function displayPrice(e) {
  $(this).html("$99");
}

function hidePrice(e) {
  if(!isSeatReserved(this)) {
    $(this).html("");
  }
}

jQuery(function($) {
  $('.row li:not(.aisle)').bind('click', removeReservation);
  $('.row li:not(.aisle)').bind('click', confirmReserveSeat);
  $('#reservations a.remove').live('click', removeSeatFromReservation);  
  $('.row').delegate('li:not(.aisle)', 'hover', displayPrice);
  $('.row').delegate('li:not(.aisle)', 'mouseleave', hidePrice);
});