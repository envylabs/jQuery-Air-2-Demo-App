# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

flight_times = [DateTime.new(2012,9,27, 8,30,0, Rational(-6, 24))]


5.times do
  flight_times << flight_times.last + 45.minutes 
end

7.times do |day_add|
  flight_times.each do |time|
    if Kernel.rand(10) > 3
      time += day_add.days
      Flight.create(
      depart: time,
      arrive: time + Kernel.rand(180).minutes,
      flight: Kernel.rand(2000),
      stops: Kernel.rand(3),
      first_class_price: Kernel.rand(150) + 250,
      economy_price: Kernel.rand(150) + 100
      )
    end
  end
end