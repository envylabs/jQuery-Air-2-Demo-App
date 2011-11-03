jQuery(function($) {
  question("");

  /* starts with

  function notifyMe(event) {
    event.preventDefault();

    // serialize the form data here
    var form = null;

    $.ajax('/notify_me', {
      type: 'post',
      data: form,
      dataType: 'script'
    });
  }

  */

  /* resources */

  $('#notify-me form').submit(notifyMe);

  /* answer */

  function notifyMe(event) {
    event.preventDefault();

    var form = $(this).serialize();

    $.ajax('/notify_me', {
      type: 'post',
      data: form,
      dataType: 'script'
    });
  }
});
