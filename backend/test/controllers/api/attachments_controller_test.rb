require "test_helper"

class Api::AttachmentsControllerTest < ActionDispatch::IntegrationTest
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

    @post.attachments.attach(@test_image)
    @attachment = @post.attachments.first
  end

  test "should destroy attachment" do
    assert_difference -> { @post.attachments.count }, -1 do
      delete api_post_attachment_path(@post, @attachment)
    end

    assert_response :success

    json_response = JSON.parse(response.body)
    assert_equal "Attachment deleted successfully", json_response["message"]
  end

  test "should return not found for non-existent attachment" do
    delete api_post_attachment_path(@post, id: 9999)
    assert_response :not_found
  end
end
