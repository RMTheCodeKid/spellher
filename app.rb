require 'rubygems'
require 'compass' #must be loaded before sinatra
require 'sass'
require 'sinatra'
require 'ffi/aspell'
require 'json'
require 'haml'    #must be loaded after sinatra

# sets sinatra's variables
set :app_file, __FILE__
set :root, File.dirname(__FILE__)
set :views, "views"
set :public_dir, 'static'

#Define Aspell
speller = FFI::Aspell::Speller.new('en_US')

configure do
  set :haml, {:format => :html5, :escape_html => true}
  set :scss, {:style => :compact, :debug_info => false}
  Compass.add_project_configuration(File.join(Sinatra::Application.root, 'config', 'compass.rb'))
end

get '/stylesheets/:name.css' do
  content_type 'text/css', :charset => 'utf-8'
  scss(:"stylesheets/#{params[:name]}")
end

get '/' do
  haml :index
end

get '/spell/:word/correctly' do
  word = params[:word]
  return status 404 unless word

  if speller.correct?(word)
    return status 200
  end

  suggestions = speller.suggestions(word)
  return suggestions.to_json
end