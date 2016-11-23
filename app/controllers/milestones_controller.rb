class MilestonesController < ApplicationController
  def create
    job = Job.find(params[:job_id])
    milestone = Milestone.new()
    milestone.job = job
    if milestone.save
      render json: milestone
    else
      render nothing: true, status: 400
    end
  end


  def edit
  end

  def destroy
  end
end
