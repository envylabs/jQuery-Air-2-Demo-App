jQuery(function($) {
  question("Encapsulate the code below into an object named seatSelector.  The click handler code should go into the init function.");
  
  // ===============
  // = initial code =
  // ===============
  
  /* 
    function viewAlternateFlight(){
      // ...
    }
  
    function buildCabin(){
      // ...
    }
  
    function buildSeats(){
      // ...
    }

    $('#flight-navigation a').click(viewAlternateFlight);
  */

  // =============
  // = resources =
  // =============
  /*
    
  */
  

    
  // ==========
  // = answer =
  // ==========

  var seatSelector = {
    viewAlternateFlight: function() {
      // ...
    },

    buildCabin: function() {
      // ...
    },

    buildSeats: function() {
      // ...
    },

    init: function() {
      $('#flight-navigation a').click(this.viewAlternateFlight);
    }
  };

});
