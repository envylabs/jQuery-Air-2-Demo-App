jQuery(function($) {

  var lesson = "4-5";

  question("Create plugin so we can reuse our tooltip library accross our app.");
  
  // Tabbing and listing flights
  
  var fetchingFlights = null;

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
        // $(activeDiv).html(result);
        // $('#tabs #error').hide();
        // $(activeDiv).show(); 
        $(activeDiv + ' tbody td').remove();
        
        $( "#flightTemplate2" ).tmpl( flights ).appendTo(activeDiv + ' tbody');
        
        $('#tabs #error').hide();
        $(activeDiv).show().callOut({'duration': 1000});
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

  // Tooltip methods
  
  // function showNumberOfFlights(e) {
  //   var num_flights = $(this).data('flights');    
  //   $(this).append("<span class='tooltip'>"+ num_flights +" flights</span>");
  //   $("#tabs span.tooltip").delay(100).fadeIn();
  // }
  // 
  // function hideNumberOfFlights(e) {
  //   $("#tabs span.tooltip").stop().fadeOut(function(){ 
  //     $(this).remove(); 
  //   });
  // }
  
  // $.fn.callOut = function() {
  //   this.css({ opacity:0.5 }).animate({ opacity:1 }, 'fast');
  // };
  // 
  // $.fn.callOut = function(options) {
  //   
  //   var defaults = {
  //     duration: 'fast'
  //   }
  //   var options = $.extend(defaults, options);
  //   
  //   this.css({ opacity:0.5 }).animate({ opacity:1 }, options.duration);
  // };

  $.fn.addToolTip = function() {
    return this.bind({
      mouseenter: function(e) {
        var tip = $(this).data('tooltip');  
        $("<span class='tooltip'>" + tip + "</span>").appendTo(this)
        .delay(100).fadeIn();
      },
      mouseleave: function(e) {
        $(this).find('span.tooltip').stop().fadeOut(function(){ 
          $(this).remove(); 
        });
      }
    });
  }

  $("#tabs ul li a").addToolTip();
  
  // $("#tabs ul li a").bind({
  //   click: changeTab,
  //   mouseenter: showNumberOfFlights,
  //   mouseleave: hideNumberOfFlights
  // });

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
    click: changeTab
  });

  $("#tabs #error a").click(function (e){
    e.preventDefault();
    showFlights($("#tabs li a.active").attr("href"));
  });

  $("#tabs div").delegate('#flights a', 'click', selectFlight);
  $("#tabs ul li:eq(2) a").click();
  
  $('#confirm #login form').submit(login);
});