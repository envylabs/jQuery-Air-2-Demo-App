jQuery(function($) {

  var lesson = "3-4";

  question("Change easing method on the slideUp/slideDown of the login box.");

  var fetchingFlights = null;

  function showFlights(activeDiv) {
    $("#tabs div").hide();
    if (fetchingFlights) {
      fetchingFlights.abort();
    }
    fetchingFlights = $.ajax('/flights', {  
      data: { date: activeDiv },
      cache: false, 
      beforeSend: function(result) {
        $('#tabs #loading').show();
      },
      complete: function(result) {
        $('#tabs #loading').hide();
        fetchingFlights = null;
      },
      success: function(result) {
        $(activeDiv).html(result);
        $('#tabs #error').hide();
        $(activeDiv).show(); 
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
    $(this).addClass("active").unbind("click", changeTab);

    showFlights($(this).attr("href"));
  }

  function showNumberOfFlights(e) {
    var num_flights = $(this).data('flights');
    $(this).append("<span class='tooltip'>"+ num_flights 
    +" flights</span>");
    $("#tabs span.tooltip").show();
  }

  function hideNumberOfFlights(a) {
    $("#tabs span.tooltip").remove();
  }

  function selectFlight(e) {
    e.preventDefault();
    $("#tabs a.selected").removeClass('selected');
    $(this).toggleClass('selected');
    
    var flight = $(this).data('flight');
    var flightClass = $(this).data('class');
        
    $('#confirm').hide();
    
    $.ajax('/flights/' + flight, {
      data: { 'class': flightClass },
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

    var form = $(this).serialize();
    
    $.ajax('/login', {  
      data: form + "&lesson=" + lesson,
      dataType: 'script',
      type: 'post'
    });
  }
  
  /* 
    Good site: http://james.padolsey.com/demos/jquery/easing/
    Note: Those are avaible via an assitional plugin: 
    http://gsgd.co.uk/sandbox/jquery/easing/
    The only jquery easing options are 'swing' (default) and 'linear'.
  */

  $("#tabs #error a").click(function (e){
    e.preventDefault();
    showFlights($("#tabs li a.active").attr("href"));
  });

  $("#tabs div").delegate('#flights a', 'click', selectFlight);
  $("#tabs ul li:eq(2) a").click();
  
  $('#confirm #login form').submit(login);
});