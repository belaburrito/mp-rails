class Guest < ApplicationRecord
    validates :name, presence: true, format: { with: /\A[a-zA-Z]+\s[a-zA-Z]+\z/, message: "must be your first and last name" }
    validates :phone, presence: true, numericality: { only_integer: true }, length: { in: 10..11 }
end
  