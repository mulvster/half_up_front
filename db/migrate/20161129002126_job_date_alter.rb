class JobDateAlter < ActiveRecord::Migration
  def change
    change_column :jobs, :date_initiated, :string
    change_column :jobs, :start_date, :string
    change_column :jobs, :end_date, :string
  end
end
