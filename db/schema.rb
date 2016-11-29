# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.


ActiveRecord::Schema.define(version: 20161129002126) do


  create_table "attachments", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.binary   "data"
    t.integer  "milestone_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "chat_logs", force: :cascade do |t|
    t.text     "text"
    t.datetime "time_stamp"
    t.integer  "job_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "comments", force: :cascade do |t|
    t.text     "text"
    t.integer  "requirement_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "jobs", force: :cascade do |t|
    t.integer  "employer_id"
    t.integer  "freelancer_id"
    t.string   "date_initiated"
    t.string   "start_date"
    t.string   "end_date"
    t.text     "contract_text"
    t.binary   "contract_pdf"
    t.boolean  "contract_signed"
    t.boolean  "contract_completed"
    t.text     "employer_review"
    t.integer  "employer_rating"
    t.text     "freelancer_review"
    t.integer  "freelancer_rating"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "brief"
    t.string   "objective"
    t.string   "project_type"
    t.string   "pre_price"
    t.string   "website_size"
    t.string   "photos"
    t.string   "designer"
    t.string   "seo"
    t.string   "domain"
    t.string   "hosting"
    t.string   "analytics"
    t.string   "ecommerce"
    t.string   "cms"
    t.string   "website_examples"
    t.string   "job_details"
  end

  create_table "milestones", force: :cascade do |t|
    t.string   "name"
    t.string   "start_date"
    t.string   "end_date"
    t.decimal  "payment_percentage",            precision: 4, scale: 1
    t.boolean  "payment_renegotiable"
    t.text     "requirements_summary"
    t.text     "milestone_elaboration"
    t.boolean  "all_requirements_renegotiable"
    t.integer  "job_id"
    t.boolean  "completed"
    t.datetime "created_at",                                            null: false
    t.datetime "updated_at",                                            null: false
  end

  create_table "requirements", force: :cascade do |t|
    t.string   "name"
    t.text     "details"
    t.boolean  "renegotiable"
    t.integer  "milestone_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.binary   "profile_image"
    t.string   "city"
    t.string   "province"
    t.string   "country"
    t.text     "summary"
    t.integer  "hourly_rate"
    t.string   "paypal_acct"
    t.text     "description"
    t.string   "email"
    t.string   "password_digest"
    t.string   "user_type"
    t.string   "company_name"
    t.string   "company_url"
    t.string   "job_title"
    t.text     "stack"
    t.string   "git"
    t.string   "linked_in"
    t.string   "personal_url"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "uid"
    t.string   "provider"
  end

end
