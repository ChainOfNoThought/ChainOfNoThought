source "https://rubygems.org"

# GitHub Pages gem with exact version
# Check https://pages.github.com/versions/ for the latest version
# This ensures your local environment matches GitHub's production environment
gem "github-pages", "~> 232", group: :jekyll_plugins

# Required for Ruby 3.0+ compatibility
gem "webrick", "~> 1.7"

# Development tools (optional but helpful)
group :development do
  # HTML validation tool
  gem "html-proofer", "~> 3.19"
end

# Windows and JRuby compatibility
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance booster for watching directories on Windows
gem "wdm", "~> 0.1", :install_if => Gem.win_platform?

# Note: All Jekyll plugins must be whitelisted by GitHub Pages
# See: https://pages.github.com/versions/ for the complete list 