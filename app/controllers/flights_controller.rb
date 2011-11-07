class FlightsController < ApplicationController
  include ActionView::Helpers::NumberHelper
  include ActionView::Helpers::TextHelper
  
  layout false
  def index
    date = params[:date][1..-1]
    d = Time.parse("#{date} 00:00:00 UTC")
    sleep(3)
    @flights = Flight.where(depart: d.beginning_of_day..d.end_of_day)
    respond_to do |format|
      format.html 
      format.json { 
        render json: @flights.collect { |f| { depart: f.depart_time, arrive: f.arrive_time, flight: f.flight, routing: f.stops, first_class: number_to_currency(f.first_class_price, precision: 0), economy: number_to_currency(f.economy_price, precision: 0)} } 
      }
    end
  end
  
  def fail
    head :unprocessable_entity
  end

  def stats
    meal = (rand(2) == 1) ? 'yes' : 'no'
    model = '747'
    percentage = 85 + rand(15) # random from 85% - 99%

    render :json => {:meal => meal, :model => model, :percentage_on_time => percentage}
  end
  
  def seats
    render json: {
      firstClass: [
        [
          {
            seat: 'A',
            available: true,
            features: 'power'
          },
          {
            seat: 'B',
            available: false,
            features: 'tv'
          },
          {
            seat: 'C',
            available: true,
            features: 'power'
          },
          {
            seat: 'D',
            available: false,
            features: 'tv'
          }
        ],
        [
          {
            seat: 'A',
            available: false,
            features: 'tv'
          },
          {
            seat: 'B',
            available: false,
            features: 'tv'
          },
          {
            seat: 'C',
            available: false,
            features: 'power'
          },
          {
            seat: 'D',
            available: true,
            features: ''
          }
        ]
      ],
      economyClass: [
        [
          {
            seat: 'A',
            available: false,
            features: 'power'
          },
          {
            seat: 'B',
            available: false,
            features: 'tv'
          },
          {
            seat: 'C',
            available: false,
            features: 'power'
          },
          {
            seat: 'D',
            available: false,
            features: 'tv'
          },
          {
            seat: 'E',
            available: true,
            features: 'power,tv'
          },
          {
            seat: 'F',
            available: false,
            features: ''
          }
        ],
        [
          {
            seat: 'A',
            available: true,
            features: 'tv'
          },
          {
            seat: 'B',
            available: true,
            features: 'tv'
          },
          {
            seat: 'C',
            available: false,
            features: 'power'
          },
          {
            seat: 'D',
            available: true,
            features: 'power,tv'
          },
          {
            seat: 'E',
            available: false,
            features: ''
          },
          {
            seat: 'F',
            available: true,
            features: ''
          }
        ]
      ]
    }
  end
  
  def show

    # @flight = Flight.find_by_flight(params[:id])
    
    # price = @flight.send(params[:class] + "_price").to_f
    # fees = price * 0.13
    # total = price + fees
    
    respond_to do |f|
      # f.json {
      #   render :json => { price: number_to_currency(price), fees: number_to_currency(fees), total: number_to_currency(total) }
      # }
      
      f.html {
        render :show
      }
      
      f.json {
        render json: {}
      }
      

    end
    
    
  end

  def reserve
    # Returns a random 6-digit confirmation code
    confirmation = ActiveSupport::SecureRandom.hex(3).upcase
    render :json => {:confirmation => confirmation}
  end
  
  def show_jsonp
    @flight = Flight.find_by_flight(params[:id])
    
    price = @flight.send(params[:class] + "_price").to_f
    fees = price * 0.13
    total = price + fees

    render :json => { price: number_to_currency(price), fees: number_to_currency(fees), total: number_to_currency(total) }, :callback => params[:callback]
  end
  
  def login
    # sleep(2)
    @logged_in = true
    if params[:lesson]
      render :action => "login#{params[:lesson]}"
    end
  end
  
  helper_method :stop_friendly
  def stop_friendly(stops)
    if stops == 0
      "Nonstop"
    else
      pluralize(stops, "stop")
    end
  end
end
