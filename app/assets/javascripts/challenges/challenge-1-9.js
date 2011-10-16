jQuery(function($) {
  question("Once a seat is selected unbind the click event, and when the seat is unselected bind the click event again.");
  
  // Starts with 
  // 
  // function selectSeat(e) {
  //   e.preventDefault();
  //   $('.selected').removeClass('selected');
  //   $(this).addClass('selected');
  //   $('#seatSelected').text($(this).data('seat'));
  //   $('#confirm-seat').show();
  // }
  // 
  // $('div.seating-chart li a.available').click(selectSeat);
  
  function selectSeat(e) {
    e.preventDefault();
    $('.selected').removeClass('selected').click(selectSeat);
    $(this).addClass('selected').unbind('click', selectSeat);
    $('#seatSelected').text($(this).data('seat'));
    $('#confirm-seat').show();
  }
  
  $('div.seating-chart li a.available').click(selectSeat);
  
});
