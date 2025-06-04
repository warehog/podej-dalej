module Api
  class PostsController < ApplicationController
    before_action :set_post, only: [:show, :update, :destroy]

    def index
      @posts = Post.with_attached_attachments.order(created_at: :desc)
      render json: @posts.map { |post| post_data(post) }
    end

    def show
      render json: post_data(@post)
    end

    def create
      @post = Post.new(post_params)

      if @post.save
        render json: post_data(@post), status: :created
      else
        render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      if @post.destroy
        render json: { message: 'Post deleted successfully' }, status: :ok
      else
        render json: { error: 'Failed to delete post' }, status: :unprocessable_entity
      end
    end

    def update
      if @post.update(post_params)
        render json: post_data(@post), status: :ok
      else
        render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def set_post
      @post = Post.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Post not found" }, status: :not_found
    end

    def post_params
      params.require(:post).permit(:location, :content, :lat, :lng, :contact, attachments: [])
    end

    def post_data(post)
      {
        id: post.id,
        location: post.location,
        content: post.content,
        lat: post.lat,
        lng: post.lng,
        contact: post.contact,
        attachments: post.attachments.map do |attachment|
          blob = attachment.blob
          {
            id: attachment.id,
            big_url: generate_presigned_url(attachment.variant(resize_to_limit: [3840, 2160])),
            medium_url: generate_presigned_url(attachment.variant(resize_to_limit: [1920, 1080])),
            small_url: generate_presigned_url(attachment.variant(resize_to_limit: [150, 150])),
            type: blob.content_type,
            filename: blob.filename.to_s
          }
        end,
        created_at: post.created_at,
        updated_at: post.updated_at
      }
    end

    def generate_presigned_url(attachment)
      Rails.application.routes.url_helpers.rails_blob_path(
        attachment,
        only_path: true,
        expires_in: 1.hour,
        disposition: "inline"
      )
    end
  end

  class AttachmentsController < ApplicationController
    def destroy
      @post = Post.find(params[:post_id])
      @attachment = @post.attachments.find(params[:id])
      if @attachment.purge
        render json: { message: 'Attachment deleted successfully' }, status: :ok
      else
        render json: { error: 'Failed to delete attachment' }, status: :unprocessable_entity
      end
    end
  end
end
