class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.binary :profile_image
      t.string :city
      t.string :province
      t.string :country
      t.text :summary
      t.integer :hourly_rate
      t.string :paypal_acct
      t.text :description
      t.string :email
      t.string :password_digest
      t.string :user_type
      t.string :company_name
      t.string :company_url
      t.string :job_title
      t.text :stack
      t.string :git
      t.string :linked_in
      t.string :personal_url

      t.timestamps null: false
    end
  end
end
