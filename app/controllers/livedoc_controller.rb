class LivedocController < WebsocketRails::BaseController


  def initialize_session
    # perform application setup here
  end
  # {
  #   field: 'details',
  #   text: $(this).text()
  # }

  # re-entering these in case we need them
  # def update_title
  #   puts "LivedocCont update_title"
  #   broadcast_message :replace_title, message[:title]
  # end

  # # { details: event.target.innerText }
  # def update_details
  #   puts "LivedocCont update_details"
  #   broadcast_message :replace_details, message[:details]
  # end

  def update
    puts "made it to update function"
    # broadcast_message broadcast_key, message[:text]
    # broadcast_message broadcast_key, {text: message[:text], field: 'name'}
    broadcast_message 'replace_field', {field: message[:field], text: message[:text], idMilestone: message[:idMilestone], idRequirement: message[:idRequirement]}
  end

  def updatemilestone
    puts "made it to update milestone"
    broadcast_message 'new_milestone', {milestoneid: message[:milestoneid]}
  end

  def updaterequirement
    broadcast_message 'new_requirement', {requirementid: message[:requirementid]}
  end

  def destroymilestone
    broadcast_message 'bye_milestone', {milestone: message[:milestone]}
  end
  # evntually add id so that we can do it through unique milestones??
  # def post_message
  #   broadcast_message :receive_message, message[:content]
  # end
end
