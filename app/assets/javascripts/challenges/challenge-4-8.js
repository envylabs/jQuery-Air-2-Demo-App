jQuery(function($) {
  question("");
  
  // ===============
  // = initial code =
  // ===============

  /*
      function buildSeats(seats){
        var seat_html = "";
        $.each(seats, function(index, seat){
          seat_html += "<li>" +
                      "<a class='" + (seat.available ? 'available' : '') + "' " +
                        "data-features='" + seat.features + "' " +
                        "data-seat='" + seat.row_number + seat.seat + "' href='#'>" + seat.seat + "</a>" +
                    "</li>";
        });
  
        seat_html = $("<ol></ol>").append(seat_html)
        return seat_html.html();
      }
  */

  // =============
  // = resources =
  // =============
  /*
  {
    firstClass: [
      [
        {
          seat: 'A',
          available: true,
          features: 'power',
          row_number: 1
        },
        {
          seat: 'B',
          available: false,
          features: 'tv',
          row_number: 1
        },
        {
          seat: 'C',
          available: true,
          features: 'power',
          row_number: 1
        },
        {
          seat: 'D',
          available: false,
          features: 'tv',
          row_number: 1
        }
      ],
      [
        {
          seat: 'A',
          available: false,
          features: 'tv',
          row_number: 2
        },
        {
          seat: 'B',
          available: false,
          features: 'tv',
          row_number: 2
        },
        {
          seat: 'C',
          available: false,
          features: 'power',
          row_number: 2
        },
        {
          seat: 'D',
          available: true,
          features: '',
          row_number: 2
        }
      ]
    ],
    economyClass: [
      [
        {
          seat: 'A',
          available: false,
          features: 'power',
          row_number: 3
        },
        {
          seat: 'B',
          available: false,
          features: 'tv',
          row_number: 3
        },
        {
          seat: 'C',
          available: false,
          features: 'power',
          row_number: 3
        },
        {
          seat: 'D',
          available: false,
          features: 'tv',
          row_number: 3
        },
        {
          seat: 'E',
          available: true,
          features: 'power,tv',
          row_number: 3
        },
        {
          seat: 'F',
          available: false,
          features: '',
          row_number: 3
        }
      ],
      [
        {
          seat: 'A',
          available: true,
          features: 'tv',
          row_number: 4
        },
        {
          seat: 'B',
          available: true,
          features: 'tv',
          row_number: 4
        },
        {
          seat: 'C',
          available: false,
          features: 'power',
          row_number: 4
        },
        {
          seat: 'D',
          available: true,
          features: 'power,tv',
          row_number: 4
        },
        {
          seat: 'E',
          available: false,
          features: '',
          row_number: 4
        },
        {
          seat: 'F',
          available: true,
          features: '',
          row_number: 4
        }
      ]
    ]
  }
  */
  
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
      row_html += "<li class='row'><ol>" + buildSeats(row) + "</ol></li>";
    });
    
    return row_html
  }
    
  // ==========
  // = answer =
  // ==========
  // 
  function buildSeats(seats){
    var seat_html = $('<ol></ol>')
    
    $('#seatTemplate').tmpl(seats).appendTo(seat_html);
    return seat_html.html();
  }
  
  /*
  <script id="seatTemplate" type="x-jquery-tmpl">
    <li>
      <a class="${available ? 'available' : ''}" data-features="${features}" data-seat="${row_number + seat}">${seat}</a>
    </li>  
  </script>
  */ 

  
  
});
