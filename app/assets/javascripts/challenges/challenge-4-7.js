jQuery(function($) {
  question("Define a custom event called 'flightChanged' that reuses the toggleClass code.  Trigger your new custom event in the click handler and keydown handler.");
  
  // ===============
  // = initial code =
  // ===============
  /* 
  $('#flight-navigation a').click(function(e) {
    e.preventDefault();
    $(this).toggleClass('on');
  });
  
  $(document).keydown(function(e) {
    if (e.keyCode === 37) { // left arrow
      $('#flight-navigation a[rel="prev"]').toggleClass('on');
    } else if (e.keyCode === 39) { // right arrow
      $('#flight-navigation a[rel="next"]').toggleClass('on');
    }
  });
  */

  // =============
  // = resources =
  // =============
    
  // ==========
  // = answer =
  // ==========
  
  $('#flight-navigation a').click(function(e) {
    e.preventDefault();
    $(this).trigger('flightChanged');
  });
  
  $(document).keydown(function(e) {
    if (e.keyCode === 37) { // left arrow
      $('#flight-navigation a[rel="prev"]').trigger('flightChanged');
    } else if (e.keyCode === 39) { // right arrow
      $('#flight-navigation a[rel="next"]').trigger('flightChanged');
    }
  });
  
  $('#flight-navigation a').bind('flightChanged', function() {
    $(this).toggleClass('on');
  });

});
