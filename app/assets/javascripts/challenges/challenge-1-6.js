jQuery(function($) {
  question("When a seat is clicked remove the selected class from all seats and add to the one clicked.  Don't forget to prevent default.  Use the shorthand .click() method.");
  
  // starts with
  // $('div.seating-chart a.available')

  // valid solution
    
  // $('div.seating-chart a.available').click(function(e) {
  //   e.preventDefault();
  //   $('.selected').removeClass('selected');
  //   $(this).addClass('selected');
  // });
  
  function selectSeat(e) {
    e.preventDefault();
    $('.selected').removeClass('selected');
    $(this).addClass('selected');    
  }
  
  $('div.seating-chart a.available').click(selectSeat);
  
});
