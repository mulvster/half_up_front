class CreateChatLogs < ActiveRecord::Migration
  def change
    create_table :chat_logs do |t|
      t.text :text
      t.datetime :time_stamp
      t.integer :job_id

      t.timestamps null: false
    end
  end
end
