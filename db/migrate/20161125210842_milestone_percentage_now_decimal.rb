class MilestonePercentageNowDecimal < ActiveRecord::Migration
  def self.up
    change_column :milestones, :payment_percentage, :decimal, scale: 1
  end
  def self.down
    change_column :milestones, :payment_percentage, :integer
  end
end
