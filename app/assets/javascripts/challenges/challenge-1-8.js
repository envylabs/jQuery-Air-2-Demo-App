jQuery(function($) {
  question("Once a seat is selected update the seat selector field on the sidebar with the data-seat content (i.e. 2A, 14D), and then show() the confirm-seat div. ");
  
  // Starts with 
  
  // function selectSeat(e) {
  //   e.preventDefault();
  //   $('.selected').removeClass('selected');
  //   $(this).addClass('selected');    
  // }
  // 
  // $('div.seating-chart li a.available').click(selectSeat);
  
  function selectSeat(e) {
    e.preventDefault();
    $('.selected').removeClass('selected');
    $(this).addClass('selected'); 
    $('#seatSelected').text($(this).data('seat'));
    $('#confirm-seat').show();
  }
  
  $('div.seating-chart li a.available').click(selectSeat);
  
});
