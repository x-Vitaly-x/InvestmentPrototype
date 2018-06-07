class TasksController < ApplicationController
  before_action :authenticate_user!
  before_action :set_task, only: [:show, :edit, :update, :destroy]

  public

  # GET /tasks
  def index
    authorize! :read, :task
    @tasks = current_user.tasks
  end

  # GET /tasks/1
  def show
    authorize! :read, :task
  end

  # POST /tasks
  def create
    authorize! :create, :task
    @task = Task.new(task_params)
    @task.user_id = current_user.id
    if @task.save
      render :show, status: :created, location: @task
    else
      render json: @task.errors.full_messages, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tasks/1
  def update
    authorize! :update, @task
    if @task.update(task_params)
      render :show, status: :ok, location: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tasks/1
  def destroy
    authorize! :destroy, @task
    @task.destroy
    render json: {ok: "ok"}, status: 200
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_task
    @task = Task.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def task_params
    params.require(:task).permit(:start_time, :end_time, :description)
  end
end
