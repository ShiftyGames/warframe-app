# makefile

APP_DIR := warframe-app
SITE_DIR := _site

PWRSH := powershell -NoProfile
VENV_BIN := venv/Scripts
PYTHON := ${VENV_BIN}/python

JS_SCRIPTS := stuff.js utils.js
CSS_FILES := style.css
J2_FILES := index.html.j2


SITE_JS_SCRIPTS := $(patsubst %, ${SITE_DIR}/%, ${JS_SCRIPTS})
SITE_CSS_FILES := $(patsubst %, ${SITE_DIR}/css/%, ${CSS_FILES})
SITE_J2_FILES := $(patsubst %.j2, ${SITE_DIR}/%, ${J2_FILES})


.PHONY: serve
serve: site
	${VENV_BIN}/python -m http.server -d ${SITE_DIR} 8080

.PHONY: site
site: ${SITE_DIR} ${SITE_JS_SCRIPTS} ${SITE_CSS_FILES} ${SITE_J2_FILES}

.PHONY: venv
venv:
	python -m venv venv
	./venv/Scripts/pip install -r requirements.txt

.PHONY: clean
clean:
	${PWRSH} ${APP_DIR}/clean.ps1
#	remove-item -recurce -force venv

${SITE_DIR}:
	mkdir $@

${SITE_DIR}/css: | ${SITE_DIR}
	${PWRSH} -Command "mkdir $@"

${SITE_JS_SCRIPTS}: ${SITE_DIR}/%: ${APP_DIR}/% | ${SITE_DIR}
	cat $< > $@

${SITE_CSS_FILES}: ${SITE_DIR}/%: ${APP_DIR}/% | ${SITE_DIR}/css
	cat $< > $@

${SITE_J2_FILES}: ${SITE_DIR}/%: ${APP_DIR}/%.j2 ${APP_DIR}/j2_render.py | ${SITE_DIR}
	${PYTHON} -B ${APP_DIR}/j2_render.py --template-file=$< --site-file=$@

${SITE_DIR}/index.html: ${APP_DIR}/tasks/prime-warframe.html.j2
