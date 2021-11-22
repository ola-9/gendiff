install:
	npm ci 

gendiff:
	gendiff

gendiff-install:
	chmod +x bin/gendiff.js
	npm limk

gendiff-uninstall:
	npm unlink

publish:
	npm publish --dry-run

lint:
	npx eslint .

f-lint:
	npx eslint --fix .

test:
	node --experimental-vm-modules --no-warnings node_modules/jest/bin/jest --bail

test-coverage:
	npm test -- --coverage --coverageProvider=v8

test-watch:
	node --experimental-vm-modules --no-warnings node_modules/jest/bin/jest --bail --watch