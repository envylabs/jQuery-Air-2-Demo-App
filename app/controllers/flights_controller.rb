class FlightsController < ApplicationController
  include ActionView::Helpers::NumberHelper
  
  layout false
  def index
    date = params[:date][1..-1]
    d = Time.parse("#{date} 00:00:00 UTC")
    @flights = Flight.where(depart: d.beginning_of_day..d.end_of_day)
  end
  
  def fail
    head :unprocessable_entity
  end
  
  def show
    @flight = Flight.find_by_flight(params[:id])
    
    price = @flight.send(params[:class] + "_price").to_f
    fees = price * 0.13
    total = price + fees
    
    render :json => { price: number_to_currency(price), fees: number_to_currency(fees), total: number_to_currency(total) }
  end
  
  def show_jsonp
    @flight = Flight.find_by_flight(params[:id])
    
    price = @flight.send(params[:class] + "_price").to_f
    fees = price * 0.13
    total = price + fees

    render :json => { price: number_to_currency(price), fees: number_to_currency(fees), total: number_to_currency(total) }, :callback => params[:callback]
  end
  
  def login
    sleep(1)
    @logged_in = true
  end
end
