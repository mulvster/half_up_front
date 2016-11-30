class MilestoneDatesNowStrings < ActiveRecord::Migration
  def change
    change_column :milestones, :start_date, :string
    change_column :milestones, :end_date, :string
    change_column :milestones, :created_at, :datetime
    change_column :milestones, :updated_at, :datetime
  end
end
