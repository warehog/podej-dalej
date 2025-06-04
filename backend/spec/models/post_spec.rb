require 'rails_helper'

RSpec.describe Post, type: :model do
  describe 'validations' do
    let(:post) { create(:post) }

    it 'is valid with valid attributes' do
      expect(post).to be_valid
    end

    it 'is invalid without location' do
      post.location = nil
      expect(post).to_not be_valid
    end

    it 'is invalid without content' do
      post.content = nil
      expect(post).to_not be_valid
    end

    it 'is invalid without lat' do
      post.lat = nil
      expect(post).to_not be_valid
    end

    it 'is invalid without lng' do
      post.lng = nil
      expect(post).to_not be_valid
    end

    it 'adds error if post is created within the restricted time' do
      post.save

      delay = 60
      ENV['CREATE_POST_DELAY_SECOND'] = delay.to_s

      post2 = build(:post, created_at: Time.now)
      expect(post2).to_not be_valid
      expect(post2.errors[:base]).to include("You can only create one post per #{delay} seconds")
    end

    it 'allows posts after the delay period' do
      post.save

      delay = 60
      ENV['CREATE_POST_DELAY_SECOND'] = delay.to_s

      travel_to(61.seconds.from_now) do
        post2 = build(:post)
        expect(post2).to be_valid
      end
    end

    it 'validates the number of attachments' do
      post.attachments = [fixture_file_upload('spec/fixtures/files/image.jpg')] * 6
      expect(post).to_not be_valid
      expect(post.errors[:attachments]).to include("You can upload up to 5 files only")
    end

    it 'validates the content type of attachments' do
      post.attachments = [
        fixture_file_upload('spec/fixtures/files/invalid_file.txt'),
        fixture_file_upload('spec/fixtures/files/image.jpg')
      ]
      expect(post).to_not be_valid
      expect(post.errors[:attachments]).to include("Only JPEG, PNG images and MP4 videos are allowed")
    end

    it 'is valid with the correct content type of attachments' do
      post.attachments = [
        fixture_file_upload('spec/fixtures/files/image.jpg'),
        fixture_file_upload('spec/fixtures/files/video.mp4')
      ]
      expect(post).to be_valid
    end
  end
end
