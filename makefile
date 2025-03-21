# makefile

#SHELL := powershell.exe
#$(info SHELL=${SHELL})
$(info MAKE_HOST=${MAKE_HOST})

APP_DIR := warframe-app
SITE_DIR := docs

PWRSH := powershell -NoProfile

VENV_BIN := venv/Scripts
PYTHON := ${VENV_BIN}/python

IMAGE_FILES := dark-mode-icon-md.png
CSS_FILES := style.css
J2_FILES := index.html.j2
JSON_FILES := \
   data/template-context.json
JS_SCRIPTS := \
   stuff.js \
   tasks.js \
   utils.js \
   wf_item.js \
   wfapi/drops.js \
   wfapi/item-search.js \
   wfapi/vault-trader.js \
   wfapi/worldstate.js \

SITE_JS_SCRIPTS := $(patsubst %, ${SITE_DIR}/%, ${JS_SCRIPTS})
SITE_CSS_FILES := $(patsubst %, ${SITE_DIR}/css/%, ${CSS_FILES})
SITE_IMAGE_FILES := $(patsubst %, ${SITE_DIR}/images/%, ${IMAGE_FILES})
SITE_J2_FILES := $(patsubst %.j2, ${SITE_DIR}/%, ${J2_FILES})
SITE_JSON_FILES := $(patsubst %.json, ${SITE_DIR}/%, ${JSON_FILES})

.PHONY: site
site: ${SITE_JS_SCRIPTS} \
      ${SITE_CSS_FILES} \
      ${SITE_IMAGE_FILES} \
      ${SITE_J2_FILES} \

.PHONY: serve
serve: site
	python -m http.server -d ${SITE_DIR} 8080
# jekyll serve --livereload

.PHONY: venv
venv:
	python -m venv venv
	./venv/Scripts/pip install -r requirements.txt

.PHONY: clean
clean:
	${PWRSH} ${APP_DIR}/clean.ps1 -r -Path ${SITE_DIR}

.PHONY: clean_venv
clean_venv:
	${PWRSH} ${APP_DIR}/clean.ps1 -r -Path venv

${SITE_DIR}:
	mkdir $@

${SITE_DIR}/wfapi: | ${SITE_DIR}
	${PWRSH} -Command "mkdir $@ > $$null"

${SITE_DIR}/images: | ${SITE_DIR}
	${PWRSH} -Command "mkdir $@ > $$null"

${SITE_DIR}/css: | ${SITE_DIR}
	${PWRSH} -Command "mkdir $@ > $$null"

${SITE_DIR}/data: | ${SITE_DIR}
	${PWRSH} -Command "mkdir $@ > $$null"

${SITE_JS_SCRIPTS}: ${SITE_DIR}/%: ${APP_DIR}/% | ${SITE_DIR}
	${PWRSH} -Command copy $< $@

${SITE_JSON_FILES}: ${SITE_DIR}/%: ${APP_DIR}/% | ${SITE_DIR}
	${PWRSH} -Command copy $< $@

${SITE_IMAGE_FILES}: ${SITE_DIR}/%: % | ${SITE_DIR}/images
	${PWRSH} -Command copy $< $@

${SITE_CSS_FILES}: ${SITE_DIR}/%: ${APP_DIR}/% | ${SITE_DIR}/css
	npx @tailwindcss/cli -i $< > $@

${SITE_J2_FILES}: ${SITE_DIR}/%: ${APP_DIR}/%.j2 ${APP_DIR}/j2_render.py | ${SITE_DIR}
	${PYTHON} -B ${APP_DIR}/j2_render.py --template-file=$< --site-file=$@

${SITE_DIR}/wfapi/vault-trader.js: | ${SITE_DIR}/wfapi

${SITE_J2_FILES}: $(patsubst %,${APP_DIR}/%,${JSON_FILES})

${SITE_CSS_FILES}: \
    $(patsubst %, warframe-app/%,${JS_SCRIPTS} ${J2_FILES})

${SITE_DIR}/index.html: \
    ${APP_DIR}/tasks/prime-warframe.html.j2 \
    ${APP_DIR}/search_form.html.j2 \
    ${APP_DIR}/star-chart.html.j2 \

