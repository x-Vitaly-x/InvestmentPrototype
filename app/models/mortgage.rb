class Mortgage < ApplicationRecord
  belongs_to :bank

  enum risk_classification: [
      'A', 'B', 'C'
  ]

  before_save :generate_fields

  validates_presence_of :title, :risk_classification, :due_date, :amount, :interest_rate

  def self.import_csv(csv_file, user_id, delete_old_entries = false)
    user = Users::Banker.find(user_id)
    product_ids = []
    Mortgage.transaction do
      csv = CSV.parse(csv_file.read, headers: true, col_sep: '|')
      csv.each do |row|
        data = {
            user_id: user.id,
            bank_id: user.bank.id
        }
        row.to_hash.each_pair do |k, v|
          data.merge!({k.downcase => v})
        end
        prod = Mortgage.create_with(data).find_or_create_by(id: data['id'])
        product_ids << prod.id
      end
      user.bank.mortgages.where.not(id: product_ids).each(:destroy) if delete_old_entries
    end
  end

  private

  def generate_fields
    self.bank_name ||= self.bank.title
  end
end
