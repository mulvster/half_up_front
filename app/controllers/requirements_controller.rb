class RequirementsController < ApplicationController
  def create
    milestone = Milestone.find params[:milestone_id]
    requirement = milestone.requirements.new()
     if requirement.save
      render json: milestone
    else
      render nothing: true, status: 400
    end
  end
end


