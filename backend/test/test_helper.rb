ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require "rails/test_help"

class ActiveSupport::TestCase
  # Run tests in parallel with specified workers
  parallelize(workers: :number_of_processors)

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Include ActionDispatch::TestProcess for fixture_file_upload
  include ActionDispatch::TestProcess

  # Add more helper methods to be used by all tests here...
end

class ActionDispatch::IntegrationTest
  include ActionDispatch::TestProcess
end
