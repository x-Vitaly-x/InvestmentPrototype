require 'test_helper'

class HomeControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  # tests if the application starts at all
  test "should get index if user offline" do
    get root_path
    assert_response :success
  end

  # tests if application starts if user is signed in
  test "should get index if user online" do
    @user = users(:sample_user_1)
    sign_in @user

    get root_path
    assert_response :success
  end

end
