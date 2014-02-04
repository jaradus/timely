# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
Timely::Application.initialize!

# Load the app's custom environment variables here, so that they are loaded before environments/*.rb
app_environment_variables = File.join(Rails.root, 'config', 'app_environment_variables.rb')
load(app_environment_variables) if File.exists?(app_environment_variables)