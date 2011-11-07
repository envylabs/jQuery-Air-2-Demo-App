jQuery(function($) {
  question("Encapsulate the code below into an object named seatSelector.  The click handler code should go into the init function.");
  
  // ===============
  // = initial code =
  // ===============
  
  /* 
    $('#flight-navigation a').click(viewAlternateFlight);
  
    function viewAlternateFlight(e){
      // ...
    }
  
    function buildCabin(rows){
      // ...
    }
  
    function buildSeats(row_number, seats){
      // ...
    }
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
    init: function(){
      $('#flight-navigation a').click(this.viewAlternateFlight);
    },
    viewAlternateFlight: function(){
    },
    buildCabin: function(){
    },
    buildSeats: function(){
    }
  }

  
});
