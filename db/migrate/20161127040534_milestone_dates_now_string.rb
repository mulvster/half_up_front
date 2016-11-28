class MilestoneDatesNowString < ActiveRecord::Migration
  def self.up
    change_column :milestones, :start_date, :string
    change_column :milestones, :end_date, :string
  end
  def self.down
    change_column :milestones, :start_date, :datetime
    change_column :milestones, :end_date, :datetime
  end
end
