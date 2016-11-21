class JobsController < ApplicationController
  def create
    job = Job.new(job_params)
    if job.save
      #session[:job_id] = job.id
      redirect_to job_path(job)
    else
      redirect_to new_job_path
    end
  end

  def show
    @job = Job.find(params[:id])
  end

  def new
    @job = Job.new
  end

  def edit
  end

  def destroy
  end

  private

  def job_params
    params.require(:job).permit(:contract_text, :created_at) #more later
  end

end
