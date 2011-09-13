class CreateFlights < ActiveRecord::Migration
  def change
    create_table :flights do |t|
      t.datetime :depart
      t.datetime :arrive
      t.integer :flight
      t.integer :stops, :default => 1
      t.decimal :first_class_price, :precision => 8, :scale => 2, :default => 0.0
      t.decimal :economy_price, :precision => 8, :scale => 2, :default => 0.0

      t.timestamps
    end
  end
end
