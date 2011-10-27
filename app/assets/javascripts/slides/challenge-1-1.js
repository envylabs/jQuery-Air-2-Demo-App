var lesson = "1-1";

jQuery(function($) {
  question("When a tab is clicked, show the related flights and highlight the tab using bind({}).");

  function changeTab(e) {
    e.preventDefault();
    $("#tabs li a.active").removeClass("active");
    $(this).addClass("active");
  }


  $("#tabs ul li a").click(changeTab);
  $("#tabs ul li:eq(2) a").click();
});