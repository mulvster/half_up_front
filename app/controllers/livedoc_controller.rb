class LivedocController < WebsocketRails::BaseController
  def initialize_session
    # perform application setup here
  end
  def update_title
    broadcast_message :replace_title, message[:title]
  end

  def update_details
    broadcast_message :replace_details, message[:details]
  end
end
