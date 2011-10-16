jQuery(function($) {
  question("Get the html value of the first seat in economy class.");
  
  alert($('ol.economy-class li.row:first li:first').html());
});
