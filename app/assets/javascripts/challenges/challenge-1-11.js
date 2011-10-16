jQuery(function($) {
  question("The selectSeat and selectFirstClass functions have some duplication. Refactor the duplication to the setSeat Function. Tip: In the setSeat function, you'll want to use e.target instead of 'this'");
  
  /* Starts with 
  ----
  
  function setSeat(e) {
  
  }
  
  function selectFirstClass(e) {
    e.preventDefault();
    $('.selected').removeClass('selected').click(selectSeat);
    $(this).addClass('selected').unbind('click', selectSeat);
    $('#seatSelected').text($(this).data('seat'));
    
    var resulting_html = fetchFirstClassConfirm();
    $('#confirm-first-class').html(resulting_html); 
    $('#confirm-first-class').show();
    $('#confirm-seat').hide();
  }
  
  function selectSeat(e) {
    e.preventDefault();
    $('.selected').removeClass('selected').click(selectSeat);
    $(this).addClass('selected').unbind('click', selectSeat);
    $('#seatSelected').text($(this).data('seat'));
    
    $('#confirm-seat').show();
    $('#confirm-first-class').hide();
  }
  -----
  
  ----
  
  Hola developer!!
  We need a way at this point to show "additional code", which is part of the script, but the user is unable to modify.
  How cool would it be to show all the code in the editor, but the unmodifiable part would have a blue background 
  with a lock icon or something on the right side.
  
  
  */

  function setSeat(e) {
    e.preventDefault();
    $('.selected').removeClass('selected').click(selectSeat);
    $(e.target).addClass('selected').unbind('click', selectSeat);
    $('#seatSelected').text($(e.target).data('seat'));
  }
  
  function selectFirstClass(e) {
    setSeat(e);
    var resulting_html = fetchFirstClassConfirm();
    $('#confirm-first-class').html(resulting_html); 
    $('#confirm-first-class').show();
    
  }
  
  function selectSeat(e) {
    setSeat(e);
    $('#confirm-seat').show();
    $('#confirm-first-class').hide();
  }
  
  function fetchFirstClassConfirm() {
    // This function content should not be revealed to the student
    return "<h2>Please Confirm</h2> You've selected a first class seat which will be $120 more.  Are you sure? <a href='#' class='confirm-upgrade'>Yes, Confirm Upgrade</a>"
  }
  
  function confirmUpgrade(e) {
    e.preventDefault();
    $('#confirm-first-class').hide();
    $('#confirm-seat').show();
  }
  
  $('div.seating-chart ol.first-class li a.available').click(selectFirstClass);
  $('div.seating-chart ol.economy-class li a.available').click(selectSeat);
});
