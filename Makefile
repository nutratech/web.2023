SHELL=/bin/bash

.DEFAULT_GOAL := _help

# NOTE: must put a <TAB> character and two pound "\t##" to show up in this list.  Keep it brief! IGNORE_ME
.PHONY: _help
_help:
	@grep -h "##" $(MAKEFILE_LIST) | grep -v IGNORE_ME | sed -e 's/##//' | column -t -s $$'\t'



# ---------------------------------------
# Build & install
# ---------------------------------------

APP_VERSION ?= $(shell cat package.json | jq -r '.version')
APP_RELEASE_DATE ?= $(shell date --iso)

.PHONY: build/prod
build/prod: clean
build/prod:	## Build the release
	npm run build

.PHONY: build/compress
build/compress:
	tar cJf build.tar.xz build/

.PHONY: build/upload
build/upload:
	jq --version
	gh --version
	if [ "${CI}" ]; then \
	    gh release create ${APP_VERSION} --generate-notes; \
	fi
	if [ "${CI}" ]; then \
	    gh release upload ${APP_VERSION} build.tar.xz; \
	fi

PROJECT_NAME ?= web.2023
DEPLOY_URL ?= https://nutra.tk/

.PHONY: install/prod
install/prod:	## Install the release on prod (pulls latest tag)
	git pull
	test -n "${APP_VERSION}"
	wget https://github.com/nutratech/${PROJECT_NAME}/releases/download/${APP_VERSION}/build.tar.xz
	tar xf build.tar.xz
	rm -f build.tar.xz
	rm -rf /var/www/app/* && mv build/* /var/www/app/
	curl -fI ${DEPLOY_URL}



# ---------------------------------------
# Clean
# ---------------------------------------

CLEAN_LOCS_ROOT ?= build/

.PHONY: clean
clean:
	rm -rf ${CLEAN_LOCS_ROOT}
