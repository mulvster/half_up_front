# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

job1 = Job.create({
  title: "Sample Job",
  start_date: "2016.12.01",
  end_date: "2016.12.31",
  contract_text: "To be done: Things specificed herein."
})

milestone1 = Milestone.create({
  name: "First Milestone",
  payment_percentage: 50,
  payment_renegotiable: true,
  requirements_summary: "Want basic website functionality",
  milestone_elaboration: "nothing",
  all_requirements_renegotiable: true,
  job_id: 1,
  completed: false
})

milestone2 = Milestone.create({
  name: "Second Milestone",
  payment_percentage: 50,
  payment_renegotiable: true,
  requirements_summary: "Want styling and navigation feature",
  milestone_elaboration: "nothing",
  all_requirements_renegotiable: true,
  job_id: 1,
  completed: false
})

milestone1.requirements.create({
  name: "adding log in",
  details: "need to log in with email",
  renegotiable: false,
  milestone_id: 1
})

milestone1.requirements.create({
  name: "paralax scroll",
  details: "must have parlax scroll on landing page",
  renegotiable: false,
  milestone_id: 1
})

milestone1.requirements.create({
  name: "sign up/log in button",
  details: "need buttons on homepage to link to above",
  renegotiable: false,
  milestone_id: 1
})

milestone2.requirements.create({
  name: "Styling",
  details: "Need to have onbrand landing page with out logo on it",
  renegotiable: false,
  milestone_id: 2
})

milestone2.requirements.create({
  name: "Security",
  details: "Need passwords to be hashed",
  renegotiable: false,
  milestone_id: 2
})

user1 = User.create({
  first_name: "Client",
  last_name: "Cassandra"
})

user2 = User.create({
  first_name: "Freddy",
  last_name: "Freelancer"
})

