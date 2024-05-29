dev: 
	cp .env.develop .env
	yarn cache clean & yarn dev

build-dev: 
	cp .env.develop .env
	yarn cache clean & yarn build & yarn start