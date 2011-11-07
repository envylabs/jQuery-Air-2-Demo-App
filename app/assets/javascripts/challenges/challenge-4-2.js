jQuery(function($) {
  question("");
  
  // ===============
  // = initial code =
  // ===============
  /*
  function buildSeats(row_number, seats){
    
    // data is a JSON array
    var seat_html = "";
    $.each(seats, function(index, seat){
      seat_html += "<li>" +
                  "<a class='" + (seat.available ? 'available' : '') + "' " +
                    "data-features='" + seat.features + "' " +
                    "data-seat='" + row_number + seat.seat + "' href='#'>" + seat.seat + "</a>" +
                "</li>";
    });
    
    return seat_html;
  }
  */

  // =============
  // = resources =
  // =============
  // {
  //   firstClass: [
  //     [
  //       {
  //         seat: 'A',
  //         available: true,
  //         features: 'power'
  //       },
  //       {
  //         seat: 'B',
  //         available: false,
  //         features: 'tv'
  //       },
  //       {
  //         seat: 'C',
  //         available: true,
  //         features: 'power'
  //       },
  //       {
  //         seat: 'D',
  //         available: false,
  //         features: 'tv'
  //       }
  //     ],
  //     [
  //       {
  //         seat: 'A',
  //         available: false,
  //         features: 'tv'
  //       },
  //       {
  //         seat: 'B',
  //         available: false,
  //         features: 'tv'
  //       },
  //       {
  //         seat: 'C',
  //         available: false,
  //         features: 'power'
  //       },
  //       {
  //         seat: 'D',
  //         available: true,
  //         features: ''
  //       }
  //     ]
  //   ],
  //   economyClass: [
  //     [
  //       {
  //         seat: 'A',
  //         available: false,
  //         features: 'power'
  //       },
  //       {
  //         seat: 'B',
  //         available: false,
  //         features: 'tv'
  //       },
  //       {
  //         seat: 'C',
  //         available: false,
  //         features: 'power'
  //       },
  //       {
  //         seat: 'D',
  //         available: false,
  //         features: 'tv'
  //       },
  //       {
  //         seat: 'E',
  //         available: true,
  //         features: 'power,tv'
  //       },
  //       {
  //         seat: 'F',
  //         available: false,
  //         features: ''
  //       }
  //     ],
  //     [
  //       {
  //         seat: 'A',
  //         available: true,
  //         features: 'tv'
  //       },
  //       {
  //         seat: 'B',
  //         available: true,
  //         features: 'tv'
  //       },
  //       {
  //         seat: 'C',
  //         available: false,
  //         features: 'power'
  //       },
  //       {
  //         seat: 'D',
  //         available: true,
  //         features: 'power,tv'
  //       },
  //       {
  //         seat: 'E',
  //         available: false,
  //         features: ''
  //       },
  //       {
  //         seat: 'F',
  //         available: true,
  //         features: ''
  //       }
  //     ]
  //   ]
  // }
  
  $('#flight-navigation a').click(viewAlternateFlight)
  
  function viewAlternateFlight(e){
    e.preventDefault();
    var href = $(this).attr('href');
    
    $('.seating-chart').fadeOut();
    
    $.ajax('/flights/seats', {
      method: "get",
      success: function(data){
        $('.seating-chart').queue(function(next){
          $('.seating-chart li.row').remove();
              
          $('ol.first-class').html(buildCabin(data.firstClass))
          $('ol.economy-class').html(buildCabin(data.economyClass))
          
          $(this).fadeIn()
          next();
        });
      }
    });
  }
  
  function buildCabin(rows){
    var row_html = "";
    
    $.each(rows, function(index, row){
      var row_number = index + 1;
      row_html += "<li class='row'><ol>" + buildSeats(row_number, row) + "</ol></li>";
    });
    
    return row_html
  }
  
  function buildSeats(row_number, seats){
    
    var seat_html = $.map(seats, function(seat){
      return "<li>" +
               "<a class='" + (seat.available ? 'available' : '') + "' " +
                 "data-features='" + seat.features + "' " +
                 "data-seat='" + row_number + seat.seat + "' href='#'>" + seat.seat + "</a>" +
             "</li>";
    });
    
    return seat_html.join('');
  }
    
  
  
  // ==========
  // = answer =
  // ==========
  
});
