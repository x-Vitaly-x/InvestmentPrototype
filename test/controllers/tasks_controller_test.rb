require 'test_helper'

class TasksControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @user_1 = users(:sample_user_1)
    @user_2 = users(:sample_user_2)
    sign_in @user_1

    # new task to be created
    # could not use fixtures because of @user.id parameter needs to be passed
    @correct_task_1 = Task.new(description: "Testing correct task for new application", user_id: @user_1.id, start_time: Date.today, end_time: 2.days.from_now)
    @correct_task_2 = Task.new(description: "Testing correct task for new application", user_id: @user_2.id, start_time: Date.today, end_time: 2.days.from_now)
    # task should fail
    @incorrect_task = Task.new(description: "Testing incorrect task for new application", user_id: @user_1.id, start_time: Date.today, end_time: 2.days.ago)
    # want to have at least one tasks existing for user
    @correct_task_1.save!
    @correct_task_2.save!
  end

  test "should get index" do
    get tasks_url
    assert_equal JSON.parse(response.body).count, @user_1.tasks.count
    assert_response :success
  end

  test "should create correct task" do
    assert_difference('Task.count', 1) do
      post tasks_url, params: {task: {description: @correct_task_1.description, end_time: @correct_task_1.end_time, start_time: @correct_task_1.start_time, user_id: @correct_task_1.user_id}}
    end

    assert_response :created
  end

  test "should not create incorrrect task" do
    assert_difference('Task.count', 0) do
      post tasks_url, params: {task: {description: @incorrect_task.description, end_time: @incorrect_task.end_time, start_time: @incorrect_task.start_time, user_id: @incorrect_task.user_id}}
    end
    assert_response :unprocessable_entity
  end

  test "should update own task with correct params" do
    patch task_url(@correct_task_1), params: {task: {description: "New description", end_time: @correct_task_1.end_time, start_time: @correct_task_1.start_time}}
    resp = JSON.parse(response.body)
    assert_equal resp["id"], @correct_task_1.id
    assert_response :ok
  end

  test "should not update someone else's task" do
    patch task_url(@correct_task_2), params: {task: {description: "New description", end_time: @correct_task_1.end_time, start_time: @correct_task_1.start_time}}
    resp = JSON.parse(response.body)
    assert_response :forbidden
  end

  test "should not update task with false params" do
    patch task_url(@correct_task_1), params: {task: {description: @correct_task_1.description, end_time: @incorrect_task.end_time, start_time: @incorrect_task.start_time}}
    resp = JSON.parse(response.body)
    assert_response :unprocessable_entity
  end

  test "should destroy own task" do
    assert_difference('Task.count', -1) do
      delete task_url(@correct_task_1)
    end

    assert_response :ok
  end

  test "should not destroy someone else's task" do
    assert_difference('Task.count', 0) do
      delete task_url(@correct_task_2)
    end

    assert_response :forbidden
  end
end
