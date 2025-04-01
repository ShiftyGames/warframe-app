# makefile

.PHONY: site
site:
	bundle exec jekyll build

.PHONY: serve
serve:
	bundle exec jekyll serve --livereload
