require "test_helper"

class Api::PostsControllerTest < ActionDispatch::IntegrationTest
  FileUtils.mkdir_p(Rails.root.join('test', 'fixtures', 'files'))

  test_image_path = Rails.root.join('test', 'fixtures', 'files', 'test_image.jpg')
  unless File.exist?(test_image_path)
    FileUtils.touch(test_image_path)
  end

  setup do
    @post = posts(:one)

    test_image_path = Rails.root.join('test', 'fixtures', 'files', 'test_image.jpg')
    File.write(test_image_path, "dummy image content") unless File.exist?(test_image_path)

    @test_image = fixture_file_upload(test_image_path, 'image/jpeg')
  end

  test "should get index" do
    get api_posts_path, as: :json
    assert_response :success

    json_response = JSON.parse(response.body)
    assert_instance_of Array, json_response
    assert_equal Post.count, json_response.length
  end

  test "should show post" do
    get api_post_path(@post), as: :json
    assert_response :success

    json_response = JSON.parse(response.body)
    assert_equal @post.id, json_response["id"]
    assert_equal @post.location, json_response["location"]
    assert_equal @post.content, json_response["content"]
    assert_equal @post.lat, json_response["lat"]
    assert_equal @post.lng, json_response["lng"]
    assert_equal @post.contact, json_response["contact"]
  end

  test "should create post" do
    assert_difference("Post.count") do
      post api_posts_path, params: {
        post: {
          location: "Test Location",
          content: "Test Content",
          lat: "51.5074",
          lng: "0.1278",
          contact: "contact@test.com",
          attachments: [@test_image]
        }
      }, headers: { "Content-Type" => "multipart/form-data" }
    end

    assert_response :created

    json_response = JSON.parse(response.body)
    assert_equal "Test Location", json_response["location"]
    assert_equal "Test Content", json_response["content"]
    assert_equal "51.5074", json_response["lat"]
    assert_equal "0.1278", json_response["lng"]
    assert_equal "contact@test.com", json_response["contact"]
    assert_instance_of Array, json_response["attachments"]
    assert_equal 1, json_response["attachments"].length
  end

  test "should not create post with invalid params" do
    assert_no_difference("Post.count") do
      post api_posts_path, params: {
        post: {
          location: "",
          content: "Test Content",
          lat: "51.5074",
          lng: "0.1278",
          contact: "contact@test.com"
        }
      }
    end

    assert_response :unprocessable_entity

    json_response = JSON.parse(response.body)
    assert_includes json_response["errors"], "Location can't be blank"
  end

  test "should update post" do
    patch api_post_path(@post), params: {
      post: {
        location: "Updated Location",
        content: "Updated Content",
        lat: "48.8566",
        lng: "2.3522",
        contact: "updated@test.com"
      }
    }

    assert_response :success

    @post.reload
    assert_equal "Updated Location", @post.location
    assert_equal "Updated Content", @post.content
    assert_equal "48.8566", @post.lat
    assert_equal "2.3522", @post.lng
    assert_equal "updated@test.com", @post.contact
  end

  test "should not update post with invalid params" do
    patch api_post_path(@post), params: {
      post: {
        location: "",
        content: "Updated Content"
      }
    }

    assert_response :unprocessable_entity

    json_response = JSON.parse(response.body)
    assert_includes json_response["errors"], "Location can't be blank"
  end

  test "should destroy post" do
    assert_difference("Post.count", -1) do
      delete api_post_path(@post)
    end

    assert_response :success

    json_response = JSON.parse(response.body)
    assert_equal "Post deleted successfully", json_response["message"]
  end

  test "should return not found for non-existent post" do
    get api_post_path(id: 9999)
    assert_response :not_found

    json_response = JSON.parse(response.body)
    assert_equal "Post not found", json_response["error"]
  end
end
