class Milestone < ActiveRecord::Base
  belongs_to :job
  has_many :requirements

  accepts_nested_attributes_for :requirements
end
