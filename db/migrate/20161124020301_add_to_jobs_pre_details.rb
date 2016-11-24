class AddToJobsPreDetails < ActiveRecord::Migration
  def change
    add_column :jobs, :brief, :string
    add_column :jobs, :objective, :string
    add_column :jobs, :project_type, :string
    add_column :jobs, :pre_price, :string
    add_column :jobs, :website_size, :string
    add_column :jobs, :photos, :string
    add_column :jobs, :designer, :string
    add_column :jobs, :seo, :string
    add_column :jobs, :domain, :string
    add_column :jobs, :hosting, :string
    add_column :jobs, :analytics, :string
    add_column :jobs, :ecommerce, :string
    add_column :jobs, :cms, :string
  end
end
