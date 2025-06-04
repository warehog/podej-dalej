require 'rails_helper'

RSpec.describe Api::PostsController, type: :controller do
  let(:valid_attributes) do
    {
      location: "New York",
      content: "Test post content",
      lat: 40.7128,
      lng: -74.0060,
      contact: "example@example.com"
    }
  end

  let(:invalid_attributes) do
    {
      location: "",
      content: "",
      lat: nil,
      lng: nil
    }
  end

  let(:post) { create(:post, valid_attributes) }

  describe 'GET #index' do
    it 'returns a list of posts' do
      create_list(:post, 3, valid_attributes)

      get :index

      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body).length).to eq(3)
    end
  end

  describe 'GET #show' do
    it 'returns a single post' do
      get :show, params: { id: post.id }, format: :json

      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)['id']).to eq(post.id)
    end

    it 'returns an error when post is not found' do
      get :show, params: { id: 9999 }

      expect(response).to have_http_status(:not_found)
      expect(JSON.parse(response.body)['error']).to eq("Post not found")
    end
  end

  describe 'POST #create' do
    context 'with valid parameters' do
      it 'creates a new post' do
        expect {
          put :create, params: { post: valid_attributes }
        }.to change(Post, :count).by(1)

        expect(response).to have_http_status(:created)
        expect(JSON.parse(response.body)['location']).to eq('New York')
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new post' do
        expect {
          put :create, params: { post: invalid_attributes }
        }.to change(Post, :count).by(0)

        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)['errors']).to include("Location can't be blank")
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid parameters' do
      it 'updates the requested post' do
        put :update, params: { id: post.id, post: { content: 'Updated content' } }

        post.reload
        expect(post.content).to eq('Updated content')
        expect(response).to have_http_status(:ok)
      end
    end

    context 'with invalid parameters' do
      it 'does not update the post' do
        put :update, params: { id: post.id, post: { content: '' } }

        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)['errors']).to include("Content can't be blank")
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'deletes the post' do
      post_to_delete = create(:post, valid_attributes)

      expect {
        delete :destroy, params: { id: post_to_delete.id }
      }.to change(Post, :count).by(-1)

      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)['message']).to eq('Post deleted successfully')
    end

    it 'returns an error when post is not found' do
      delete :destroy, params: { id: 9999 }

      expect(response).to have_http_status(:not_found)
      expect(JSON.parse(response.body)['error']).to eq('Post not found')
    end
  end
end