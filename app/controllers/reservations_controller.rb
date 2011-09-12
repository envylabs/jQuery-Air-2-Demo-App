class ReservationsController < ApplicationController
  def create
    head :ok
  end
  
  def fail
    head :unprocessable_entity
  end
end
