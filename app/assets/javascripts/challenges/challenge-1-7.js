jQuery(function($) {
  question("Refactor the code below to use the .bind() method");
  
  // Starts with 
  
  // function selectSeat(e) {
  //   e.preventDefault();
  //   $('.selected').removeClass('selected');
  //   $(this).addClass('selected');    
  // }
  // 
  // $('div.seating-chart a.available').click(selectSeat);
  
  function selectSeat(e) {
    e.preventDefault();
    $('.selected').removeClass('selected');
    $(this).addClass('selected');    
  }
  
  $('div.seating-chart a.available').bind({
      click: selectSeat
    });
  
});
