module ApplicationHelper
  
  def current_javascript_file
    level, challenge = params[:l], params[:c]
    if level && challenge
      javascript_include_tag "challenge-#{level}-#{challenge}"
    else
      javascript_include_tag "challenge-final"
    end
  end
end
