class JobsBudgetFieldRename < ActiveRecord::Migration
  def change
    remove_column :jobs, :final_budget, :integer
    add_column :jobs, :budget, :integer, :default => 0
  end
end
