require "test_helper"

class PostTest < ActiveSupport::TestCase
  FileUtils.mkdir_p(Rails.root.join('test', 'fixtures', 'files'))

  test_image_path = Rails.root.join('test', 'fixtures', 'files', 'test_image.jpg')
  test_png_path = Rails.root.join('test', 'fixtures', 'files', 'test_image.png')
  test_video_path = Rails.root.join('test', 'fixtures', 'files', 'test_video.mp4')
  test_pdf_path = Rails.root.join('test', 'fixtures', 'files', 'test_file.pdf')

  [[test_image_path, 'image/jpeg'],
   [test_png_path, 'image/png'],
   [test_video_path, 'video/mp4'],
   [test_pdf_path, 'application/pdf']].each do |path, content_type|
    unless File.exist?(path)
      FileUtils.touch(path)
      File.open(path, 'w') do |f|
        f.write("Test file with content type: #{content_type}")
      end
    end
  end

  setup do
    @post = Post.new(
      location: "Test Location",
      content: "Test Content",
      lat: "51.5074",
      lng: "0.1278",
      contact: "test@example.com"
    )

    test_image_path = Rails.root.join('test', 'fixtures', 'files', 'test_image.jpg')
    test_png_path = Rails.root.join('test', 'fixtures', 'files', 'test_image.png')
    test_video_path = Rails.root.join('test', 'fixtures', 'files', 'test_video.mp4')
    test_pdf_path = Rails.root.join('test', 'fixtures', 'files', 'test_file.pdf')

    @test_image = fixture_file_upload(test_image_path, 'image/jpeg')
    @test_png = fixture_file_upload(test_png_path, 'image/png')
    @test_video = fixture_file_upload(test_video_path, 'video/mp4')
    @test_pdf = fixture_file_upload(test_pdf_path, 'application/pdf')
  end

  test "valid post" do
    assert @post.valid?
  end

  test "invalid without location" do
    @post.location = nil
    assert_not @post.valid?
    assert_includes @post.errors[:location], "can't be blank"
  end

  test "invalid without content" do
    @post.content = nil
    assert_not @post.valid?
    assert_includes @post.errors[:content], "can't be blank"
  end

  test "invalid without latitude" do
    @post.lat = nil
    assert_not @post.valid?
    assert_includes @post.errors[:lat], "can't be blank"
  end

  test "invalid without longitude" do
    @post.lng = nil
    assert_not @post.valid?
    assert_includes @post.errors[:lng], "can't be blank"
  end

  test "invalid without contact" do
    @post.contact = nil
    assert_not @post.valid?
    assert_includes @post.errors[:contact], "can't be blank"
  end

  test "can have up to 5 attachments" do
    5.times do
      @post.attachments.attach(@test_image)
    end
    assert @post.valid?
  end

  test "cannot have more than 5 attachments" do
    6.times do
      @post.attachments.attach(@test_image)
    end
    assert_not @post.valid?
    assert_includes @post.errors[:attachments], "You can upload up to 5 files only"
  end

  test "accepts jpeg image attachments" do
    @post.attachments.attach(@test_image)
    assert @post.valid?
  end

  test "accepts png image attachments" do
    @post.attachments.attach(@test_png)
    assert @post.valid?
  end

  test "accepts mp4 video attachments" do
    @post.attachments.attach(@test_video)
    assert @post.valid?
  end

  test "rejects invalid file types" do
    @post.attachments.attach(@test_pdf)
    assert_not @post.valid?
    assert_includes @post.errors[:attachments], "Only JPEG, PNG images and MP4 videos are allowed"
  end

  test "fixtures are valid" do
    Post.all.each do |post|
      assert post.valid?, "Fixture post #{post.id} is not valid: #{post.errors.full_messages.join(', ')}"
    end
  end

  # Uncomment this test when the one_post_per_minute validation is enabled
  # test "cannot create more than one post per minute" do
  #   assert @post.save
  #
  #   second_post = Post.new(
  #     location: "Another Location",
  #     content: "Another Content",
  #     lat: "51.5074",
  #     lng: "0.1278",
  #     contact: "another@example.com"
  #   )
  #
  #   assert_not second_post.valid?
  #   assert_includes second_post.errors[:base], "You can only create one post per minute"
  # end
end
