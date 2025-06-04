class Post < ApplicationRecord
  has_many_attached :attachments

  validates :location, :content, :lat, :lng, presence: true
  validate :one_post_per_minute
  validate :validate_attachments

  def generate_presigned_url(attachment)
    Rails.application.routes.url_helpers.rails_blob_url(
      attachment,
      only_path: false,
      expires_in: 1.hour,
      disposition: "inline"
    )
  end

  private

  def one_post_per_minute
    delay = ENV['CREATE_POST_DELAY_SECOND'].to_i

    return unless delay.positive?

    recent_post = Post.where("created_at >= ?", delay.second.ago).exists?
    errors.add(:base, "You can only create one post per #{delay} seconds") if recent_post
  end

  def validate_attachments
    if attachments.count > 5
      errors.add(:attachments, "You can upload up to 5 files only")
    end

    attachments.each do |attachment|
      unless attachment.content_type.in?(%w[image/jpeg image/png video/mp4])
        errors.add(:attachments, "Only JPEG, PNG images and MP4 videos are allowed")
      end
    end
  end
end
