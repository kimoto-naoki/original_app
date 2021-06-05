class Player < ApplicationRecord
  validates  :life, :strength, :skill,     presence: true

  belongs_to :user
  has_one :item
  has_one :ability
end
