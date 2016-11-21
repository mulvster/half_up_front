class TokensController < ApplicationController


  def get_token
    Twilio::Util::AccessToken.new(
        ENV['ACCOUNT_SID'],
        ENV['API_KEY_SID'],
        ENV['API_KEY_SECRET'],
        3600,
        current_user.last_name
    )
  end

  def get_grant
    grant = Twilio::Util::AccessToken::IpMessagingGrant.new
    grant.endpoint_id = "Chatty:#{current_user.last_name.gsub(" ", "_")}:browser"
    grant.service_sid = ENV['IPM_SERVICE_SID']
    grant
  end

  def create
    token = get_token
    grant = get_grant
    token.add_grant(grant)
    render json: {username: current_user.last_name, token: token.to_jwt}
  end
end

