class RequirementsController < ApplicationController
  def create
    milestone = Milestone.find params[:milestone_id]
    requirement = milestone.requirements.new()
     if requirement.save
      render json: requirement
    else
      render nothing: true, status: 400
    end
  end
end


