class AddMilestonesToJobs < ActiveRecord::Migration
  def change
    remove_column :milestones, :job_id, :integer
    add_reference(:milestones, :job, index: true, foreign_key: true)
  end
end
