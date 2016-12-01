class User < ActiveRecord::Base
  has_secure_password

  def self.authenticate_with_credentials(email, password)
    user = User.find_by(email: email.downcase.strip).try(:authenticate, password)
    return user
  end


  def self.from_omniauth(auth_hash)
    user = find_or_create_by(uid: auth_hash['uid'], provider: auth_hash['provider'])
    user.first_name = auth_hash['info']['first_name']
    user.last_name = auth_hash['info']['last_name']
    user.email = auth_hash['info']['email']
    user.country = auth_hash['extra']['address']['country']
    user.province = auth_hash['extra']['address']['region']
    user.city = auth_hash['extra']['address']['locality']

    user.password = SecureRandom.urlsafe_base64
    user.uid = auth_hash['uid']
    user.save!
    user
  end
end
