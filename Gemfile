source "https://rubygems.org"
# [en]
# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
# [es]
# ¡Hola! Aquí es donde se gestiona qué versión de Jekyll se utiliza para ejecutar.
# Cuando quieras usar una versión diferente, cámbiala abajo, guarda el archivo # y ejecuta `bundle install`.
# archivo y ejecuta `bundle install`. Ejecuta Jekyll con `bundle exec`, así:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!
# [es]
#Esto ayudará a asegurar que se está ejecutando la versión adecuada de Jekyll.
# ¡Feliz Jekylling!

gem "github-pages", "~> 	228", group: :jekyll_plugins
#gem 'github-pages', group: :jekyll_plugins

# This is the default theme for new Jekyll sites. You may change this to anything you like.
gem "minima", "~> 2.5"

# [en]
# If you want to use GitHub Pages, remove the "gem "jekyll"" above and
# uncomment the line below. To upgrade, run `bundle update github-pages`.
# gem "github-pages", group: :jekyll_plugins
# If you have any plugins, put them here!
# [es]
# Si quieres usar GitHub Pages, elimina la "gem "jekyll"" de arriba y
# descomente la línea de abajo. Para actualizar, ejecute `bundle update github-pages`.
# gem "github-pages", group: :jekyll_plugins
# Si tienes algún plugin, ¡ponlo aquí!
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
end

# [en]
# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
# [es] Windows y JRuby no incluyen archivos zoneinfo, por lo que hay que empaquetar la gema tzinfo-data
# y la biblioteca asociada.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# [en]Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions of the gem
# do not have a Java counterpart.
# [es]
# Bloquea la gema `http_parser.rb` a `v0.6.x` en JRuby ya que las nuevas versiones de la gema
# no tienen una contraparte Java. O sea : gem install http_parser.rb -v 0.6.0

# https://rubygems.org/gems/wdm
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]

# https://rubygems.org/gems/jekyll-paginate
gem "jekyll-paginate", "~> 1.1"

# https://rubygems.org/gems/webrick
gem "webrick", "~> 1.8"

# Install jekyll
#gem 'jekyll', '>= 3.9.3'

gem 'json', '~> 2.6', '>= 2.6.3'