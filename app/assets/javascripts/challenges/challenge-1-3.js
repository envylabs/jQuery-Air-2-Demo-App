jQuery(function($) {
  question("Get the html value of the 4th seat in the 2nd row of economy. You'll want to use eq(#). Tip: Don't forget the first row starts at 0.");
  
  alert($('ol.economy-class li.row:eq(1) li:eq(3) a').text());
});
