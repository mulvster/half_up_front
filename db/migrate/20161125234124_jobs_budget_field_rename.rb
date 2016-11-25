class JobsBudgetFieldRename < ActiveRecord::Migration
  def change
    rename_column :jobs, :final_budget, :budget
  end
end
