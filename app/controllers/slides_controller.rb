class SlidesController < ApplicationController
  def index 
    @dates = [DateTime.new(2012,9,27, 8,30,0, Rational(-6, 24))]
    4.times do
      @dates << @dates.last + 1.day
    end
  end
end
