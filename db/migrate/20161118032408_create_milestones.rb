class CreateMilestones < ActiveRecord::Migration
  def change
    create_table :milestones do |t|
      t.string :name
      t.string :start_date
      t.string :end_date
      t.integer :payment_percentage
      t.boolean :payment_renegotiable
      t.text :requirements_summary
      t.text :milestone_elaboration
      t.boolean :all_requirements_renegotiable
      t.integer :job_id
      t.boolean :completed

      t.timestamps null: false
    end
  end
end
