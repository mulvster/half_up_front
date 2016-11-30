class JobsBudgetFieldRename < ActiveRecord::Migration
  def self.up
    remove_column :jobs, :final_budget
  end

  def self.down
    add_column :jobs, :budget
  end
end
