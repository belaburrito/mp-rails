class Api::V1::GuestsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    @guest = Guest.new(guest_params)

    if @guest.valid?
      @guest.save
      render json: { message: "Guest created successfully" }, status: :created
    else
      render json: { errors: @guest.errors.full_messages }, status: :bad_request
    end
  end

  def index
    @guests = Guest.all
    render json: @guests
  end

  private

  def guest_params
    params.require(:guest).permit(:name, :phone)
  end
end
