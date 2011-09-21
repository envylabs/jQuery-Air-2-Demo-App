jQuery(function($) {

  var lesson = "3-3";

  question("Animate color change to highlight price change upon successful login. Also speed this up to make it faster.");

  var fetching_flights = null;

  function showFlights(active_div) {
    $("#tabs div").hide();
    if (fetching_flights) {
      fetching_flights.abort();
    }
    fetching_flights = $.ajax('/flights', {  
      data: { date: active_div },
      cache: false, 
      beforeSend: function(result) {
        $('#tabs #loading').show();
      },
      complete: function(result) {
        $('#tabs #loading').hide();
        fetching_flights = null;
      },
      success: function(result) {
        $(active_div).html(result);
        $('#tabs #error').hide();
        $(active_div).show(); 
      },
      error: function(result) {
        if (result.statusText != "abort") { 
          $('#tabs #error').show();
        }
      }
    });
  }

  function changeTab(e) {
    e.preventDefault();
    $("#tabs li a.active").removeClass("active").click(changeTab);
    $(e.target).addClass("active").unbind("click", changeTab);

    showFlights($(e.target).attr("href"));
  }

  function showNumberOfFlights(e) {
    var num_flights = $(e.target).data('flights');
    $(e.target).append("<span class='tooltip'>"+ num_flights 
    +" flights</span>");
  }

  function hideNumberOfFlights(a) {
    $("#tabs span.tooltip").remove();
  }

  function selectFlight(e) {
    e.preventDefault();
    $("#tabs a.selected").removeClass('selected');
    $(e.target).toggleClass('selected');
    
    var flight = $(e.target).data('flight');
    var flight_class = $(e.target).data('class');
        
    $('#confirm').hide();
    
    $.ajax('/flights/' + flight, {
      data: { 'class': flight_class },
      dataType: 'json',
      success: showTotal
    });
  }
  
  function showTotal(json) {
    $('#price').text(json.price);
    $('#fees').text(json.fees);
    $('#total').text(json.total);
    $('#confirm').slideDown();
  }

  $("#tabs ul li a").bind({
    click: changeTab,
    mouseenter: showNumberOfFlights,
    mouseleave: hideNumberOfFlights
  });
  
  function login(e) {
    e.preventDefault();
    
    // var name = $('#login #name').val();
    // var password = $('#login #password').val();
    // 
    // $.ajax('/login', {  
    //   data: { 'name':name, 'password':password },
    //   ...

    var form = $(e.target).serialize();
    
    $.ajax('/login', {  
      data: form,
      dataType: 'html',
      type: 'post',
      success: login_succes
    });
  }
  
  function login_succes(result) {
    $('#login').slideUp(function() {
      $(this).html(result).slideDown();
      
      $('#confirm .confirm-purchase').slideDown();
      // Note on what can be animated from jquery docs
      // All animated properties should be animated to a single numeric value, except as noted below; most properties that are non-numeric cannot be animated using basic jQuery functionality. (For example, width, height, or left can be animated but background-color cannot be.) Property values are treated as a number of pixels unless otherwise specified. The units em and % can be specified where applicable.
      // background color cannot be animated, but opacity can be
      // $("#confirm tr.total td, #confirm tr.total th").css({'background-color': '#2C1F11', 'opacity':'0.5'}).animate({ opacity: '1'});
      $("#confirm tr.total td, #confirm tr.total th").css({'background-color': '#2C1F11', 'opacity':'0.5'}).animate({ opacity: '1'}, 'fast');
    });
  }

  $("#tabs #error a").click(function (e){
    e.preventDefault();
    showFlights($("#tabs li a.active").attr("href"));
  });

  $("#tabs div").delegate('#flights a', 'click', selectFlight);
  $("#tabs ul li:eq(2) a").click();
  
  $('#confirm #login form').submit(login);
});