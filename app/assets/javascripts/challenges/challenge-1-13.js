jQuery(function($) {
  question("Change the live function to a delegate function.");
  
  /* Starts with
  
  $('div.seating-chart ol.first-class li a.available').click(selectFirstClass);
  $('div.seating-chart ol.economy-class li a.available').click(selectSeat);
  $('#confirm-first-class a.confirm-upgrade').live('click', confirmUpgrade);

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
  $('#confirm-first-class').delegate('a.confirm-upgrade', 'click', confirmUpgrade);
});
