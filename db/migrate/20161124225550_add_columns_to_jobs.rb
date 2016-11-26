class AddColumnsToJobs < ActiveRecord::Migration
  def change
  	add_column :jobs, :website_examples, :string
  	add_column :jobs, :job_details, :string
  end
end
