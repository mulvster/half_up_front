class MilestoneDatesNowString < ActiveRecord::Migration
  def self.up
    change_column :milestones, :created_at, :string
    change_column :milestones, :updated_at, :string
  end
  def self.down
    change_column :milestones, :created_at, :datetime
    change_column :milestones, :updated_at, :datetime
  end
end
