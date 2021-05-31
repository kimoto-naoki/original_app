class Player < ApplicationRecord
  validates  :life, :strength, :skill,     presence: true

  belongs_to :user
end
