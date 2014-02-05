class RegistrationsController < Devise::RegistrationsController
  def new
    super
  end

  def create
  	binding.pry
  end

  def update
    super
  end
end 