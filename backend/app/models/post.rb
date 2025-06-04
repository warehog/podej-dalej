class Post < ApplicationRecord
  has_many_attached :attachments

  validates :location, presence: true
  validates :content, presence: true
  validates :lat, presence: true
  validates :lng, presence: true
  validates :contact, presence: true
  # TODO: disable it for the time being - enable when in production
  # validate :one_post_per_minute
  validate :validate_attachments

  private

  def one_post_per_minute
    recent_post = Post.where("created_at >= ?", 1.minute.ago).exists?
    errors.add(:base, "You can only create one post per minute") if recent_post
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
