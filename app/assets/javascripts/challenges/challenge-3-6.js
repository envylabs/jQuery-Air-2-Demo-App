jQuery(function($) {
  question("Instead of updating the .seating-chart html and fading in as soon as Ajax success is called, use a queue to update the html and fade in once the the .seating-chart is finished fading out.");
  
  /* Starts with
    function viewAlternateFlight(){
      var href = $(this).attr('href');

      $('.seating-chart').fadeOut();

      $.ajax(href, {
        method: "get",
        success: function(result){
          $('.seating-chart').html(result).fadeIn();
        }
      });
    }
  */
  
  /* resources */
  $('#flight-navigation a').click(viewAlternateFlight)
  
  /* answer */
  
  var q = jQuery.fn.queue;
  
  jQuery.fn.queue = function(){
    q.apply(this, arguments)
  }
  
  function viewAlternateFlight(e){
    e.preventDefault();
    
    var href = $(this).attr('href');
    
    $('.seating-chart').fadeOut();
    console.log("about to do ajax");
    
    $.ajax(href, {
      method: "get",
      success: function(result){
        $('.seating-chart').queue(function(next){
          console.log("in queue");
          $(this).html(result).fadeIn();
          next();
        });
      }
    });
  }
  


});
