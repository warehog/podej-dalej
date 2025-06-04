module Api
  class PostsController < ApplicationController
    before_action :set_post, only: [:show, :update, :destroy]

    def index
      @posts = Post.with_attached_attachments.order(created_at: :desc)
    end

    def show
    end

    def create
      @post = Post.new(post_params)

      if @post.save
        render :show, status: :created
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
        render :show, status: :ok
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
  end
end
