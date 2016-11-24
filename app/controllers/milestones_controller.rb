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

  def update
    milestone = Milestone.find(params[:id])
    milestone.name = params[:name]
    milestone.start_date = params[:start_date]
    milestone.end_date = params[:end_date]
    milestone.requirements_summary = params[:requirements_summary]
    milestone.save
    render json: ""
  end

  def destroy
    @milestone = Milestone.find(params[:id])
    @milestone.destroy
    flash[:notice] = "Milestone Deleted"
  end
end
