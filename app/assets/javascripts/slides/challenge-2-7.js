jQuery(function($) {

  var lesson = "2-6";

  question("Use JSON P");

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
    var class = $(e.target).data('class');
    
    console.log(lesson + " flight " + flight + " & class = " + class);
    
    $('#confirm').hide();
    
    // must also move showTotal out of the jQuery block
    $.ajax('/flights_jsonp/' + flight, {
      data: { 'class': class },
      dataType: 'jsonp',
      success: showTotal
    });
    
    // Also show
    

    // 
    // function printWeather(json){
    //   console.log(json);
    // }
  }
  
  function showTotal(json) {
    console.log("Called showTotal!");
    console.log(json);
    $('#price').text(json.price);
    $('#fees').text(json.fees);
    $('#total').text(json.total);
    $('#confirm').slideDown();
  }
  
// jsonpCallback: 'showTotal'
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
});


function fetchWeather() {
  $.ajax('http://api.wunderground.com/api/065adfd6c1d0a14b/conditions/q/32789.json', {
    dataType: 'jsonp',
    success: function(json) {
      console.log(json);
      alert(json.current_observation.temperature_string);
    }
  });
}