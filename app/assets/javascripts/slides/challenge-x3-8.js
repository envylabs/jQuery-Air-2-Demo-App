jQuery(function($) {

  var lesson = "3-8";
  question("Stop effect...");

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
    var num_flights = $(this).data('flights'),
        tooltip = $("<span class='tooltip'>"+ num_flights +" flights</span>");
  
    // Can't run simultaneous effects for fadeIn and slideDown, must be done with animate. See login_succes for queue example.
    tooltip.css('opacity', '0').appendTo($(this)).delay(200).animate({opacity:'1', top: '-29px'}, 250);
  }

  function hideNumberOfFlights(a) {
    $("#tabs span.tooltip").hide();
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
    $('#confirm').queue(function() {
      $(this).find("input[type=email]").focus();
      $(this).dequeue();
    });
  }

  $("#tabs ul li a").bind({
    click: changeTab,
    mouseenter: showNumberOfFlights,
    mouseleave: hideNumberOfFlights
  });
  
  function login(e) {
    e.preventDefault();
    var form = $(this).serialize();
    $('#login').slideUp(500, "linear");
    $.ajax('/login', {  
      data: form,
      dataType: 'html',
      type: 'post',
      success: login_succes,
      error: login_failure
    });
  }

  function login_succes(result) {
    $('#login').queue(function() {
      $(this).html(result).slideDown();
      $('#confirm .confirm-purchase').slideDown(500, 'linear');
      $("#confirm tr.total td, #confirm tr.total th").css({'background-color': '#2C1F11', 'opacity':'0.5'}).animate({ opacity: '1'});
      $(this).dequeue();
    });
  }
  
  function login_failure(result) {
    $('#login').queue(function() {
      $('#login_error').html("Cannot login, please try again")
      $('#login').slideDown();
      $(this).dequeue();
    })
  }

  $("#tabs #error a").click(function (e){
    e.preventDefault();
    showFlights($("#tabs li a.active").attr("href"));
  });

  $("#tabs div").delegate('#flights a', 'click', selectFlight);
  $("#tabs ul li:eq(2) a").click();
  
  $('#confirm #login form').submit(login);
});