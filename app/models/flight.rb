class Flight < ActiveRecord::Base
  def depart_time
    t = depart.strftime("%I:%M %p")
    if t[0] == "0"
      t = t[1..-1]
    end
    t
  end
  
  def arrive_time
    t = arrive.strftime("%I:%M %p")
    if t[0] == "0"
      t = t[1..-1]
    end
    t
  end
end
