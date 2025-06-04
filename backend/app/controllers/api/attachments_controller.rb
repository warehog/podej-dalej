module Api
  class AttachmentsController < ApplicationController
    def destroy
      @post = Post.find_by_id(params[:post_id])
      return render json: { error: 'Post not found' }, status: :not_found unless @post.present?

      @attachment = @post.attachments.find_by(id: params[:id])
      return render json: { error: 'Attachment not found' }, status: :not_found unless @attachment.present?

      if @attachment.purge
        render json: { message: 'Attachment deleted successfully' }, status: :ok
      else
        render json: { error: 'Failed to delete attachment' }, status: :unprocessable_entity
      end
    end
  end
end