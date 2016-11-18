class CreateJobs < ActiveRecord::Migration
  def change
    create_table :jobs do |t|
      t.integer :employer_id
      t.integer :freelancer_id
      t.datetime :date_initiated
      t.datetime :start_date
      t.datetime :end_date
      t.text :contract_text
      t.binary :contract_pdf
      t.boolean :contract_signed
      t.boolean :contract_completed
      t.text :employer_review
      t.integer :employer_rating
      t.text :freelancer_review
      t.integer :freelancer_rating

      t.timestamps null: false
    end
  end
end
