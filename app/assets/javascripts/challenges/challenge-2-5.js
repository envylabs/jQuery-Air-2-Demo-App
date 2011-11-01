jQuery(function($) {
  question("To make the 'View Earlier Flight' and 'View Later Flight' links work, use delegate() to call viewAlternateFlight when they are clicked")

  /* Starts with

    function viewAlternateFlight(){
      var href = $(this).attr('href');

      $.ajax(href, {
        method: "get",
        success: function(result){
          $('.seating-chart').html(result);
        }
      });
    }

  */

  /* resources */

  /* answer */

  function viewAlternateFlight(){
    var href = $(this).attr('href');

    $.ajax(href, {
      method: "get",
      success: function(result){
        $('.seating-chart').html(result);
      }
    });
  }

  $('#flight-navigation').delegate('a', 'click', viewAlternateFlight);

});
