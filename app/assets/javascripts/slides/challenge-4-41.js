$.filterFlights = function(cFlights, stops) {
  var filtered_flights = [];
  $.each(cFlights, function(index, flight) {
    if (stops == '2+') {
      filtered_flights.push(flight);
    } else if (stops == '1' && flight.routing <= 1) {
      filtered_flights.push(flight);
    } else if (flight.routing == 0) {
      filtered_flights.push(flight);
    }
  });
  return filtered_flights;
};

jQuery(function($) {

  var lesson = "4-4";

  question("Create a utility function");
  
  // Tabbing and listing flights
  
  var fetchingFlights = null;
  var currentFlights = null;

  function showFlights(activeDiv) {
    $("#tabs div").hide();
    if (fetchingFlights) {
      fetchingFlights.abort();
    }
    fetchingFlights = $.ajax('/flights.json', {  
      data: { date: activeDiv },
      cache: false, 
      beforeSend: function(result) {
        $('#tabs #loading').show();
      },
      complete: function(result) {
        $('#tabs #loading').hide();
        fetchingFlights = null;
      },
      success: function(flights) {
        currentFlights = flights;
        $(activeDiv + ' tbody td').remove();
        
        var stops = $('#flight-filter input[name=stops]:checked').val();
        var filtered_flights = $.filterFlights(currentFlights, stops);
        
        $( "#flightTemplate2" ).tmpl( filtered_flights ).appendTo(activeDiv + ' tbody');
        
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
  
  $('#flight-filter input[name=stops]').change(filter_by_flights);
  
  // Filter by number of flights
  function filter_by_flights(e) {
    
    var stops = $(this).val();
    var filtered_flights = $.filterFlights(currentFlights, stops);
       
    $('#tabs div:visible tbody td').remove();
    $( "#flightTemplate2" ).tmpl( filtered_flights ).appendTo('#tabs div:visible tbody');
  }

  function changeTab(e) {
    e.preventDefault();
    $("#tabs li a.active").removeClass("active").click(changeTab);
    $(this).addClass("active").unbind("click", changeTab);

    showFlights($(this).attr("href"));
  }

  // Tooltip methods
  
  function showNumberOfFlights(e) {
    var num_flights = $(this).data('flights');    
    $(this).append("<span class='tooltip'>"+ num_flights +" flights</span>");
    $("#tabs span.tooltip").delay(100).fadeIn();
  }

  function hideNumberOfFlights(a) {
    $("#tabs span.tooltip").stop().fadeOut(function(){ 
      $(this).remove(); 
    });
  }

  // Selecting a flight
  
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
    $('#confirm').queue(function() {
      $(this).find("input[type=email]").focus();
      $(this).dequeue();
    });
  }
  
  // login and confirm button
  
  function login(e) {
    e.preventDefault();
    var form = $(this).serialize();
    
    $('#login').fadeOut();
    
    $.ajax('/login', {  
      data: form + "&lesson=3-5",
      dataType: 'script',
      type: 'post'
    });
  }
  
  
  // On load events to bind shit
    
  $("#tabs ul li a").bind({
    click: changeTab,
    mouseenter: showNumberOfFlights,
    mouseleave: hideNumberOfFlights
  });

  $("#tabs #error a").click(function (e){
    e.preventDefault();
    showFlights($("#tabs li a.active").attr("href"));
  });

  $("#tabs div").delegate('#flights a', 'click', selectFlight);
  $("#tabs ul li:eq(2) a").click();
  
  $('#confirm #login form').submit(login);
});