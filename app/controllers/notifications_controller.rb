class NotificationsController < ApplicationController
  def create
    respond_to do |format|
      format.js
    end
  end
end
