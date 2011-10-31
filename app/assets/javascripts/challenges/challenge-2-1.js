jQuery(function($) {
  question("Change the fetchFirstClassConfirm function to use $.ajax to fetch confirmation html.  Make a GET request to the url '/flights/' + flight_id.  On success, update and show the #confirm-first-class div.");
  
  /* Starts with
    
    function fetchFirstClassConfirm() {
    
      var flight_id = 815;
      
      var result = null; // replace with ajax call
      
      $('#confirm-first-class').html(result); 
      $('#confirm-first-class').show();
      
    }

  */
  
  /* resources */
  function selectFirstClass(e) {
    setSeat(e);
    fetchFirstClassConfirm();
  }
  
  function setSeat(e) {
    e.preventDefault();
    $('.selected').removeClass('selected').click(selectSeat);
    $(e.target).addClass('selected').unbind('click', selectSeat);
    $('#seatSelected').text($(e.target).data('seat'));
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
  
  /* answer */
  
  function fetchFirstClassConfirm() {
    var flight_id = 815;
    
    $.ajax({
        url: "/flights/" + flight_id,
        method: "get",
        success: function(result){
          $('#confirm-first-class').html(result).show(); 
        }
      }
    );
  }
});
