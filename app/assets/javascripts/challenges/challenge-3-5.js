jQuery(function($) {
  question("Add a delay so that after the seat confirmation slides down, the page waits 1000ms and then the notify me box fades in");
  
  /* Starts with
    function showConfirm(result){
      $('#confirm-first-class').html(result).slideDown(function(){
        $('#notify-me').fadeIn();
      })
    }
  */
  
  /* resources */
  function selectFirstClass(e) {
    setSeat(e);
    fetchFirstClassConfirm();
  }
  
  function setSeat(e) {
    e.preventDefault();
    
    var seat = $(e.target)
    seat.unbind('click', selectSeat);
    
    $('.selected').removeClass('selected').click(selectSeat);
    $('#seatSelected').text($(e.target).data('seat'));
    
    showSeat(seat)
  }
  
  function showSeat(seat) {
    seat.fadeOut('fast').addClass('selected').fadeIn('fast');
  }
  
  function selectFirstClass(e) {
    setSeat(e);
    fetchFirstClassConfirm();
  }
  
  function selectSeat(e) {
    setSeat(e);
    $('#confirm-seat').show();
    $('#confirm-first-class').hide();
  }
  
  function confirmUpgrade(e) {
    e.preventDefault();
    $('#confirm-first-class').hide();
    $('#confirm-seat').show();
  }
  
  $('div.seating-chart ol.first-class li a.available').click(selectFirstClass);
  $('div.seating-chart ol.economy-class li a.available').click(selectSeat);
  $('#confirm-first-class').delegate('a.confirm-upgrade', 'click', confirmUpgrade);
  
  function fetchFirstClassConfirm() {
    var flight_id = 815;
    
    $.ajax({
        url: "/flights/" + flight_id,
        method: "get",
        success: function(result){
          showConfirm(result); 
        }
      }
    );
  }
  /* answer */
  function showConfirm(result){
    $('#confirm-first-class').html(result).slideDown(function(){
      $('#notify-me').delay(1000).fadeIn();
    })
  }
  


});
