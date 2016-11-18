class CreateRequirements < ActiveRecord::Migration
  def change
    create_table :requirements do |t|
      t.string :name
      t.text :details
      t.boolean :renegotiable
      t.integer :milestone_id

      t.timestamps null: false
    end
  end
end
