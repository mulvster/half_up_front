WebsocketRails::EventMap.describe do
  # actions will be executed in the order they were subscribed.
  #
  # Uncomment and edit the next line to handle the client connected event:

  # subscribe :client_connected, 'livedoc#client_connected'


  # subscribe :update_title, 'livedoc#update_title'
  # subscribe :update_details, 'livedoc#update_details'
  subscribe :update, 'livedoc#update'
  subscribe :updatemilestone, 'livedoc#updatemilestone'
  subscribe :updaterequirement, 'livedoc#updaterequirement'

  #
  # Here is an example of mapping namespaced events:
end