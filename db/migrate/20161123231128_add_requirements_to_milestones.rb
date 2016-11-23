class AddRequirementsToMilestones < ActiveRecord::Migration
  def change
    remove_column :requirements, :milestone_id, :integer
    add_reference(:requirements, :milestone, index: true, foreign_key: true)
  end
end
