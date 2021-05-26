class User < ApplicationRecord
  validates :player_name,     presence: true
  validates :password,        presence: true, length:{ minimum: 6 }, format: { with: /\A(?=.*?[a-z])(?=.*?\d)[a-z\d]+\z/i }
  validates :password_confirmation, presence: true

  has_secure_password
end
