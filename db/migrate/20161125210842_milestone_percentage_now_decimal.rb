class MilestonePercentageNowDecimal < ActiveRecord::Migration
  def self.up
    change_column :milestones, :payment_percentage, :decimal
  end
  def self.down
    change_column :milestones, :payment_percentage, :integer
  end
end
