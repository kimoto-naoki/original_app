FactoryBot.define do
  factory :user do
    player_name              {'test'}
    password              {'aaa111'}
    password_confirmation {password}
# association :
  end
end