Job.create!([
  {employer_id: nil, freelancer_id: nil, date_initiated: nil, start_date: nil, end_date: nil, contract_text: nil, contract_pdf: nil, final_budget: nil, contract_signed: nil, contract_completed: nil, employer_review: nil, employer_rating: nil, freelancer_review: nil, freelancer_rating: nil, brief: nil, objective: nil, project_type: "new", pre_price: "flexible", website_size: "large", photos: "no", designer: "yes", seo: "no", domain: "yes", hosting: "yes", analytics: "no", ecommerce: "yes", cms: "no", website_examples: nil, job_details: nil},
  {employer_id: nil, freelancer_id: nil, date_initiated: nil, start_date: nil, end_date: nil, contract_text: nil, contract_pdf: nil, final_budget: nil, contract_signed: nil, contract_completed: nil, employer_review: nil, employer_rating: nil, freelancer_review: nil, freelancer_rating: nil, brief: nil, objective: nil, project_type: nil, pre_price: nil, website_size: nil, photos: "no", designer: "no", seo: "no", domain: "no", hosting: "no", analytics: "no", ecommerce: "no", cms: "no", website_examples: nil, job_details: nil},
  {employer_id: nil, freelancer_id: nil, date_initiated: nil, start_date: nil, end_date: nil, contract_text: nil, contract_pdf: nil, final_budget: nil, contract_signed: nil, contract_completed: nil, employer_review: nil, employer_rating: nil, freelancer_review: nil, freelancer_rating: nil, brief: nil, objective: nil, project_type: "new", pre_price: "flexible", website_size: nil, photos: "no", designer: "yes", seo: "yes", domain: "no", hosting: "yes", analytics: "yes", ecommerce: "yes", cms: "yes", website_examples: nil, job_details: nil},
  {employer_id: nil, freelancer_id: nil, date_initiated: nil, start_date: nil, end_date: nil, contract_text: nil, contract_pdf: nil, final_budget: nil, contract_signed: nil, contract_completed: nil, employer_review: nil, employer_rating: nil, freelancer_review: nil, freelancer_rating: nil, brief: "testing brief", objective: "testing on friday objective", project_type: "new", pre_price: "flexible", website_size: "small", photos: "no", designer: "yes", seo: "no", domain: "no", hosting: "yes", analytics: "yes", ecommerce: "yes", cms: "yes", website_examples: "http://facebook.com", job_details: "This is friday test of last details."},
  {employer_id: nil, freelancer_id: nil, date_initiated: nil, start_date: nil, end_date: nil, contract_text: nil, contract_pdf: nil, final_budget: nil, contract_signed: nil, contract_completed: nil, employer_review: nil, employer_rating: nil, freelancer_review: nil, freelancer_rating: nil, brief: "", objective: "", project_type: "new", pre_price: "flexible", website_size: nil, photos: "no", designer: "yes", seo: "no", domain: "yes", hosting: "no", analytics: "yes", ecommerce: "no", cms: "no", website_examples: "http://facebook.com", job_details: "dgsdfgfsdg"},
  {employer_id: nil, freelancer_id: nil, date_initiated: nil, start_date: nil, end_date: nil, contract_text: nil, contract_pdf: nil, final_budget: nil, contract_signed: nil, contract_completed: nil, employer_review: nil, employer_rating: nil, freelancer_review: nil, freelancer_rating: nil, brief: "is this working", objective: "hasdjkfhasdlkfasds", project_type: "new", pre_price: "flexible", website_size: "medium", photos: "yes", designer: "no", seo: "no", domain: "no", hosting: "yes", analytics: "no", ecommerce: "yes", cms: "no", website_examples: "http://www.facebook.com", job_details: "asdfasdfasdfasdf"},
  {employer_id: 25, freelancer_id: nil, date_initiated: nil, start_date: nil, end_date: nil, contract_text: nil, contract_pdf: nil, final_budget: nil, contract_signed: nil, contract_completed: nil, employer_review: nil, employer_rating: nil, freelancer_review: nil, freelancer_rating: nil, brief: "hello", objective: "is this working", project_type: "new", pre_price: "fixed", website_size: "medium", photos: "no", designer: "no", seo: "no", domain: "yes", hosting: "yes", analytics: "no", ecommerce: "yes", cms: "yes", website_examples: "dsfgdfsgsdfgsfdgfd", job_details: "adgdsgsfdgsdfgsdfg"},
  {employer_id: 25, freelancer_id: nil, date_initiated: nil, start_date: nil, end_date: nil, contract_text: nil, contract_pdf: nil, final_budget: nil, contract_signed: nil, contract_completed: nil, employer_review: nil, employer_rating: nil, freelancer_review: nil, freelancer_rating: nil, brief: "123", objective: "123", project_type: "new", pre_price: "fixed", website_size: "medium", photos: "no", designer: "yes", seo: "no", domain: "no", hosting: "yes", analytics: "no", ecommerce: "no", cms: "no", website_examples: "123", job_details: "123"},
  {employer_id: 25, freelancer_id: 24, date_initiated: nil, start_date: nil, end_date: nil, contract_text: nil, contract_pdf: nil, final_budget: nil, contract_signed: nil, contract_completed: nil, employer_review: nil, employer_rating: nil, freelancer_review: nil, freelancer_rating: nil, brief: "123", objective: "123", project_type: "new", pre_price: "flexible", website_size: "medium", photos: "no", designer: "yes", seo: "no", domain: "no", hosting: "yes", analytics: "no", ecommerce: "yes", cms: "no", website_examples: "", job_details: ""},
  {employer_id: nil, freelancer_id: nil, date_initiated: nil, start_date: nil, end_date: nil, contract_text: nil, contract_pdf: nil, final_budget: nil, contract_signed: nil, contract_completed: nil, employer_review: nil, employer_rating: nil, freelancer_review: nil, freelancer_rating: nil, brief: "fafdsfdfdsaf", objective: "asdfdsafdasfa", project_type: "new", pre_price: "fixed", website_size: "medium", photos: "no", designer: "no", seo: "yes", domain: "yes", hosting: "yes", analytics: "no", ecommerce: "yes", cms: "yes", website_examples: "http://www.facebook.com", job_details: "dasfafasdfasdfadsfdsa"}
])
Milestone.create!([
  {name: "sdafasdfdsafdfdsaf", start_date: nil, end_date: nil, payment_percentage: nil, payment_renegotiable: nil, requirements_summary: "", milestone_elaboration: nil, all_requirements_renegotiable: nil, job_id: 13, completed: nil},
  {name: nil, start_date: nil, end_date: nil, payment_percentage: nil, payment_renegotiable: nil, requirements_summary: nil, milestone_elaboration: nil, all_requirements_renegotiable: nil, job_id: 13, completed: nil},
  {name: nil, start_date: nil, end_date: nil, payment_percentage: nil, payment_renegotiable: nil, requirements_summary: nil, milestone_elaboration: nil, all_requirements_renegotiable: nil, job_id: 16, completed: nil},
  {name: nil, start_date: nil, end_date: nil, payment_percentage: nil, payment_renegotiable: nil, requirements_summary: nil, milestone_elaboration: nil, all_requirements_renegotiable: nil, job_id: 16, completed: nil},
  {name: nil, start_date: nil, end_date: nil, payment_percentage: nil, payment_renegotiable: nil, requirements_summary: nil, milestone_elaboration: nil, all_requirements_renegotiable: nil, job_id: 17, completed: nil},
  {name: "dafdafdafda", start_date: nil, end_date: nil, payment_percentage: nil, payment_renegotiable: nil, requirements_summary: "afadfsadfs", milestone_elaboration: nil, all_requirements_renegotiable: nil, job_id: 17, completed: nil}
])
Requirement.create!([
  {name: "fgsfgfs", details: "sfgfsgsgfdg", renegotiable: nil, milestone_id: 1},
  {name: "dfadfadsfadsf", details: "adfadfasdfsd", renegotiable: nil, milestone_id: 6}
])
User.create!([
  {first_name: "Freddy", last_name: "Freelancer", profile_image: nil, city: "Toronto", province: "Ontario", country: "CA", summary: nil, hourly_rate: nil, paypal_acct: nil, description: nil, email: "april.mulvey@gmail.com", password_digest: "$2a$10$RAEvldDWKgQvLVUm9qddju5cYhuz4gn2BDsKprfTutBmKoq1G8Di.", user_type: nil, company_name: nil, company_url: nil, job_title: nil, stack: nil, git: nil, linked_in: nil, personal_url: nil, uid: nil, provider: "paypal"},
  {first_name: "Justin", last_name: "Mulvey", profile_image: nil, city: "Edmonton", province: "Alberta", country: "CA", summary: "Here is my summary I am a cool employer.", hourly_rate: 25, paypal_acct: nil, description: nil, email: "april.mulvey@gmail.com", password_digest: "$2a$10$rJBvhPF.mlWFLyou/Bez8.hJGO0un.KJsGN5Ur.kRq.sC8Cds9fkm", user_type: "Employer", company_name: nil, company_url: nil, job_title: nil, stack: nil, git: "http://www.facebook.com/mulvster", linked_in: "http://www.soccer.com", personal_url: nil, uid: nil, provider: "paypal"},
  {first_name: "April", last_name: "Mulvey", profile_image: nil, city: "Toronto", province: "Ontario", country: "CA", summary: "adgagafdgsdfgfdsgsfdgfsdgfdgs", hourly_rate: 60, paypal_acct: nil, description: nil, email: "april.mulvey@gmail.com", password_digest: "$2a$10$H/XeUNjqQuwTAo6JS6QuWuxGlMh4ZvjrXXfdFIiTX2K5nh3CZD20a", user_type: "Employer", company_name: nil, company_url: nil, job_title: nil, stack: nil, git: "http://www.github.com/mulvster", linked_in: "http://www.linkedin.com/aprilmulvey", personal_url: nil, uid: nil, provider: "paypal"},
  {first_name: "Edna", last_name: "Employer", profile_image: nil, city: "Toronto", province: "Ontario", country: "CA", summary: nil, hourly_rate: nil, paypal_acct: nil, description: nil, email: "justin.b.tsang@gmail.com", password_digest: "$2a$10$8azJuAr2rnUyKYPXYCHk6ug92IZ3ZpXoP6FuqNzFR3J/8ETKJ.Ys2", user_type: nil, company_name: nil, company_url: nil, job_title: nil, stack: nil, git: nil, linked_in: nil, personal_url: nil, uid: nil, provider: "paypal"}
])
