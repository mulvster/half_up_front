class RequirementsController < ApplicationController
  def create
    puts "made it to requirements controller"
    milestone = Milestone.find params[:milestone_id]
    requirement = milestone.requirements.new()
     if requirement.save
      render json: requirement
    else
      render json: requirement.errors, status: 400
    end
  end
end


