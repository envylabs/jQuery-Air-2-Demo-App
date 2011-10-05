jQuery(function($) {

  var lesson = "2-8";

  question("Fade the tooltip in when hovered over, and fade out when mouse out.");

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
    console.log(lesson + " showNumberOfFlights");
    var num_flights = $(this).data('flights');
    var tooltip = $("<span class='tooltip'>"+ num_flights +" flights</span>");    
    // $(this).app end(tooltip).hide().fadeIn();
    toolip.appendTo($(this)).hide().fadeIn(100).animate({ marginTop: '4px' });
  }

  function hideNumberOfFlights(a) {
    // $("#tabs span.tooltip").fadeOut();
    $("#tabs span.tooltip").fadeOut(100, function() {
      $(this).remove();
    });
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
    
    // var name = $('#login #name').val();
    // var password = $('#login #password').val();
    // 
    // $.ajax('/login', {  
    //   data: { 'name':name, 'password':password },
    //   ...

    var form = $(this).serialize();
    
    $('#login h4').slideUp();
    
    $.ajax('/login', {  
      data: form,
      dataType: 'script',
      type: 'post'
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