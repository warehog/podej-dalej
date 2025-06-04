FactoryBot.define do
  factory :post do
    location { Faker::Address.city }
    content { Faker::Lorem.paragraph }
    lat { Faker::Address.latitude }
    lng { Faker::Address.longitude }
    contact { Faker::Internet.email }

    after(:build) do |post|
      post.attachments.attach(io: File.open(Rails.root.join('spec', 'fixtures', 'files', 'image.jpg')), filename: 'image.jpg', content_type: 'image/jpeg')
    end
  end
end