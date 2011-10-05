jQuery(function($) {
  question("Prevent the row from being highlighted when clicking on a seat to reserve it.");
});

function highlightAvailableSeats(row) {
  console.log("1-2 highlightAvailableSeats");
  
  $(row).find('li:not(.aisle)[data-reserved!=true]').addClass('highlight');
  $(row).find('li:not(.aisle)[data-reserved=true]').removeClass('highlight');
}
function confirmReserveSeat(e) {
  console.log("1-2 confirmReserveSeat");
  // <answer> 
  e.stopPropagation();
  // </answer>
  if (confirm('Reserve this seat?')) {
    $(this).data('reserved', 'true').addClass('reserved');
  }
}
jQuery(function($) {
  $('.row').bind('click', function (e) {
    highlightAvailableSeats(this);
  });
  $('.row li:not(.aisle )').bind('click', confirmReserveSeat);
});