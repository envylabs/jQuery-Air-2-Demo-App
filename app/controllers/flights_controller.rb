class FlightsController < ApplicationController
  layout false
  def index
    date = params[:date][1..-1]
    d = Time.parse("#{date} 00:00:00 UTC")
    
    @flights = Flight.where(depart: d.beginning_of_day..d.end_of_day)
  end
end
