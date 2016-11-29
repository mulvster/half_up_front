class JobsController < ApplicationController
  def create

    @user = User.find params[:id]
    employerid = current_user.id
    @job = Job.new()
    @job.freelancer_id = @user.id
    @job.employer_id = employerid
    if @job.save
      #session[:job_id] = job.id
      redirect_to edit_job_path(@job)
    else
      redirect_to edit_job_path(@job)
    end
  end


  def show
    @job = Job.find(params[:id])

  end

  def new
    @job = Job.new
  end

  def edit
    @job = Job.find(params[:id])
  end

  def update
  @job = Job.find(params[:id])
  @job.update(job_params)
  @job.save
  redirect_to job_path(@job)
  end



  def destroy
  end

  private

  def job_params
    params.require(:jobs).permit(:contract_text, :created_at, :budget, :brief, :objective, :project_type, :pre_price, :website_size, :photos, :designer, :seo, :domain, :hosting, :analytics, :ecommerce, :cms, :website_examples, :job_details)
  end
end
