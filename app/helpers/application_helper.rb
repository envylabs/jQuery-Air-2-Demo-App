module ApplicationHelper
  
  def current_javascript_file
    level, challenge = params[:l], params[:c]
    if level && challenge
      javascript_include_tag "#{params[:controller]}/challenge-#{level}-#{challenge}"
    end
  end
end
