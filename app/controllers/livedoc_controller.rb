class LivedocController < WebsocketRails::BaseController
  def initialize_session
    # perform application setup here
    controller_store[:message_count] = 0
  end
  def hello
    Viewer.increment_counter(:count,1)
    @count = Viewer.first.count
    WebsocketRails[:updates].trigger(:update, @count)
  end

  def goodbye
    Viewer.decrement_counter(:count,1)
    @count = Viewer.first.count
    WebsocketRails[:updates].trigger(:update, @count)
  end

  def event_name
  new_message = {:message => 'this is a message'}
  send_message :event_name, new_message
  end

  def key_press
  end


end
