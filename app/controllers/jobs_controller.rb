class JobsController < ApplicationController
  def create
    job = Job.new(job_params)
    if job.save
      #session[:job_id] = job.id
      redirect_to job_path(job)
    else
      redirect_to new_job_path/
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
    params.require(:jobs).permit(:contract_text, :created_at, :brief, :objective, :project_type, :pre_price, :website_size, :photos, :designer, :seo, :domain, :hosting, :analytics, :ecommerce, :cms, :website_examples, :job_details)
  end

end
