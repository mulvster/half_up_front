class LivedocController < WebsocketRails::BaseController
  def initialize_session
    # perform application setup here
  end

  def update_title
    broadcast_message :replace_title, message[:title]
  end

  # { details: event.target.innerText }
  def update_details
    broadcast_message :replace_details, message[:details]
  end



  # {
  #   field: 'details',
  #   text: $(this).text()
  # }
  def update
    # broadcast_message broadcast_key, message[:text]
    # broadcast_message broadcast_key, {text: message[:text], field: 'name'}
    broadcast_message 'replace_field', {field: message[:field], text: message[:text]}
  end

  # evntually add id so that we can do it through unique milestones??
  # def post_message
  #   broadcast_message :receive_message, message[:content]
  # end
end
