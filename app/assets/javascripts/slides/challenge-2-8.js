jQuery(function($) {

  var lesson = "2-8";

  question("Submit the login form, use post method and load server side javascript.");

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
        
    $('#confirm').hide();
    
    $.ajax('/flights/' + flight, {
      data: { 'class': class },
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
    // alert(form);
    
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