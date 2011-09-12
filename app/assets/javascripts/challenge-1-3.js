jQuery(function($) {
  question("If a seat is already reserved, show an alert to the user and prevent the seat from being reserved.");
});

function isSeatReserved(seat) {
  console.log("1-3 isSeatReserved");
  return $(seat).attr('data-reserved') == 'true';
}

function confirmReserveSeat(e) {
  console.log("1-3 confirmReserveSeat");
  e.stopPropagation();
  if (confirm('Reserve this seat?')) {
    $(e.target).attr('data-reserved', 'true').addClass('reserved');
  }
}

function checkForAlreadyReserved(e) {
  console.log("1-3 checkForAlreadyReserved");
  // <answer> 
  if(isSeatReserved(e.target)) {
    e.stopImmediatePropagation();
    alert('Already Reserved!');
  }
  // </answer>
}

jQuery(function($) {
  $('.row li:not(.aisle)').bind('click', checkForAlreadyReserved);
  $('.row li:not(.aisle)').bind('click', confirmReserveSeat);  
});