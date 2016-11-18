class CreateAttachments < ActiveRecord::Migration
  def change
    create_table :attachments do |t|
      t.string :name
      t.text :description
      t.binary :data
      t.integer :milestone_id

      t.timestamps null: false
    end
  end
end
