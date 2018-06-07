class Task < ApplicationRecord
  belongs_to :user

  validates_presence_of :description, :user_id, :start_time, :end_time
  validate :end_time_is_after_start_time

  private

  def end_time_is_after_start_time
    errors.add(:start_time, "must be before end time") unless (!start_time.nil? and !end_time.nil? and start_time < end_time)
  end
end
