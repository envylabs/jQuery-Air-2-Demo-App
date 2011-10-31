jQuery(function($) {
  question("Update the $.ajax call to add cache: false and a timeout of 7000ms. Add an error callback which updates the #confirm-first-class div with 'Unable to pull seat price, please select another seat' and then shows it.");
  
  /* Starts with
    
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
        cache: false,
        timeout: 7000,
        method: "get",
        success: function(result){
          $('#confirm-first-class').html(result).show(); 
        },
        error: function(result){
          $('#confirm-first-class').html('Unable to pull seat price, please select another seat').show();
        }
      }
    );
  }
});