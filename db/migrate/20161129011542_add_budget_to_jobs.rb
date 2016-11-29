class AddBudgetToJobs < ActiveRecord::Migration
  def change
    add_column :jobs, :budget, :integer, :default => 0
  end
end
