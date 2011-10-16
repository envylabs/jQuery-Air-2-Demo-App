jQuery(function($) {
  question("Now get the text value of the a href for that same first seat.  (you can use up arrow)");
  
  alert($('ol.economy-class li.row:first li:first a').text());
});
