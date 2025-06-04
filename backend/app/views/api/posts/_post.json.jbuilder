json.extract! post, :id, :location, :content, :lat, :lng, :contact, :created_at, :updated_at
json.attachments post.attachments do |attachment|
  blob = attachment.blob

  json.id attachment.id
  json.big_url post.generate_presigned_url(attachment.variant(resize_to_limit: [3840, 2160]))
  json.medium_url post.generate_presigned_url(attachment.variant(resize_to_limit: [1920, 1080]))
  json.small_url post.generate_presigned_url(attachment.variant(resize_to_limit: [150, 150]))
  json.type blob.content_type
  json.filename blob.filename.to_s
end
