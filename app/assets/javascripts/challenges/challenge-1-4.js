jQuery(function($) {
  question("Get the href attribute of this seat (use up arrow).");
  
  alert($('ol.economy-class li.row:eq(1) li:eq(3) a').attr('href'));
});
