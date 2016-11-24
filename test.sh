#!/usr/bin/env bash
set -e # halt script on error

bundle exec jekyll build
bundle exec htmlproofer ./_site --check-html --disable-external
# --url-ignore http://www.todopuebla.com/directorio/ondoibilitours/blog --file-ignore ./_site/sections/blogs.html
