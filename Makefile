build:
	rm -rf ./build
	mkdir -p ./build
	cp -R ./lib/nw.app ./build/haroopad.app
	cp -R ./src  ./build/haroopad.app/Contents/Resources/app.nw
	cp Info.plist ./build/haroopad.app/Contents
	cp -R ./build/haroopad.app ./

deploy:
	cp -R haroopad.app /Applications
.PHONY: build
