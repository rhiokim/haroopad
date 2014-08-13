#
# For the jsdoc and jshint targets, the following binaries need to be installed
# and available in your PATH:
#
#   * jsdoc (https://github.com/jsdoc3/jsdoc)
#   * jshint (https://github.com/jshint/jshint/)
#
# Both can be installed via NPM.
#

WORKSPACE=${CURDIR}

CLOSURE=java -jar lib/closure/compiler.jar

#
# make targets:
#

default: build

mkjsdoc:
	mkdir -p ${WORKSPACE}/jsdoc

doc: jsdoc
jsdoc: mkjsdoc
	jsdoc  -d ${WORKSPACE}/jsdoc/ ${WORKSPACE}/idbstore.js

jshint:
	jshint ${WORKSPACE}/idbstore.js

minify:
	${CLOSURE} --js idbstore.js --js_output_file idbstore.min.js

build: jshint minify
