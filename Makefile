install:
	npm ci 

gendiff:
	gendiff

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