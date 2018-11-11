# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Bank.destroy_all
bank1 = Bank.create!(title: 'Bank 1')
bank2 = Bank.create!(title: 'Bank 2')
User.destroy_all
banker1 = Users::Banker.create!(email: 'banker1@test.com', password: 'testtest', password_confirmation: 'testtest', bank_id: bank1.id)
banker2 = Users::Banker.create!(email: 'banker2@test.com', password: 'testtest', password_confirmation: 'testtest', bank_id: bank1.id)
banker3 = Users::Banker.create!(email: 'banker3@test.com', password: 'testtest', password_confirmation: 'testtest', bank_id: bank2.id)
banker4 = Users::Banker.create!(email: 'banker4@test.com', password: 'testtest', password_confirmation: 'testtest', bank_id: bank2.id)
Mortgage.destroy_all
mortgages = Mortgage.create!(
    [
        {title: 'Mortgage1', risk_classification: 'A', amount: 10000, interest_rate: 5, bank_id: bank1.id, banker_id: banker1.id, due_date: 2.years.from_now},
        {title: 'Mortgage2', risk_classification: 'B', amount: 11000, interest_rate: 6, bank_id: bank1.id, banker_id: banker2.id, due_date: 2.years.from_now},
        {title: 'Mortgage3', risk_classification: 'B', amount: 12000, interest_rate: 6, bank_id: bank2.id, banker_id: banker3.id, due_date: 3.years.from_now},
        {title: 'Mortgage4', risk_classification: 'C', amount: 13000, interest_rate: 7, bank_id: bank2.id, banker_id: banker4.id, due_date: 3.years.from_now}
    ])
