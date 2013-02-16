build:
	rm -rf ./build
	mkdir -p ./build
	zip -r ./build/app.nw src/*
	cp -R ./lib/nw.app ./build/tmp.app
	mv ./build/app.nw  ./build/tmp.app/Contents/Resources

.PHONY: build
