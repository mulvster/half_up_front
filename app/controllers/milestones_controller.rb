class MilestonesController < ApplicationController
  def create
    milestone = Milestone.new()
    if milestone.save
      redirect_to "/"
    else
      redirect_to "/"
    end
  end


  def edit
  end

  def destroy
  end
end
